import React, { useState, useEffect } from "react";
import axios from "axios";
import SideBar from "@/Components/components/sidebar";
import { useRouter } from "next/router";
import Moment from "react-moment";
import Link from "next/link";
import { getBookingsWithId, getPurchaseOrderWithId } from "@/helper";
import { useDispatch, useSelector } from "react-redux";
import { AUTH_ACTIONS } from "@/Redux/Actions/loginPageAction";
import { json } from "stream/consumers";

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
  const [datee, setDate] = useState<any>([]);
  const router = useRouter();
  const { profile } = useSelector((state: any) => state);
  const { bookingDetail } = useSelector((state: any) => state);
  const [JwtRefreshToken, setJwtRefreshToken] = useState<any>("");
  // console.log("Sssssssssssssssssssssssssssssss", bookingDetail);
  const { id } = router.query;

  const storedId: string | null =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("purchaseorderId") as string)
      : null;

  useEffect(() => {
    const appointmentid: any | null = localStorage.getItem(
      "bookingdetailforbookingnull"
    );
    const appointmentidparsed: any | null = JSON.parse(appointmentid);
    console.log("appointmentid", appointmentidparsed);
    if (appointmentid && appointmentidparsed) {
      allpurchaseorder(
        appointmentidparsed?.expertBookingId,
        JSON.parse(appointmentid)
      );
    }
  }, []);

  useEffect(() => {
    setJwtRefreshToken(localStorage?.getItem("jwtRefreshToken"));
  }, []);

  // Api Applied In In-complete Section --------------------------------------------------------
  async function allpurchaseorder(storedId: any, appointmentid: any) {
    console.log(
      "appointmentid",
      appointmentid?.appointments[0]?.expertAppointmentId
    );
    getBookingsWithId(
      storedId,
      appointmentid?.appointments[0]?.expertAppointmentId
    )
      .then((res) => {
        setBookingbyid(res?.result);
        setPurschaseOrderId(res?.result?.data?.purchaseOrderId);
        setAddress(res?.result?.address?.pickupAddress[0]);
        localStorage.setItem(
          "selected_address",
          JSON.stringify(res?.result?.address?.dropOffAddress[0]?.addressName)
        );
      })
      .catch((e) => console.log(e));
  }

  useEffect(() => {
    const Jwtset = async () => {
      // Convert the JWT token object to a string
      // const jwtTokenString = JSON.stringify(JwtRefreshToken);

      // Encode the JWT token to Base64
      const base64Token = Buffer.from(JwtRefreshToken).toString("base64");

      try {
        const response = await axios.get(
          `https://gateway.findanexpert.net/signup_svc/pb/users/getnewRefreshToken?tokenModel=${base64Token}`
        );
        // localStorage.setItem("jwtRefreshToken", response?.data?.result?.jwtRefreshToken)
        // localStorage.setItem("jwtToken", response?.data?.result?.jwtToken)
        if (response?.data?.code === 0) {
          localStorage.setItem(
            "jwtRefreshToken",
            response?.data?.result?.jwtRefreshToken
          );
          localStorage.setItem("jwtToken", response?.data?.result?.jwtToken);
        }
        // Only update state if the component is still mounted
      } catch (error) {
        console.log(error);
      }
    };
    if (JwtRefreshToken) {
      Jwtset();
    }
  }, [JwtRefreshToken]);

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
    const formattedCreatedAt = new Date(
      bookingbyid?.createdAt?.replace("Z", "")
    ).toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      timeZoneName: "short",
    });
    setDate(formattedCreatedAt);
  }, [bookingbyid?.createdDateTimeUTC]);

  const setorderId = (item: any) => {
    console.log("new", item);
    //  return;
    localStorage.setItem("orderId", item);
    router.replace("/flowManagementPages/Notesedit");
  };

  const bookinglist = () => {
    router.push("/AllBookingsNew");
  };

  const chatroute = (providerid: any, alldata: any) => {
    router.push(`/Chat/${providerid}`);
    localStorage.setItem("bookingdetailforchat", JSON.stringify(alldata));
  };

  const bookingedit = (providerID: any, alldata: any) => {
    router.push(`/Editbookings/${providerID}`);
    localStorage.setItem("bookingdetailforchat", JSON.stringify(alldata));
  };

  // to cancel booking this is the api that we will use  ---------------------------------------------------------------------

  console.log("mmmmmmmonmm", bookingbyid);

  return (
    <SideBar activeIndex={3}>
      {bookingbyid?.dateJson ? (
        <>
          <div className="side_nav_1_right">
            {/* sub header ------------------------------  */}
            <div className="col-md-12 background_sidenav_one padding_bottom_boking margin_bottom_new">
              <div className="col-md-12 padding_left_right1  ">
                <p className="m-0 p-0 manage_v_text mt-4 ">Booking Detail</p>
                {/* <p className='m-0 p-0 sub_manage_v_text mb-3 mt-1'>Following is detail of your booking</p> */}
                <div className="col-md-12 background_detail_bookings px-3 py-2 mt-3">
                  <div className="row">
                    <div className="col-md-1 col-2 pe-0 pt-1">
                      <img
                        className="img-fluid booking_detail_img"
                        src="/imagess/detailimg.png"
                      />
                    </div>
                    <div className="col-md-11 col-10 m-auto">
                      <div className="row">
                        <div className="col-md-6 col-8">
                          <p className="m-0 p-0 new_detail_heading">
                            {bookingbyid?.servicePayload?.serviceName}
                            <br />{" "}
                            <span className="new_light_detail">
                              (x{bookingbyid?.quantity})
                            </span>
                          </p>
                          <p className="m-0 p-0 new_detail_heading">
                            <span className="new_light_detail">
                              Booking: {bookingbyid?.expertBookingId}
                            </span>
                          </p>
                        </div>
                        <div className="col-md-6 col-4 pt-4 text-end">
                          <p className="m-0 p-0 progress_new_price">
                            £{bookingbyid?.amountpayable}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <hr className="m-0 mt-2 p-0 background_line" />
                  </div>
                  <div className="col-md-12">
                    <p className="m-0 p-0 new_detail_heading">
                      <span className="new_light_detail">Appointment</span>
                    </p>
                    <p className="m-0 p-0 new_detail_heading1">
                      <img className="img-fluid" src="/imagess/calclock.png" />{" "}
                      {bookingbyid?.appointments?.map(
                        (item: any, index: any) => {
                          return (
                            <>
                              {item?.bookingDate}, {item?.timeFrom}-
                              {item?.timeTo}
                            </>
                          );
                        }
                      )}{" "}
                    </p>
                  </div>

                  {/* <div className="col-md-12">
                    <p className="m-0 p-0 new_detail_heading"><span className="new_light_detail">Appointment</span></p>
                    <div className="row">
                      <div className="col-md-6">
                        <p className="m-0 p-0 new_detail_heading1">
                          {bookingbyid?.dateJson ?
                            <>
                              {bookingbyid?.appointments[0]?.bookingDate} - {bookingbyid?.appointments[0]?.timeFrom} - {bookingbyid?.appointments[0]?.timeTo}
                            </>
                            : null} </p>
                      </div>
                      <div className="col-md-6 text-end pt-1">
                        <p className="m-0 p-0 font_completed">{bookingbyid?.isCompleted != false ? <span className="text-warning">pending</span> : <>completed</>}</p>
                      </div>
                    </div>
                  </div> */}
                  {/* <div className="col-md-12">
                    <hr className="m-0 mt-2 p-0 background_line" />
                  </div> */}
                  {/* <div className="col-md-12">
                    <p className="m-0 p-0 new_detail_heading"><span className="new_light_detail">Order {bookingbyid?.purchaseOrderId} </span></p>

                  </div>

                  <div className="col-md-12">
                    <div className="row ">
                      <div className="col-md-12 col-12">
                        <div className="flex_using_booking_d">
                          <div className="active_tab mx-1">
                            <p className="m-0 p-0 th_Jan_active">{bookingbyid?.appointments ? bookingbyid?.appointments[0]?.bookingDate : null}</p>
                            <p className="m-0 p-0 th_Jan_active ">

                              <>{bookingbyid?.appointments ? bookingbyid?.appointments[0]?.timeFrom : null} to {bookingbyid?.appointments ? bookingbyid?.appointments[0]?.timeTo : null}</>

                            </p>
                          </div>

                        </div>
                      </div>
                    </div>
                  </div> */}
                  <div className="col-md-12">
                    <hr className="m-0 mt-2 p-0 background_line" />
                  </div>
                  {/* <div className="col-md-12">
                    <p className="m-0 p-0 new_detail_heading"><span className="new_light_detail">Assigned From</span></p>
                    <p className="m-0 p-0 new_detail_heading1">{bookingbyid?.customerFirstName} {bookingbyid?.customerLastName}</p>
                  </div>
                  <div className="col-md-12">
                    <hr className="m-0 mt-2 p-0 background_line" />
                  </div>
                 */}
                  <div className="col-md-12">
                    <p className="m-0 p-0 new_detail_heading">
                      <span className="new_light_detail">Venue</span>
                    </p>
                    <p className="m-0 p-0 new_detail_heading1">
                      <img
                        className="img-fluid"
                        src="/imagess/locationnew.png"
                      />{" "}
                      {bookingbyid?.venue
                        ? bookingbyid?.venue?.addressName
                        : null}
                    </p>
                  </div>
                  <div className="col-md-12">
                    <hr className="m-0 mt-2 p-0 background_line" />
                  </div>
                  <div className="col-md-12">
                    <p className="m-0 p-0 new_detail_heading">
                      <span className="new_light_detail">Provider </span>
                    </p>
                    <p className="m-0 p-0 new_detail_heading1">
                      <img className="img-fluid" src="/imagess/profilee.png" />{" "}
                      {bookingbyid?.providerName}
                    </p>
                  </div>
                </div>
                {/* <div className="col-md-12 mt-3 ">
                  <div className="row">
                    <div className="col-md  mt-md-0 mt-3 col-6 text-center " onClick={() => chatroute(bookingbyid?.providerId, bookingbyid)}>
                      <div className="col-md-12 background_border">
                        <img className="img-fluid pt-4" src="/imagess/edit2.png" />
                        <p className="m-0 p-0 chat_text mt-3">Chat</p>
                      </div>
                    </div>
                    <div className="col-md  mt-md-0 mt-3 col-6 text-center " onClick={() => setorderId(bookingbyid?.purchaseOrderId)}>
                      <div className="col-md-12 background_border">
                        <img className="img-fluid pt-4" src="/imagess/notes5.png" />
                        <p className="m-0 p-0 chat_text mt-3">Notes</p>
                      </div>
                    </div>
                    <div className="col-md  mt-md-0 mt-3 col-6 text-center " >
                      <div className="col-md-12 background_border">
                        <img className="img-fluid pt-4" src="/imagess/direction2.png" />
                        <p className="m-0 p-0 chat_text mt-3">Direction</p>
                      </div>
                    </div>
                  </div>
                </div> */}
                <div className="display_flex_booking_detail mt-4 ">
                  <div
                    className="with_detail_card text-center py-4 mx-4 universal_cursor"
                    onClick={() => setorderId(bookingbyid?.purchaseOrderId)}
                  >
                    <img className="img-fluid " src="/imagess/notes5.png" />
                    <p className="m-0 p-0 chat_text mt-3">Notes</p>
                  </div>
                  <div
                    className="with_detail_card text-center py-4 mx-4 universal_cursor"
                    onClick={() =>
                      chatroute(bookingbyid?.providerId, bookingbyid)
                    }
                  >
                    <img className="img-fluid " src="/imagess/chat2.png" />
                    <p className="m-0 p-0 chat_text mt-3">Chat</p>
                  </div>
                  <div className="with_detail_card text-center py-4 mx-4 universal_cursor mt-md-0 mt-4">
                    <img className="img-fluid " src="/imagess/doc2.png" />
                    <p className="m-0 p-0 chat_text mt-3">Documents</p>
                  </div>
                  <div className="with_detail_card text-center py-4 mx-4 universal_cursor mt-md-0 mt-4">
                    <img className="img-fluid " src="/imagess/direction2.png" />
                    <p className="m-0 p-0 chat_text mt-3">Directions</p>
                  </div>
                </div>
                <div className="col-md-12 text-center mt-5 ">
                  <button
                    className="btn btn-danger px-5 universal_button_color "
                    onClick={bookinglist}
                  >
                    {" "}
                    Save & Continue{" "}
                  </button>
                </div>
                {/* <div className="col-md-12 border_booking pb-3 px-3">
                  <div className="row pt-3">
                    <div className="col-md-6 col-6">
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
                    <div className="col-md-6 col-4 pt-4 pt-md-0 text-end m-auto">
                      {bookingbyid?.servicePayload?.isCompleted === true ?
                        <p className="m-0 p-0 color_status_red" >Completed</p>
                        : <p className="m-0 p-0 color_status_red" >Pending</p>}
                      <p className="m-0 p-0 heading_frinkle">£{bookingbyid?.totalPrice} </p>
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
                          <p className="m-0 p-0 heading_frinkle">  {bookingbyid?.dateJson ? bookingbyid?.dateJson[0]?.bookingDate : null}</p>
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


                        <div className="active_tab mx-1">
                          <p className="m-0 p-0 th_Jan_active">{bookingbyid?.dateJson ? bookingbyid?.dateJson[0]?.bookingDate : null}</p>
                          <p className="m-0 p-0 th_Jan_active ">

                            <>{bookingbyid?.dateJson ? bookingbyid?.dateJson[0]?.timeFrom : null} to {bookingbyid?.dateJson ? bookingbyid?.dateJson[0]?.timeTo : null}</>

                          </p>
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
                        <div className="col-md-2 col-3 pe-0 ">
                          <img
                            className="img-fluid width_services1"
                            src="/imagess/woman.png"
                          />
                        </div>
                        <div className="col-md-10 col-8 ps-0 m-auto">
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
                    <div className="col-md-6  mt-2">
                      <div className="row">
                        <div className="col-md-2 col-3 pe-0">
                          <img
                            className="img-fluid width_services1"
                            src={bookingbyid?.businessImage}
                          />
                        </div>
                        <div className="col-md-10 col-9 m-auto">
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
                      <p className=" m-0 p-0 label_booking_txt">Venue {bookingbyid[0]?.venue}</p>
                    </div>
                    <div className="col-md-6 mt-2">
                      <div className="row">
                        <div className="col-md-2 col-3 pe-0">
                          <img
                            className="img-fluid width_services11"
                            src="/imagess/locationn.png"
                          />
                        </div>
                        <div className="col-md-10 col-9 m-auto">
                          <p className="m-0 p-0 heading_frinkle">{addresss?.addressName} </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6 text-end m-auto">
                    </div>
                  </div>
                  <div className="col-md-12">
                    <hr className="background_line" />
                  </div>
                  <div className="row pt-3 mb-4">
                    <div className="col-md-6 col-6">
                      <p className=" m-0 p-0 label_booking_txt">Other Portals</p>
                    </div>
                    <div className="col-md-6 text-end col-6" >
                      <p className="label_booking_txt"><i className="fas fa-ellipsis-h"></i></p>
                    </div>

                  </div>
                  <div className="col-md-12">
                    <div className="flex_of_cards">
                     
                      <div className="cards1 mx-1" onClick={handleClickbookings}>
                        <img
                          className="img-fluid img_width_cards pb-3"
                          src="/imagess/edit.png"
                        />
                        <p className="mb-0 font_cards_width">Edit</p>
                      </div>
                   
                      <div className="cards1" onClick={() => setorderId(bookingbyid?.purchaseOrderId)}>
                        <img
                          className="img-fluid img_width_cards pb-3"
                          src="/imagess/document.png"
                        />
                        <p className="mb-0 font_cards_width">Notes</p>
                      </div>
                    
                    </div>
                  </div>

                </div> */}
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="col-md-12 text-center mt-5 pt-5">
          <div className="spinner-border text-danger" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
    </SideBar>
  );
}

export default Service;
