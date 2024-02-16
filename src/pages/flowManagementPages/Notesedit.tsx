import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Demo from "@/Components/flow_management/demo";
import { Grid } from "@mui/material";
import { ServicePageMovement } from "@/Components/service_page_movement";
import { getOrderIdInLocalStorage } from "@/Components/helper";
import { getPurchaseOrderWithId, patchPurchaseOrder } from "@/helper";
import PurchaseSummary from "@/Components/flow_management/purchase_summary";
import Layout2 from "@/Components/Layout2/Layout2";
import NotesMobile from "@/Components/NotesMobile/NotesMobile";
import Noteseditbooking from "./Noteseditbooking";

interface VideoI {
  type: string;
  src: string;
}

const ExpertNotes = () => {
  /* -------------------------------------------------------------------------- */
  /*                                  Variables                                 */
  /* -------------------------------------------------------------------------- */
  const router = useRouter();
  const [duration, setDuration] = useState(0);
  const [file, setFile] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [videoFile, setVideoFile] = useState<any>(null);
  const [audio, setAudio] = useState(null);
  const [purchaseOrder, setPurchaseOrder] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isNotesCreated, setIsNotesCreated] = useState(false);
  const [isNotesVerification, setIsNotesVerification] = useState(false);
  const [note, setnote] = useState<any>({
    bookingId: parseInt(getOrderIdInLocalStorage()),
    userId: 11,
    notes: "This is testing view ",
    isEnable: true,
    noteType: "customer",
    img: [],
    audio: [],
    video: [],
  });

  // Validation on button on the basses of notes api response 
  const handleDataFromChild = (data: any) => {
    setIsNotesVerification(data);
  };

  /* -------------------------------------------------------------------------- */
  /*                                  Functions                                 */
  /* -------------------------------------------------------------------------- */
  /* ------------------------- Getting Purchase Order ------------------------- */
  useEffect(() => {
    const getPurchaseOrder = () => {
      setIsLoading(true);
      getPurchaseOrderWithId(parseInt(getOrderIdInLocalStorage()))
        .then((res) => setPurchaseOrder(res?.result))
        .catch((e) => alert(e))
        .finally(() => setIsLoading(false));
    };
    getPurchaseOrder();
  }, []);


  useEffect(() => {
    const confirmUnload = (e: any) => {
      e.preventDefault();
      e.returnValue = '';  // This line is required for some browsers
      // const userResponse = window.confirm('Are you sure you want to leave?');
      // if (userResponse) {
        localStorage.removeItem('orderId');
      // }
    };

    const handleRouteChange = (url: any) => {
      if (url !== '/flowManagementPages/Notesedit') {
        // const userResponse = window.confirm('Are you sure you want to leave?');
        // if (userResponse) {
          localStorage.removeItem('orderId');
        // } else {
        //   router.events.emit('routeChangeError');
        //   throw 'routeChange aborted.';
        // }
      }
    };

    window.addEventListener('beforeunload', confirmUnload);
    router.events.on('routeChangeStart', handleRouteChange);

    return () => {
      window.removeEventListener('beforeunload', confirmUnload);
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, []);


  /* --------------------- Flow and Purchase Order Handler -------------------- */
  //   const flowAndPurchaseOrderHandler = () => {
  //     const purchaseCurrentStep = parseInt(purchaseOrder?.currentStep);
  //     const data = {
  //       purchaseOrderId: purchaseOrder?.data?.purchaseOrderId,
  //       isNotes: true,
  //       currentStep: purchaseCurrentStep + 1,
  //     };
  //     patchPurchaseOrder(data)
  //       .then((res) => {
  //         if (
  //           purchaseCurrentStep + 1 ===
  //           purchaseOrder?.purchaseOrderFlow[0]?.screens?.length
  //         ) {
  //           router.replace("/");
  //         } else {
  //           const returnedPage = ServicePageMovement(
  //             purchaseOrder?.purchaseOrderFlow[0]?.screens[purchaseCurrentStep]
  //               ?.actionId
  //           );
  //           router.replace(`/${returnedPage}`);
  //         }
  //       })
  //       .catch((e) => alert(e))
  //       .finally(() => setIsLoading(false));
  //   };

  // const createdNotes = () => setIsNotesCreated(true);

  const flowAndPurchaseOrderHandler = () => {
    localStorage.removeItem('orderId');
    router.push("/AllBookingsNew");

  }

  return (
    <Layout2>
      <div style={{ paddingBottom: "0%" }}>
        <div className="col-md-12  mt-3 margin_bottom_new" >
          {/* <PurchaseSummary purchaseOrder={purchaseOrder} /> */}
          <div className="col-md-12 bg-white px-3 py-3 border_rad_notes mb-3 on_pc_screeen">
            <Noteseditbooking />
          </div>
          <div className="col-md-12  mobile_screen_display">
          <Noteseditbooking />
          </div>
          <div className="text-end">
            <button
              className="btn btn-danger color_danger mt-1 px-4 py-1 mb-4"
              onClick={flowAndPurchaseOrderHandler}
            >
              Save & Continue
            </button>
          </div>
        </div>
      </div>
    </Layout2>
  );
};

export default ExpertNotes;
