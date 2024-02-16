import SideBar from "@/Components/components/sidebar";
import { getOrderIdInLocalStorage } from "@/Components/helper";
import { getPurchaseOrderWithId } from "@/helper";
import axios from "axios";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";

const ThankYou = () => {
  const { message, loading, profile } = useSelector((state: any) => state);
  const [respoorderdata, setRespoorderdata] = useState<any>({})
  const [Respoorderdatachrgeid, setRespoorderdatachrgeid] = useState<any>({})
  const router = useRouter();
  const removeAllVariables = () => {
    router.replace("/");
    localStorage.removeItem("selectedService");
    localStorage.removeItem("quantity_selected");
  };

  const getPurchaseOrder = useCallback(() => {
    var codeState = 0;
    const purchaseOrderId = parseInt(getOrderIdInLocalStorage());
    if (isNaN(purchaseOrderId)) {
      // router.replace("/");
    } else {
      getPurchaseOrderWithId(purchaseOrderId)
        .then((res) => {
          console.log("anasress", res?.result?.data?.purchaseOrderId)
          setRespoorderdata(res?.result?.data);
        })
        .catch((e) => alert(e));
    }
  }, [router]);


  // const getchargeid = async () => {
  //   try {
  //     // Define your payload
  //     const payload = {
  //       cartId: respoorderdata?.cartId,
  //       purchaseOrderId: respoorderdata?.purchaseOrderId,
  //       userId: profile?.externalCustomerId,
  //       // Add any other properties you need in your payload
  //     };

  //     // Specify additional headers if needed
  //     const headers = {
  //       'Content-Type': 'application/json', // Adjust the content type based on your API requirements
  //       // Add any other headers you need
  //     };

  //     // Make a POST request using Axios with payload and headers
  //     const response = await axios.post('https://gateway.findanexpert.net/payment_svc/pv/Payment/CheckPaymentHold', payload, { headers });

  //     // Handle the response
  //     console.log('Responseanas:', response.data);
  //     setRespoorderdatachrgeid(response.data);
  //   } catch (error) {
  //     // Handle errors
  //     console.error('Error:');
  //   }
  // };


  useEffect(() => {
    getPurchaseOrder();
  }, []);

  // useEffect(() => {
  //   getchargeid();
  // }, [respoorderdata?.cartId, profile?.externalCustomerId]);


  return (
    <>

      <div
        style={{
          width: "100%",
          fontSize: "18px",
          backgroundColor: "white",
          borderTop: "1px solid lightgray",
          borderBottom: "0.7px solid #dcdcdc",
          fontFamily: "Roboto",
          fontWeight: "800",
          fontStyle: "normal",
          letterSpacing: "normal",
          color: "#404145",
          position: "relative",
          zIndex: "1",
        }}
        className="px-4"
      >
        <div className="row py-2">
          <div className="col-md-6">
            {" "}
            <span>Thankyou</span>
          </div>
        </div>
      </div>
      <div className="col-md-12 pt-3  mt-1 margin_bottom_new">
        <div className="col-md-12 p-4 text-center bg_color_white_thankyou">
          <div className="row">
            <div className="col-md-3"></div>
            <div className="col-md-6 py-1">
              <img className="img-fluid" src="/imagess/thankyou.png" />
              <h2 className="pt-4">{respoorderdata?.chargeId === null ? <b>Thankyou for booking!</b> : <b>Thankyou for booking!</b>}</h2>
              <h6 className="pt-1 label_text">
                {respoorderdata?.chargeId === null ? null :
                  <>
                    Thankyou so much for choosing to book with us through our
                    website, We are thrilled to have successfully processed your
                    booking and are grateful for the opportunity to serve you.
                    Your trust in our online platform means a lot to us, and we
                    are committed to delivering a seamless and enjoyable
                    experience.
                  </>
                }
              </h6>

              {/* <div className="bg-white p-2 text-center mt-auto pt-3">
                    <p>
                      Want to book another service?{" "}
                      <span onClick={removeAllVariables}>
                        Click here to book another service
                      </span>
                    </p>
                  </div> */}
            </div>
            <div className="col-md-3"></div>
          </div>
        </div>
        <div className="col-md-12">
          <button
            className="btn btn-danger btn-lg text-center mt-2 w-100 button_thnakyou mt-5 mb-5"
            onClick={removeAllVariables}
          >
            Back to home
          </button>
        </div>
      </div>

    </>
  );
};
export default ThankYou;
