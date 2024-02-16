import React from "react";
import Styles from "../../styles/Landingpagemodules/ProductsForYou.module.css";
import Heading from "../Reusable/Heading";

import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper";

// import { productsForYou } from "../Assets";

const ProductsForYou: React.FC = () => {
  return (
    <div>
      <div className={Styles.alignForyouHeading}>
        <Heading text="Products For You" />
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
            <SwiperSlide>
              <div className={Styles.foryouSlider}>
                {/* <img src={productsForYou} alt="productsForYou" /> */}
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className={Styles.foryouSlider}>
                {/* <img src={productsForYou} alt="productsForYou" /> */}
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className={Styles.foryouSlider}>
                {/* <img src={productsForYou} alt="productsForYou" /> */}
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
  );
};
export default ProductsForYou;
