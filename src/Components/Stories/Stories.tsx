import React from "react";
import Styles from "../../styles/Landingpagemodules/Stories.module.css";
import Heading from "../Reusable/Heading";
import StoriesBox from "./StoriesBox";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { FreeMode, Pagination } from "swiper";

interface StoriesProps {
  data: {
    textValue: string;
    sectionnew: {
      imageUrl: string;
      name: string;
    }[];
  };
}

const Stories: React.FC<StoriesProps> = ({ data }) => {
  const breakpoints = {
    320: {
      slidesPerView: 4,
    },
    738: {
      slidesPerView: 5,
    },
    988: {
      slidesPerView: 6,
    },
    1160: {
      slidesPerView: 7,
    },
    1500: {
      slidesPerView: 8,
    },
    1920: {
      slidesPerView: 9,
    },
  };

  return (
    <div className={Styles.storiesContainer}>
      <Heading text={data?.textValue} />
      <div className={Styles.alignStoriesContainer}>
        <Swiper
          breakpoints={breakpoints}
          spaceBetween={10}
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
              <StoriesBox text={item?.name} image={item?.imageUrl} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Stories;
