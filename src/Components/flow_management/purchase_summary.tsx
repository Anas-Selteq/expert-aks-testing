import React, { useEffect, useState } from "react";
import Moment from "react-moment";
import { useRouter } from "next/router";
import { BiCalendarAlt, BiChevronRight, BiLocationPlus } from "react-icons/bi";
import moment from "moment";
import { patchPurchaseOrder } from "@/helper";
import { ServicePageMovement } from "../service_page_movement";
import Image from "next/image";
import { getServiceFromLocalStorage } from "../helper";
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';

const PurchaseSummary = ({ purchaseOrder }: { purchaseOrder: any }) => {
  const router = useRouter();
  const storedQuantity = typeof window !== 'undefined' ? localStorage.getItem("quantity_selected") : null;
  const quantityselected: any = localStorage.getItem("main_quantity");
  const quantityconverted: any = parseInt(quantityselected);
  // const storedQuantity = localStorage.getItem("quantity_selected");
  const initialQuantity = storedQuantity ? JSON.parse(storedQuantity) : quantityconverted;
  const [actualquantity, setActualquantity] = useState<any>(initialQuantity);
  const [selectedslots, setSelectedslots] = useState<any>("");
  const [isMatchingAddress, setIsMatchingAddress] = useState<any>(false);
  const [isMatchingNotes, setIsMatchingNotes] = useState<any>(false);
  const [incrementednumber, setIncrementednumber] = useState<any>('');
  const [localTime, setLocalTime] = useState<any>("")
  const [openn, setOpenn] = useState<any>(false);
  const [result, setResult] = useState(0);




  const targetEndpoint = '/flowManagementPages/expert_address';
  const targetEndpointdatetime = '/flowManagementPages/expert_date_time';
  const targetEndpointnotes = '/flowManagementPages/expert_notes';
  // const targetEndpointpayment = '/flowManagementPages/expert_payment';
  const targetEndpointpayment = '/flowManagementPages/OrderSummary';
  const targetEndpointpaymentexpert_business = '/flowManagementPages/expert_business';
  const targetEndpointpaymentseperate = '/flowManagementPages/payment-seperate';
  const targetEndpointVouchers = '/flowManagementPages/expert_date_time';
  const targetEndpointOrder = '/flowManagementPages/OrderSummary';

  const incrementednumberr = () => {
    setIncrementednumber(parseInt(incrementednumber) + 1);
    localStorage.setItem("quantity_selected", incrementednumber + 1)
    localStorage.removeItem('setQuantity_QuantityPage');
  }

  const decrementednumber = () => {
    if (incrementednumber > 1) {
      setIncrementednumber(parseInt(incrementednumber) - 1);
      localStorage.setItem("quantity_selected", incrementednumber - 1)
      localStorage.removeItem('setQuantity_QuantityPage');
    }
  }

  useEffect(() => {
    const getactualquantity: any = localStorage.getItem("quantity_selected");
    setActualquantity(parseInt(getactualquantity))
  }, [incrementednumber])

  console.log("quantity_selectedg", actualquantity)



  useEffect(() => {
    const multiplyprice: any = incrementednumber * (purchaseOrder?.data?.hasattribute === "true" ?
      purchaseOrder?.data?.attributes[0]?.attributePrice :
      service?.actualPrice);
    localStorage.setItem("incremented_price", multiplyprice)
    setResult(multiplyprice);
  }, [incrementednumber]);

  // useEffect(() => {
  //  const getactualprice: any = localStorage.getItem("incremented_price")
  // }, [incrementednumber])




  useEffect(() => {
    const storedDataString: any = localStorage.getItem("Slots_Selected");
    const jsonselectedslots = JSON.parse(storedDataString);
    setSelectedslots(jsonselectedslots);
  }, []);

  console.log("selectedslots", selectedslots);

  const handlePageMovement = (selectedOption: any) => {
    const nextScreen = purchaseOrder.purchaseOrderFlow[0].screens.find(
      (screen: any) => screen.screenName === selectedOption
    );
    if (nextScreen) {
      const data = {
        purchaseOrderId: purchaseOrder.data.purchaseOrderId,
        currentStep: nextScreen.position - 1,
      };
      patchPurchaseOrder(data)
        .then((res) => {
          const returnedPage = ServicePageMovement(nextScreen.screenName);
          router.replace(`/${returnedPage}`);
        })
        .catch((e) => alert(e));
    }
  };
  console.log("purchaseOrder?.data?.bookingDate", purchaseOrder)
  const currentEndpointt = router.pathname;
  useEffect(() => {
    const currentEndpoint = router.pathname;
    // console.log("currentEndpoint",currentEndpoint)
    if (currentEndpoint === targetEndpoint) {
      setIsMatchingAddress(true)
    } else if (currentEndpoint === targetEndpointnotes) {
      setIsMatchingNotes(true)
    }
  }, [router, targetEndpoint])

  useEffect(() => {
    const newdateformlocal: any = localStorage.getItem("Slots_Selected");
    const parselocal = JSON.parse(newdateformlocal);
    setLocalTime(parselocal)
  }, [])


  console.log("localTime", localTime)

  const service = getServiceFromLocalStorage();


  useEffect(() => {
    // const newnumberset = NewSelectedQuantity.length === 0 ? actualquantity: NewSelectedQuantity
    const selectedpackage: any = localStorage.getItem("setQuantity_QuantityPage");
    console.log("anas", selectedpackage);
    setIncrementednumber(JSON.parse(selectedpackage) ? JSON.parse(selectedpackage) : actualquantity)
  }, [])




  return (
    <div className="col-md-12 border_newwww  bg-white px-2 pt-2 pb-1 rounded cursor_property">
      <div className="row">
        <div className="col-md-8 col-8">
          <div className="d_flex_expert_address  px-2">
            <div className="width_coloumn">
              <img
                src={
                  service?.serviceImage ? service?.serviceImage : service?.attachments ? service?.attachments[0]?.imageUrl : null
                }
                className="img-fluid circle_rad"
                alt="providerPhoto"
              />
            </div>
            <div className="px-2">
              <h1
                style={{
                  fontSize: "14px",
                  fontWeight: "600",
                  fontFamily: "Roboto",
                  color: "#1B1B1B",
                  paddingLeft: "3px",
                }}
              >
                {purchaseOrder?.data?.servicePayload?.serviceName}
              </h1>
              {currentEndpointt === targetEndpointOrder ? null :
                <div className="d-flex align-items-center pt-1">
                  <img className="img-fluid" src="/imagess/lefts.png" onClick={() => decrementednumber()} />
                  <div className="px-3 text_show ">{incrementednumber}</div>
                  <img className="img-fluid" src="/imagess/rights.png" onClick={() => incrementednumberr()} />
                </div>
              }
            </div>
          </div>
        </div>
        <div className="col-md-4 col-4 text-end  pe-md-4 ">
          <div className="col-md-12">
            <span className="font_pannel_g">
              {/* {service?.duration} */}
              { }
              {purchaseOrder?.data?.hasattribute === "true" ?
                purchaseOrder?.data?.attributes[0]?.duration :
                service?.duration} min</span>
            {/* <span><img className="img-fluid ps-2" src="/imagess/options.png" /></span> */}
          </div>
          <div className="col-md-12 pe-2">
            <span className="font_pannel pe-1">
              {/* {service?.currency}  */}
              £{result === 0 ? purchaseOrder?.data?.hasattribute === "true" ?
                purchaseOrder?.data?.attributes[0]?.attributePrice :
                service?.actualPrice : result} </span>
          </div>
        </div>
      </div>

      <Collapse in={openn}>
        <div id="example-collapse-text">
          {/* <div className="row px-4 ">
        <div className="col-md-1 pe-0 text-center">
          <img className="img-fluid iimg_top_simple" src="/imagess/angle-simple.png" />
        </div>
        <div className="col-md-11 ps-0">
          <span className="sub_services_primary_s">LHR Dummy Clean Face</span>
        </div>
         </div> */}
          {/* <div className="row px-4 ">
        <div className="col-md-1 pe-0 text-center">
          <img className="img-fluid iimg_top_simple2" src="/imagess/angle-simple.png" />
        </div>
        <div className="col-md-11 ps-0">
          <span className="sub_services_primary_s">LHR Dummy Clean Face</span>
        </div>
         </div> */}
          {/* <div className="row px-4  ">
            <div className="col-md-1 col-2 pe-0 text-center">
              <img className="img-fluid iimg_top_dotted" src="/imagess/angle-dotted.png" />
            </div>
            <div className="col-md-11 col-10 ps-0">
              <span className="sub_services_primary_s"><img className="img-fluid" src="/imagess/adds.png" /></span>
            </div>
          </div> */}
          {/* additional information ------------------------------------------------------------------------------------------------------------------ */}
          {/* <div className="col-md-12 px-2">
            <hr className="bg_hr_line" />
            <div className="label_text px-2">Duration</div>
            <p className="m-0  px-2 py-0 provider_summmary_des1 ">{service?.duration} Min</p>
          </div>
          <div className="col-md-12 px-2">
            <hr className="bg_hr_line" />
            <div className="label_text  px-2">Service Price</div>
            <p className="m-0  px-2 py-0 provider_summmary_des1 ">
              £ {result === 0 ? service?.actualPrice : result} </p>
          </div> */}
          <div>
            {purchaseOrder?.address?.pickupAddress ? (
              <>

                <div className="row px-1 " onClick={() => handlePageMovement("ExpertAddress")}>
                  <div className="ps-md-3 pe-md-2">
                    <hr className="bg_hr_line " />
                  </div>
                  <div className="col-md-12"> <p className="label_text m-0 p-0 ">Address</p></div>
                  <div className="col-md-10 col-10">
                    <div className='d-flex '>
                          <img className="img-fluid" src="/imagess/locblack.png" />   <span className='relevent_notes ps-1 padding_top_new_summary'>    {`${purchaseOrder?.address?.pickupAddress[0]?.addressName ? purchaseOrder?.address?.pickupAddress[0]?.addressName : purchaseOrder?.address?.pickupAddress[0]?.line1}`}</span>
                        </div>
                  </div>
                  <div className="col-md-2  col-2 text-end">
                    <Image
                      src="/assets/Images/rightt.png"
                      alt="keyright"
                      height={11.19}
                      width={6.33}
                    />
                  </div>
                </div>




                {currentEndpointt === targetEndpointnotes || currentEndpointt === targetEndpointpayment ?
                  (
                    <div
                      className="d-flex justify-content-between align-items-center mt-2 px-1 "
                      onClick={() => handlePageMovement("ExpertBusiness")}
                    >
                      <div style={{ fontSize: "85%", color: "black" }}>
                        <p className="label_text m-0 p-0 ">Selected Provider</p>
                        {/* <p className="provider_summmary_des1 m-0 p-0">
                          <img className="img-fluid" src="/imagess/buildblack.png" />
                        
                        </p> */}
                        <div className='d-flex '>
                          <img className="img-fluid" src="/imagess/buildblack.png" />   <span className='relevent_notes ps-1 padding_top_new_summary'>  {`${purchaseOrder?.data?.providerName}`}</span>
                        </div>
                      </div>
                      <div>
                        <Image
                          src="/assets/Images/rightt.png"
                          alt="keyright"
                          height={11.19}
                          width={6.33}
                        />
                      </div>
                    </div>) : null}



              </>
            ) : null}
          </div>
          {currentEndpointt === targetEndpointpaymentexpert_business || currentEndpointt === targetEndpointnotes || currentEndpointt === targetEndpointpayment || currentEndpointt === targetEndpointVouchers ?
            <div>
              {purchaseOrder?.data?.bookingDate === null &&
                purchaseOrder?.data?.timeFrom === "" ? null : (
                <>
                  <div className="ps-3 pe-2">
                    <hr className="bg_hr_line " />
                  </div>
                  <div
                    className="d-flex justify-content-between align-items-center  px-1 mb-2"
                    onClick={() => handlePageMovement("ExpertSlots")}
                  >

                    <div style={{ fontSize: "85%", color: "black" }}>
                      <div className=" label_text pb-0">Appointment</div>
                      <div className='d-flex '>
                        <img className="img-fluid" src="/imagess/calblack.png" />   <span className='relevent_notes ps-1 padding_top_new_summary'>  {localTime[0]?.bookingDate} - {localTime[0]?.timeFrom} - {localTime[0]?.timeTo} </span>
                      </div>
                    </div>
                    <div>
                      <Image
                        src="/assets/Images/rightt.png"
                        alt="keyright"
                        height={11.19}
                        width={6.33}
                      />
                    </div>
                  </div>

                </>
              )}
            </div> : null}

          <div>
            {purchaseOrder?.data?.isNotes ? (
              <>
                <hr className="bg_hr_line mb-2 mt-0" />
                <div
                  className="d-flex justify-content-between align-items-center px-1 mb-2"
                  onClick={() => handlePageMovement("ExpertNotes")}
                >
                  <div style={{ fontSize: "85%", color: "black" }}>
                    <div className="label_text ">Notes</div>
                    <div className='d-flex '>
                      <img className="img-fluid" src="/imagess/buildblack.png" />   <span className='relevent_notes ps-1 padding_top_new_summary'>  {"Click Here to See"}  </span>
                    </div>
                  </div>
                  <div>
                    <Image
                      src="/assets/Images/rightt.png"
                      alt="keyright"
                      height={11.19}
                      width={6.33}
                    />
                  </div>
                </div>


              </>
            ) : null}
          </div>
        </div>
      </Collapse>
      {currentEndpointt === targetEndpoint ? null :
        <>
          {openn === false ?
            <div className="col-md-12 text-center">
              <img className="img-fluid position_down_icon" onClick={() => setOpenn(!openn)} src="/imagess/down-bb.png" />
            </div>
            :
            <div className="col-md-12 text-center">
              <img className="img-fluid position_down_icon" onClick={() => setOpenn(!openn)} src="/imagess/down-bb.png" />
            </div>
          }
        </>
      }


      {/*  */}

    </div>
  );
};
export default PurchaseSummary;
