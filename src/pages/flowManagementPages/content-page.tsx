import Layout2 from "@/Components/Layout2/Layout2";
import React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ServicePageMovement } from "@/Components/service_page_movement";
import {
  getOrderIdInLocalStorage,
  getPaymentFromLocalStorage,
  getServiceFromLocalStorage,
  setOrderIdInLocalStorage,
} from "@/Components/helper";
import Image from "next/image";
import {
  getFlowManagementBySKU,
  getPurchaseOrderWithId,
  postPurchaseOrder,
} from "@/helper";
import { useSelector } from "react-redux";
import axios from "axios";
import Head from "next/head";
import Link from "next/link";

function Contentpage() {
  /* -------------------------------------------------------------------------- */
  /*                                  Variables                                 */
  /* -------------------------------------------------------------------------- */
  const [object, setObject] = useState<any>();
  const { profile } = useSelector((state: any) => state);
  const [jwtToken, setJwtToken] = useState<any>(null);
  const [Seo, setSEO] = useState<any>(null);
  const [data, setData] = useState<any>([]);
  const [noflow, setNoflow] = useState<any>("");
  const router = useRouter();

  /* -------------------------------------------------------------------------- */
  /*                                  Functions                                 */
  /* -------------------------------------------------------------------------- */
  /* -------------------------- Create Purchase Order ------------------------- */
  const handleFlowScreen = () => {
    const service = getServiceFromLocalStorage();
    const servicetosend = {
      serviceName: service?.serviceName,
      serviceDetail: service?.shortDesc,
      bookingDuration: service?.duration,
      isSessionBasedBooking: false,
      customerName: null,
      isCompleted: false,
      isCheckedIn: false,
    };
    const orderId = getOrderIdInLocalStorage();
    if (service === null || !profile.userId) {
      alert("Please Select Service or Login");
      router.replace("/auth/signup");
    } else {
      if (object && object.result?.bookingFlow?.length === 0) {
        alert("No Flow Found Please Select Another Service");
      } else {
        if (!orderId || orderId === undefined) {
          const bookingFlow = object && object.result?.bookingFlow;
          const object1 = {
            currentStep: 0,
            totalStep: bookingFlow && bookingFlow[0]?.screens.length,
            customerId: profile?.userId,
            customerName: profile?.firstName + profile?.lastName ?? "UNKNOWN",
            customerEmail: profile?.primaryEmail ?? "UNKNOWN@EMAIL.COM",
            customerNumber: profile?.primaryMobile ?? "0987654321",
            customerGender: profile?.genderId ?? "1001",
            bookingFlow: bookingFlow,
            serviceId: service?.serviceId,
            servicePayload: servicetosend,
            serviceSKU: service?.serviceSKU,
            totalPrice: service?.actualPrice,
            totalAmount: service?.actualPrice,
            currency: "gbp",
            serviceImage: `https://1864597015.rsc.cdn77.org/Expert/Attachments/ServiceInventory/${service?.serviceId}.webp`,
            customerImage: `https://1864597015.rsc.cdn77.org/Expert/Attachments/Customer/${profile?.userId}.jpeg`,
            serviceName: service?.serviceName,
            serviceType: "inClinic",
            currencySymbol: "£",
            returnUrl: "https://expert.one/thank_you",
          };
          postPurchaseOrder(object1)
            .then((res) => {
              const importantData = bookingFlow && bookingFlow[0]?.screens;
              const returnedData = ServicePageMovement(
                importantData && importantData[0]?.screenName
              );
              if (returnedData !== "/") {
                setOrderIdInLocalStorage(res?.result?.purchaseOrderId);
                router.push(`/${returnedData}`);
              }
            })
            .catch((e) => alert(e))
            .finally(() => {});
        } else {
          getPurchaseOrderWithId(parseInt(orderId))
            .then((res) => {
              if (parseInt(res?.result?.currentStep) === 0) {
                const returnedData = ServicePageMovement(
                  res?.result?.purchaseOrderFlow[0]?.screens[0]?.screenName
                );
                if (returnedData !== "/") {
                  router.push(`/${returnedData}`);
                }
              }
              if (
                parseInt(res?.result?.currentStep) ===
                parseInt(res?.result?.data?.totalStep)
              ) {
                alert("Payment method is in pending ");
                router.push("/flowManagementPages/expert_payment");
              } else {
                // alert("Already a Purchase Order is in Pending");
                const userConfirmed = confirm("Already a Purchase Order is in Pending. Do you want to continue ! ");
                if(userConfirmed){
                  // localStorage.removeItem("orderId");
                  console.log("yes")
                } else {
                  console.log("no")
                }
                return
                const currentStep = res?.result?.currentStep;
                const returnedData = ServicePageMovement(
                  res?.result?.purchaseOrderFlow[0]?.screens[currentStep - 1]
                    ?.actionId
                );
                if (returnedData !== "/") {
                  router.push(`/${returnedData}`);
                }
              }
            })
            .catch((e) => alert(e));
        }
      }
    }
  };

  useEffect(() => {
    function fetchFlowData() {
      const service = getServiceFromLocalStorage();
      getFlowManagementBySKU(service?.serviceSKU)
        .then((res) => {
          if (res.result?.bookingFlow?.length === 0) {
            console.log("No Flow Found");
            setNoflow("No Flow Found Against This Service !");
          } else {
            setObject(res);
          }
        })
        .catch((e) => alert(e));
    }
    fetchFlowData();
  }, []);

  // get content page content api

  useEffect(() => {
    setJwtToken(localStorage?.getItem("jwtToken"));
  }, [jwtToken]);

  useEffect(() => {
    const service = getServiceFromLocalStorage();
    let isMounted = true; // Flag to track component mount state
    const fetchData = async () => {
      const isToken = jwtToken !== null;
      const headers = {
        Authorization: isToken ? `Bearer ${jwtToken}` : undefined,
        "Content-Type": "application/json",
      };

      try {
        const response = await axios.get(
          `https://gateway.findanexpert.net/serviceinventory_svc/pb/ContentPages/GetContentPageByServiceSKU?serviceSKU=${service?.serviceSKU}`,
          { headers }
        );
        if (isMounted) {
          // Only update state if the component is still mounted
          setData(response.data?.result?.outPutSectionModels);
          console.log("content page data", response.data);
        }
      } catch (error) {
        // setError(error);
        console.log("error", error);
      }
    };
    fetchData();
    const fetchDataSeoPage = async () => {
      const isToken = jwtToken !== null;
      const headers = {
        Authorization: isToken ? `Bearer ${jwtToken}` : undefined,
        "Content-Type": "application/json",
      };

      try {
        const response = await axios.get(
          `https://gateway.findanexpert.net/serviceinventory_svc/pb/Service/GetServiceSEO?serviceSKU=${service?.serviceSKU}`,
          { headers }
        );
        if (isMounted) {
          // Only update state if the component is still mounted
          // setData(response.data?.result?.outPutSectionModels);
          console.log("SEO page api data", response?.data?.result?.serviceDeposit          );
          setSEO(response?.data?.result?.serviceDeposit)
        }
      } catch (error) {
        // setError(error);
        console.log("error", error);
      }
    };
    fetchDataSeoPage();
    return () => {
      isMounted = false; // Set the flag to false when the component unmounts
    };
  }, []);

  // useEffect(() => {
  //   const confirmUnload = (e: any) => {
  //     e.preventDefault();
  //     e.returnValue = ""; // This line is required for some browsers
  //     const userResponse = window.confirm("Are you sure you want to leave?");
  //     if (userResponse) {
  //       localStorage.removeItem("selectedService");
  //     }
  //   };

  //   const handleRouteChange = (url: any) => {
  //     if (url !== "/flowManagementPages/Notesedit") {
  //       const userResponse = window.confirm("Are you sure you want to leave?");
  //       if (userResponse) {
  //         localStorage.removeItem("selectedService");
  //       } else {
  //         router.events.emit("routeChangeError");
  //         throw "routeChange aborted.";
  //       }
  //     }
  //   };

  //   window.addEventListener("beforeunload", confirmUnload);
  //   router.events.on("routeChangeStart", handleRouteChange);

  //   return () => {
  //     window.removeEventListener("beforeunload", confirmUnload);
  //     router.events.off("routeChangeStart", handleRouteChange);
  //   };
  // }, []);

  return (
    <Layout2>
      <Head>
        <title>{Seo?.title}</title>
        <meta name="description" content={Seo?.description} />
      </Head>
      {/* page_scroll */}
      <div className="col-md-12  ">
        {/* sec 1 ----------------------------  */}
        {data?.length === 0 ? (
          <div className="text-center mt-5">
            <img
              className="img-fluid"
              src="/imagess/landingformob/nodata.gif"
            />
          </div>
        ) : (
          <>
            {noflow ? (
              <div className="px-3 mt-3">
                <div className="alert alert-danger" role="alert">
                  <i className="fas fa-stroopwafel fa-spin"></i> {noflow}
                </div>
              </div>
            ) : null}
            {data?.map((item: any, index: any) => {
              return (
                <>
                  {item?.sectionName === "sectionOne" ? (
                    <>
                      <div className="col-md-12 background_color_sec_1 ">
                        <div className="col-md-12 custom_padding_contentpage padding_top_custon_sec1">
                          <div className="row">
                            <div className="col-md-6">
                              <h1 className="h1_sec1_landingpage">
                                {item?.heading1}
                              </h1>
                              <p className="p_sec2_landing">
                                {item?.description1}
                              </p>
                              <p className="p_sec2_landing">
                                Starting Price{" "}
                                <strong className="strong_tag">
                                  {" "}
                                  £{item?.startingPrice}
                                </strong>{" "}
                              </p>
                              <button
                                onClick={handleFlowScreen}
                                className="btn btn-danger background_color_button mt-3"
                              >
                                <i className="fas fa-calendar-alt"></i>
                                &nbsp;&nbsp;Booking your Appointment
                              </button>
                            </div>
                            <div className="col-md-6 on_pc_screeen">
                              <div className="col-md-12 text-center">
                                <img
                                  className="img-fluid width_img_contet"
                                  src={item?.image1}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* sec 2 ----------------------------  */}
                      <div className="col-md-12 custom_padding_contentpage screen_check_query">
                        <div className="row">
                          <div className="col-md-7 ">
                            <div className="col-md-12 bg-white px-4 py-4 box_shadow_card">
                              <div className="row">
                                <div className="col-md-6 font_color_set m-auto">
                                  Want all the Services at our fingertips ?{" "}
                                  <span className="font_color_red">
                                    Download
                                  </span>{" "}
                                  the{" "}
                                  <span className="font_color_red">Expert</span>{" "}
                                  app Now
                                </div>
                                <div className="col-md-2 m-auto">
                                  <span>
                                    <Link href={"https://play.google.com/store/apps/details?id=com.findanexpert&pli=1"} target="_blank">
                                    <img
                                      className="img-fluid"
                                      src="/imagess/redicons/google.svg"
                                    />
                                    </Link>
                                  </span>
                                </div>
                                <div className="col-md-2 m-auto">
                                  <span>
                                    <Link href={"https://apps.apple.com/us/app/expert/id1468090965?ls=1"} target="_blank">
                                    <img
                                      className="img-fluid"
                                      src="/imagess/redicons/google.svg"
                                    />
                                    </Link>
                                  </span>
                                </div>
                                <div className="col-md-2 position_relative">
                                  <span>
                                    <img
                                      className="img-fluid position_aa"
                                      src="/imagess/redicons/mob.svg"
                                    />
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : item?.sectionName === "sectionTwo" ? (
                    <>
                      {/* sec 3 ----------------------------  */}
                      <div className="col-md-12 mb-3 custom_padding_contentpage mt-3">
                        <div className="row">
                          <div className="col-md-4">
                            <img
                              className="img-fluid"
                              src={item?.image1}
                              alt="image_crashed_from_backend"
                            />
                          </div>
                          <div className="col-md-8">
                            {/* <p className="m-0 p-0 get_a_text">Get a</p> */}
                            <h2 className="m-0 p-0 head_free_body">
                              <b>{item?.heading1}</b>
                            </h2>
                            <p className="mt-3 mb-0 p-0 p_tag_service ">
                              {item?.description1}
                            </p>
                            <p className="m-0 p-0 p_tag_service">
                              {item?.description2}
                            </p>
                            <p className="m-0 p-0 p_tag_service">
                              {item?.description3}
                            </p>
                            <div className="row ">
                              <div className="col-md-6 mt-3">
                                <div className="row">
                                  <div className="col-md-3">
                                    <img
                                      className="img-fluid rounded-circle"
                                      src={item?.image2}
                                      alt="image_crashed_from_backend"
                                    />
                                  </div>
                                  <div className="col-md-9 px-0">
                                    <h5 className="m-0 p-0 head_free_body2">
                                      <b>{item?.heading4}</b>
                                    </h5>
                                    <p className="m-0 p-0 p_tag_service">
                                      {item?.description4}
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-6 mt-3">
                                <div className="row">
                                  <div className="col-md-3">
                                    <img
                                      className="img-fluid rounded-circle"
                                      src={item?.image3}
                                      alt="image_crashed_from_backend"
                                    />
                                  </div>
                                  <div className="col-md-9 px-0">
                                    <h5 className="m-0 p-0 head_free_body2">
                                      <b>{item?.heading5}</b>
                                    </h5>
                                    <p className="m-0 p-0 p_tag_service">
                                      {item?.description5}
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-6 mt-3">
                                <div className="row">
                                  <div className="col-md-3">
                                    <img
                                      className="img-fluid rounded-circle"
                                      src={item?.image4}
                                      alt="image_crashed_from_backend"
                                    />
                                  </div>
                                  <div className="col-md-9 px-0">
                                    <h5 className="m-0 p-0 head_free_body2">
                                      <b>{item?.heading6}</b>
                                    </h5>
                                    <p className="m-0 p-0 p_tag_service">
                                      {item?.description6}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : item?.sectionName === "sectionThree" ? (
                    <>
                      {/* sec 4 ----------------------------  */}
                      <div className="col-md-12 background_color_sec_2 pt-2">
                        <div className="col-md-12 text-center pt-4">
                          <h2 className="head_free_body2">
                            <b>{item?.heading1}</b>
                          </h2>
                        </div>
                        <div className="col-md-12 px-4  pt-4">
                          <div className="row">
                            <div className="col-md-4">
                              <img
                                className="img-fluid w-100"
                                src={item?.image1}
                              />
                            </div>
                            <div className="col-md-4">
                              <img
                                className="img-fluid w-100"
                                src={item?.image2}
                              />
                            </div>{" "}
                            <div className="col-md-4">
                              <img
                                className="img-fluid w-100"
                                src={item?.image3}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-md-12 px-5 pb-4 pt-3">
                          <p className="m-0 p_tag_service">
                            {item?.description1}
                          </p>
                        </div>
                        <div className="col-md-12 text-center pb-5">
                          <button className="btn btn-danger background_color_button mt-3">
                            <i className="fas fa-calendar-alt"></i>
                            &nbsp;&nbsp;Booking your Appointment
                          </button>
                        </div>
                      </div>
                    </>
                  ) : item?.sectionName === "sectionFour" ? (
                    <>
                      {/* sec 5 ----------------------------  */}
                      <div className="col-md-12 text-center pt-4 custom_padding_contentpage">
                        <p className="m-0 head_free_body2">
                          <b>
                            Why Choose{" "}
                            <span className="color_red_new">Expert?</span>
                          </b>
                        </p>
                        <div className="col-md-12 pt-4">
                          <div className="row">
                            <div className="col-md-4">
                              <div className="col-md-12 bg_gray_back px-4 py-3">
                                <img
                                  className="img-fluid"
                                  src="/imagess/redicons/instantbookings.png"
                                />
                                <p>
                                  <strong>Instant Booking</strong>
                                </p>
                                <p className="p_tag_service">
                                  No calling, No waiting, just book the service
                                  you want now. Book 24/7 Anytime Anywhere
                                </p>
                              </div>
                            </div>
                            <div className="col-md-4">
                              <div className="col-md-12 bg_gray_back px-4 py-3">
                                <img
                                  className="img-fluid"
                                  src="/imagess/redicons/instantbookings.png"
                                />
                                <p>
                                  <strong>Affordable Prices</strong>
                                </p>
                                <p className="p_tag_service">
                                  Know the exact price before booking. No hidden
                                  changes or fees
                                </p>
                              </div>
                            </div>
                            <div className="col-md-4">
                              <div className="col-md-12 bg_gray_back px-4 py-3">
                                <img
                                  className="img-fluid"
                                  src="/imagess/redicons/instantbookings.png"
                                />
                                <p>
                                  <strong>Vetted Trusted Experts</strong>
                                </p>
                                <p className="p_tag_service">
                                  Qualified Experienced Professionals.
                                  Guaranteed quality service or your money back
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : item?.sectionName === "sectionFive" ? (
                    <>
                      {/* sec 6 ----------------------------  */}
                      <div className="col-md-12 background_color_sec_2 mt-4">
                        <div className="row">
                          <div className="col-md-6 m-auto">
                            <div className="col-md-12 custom_padding_contentpage1">
                              <p className="main_headingg_new">
                                Do You Need All{" "}
                                <span className="color_red_new">Services</span>{" "}
                                at your{" "}
                                <span className="color_red_new">
                                  Fingertips
                                </span>
                              </p>
                              <p className="m-0  pb-2 p_tag_service1">
                                Download the{" "}
                                <span className="color_red_new">
                                  Expert App
                                </span>{" "}
                                Now!
                              </p>
                              <div className="flex_for_images">
                                <img
                                  className="img-fluid"
                                  src="/imagess/redicons/googlesquare.png"
                                />
                                <img
                                  className="img-fluid px-2"
                                  src="/imagess/redicons/applesquare.png"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="col-md-6 text-end">
                            <img
                              className="img-fluid img_width_mobile"
                              src="/imagess/redicons/mobilee.png"
                            />
                          </div>
                        </div>
                      </div>
                    </>
                  ) : item?.sectionName === "sectionSix" ? (
                    <>
                      {/* sec 7 ----------------------------  */}
                      <div className="col-md-12 custom_padding_contentpage pt-4">
                        <div className="row">
                          <div
                            className="col-md-6 m-auto"
                            style={{ lineHeight: "200%", color: "#565656" }}
                          >
                            <ul>
                              <li>
                                You can now book Laser Hair Removal treatment
                                instantly
                              </li>
                              <li>
                                Manage your appointemtn , edit and cancel
                                anytime you want
                              </li>
                              <li>
                                Rest assured you'll book with the best clinics
                                and Expert
                              </li>
                              <li>Most affordable Laser Hair Removal Prices</li>
                              <li>
                                Suitable for Men, Women, all skin and Hair Types
                              </li>
                              <li>
                                Reduction of ingrown Hairs, pigment spots,
                                shavng bumps
                              </li>
                            </ul>
                          </div>
                          <div className="col-md-6 text-center">
                            <img
                              className="img-fluid img_width_monitor"
                              src="/imagess/redicons/monitor.png"
                            />
                          </div>
                        </div>
                      </div>
                    </>
                  ) : null}
                </>
              );
            })}
          </>
        )}
      </div>
    </Layout2>
  );
}

export default Contentpage;
