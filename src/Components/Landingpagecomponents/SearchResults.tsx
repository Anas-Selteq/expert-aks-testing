import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { getOrderIdInLocalStorage, setServiceInLocalStorage } from "../helper";

function Searchreults(data: any) {
    console.log("././././././////////////////////////////////////", data?.data?.services);
    const [newstateforpagination, setNewstateforpagination] = useState<any>(true);
    const [jwtToken, setJwtToken] = useState<any>(null);
    const router = useRouter();
    const paginationchange = () => {
        setNewstateforpagination(!newstateforpagination)
    }
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

    useEffect(() => {
        setJwtToken(localStorage?.getItem("jwtToken"));
    }, [jwtToken]);


    const handleChildServices = async (service: any) => {
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
                console.log("SEO page api data", response?.data?.result?.serviceDeposit);

                // Update state or do something else with the data if needed
                // setData(response.data?.result?.outPutSectionModels);

                // Redirect to the service detail page
                router.push(`/Service/${response?.data?.result?.serviceDeposit?.url}`);
            } catch (error) {
                // Handle errors here
                // setError(error);
                console.error("error", error);
            }
        }
    };



    return (
        <div className="custom_padding1 py-md-5 py-2">
            <>

                <>
                    {/* For Pc -------------------------------------------- */}
                    <div className="on_pc_screeen">
                        <p className="m-0 p-0 heading_landing_page">
                            Search Results
                        </p>
                        <div className="row">

                            {newstateforpagination === true ?
                                <>
                                    {data?.data?.services?.slice(0, 4)?.map((item: any, index: any) => {
                                        return (
                                            <div className="col-md-3 mt-4 universal_cursor " key={index} onClick={() => handleChildServices(item)}>
                                                <div className="col-md-12 bg_card_ground ">
                                                    <img
                                                        className="img-fluid w-100 img_rad"
                                                        src={item?.serviceImage === null ? "" : item?.serviceImage}
                                                    />
                                                </div>
                                                <div className="col-md-12 px-2 margin_top_negg">
                                                    <div className="bg_set_new px-2">
                                                        <p className="m-0 p-0">{item?.serviceName}</p>
                                                        <p className="m-0 pt-1 pb-2 description_of_card">
                                                           {item?.shortDesc?.length === 0 ? (
                                                        <>
                                                            No Avaliable from backend please add description{" "}
                                                        </>
                                                    ) : (
                                                        <>{item?.shortDesc}</>
                                                    )}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                    {data?.data?.services.length > 4 ?
                                        <div className="col-md-12 text-center">
                                            <button className="btn btn-danger load_button_color px-5 mt-3" onClick={paginationchange}> Load More </button>
                                        </div> : null}
                                </>
                                : <>
                                    {data?.data?.services?.map((item: any, index: any) => {
                                        return (
                                            <div className="col-md-3 mt-4 universal_cursor " key={index} onClick={() => handleChildServices(item)}>
                                                <div className="col-md-12 bg_card_ground ">
                                                    <img
                                                        className="img-fluid w-100 img_rad"
                                                        src={item?.serviceImage === null ? "" : item?.serviceImage}
                                                    />
                                                </div>
                                                <div className="col-md-12 px-2 margin_top_negg">
                                                    <div className="bg_set_new px-2">
                                                        <p className="m-0 p-0">{item?.serviceName}</p>
                                                        <p className="m-0 pt-1 pb-2 description_of_card">
                                                           {item?.shortDesc?.length === 0 ? (
                                                        <>
                                                            No Avaliable from backend please add description{" "}
                                                        </>
                                                    ) : (
                                                        <>{item?.shortDesc}</>
                                                    )}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                    {data?.data?.services.length > 4 ?
                                        <div className="col-md-12 text-center">
                                            <button className="btn btn-danger load_button_color px-5 mt-3" onClick={paginationchange}> Load Less </button>
                                        </div> : null}
                                </>
                            }
                        </div>
                    </div>


                    {/* For mobile -------------------------------------------- */}
                    <div className="display_mob">
                        <p className="m-0 pb-3 heading_landing_page">
                            Search Results
                        </p>
                        <Carousel
                            responsive={responsivee}
                            draggable={true}
                            removeArrowOnDeviceType={[
                                "tablet",
                                "mobile",
                                "desktop",
                                "superLargeDesktop",
                            ]}
                        >
                            {data?.data?.services?.map((item: any, index: any) => {
                                return (
                                    <div className="mx-2" onClick={() => handleChildServices(item)} key={index}>
                                        <div className="col-md-12 bg_card_ground  " >
                                            <img
                                                className="img-fluid w-100 img_rad"
                                                src={item?.serviceImage === null ? "" : item?.serviceImage}
                                            />
                                        </div>
                                        <div className="col-md-12 px-2 margin_top_negg">
                                            <div className="bg_set_new px-2 pt-2">
                                                <p className="m-0 p-0 title_trending">{item?.serviceName}</p>
                                                <p className="m-0 pt-1 pb-2 description_of_card">
                                                    {item?.shortDesc?.length === 0 ? (
                                                        <>
                                                            No Avaliable from backend please add description{" "}
                                                        </>
                                                    ) : (
                                                        <>{item?.shortDesc}</>
                                                    )}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </Carousel>
                    </div>
                </>

            </>
        </div>
    );
}

export default Searchreults;
