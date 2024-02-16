import React, { useEffect, useRef, useState } from "react";
import { render } from "react-dom";
import Carousel from "react-multi-carousel";
import { getOrderIdInLocalStorage, setServiceInLocalStorage } from "../helper";
import { useRouter } from "next/router";
import axios from "axios";

function Offers(data: any) {
  const [rating, setRating] = useState(0);
  const [newstateforpagination, setNewstateforpagination] = useState<any>(true);
  const [jwtToken, setJwtToken] = useState<any>(null);
  const paginationchange = () => {
    setNewstateforpagination(!newstateforpagination);
  };
  const responsivee = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 4,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 4,
    },
  };

  const responsiveepc = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 4,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
    },
  };
  const router = useRouter();

  const ratingChanged = (newRating: any) => {
    setRating(newRating);
  };
  useEffect(() => {
    setJwtToken(localStorage?.getItem("jwtToken"));
  }, [jwtToken]);

  const handleChildServices = async (service: any) => {
    localStorage.setItem("selectedService", JSON.stringify(service));
    if (service.hasChild === true) {
      // Redirect to child services page
      router.push(`/services/${service.serviceId}`);
    } else {
      const orderId = getOrderIdInLocalStorage();
      if (!orderId) {
        setServiceInLocalStorage(service);
      }
      const isToken = jwtToken !== null;
      const headers = {
        Authorization: isToken ? `Bearer ${jwtToken}` : undefined,
        "Content-Type": "application/json",
      };

      try {
        const response = await axios.get(
          `https://gateway.findanexpert.net/serviceinventory_svc/pb/Service/GetServiceSEO?serviceSKU=${service?.serviceSKU}`,
          { headers }
        );

        // Handle the response data here
        console.log(
          "SEO page api data",
          response?.data?.result?.serviceDeposit
        );

        // Update state or do something else with the data if needed
        // setData(response.data?.result?.outPutSectionModels);

        // Redirect to the service detail page
        const number1: any = 1;
        localStorage.setItem("main_quantity", number1);
        router.push(
          `/Service/${response?.data?.result?.serviceDeposit?.url}?service=${service.serviceSKU}`
        );
      } catch (error) {
        // Handle errors here
        // setError(error);
        console.error("error", error);
      }
    }
  };

  const carouselRef = useRef<any>(null);

  const handleNext = () => {
    carouselRef.current.next();
  };

  const handlePrev = () => {
    carouselRef.current.previous();
  };

  return (
    <div className="col-md-12    ">
      {/* for pc screen -----------------------------------------------------  */}
      <div>
        <div className=" on_pc_screeen ">
          <p className="m-0 heading_landing_page custom_padding1 pt-5 ">
            <p className="pt-3"> {data?.data?.name}</p>
          </p>
          {/* old design code -------------------------------------------------- */}
          {/* <div className="using_flex">
            {newstateforpagination === true ?
              <>
                {data?.data?.sectionnew?.slice(0, 5).map((item: any, index: any) => {
                  return (
                    <div key={index} onClick={() => handleChildServices(item)} data-bs-toggle="tooltip" data-bs-placement="top" title={item?.name} className="universal_cursor itemmm">
                      <div className="card_width_further">
                        <div>
                          <img className="img-fluid img_positioning_pfu" src={item?.attachments[0]?.imageUrl} />
                        </div>
                        <div className=" bottom_card_inf11">
                          <img className="img-fluid" src="/imagess/star.png" />
                        </div>
                      </div>
                      <p className="m-0  card_heading_text pt-3 pb-2">{item?.serviceName}</p>
                      <p className="m-0  card_heading_text2 text_limit">{item?.shortDesc === null ? <>Not Coming From backend</> : item?.shortDesc}</p>
                      <p className="m-0 pt-2">
                        <span className="text_50">£{item?.actualPrice === null ? <>NCFB</> : item?.actualPrice}</span>
                        <span className="text_15 px-1">{item?.offerdiscountedPrice === null ? <>NCFB</> : item?.offerdiscountedPrice}%</span>
                        <span className="text_15">OFF</span>
                      </p>
                    </div>
                  );
                })}
                {data?.data?.sectionnew?.length > 4 ?
                  <div className="col-md-12 text-center">
                    <button className="btn btn-danger load_button_color px-5 mt-3" onClick={paginationchange}> Load More </button>
                  </div> : null}
              </> :
              <>
                {data?.data?.sectionnew?.map((item: any, index: any) => {
                  return (
                    <div key={index} onClick={() => handleChildServices(item)} data-bs-toggle="tooltip" data-bs-placement="top" title={item?.name} className="universal_cursor itemmm mt-3">
                      <div className="card_width_further">
                        <div>
                          <img className="img-fluid img_positioning_pfu" src={item?.attachments[0]?.imageUrl} />
                        </div>
                        <div className=" bottom_card_inf11">
                          <img className="img-fluid" src="/imagess/star.png" />
                        </div>
                      </div>
                      <p className="m-0  card_heading_text pt-3 pb-2">{item?.serviceName}</p>
                      <p className="m-0  card_heading_text2 text_limit">{item?.shortDesc === null ? <>Not Coming From backend</> : item?.shortDesc}</p>
                      <p className="m-0 pt-2">
                        <span className="text_50">£{item?.actualPrice === null ? <>NCFB</> : item?.actualPrice}</span>
                        <span className="text_15 px-1">{item?.offerdiscountedPrice === null ? <>NCFB</> : item?.offerdiscountedPrice}%</span>
                        <span className="text_15">OFF</span>
                      </p>
                    </div>
                  );
                })}
                {data?.data?.sectionnew?.length > 4 ?
                  <div className="col-md-12 text-center">
                    <button className="btn btn-danger load_button_color px-5 mt-3" onClick={paginationchange}> Load Less </button>
                  </div> : null}
              </>
            }
          </div> */}
          <div className="row ">
            {/* <div className="col-md-1 text-center m-auto">
              <img onClick={handlePrev} className="img-fluid universal_cursor" src="/imagess/left.png" />
            </div> */}
            <div className="col-md-12 custom_padding1">
              <div className="card-container1 ps-3 pb-2 pt-1">
                {/* <Carousel
                  responsive={responsiveepc}
                  draggable={true}
                  ref={carouselRef}
                  removeArrowOnDeviceType={[
                    "tablet",
                    "mobile",
                    "desktop",
                    "superLargeDesktop",
                  ]}
                > */}
                {data?.data?.sectionnew?.map((item: any, index: any) => {
                  return (
                    <div
                      className="width_card me-5"
                      key={index}
                      onClick={() => handleChildServices(item)}
                    >
                      <div>
                        <img
                          className="img-fluid offers_img"
                          src={item?.attachments[0]?.imageUrl}
                        />
                      </div>
                      <div>
                        <img
                          className="img-fluid fav_icon_offer"
                          src="/imagess/fav.png"
                        />
                      </div>
                      {/* <div className=" bottom_card_inf11">
                          <img className="img-fluid" src="/imagess/star.png" />
                        </div> */}
                      <p className="card_heading_text pt-0 pb-0">
                        {item?.serviceName}
                      </p>
                      {/* <p className="m-0  card_heading_text2 text_limit">
                        {item?.shortDesc === null ? (
                          <>Not Coming From backend</>
                        ) : (
                          item?.shortDesc
                        )}
                      </p> */}
                      <div className="row">
                        <div className="col-md-6">
                          <p className="offers_price">
                            <span className="from_text">From</span>
                            <span className="text_50">
                              £
                              {item?.actualPrice === null ? (
                                <>NCFB</>
                              ) : (
                                item?.actualPrice
                              )}{" "}
                            </span>
                            <span className="font_discounted">
                              £
                              {item?.offerdiscountedPrice === null ? (
                                <>NCFB</>
                              ) : (
                                item?.offerdiscountedPrice
                              )}
                            </span>
                            {/* <span className="text_15 px-1">{item?.offerdiscountedPrice === null ? <>NCFB</> : item?.offerdiscountedPrice}%</span>
                              <span className="text_15">OFF</span> */}
                          </p>
                        </div>
                        <div className="col-md-6 text-end offers_price2">
                          <button className="btn btn-secondary off_button btn-sm rounded-pill py-0">
                            <span className="text_16 px-1">
                              {item?.offerdiscountedPrice === null ? (
                                <>NCFB</>
                              ) : (
                                item?.offerdiscountedPrice
                              )}
                              %
                            </span>
                            <span className="text_16">OFF</span>
                          </button>
                          {/* <p className="m-0 pt-2">
                            <span className="text_50">£{item?.actualPrice === null ? <>NCFB</> : item?.actualPrice}</span>
                            <span className="text_16 px-1">
                              {item?.offerdiscountedPrice === null ? (
                                <>NCFB</>
                              ) : (
                                item?.offerdiscountedPrice
                              )}
                              %
                            </span>
                            <span className="text_16">OFF</span>
                          </p> */}
                        </div>
                      </div>
                    </div>
                  );
                })}
                {/* </Carousel> */}
              </div>
            </div>
            {/* <div className="col-md-1 text-center m-auto">
              <img onClick={handleNext} className="img-fluid universal_cursor" src="/imagess/right.png" />
            </div> */}
          </div>
        </div>
      </div>

      {/* for mobile ------------------------------------------------------ */}
      <div className="display_mob pt-4 px-2">
        <p className="m-0  heading_landing_page_mob">{data?.data?.name}</p>
        {/* <Carousel
          responsive={responsivee}
          draggable={true}
          removeArrowOnDeviceType={[
            "tablet",
            "mobile",
            "desktop",
            "superLargeDesktop",
          ]}
        > */}
        <div className="card-container1">
          {data?.data?.sectionnew?.map((item: any, index: any) => {
            return (
              <div
                key={index}
                onClick={() => handleChildServices(item)}
                className="pdding_right_offers"
              >
                <div
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  title={item?.name}
                  className="universal_cursor mt-3"
                >
                  <div className="col-md-12">
                    <div>
                      <img
                        className="img-fluid newimgaes_of"
                        src={item?.attachments[0]?.imageUrl}
                      />
                    </div>
                  </div>
                  <div
                    className={`col-md-12 ${
                      index % 3
                        ? "border_background_new_blue"
                        : "border_background_new_red"
                    } text-center py-1`}
                  >
                    <p className="m-0  card_heading_text py-2 px-2 ">
                      {item?.serviceName}{" "}
                    </p>
                  </div>
                  {/* <p className="m-0  card_heading_text pt-3 pb-2">{item?.serviceName}</p>
                  <p className="m-0  card_heading_text2 text_limit1">{item?.shortDesc === null ? <>Not Coming From backend</> : item?.shortDesc}</p>
                  <p className="m-0 pt-2">
                    <span className="text_50">£{item?.actualPrice === null ? <>NCFB</> : item?.actualPrice}</span>
                    <span className="text_15 px-1 ">{item?.offerdiscountedPrice === null ? <>NCFB</> : item?.offerdiscountedPrice}%</span>
                    <span className="text_15">OFF</span>
                  </p> */}
                </div>
              </div>
            );
          })}
        </div>
        {/* </Carousel> */}
      </div>
    </div>
  );
}

export default Offers;
