import SideBar from "@/Components/components/sidebar";
import PurchaseSummary from "@/Components/flow_management/purchase_summary";
import { getOrderIdInLocalStorage } from "@/Components/helper";
import { ServicePageMovement } from "@/Components/service_page_movement";
import { getPurchaseOrderWithId, patchPurchaseOrder } from "@/helper";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const ExpertVenue = () => {
  const { message, loading, profile } = useSelector((state: any) => state);
  /* -------------------------------------------------------------------------- */
  /*                                  Constants                                 */
  /* -------------------------------------------------------------------------- */
  const venueList = [
    {
      imageUrl: "/assets/Images/shop_venue.png",
      title: "Expert Center",
      subTitle:
        "Specializing in men's- full body. Facial areas hollywood & scalp hair removal.",
    },
    {
      imageUrl: "/assets/Images/home_venue.png",
      title: "Infield",
      subTitle: "Choose from full body or racial package",
    },
    {
      imageUrl: "/assets/Images/laptop_venue.png",
      title: "Online",
      subTitle: "Choose from full body or racial package",
    },
  ];

  /* -------------------------------------------------------------------------- */
  /*                                  Variables                                 */
  /* -------------------------------------------------------------------------- */
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [purchaseOrder, setPurchaseOrder] = useState<any>({});

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
          .then((res) => setPurchaseOrder(res?.result))
          .catch((e) => alert(e))
          .finally(() => setIsLoading(false));
      }
    };
    getPurchaseOrder();
  }, [router]);

  /* ------------------------- Flow and Purchase Order ------------------------ */
  const flowAndPurchaseOrderHandler = (selectedVenue: any) => {
    setIsLoading(true);
    const purchaseCurrentStep = parseInt(purchaseOrder?.currentStep);
    const data = {
      purchaseOrderId: purchaseOrder?.data?.purchaseOrderId,
      currentStep: purchaseCurrentStep + 1,
      bookingType: selectedVenue,
    };
    patchPurchaseOrder(data)
      .then((res) => {
        if (
          purchaseCurrentStep + 1 ===
          purchaseOrder?.purchaseOrderFlow[0]?.screens?.length
        ) {
          router.replace("/");
        } else {
          const returnedPage = ServicePageMovement(
            purchaseOrder?.purchaseOrderFlow[0]?.screens[purchaseCurrentStep]
              ?.actionId
          );
          router.replace(`/${returnedPage}`);
        }
      })
      .catch((e) => alert(e))
      .finally(() => setIsLoading(false));
  };

  return (
    <>
      {profile?.firstName ? (
        <SideBar activeIndex={0}>
          <div
            style={{
              width: "100%",
              fontSize: "18px",
              backgroundColor: "white",
              padding: "0 0 0 1rem",
              borderTop: "1px solid lightgray",
              borderBottom: "1px solid lightgray",
              paddingTop: "0.5%",
              paddingBottom: "0.5%",
              color: "#404145",
              fontWeight: "900",
            }}
            className="px-5"
          >
            Service Type
          </div>
          <div>
            {isLoading ? (
              <div className="col-md-12 text-center py-5">
                <div className="spinner-border text-danger" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            ) : (
              <>
                <div className="custom_padding_services_pages">
                  {/* <PurchaseSummary purchaseOrder={purchaseOrder} /> */}
                  {venueList.map((venue, index) => (
                    <>
                      <div
                        key={index}
                        className="col-md-12 px-1 pb-1 bg-white cursor_property py-2 "
                        onClick={() =>
                          flowAndPurchaseOrderHandler(venue?.title)
                        }
                      >
                        <div className="row">
                          <div className="col-md-1 pt-0 pb-0 px-0 text-center">
                            <img
                              src={venue?.imageUrl}
                              alt={venue?.title}
                              className="img-fluid"
                            />
                          </div>

                          <div className="col-md-11 px-0 pt-3">
                            <h1
                              style={{
                                fontSize: "14px",
                                fontWeight: "bolder",
                              }}
                            >
                              {venue.title}
                            </h1>
                            <p className="sub_text_para pt-1">
                              {venue.subTitle}
                            </p>
                          </div>
                        </div>
                      </div>
                    </>
                  ))}
                </div>
              </>
            )}
            {/* <button onClick={onClickHandler}>SAVE & CONTINUE</button> */}
          </div>
        </SideBar>
      ) : (
        <div style={{ overflowY: "scroll", height: "100vh" }}>
          <div
            style={{
              width: "100%",
              fontSize: "18px",
              backgroundColor: "white",
              padding: "0 0 0 1rem",
              borderTop: "1px solid lightgray",
              borderBottom: "1px solid lightgray",
              paddingTop: "0.5%",
              paddingBottom: "0.5%",
              color: "#404145",
              fontWeight: "900",
            }}
            className="px-5"
          >
            Service Type
          </div>
          {isLoading ? (
            <div className="col-md-12 text-center py-5">
              <div className="spinner-border text-danger" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          ) : (
            <>
              <div className="mx-5">
                {/* */}
                <div className="my-5">
                  {/* <PurchaseSummary purchaseOrder={purchaseOrder} /> */}
                  {venueList.map((venue, index) => (
                    <>
                      <div
                        key={index}
                        className="col-md-12 px-1 pb-1 bg-white cursor_property py-2 "
                        onClick={() =>
                          flowAndPurchaseOrderHandler(venue?.title)
                        }
                      >
                        <div className="row">
                          <div className="col-md-1 pt-0 pb-0 px-0 text-center">
                            <img
                              src={venue?.imageUrl}
                              alt={venue?.title}
                              className="img-fluid"
                            />
                          </div>

                          <div className="col-md-11 px-0 pt-3">
                            <h1
                              style={{
                                fontSize: "14px",
                                fontWeight: "bolder",
                              }}
                            >
                              {venue.title}
                            </h1>
                            <p className="sub_text_para pt-1">
                              {venue.subTitle}
                            </p>
                          </div>
                        </div>
                      </div>
                    </>
                  ))}
                </div>
              </div>
            </>
          )}
          {/* <button onClick={onClickHandler}>SAVE & CONTINUE</button> */}
        </div>
      )}
    </>
  );
};

export default ExpertVenue;
