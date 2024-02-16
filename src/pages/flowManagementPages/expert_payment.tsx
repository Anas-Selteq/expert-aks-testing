import {
  getOrderIdInLocalStorage,
  removeOrderIdInLocalStorage,
  removeServiceFromLocalStorage,
} from "@/Components/helper";
import CreditCard from "@/Components/payment/credit_card";
import {
  addCart,
  getAllListOfPayments,
  getPurchaseOrderWithId,
  patchPurchaseOrder,
} from "@/helper";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { BiChevronRight, BiCreditCard } from "react-icons/bi";
import PurchaseSummary from "@/Components/flow_management/purchase_summary";
import Layout2 from "@/Components/Layout2/Layout2";
import Image from "next/image";
import Link from "next/link";
import SideBar from "@/Components/components/sidebar";

const ExpertPayment = () => {
  const router = useRouter();
  const { profile } = useSelector((state: any) => state);
  const [defaultPayment, setDefaultPayment] = useState<any>(null);
  const [purchaseOrder, setPurchaseOrder] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);
  /* --------------------------- Get Purchase Order --------------------------- */
  useEffect(() => {
    const getPurchaseOrder = () => {
      const purchaseOrderId = parseInt(getOrderIdInLocalStorage());
      if (isNaN(purchaseOrderId)) {
        router.replace("/");
      } else {
        setIsLoading(true);
        getPurchaseOrderWithId(purchaseOrderId)
          .then((res) => setPurchaseOrder(res.result))
          .catch((e) => alert(e))
          .finally(() => setIsLoading(false));
      }
    };
    getPurchaseOrder();
  }, [router]);
  useEffect(() => {
    if (profile.userId !== undefined) {
      getAllListOfPayments(profile.userId)
        .then((res) => {
          if (res.paymentList === null) {
            console.log("No Payment Method Added");
          } else {
            for (let i = 0; i < res.paymentList.data.length; i++) {
              if (res.paymentList.data[i].defaultPaymentMethod === true) {
                setDefaultPayment(res.paymentList.data[i]);
              }
            }
          }
        })
        .catch((e) => {
          alert(e);
        });
    }
  }, [profile]);

  const savePaymentMethodId = () => {
    const OrderId = parseInt(getOrderIdInLocalStorage());
    const cartData = {
      currency: purchaseOrder?.data?.servicePayload?.currency,
      userId: purchaseOrder?.data?.customerId,
      countryId: purchaseOrder?.data?.countryId,
      qunatity: 1,
      amount: purchaseOrder?.data?.servicePayload?.actualPrice,
      createdBy: 0,
      serviceSKU: purchaseOrder?.data?.servicePayload?.serviceSKU,
      purchaseOrderId: OrderId,
    };
    addCart(cartData)
      .then((res) => {
        const cartId = res?.result?.cartId;
        const data = {
          purchaseOrderId: OrderId,
          paymentMethodId: defaultPayment?.id,
          submitPurchaseOrder: true,
          currentStep: purchaseOrder?.data?.totalStep,
          cartId: cartId,
        };
        return patchPurchaseOrder(data);
      })
      .then((res) => {
        router.replace("/verifying_Slots");
      })
      .catch((e) => console.error(e));
  };

  return (
    <Layout2>
     
          <div className="">
            <>
              <div
                style={{
                  width: "100%",
                  fontSize: "120%",
                  backgroundColor: "white",
                  padding: "0 0 0 1rem",
                  borderTop: "1px solid lightgray",
                  borderBottom: "1px solid lightgray",
                  paddingTop: "0.5%",
                  paddingBottom: "0.5%",
                  color: "gray",
                }}
                className="col-md-12"
              >
                  <div className="col-md-12 col-6">
                    {" "}
                    <span className="payment_page_text">Payment Method</span>
                  </div>
              </div>
              <div className="mt-3 margin_bottom_new  ">
                <PurchaseSummary purchaseOrder={purchaseOrder} />
                <div className="px-4 py-3 bg-white border border_rouned_payment">
                  <Link
                    className="style_a_tag"
                    href="/flowManagementPages/payment-seperate"
                  >
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="d-flex ">
                        <div className="text-danger bg-danger bg-opacity-10 rounded-circle p-3 me-4">
                          <BiCreditCard size={40} />
                        </div>
                        <div className="d-flex flex-column justify-content-evenly">
                          <span className="fs-5 fw-bold">Payment Method</span>
                          <span className="text-secondary label_text">
                            Select Your Card
                          </span>
                        </div>
                      </div>
                      <div className="text-secondary">
                        <Image
                          src="/assets/Images/rightt.png"
                          alt="keyright"
                          height={11.19}
                          width={6.33}
                        />
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </>
          </div>
       
    </Layout2>
  );
};
export default ExpertPayment;
