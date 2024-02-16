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
import {
  getFlowManagementBySKU,
  getPurchaseOrderWithId,
  postPurchaseOrder,
} from "@/helper";
import { useSelector } from "react-redux";
import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import Footer from "@/Components/Footer/Footer";
import { parse } from "path";
import { enqueueSnackbar } from "notistack";

function Contentpage() {
  /* -------------------------------------------------------------------------- */
  /*                                  Variables                                 */
  /* -------------------------------------------------------------------------- */
  const [objectt, setObjectt] = useState<any>();
  const { profile } = useSelector((state: any) => state);
  const [jwtToken, setJwtToken] = useState<any>(null);
  const [Seo, setSEO] = useState<any>(null);
  const [data, setData] = useState<any>([]);
  const [noflow, setNoflow] = useState<any>("");
  const [servicesku, setServicesku] = useState<any>("");
  const [urlseoaddress, setUrlseoaddress] = useState<any>("");
  const router = useRouter();
  const [loadingnew, setLoadingnew] = useState<any>(0);
  const { service } = router.query


  console.log("newdata", data)



  useEffect(() => {
    if (service) {
      const parts = window.location.pathname.split('/');
      const lastPart = parts[parts.length - 1];
      setUrlseoaddress(lastPart);
    }
  }, [service]);
  useEffect(() => {
    const video = document.getElementById('myVideo');
    if (video) {
      video.setAttribute('playsinline', ''); // Request inline playback
      video.setAttribute('autoplay', ''); // Autoplay the video
    }
  }, []);

  // Use another useEffect to update localStorage when urlseoaddress changes
  useEffect(() => {
    if (urlseoaddress) {
      localStorage.setItem("urlseoaddress", urlseoaddress);
    }
  }, [urlseoaddress]);


  /* -------------------------------------------------------------------------- */
  /*                                  Functions                                 */
  /* -------------------------------------------------------------------------- */
  /* -------------------------- Create Purchase Order ------------------------- */
  const handleFlowScreen = () => {
    setLoadingnew(1);
    localStorage.removeItem("orderId");
    localStorage.removeItem("quantity_selected");
    const service: any = getServiceFromLocalStorage();
    const selectedservice: any = localStorage.getItem("selectedService");
    const usingselected: any = JSON.parse(selectedservice);
    localStorage.setItem("onclickselectedservice", selectedservice);


    //   console.log("usingselected", usingselected?.hasAttribute);

    //  return
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
    if (service === null || !profile?.userId) {
      // alert("Please Select Service or Login");
      router.replace("/auth/signup");
    } else {
      if (objectt && objectt.result?.bookingFlow?.length === 0) {
        enqueueSnackbar('No Flow Found Please Select Another Service', { variant: 'error' });
      } else {
        if (!orderId || orderId === undefined) {
          const bookingFlow = objectt && objectt.result?.bookingFlow;
          const object1 = {
            currentStep: 0,
            totalStep: bookingFlow && bookingFlow[0]?.screens.length,
            customerId: profile?.externalCustomerId,
            customerFirstName: profile?.firstName,
            customerLastName: profile?.lastName,
            customerEmail: profile?.primaryEmail ?? "UNKNOWN@EMAIL.COM",
            customerNumber: profile?.primaryMobile ?? "0987654321",
            customerGender: profile?.genderId ?? "1001",
            bookingFlow: bookingFlow,
            serviceId: service?.serviceId,
            servicePayload: servicetosend,
            serviceSKU: service?.serviceSKU,
            // totalPrice: service?.actualPrice,
            // totalAmount: service?.actualPrice,
            totalPrice: "0",
            totalAmount: "0",
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

              if (usingselected?.hasAttributes) {
                setOrderIdInLocalStorage(res?.result?.purchaseOrderId);
                router.push('/flowManagementPages/Serviceattributes')
                localStorage.removeItem("setQuantity_QuantityPage")
                setLoadingnew(0);
              }
              else {
                const importantData = bookingFlow && bookingFlow[0]?.screens;
                const returnedData = ServicePageMovement(
                  importantData && importantData[0]?.screenName
                );
                if (returnedData !== "/") {
                  setOrderIdInLocalStorage(res?.result?.purchaseOrderId);
                  setLoadingnew(0);
                  router.push(`/${returnedData}`);
                }
                localStorage.removeItem("setQuantity_QuantityPage")
              }

            })
            .catch((e) => alert(e))
            .finally(() => { });
        } else {
          getPurchaseOrderWithId(parseInt(orderId))
            .then((res) => {

              const userConfirmed = confirm("Already a Purchase Order is in Pending. Do you want to continue if no then click on cancel below and book service again ");
              if (userConfirmed) {
                if (parseInt(res?.result?.currentStep) === 0) {
                  alert("new2")
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
                  const currentStep = res?.result?.currentStep;
                  const returnedData = ServicePageMovement(
                    res?.result?.purchaseOrderFlow[0]?.screens[currentStep - 1]
                      ?.actionId
                  );
                  if (returnedData !== "/") {
                    router.push(`/${returnedData}`);
                  }
                }
              } else {
                localStorage.removeItem("orderId");
                localStorage.removeItem("quantity_selected");
              }





            })
            .catch((e) => alert(e));
        }
      }
    }
  };

  /* get flow api booking flow --------------------------------------------------*/
  // useEffect(() => {
  //   function fetchFlowData() {
  //     const service = getServiceFromLocalStorage();
  //     getFlowManagementBySKU(servicesku)
  //       .then((res) => {
  //         if (res.result?.bookingFlow?.length === 0) {
  //           console.log("No Flow Found");
  //           setNoflow("No Flow Found Against This Service !");
  //         } else {
  //           setObjectt(res);
  //         }
  //       })
  //       .catch((e) => alert(e));
  //   }
  //   fetchFlowData();
  // }, [servicesku]);

  // get content page content api

  useEffect(() => {
    setJwtToken(localStorage?.getItem("jwtToken"));
  }, [jwtToken]);

  useEffect(() => {
    const { service } = router.query;
    setServicesku(service);

  })

  useEffect(() => {

    // Data of content page api ----------------------------------------------------------------------------------------- 
    const service = getServiceFromLocalStorage();
    let isMounted = true; // Flag to track component mount state
    const fetchbookingflow = async () => {
      const isToken = jwtToken !== null;
      const headers = {
        // Authorization: isToken ? `Bearer ${jwtToken}` : undefined,
        "Content-Type": "application/json",
      };

      try {
        const response = await axios.get(
          `https://gateway.findanexpert.net/serviceinventory_svc/pb/Booking/GetBookingFlowByServiceSKU?ServiceSKU=${servicesku}`,
          { headers }
        );
        if (isMounted) {
          // Only update state if the component is still mounted

          console.log("content page data booking", response);
          setObjectt(response.data);
        }
      } catch (error) {
        // setError(error);
        console.log("error", error);
      }
    };
    fetchbookingflow();
    const fetchData = async () => {
      const isToken = jwtToken !== null;
      const headers = {
        Authorization: isToken ? `Bearer ${jwtToken}` : undefined,
        "Content-Type": "application/json",
      };

      try {
        const response = await axios.get(
          `https://gateway.findanexpert.net/serviceinventory_svc/pb/ContentPages/GetContentPageByServiceSKU?serviceSKU=${servicesku}`,
          { headers }
        );
        if (isMounted) {
          // Only update state if the component is still mounted
          setData(response.data?.result?.sections);
          console.log("content page data", response.data);
        }
      } catch (error) {
        // setError(error);
        console.log("error", error);
      }
    };
    fetchData();
    // To get SEO deatils api -------------------------------------------------------------------------------------------
    const fetchDataSeoPage = async () => {
      const isToken = jwtToken !== null;
      const headers = {
        Authorization: isToken ? `Bearer ${jwtToken}` : undefined,
        "Content-Type": "application/json",
      };

      try {
        const response = await axios.get(
          `https://gateway.findanexpert.net/serviceinventory_svc/pb/Service/GetServiceSEO?serviceSKU=${servicesku}`,
          { headers }
        );
        if (isMounted) {
          // Only update state if the component is still mounted
          // setData(response.data?.result?.outPutSectionModels);
          console.log("SEO page api data", response?.data?.result?.serviceDeposit);
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
  }, [servicesku]);



  return (
    <Layout2>
      <Head>
        <title>{Seo?.title}</title>
        <meta name="description" content={Seo?.description} />
      </Head>
      {/* page_scroll */}

      <div className="col-md-12 bg-white  overflow_x_content_detail_page">
        {/* sec 1 -------------------------------------------------------------------------------------------------------------------------------------  */}
        {data?.length === 0 ? (
          <div className="text-center mt-5">
            <div className="spinner-border text-danger" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <>
            {data?.map((item: any, index: any) => {
              console.log("itemmmm", item)
              return (
                <>
                  {item?.sectionName === "sectionOne" ? (
                    <>
                      <div className="col-md-12 background_color_sec_22 ">
                        <div className="col-md-12 custom_padding_contentpage padding_top_custon_sec1">
                          <div className="row">
                            <div className="col-md-3  mt-md-4 pt-md-3">
                              <div className="col-md-12">
                                <img
                                  className="img-fluid width_img_contet"
                                  src={item?.image1}
                                />
                              </div>
                            </div>
                            <div className="col-md-5 ">
                              <p className="m-0 p-0 mt-md-5 font_contentpage">  {item?.heading1}</p>
                              <span><span className="font_only_c pt-2">From Only</span>&nbsp;&nbsp;<span><button className="btn btn-light background_white_light rounded-pill py-0 px-3"><span className="amount_c_pound">£</span><span className="amount_c"> {item?.startingPrice}</span></button></span></span>
                              <div className="row mt-md-5">
                                <div className="col-md-5 ">
                                  <div className="col-md-12 text-center pb-1">
                                    <p className="m-0 p-0 heading_exp_c display_pc">Continue on Expert Website</p>
                                  </div>
                                  <div className="pb-5 pt-2 py-md-0">
                                    <button  onClick={handleFlowScreen} className="btn btn-danger w-100 rounded-pill py-1 mt-2 muy background_color_button_c" > Select </button>
                                  </div>
                                </div>
                                <div className="col-md-2 text-center m-auto display_pc" >
                                  <p className="m-0 p-0 or_color_size">or</p>
                                </div>
                                <div className="col-md-5  px-md-0 display_pc">
                                  <div className="col-md-12 text-center pb-1">
                                    <p className="m-0 p-0 heading_exp_c">Book it on Expert App</p>
                                  </div>
                                  <img className="img-fluid px-0 mt-2" src="/imagess/plays.png" />
                                </div>
                              </div>
                            </div>
                            <div className="col-md-4 display_pc ">
                              <img
                                className="img-fluid mb-3"
                                src="/imagess/mob-shade.png"
                              />
                            </div>
                            {/* <div className="col-md-6">
                              <h1 className="h1_sec1_landingpage">
                                {item?.heading1}
                              </h1>
                              <p className="p_sec2_landing">
                                {item?.description1}
                              </p>
                              <p className="p_sec2_landing">
                                From&nbsp;
                                <strong className="strong_tag">
                                  {" "}
                                  £{item?.startingPrice}
                                </strong>{" "}
                                <span className="ps-4"> Discounted</span>&nbsp;
                                <strong className="strong_tag">
                                  {" "}
                                  £{item?.discountedPrice}
                                </strong>{" "}
                              </p>
                              <button
                                onClick={handleFlowScreen}
                                className="btn btn-danger background_color_button "
                              >
                                <i className="fas fa-calendar-alt"></i>
                                &nbsp;&nbsp;Book Now&nbsp;&nbsp;
                                {loadingnew === 1 ?
                                  <>
                                    &nbsp;&nbsp;
                                    <div className="spinner-border spinner-border-sm text-light" role="status">
                                      <span className="visually-hidden">Loading...</span>
                                    </div>
                                  </>
                                  : null
                                }
                              </button>
                            </div> */}


                          </div>
                        </div>
                      </div>
                      {/* sec 2 -------------------------------------------------------------------------------------------------------------------------------------  */}
                      {/* <div className="col-md-12  custom_padding_contentpage screen_check_query">
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
                      </div> */}
                    </>
                  ) : item?.sectionName === "sectionTwo" ? (
                    <>
                      {/* sec 3 -------------------------------------------------------------------------------------------------------------------------------------  */}
                      <div className="col-md-12 mb-3   custom_padding_contentpage mt-md-3 mt-5">
                        {/* for pc screen ---  */}
                        <div className="row on_pc_screeen">
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
                          <div className="col-md-4 pt-md-5">
                            <img
                              className="img-fluid pt-md-5"
                              src={item?.image1}
                              alt="image_crashed_from_backend"
                            />
                          </div>

                        </div>
                        {/* for mobile screen ---- */}
                        <div className="row mobile_screen_display">
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
                            <div className="row ps-2 pe-4 px-md-5">
                              <div className="col-md-6 mt-md-3 mt-4">
                                <div className="row">
                                  <div className="col-md-3 col-3 m-auto">
                                    <img
                                      className="img-fluid rounded-circle"
                                      src={item?.image2}
                                      alt="image_crashed_from_backend"
                                    />
                                  </div>
                                  <div className="col-md-9 col-9 px-0">
                                    <h5 className="m-0 p-0 head_free_body2">
                                      <b>{item?.heading4}</b>
                                    </h5>
                                    <p className="m-0 p-0 p_tag_service">
                                      {item?.description4}
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-6 mt-md-3 mt-4">
                                <div className="row">
                                  <div className="col-md-3 col-3 m-auto">
                                    <img
                                      className="img-fluid rounded-circle"
                                      src={item?.image3}
                                      alt="image_crashed_from_backend"
                                    />
                                  </div>
                                  <div className="col-md-9 col-9 px-0">
                                    <h5 className="m-0 p-0 head_free_body2">
                                      <b>{item?.heading5}</b>
                                    </h5>
                                    <p className="m-0 p-0 p_tag_service">
                                      {item?.description5}
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-6 mt-md-3 mt-4">
                                <div className="row">
                                  <div className="col-md-3 col-3 m-auto">
                                    <img
                                      className="img-fluid rounded-circle"
                                      src={item?.image4}
                                      alt="image_crashed_from_backend"
                                    />
                                  </div>
                                  <div className="col-md-9 col-9 px-0">
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
                          <div className="col-md-4 mt-md-5 mt-5 mb-md-5 mb-5">
                            <img
                              className="img-fluid"
                              src={item?.image1}
                              alt="image_crashed_from_backend"
                            />
                          </div>
                        </div>
                      </div>
                    </>
                  ) : null}


                </>
              );
            })}

            {/* static section that will come below every page -------------------------------------------------------------------------------------------------- */}
            <>
              {/* sec 5 ----------------------------------------------------------------------------------------------------------------------------------------  */}
              <div className="col-md-12  pt-4 ">

                <div className="col-md-12 pt-4 px-2">
                  <div className="row">
                    <div className="col-md-3 ps-0 mt-md-0 mt-4">
                      <img className="img-fluid" src="/imagess/ladiesfoot.png" />
                    </div>
                    <div className="col-md-9 m-auto pe-md-5">
                      <div className="row pe-md-5">
                        <div className="col-md-12 pb-4">
                          <p className="m-0 head_free_body2">

                            Why Choose{" "}
                            <span className="color_red_new">Expert?</span>

                          </p>
                        </div>
                        <div className="col-md-4 text-center  m-md-auto ">
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
                        <div className="col-md-4 text-center m-md-auto  mt-4">
                          <div className="col-md-12 bg_gray_back px-4 py-3">
                            <img
                              className="img-fluid"
                              src="/imagess/tag.png"
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
                        <div className="col-md-4 text-center m-md-auto  mt-4">
                          <div className="col-md-12 bg_gray_back px-4 py-3">
                            <img
                              className="img-fluid"
                              src="/imagess/shield.png"
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
                  <div className="row">


                  </div>
                </div>
              </div>
            </>

            <div className="col-md-12 mt-5 background_content_sec4 mb-5">
              <div className="col-md-12 text-center pt-5">
                <p className="heading1_contentpage m-0 pt-3">Want to Speak to us</p>
                <p className="heading2_contentpage ">before Booking?</p>
              </div>
                <div className="col-md-12 margine_left_new ">
                  <div className="using_flex_contentpage mt-md-5">
                    <div>
                      <img className="img-fluid" src="/imagess/phone.png" />
                    </div>
                    <div className="pt-3 ps-3">
                      <p className="m-0 p-0 text_speak ">020 7099 7738</p>
                    </div>
                  </div>
                  <div className="using_flex_contentpage mt-3">
                    <div>
                      <img className="img-fluid" src="/imagess/message.png" />
                    </div>
                    <div className="pt-3 ps-3">
                      <p className="m-0 p-0 text_speak ">contact@expert.one</p>
                    </div>
                  </div>
                  <div className="using_flex_contentpage mt-3">
                    <div>
                      <img className="img-fluid" src="/imagess/cchat.png" />
                    </div>
                    <div className="pt-3 ps-3">
                      <p className="m-0 p-0 text_speak ">Live Chat</p>
                    </div>
                  </div>
                  </div>
            </div>

            <>
              {/* sec 7 ----------------------------  */}
              <div className="col-md-12 custom_padding_contentpage pt-4">
                <div className="row">
                  <div className="col-md-6 text-center mt-md-0 mt-3  position_main_container ">
                    <div className="col-md-12 position_abs_monitor ">
                      <img
                        className="img-fluid img_width_monitor "
                        src="/imagess/redicons/monitor.png"
                      />
                    </div>
                    <div className="col-md-12 position_abs_monitor">
                      <video className="my_video" id="myVideo" controls muted loop playsInline autoPlay>
                        <source src="https://1864597015.rsc.cdn77.org/Uploads/CustomerPages/B891B2FCEA2443A69933C9208B6380E5.mp4" type="video/mp4" />
                      </video>
                    </div>
                  </div>
                  <div
                    className="col-md-6 points_content_detail_page m-auto"
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


                </div>
              </div>
            </>

            <>
              {/* sec 6 ----------------------------  */}
              <div className="col-md-12 background_color_sec_2 mt-4">
                <div className="row">
                  <div className="col-md-6 m-auto">
                    <div className="col-md-12 custom_padding_contentpage1 pt-md-0 pt-4">
                      <p className="main_headingg_new">
                        Do You Need All{" "}
                        <span className="color_red_new"><strong>Services</strong></span>{" "}
                        at your{" "}
                        <span className="color_red_new">
                          <strong> Fingertips</strong>
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
                        <Link href={"https://play.google.com/store/apps/details?id=com.findanexpert&pli=1"} target="_blank">
                          <img
                            className="img-fluid"
                            src="/imagess/redicons/googlesquare.png"
                          />
                        </Link>
                        <Link href={"https://apps.apple.com/us/app/expert/id1468090965?ls=1"} target="_blank">
                          <img
                            className="img-fluid px-2"
                            src="/imagess/redicons/applesquare.png"
                          />
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 text-end pt-md-0 pt-5 pb-md-0 pb-5">
                    <img
                      className="img-fluid img_width_mobile"
                      src="/imagess/redicons/mobilee.png"
                    />
                  </div>
                </div>
              </div>
            </>


            {data?.map((item: any, index: any) => {
              console.log("itemmmm", item)
              return (
                <>
                  {item?.sectionName === "sectionThree" ? (
                    <>
                      {/* sec 4 -------------------------------------------------------------------------------------------------------------------------------------  */}
                      <div className="col-md-12 mt-5 custom_padding_contentpage pt-2">
                        <div className="col-md-12 px-4  pt-md-4 pt-3">
                          <div className="row">
                            <div className="col-md-4 mt-md-0 mt-1">
                              <img
                                className="img-fluid w-100"
                                src={item?.image1}
                              />
                            </div>
                            <div className="col-md-4 mt-md-0 mt-1">
                              <img
                                className="img-fluid w-100"
                                src={item?.image2}
                              />
                            </div>{" "}
                            <div className="col-md-4 mt-md-0 mt-1">
                              <img
                                className="img-fluid w-100"
                                src={item?.image3}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-md-12 mt-2 px-4 pb-4 pt-3">
                          <p className="m-0 p_tag_service">
                            {item?.description1}
                          </p>
                        </div>
                        <div className="col-md-12 text-center pb-5 px-5">
                          <button onClick={handleFlowScreen} className="btn btn-danger background_color_button mt-3 px-5">
                            <span className="px-5"><i className="fas fa-calendar-alt"></i>
                              &nbsp;&nbsp;Book Now
                              {loadingnew === 1 ?
                                <>
                                  &nbsp;&nbsp;
                                  <div className="spinner-border spinner-border-sm text-light" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                  </div>
                                </>
                                : null
                              }
                            </span>
                          </button>
                        </div>
                      </div>
                    </>
                  ) : null}
                </>
              );
            })}
            <Footer />
          </>
        )}
      </div>
    </Layout2>
  );
}

export default Contentpage;
