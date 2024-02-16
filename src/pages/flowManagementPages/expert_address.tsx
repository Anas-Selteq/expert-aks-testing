import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ServicePageMovement } from "../../Components/service_page_movement";
import { getOrderIdInLocalStorage } from "../../Components/helper";
import {
  getAddresses,
  getPurchaseOrderWithId,
  patchPurchaseOrder,
} from "@/helper";
import PurchaseSummary from "@/Components/flow_management/purchase_summary";
import { BiSearch } from "react-icons/bi";
import { useSelector } from "react-redux";
import Layout2 from "@/Components/Layout2/Layout2";
import SideBar from "@/Components/components/sidebar";
import { FiPlus } from "react-icons/fi";
import axios from "axios";
import { IoAdd } from "react-icons/io5";

const ExpertAddresses = () => {

  /* -------------------------------------------------------------------------- */
  /*                                  Variables                                 */
  /* -------------------------------------------------------------------------- */
  const { profile } = useSelector((state: any) => state);
  const [addresses, setAddresses] = useState<any>([]);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [purchaseOrder, setPurchaseOrder] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [loadingnew, setLoadingnew] = useState(false);
  const [loadingnewPur, setLoadingnewPur] = useState(false);
  const [JwtRefreshToken, setJwtRefreshToken] = useState<any>("");


  useEffect(() => {
    setJwtRefreshToken(localStorage?.getItem("jwtRefreshToken"));
  }, []);


  /* -------------------------------------------------------------------------- */
  /*                                  Functions                                 */
  /* -------------------------------------------------------------------------- */
  /* ----------------------------- Fetch Addresses ---------------------------- */
  const fetchAddresses = useCallback(() => {
    getAddresses(profile?.externalCustomerId).then((response: any) => {
      if (response && response?.result?.addresses) {
        setAddresses(response?.result?.addresses);
      }
    });
  }, [profile?.userId]);

  /* --------------------------- Get Purchase Order --------------------------- */
  const getPurchaseOrder = useCallback(() => {
    setLoadingnewPur(true);
    const purchaseOrderId = parseInt(getOrderIdInLocalStorage());
    if (isNaN(purchaseOrderId)) {
      // router.replace("/");--------------------------------------------------------------------------------------------------------
    } else {
      setIsLoading(true);
      getPurchaseOrderWithId(purchaseOrderId)
        .then((res) => {
          setLoadingnewPur(false);
          setPurchaseOrder(res.result)
        })
        .catch((e) => {
          setLoadingnewPur(false);
          alert(e)
        })
        .finally(() => setIsLoading(false));
    }
  }, [router]);

  /* -------------------------------- UseEffect ------------------------------- */
  useEffect(() => {
    getPurchaseOrder();
    if (profile?.userId) {
      fetchAddresses();
    }
  }, [fetchAddresses, profile.userId]);

  /* ------------------------- Flow And Purchase Order ------------------------ */
  const flowAndPurchaseOrderHandler = () => {
    const newprice: any = localStorage.getItem("incremented_price");
    const localpurchaseorderid: any = localStorage.getItem("orderId");
    const getlocalstoragequantity: any = localStorage.getItem("setQuantity_QuantityPage");
    const getlocalstoragequantitymain: any = localStorage.getItem("main_quantity");
    const getquantityselected: any = localStorage.getItem("quantity_selected");
    // const parsedvalue = JSON.parse(getlocalstoragequantity) === null ? JSON.parse(getlocalstoragequantity) :  parseInt(JSON.parse(getlocalstoragequantity))
    const updatedpid: any = JSON.parse(localpurchaseorderid)
    const finalpID = parseInt(updatedpid);
    console.log("finalpID", finalpID)
    setLoadingnew(true)
    const purchaseCurrentStep = parseInt(purchaseOrder.currentStep);
    const selectedAddress = addresses[selectedIndex];
    // Convert the selected address array to a JSON string
    localStorage.setItem("selected_address", JSON.stringify(selectedAddress));
    const data = {
      purchaseOrderId: purchaseOrder?.data?.purchaseOrderId,
      // quantity: parsedvalue != null ? parseInt(getlocalstoragequantity) : parseInt(getlocalstoragequantitymain),
      pickupAddress: [addresses[selectedIndex]],
      centerAddress: [addresses[selectedIndex]],
      venue: addresses[selectedIndex],
      currentStep: purchaseCurrentStep + 1,
      totalAmount: parseInt(newprice),
      // currentStep: 1,
      formId: [0],
      bookingType: "booking",
    };
    // console.log("newnew1", data, parsedvalue === null , JSON.parse(getlocalstoragequantitymain), JSON.parse(getquantityselected))
    // return;
    //  dropOffAddress
    patchPurchaseOrder(data)
      .then((res) => {
        setLoadingnew(false)
        if (
          purchaseCurrentStep + 1 ===
          purchaseOrder.purchaseOrderFlow[0].screens.length
        ) {
          router.replace("/");
        } else {
          const returnedPage = ServicePageMovement(
            purchaseOrder.purchaseOrderFlow[0].screens[purchaseCurrentStep]
              .actionId
          );
          router.replace(`/${returnedPage}`);
        }
      })
      .catch((e) => alert(e))
      .finally(() => {
        setIsLoading(false)
        setLoadingnew(true)
      });
  };
  console.log("new address", addresses?.length);

  const addressflow = () => {
    router.push("/userProfile/Selectfrommap/Selectfrommap");
    localStorage.setItem("addressflag", "Addaddress");
  }

  useEffect(() => {
    const getpreferenceaddress: any = localStorage.getItem("selectedaddressindex");
    const parseinted = parseInt(getpreferenceaddress)
    console.log("parseinted", parseinted)
    setSelectedIndex(parseinted ? parseinted : 0)
  }, [])


  const selectedaddress = (address: any, index: any) => {
    setSelectedIndex(index)
    localStorage.setItem("selectedaddressindex", index);
    localStorage.setItem("selected_address", address);
    console.log("abc", index)

  }

  const alertaddress = () => {
    alert("PLease Enter Address")
  }


  useEffect(() => {
    if (profile?.firstName != undefined) {
      const Jwtset = async () => {

        // Convert the JWT token object to a string
        // const jwtTokenString = JSON.stringify(JwtRefreshToken);

        // Encode the JWT token to Base64
        const base64Token = Buffer.from(JwtRefreshToken).toString('base64');



        try {
          const response = await axios.get(
            `https://gateway.findanexpert.net/signup_svc/pb/users/getnewRefreshToken?tokenModel=${base64Token}`
          );
          if (response?.data?.code === 0) {
            localStorage.setItem("jwtRefreshToken", response?.data?.result?.jwtRefreshToken)
            localStorage.setItem("jwtToken", response?.data?.result?.jwtToken)
          }
          // window.location.reload();
          // Only update state if the component is still mounted
        } catch (error: any) {
          console.log("error.response", error)
          // setError(error);
        }
      };
      Jwtset();
    }
  }, [profile?.firstName != undefined, JwtRefreshToken])






  return (
    <Layout2>
      {/* {profile?.firstName ? (
        <SideBar activeIndex={0}> */}
      <div className="">

        <div className=" margin_bottom_new mx-3 mt-4 pb-4">
          <PurchaseSummary purchaseOrder={purchaseOrder} />
          {addresses?.length === 0 ? (
            <div className="col-md-12 text-center py-5">
              <button
                className="btn btn-danger color_danger px-md-4 py-md-1 py-0 "
                onClick={addressflow}
              >
                Add New Address
              </button>
            </div>
          ) : (
            <>
              <div className="col-md-12 mt-2">
                <div className="row">
                  <div className="col-md-6 col-6 m-auto">
                    <p className="choose_address_text mb-2 ">Please Choose Address for your Booking</p>
                  </div>
                  <div className="col-md-6 col-6 text-end">
                    {/* <button className="btn btn-danger universal_button_color btn-sm" onClick={addressflow}><FiPlus /> Add New </button> */}
                  </div>
                </div>

              </div>
              {/* {address.addressName} */}
              <div className="col-md-12 background_address_bar">
                {addresses?.map((address: any, index: number) => {
                  return (
                    <div className={`col-md-12   ${selectedIndex === index ? "background_address_bar_active" : null} px-3  pt-2 pb-0`} onClick={() => selectedaddress(address, index)}>
                      <div className="row">
                        <div className="col-md-10 col-8 m-auto">
                          <div className="col-md-12">
                            <p className="m-0 p-0 address_tect_font"><span className="new_font_address">Clinic, </span><span className="address_new">{address.addressName ? address.addressName : address.line1}</span></p>
                          </div>
                        </div>
                        <div className="col-md-2 col-4">
                          <div className="col-md-12">
                            <div className="row">
                              <div className="col-md-11 col-10  text-end">
                                {selectedIndex === index ?
                                  <button className="btn btn-secondary btn_default_design btn-sm rounded-pill px-3">Default</button>
                                  : null}
                              </div>
                              {/* <div className="col-md-1  col-2 text-end">
                              <img className="img-fluid " src="/imagess/menu1.png" />
                            </div> */}
                            </div>
                          </div>
                        </div>
                      </div>
                      <hr className='m-0 p-0 mt-2 background_line' />
                    </div>
                  )
                })
                }
                <div className="row px-3 py-2 universal_cursor" onClick={addressflow}>
                  <div className="col-md-12 col-12 m-auto">
                    <div className="col-md-12">
                      <p className="m-0 p-0 font_color_add_new">
                        <IoAdd /> Add new address
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}




          {selectedIndex >= 0 ? (
            <div className="col-md-12 text-center pt-5">
              {loadingnewPur ?
                <button
                  className="btn btn-secondary  button_width_slots mt-4 px-2 py-2"
                  disabled
                >
                  Next
                </button>
                :
                <>
                  {addresses?.length === 0 ?
                    <button
                      className="btn btn-danger color_danger button_width_slots mt-4 px-2 py-2"
                      onClick={alertaddress}
                    >
                      Next
                    </button> :
                    <button
                      className="btn btn-danger color_danger button_width_slots mt-4 px-2 py-2"
                      onClick={flowAndPurchaseOrderHandler}
                    >
                      Next&nbsp;&nbsp;
                      {loadingnew ?
                        <div className="spinner-border text-white spinner-border-sm" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div> :
                        null
                      }
                    </button>
                  }
                </>

              }

            </div>
          ) : null}
        </div>
      </div>

    </Layout2>
  );
};

export default ExpertAddresses;
