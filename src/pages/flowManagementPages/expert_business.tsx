import Layout2 from "@/Components/Layout2/Layout2";
import SideBar from "@/Components/components/sidebar";
import PurchaseSummary from "@/Components/flow_management/purchase_summary";
import {
  getOrderIdInLocalStorage,
  removeOrderIdInLocalStorage,
} from "@/Components/helper";
import { ServicePageMovement } from "@/Components/service_page_movement";
import {
  getAddresses,
  getAllBusinessList,
  getProviderAvailability,
  getPurchaseOrderWithId,
  patchPurchaseOrder,
} from "@/helper";
import axios from "axios";
import { Console } from "console";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import {
  BiChevronDown,
  BiChevronRight,
  BiDirections,
  BiLocationPlus,
} from "react-icons/bi";
import { useSelector } from "react-redux";

const ExpertBusiness = () => {
  /* -------------------------------------------------------------------------- */
  /*                                  Variables                                 */
  /* -------------------------------------------------------------------------- */
  const { profile } = useSelector((state: any) => state);
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [isBusiness, setIsBusiness] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showDropDown, setShowDropDown] = useState(false);
  const [listOfAddresses, setListOfAddresses] = useState<any>([]);
  const [purchaseOrder, setPurchaseOrder] = useState<any>({});
  const [businessList, setBusinessList] = useState<any>([]);
  const [address_selected, setAddress] = useState<any>("");
  const [loadingnew, setLoadingnew] = useState(false);
  const [loadingnew1, setLoadingnew1] = useState(false);
  const [selectedindex, Setselectedindex] = useState<any>(0)
  const [allprovidersIds, SetAllprovidersIds] = useState<any>([])
  const [selectedLocation, setSelectedLocation] = useState({
    id: 10,
    userId: 101,
    addressName: "selteq solutions",
    line1: "wqwqq",
    line2: "87",
    townCity: "jjjjjjjjjjjjjjjjjjjjjjjjjjjjjj",
    postalCode: "wqwqwq",
    state: "demo",
    countryId: 0,
    latitude: 6.44394063949585,
    longitude: 3.454303741455078,
    addressnotes: ",nsdajdkasdkahbdas",
    isResidentialAddress: true,
    radius: 5,
    addressTypeValue: 1,
    createdBy: 10,
    createdOn: "2023-05-05T01:49:33.013",
    modifiedBy: null,
    modifiedOn: null,
  });
  useEffect(() => {
    const address_info: any = localStorage.getItem("selected_address");
    const new_address = JSON.parse(address_info);
    setAddress(new_address);
  }, [])

  useEffect(() => {
    const gettingproviders: any = localStorage.getItem("providerIdList");
    SetAllprovidersIds(JSON.parse(gettingproviders))
  }, [])


  console.log("ann", address_selected)

  /* -------------------------------------------------------------------------- */
  /*                                  Functions                                 */
  /* -------------------------------------------------------------------------- */
  /* --------------------------- Get Purchase Order --------------------------- */
  useEffect(() => {
    const getPurchaseOrder = () => {
      const purchaseOrderId = parseInt(getOrderIdInLocalStorage());
      if (isNaN(purchaseOrderId)) {
        router.replace("/");
      } else {
        setIsLoading(true);
        getPurchaseOrderWithId(purchaseOrderId)
          .then((res) => {
            console.log("resssssssssssss", res?.result);
            setPurchaseOrder(res?.result);
          })
          .catch((e) => alert(e))
          .finally(() => setIsLoading(false));
      }
    };
    getPurchaseOrder();
  }, [router]);

  /* ---------------------- Fetch Business List/Staff List ---------------------- */
  useEffect(() => {
    if (purchaseOrder?.data?.dateJson) {
      const getproviderbusinesslist = async () => {
        setLoadingnew1(true);
        const data = {
          date: purchaseOrder?.data?.dateJson[0]?.bookingDate,
          from: purchaseOrder?.data?.dateJson[0]?.timeFrom,
          endTo: purchaseOrder?.data?.dateJson[0]?.timeTo,
          providerId: allprovidersIds,
          sku: purchaseOrder?.data?.hasattribute === "true" ? purchaseOrder?.data?.attributes[0]?.attributeSku : purchaseOrder?.data?.serviceSKU,
          isBusiness: false,
          latitude: purchaseOrder?.address?.pickupAddress[0]?.latitude,
          longitude: purchaseOrder?.address?.pickupAddress[0]?.longitude,
          timeZone: "Europe/London",
          countryId: purchaseOrder?.data?.countryId
        };
        try {
          const result = await axios.post('https://gateway.findanexpert.net/provideravalability_svc/pb/post/slots/detail', data);
          setBusinessList(result?.data?.result);
          setLoadingnew1(false);
        } catch (error) {
          console.log("error");
          setLoadingnew1(false);
        }
      };
      getproviderbusinesslist();
    }
  }, [purchaseOrder?.data?.dateJson, allprovidersIds]);


  console.log("purchaseOrder?.data-->", purchaseOrder)

  /* ------------------------------ Get Addresses ----------------------------- */
  useEffect(() => {
    const fetchAddresses = () => {
      getAddresses(profile?.userId)
        .then((res) => {
          setListOfAddresses(res?.result?.addresses);
        })
        .catch((e) => alert(e));
    };
    if (profile?.userId) {
      fetchAddresses();
    }
  }, [profile?.userId]);

  /* ------------------------------- Verify Slot ------------------------------ */
  const verifySlotsHandler = (data: any, index: any) => {
    Setselectedindex(index)
    setLoadingnew(true);
    const purchaseCurrentStep = parseInt(purchaseOrder.currentStep);
    let patchedData = {};
    if (isBusiness) {
      alert("bus");
      // patchedData = {
      //   purchaseOrderId: purchaseOrder?.data?.purchaseOrderId,
      //   currentStep: purchaseOrder?.data?.totalStep,
      //   businessId: data?.id,
      //   businessName: data?.businessName,
      // };
    } else {
      patchedData = {
        purchaseOrderId: purchaseOrder?.data?.purchaseOrderId,
        currentStep: purchaseCurrentStep + 1,
        providerId: data?.providerId,
        providerName: data?.name,
        businessImage: `https://1864597015.rsc.cdn77.org/Plexaar/Attachments/Business/${data?.businessId}.jpeg`,
        providerImage: `https://1864597015.rsc.cdn77.org/Plexaar/Attachments/Serviceprovider/${data?.providerId}.jpeg`,
        businessId: data?.businessId,
        businessName: data?.businessName,
        providersList: [{ providerId: data?.providerId }],
      };
      console.log("///////////////////", patchedData);
    }

    // no neeed
    // const patchedData = {
    //     purchaseOrderId: purchaseOrder?.data?.purchaseOrderId,
    //     currentStep: purchaseOrder?.data?.totalStep,
    // };
    console.log(
      "console",
      parseInt(purchaseOrder.currentStep) + 1,
      purchaseOrder?.purchaseOrderFlow[0]?.screens?.length
    );
    // const returnedPage = ServicePageMovement(
    //   purchaseOrder.purchaseOrderFlow[0].screens[
    //     parseInt(purchaseOrder.currentStep) 
    //   ].actionId
    // );
    // console.log("returnedPage12", parseInt(purchaseOrder.currentStep) + 1,returnedPage );
    patchPurchaseOrder(patchedData)
      .then((result) => {
        // alert("newww")
        // router.replace("/flowManagementPages/expert_payment");


        if (
          parseInt(purchaseOrder.currentStep) + 1 ===
          purchaseOrder.purchaseOrderFlow[0].screens.length
        ) {
          router.replace("/");
        } else {
          const returnedPage = ServicePageMovement(
            purchaseOrder.purchaseOrderFlow[0].screens[
              parseInt(purchaseOrder.currentStep)
            ].actionId
          );
          console.log("returnedPage123", parseInt(purchaseOrder.currentStep) + 1, returnedPage);
          router.replace(`/${returnedPage}`);
        }
        // setLoadingnew(false);
        // router.replace("/flowManagementPages/OrderSummary")
      })
      .catch((e) => {
        setLoadingnew(false);
        alert(e);
      });
  };


  const sortedBusinessList = [...businessList].sort((a, b) => a.distance - b.distance);

  console.log("loadingnew1", loadingnew1)

  return (
    <Layout2>

      <div className="margin_bottom_new mb-md-5 pb-md-5 mt-3" >
        <div className="">
          <PurchaseSummary purchaseOrder={purchaseOrder} />
          <div className="col-md-12 mt-4 mb-2">
            <p className="m-0 p-0 prefered_heading_business">Choose the preferred center you would like for your service</p>
          </div>
          <div className="card_design_provider py-2 px-3 d-flex justify-content-between align-items-center text-secondary ">
            <div className="d-flex align-items-center ">
              <p className="m-0 color_distance p-0">
                {/* <i className="fas fa-directions"></i> */}
                <span className="color_dist">Distance from</span>
              </p>
              <div className="position-relative ms-2  background_selected">
                <div
                  className=" dropdown ms-2 d-flex text-primary color_drop align-items-center"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowDropDown(!showDropDown);
                  }}
                >
                  <span className=" py-2  pe-2  selected_address">{address_selected?.addressName ? address_selected?.addressName : address_selected?.line1}      <BiChevronDown /></span>

                </div>

              </div>
            </div>



          </div>
          <div>
            {/* new cards list --------------------------------------------------------------------------------------------------------   */}

            {loadingnew1 === true ?
              <div className="col-md-12 text-center mt-3">
                <div className="spinner-border text-danger" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
              :
              <>
                {businessList?.length === 0 ? (
                  <>{message}</>
                ) : (
                  sortedBusinessList?.map((item: any, index: number) => {
                    console.log("incard---------------------------", item);
                    const roundedDistance = Math.floor(item?.distance * 10) / 10;
                    return (
                      <div className="" key={index}>
                        <div className="col-md-12  mt-3 card_design_provider py-2">
                          <div className="padding_set_left_provider on_pc_screeen">
                            <img
                              className="img-fluid img-sizig mt-2"
                              src="/imagess/plexaar.png"
                            />
                            <div className="w-100 ">
                              <div className="row">
                                <div className="col-md-6 padding_set_left_provider2 mt-2">
                                  <p className="m-0 p-0 font_one_p">
                                    {item?.name}

                                  </p>
                                  <p className="m-0 p-0">
                                    {item?.rating === 0 ? (
                                      <span className="font_one_p1 py-1 m-0 pb-1">
                                        No Ratings Yet
                                      </span>
                                    ) : item?.rating === 1 ? (
                                      <i
                                        id="new_star"
                                        className="fas fa-star"
                                      ></i>
                                    ) : item?.rating === 2 ? (
                                      <>
                                        <i
                                          id="new_star"
                                          className="fas fa-star"
                                        ></i>
                                        <i
                                          id="new_star"
                                          className="fas fa-star"
                                        ></i>
                                      </>
                                    ) : item?.rating === 3 ? (
                                      <>
                                        <i
                                          id="new_star"
                                          className="fas fa-star"
                                        ></i>
                                        <i
                                          id="new_star"
                                          className="fas fa-star"
                                        ></i>
                                        <i
                                          id="new_star"
                                          className="fas fa-star"
                                        ></i>
                                      </>
                                    ) : item?.rating === 4 ? (
                                      <>
                                        <i
                                          id="new_star"
                                          className="fas fa-star"
                                        ></i>
                                        <i
                                          id="new_star"
                                          className="fas fa-star"
                                        ></i>
                                        <i
                                          id="new_star"
                                          className="fas fa-star"
                                        ></i>
                                        <i
                                          id="new_star"
                                          className="fas fa-star"
                                        ></i>
                                      </>
                                    ) : item?.rating === 5 ? (
                                      <>
                                        <i
                                          id="new_star"
                                          className="fas fa-star"
                                        ></i>
                                        <i
                                          id="new_star"
                                          className="fas fa-star"
                                        ></i>
                                        <i
                                          id="new_star"
                                          className="fas fa-star"
                                        ></i>
                                        <i
                                          id="new_star"
                                          className="fas fa-star"
                                        ></i>
                                        <i
                                          id="new_star"
                                          className="fas fa-star"
                                        ></i>
                                      </>
                                    ) : null}
                                    &nbsp;
                                    <span>{item?.rating} </span>
                                    <span className="font_small_p">
                                      ({item?.rating})
                                    </span>
                                  </p>
                                  <p className="m-0 p-0 font_one_p_new">{item?.businessName}</p>
                                </div>
                                <div className="col-md-6 padding_set_left_provider3 text-end">
                                  {/* <p className="m-0 pb-0 px-1">
                                    <Image
                                      src="/assets/Images/rightt.png"
                                      alt="keyright"
                                      height={11.19}
                                      width={6.33}
                                    />
                                  </p> */}
                                  <p className="font_one_p1 py-1 m-0 pb-1">
                                    {roundedDistance} Km &nbsp;
                                  </p>
                                  <button
                                    className="btn btn-danger universal_button_color  py-1 mt-4 color_for_mob_button"
                                    onClick={() => verifySlotsHandler(item, index)}
                                  >
                                    Select
                                    {selectedindex === index ?
                                      <>
                                        {loadingnew ?
                                          <div className="spinner-border spinner-border-sm text-light" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                          </div> : null
                                        }
                                      </>
                                      : null}
                                    {/* {loadingnew ?
                                    <div className="spinner-border spinner-border-sm text-light" role="status">
                                      <span className="visually-hidden">Loading...</span>
                                    </div>
                                    : null
                                  } */}
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-12 bg-white px-3 mobile_screen_display">
                            <div className="row">
                              <div className="col-md-2 col-3">
                                <img
                                  className="img-fluid img-sizig"
                                  src="/imagess/plexaar.png"
                                />
                              </div>
                              <div className="col-md-7 col-6 ps-0">
                                <p className="m-0 p-0 font_one_p">
                                  <strong>  {item?.name}
                                  </strong>
                                </p>
                                <p className="m-0 p-0">
                                  {item?.rating === 0 ? (
                                    <span className="font_one_p2 m-0 ">
                                      No Ratings
                                    </span>
                                  ) : item?.rating === 1 ? (
                                    <i
                                      id="new_star"
                                      className="fas fa-star"
                                    ></i>
                                  ) : item?.rating === 2 ? (
                                    <>
                                      <i
                                        id="new_star"
                                        className="fas fa-star"
                                      ></i>
                                      <i
                                        id="new_star"
                                        className="fas fa-star"
                                      ></i>
                                    </>
                                  ) : item?.rating === 3 ? (
                                    <>
                                      <i
                                        id="new_star"
                                        className="fas fa-star"
                                      ></i>
                                      <i
                                        id="new_star"
                                        className="fas fa-star"
                                      ></i>
                                      <i
                                        id="new_star"
                                        className="fas fa-star"
                                      ></i>
                                    </>
                                  ) : item?.rating === 4 ? (
                                    <>
                                      <i
                                        id="new_star"
                                        className="fas fa-star"
                                      ></i>
                                      <i
                                        id="new_star"
                                        className="fas fa-star"
                                      ></i>
                                      <i
                                        id="new_star"
                                        className="fas fa-star"
                                      ></i>
                                      <i
                                        id="new_star"
                                        className="fas fa-star"
                                      ></i>
                                    </>
                                  ) : item?.rating === 5 ? (
                                    <>
                                      <i
                                        id="new_star"
                                        className="fas fa-star"
                                      ></i>
                                      <i
                                        id="new_star"
                                        className="fas fa-star"
                                      ></i>
                                      <i
                                        id="new_star"
                                        className="fas fa-star"
                                      ></i>
                                      <i
                                        id="new_star"
                                        className="fas fa-star"
                                      ></i>
                                      <i
                                        id="new_star"
                                        className="fas fa-star"
                                      ></i>
                                    </>
                                  ) : null}
                                  &nbsp;
                                  <span>{item?.rating} </span>
                                  <span className="font_small_p">
                                    ({item?.rating})
                                  </span>
                                </p>
                                <p className="m-0 p-0 font_one_p">{item?.businessName}</p>
                              </div>
                              <div className="col-md-2 col-3 text-end ">
                                <Image
                                  src="/assets/Images/rightt.png"
                                  alt="keyright"
                                  height={11.19}
                                  width={6.33}
                                />
                                <p className="font_one_p1 py-1 pt-3 m-0 pb-1">
                                  {roundedDistance} Km
                                  <img
                                    className="img-fluid"
                                    src="/imagess/redicons/location.png"
                                    alt="keyright"
                                  />
                                </p>
                              </div>
                              <div className="col-md-12 ">
                                <button
                                  className="btn btn-danger w-100 px-5 py-1 mt-3 color_for_mob_button"
                                  onClick={() => verifySlotsHandler(item, index)}
                                >
                                  <strong> Select

                                    {selectedindex === index ?
                                      <>
                                        {loadingnew ?
                                          <div className="spinner-border spinner-border-sm text-light" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                          </div> : null
                                        }
                                      </>
                                      : null}
                                  </strong>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </>
            }
          </div>
        </div>
      </div>

    </Layout2>
  );
};
export default ExpertBusiness;
