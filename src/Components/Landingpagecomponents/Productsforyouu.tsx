import React, { useEffect, useState } from "react";
import { render } from "react-dom";
import Carousel from "react-multi-carousel";
import { getOrderIdInLocalStorage, setServiceInLocalStorage } from "../helper";
import { useRouter } from "next/router";
import axios from "axios";

function Productsforyouu(data: any) {
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
      router.push(`/services/${service.id}`);
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
    <div className="col-md-12  pb-4">
      {/* for pc screen -----------------------------------------------------  */}
      <div>
        <div className=" on_pc_screeen">
          <p className="m-0 pb-1 heading_landing_page pt-4 custom_padding1">
            <p> {data?.data?.name}</p>
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
          {/* New design code -------------------------------------------------- */}
          {newstateforpagination === true ? (
            <>
              {data?.data?.sectionnew
                ?.slice(0, 5)
                .map((item: any, index: any) => {
                  return (
                    <>
                      {index % 2 ? (
                        <div className="col-md-12 position_left_right_allser">
                          <div className="row">
                            <div className="col-md-6 allser_text m-auto">
                              <img
                                className="img-fluid img_height_width"
                                src={item?.attachments[0]?.imageUrl}
                              />
                            </div>
                            <div className="col-md-6 allser_text2 m-auto">
                              <p className="all_ser_heading m-0 p-0">
                                {item?.serviceName}
                              </p>
                              <p className="all_ser_sub_heading m-0 p-0">
                                Starting from &nbsp;&nbsp;&nbsp;&nbsp;
                                <span className="price">
                                  £{item?.actualPrice}{" "}
                                </span>
                              </p>
                              <p className="all_ser_para m-0 pt-4">
                                {item?.shortDesc}
                              </p>
                              <div className="d-flex">
                                <button
                                  onClick={() => handleChildServices(item)}
                                  className="btn px-4 py-1 btn-sm mt-4 button_book_now2"
                                >
                                  BOOK NOW
                                </button>
                                <img
                                  className="img-fluid fav_icon_allser pb-1 pe-1"
                                  src="/imagess/fav.png"
                                />
                                {/* &nbsp;&nbsp;&nbsp;&nbsp;<img className="img-fluid un_fav_button" src="/imagess/fav.png" /> */}
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="col-md-12 light_gray_back">
                          <div className="row">
                            <div className="col-md-6 allser_text m-auto">
                              <p className="all_ser_heading m-0">
                                {item?.serviceName}
                              </p>
                              <p className="all_ser_sub_heading m-0 p-0">
                                Starting from &nbsp;&nbsp;&nbsp;&nbsp;
                                <span className="price">
                                  £{item?.actualPrice}
                                </span>
                              </p>
                              <p className="all_ser_para m-0 pt-4">
                                {item?.shortDesc}
                              </p>
                              <div className="d-flex">
                                <button
                                  onClick={() => handleChildServices(item)}
                                  className="btn px-4 py-1 btn-sm mt-4 button_book_now"
                                >
                                  BOOK NOW
                                </button>
                                <img
                                  className="img-fluid fav_icon_allser pb-1 pe-1"
                                  src="/imagess/fav.png"
                                />
                                {/* &nbsp;&nbsp;&nbsp;&nbsp;<img className="img-fluid un_fav_button" src="/imagess/fav.png" /> */}
                              </div>
                            </div>
                            <div className="col-md-6 allser_text2 m-auto">
                              <img
                                className="img-fluid img_height_width"
                                src={item?.attachments[0]?.imageUrl}
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </>
                  );
                })}
              {data?.data?.sectionnew?.length > 4 ? (
                <div className="col-md-12 text-center">
                  <img
                    className="img-fluid button_for_pos"
                    onClick={paginationchange}
                    src="/imagess/down.png"
                  />
                </div>
              ) : null}
            </>
          ) : (
            <>
              {data?.data?.sectionnew?.map((item: any, index: any) => {
                return (
                  <>
                    {index % 2 ? (
                      <div className="col-md-12 position_left_right_allser">
                        <div className="row">
                          <div className="col-md-6 allser_text">
                            <img
                              className="img-fluid img_height_width m-auto"
                              src={item?.attachments[0]?.imageUrl}
                            />
                          </div>
                          <div className="col-md-6 allser_text2 m-auto">
                            <p className="all_ser_heading m-0 p-0">
                              {item?.serviceName}
                            </p>
                            <p className="all_ser_sub_heading m-0 p-0">
                              Starting from &nbsp;&nbsp;&nbsp;&nbsp;
                              <span className="price">
                                £{item?.actualPrice}{" "}
                              </span>
                            </p>
                            <p className="all_ser_para m-0 pt-4">
                              {item?.shortDesc}
                            </p>
                            <div className="d-flex">
                              <button
                                onClick={() => handleChildServices(item)}
                                className="btn px-4 py-1 btn-sm mt-4 button_book_now2"
                              >
                                BOOK NOW
                              </button>
                              <img
                                className="img-fluid fav_icon_allser pe-1 pb-1"
                                src="/imagess/fav.png"
                              />
                              {/* &nbsp;&nbsp;&nbsp;&nbsp;<img className="img-fluid un_fav_button" src="/imagess/fav.png" /> */}
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="col-md-12 light_gray_back">
                        <div className="row">
                          <div className="col-md-6 allser_text m-auto">
                            <p className="all_ser_heading m-0 p-0">
                              {item?.serviceName}
                            </p>
                            <p className="all_ser_sub_heading m-0 p-0">
                              Starting from &nbsp;&nbsp;&nbsp;&nbsp;
                              <span className="price">
                                £{item?.actualPrice}
                              </span>
                            </p>
                            <p className="all_ser_para m-0 pt-4">
                              {item?.shortDesc}
                            </p>
                            <div className="d-flex">
                              <button
                                onClick={() => handleChildServices(item)}
                                className="btn btn-light px-4 btn-sm py-1 mt-4 button_book_now"
                              >
                                BOOK NOW
                              </button>
                              <img
                                className="img-fluid fav_icon_allser pe-1 pb-1"
                                src="/imagess/fav.png"
                              />
                              {/* &nbsp;&nbsp;&nbsp;&nbsp;<img className="img-fluid un_fav_button" src="/imagess/fav.png" /> */}
                            </div>
                          </div>
                          <div className="col-md-6 allser_text2">
                            <img
                              className="img-fluid img_height_width m-auto"
                              src={item?.attachments[0]?.imageUrl}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                );
              })}
              {data?.data?.sectionnew?.length > 4 ? (
                <div className="col-md-12 text-center">
                  <img
                    className="img-fluid button_for_pos"
                    onClick={paginationchange}
                    src="/imagess/up.png"
                  />
                </div>
              ) : null}
            </>
          )}
        </div>
      </div>

      {/* for mobile ------------------------------------------------------ */}
      <div className="col-md-12  display_mob pt-4 ">
        {/* <div className="row " >
          <div className="col-md-6 col-6">
            <p className="m-0 heading_landing_page_mob">
              {data?.data?.name}
            </p>
          </div>
          <div className="col-md-6 col-6 text-end ">
            <img className="img-fluid " src="/imagess/dfilter.png" />
          </div>
        </div> */}
        <div className="col-md-12 px-2">
          <div className="col-md-12">
            <p className="m-0 heading_landing_page_mob">{data?.data?.name}</p>
          </div>
          {/* <div className="row">
            <div className="col-md-6 col-6">
              <p className="m-0 heading_landing_page_mob">
                {data?.data?.name}
              </p>
            </div>
            <div className="col-md-6 col-6 text-end">
              <img className="img-fluid " src="/imagess/dfilter.png" />
            </div>
          </div> */}
        </div>
        <div className="col-md-12 px-2">
          {data?.data?.sectionnew?.map((item: any, index: any) => {
            return (
              <div
                className="col-md-12 main_card_ser_mob mt-4"
                onClick={() => handleChildServices(item)}
              >
                <div className="col-md-12">
                  <img
                    className="img-fluid img_adjust_mob_all_services"
                    src={item?.attachments[0]?.imageUrl}
                  />
                </div>
                <div className="col-md-12 margin_top_negative_ser px-3 ">
                  <button className="btn btn-light background_card_ser w-100 one_line_text_limit ">
                    {" "}
                    {item?.serviceName}{" "}
                  </button>
                </div>
                <div className="col-md-12 px-3">
                  <div className="row">
                    <div className="col-md-6 m-auto col-6">
                      <p className="m-0 p-0 ser_card">
                        Starting from{" "}
                        <span className="text_red_price ps-2">
                          £
                          {item?.actualPrice === null ? (
                            <>NCFB</>
                          ) : (
                            item?.actualPrice
                          )}
                        </span>
                      </p>
                    </div>
                    <div className="col-md-6 col-6 text-end">
                      {/* <img className="img-fluid" src="/imagess/heart.png" /> */}
                    </div>
                  </div>
                  <p className="m-0 mt-2 mb-2 p_tag_serv text_limit1">
                    {item?.shortDesc === null ? (
                      <>Not Coming From backend</>
                    ) : (
                      item?.shortDesc
                    )}
                  </p>
                  <div className="col-md-12 text-end pt-2 pb-1 text_see_more">
                    <p>...See More</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Productsforyouu;
