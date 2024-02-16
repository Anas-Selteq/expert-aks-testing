import React, { useEffect, useState } from "react";
import { render } from "react-dom";
import Carousel from "react-multi-carousel";
import { getOrderIdInLocalStorage, setServiceInLocalStorage } from "../helper";
import { useRouter } from "next/router";
import axios from "axios";

function NewTrendingLand(data: any) {
  const [rating, setRating] = useState(0);
  const [newstateforpagination, setNewstateforpagination] = useState<any>(true);
  const [buttonchange, setButtonchange] = useState<any>(0);
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
      items: 2,
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

  return (
    <div className="col-md-12 custom_padding1 mb-3">
      {/* for pc screen -----------------------------------------------------  */}
      <div>
        <div className=" on_pc_screeen ">
          <p className="m-0  heading_landing_page pt-5 ">
            <p className="pt-3"> {data?.data?.name}</p>
          </p>
          {/* old design code -------------------------------------------------- */}

          {/* {newstateforpagination === true ? ( */}
          <>
            <div className="row">
              <div className="col-md-12 custom_padding">
                <div className="card-container1 pb-0 pt-1">
                  {data?.data?.sectionnew?.map((item: any, index: any) => {
                    return (
                      <div
                        key={index}
                        onClick={() => handleChildServices(item)}
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title={item?.name}
                        className="universal_cursor itemmm "
                      >
                        <div className="card_width_further me-5">
                          <div>
                            <img
                              className="img-fluid img_positioning_pfu"
                              src={item?.attachments[0]?.imageUrl}
                            />
                          </div>
                          <div>
                            <img
                              className="img-fluid fav_icon_fy"
                              src="/imagess/fav.png"
                            />
                          </div>
                          {/* <div className=" bottom_card_inf11">
                          <img className="img-fluid" src="/imagess/star.png" />
                        </div> */}
                        </div>
                        <p className="card_heading_text pt-0">
                          {item?.serviceName}
                        </p>
                        {/* <p className="m-0  card_heading_text2 text_limit">
                          {item?.shortDesc === null ? (
                            <>Not Coming From backend</>
                          ) : (
                            item?.shortDesc
                          )}
                        </p> */}
                        <p className="offers_price">
                          <span className="from_text">From</span>
                          <span className="text_50">
                            £
                            {item?.actualPrice === null ? (
                              <>NCFB</>
                            ) : (
                              item?.actualPrice
                            )}
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
                    );
                  })}
                  {/* <button className="btn btn-danger load_button_color px-5 mt-3"> Load More </button> */}
                  {/* {data?.data?.sectionnew?.length > 4 ? (
                  <div className="col-md-12 text-center">
                    <img
                      onClick={paginationchange}
                      className="img-fluid button_for_pos"
                      src="/imagess/down.png"
                    ></img>
                  </div>
                ) : null} */}
                </div>
              </div>
            </div>
          </>
        </div>
      </div>

      {/* for mobile ------------------------------------------------------ */}
      <div className="col-md-12 px-1 display_mob pt-4 ">
        <div className="row">
          <div className="col-md-6 col-6">
            <p className="m-0 heading_landing_page_mob">{data?.data?.name}</p>
          </div>
          <div className="col-md-6 col-6 text-end">
            {/* <p className="m-0 heading_landing_page_mob">
              See All
            </p> */}
          </div>
        </div>

        <div className="card-container1 ">
          {data?.data?.sectionnew?.map((item: any, index: any) => {
            return (
              <div
                className="pe-5"
                key={index}
                onClick={() => handleChildServices(item)}
              >
                <div
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  title={item?.name}
                  className="universal_cursor mt-3"
                >
                  <div className="card_width_further pe-4">
                    <div>
                      <img
                        className="img-fluid img_positioning_pfu2"
                        src={item?.attachments[0]?.imageUrl}
                      />
                    </div>
                    <div className=" bottom_card_inf11">
                      {/* <img className="img-fluid" src="/imagess/star.png" /> */}
                    </div>
                  </div>
                  <p className="m-0  card_heading_text pt-4 pb-2">
                    {item?.serviceName}
                  </p>
                  {/* <p className="m-0  card_heading_text2 one_line_text_limit">
                    {item?.shortDesc === null ? (
                      <>Not Coming From backend</>
                    ) : (
                      item?.shortDesc
                    )}
                  </p> */}
                  <p className="m-0 pt-1">
                    <span className="from_text">From</span>
                    <span className="text_50">
                      £
                      {item?.actualPrice === null ? (
                        <>NCFB</>
                      ) : (
                        item?.actualPrice
                      )}
                    </span>
                    <span className="font_discounted">
                      £
                      {item?.offerdiscountedPrice === null ? (
                        <>NCFB</>
                      ) : (
                        item?.offerdiscountedPrice
                      )}
                    </span>
                    {/* <span className="text_15 px-1">
                      {item?.offerdiscountedPrice === null ? (
                        <>NCFB</>
                      ) : (
                        item?.offerdiscountedPrice
                      )}
                      %
                    </span>
                    <span className="text_15">OFF</span> */}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default NewTrendingLand;
