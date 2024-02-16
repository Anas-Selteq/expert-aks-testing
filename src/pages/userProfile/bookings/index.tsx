import React, { useEffect, useState } from "react";
import SideBar from "@/Components/components/sidebar";
import axios from "axios";
import Moment from "react-moment";
import { useRouter } from "next/router";
import {
  getBookingListByCustomerId,
  getPurchaseOrderWithCustomerId,
} from "@/helper";
import { useSelector } from "react-redux";
import Image from "next/image";
import AllBookingslist from "./AllBookingslist/AllBookingslist";

function Bookings() {
  const [tabswitch, setTabswitch] = useState(0);
  const router = useRouter();
  const [showincompleteorders, setShowincompleteorders] = useState<any>();
  const [showcustomerorders, setShowcustomerorders] = useState<any>();
  const [allbookingsss, setAllbookingsss] = useState<any>();
  const [salesorderlisting, setSalesorderlisting] = useState<any>();
  const [purchaseorderlisting, setPurchaseorderlisting] = useState<any>();
  const [verified, setVerified] = useState<any>(false);
  const { profile } = useSelector((state: any) => state);


  useEffect(() => {
    // for complete----------------------- 
    const fetchDataofsalesorder = async () => {
      try {
        // Replace 'your-api-url' with the actual API endpoint you want to request data from
        const apiUrl = `https://gateway.findanexpert.net/sales_order_svc/pb/sales_orders/?customerId=${profile?.userId}&timeZone=Europe/London`;
        const response = await axios.get(apiUrl);
        setSalesorderlisting(response.data.result);
      } catch (error) {
        // Handle errors here
        console.error("Error fetching data:");
      }
    };

    // for incomplete-----------------
    const fetchDataofpurchaseorder = async () => {
      try {
        // Replace 'your-api-url' with the actual API endpoint you want to request data from
        const apiUrl = `https://gateway.findanexpert.net/purchaseorder_svc/pb/getCustomerPurchaseOrder/?customerId=${profile?.userId}&timeZone=Europe/London`;
        const response = await axios.get(apiUrl);
        setPurchaseorderlisting(response.data.result.data);
      } catch (error) {
        // Handle errors here
        console.error("Error fetching data:");
      }
    };
    fetchDataofsalesorder();
    fetchDataofpurchaseorder();
    setVerified(true);
  }, [profile]);









  // Api Applied In In-complete Section --------------------------------------------------------
  // async function allpurchaseorder() {
  //   try {
  //     const config = {
  //       headers: {
  //         Authorization: "Bearer YourAccessToken",
  //         "Content-Type": "application/json",
  //         // Add any other headers you need
  //       },
  //     };
  //     const userid = 1;
  //     const response = await axios.get(
  //       `http://172.187.153.193:8096/purchaseOrder/pb/getCustomerPurchaseOrder/?customerId=${userid}&page=1`
  //     );
  //     const responseData = response;
  //     console.log("pending--------------->", responseData.data.result);
  //     setShowincompleteorders(responseData.data.result);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  // console.log("consoleeeeeeeeeeeeeeeeeeee", showincompleteorders)

  //Api applied but not using Get Customer Order------------------------------------------------------------
  function getCustomerPurchaseOrder() {
    const userid = 20;
    getPurchaseOrderWithCustomerId(userid)
      .then((res) => setShowcustomerorders(res))
      .catch((e) => alert(e));
  }
  // console.log("showcustomerorders list <><>><<><><>", showcustomerorders?.data?.result)

  //Api applied but not using Get Bookings Order------------------------------------------------------------
  // function getallbookings(userId: any) {
  //   getBookingListByCustomerId(userId)
  //     .then((res) => {
  //       setAllbookings(res.data.result.data[0].data.data.data);
  //     })
  //     .catch((e) => alert(e));
  // }

  // console.log("new dataaaaaaaaaaaaaaaaaaaaaaaaaaaaa", allbookings);

  // function to send id to another page
  const handleClick = (id: any) => {
    localStorage.setItem("purchaseorderId", id);
    const nabu = router.push(`/userProfile/bookings/PurchaseOrderDetail/${id}`);
  };

  const handleClickBookingDetail = (id: any) => {
    localStorage.setItem("purchaseorderId", id);
    const nabu = router.push(`/userProfile/bookings/Servicedetail/${id}`);
  };

  const handleClicksales = (id: any) => {
    localStorage.setItem("purchaseorderId", id);
    const nabu = router.push(`/userProfile/bookings/SaleOrderDetail/${id}`);
  };

  return (
    <SideBar activeIndex={3}>
      {verified ? (
        <div className="side_nav_1_right" style={{ height: "100vh" }}>
          {/* sub header ------------------------------  */}
          <div className="col-md-12 background_sidenav_one ">
            <div className="col-md-12 bg-white border_of_subheader px-3 ">
              <div className="row">
                <div className="col-md-5 ">
                  <div className="row">
                    <div className="col-md-3 col-12 m-auto">
                      <p
                        className="m-0 p-0"
                        style={{
                          width: "100%",
                          fontSize: "18px",
                          fontFamily: "Roboto",
                          fontWeight: "800",
                          fontStyle: "normal",
                          letterSpacing: "normal",
                          color: "#404145",
                        }}
                      >
                        Bookings
                      </p>
                    </div>
                    <div
                      className={`col-md-3 col-4 equal_padding text-center ${tabswitch === 0
                        ? "color_bookings2_active"
                        : "color_bookings2"
                        }`}
                      onClick={() => setTabswitch(0)}
                    >
                      Bookings
                    </div>
                    <div
                      className={`col-md-3 col-4 equal_padding text-center ${tabswitch === 1
                        ? "color_bookings2_active"
                        : "color_bookings2"
                        }`}
                      onClick={() => setTabswitch(1)}
                    >
                      Complete Orders
                    </div>
                    <div
                      className={`col-md-3 col-4 equal_padding text-center ${tabswitch === 2
                        ? "color_bookings2_active"
                        : "color_bookings2"
                        }`}
                      onClick={() => setTabswitch(2)}
                    >
                      Incomplete Orders
                    </div>
                  </div>
                </div>
                <div className="col-md-7 m-auto text-end">
                  {/* <span className="color_bookings1">
                    <i className="fas fa-search"></i> Search
                  </span>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <span className="color_bookings1">
                    <i className="fas fa-filter"></i> Filter
                  </span> */}
                  {/* <button className="button_set_search px-2">
                    <img
                      className="img-fluid"
                      src="/imagess/redicons/search.png"
                    />
                    &nbsp; Search
                  </button>
                  <button className="button_set_search px-4">
                    <img
                      className="img-fluid"
                      src="/imagess/redicons/vector.png"
                    />
                    &nbsp; Filter
                  </button> */}
                </div>
              </div>
            </div>
            <div className="col-md-12 fix_height_bookings margin_bottom_new" >
              {/* content for page ----------------------------  */}
              {tabswitch === 0 ? (
                // For Bookings Tab ---------------------------------------------------------------------
                <div className="col-md-12 pb-3 white_bg_new mt-3 universal_cursor">

                  <AllBookingslist />

                </div>
              ) : tabswitch === 1 ? (
                // For Completed orders Tab ---------------------------------------------------------------------
                <div>
                  {/* className="col-md-12 padding_left_right" id="style-2" */}
                  {/* {allbookings?.map((item: any, index: any) => {
                    console.log("Bookings list <><>><<><><>", item);
                    return (
                      <div
                        key={index}
                        onClick={() => handleClick(item?.purchaseOrderId)}
                        className="col-md-12 background_color_booking_list"
                      >
                        <div className="row">
                          <div className="col-md-6">
                            <div className="row">
                              <div className="col-md-2 text-end">
                                <img
                                  className="img-fluid img_width_listing"
                                  src="../images/woman.png"
                                />
                              </div>
                              <div className="col-md-10 m-auto">
                                <h6 className="mb-1 color_microlaser">
                                  Customer Name: {item?.customerName}{" "}
                                  {item?.purchaseOrderId}
                                </h6>
                                <p className="mb-0 london_text">
                                  Provider Name: {item?.providerName}
                                </p>
                                <p className="mb-0 london_text_sub">
                                  {item?.createdAt
                                    ?.substring(0, 19)
                                    .replace("T", " ")}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-6 text-end m-auto">
                            <p className="mb-0 london_text_sub1">
                              {item?.createdAt
                                ?.substring(0, 19)
                                .replace("T", " ")}
                              &nbsp;&nbsp;&nbsp;
                              <i className="fas fa-angle-right"></i>
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })} */}
                  {/* will be replaced  */}
                  <>
                    {salesorderlisting ? (
                      <>
                        <div>
                          {salesorderlisting?.map((item: any, index: any) => {
                            console.log("salesss <><>><<><><>", item);
                            return (
                              <div
                                key={index}
                                onClick={() =>
                                  handleClicksales(item?.salesOrderId)
                                }
                                className="col-md-12 background_color_booking_list"
                              >
                                <div className="row">
                                  <div className="col-md-6">
                                    <div className="row">
                                      <div className="col-md-3 text-center col-4 px-md-0 px-md-2 ps-3">
                                        <img
                                          className="img-fluid img_width_listing"
                                          src="/imagess/avatar.png"
                                        />
                                      </div>
                                      <div className="col-md-9  ps-md-0 col-8 m-auto">
                                        <p className="mb-1 color_microlaser">
                                          {item?.servicePayload?.serviceName}
                                        </p>
                                        <p className="mb-0 london_text ">
                                          {item?.providerName}, {item?.serviceType}
                                        </p>
                                        <p className="mb-0 london_text_sub pt-2">
                                          {/* {item?.createdAt
                                          ?.substring(0, 19)
                                          .replace("T", " ")} */}
                                          <Moment format="DD MMM, YYYY">
                                            {item?.bookingDate}
                                          </Moment>
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-6 pe-0 col-12 text-end m-auto">
                                    <p className="mb-0 london_text_sub1">
                                      {/* <Moment format="h:mm A">
                                        {item?.createdAt}
                                      </Moment> */}
                                      {item?.timeFrom} to{" "}
                                      {item?.timeTo}

                                      &nbsp;&nbsp;&nbsp;
                                      <Image
                                        src="/assets/Images/rightt.png"
                                        alt="keyright"
                                        height={11.19}
                                        width={6.33}
                                      />
                                    </p>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </>
                    ) : (
                      <div className="col-md-12 text-center pt-5">
                        <div
                          className="spinner-border text-danger"
                          role="status"
                        >
                          <span className="sr-only">Loading...</span>
                        </div>
                      </div>
                    )}
                  </>
                </div>
              ) : tabswitch === 2 ? (
                // For incompleted orders Tab ---------------------------------------------------------------------
                <div>
                  {/* className="col-md-12 padding_left_right" id="style-2" */}
                  {/* {showincompleteorders ? (
                    <>
                      {showincompleteorders?.data?.map(
                        (item: any, index: any) => {
                          console.log("orders list", item);
                          return (
                            <div
                              key={index}
                              className="col-md-12 background_color_booking_list"
                            >
                              <div className="row">
                                <div className="col-md-6">
                                  <div className="row">
                                    <div className="col-md-2 text-end">
                                      <img
                                        className="img-fluid img_width_listing"
                                        src="../images/woman.png"
                                      />
                                    </div>
                                    <div className="col-md-10 m-auto">
                                      <h6 className="mb-1 color_microlaser">
                                        Customer Name:{" "}
                                        {item?.data?.customerName}
                                      </h6>
                                      <p className="mb-0 london_text">
                                        Provider Name:{" "}
                                        {item?.data?.providerName}
                                      </p>
                                      <p className="mb-0 london_text_sub">
                                        {item?.data?.createdDateTimeUTC
                                          ?.substring(0, 19)
                                          .replace("T", " ")}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-md-6 text-end m-auto">
                                  <p className="mb-0 london_text_sub1">
                                    {item?.data?.createdDateTimeUTC
                                      ?.substring(0, 19)
                                      .replace("T", " ")}
                                    <i className="fas fa-angle-right"></i>
                                  </p>
                                </div>
                              </div>
                            </div>
                          );
                        }
                      )}
                    </>
                  ) : (
                    <div className="col-md-12 text-center pt-5">
                      <div className="spinner-border text-danger" role="status">
                        <span className="sr-only">Loading...</span>
                      </div>
                    </div>
                  )} */}
                  {/* will be replaced  */}
                  <>
                    {purchaseorderlisting ? (
                      <>
                        <div>
                          {purchaseorderlisting?.map((item: any, index: any) => {
                            console.log("purchaseorder <><>><<><><>", item?.data);
                            return (
                              <div
                                key={index}
                                onClick={() =>
                                  handleClick(item?.data?.purchaseOrderId)
                                }
                                className="col-md-12 background_color_booking_list"
                              >
                                <div className="row">
                                  <div className="col-md-6">
                                    <div className="row">
                                      <div className="col-md-3 text-center col-4 px-md-0 px-md-2 pe-3">
                                        <img
                                          className="img-fluid img_width_listing"
                                          src="/imagess/avatar.png"
                                        />
                                      </div>
                                      <div className="col-md-9 px-md-0 col-8 m-auto">
                                        <p className="mb-1 color_microlaser">
                                          {item?.data?.serviceName}
                                        </p>
                                        <p className="mb-0 london_text ">
                                          {item?.data?.serviceType}
                                        </p>
                                        <p className="mb-0 london_text_sub pt-2">
                                          {/* {item?.createdAt
                                        ?.substring(0, 19)
                                        .replace("T", " ")} */}
                                          {/* <Moment format="DD MMM, YYYY"> */}
                                          {item?.data?.bookingDate === null ? <>No Booking Date</> : item?.data?.bookingDate}
                                          {/* </Moment> */}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-6  pe-0 col-12 text-end m-auto">
                                    <p className="mb-0 london_text_sub1">
                                      {/* <Moment format="h:mm A">
                                        {item?.data?.createdAt}
                                      </Moment> */}
                                      {item?.data?.timeFrom === "" ? <>No Start Date</> : item?.data?.timeFrom} -  {item?.data?.timeTo === "" ? <>No End Date</> : item?.data?.timeTo}
                                      &nbsp;&nbsp;&nbsp;
                                      <Image
                                        src="/assets/Images/rightt.png"
                                        alt="keyright"
                                        height={11.19}
                                        width={6.33}
                                      />
                                    </p>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </>
                    ) : (
                      <div className="col-md-12 text-center pt-5">
                        <div
                          className="spinner-border text-danger"
                          role="status"
                        >
                          <span className="sr-only">Loading...</span>
                        </div>
                      </div>
                    )}
                  </>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      ) : (
        <>loading........</>
      )}
    </SideBar>
  );
}

export default Bookings;
