import React from "react";
import Styles from "../../styles/Landingpagemodules/Trending.module.css";
import Heading from "../Reusable/Heading";
import TrendingServiceCard from "../Reusable/TrendingServiceCard";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { FreeMode, Pagination } from "swiper";

interface TrendingProps {
  data: {
    textValue: string;
    sectionnew?: {
      name?: string;
      description?: string;
    }[];
  };
}

const Trending: React.FC<TrendingProps> = ( data: any ) => {
  console.log("view large>>>>>>",data)
  const breakpoints = {
    320: {
      slidesPerView: 2,
    },
    738: {
      slidesPerView: 2.7,
    },
    988: {
      slidesPerView: 3.5,
    },
    1160: {
      slidesPerView: 4,
    },
    1500: {
      slidesPerView: 4.7,
    },
    1920: {
      slidesPerView: 5.7,
    },
  };

  return (
    <div className={Styles.trendingBox}>
      {/* <Heading text={data?.textValue} />
      <Swiper
        breakpoints={breakpoints}
        spaceBetween={"30px"}
        freeMode={true}
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
        {data?.sectionnew?.map((item, index) => (
          <SwiperSlide key={index}>
            <TrendingServiceCard
              name={item?.name}
              description={item?.description}
            />
          </SwiperSlide>
        ))}
      </Swiper> */}
    </div>
  );
};

export default Trending;
