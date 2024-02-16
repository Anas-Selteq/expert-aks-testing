import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { getAllChildServices, getPurchaseOrderWithId, postPurchaseOrder } from "@/helper";
import { getOrderIdInLocalStorage, getServiceFromLocalStorage, setOrderIdInLocalStorage, setServiceInLocalStorage } from "@/Components/helper";
import axios from "axios";
import { ServicePageMovement } from "@/Components/service_page_movement";
import { useSelector } from "react-redux";

function Services() {
  const router = useRouter();
  const { id } = router.query;
  const [listOfServices, setListOfServices] = useState<any>([]);
  const [jwtToken, setJwtToken] = useState<any>(null);
  const [objectt, setObjectt] = useState<any>();
  const { profile } = useSelector((state: any) => state);
  const [Seo, setSEO] = useState<any>(null);
  const [data, setData] = useState<any>([]);
  const [noflow, setNoflow] = useState<any>("");
  const [servicesku, setServicesku] = useState<any>("");
  const [urlseoaddress, setUrlseoaddress] = useState<any>("");
  const [serviceSkuBook, setserviceSkuBook] = useState<any>("");
  const [HasAttributes, setHasAttributes] = useState<any>(false);
  const { service } = router.query;
  const [selectedindex, setSelectedindex] = useState(null);
  const [loadingnew, setLoadingnew] = useState<any>(0);






  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
  const handleFlowScreen = (flow: any, serviceeattribute: any) => {
    localStorage.removeItem("orderId");
    localStorage.removeItem("quantity_selected");
    const service: any = getServiceFromLocalStorage();
    const selectedservice: any = localStorage.getItem("selectedService");
    const usingselected: any = JSON.parse(selectedservice);
    localStorage.setItem("onclickselectedservice", selectedservice);


    console.log("usingselected", usingselected);


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
        alert("No Flow Found Please Select Another Service");
      } else {
        if (!orderId || orderId === undefined) {
          const bookingFlow = objectt && objectt.result?.bookingFlow;
          const object1 = {
            currentStep: 0,
            totalStep: flow.result.bookingFlow && flow.result.bookingFlow[0]?.screens.length,
            customerId: profile?.userId,
            customerFirstName: profile?.firstName,
            customerLastName: profile?.lastName,
            customerEmail: profile?.primaryEmail ?? "UNKNOWN@EMAIL.COM",
            customerNumber: profile?.primaryMobile ?? "0987654321",
            customerGender: profile?.genderId ?? "1001",
            bookingFlow: flow.result.bookingFlow,
            serviceId: service?.serviceId,
            servicePayload: servicetosend,
            serviceSKU: serviceeattribute?.serviceSKU,
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
            returnUrl: "https://expert.one/",
          };

          postPurchaseOrder(object1)
            .then((res) => {
              console.log("HasAttributes", HasAttributes)
              if (serviceeattribute?.hasAttributes) {
                setLoadingnew(0);
                setOrderIdInLocalStorage(res?.result?.purchaseOrderId);
                router.push('/flowManagementPages/Serviceattributes')
              }
              else {
                const importantData = flow && flow?.result?.bookingFlow[0]?.screens;
                const returnedData = ServicePageMovement(
                  importantData && importantData[0]?.screenName
                );
                if (returnedData !== "/") {
                  setLoadingnew(0);
                  setOrderIdInLocalStorage(res?.result?.purchaseOrderId);
                  router.push(`/${returnedData}`);
                }
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


  useEffect(() => {
    setJwtToken(localStorage?.getItem("jwtToken"));
  }, [jwtToken]);

  useEffect(() => {
    const { service } = router.query;
    setServicesku(service);

  })


  const fetchbookingflow = async (service: any) => {
    const isToken = jwtToken !== null;
    const headers = {
      // Authorization: isToken ? `Bearer ${jwtToken}` : undefined,
      "Content-Type": "application/json",
    };

    try {
      const response = await axios.get(
        `https://gateway.findanexpert.net/serviceinventory_svc/pb/Booking/GetBookingFlowByServiceSKU?ServiceSKU=${service?.serviceSKU}`,
        { headers }
      );

      // Only update state if the component is still mounted

      console.log("content page data booking", response);
      setObjectt(response.data);
      handleFlowScreen(response.data, service);

    } catch (error) {
      // setError(error);
      console.log("error", error);
    }
  };

  useEffect(() => {

    // Data of content page api ----------------------------------------------------------------------------------------- 
    const service = getServiceFromLocalStorage();
    let isMounted = true; // Flag to track component mount state

    // fetchbookingflow;
    // const fetchData = async () => {
    //   const isToken = jwtToken !== null;
    //   const headers = {
    //     Authorization: isToken ? `Bearer ${jwtToken}` : undefined,
    //     "Content-Type": "application/json",
    //   };

    //   try {
    //     const response = await axios.get(
    //       `https://gateway.findanexpert.net/serviceinventory_svc/pb/ContentPages/GetContentPageByServiceSKU?serviceSKU=${serviceSkuBook}`,
    //       { headers }
    //     );
    //     if (isMounted) {
    //       // Only update state if the component is still mounted
    //       setData(response.data?.result?.outPutSectionModels);
    //       console.log("content page data", response.data);
    //     }
    //   } catch (error) {
    //     // setError(error);
    //     console.log("error", error);
    //   }
    // };
    // fetchData();
    // To get SEO deatils api -------------------------------------------------------------------------------------------
    // const fetchDataSeoPage = async () => {
    //   const isToken = jwtToken !== null;
    //   const headers = {
    //     Authorization: isToken ? `Bearer ${jwtToken}` : undefined,
    //     "Content-Type": "application/json",
    //   };

    //   try {
    //     const response = await axios.get(
    //       `https://gateway.findanexpert.net/serviceinventory_svc/pb/Service/GetServiceSEO?serviceSKU=${serviceSkuBook}`,
    //       { headers }
    //     );
    //     if (isMounted) {
    //       // Only update state if the component is still mounted
    //       // setData(response.data?.result?.outPutSectionModels);
    //       console.log("SEO page api data", response?.data?.result?.serviceDeposit);
    //       setSEO(response?.data?.result?.serviceDeposit)
    //     }
    //   } catch (error) {
    //     // setError(error);
    //     console.log("error", error);
    //   }
    // };
    // fetchDataSeoPage();
    return () => {
      isMounted = false; // Set the flag to false when the component unmounts
    };
  }, [serviceSkuBook]);
















  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    if (id) {
      const getServiceByParentServiceId = () => {
        getAllChildServices(id)
          .then((res) => {
            if (res.result?.services === null) {
              alert("services are null");
            } else {
              setListOfServices(res.result?.services);
            }
          })
          .catch((e) => alert(e))
          .finally(() => { });
      };
      getServiceByParentServiceId();
    }
  }, [id]);

  useEffect(() => {
    setJwtToken(localStorage?.getItem("jwtToken"));
  }, [jwtToken]);

  const handlePageHere = async (service: any, index: any) => {
    setSelectedindex(index);
    setLoadingnew(1);
    localStorage.setItem("selectedService", JSON.stringify(service))

    setserviceSkuBook(service?.serviceSKU);
    setHasAttributes(service?.hasAttributes);
    fetchbookingflow(service);

  };


  console.log("serviceSkuBook", serviceSkuBook)


  const handleChildServices = async (service: any, index: any) => {
    setSelectedindex(index);
    setLoadingnew(2);
    localStorage.setItem("selectedService", JSON.stringify(service));
    if (service.hasChild === true) {
      setLoadingnew(0);
      // Redirect to child services page
      router.push(`/services/${service.serviceId}`);
    } else {
      const orderId = getOrderIdInLocalStorage();
      if (!orderId) {
        setServiceInLocalStorage(service);
      }
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

        // Handle the response data here
        console.log("SEO page api data", response?.data?.result?.serviceDeposit);
        setLoadingnew(0);
        // Update state or do something else with the data if needed
        // setData(response.data?.result?.outPutSectionModels);

        // Redirect to the service detail page
        router.push(`/Service/${response?.data?.result?.serviceDeposit?.url}?service=${service.serviceSKU}`);
      } catch (error) {
        // Handle errors here
        // setError(error);
        console.error("error", error);
        setLoadingnew(0);
      }
    }
  };






  return (
    <div className="col-md-12 custom_padding_services_pages">
      <div className="row">
        {listOfServices?.length === 0 ? (
          <div className="col-md-12 text-center">
            <div className="spinner-border text-danger" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          listOfServices?.map((itm: any, index: any) => {
            return (

              // <div
              //   key={index}
              //   className="col-md-3 universal_cursor"

              // >
              //   <div className="card_serices_by_industry_id1 mt-4 mt-md-3">
              //     <div>
              //       <img

              //         src={
              //           itm.serviceImage ??
              //           "https://img.freepik.com/premium-photo/male-hand-touching-service-concept_220873-7591.jpg"
              //         }
              //         alt="serviceImage"
              //         className="img-fluid img_border1"
              //       />
              //     </div>
              //     <div className="col-md-12 overflow_new pt-3 pb-2 px-2">
              //       <div className="row">
              //         <div className="col-md-7 col-7 m-auto">
              //           <p className="mb-0 title_text_services" key={index}>
              //             {itm.serviceName}
              //           </p>
              //         </div>
              //         <div className="col-md-5 col-5 ">
              //           <p className="mb-0 title_text_services1" key={index}>
              //             £{itm.actualPrice}
              //           </p>
              //         </div>
              //         <div className="col-md-7 col-7 pt-2" >
              //           <p className="mb-0 title_text_services2 text_limit" key={index}>
              //             {itm.shortDesc}
              //           </p>
              //         </div>
              //         <div className="col-md-5 col-5 text-end m-auto pt-1 ">
              //           {/* <div className="flex_using">
              //           <div className="add_button" onClick={() => decrement(index)}> <i className="fas fa-minus"></i> </div>
              //           <span className="px-1">{counters[index]}</span>
              //           <div className="add_button" onClick={() => increment(index)} > <i className="fas fa-plus"></i> </div>
              //         </div> */}
              //         </div>
              //       </div>
              //       <div className="col-md-12 text-center pt-2">
              //         {itm.hasChild === false ? <></> :
              //           <div className="col-md-12 mt-1">
              //             <button className="btn btn-danger w-100 button_design_new" onClick={() => handlePageHere(itm, index)}    >Select</button>
              //           </div>
              //         }
              //         {itm.hasContentPage ?
              //           <>
              //             {itm.hasContentPage === false && itm.hasContentPage === "undefined" ? <></> :
              //               <div className="col-md-12 mt-1">
              //                 <button className="btn btn-danger w-100 button_design_new" onClick={() => handleChildServices(itm, index)} >View Detail</button>
              //               </div>
              //             }
              //           </>
              //           : null}
              //         {itm.hasChild !== false ? <></> :
              //           <div className="col-md-12 mt-1">
              //             <button className="btn btn-danger w-100 button_design_new " onClick={() => handlePageHere(itm, index)} >Book Now&nbsp;&nbsp;&nbsp;
              //               {selectedindex === index ?
              //                 <>
              //                   {loadingnew === 1 ?
              //                     <div className="spinner-border spinner-border-sm text-light" role="status">
              //                       <span className="visually-hidden">Loading...</span>
              //                     </div> : null
              //                   }
              //                 </>
              //                 : null}
              //             </button>
              //           </div>
              //         }
              //       </div>
              //     </div>
              //   </div>
              // </div>
              <div
                key={index}
                className="col-md-3 universal_cursor"

              >
                <div className="card_serices_by_industry_id1 mt-4 mt-md-3">
                  <div>
                    <img

                      src={
                        itm.serviceImage ??
                        "https://img.freepik.com/premium-photo/male-hand-touching-service-concept_220873-7591.jpg"
                      }
                      alt="serviceImage"
                      className="img-fluid img_border1"
                    />
                  </div>
                  <div className="col-md-12 overflow_new pt-3 pb-2 px-2">
                    <div className="row">
                      <div onClick={() => handleChildServices(itm, index)} className="col-md-12 col-12 m-auto">
                        <p className="mb-0 title_text_services" key={index}>
                          {itm.serviceName}
                        </p>
                      </div>
                      <div onClick={() => handleChildServices(itm, index)} className="col-md-6 col-6 pt-1">
                        <p className="mb-0 title_text_services1" key={index}>
                          <span className="from_text">From</span> £{itm.actualPrice}
                        </p>
                      </div>
                      <div onClick={() => handleChildServices(itm, index)} className="col-md-6 text-end col-6 pt-1">
                        <p className="mb-0 title_text_services1" key={index}>
                          <span className="badge bg-light text-dark rounded-pill px-3 badge_bg_light">0% off</span>
                        </p>
                      </div>
                      <div onClick={() => handleChildServices(itm, index)} className="col-md-12 col-12 pt-2" >
                        <p className="mb-0 title_text_services2 text_limit" key={index}>
                          {itm.shortDesc}
                        </p>
                      </div>
                      <div className="col-md-5 col-5 text-end m-auto pt-1 ">
                        {/* <div className="flex_using">
                        <div className="add_button" onClick={() => decrement(index)}> <i className="fas fa-minus"></i> </div>
                        <span className="px-1">{counters[index]}</span>
                        <div className="add_button" onClick={() => increment(index)} > <i className="fas fa-plus"></i> </div>
                      </div> */}
                      </div>
                    </div>
                    <div className="col-md-12 text-center pt-2">
                      <div className="row">
                        {itm.hasChild === false ? <></> :
                          <div className="col-md-6 col-6 ps-1 mt-1">
                            <button className="btn btn-danger w-100 button_design_new" onClick={() => handleChildServices(itm, index)}    >Select&nbsp;&nbsp;&nbsp;
                              {selectedindex === index ?
                                <>
                                  {loadingnew === 2 ?
                                    <div className="spinner-border spinner-border-sm text-light" role="status">
                                      <span className="visually-hidden">Loading...</span>
                                    </div> : null
                                  }
                                </> : null}
                            </button>
                          </div>
                        }
                        {itm.hasContentPage === false ? <></> :
                          <div className="col-md-6 col-6 pe-1 mt-1">
                            <button className="btn btn-light w-100  button_light_red_around " onClick={() => handleChildServices(itm, index)} >View Detail&nbsp;&nbsp;&nbsp;
                              {selectedindex === index ?
                                <>
                                  {loadingnew === 2 ?
                                    <div className="spinner-border spinner-border-sm text-danger" role="status">
                                      <span className="visually-hidden">Loading...</span>
                                    </div> : null
                                  }
                                </>
                                : null}
                            </button>
                          </div>

                        }
                        {itm.hasChild !== false ? <></> :
                          <div className={` ${itm.hasContentPage ? "col-md-6 col-6 mt-1" : "col-md-12 mt-1"}`}>
                            <button className="btn btn-danger w-100 button_design_new " onClick={() => handlePageHere(itm, index)} >Book Now&nbsp;&nbsp;&nbsp;
                              {selectedindex === index ?
                                <>
                                  {loadingnew === 1 ?
                                    <div className="spinner-border spinner-border-sm text-light" role="status">
                                      <span className="visually-hidden">Loading...</span>
                                    </div> : null
                                  }
                                </>
                                : null}
                            </button>
                          </div>
                        }
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  );
}

export default Services;
