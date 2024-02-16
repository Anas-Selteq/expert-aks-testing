import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { AiOutlineRight } from "react-icons/ai";
import { BiDotsVertical, BiSearch } from "react-icons/bi";
import Link from "next/link";
import { ServicePageMovement } from "./service_page_movement";
import { getOrderIdInLocalStorage } from "./helper";
import {
  getAddresses,
  getPurchaseOrderWithId,
  patchPurchaseOrder,
} from "@/helper";
import { Button } from "@/styles/Button.style";
import { useSelector } from "react-redux";

const ManageAddresses = () => {
  /* -------------------------------------------------------------------------- */
  /*                                  Variables                                 */
  /* -------------------------------------------------------------------------- */
  const [addresses, setAddresses] = useState<any>([]);
  const {profile} = useSelector((state:any)=>state);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const [purchaseOrder, setPurchaseOrder] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  /* -------------------------------------------------------------------------- */
  /*                                  Functions                                 */
  /* -------------------------------------------------------------------------- */
  /* ----------------------------- Fetch Addresses ---------------------------- */
  const fetchAddresses = useCallback(() => {
    getAddresses(profile?.userId).then((response: any) => {
      setAddresses(response.result.addresses);
    });
  },[profile]);
  /* -------------------------------- UseEffect ------------------------------- */
  useEffect(() => {
    fetchAddresses();
    getPurchaseOrder();
  }, [fetchAddresses]);

  /* --------------------------- Get Purchase Order --------------------------- */
  const getPurchaseOrder = () => {
    setIsLoading(true);
    getPurchaseOrderWithId(parseInt(getOrderIdInLocalStorage()))
      .then((res) => setPurchaseOrder(res.result))
      .catch((e) => alert(e))
      .finally(() => setIsLoading(false));
  };


  /* ------------------------- Flow And Purchase Order ------------------------ */
  const flowAndPurchaseOrderHandler = (address: any) => {
    const purchaseCurrentStep = parseInt(purchaseOrder.currentStep);
    const data = {
      purchaseOrderId: purchaseOrder?.data.purchaseOrderId,
      billingAddress: address,
      currentStep: purchaseCurrentStep + 1,
    };
    patchPurchaseOrder(data)
      .then((res) => {
        if (
          purchaseCurrentStep + 1 ===
          purchaseOrder.purchaseOrderFlow[0].screens.length
        ) {
          router.push("/");
        } else {
          const returnedPage = ServicePageMovement(
            purchaseOrder.purchaseOrderFlow[0].screens[purchaseCurrentStep]
              .actionId
          );
          router.push(`/${returnedPage}`);
        }
      })
      .catch((e) => alert(e))
      .finally(() => setIsLoading(false));
  };

  return (
    <>
      <div className="container">
        <div className="row d-flex justify-content-between">
          <div className="col-md-3">
            <div className="card card-border">side bar</div>
          </div>
          <div className="col-md-9">
            <div className="card p-3">
              <div className="row d-flex justify-content-between">
                <div className="col-md-9">
                  <h4 className="manage-address">Manage Addresses</h4>
                  <p className="manage-address-detail">
                    Don&apos;t worry, your information is private and we will
                    not share this info with anyone outside Expert!
                  </p>
                  <Link href="#" className="Learn-more mt-5">
                    Create New Address
                    <AiOutlineRight />
                  </Link>
                </div>
                <div className="col-md-3">
                  <Image
                    src="assets/Images/img2.png"
                    height={135.54}
                    width={181.32}
                    alt="create account"
                    className="rounded-circle mx-auto d-block"
                  />
                </div>
              </div>
            </div>
            <div className="card p-4 mt-5">
              <div className="d-flex justify-content-end align-items-center mb-5">
                <div
                  className="d-flex align-items-center rounded-pill"
                  style={{
                    backgroundColor: "white",
                    border: "1px solid lightgrey",
                    padding: "0.5rem 1rem",
                    margin: "0 0.6rem",
                    width: "30%",
                  }}
                >
                  <BiSearch />
                  <input
                    type="text"
                    className="border border-0"
                    style={{
                      marginLeft: "0.5rem",
                      outline: "none",
                    }}
                    placeholder="Search"
                  />
                </div>
                <Button
                  width="25%"
                  style={{
                    backgroundColor: "red",
                    margin: "0",
                    fontWeight: "bolder",
                  }}
                  onClick={() => {}}
                >
                  Add New Address
                </Button>
              </div>
              {addresses.length === 0 ? (
               <div className="text-center">
               <h6>No Address Found</h6>
               </div>
              ) : (
                addresses.map((address: any, index: number) => {
                  return (
                    <div
                      key={index}
                      style={{ cursor: "default" }}
                      onClick={() => flowAndPurchaseOrderHandler(address)}
                    >
                      <div
                        className="container d-flex align-items-center justify-content-between"
                        style={{
                          backgroundColor: "#f8fafc",
                          borderRadius: "1rem",
                          padding: "1rem 1rem 1rem 1rem",
                          marginBottom: "1rem",
                        }}
                        onClick={(e: any) => setSelectedIndex(index)}
                      >
                        <div
                          className="row align-items-center px-3"
                          style={{
                            textAlign: "left",
                          }}
                        >
                          <div
                            style={{
                              color: "grey",
                              fontSize: "0.8rem",
                              textDecoration: "none",
                            }}
                          >
                            {address.state}
                          </div>
                          <div
                            style={{
                              color: "black",
                              textDecoration: "none",
                            }}
                          >
                            {address.townCity}
                          </div>
                        </div>
                        <div>
                          <BiDotsVertical />
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageAddresses;
