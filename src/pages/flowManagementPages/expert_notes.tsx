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
import NotesPc from "@/Components/NotesMobile/Notespc";

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
  const [isLoadingNew, setIsLoadingnew] = useState(false);
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

  /* --------------------- Flow and Purchase Order Handler -------------------- */
  const flowAndPurchaseOrderHandler = () => {
    setIsLoadingnew(true);
    const purchaseCurrentStep = parseInt(purchaseOrder?.currentStep);
    const data = {
      purchaseOrderId: purchaseOrder?.data?.purchaseOrderId,
      isNotes: true,
      currentStep: purchaseCurrentStep + 1,
    };
    console.log(
      "console",
      parseInt(purchaseOrder.currentStep) + 1,
      purchaseOrder?.purchaseOrderFlow[0]?.screens?.length
    );
    patchPurchaseOrder(data)
      .then((res) => {
        // router.replace("/flowManagementPages/expert_payment");
        // if (
        //   parseInt(purchaseOrder.currentStep) + 1 ===
        //   purchaseOrder.purchaseOrderFlow[0].screens.length
        // ) {
        //   router.replace("/");
        // } else {
        //   const returnedPage = ServicePageMovement(
        //     purchaseOrder.purchaseOrderFlow[0].screens[
        //       parseInt(purchaseOrder.currentStep)
        //     ].actionId
        //   );
        //   console.log(returnedPage);
        //   router.replace(`/${returnedPage}`);
        // }
        setIsLoadingnew(false);
        router.replace("/flowManagementPages/OrderSummary");
      })
      .catch((e) => alert(e))
      .finally(() => setIsLoadingnew(false));
  };

  // const createdNotes = () => setIsNotesCreated(true);

  return (
    <Layout2>
      <div className="margin_bottom_new mb-md-5 pb-md-5">
        <div className="col-md-12 px-md-5 px-3 mt-5 mb-5">
          <PurchaseSummary purchaseOrder={purchaseOrder} />
          <div className="col-md-12 bg-white px-3 py-3 border_rad_notes mb-3 on_pc_screeen">
            {/* <Demo /> */}
            <NotesPc />
          </div>
          <div className="col-md-12 mobile_screen_display">
            <NotesPc />
            {/* <NotesMobile /> */}
          </div>
          <div className="text-center mt-5">
            <button
              className="btn btn-danger color_danger mt-3 px-5 color_for_mob_button universal_button_color py-2 "
              onClick={flowAndPurchaseOrderHandler}
            >
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Next&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              {isLoadingNew ? (
                <div
                  className="spinner-border spinner-border-sm text-light"
                  role="status"
                >
                  <span className="visually-hidden">Loading...</span>
                </div>
              ) : null}
            </button>
          </div>
        </div>
      </div>
    </Layout2>
  );
};

export default ExpertNotes;
