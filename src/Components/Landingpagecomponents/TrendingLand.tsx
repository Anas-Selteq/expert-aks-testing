import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { getOrderIdInLocalStorage, setServiceInLocalStorage } from "../helper";
import axios from "axios";
import CardsScroller from "./CardsScroller";
import CardScroller2 from "./CardsScoller2";

interface YourComponentProps {
  deviceType: "mobile" | "tablet" | "desktop" | "superLargeDesktop" | undefined; // Adjust type based on your requirements
}

function TrendingLand(data: any) {
  console.log("././././././////////////////////////////////////", data?.data);
  const [newstateforpagination, setNewstateforpagination] = useState<any>(true);
  const [activeIndex, setActiveIndex] = useState<any>(0);
  const paginationchange = () => {
    setNewstateforpagination(!newstateforpagination);
  };
  const responsive = {
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
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  const responsivee = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
    },
  };

  const router = useRouter();

  const [jwtToken, setJwtToken] = useState<any>(null);

  useEffect(() => {
    setJwtToken(localStorage?.getItem("jwtToken"));
  }, [jwtToken]);

  // sending data on required ---------------------------------------------------------------
  const handleChildServices = async (service: any) => {
    if (service.hasChild === true) {
      // Redirect to child services page
      // console.log("service",service)
      // router.push(`/services/${service.bannerIndustryId}`);
      router.push(`/industries/${service.bannerIndustryId}`);
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

  const handleChildServicess = (item: any) => {
    const index = data?.data?.sectionnew?.findIndex((i: any) => i === item);
    if (index !== -1) {
      setActiveIndex(index);
    }
  };

  console.log("activeIndex", activeIndex);

  return (
    <div className="col-md-12 pb-md-3 pb-0">
      <>
        {data?.data?.sectionnew === null ? null : (
          <>
            <div className="on_pc_screen_ipad">
              {/* <p className="m-0 heading_landing_page custom_padding1 ">
                <p> {data?.data?.name}</p>
              </p> */}
              {/* <Carousel
                responsive={responsive}
                draggable={true}
                removeArrowOnDeviceType={[
                  "tablet",
                  "mobile",
                  "desktop",
                  "superLargeDesktop",
                ]}
              > */}

              {/* {newstateforpagination === true ?
                <div className="row">
                  {data?.data?.sectionnew?.slice(0, 5).map((item: any, index: any) => {
                    const maxWords = 8;
                    const text = item?.shortDesc;
                    const truncatedText = text ? text.split(' ').slice(0, maxWords).join(' ') : '';
                    return (
                      <div onClick={() => handleChildServices(item)} className=" col-md pdding_right_offers1 mt-4 universal_cursor card_adj ">
                        <div className="col-md-12 bg_card_ground ">
                          <img
                            className="img-fluid w-100 img_rad"
                            src={item?.attachments === null ? "" : item?.attachments[0]?.imageUrl}
                          />
                        </div>
                        <div className="col-md-12 px-2 margin_top_negg">
                          <div className="bg_set_new px-2">
                            <p className="m-0 pb-0 pt-2 title_trending text_limit2">{item?.serviceName}</p>
                            <p className="m-0 pt-2 pb-0 description_of_card text_limit1">
                              {item?.shortDesc?.length === 0 ? (
                                <>No Description </>
                              ) : (
                                <>{truncatedText}...</>
                              )}
                            </p>
                            <div className="col-md-12 text-end pb-1">
                            <i className="fas fa-arrow-right"></i>
                              </div>
                          </div>
                          
                        </div>
                      </div>
                    );
                  })}
                  {data?.data?.sectionnew?.length > 5 ?
                    <div className="col-md-12 text-center">
                      <button className="btn btn-danger load_button_color px-5 mt-3" onClick={paginationchange}> Load More </button>
                    </div> : null}
                </div>
                :
                <div className="row">
                  {data?.data?.sectionnew?.map((item: any, index: any) => {
                    return (
                      <div className="col-md-3 mt-4 universal_cursor ">
                        <div className="col-md-12 bg_card_ground ">
                          <img
                            className="img-fluid w-100 img_rad"
                            src={item?.attachments === null ? "" : item?.attachments[0]?.imageUrl}
                          />
                        </div>
                        <div className="col-md-12 px-2 margin_top_negg">
                          <div className="bg_set_new px-2">
                            <p className="m-0 p-0">{item?.serviceName}</p>
                            <p className="m-0 pt-1 pb-2 description_of_card">
                              {item?.shortDesc?.length === 0 ? (
                                <>No Description </>
                              ) : (
                                <>{item?.shortDesc}</>
                              )}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  {data?.data?.sectionnew?.length > 4 ?
                    <div className="col-md-12 text-center">
                      <button className="btn btn-danger load_button_color px-5 mt-3" onClick={paginationchange}> Load Less </button>
                    </div> : null}
                </div>} */}
              {/* <CardsScroller newdata={data?.data?.sectionnew} /> */}
              <CardScroller2 newdata={data?.data?.sectionnew} />
              {/* 
                <Carousel
                responsive={responsivee}
                draggable={true}
                afterChange={(index) => setActiveIndex(index)}
                infinite={true}
                autoPlay={true}
                customTransition="all 2s"
                transitionDuration={500}
                autoPlaySpeed={1000}
              >
                {data?.data?.sectionnew?.map((item: any, index: any) => {
                  return (
                    <div className="mx-2" onClick={() => handleChildServicess(item)}>
                      <div className="col-md-12 bg_card_ground  ">
                        <img
                          className="img-fluid w-100 img_rad"
                          src={item?.attachments === null ? "" : item?.attachments[0]?.imageUrl}
                        />
                      </div>
                      <div className="col-md-12 px-2 margin_top_negg">
                        <div className="bg_set_new px-2 pt-2">
                          <p className="m-0 p-0 title_trending">{item?.name}</p>
                          <p className="m-0 pt-1 pb-2 description_of_card">
                            {item?.description?.length === 0 ? (
                              <>
                                No Avaliable from backend please add description{" "}
                              </>
                            ) : (
                              <>{item?.description}</>
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </Carousel> */}

              {/* </Carousel> */}
            </div>

            {/* for mobile --------------------------------------------------- */}
            {/* <div className="display_mob ps-4">
              <p className="m-0 pt-3 pb-2 heading_landing_page_mob">
                {data?.data?.name}
              </p>
              
              <div className="card-container1">
                {data?.data?.sectionnew?.map((item: any, index: any) => {
                  console.log("anas", item)
                  return (
                    <div className="cardd pe-4" onClick={() => handleChildServices(item)}>
                      <div className="col-md-12 bg_card_ground  ">
                        <img
                          className="img-fluid w-100 img_rad"
                          src={item?.attachments === null ? "" : item?.attachments[0]?.imageUrl}
                        />
                      </div>
                      <div className="col-md-12 px-2 margin_top_negg">
                        <div className="bg_set_new px-2 pt-2">
                          <p className="m-0 p-0 title_trending">{item?.serviceName}</p>
                          <p className="m-0 pt-1 pb-2 description_of_card text_limit1">
                            {item?.longDescription === null ? (
                              <div className="mt-1">
                                No Avaliable from backend ...
                              </div>
                            ) : (
                              <>{item?.longDescription}</>
                            )}
                          </p>
                          <div className="col-md-12 pt-2 text-end">
                            <span className="book_n"><strong>Book Now</strong></span><img className="img-fluid ps-3" src="/imagess/arow.png" />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div> */}
          </>
        )}
      </>
    </div>
  );
}

export default TrendingLand;
