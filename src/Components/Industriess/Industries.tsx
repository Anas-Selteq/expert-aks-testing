import React, { useEffect, useState } from "react";
import Styles from "../../styles/Landingpagemodules/Industries.module.css";
import Heading from "../Reusable/Heading";
import Styless from "../../styles/Landingpagemodules/Heading.module.css";
import CategoryItem from "../Reusable/CategoryItem";
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';

// Import Swiper styles
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { FreeMode, Pagination } from "swiper";
import IndustriesMob from "../LandingMobileSections/IndustriesMob";
import Carousel from "react-multi-carousel";
import { useRouter } from "next/router";

interface IndustriesProps {
  data: {
    textValue: string;
    sectionnew: {
      imageUrl: string;
      name: string;
    }[];
  };
}

const Industries: React.FC<IndustriesProps> = ({ data }: any) => {
  const [pairs, setPairs] = useState<any[]>();
  const [name, setName] = useState<string>();
  const [industriesshow, setIndustriesshow] = useState<any>(true)
  const [open, setOpen] = useState(false);
  const [orignalarray, setOrignalarray] = useState([]);
  const [evenarray, setEvenArray] = useState([]);
  const [oddarray, setOddArray] = useState([]);

  const showallindustries = () => {
    setIndustriesshow(!industriesshow)
  }


  const seperatearray = (array: any) => {

    const evenn: any = [];
    const oddd: any = [];

    array.forEach((item: any, index: any) => {

      if (index % 2 === 0) {
        evenn.push(item);
      } else {
        oddd.push(item);
      }
    });

    setEvenArray(evenn);
    setOddArray(oddd);
  }

  console.log("dataanas", evenarray)
  useEffect(() => {
    seperatearray(data?.sectionnew);
  }, [data?.sectionnew])


  function convertToPairs(arr: any[]) {
    const pairData: any[] = [];
    for (let i = 0; i < arr?.length; i += 2) {
      if (i + 1 < arr?.length) {
        pairData.push([arr[i], arr[i + 1]]);
      } else {
        pairData.push([arr[i]]);
      }
    }

    setPairs(pairData);
  }

  useEffect(() => {
    convertToPairs(data?.sectionnew);
    setName(data?.textValue);
  }, [data]);

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
      items: 5,
    },
  };

  // const router = useRouter();
  // const handleClickIndustry = (data: any) => {
  //   if (data === true) {
  //     router.push(`/industries/${data.id}`);
  //   } else {
  //     router.push(`/services/servicesByIndustryId/${data.id}`);
  //   }
  // };
  const router = useRouter();
  const handleClickIndustry = (data: any) => {
    if (data.hasChild === true) {
      router.push(`/industries/${data.id}`);
    } else {
      router.push(`/services/servicesByIndustryId/${data.id}`);
    }
  };
  console.log("pairssss", pairs);
  return (
    <div>
      <div className="display_pc">
        {/* <div className="padding_custom_industries pt-1">
          <p className={Styless.headingResuable}>Industries</p>
        </div> */}
        {/* <Swiper
          slidesPerView={5}
          spaceBetween={10}
          navigation={{
            nextEl: null,
            prevEl: null,
          }}
          pagination={{
            clickable: true,
          }}
          modules={[FreeMode, Pagination]}
          className={`mySwiper ${Styles.boxAlign} slider2`}
        >
          {pairs?.map((item, index) => {
            console.log(item);
            return (
              <SwiperSlide key={index}>
                <div className={Styles.itemContainerBox}>
                  <CategoryItem data={item[0]} />

                  <CategoryItem data={item[1]} />
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper> */}
      </div>
      <div className="col-md-12 padding_all_ser pt-3 display_pc">

        <>
          <div className="row">
            {data?.sectionnew?.slice(0, 12)?.map((item: any, index: any) => {
              console.log(item);
              return (
                <div className="col-md-2 universal_cursor text-center py-4" onClick={() => handleClickIndustry(item)}>
                  <img className="img-fluid img_size_set" src={item?.attachments[0]?.imageUrl} />
                  <p style={{ color: "gray" }} className="pt-4">
                    {item?.serviceName}
                  </p>
                </div>
              );
            })}
          </div>
          {open === false ?
            <div className="col-md-12 text-center" onClick={() => setOpen(!open)}
              aria-controls="example-collapse-text"
              aria-expanded={open}>
              <img className="img-fluid button_for_pos" src="/imagess/down.png" />
            </div> : null}
        </>
        <Collapse in={open}>
          <div id="example-collapse-text">
            <div className="row">
              {data?.sectionnew?.slice(13)?.map((item: any, index: any) => {
                console.log(item);
                return (
                  <div className="col-md-2 universal_cursor text-center py-4" onClick={() => handleClickIndustry(item)}>
                    <img className="img-fluid img_size_set" src={item?.attachments[0]?.imageUrl} />
                    <p style={{ color: "gray" }} className="pt-4">
                      {item?.serviceName}
                    </p>
                  </div>
                );
              })}
            </div>
            <div className="col-md-12 text-center" onClick={() => setOpen(!open)}>
              <img className="img-fluid button_for_pos" src="/imagess/up.png" />
            </div>
          </div>
        </Collapse>




      </div>


      {/* for mobile setting ----------------------------------------------------------------------------------------------------------- */}
      <div className="display_mob px-4 ">
        {pairs ? (
          <>
            <div className="flex-container ">

              {data?.sectionnew?.slice(0, 10)?.map((item: any, index: any) => {
                return (
                  <div className="item mt-2 ">
                    <div
                      className="text-center"
                      onClick={() => handleClickIndustry(item)}
                    >

                      <img
                        className="img-fluid height_width_landing_ind mx-2"
                        src={item?.attachments[0]?.imageUrl}
                        alt={item?.name}
                      />
                      <h6 className="service_ind_p pt-2">{item?.serviceName}</h6>

                    </div>
                  </div>
                );
              })}


            </div>
            {open === false ?
              <div className="col-md-12 m-0 p-0 text-center" onClick={() => setOpen(!open)}
                aria-controls="example-collapse-text"
                aria-expanded={open}>
                <img className="img-fluid button_for_pos" src="/imagess/down.png" />
              </div> : null}

            <Collapse in={open}>
              <div id="example-collapse-text">
                <div className="flex-container  ">

                  {data?.sectionnew?.slice(11)?.map((item: any, index: any) => {
                    return (
                      <div className="item mt-2">
                        <div
                          className="text-center"
                          onClick={() => handleClickIndustry(item)}
                        >

                          <img
                            className="img-fluid height_width_landing_ind mx-2"
                            src={item?.attachments[0]?.imageUrl}
                            alt={item?.name}
                          />
                          <h6 className="service_ind_p pt-2">{item?.serviceName}</h6>

                        </div>
                      </div>
                    );
                  })}


                </div>
                <div className="col-md-12 text-center" onClick={() => setOpen(!open)}>
                  <img className="img-fluid button_for_pos " src="/imagess/up.png" />
                </div>
              </div>
            </Collapse>



            <div className="col-md-12 px-2 ">
              {/* <h2 className="px-2 mb-4">Industries</h2> */}
              {/* <div className="">
                <Carousel
                  responsive={responsive}
                  draggable={true}
                  removeArrowOnDeviceType={[
                    "tablet",
                    "mobile",
                    "desktop",
                    "superLargeDesktop",
                  ]}
                >
                  {data?.sectionnew?.slice(0, 12)?.map((item: any, index: any) => {
                    return (
                      <div
                        className="text-center"
                        onClick={() => handleClickIndustry(item)}
                      >

                        <img
                          className="img-fluid height_width_landing_ind"
                          src={item?.attachments[0]?.imageUrl}
                          alt={item?.name}
                        />
                        <h6 className="service_ind_p pt-2">{item?.serviceName}</h6>

                      </div>
                    );
                  })}
                </Carousel>
              </div> */}

              {/* <div className="col-md-12 mt-3">
                <div className="">
                  <Carousel
                    responsive={responsive}
                    draggable={true}
                    removeArrowOnDeviceType={[
                      "tablet",
                      "mobile",
                      "desktop",
                      "superLargeDesktop",
                    ]}
                  >
                    {data?.sectionnew?.slice(13)?.map((item: any, index: any) => {
                      return (
                        <div
                          className="text-center"
                          onClick={() => handleClickIndustry(item)}
                        >
                          <img
                            className="img-fluid height_width_landing_ind"
                            src={item?.attachments[0]?.imageUrl}
                            alt={item?.name}
                          />
                          <h6 className="service_ind_p pt-2">{item?.serviceName}</h6>
                        </div>
                      );
                    })}
                  </Carousel>
                </div>
              </div> */}
            </div>
          </>
        ) : (
          <p>loading</p>
        )}
      </div>
    </div>
  );
};

export default Industries;
