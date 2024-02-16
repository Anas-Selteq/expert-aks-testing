import { AiOutlineFileSearch, AiOutlineClockCircle } from "react-icons/ai";
import { IoIosArrowBack } from "react-icons/io";
import { BiChevronRight } from "react-icons/bi";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ServicePageMovement } from "@/Components/service_page_movement";
import {
  getOrderIdInLocalStorage,
  getPaymentFromLocalStorage,
  getServiceFromLocalStorage,
  setOrderIdInLocalStorage,
} from "@/Components/helper";
import Image from "next/image";
import {
  getFlowManagementBySKU,
  getPurchaseOrderWithId,
  postPurchaseOrder,
} from "@/helper";
import { useSelector } from "react-redux";

const ServiceDetail = () => {
  /* -------------------------------------------------------------------------- */
  /*                                  Variables                                 */
  /* -------------------------------------------------------------------------- */
  const [object, setObject] = useState<any>();
  const { profile } = useSelector((state: any) => state);
  const router = useRouter();

  /* -------------------------------------------------------------------------- */
  /*                                  Functions                                 */
  /* -------------------------------------------------------------------------- */
  /* -------------------------- Create Purchase Order ------------------------- */
  const handleFlowScreen = () => {
    const service = getServiceFromLocalStorage();
    const orderId = getOrderIdInLocalStorage();
    if (service === null || !profile.userId) {
      alert("Please Select Service or Login");
      router.replace("/auth/signup");
    } else {
      if (object && object.result?.bookingFlow?.length === 0) {
        alert("No Flow Found Please Select Another Service");
      } else {
        if (!orderId || orderId === undefined) {
          const bookingFlow = object && object.result?.bookingFlow;
          const object1 = {
            currentStep: 0,
            totalStep: bookingFlow && bookingFlow[0]?.screens.length,
            customerId: profile?.userId,
            customerName: profile?.firstName + profile?.lastName ?? "UNKNOWN",
            customerEmail: profile?.primaryEmail ?? "UNKNOWN@EMAIL.COM",
            customerNumber: profile?.primaryMobile ?? "0987654321",
            customerGender: profile?.genderId ?? "1001",
            bookingFlow: bookingFlow,
            serviceId: service?.serviceId,
            servicePayload: service,
            serviceSKU: service?.serviceSKU,
            totalPrice: service?.actualPrice,
            totalAmount: service?.actualPrice,
            currency: service?.currency,
            returnUrl: "https://newexpert-preprod.findanexpert.net/",
          };
          postPurchaseOrder(object1)
            .then((res) => {
              const importantData = bookingFlow && bookingFlow[0]?.screens;
              const returnedData = ServicePageMovement(
                importantData && importantData[0]?.screenName
              );
              if (returnedData !== "/") {
                setOrderIdInLocalStorage(res?.result?.purchaseOrderId);
                router.push(`/${returnedData}`);
              }
            })
            .catch((e) => alert(e))
            .finally(() => {});
        } else {
          getPurchaseOrderWithId(parseInt(orderId))
            .then((res) => {
              if (
                parseInt(res?.result?.currentStep) ===
                parseInt(res?.result?.data?.totalStep)
              ) {
                alert("Payment method is in pending ");
                router.push("/flowManagementPages/expert_payment");
              } else {
                alert("Already a Purchase Order is in Pending");
                const currentStep = res?.result?.currentStep;
                const returnedData = ServicePageMovement(
                  res?.result?.purchaseOrderFlow[0]?.screens[currentStep - 1]
                    ?.actionId
                );
                if (returnedData !== "/") {
                  router.push(`/${returnedData}`);
                }
              }
            })
            .catch((e) => alert(e));
        }
      }
    }
  };

  useEffect(() => {
    function fetchFlowData() {
      const service = getServiceFromLocalStorage();
      getFlowManagementBySKU(service?.serviceSKU)
        .then((res) => {
          if (res.result?.bookingFlow?.length === 0) {
            alert("No Flow Found");
          } else {
            setObject(res);
          }
        })
        .catch((e) => alert(e));
    }
    fetchFlowData();
  }, []);

  return (
    <div className="container pt-4">
      <div className="row">
        <div className="col-md-5">
          <div className="col-md-12">
            <h6 className="cursor_back" onClick={() => router.back()}>
              <IoIosArrowBack /> Back
            </h6>
            <div className="col-md-12 text-center pt-4">
              <Image
                src="/assets/Images/bannergirl.png"
                alt="Banner Girl"
                className="img-fluid img_width_bannerg"
                height={125.63}
                width={135.3}
              />
            </div>
            <div className="text-center pt-3">
              <h4 className="heading_color">
                <b>Laser Treatment</b>
              </h4>
              <h6 className="heading_color">897 Bookings this year</h6>
              <button className="btn btn-light btn_style_light mt-2 heading_color">
                <AiOutlineFileSearch /> Laser Guide <BiChevronRight />
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-7">
          <Image
            src="/assets/Images/banner.png"
            className="img-fluid img_fix_banner"
            alt="Banner"
            height={358.35}
            width={641.02}
          />
        </div>
      </div>
      <div className="col-md-12 my-3">
        <div className="col-md-12 border_container pt-3">
          <div className="container">
            <div className="display_flexx_services">
              {Array(7)
                .fill({
                  title: "Laser Vein Removal",
                  url: "/assets/Images/beautyg.png",
                })
                .map((item: any, index: number) => (
                  <div key={index} className="catagories_width text-center">
                    <Image
                      className="img-fluid "
                      alt="image"
                      height={109.2}
                      width={109.2}
                      src={item.url}
                    />
                    <h6 className="pt-1 heading_color">{item.title}</h6>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-12 pt-3">
        <div className="col-md-12">
          <h4 className="heading_color">
            <b>Expert Packages</b>
          </h4>
        </div>
        <div className="row pt-2">
          {Array(4)
            .fill({
              title: "Fully Body Indulgence",
              url: "/assets/Images/head.png",
              polyUrl: "/assets/Images/poly.png",
              price: "£300",
              priceFrom: "$2000",
              timeTaking: "1 hrs 10 min",
              detailList: [
                "Eyebrow threading",
                "Chocolate Roll-on",
                "Elysian firming wine glow facial",
                "Elysian Chocolate & Vanilla manicure",
                "Elysian Chocolate & Vanilla pedicure",
              ],
            })
            .map((item, index) => (
              <div key={index} className="col-md-6 border_right">
                <div className="col-md-12">
                  <div className="row">
                    <div className="col-md-2 pt-2">
                      <Image
                        alt="head"
                        height={70.87}
                        width={70.87}
                        className="img-fluid"
                        src={item.url}
                      />
                    </div>
                    <div className="col-md-7 pt-2">
                      <h6 className="heading_color">
                        <b>{item.title}</b>
                      </h6>
                      <p className="font_size_2 mb-0 pb-0">
                        From <b className="font_size_3">{item.priceFrom}</b>
                      </p>
                      <p className="font_size_4">
                        {" "}
                        <AiOutlineClockCircle /> {item.timeTaking}
                      </p>
                    </div>
                    <div className="col-md-3">
                      <div className="col-md-12 text-end">
                        <div className="col-md-12 text-end">
                          <Image
                            className="img-fluid poly_width"
                            alt="poly"
                            height={35.48}
                            width={35.48}
                            src={item.polyUrl}
                          />
                          <h6 className="px-1 position_top">
                            {item.price} <p className="save_text px-2"> Save</p>
                          </h6>
                        </div>
                        <button
                          className="btn btn-outline-danger btn-sm"
                          onClick={handleFlowScreen}
                        >
                          Book New
                        </button>
                      </div>
                    </div>
                  </div>
                  <hr />
                  <div className="col-md-12 px-0">
                    <ul>
                      {item.detailList.map((detail: any, i: number) => (
                        <li key={i} className="font_ul">
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
      <div className="col-md-12 mb-3 mt-3">
        <h4 className="heading_color">
          <b>Discount Offers</b>
        </h4>
        <div className="col-md-12 mt-4">
          <div className="row">
            {Array(4)
              .fill("Save 15% on every order")
              .map((item: any, index: number) => (
                <div className="col-md-3" key={index}>
                  <div className="col-md-12 bcakground_color_card pt-1 pb-1">
                    <div className="row">
                      <div className="col-md-2"></div>
                      <div className="col-md-10">
                        <p className="mb-0 pb-0 save_text1">{item}</p>
                        <p className="mb-0 pb-0 get_now_text1">Get now</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
      <div className="col-md-12 mb-3 mt-3">
        <h4 className="heading_color">
          <b>Service Menu</b>
        </h4>
        <div className="col-md-12 mt-4">
          <div className="row">
            {[...Array(7)].map((service: any, index: number) => (
              <div className="col-md-6" key={index}>
                <div className="row">
                  <div className="col-md-3">
                    <Image
                      className="img-fluid"
                      src="/assets/Images/beautyg.png"
                      alt="Service Image"
                      height={118.52}
                      width={118.52}
                    />
                  </div>
                  <div className="col-md-9">
                    <h6 className="main_heading_service">Laser Vein Removal</h6>
                    <h6 className="sub_heading_service">
                      We have years of experience in repairing all different
                      kinds of units.
                    </h6>
                    <div className="row pt-3">
                      <div className="col-md-4">
                        <p className="font_size_2 mb-0 pb-0">
                          From <b className="font_size_3">$2000</b>
                        </p>
                      </div>
                      <div className="col-md-4">
                        <p className="font_size_4">
                          <AiOutlineClockCircle /> 1 hrs 10 min
                        </p>
                      </div>
                      <div className="col-md-4">
                        <button
                          className="btn btn-outline-danger btn-sm"
                          onClick={handleFlowScreen}
                        >
                          Book New
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <hr />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;
