import React from "react";
import Styles from "../../styles/Landingpagemodules/Foryou.module.css";
import Heading from "@/Components/Reusable/Heading";

import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper";

interface ForyouProps {
  data: {
    textValue: string;
    sectionnew?: {
      imageUrl?: string;
    }[];
  };
}

const Foryou: React.FC<ForyouProps> = ({ data }) => {
  function renderMediaItem(item: { imageUrl?: string }) {
    const extension = item?.imageUrl?.split(".").pop()?.toLowerCase();

    if (extension === "mp4") {
      return (
        <video
          src={item.imageUrl}
          controls={false}
          autoPlay={true}
          loop={true}
        />
      );
    } else if (
      extension === "png" ||
      extension === "jpg" ||
      extension === "jpeg"
    ) {
      return <img src={item.imageUrl} alt="foryou" />;
    } else {
      return <div>Unsupported file format</div>;
    }
  }

  return (
    <div>
      <div className={Styles.alignForyouHeading}>
        <Heading text={data?.textValue} />
      </div>
      <div className={`sliderForyou ${Styles.alignForyouSlider}`}>
        <div style={{ width: "90%" }}>
          <Swiper
            spaceBetween={30}
            modules={[Autoplay, Pagination]}
            className="mySwiper"
            pagination={{
              clickable: true,
            }}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            speed={1200}
          >
            {data?.sectionnew ? (
              data?.sectionnew?.map((item, index) => (
                <SwiperSlide key={index}>
                  <div className={Styles.foryouSlider}>
                    {item?.imageUrl ? (
                      renderMediaItem(item)
                    ) : (
                      <img src="../imagess/foryou.png" alt="foryou" />
                    )}
                  </div>
                </SwiperSlide>
              ))
            ) : (
              <SwiperSlide>
                <div className={Styles.foryouSlider}>
                  <img src="../imagess/foryou.png" alt="foryou" />
                </div>
              </SwiperSlide>
            )}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default Foryou;
