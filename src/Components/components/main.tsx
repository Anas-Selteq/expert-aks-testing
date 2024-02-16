import axios from "axios";
import React, { useEffect, useState } from "react";
import { ServicePageMovement } from "../service_page_movement";
import { useRouter } from "next/router";
import { encryptObject, setOrderIdInLocalStorage } from "../helper";
import { getBookingFlowByServiceId, postPurchaseOrder } from "@/helper";

interface FetchedData {
  result: {
    bookingFlow: [
      {
        screens: Array<any>;
      }
    ];
    // other properties...
  };
  // other properties...
}

const Main = () => {
  const [fetchedData, setFetchedData] = useState(false);
  const [object, setObject] = useState<FetchedData>();
  const [purchaseOrderId , setPurchaseOrderId] = useState<number>();
const router = useRouter();
  useEffect(() => {
    async function fetchFlowData() {
      setFetchedData(true);
      getBookingFlowByServiceId(20).then((res)=>{}).catch((e)=>alert(e)).finally(()=>setFetchedData(false));
    }
    fetchFlowData();
  }, []);

  const handleFlowScreen = async () => {
  
        const bookingFlow = object&&object.result.bookingFlow;
      const object1 = {
        currentStep: 0,
        totalStep: bookingFlow&&bookingFlow[0].screens.length,
        customerId: 19,
        bookingFlow: bookingFlow,
        servicePayload: {
          serviceName: "Men's Small Area (Select one of the areas)",
          serviceDetail: "",
          bookingDuration: 15,
          isSessionBasedBooking: true,
          customerName: "Matthew  Fowles",
          isCompleted: false,
          isCheckedIn: false,
        },
      };
      postPurchaseOrder(object1).then((res)=>{
        const importantData = bookingFlow && bookingFlow[0].screens;
        const returnedData = ServicePageMovement(importantData && importantData[0].screenName);
        if(returnedData !== "/"){
        router.push({
            pathname: `/${returnedData}`,
            query: {
                data: encryptObject(importantData),
                step: 0,
            },
          });
          setOrderIdInLocalStorage(res.result.purchaseOrderId);}
      }).catch((e)=>alert(e));
  };

  return fetchedData ? (
    <h1>Fetching Flow Data</h1>
  ) : (
    <>
      {object &&
        object.result.bookingFlow.map((obj, i) => (
          <div key={i}>
            {obj.screens.map((obj1, index) => (
              <ul key={index}>
                <li>Screen Name : {obj1.screenName}</li>
                <li>Position : {obj1.position}</li>
                <li>actionId : {obj1.actionId}</li>
              </ul>
            ))}
          </div>
        ))}
        <button onClick={handleFlowScreen}>SAVE & CONTINUE</button>
    </>
  );
};

export default Main;
