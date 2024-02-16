import React, { useState, useEffect } from "react";
import Styles from "../../styles/Landingpagemodules/ServicesListing.module.css";
import ServiceCard from "../Reusable/ServiceCard";

// Import Swiper styles
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { FreeMode, Pagination } from "swiper";
import Heading from "../Reusable/Heading";

interface ServicesListingProps {
  data: {
    textValue: string;
    sectionnew: {
      imageUrl: string;
      name: string;
      description: string;
    }[];
  };
}

const ServicesListing: React.FC<ServicesListingProps> = ({ data }) => {
  const dummy = [1, 2, 3, 4, 5, 6, 7, 8];
  const breakpoints = {
    320: {
      slidesPerView: 1,
    },
    480: {
      slidesPerView: 2,
    },
    768: {
      slidesPerView: 3,
    },
    1000: {
      slidesPerView: 4.5,
    },
    1500: {
      slidesPerView: 5,
    },
    1920: {
      slidesPerView: 6,
    },
  };

  const [pairs, setPairs] = useState<any[]>();
  const [name, setName] = useState<string>();

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

  return (
    <div className={Styles.serviceListingContainer}>
      <div className={Styles.serviceListingBox}>
        <Heading text={data?.textValue} />

        <Swiper
          breakpoints={breakpoints}
          spaceBetween={85}
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
          {pairs?.map((item, index) => (
            <SwiperSlide key={index}>
              <div className={Styles.itemContainerBox}>
                <ServiceCard
                service={item[0]}
                />
                <ServiceCard
                service={item[1]}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default ServicesListing;
