import React, { useState, useEffect } from "react";
import axios from "axios";
import SideBar from "@/Components/components/sidebar";
import { useRouter } from "next/router";
import Moment from "react-moment";
import Link from "next/link";
import { getPurchaseOrderWithId, getSalesOrderwithID } from "@/helper";
import { useDispatch, useSelector } from "react-redux";
import { AUTH_ACTIONS } from "@/Redux/Actions/loginPageAction";

function Service() {
  const [tabswitch, setTabswitch] = useState(0);
  const dispatch = useDispatch();
  const [purchaseOrderId, setPurschaseOrderId] = useState<any>(null);
  const [buttonsData] = useState([
    { id: 1, date: "1 Feb", unreadCount: 1 },
    { id: 2, date: "1 March", unreadCount: 4 },
    { id: 3, date: "1 Apr", unreadCount: 1 },
    { id: 4, date: "1 May", unreadCount: 4 },
    // Add more button data as needed
  ]);
  const [selectedValues, setSelectedValues] = useState<number[]>([
    buttonsData[2].id,
  ]);
  const [newid, setNewid] = useState("");
  const [newidlocal, setNewidlocal] = useState<any>("");
  const [bookingbyid, setBookingbyid] = useState<any>([]);
  const [addresss, setAddress] = useState<any>([]);
  const [jwtToken, setJwtToken] = useState<any>(null);
  const [datee, setDate] = useState<any>([]);
  const router = useRouter();
  const { bookingDetail } = useSelector((state: any) => state);
  // console.log("Sssssssssssssssssssssssssssssss", bookingDetail);
  const { id } = router.query;

  const handleClickbookings = () => {
    return;
    // console.log("sdsds", purchaseOrderId);
    const nabu = router.push(
      `/userProfile/bookings/Editbooking/${purchaseOrderId}`
    );
  };
  const storedId: string | null =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("purchaseorderId") as string)
      : null;

  useEffect(() => {
    if (storedId) {
      salesorderwithidd(parseInt(storedId));
    }
  }, [storedId]);

  // Api Applied In In-complete Section --------------------------------------------------------
  //   async function salesorderwithidd(storedId: any) {
  //     getSalesOrderwithID(storedId)
  //       .then((res) => {
  //         setBookingbyid(res?.result?.data);
  //         setPurschaseOrderId(res?.result?.data?.purchaseOrderId);
  //         setAddress(res?.result?.address?.dropOffAddress)
  //         localStorage.setItem("selected_address", JSON.stringify(res?.result?.address?.dropOffAddress[0]?.addressName));
  //       })
  //       .catch((e) => alert(e));
  //   }
  useEffect(() => {
    setJwtToken(localStorage?.getItem("jwtToken"));
  }, [jwtToken]);


  const salesorderwithidd = async (storedId: any) => {
    const isToken = jwtToken !== null;
    const headers = {
      "Content-Type": "application/json",
    };

    try {
      const response = await axios.get(
        `https://gateway.findanexpert.net/sales_order_svc/pb/sales_orders/${storedId}/`,
        { headers }
      );
      // setData(response.data?.result?.outPutSectionModels);
      console.log("SEO page api data", response.data.result);
      setBookingbyid(response.data.result)
      setPurschaseOrderId(response?.data?.result?.purchaseOrderId);
      setAddress(response?.data?.result?.address?.dropOffAddress)

    } catch (error) {
      // setError(error);
      console.log("error", error);
    }
  };




  console.log("<><><><><><><><responseData<><><><>><>", bookingbyid);

  useEffect(() => {
    const arrayOfProviders = bookingbyid?.providersList?.map(
      (item: any) => item?.providerId
    );
    const jsonString = JSON.stringify(arrayOfProviders);
    console.log("data}}}}}}}}}", jsonString);
    localStorage.setItem("providerArray", jsonString);
  }, [bookingbyid]);

  useEffect(() => {
    const formattedCreatedAt = new Date(bookingbyid?.createdDateTimeUTC?.replace('Z', '')).toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      timeZoneName: 'short'
    });
    setDate(formattedCreatedAt);
  }, [bookingbyid?.createdDateTimeUTC])

  const setorderId = (item: any) => {
    //  console.log("./////////////////", item);
    localStorage.setItem('orderId', item);
    router.replace("/flowManagementPages/Notesedit")
  }

  console.log("mmmmmmmmm", bookingbyid?.createdDateTimeUTC)

  return (
    <SideBar activeIndex={3}>
      {bookingbyid ? (
        <>
          <div className="side_nav_1_right">
            {/* sub header ------------------------------  */}
            <div className="col-md-12 background_sidenav_one padding_bottom_boking">
              <div className="col-md-12 bg-white border_of_subheader px-3 ">
                <div className="col-md-12 m-auto">
                  <h5 className="color_bookings pt-2 pt-3 pb-2">
                    Bookings Detail
                  </h5>
                </div>
              </div>
              <div className="col-md-12 padding_left_right1 margin_bottom_new">
                <div className="col-md-12 border_booking pb-3 px-3">
                  {/* Booking header  */}
                  <div className="row pt-3">
                    <div className="col-md-6 col-6 ">
                      <p className=" m-0 p-0 label_booking_txt">Booking {bookingbyid?.bookingId}</p>
                    </div>
                    <div className="col-md-6 col-6 text-end">
                      <p className="label_booking_txt"><i className="fas fa-ellipsis-h"></i></p>
                    </div>
                    <div className="col-md-6 col-8">
                      <div className="row">
                        <div className="col-md-2 pe-0">
                          <img
                            className="img-fluid width_services1"
                            src="/imagess/woman.png"
                          />
                        </div>
                        <div className="col-md-10 m-auto">
                          <p className="m-0 p-0 heading_frinkle">{bookingbyid?.servicePayload?.serviceName}</p>
                          <p className="m-0 p-0 heading_frinkle1">( x{bookingbyid?.quantity} )</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 col-4 pt-4 text-end m-auto">
                      {bookingbyid?.servicePayload?.isCompleted === true ?
                        <p className="m-0 p-0 color_status_red" >Completed</p>
                        : <p className="m-0 p-0 color_status_red" >Pending</p>}
                      <p className="m-0 p-0 heading_frinkle">£{bookingbyid?.totalPrice}</p>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <hr className="background_line" />
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <p className=" m-0 p-0 label_booking_txt">Created Date</p>
                    </div>
                    <div className="col-md-6 mt-2">
                      <div className="row">
                        <div className="col-md-12 ">
                          <p className="m-0 p-0 heading_frinkle">  {datee}</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 text-end m-auto">

                    </div>
                  </div>
                  <div className="col-md-12">
                    <hr className="background_line" />
                  </div>
                  <div className="row ">
                    <div className="col-md-6 col-6">
                      <p className=" m-0 p-0 label_booking_txt">Order {bookingbyid?.purchaseOrderId}</p>
                    </div>
                    <div className="col-md-6 col-6 text-end">
                      <p className="label_booking_txt"><i className="fas fa-ellipsis-h"></i></p>
                    </div>

                  </div>
                  <div className="row ">
                    <div className="col-md-2 col-2 m-auto"><i className="fas fa-angle-double-left"></i></div>
                    <div className="col-md-8 col-8">
                      <div className="flex_using_booking_d">

                        <div className="light_b on_pc_screeen mx-1 ">
                          <p className="m-0 p-0 th_Jan">No Date</p>
                          <p className="m-0 p-0 Completed ">No Status</p>
                        </div>
                        <div className="light_b on_pc_screeen mx-1">
                          <p className="m-0 p-0 th_Jan">No Date</p>
                          <p className="m-0 p-0 Completed ">No Status</p>
                        </div>
                        <div className="light_b on_pc_screeen mx-1">
                          <p className="m-0 p-0 th_Jan">No Date</p>
                          <p className="m-0 p-0 Completed ">No Status</p>
                        </div>
                        <div className="active_tab mx-1">
                          <p className="m-0 p-0 th_Jan_active">{datee}</p>
                          <p className="m-0 p-0 th_Jan_active ">
                            {bookingbyid?.dateJson?.map((item: any, index: any) => {
                              return (
                                <>{item?.timeFrom} to {item?.timeTo}</>
                              )
                            }
                            )}
                          </p>
                        </div>
                        <div className="light_r on_pc_screeen mx-1">
                          <p className="m-0 p-0 th_Jan1">No Date</p>
                          <p className="m-0 p-0 Completed1 ">No Status</p>
                        </div>
                        <div className="light_r on_pc_screeen mx-1">
                          <p className="m-0 p-0 th_Jan1">No Date</p>
                          <p className="m-0 p-0 Completed1 ">No Status</p>
                        </div>
                        <div className="light_r on_pc_screeen mx-1">
                          <p className="m-0 p-0 th_Jan1">No Date</p>
                          <p className="m-0 p-0 Completed1 ">No Status</p>
                        </div>

                      </div>
                    </div>
                    <div className="col-md-2 col-2 text-end m-auto"><i className="fas fa-angle-double-right"></i></div>
                  </div>
                  <div className="col-md-12">
                    <hr className="background_line" />
                  </div>
                  <div className="row pt-3">
                    <div className="col-md-12">
                      <p className=" m-0 p-0 label_booking_txt">Provider {bookingbyid?.providerId}</p>
                    </div>
                    <div className="col-md-6 mt-2">
                      <div className="row">
                        <div className="col-md-2 col-3 pe-0">
                          <img
                            className="img-fluid width_services1"
                            src="/imagess/woman.png"
                          />
                        </div>
                        <div className="col-md-10 col-9 ps-0 m-auto">
                          <p className="m-0 p-0 heading_frinkle">{bookingbyid?.providerName}</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 text-end m-auto">
                    </div>
                  </div>
                  <div className="col-md-12">
                    <hr className="background_line" />
                  </div>
                  <div className="row pt-3">
                    <div className="col-md-12">
                      <p className=" m-0 p-0 label_booking_txt">Business-Id {bookingbyid?.businessId}</p>
                    </div>
                    <div className="col-md-6 mt-2">
                      <div className="row">
                        <div className="col-md-2 col-3 pe-0">
                          <img
                            className="img-fluid width_services1"
                            src={bookingbyid?.businessImage ? bookingbyid?.businessImage : "/imagess/london.png"}
                            alt="image_crashed"
                          />
                        </div>
                        <div className="col-md-10 col-9 ps-0 m-auto">
                          <p className="m-0 p-0 heading_frinkle">{bookingbyid?.businessName}</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 text-end m-auto">
                    </div>
                  </div>
                  <div className="col-md-12">
                    <hr className="background_line" />
                  </div>
                  <div className="row pt-3">
                    <div className="col-md-12">
                      <p className=" m-0 p-0 label_booking_txt">Venue {bookingbyid?.venue}</p>
                    </div>
                    <div className="col-md-6 mt-2">
                      <div className="row">
                        <div className="col-md-2 col-3 pe-0">
                          <img
                            className="img-fluid width_services11"
                            src="/imagess/locationn.png"
                          />
                        </div>
                        <div className="col-md-10 col-9 ps-0 m-auto">
                          <p className="m-0 p-0 heading_frinkle">{addresss[0]?.addressName}</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 text-end m-auto">
                    </div>
                  </div>
                  <div className="col-md-12 mb-3">
                    <hr className="background_line" />
                  </div>
                  <div className="row pt-3">
                    <div className="col-md-6">
                      <p className=" m-0 p-0 label_booking_txt">Other Portals</p>
                    </div>
                    <div className="col-md-6 text-end">
                      <p className="label_booking_txt"><i className="fas fa-ellipsis-h"></i></p>
                    </div>

                  </div>
                  <div className="col-md-12">
                    <div className="flex_of_cards">
                      {/* <div className="cards1">
                    <img
                      className="img-fluid img_width_cards pb-3"
                      src="/imagess/clipboard.png"
                    />
                    <p className="mb-0 font_cards_width">Booking</p>
                  </div>
                  <div className="cards1">
                    <img
                      className="img-fluid img_width_cards pb-3"
                      src="/imagess/chat.png"
                    />
                    <p className="mb-0 font_cards_width">Chat</p>
                  </div>
                  <div className="cards1">
                    <img
                      className="img-fluid img_width_cards pb-3"
                      src="/imagess/form.png"
                    />
                    <p className="mb-0 font_cards_width">Form</p>
                  </div> */}
                      <div className="cards1 mx-1" onClick={handleClickbookings}>
                        <img
                          className="img-fluid img_width_cards pb-3"
                          src="/imagess/edit.png"
                        />
                        <p className="mb-0 font_cards_width">Edit</p>
                      </div>
                      {/* <div className="cards1">
                    <img
                      className="img-fluid img_width_cards pb-3"
                      src="/imagess/bin.png"
                    />
                    <p className="mb-0 font_cards_width">Delete</p>
                  </div> */}
                      <div className="cards1" onClick={() => setorderId(bookingbyid?.purchaseOrderId)}>
                        <img
                          className="img-fluid img_width_cards pb-3"
                          src="/imagess/document.png"
                        />
                        <p className="mb-0 font_cards_width">Notes</p>
                      </div>
                      {/* <div className="cards1">
                    <img
                      className="img-fluid img_width_cards pb-3"
                      src="/imagess/file.png"
                    />
                    <p className="mb-0 font_cards_width">Documents</p>
                  </div> */}
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>Loading</>
      )}
    </SideBar>
  );
}

export default Service;
