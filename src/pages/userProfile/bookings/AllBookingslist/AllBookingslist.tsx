import Dropdown from "react-bootstrap/Dropdown";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import Moment from "react-moment";
import { useSelector } from "react-redux";
import { enqueueSnackbar } from "notistack";

function AllBookingslist() {
  const { profile } = useSelector((state: any) => state);
  const [allbookingsss, setAllbookingsss] = useState<any>();
  const [Loading, setLoading] = useState<any>(false);
  const [Loadingtrue, setLoadingtrue] = useState<any>(false);
  const [Deletedbooking, setDeletedbooking] = useState<any>(false);
  const [selectedloaderId, setselectedloaderId] = useState<any>(null);
  const newprofile = profile ? profile : "";

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
        console.log(
          "response.data.result.results",
          response.data.result.results
        );
        setLoading(false);
      } catch (error) {
        // Handle errors here
        console.error("Error fetching data:");
        setLoading(false);
      }
    };
    fetchDataofaalbookings();
  }, [newprofile, Deletedbooking]);

  // console.log("allbookingsss", allbookingsss?.attributes)

  const router = useRouter();
  const handleClickBookingDetail = (item: any) => {
    // console.log("newdate", item)
    // localStorage.setItem("purchaseorderId", item?.expertBookingId);
    // localStorage.setItem("appointment_id_booking", item?.appointments[0]?.id);
    localStorage.setItem("bookingdetailforbookingnull", JSON.stringify(item));
    // if (item?.appointments[0]?.bookingDate === null) {
    //     router.push(`/Editbookings/${item.providerId}`);
    // }
    // else {
    router.push(`/userProfile/bookings/Servicedetail/${item?.expertBookingId}`);
    // }
  };

  const handleClickBookingDetail2 = async (
    item: any,
    item34: any,
    index: any
  ) => {
    setLoadingtrue(true);
    setselectedloaderId(item34?.purchaseOrderId);
    // console.log("anass", item34?.purchaseOrderId)

    const requestData = {
      customerId: profile?.externalCustomerId,
      providerId: item34?.providerId,
      providerIdNew: item34?.providerId,
      plexaarAppointmentId:
        item?.plexaarAppointmentId > 0 || item?.plexaarAppointmentId != null
          ? item?.plexaarAppointmentId
          : "",
      expertAppointmentId: item?.expertAppointmentId,
      sku:
        item34?.hasattribute === "true"
          ? item34?.attributes[0]?.attributeSku
          : item34?.serviceSKU,
      isOpen: false,
      oldDate: {
        // date: item34?.dateJson[0]?.bookingDate,
        // timeFrom: item34?.dateJson[0]?.timeFrom,
        // timeTo: item34?.dateJson[0]?.timeTo,
        date: item?.bookingDate,
        timeFrom: item?.timeFrom,
        timeTo: item?.timeTo,
      },
      newDate: {
        date: item?.bookingDate,
        timeFrom: item?.timeFrom,
        timeTo: item?.timeTo,
        // date: item34?.dateJson[0]?.bookingDate,
        // timeFrom: item34?.dateJson[0]?.timeFrom,
        // timeTo: item34?.dateJson[0]?.timeTo,
      },
      isCancel: true,
      isEdit: false,
      modifiedBy: profile?.externalCustomerId,
      timeZone: "Europe/London",
    };

    try {
      const response = await axios.post(
        "https://gateway.findanexpert.net/provideravalability_svc/pb/edit/booking-slot",
        requestData,
        {
          headers: {
            "Content-Type": "application/json", // Set the content type to JSON
          },
        }
      );
      setLoadingtrue(false);
      // setResponseDatafirstnote(response.data);
      console.log("API Response:", response.data);
      enqueueSnackbar("Booking cancelled successfully!", {
        variant: "success",
      });
      setDeletedbooking(!Deletedbooking);
      // setinputtextval("");
      // setLoading(false);
    } catch (error) {
      console.error("API Error:", error);
      setLoadingtrue(false);
      // setLoading(false);
    }
  };

  const editbokoing = (id: any, allitem: any) => {
    localStorage.setItem(
      "bookingdetailforbookingnull",
      JSON.stringify(allitem)
    );
    router.push(`/Editbooking/${id}`);
  };

  return (
    <div>
      {Loading === false ? (
        <>
          {allbookingsss?.map((item1: any, index: any) => {
            console.log("abs", item1);
            return (
              <>
                {item1?.appointments[0]?.timeFrom && (
                  <div
                    className="row px-2 white_bg_new pt-2 pb-2 mt-3"
                    key={index}
                    // onClick={() => handleClickBookingDetail(item)}
                  >
                    <div
                      onClick={() => handleClickBookingDetail(item1)}
                      className="col-md-1 col-2  pe-0"
                    >
                      <img
                        className="img-fluid rounded-circle booking_img"
                        src={
                          item1?.businessImage?.length === 0
                            ? "/imagess/avatar.png"
                            : "/imagess/avatar.png"
                        }
                      />
                    </div>
                    <div
                      onClick={() => handleClickBookingDetail(item1)}
                      className="col-md-11 col-10"
                    >
                      <div className="row">
                        <div className="col-md-6 px-0">
                          <div className="col-md-12 mt-1 ">
                            <p className="m-0 p-0 main_waxflow_text">
                              {" "}
                              {item1?.serviceName}{" "}
                            </p>
                          </div>
                          <div className="col-md-12 col-12 ">
                            <p className="m-0 p-0 main_waxflow_text1">
                              {item1?.attributes?.map(
                                (item2: any, index: any) => {
                                  return <span>{item2?.value}</span>;
                                }
                              )}
                            </p>
                          </div>
                          <div className="col-md-12">
                            {/* <p className='m-0 p-0 main_waxflow_text12'>Order: {item1?.expertSalesOrderId}</p> */}
                          </div>
                        </div>
                        <div className="col-md-6 text-end m-auto">
                          {/* <div className='col-md-12'>

                                                        <p className='m-0 mt-2 p-0 main_waxflow_text2'>
                                                            {item1?.bookingDuration} mins
                                                        </p>
                                                        <p className='m-0 mt-2 p-0 main_waxflow_text_new'>
                                                            {item1?.currencySymbol} {item1?.amountpayable}
                                                        </p>
                                                    </div> */}
                        </div>
                      </div>
                    </div>
                    <hr className="mb-0 mt-2 background_line " />
                    <div className="col-md-12 px-0 text-start">
                      {item1?.appointments?.map((item: any, index: any) => {
                        // console.log("item", selectedloaderId === item1?.purchaseOrderId, selectedloaderId , item1?.purchaseOrderId)
                        // Convert the string to a Date object
                        const dateObject = new Date(item?.bookingDate);

                        // Define the options for formatting the date
                        const options: any = {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        };

                        // Format the date using toLocaleDateString
                        const formattedDate = dateObject.toLocaleDateString(
                          "en-GB",
                          options
                        );

                        // Options for formatting the day
                        const locale: any = {
                          weekday: "short",
                        };

                        // Format the day
                        const formatDay = dateObject.toLocaleDateString(
                          "en-GB",
                          locale
                        );

                        return (
                          <span>
                            {item?.bookingDate != null && (
                              <div className="row">
                                <div className="col-md-6">
                                  <p className="m-0 p-0 mt-1 mb-1 ps-2 apponit">
                                    Appointment
                                    {selectedloaderId ===
                                      item1?.purchaseOrderId && (
                                      <>
                                        {Loadingtrue ? (
                                          <div
                                            className="spinner-grow spinner-grow-sm"
                                            role="status"
                                          >
                                            <span className="visually-hidden">
                                              Loading...
                                            </span>
                                          </div>
                                        ) : null}
                                      </>
                                    )}
                                  </p>
                                  <p className="m-0 ps-2 outline_t1">
                                    {formatDay}, {formattedDate},{" "}
                                    {item?.timeFrom.substring(0, 5)} -{" "}
                                    {item?.timeTo.substring(0, 5)}
                                    {/* </Moment> */}
                                  </p>
                                </div>
                                <div className="col-md-6 m-auto text-end pt-2">
                                  <Dropdown className="d-inline mx-2">
                                    <Dropdown.Toggle
                                      title={` Drop end `}
                                      id="dropdown-autoclose-true"
                                    >
                                      <p className="m-0 p-0 mt-1 mb-1 apponit11">
                                        <BiDotsVerticalRounded />
                                      </p>
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                      {/* <Dropdown.Item onClick={(e) => handleEdit(address)} > <span>Edit</span></Dropdown.Item> */}
                                      <Dropdown.Item
                                        onClick={(e: any) =>
                                          editbokoing(
                                            item?.expertAppointmentId,
                                            item1
                                          )
                                        }
                                      >
                                        {" "}
                                        <span>Edit</span>
                                      </Dropdown.Item>
                                      {/* <Dropdown.Item > <span >View</span></Dropdown.Item> */}
                                      <Dropdown.Item
                                        onClick={(e: any) =>
                                          handleClickBookingDetail2(
                                            item,
                                            item1,
                                            index
                                          )
                                        }
                                      >
                                        {" "}
                                        <span>Delete</span>
                                      </Dropdown.Item>
                                    </Dropdown.Menu>
                                  </Dropdown>
                                </div>
                              </div>
                            )}
                            {/* -<Moment format="hh:mm A">{item?.timeTo}</Moment></p> */}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                )}
              </>
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

export default AllBookingslist;
