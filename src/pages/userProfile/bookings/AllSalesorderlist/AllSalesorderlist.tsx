import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Moment from "react-moment";
import { useSelector } from "react-redux";

function AllSalesorderlist() {
  const { profile } = useSelector((state: any) => state);
  const [allbookingsss, setAllbookingsss] = useState<any>();
  const [Loading, setLoading] = useState<any>(false);
  const newprofile = profile ? profile : "";
  const [bookingeditnull, setBookingnull] = useState<any>([]);
  const [Currentdate, setCurrentdate] = useState<any>("");

  useEffect(() => {
    // Get current date from the device
    const currentDate = new Date();

    // Format current date in the same format as "2024-01-24"
    const formattedCurrentDate = `${currentDate.getFullYear()}-${(
      currentDate.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}-${currentDate.getDate().toString().padStart(2, "0")}`;
    setCurrentdate(formattedCurrentDate);
    // Log the result to the console
    console.log("formattedCurrentDate", formattedCurrentDate);
  }, []);

  useEffect(() => {
    // for Bookings ---------------------------
    const fetchDataofaalbookings = async () => {
      setLoading(true);
      try {
        // Replace 'your-api-url' with the actual API endpoint you want to request data from
        const apiUrl = `https://gateway.findanexpert.net/bookingorder_svc/pb/getBookingList/?customerId=${profile?.externalCustomerId}&timeZone=Europe/London&page=1`;
        // const apiUrl = 'https://gateway.findanexpert.net/bookingorder_svc/pb/getBookingList/?customerId=1&page=1';
        const response = await axios.get(apiUrl);
        setAllbookingsss(response.data.result.results);
        setLoading(false);
      } catch (error) {
        // Handle errors here
        console.error("Error fetching data:");
        setLoading(false);
      }
    };
    fetchDataofaalbookings();
  }, [newprofile]);

  console.log("allbookingsss", allbookingsss);

  const router = useRouter();
  const handleClickBookingDetail = (item: any) => {
    console.log("newdate", item);
    localStorage.setItem("purchaseorderId", item?.expertBookingId);
    localStorage.setItem("appointment_id_booking", item?.appointments[0]?.id);
    localStorage.setItem("bookingdetailforbookingnull", JSON.stringify(item));
    if (item?.appointments[0]?.bookingDate === null) {
      router.push(`/Editbookings/${item.providerId}`);
    } else {
      router.push(
        `/userProfile/bookings/Servicedetail/${item?.expertBookingId}`
      );
    }
  };

  const bookingidnullfunc = (clickedIndex: any) => {
    console.log("bookingeditnull", bookingeditnull, clickedIndex);

    Object.keys(bookingeditnull).forEach((key) => {
      // Convert the key to a number for comparison
      const keyAsNumber = parseInt(key, 10);

      if (keyAsNumber === clickedIndex) {
        // Get the array of indices for the current key
        const indicesArray = bookingeditnull[key];

        // Log the first element of the array
        const firstElement = indicesArray[0];

        // Find the corresponding appointment
        const appointment = allbookingsss.find((booking: any) =>
          booking.appointments.some(
            (app: any) => app.expertAppointmentId === firstElement
          )
        );

        // Check if the appointment is found
        if (appointment) {
          // Store the object in localStorage
          localStorage.setItem(
            "bookingdetailforbookingnull",
            JSON.stringify(appointment)
          );

          // Redirect to the Editbookings page with the expertAppointmentId
          router.push(`/Openbooking/${firstElement}`);
        }
      }
    });
  };

  useEffect(() => {
    if (allbookingsss != null) {
      allbookingsss.forEach((result: any, index: number) => {
        const nullIds = result.appointments
          .filter((appointment: any) => appointment?.bookingDate === null)
          .map((appointment: any) => appointment?.expertAppointmentId);

        setBookingnull((prevIdsByIndex: any) => ({
          ...prevIdsByIndex,
          [index]: nullIds,
        }));
      });
    }
  }, [allbookingsss]);

  return (
    <div>
      {Loading === false ? (
        <>
          {allbookingsss?.map((item: any, newindex: any) => {
            console.log("abs", item?.appointments[0]?.timeFrom === null);
            return (
              <div
                className="row px-2 white_bg_new pt-2 pb-2 mt-3"
                key={newindex}
                // onClick={() => handleClickBookingDetail(item)}
              >
                <div className="col-md-1 col-2  pe-0">
                  <img
                    className="img-fluid rounded-circle order_img"
                    src={
                      item?.businessImage?.length === 0
                        ? "/imagess/avatar.png"
                        : "/imagess/avatar.png"
                    }
                  />
                </div>
                <div className="col-md-11 col-10">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="col-md-12">
                        <p className="m-0 p-0 pt-1 main_waxflow_text">
                          {" "}
                          {item?.serviceName}
                        </p>
                      </div>
                      <div className="col-md-12 col-12">
                        <p className="m-0 p-0 main_waxflow_text1">
                          Qty: {item?.quantity}
                        </p>
                      </div>
                      <div className="col-md-12">
                        <p className="m-0 p-0 main_waxflow_text12">
                          Order: {item?.expertSalesOrderId}
                        </p>
                      </div>
                    </div>
                    <div className="col-md-6 text-end m-auto">
                      <div className="col-md-12">
                        <p className="m-0 pt-1 p-0 main_waxflow_text2">
                          {item?.bookingDuration} mins
                          {/* <Moment format="DD MMM, YYYY">
                                                   {item?.dateJson[0]?.bookingDate}
                                               </Moment> */}
                        </p>
                        <p className="m-0 mt-2 p-0 main_waxflow_text_new">
                          {item?.currencySymbol} {item?.amountpayable}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* <div className='col-md-12'>
                                        <div className='row'>
                                            <div className='col-md-6 col-6'>
                                                <p className='m-0 mt-1 p-0 main_waxflow_text2'><span>Total Appointments: <span className='text-danger'>{item?.appointments?.length}</span></span> , <span>Booked Appointments: <span className='text-success'>{item?.appointments?.length}</span></span></p>
                                            </div>
                                            <div className='col-md-6 col-6 text-end mt-1'>
                                                <p className='m-0 p-0 main_waxflow_text2'>  {item?.dateJson[0]?.timeFrom} to {item?.dateJson[0]?.timeTo}  <img className='img-fluid' src='/imagess/rightnew.png' /></p>
                                            </div>
                                        </div>

                                    </div> */}
                </div>
                <hr className="mb-0 mt-2 background_line " />
                <div className="col-md-12 px-0 text-start">
                  {item?.appointments?.map(
                    (item: any, index: any, array: any) => {
                      // Convert the string to a Date object
                      const dateObject = new Date(item?.bookingDate);
                      console.log("item?.bookingDate", item?.bookingDate);

                      // Define the options for formatting the date
                      const options: any = {
                        day: "numeric",
                        month: "short",
                        // year: "numeric",
                      };

                      // Format the date using toLocaleDateString
                      const formattedDate = dateObject.toLocaleDateString(
                        "en-GB",
                        options
                      );
                      console.log("{item?.id}", Currentdate === formattedDate);

                      return (
                        <span
                          onClick={() => bookingidnullfunc(index)}
                          key={index}
                          className=""
                        >
                          {item?.bookingDate === null ? (
                            <span>
                              <button className="btn btn-outline-secondary button_size_set btn-sm mt-2 p-0 ms-2">
                                <p className="m-0 outline_t1">--/--</p>
                                <p className="m-0 outline_t2">Upcoming</p>
                              </button>
                            </span>
                          ) : (
                            <span>
                              <button
                                className={`btn btn-outline-secondary btn-sm button_size_set mt-2 ms-2 p-0`}
                              >
                                <p className="m-0 outline_t1">
                                  {formattedDate}
                                </p>
                                <p className="m-0 outline_t2">Upcoming</p>
                              </button>
                            </span>
                          )}
                          {/* Render "Book Now" button and pass the index to the function */}
                          {/* {index === array.length - 1 &&
                                                   
                                                } */}
                        </span>
                      );
                    }
                  )}
                  <span>
                    {/* {item?.appointments[0]?.timeFrom === null ? */}
                    <button
                      onClick={() => bookingidnullfunc(newindex)}
                      className="btn btn-outline-danger booknow_button_session btn-sm p-0 mt-2 ms-2"
                    >
                      <p className="m-0 outline_t1">Book</p>
                      <p className="m-0 outline_t2">Next session</p>
                    </button>
                    {/* : null} */}
                  </span>
                </div>
              </div>
            );
          })}
        </>
      ) : (
        <div className="col-md-12 text-center">
          <div className="spinner-border text-danger mt-2" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default AllSalesorderlist;
