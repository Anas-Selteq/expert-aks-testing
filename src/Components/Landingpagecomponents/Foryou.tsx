import ReactStars from "react-rating-stars-component";
import React, { useState } from "react";
import { render } from "react-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

function Foryou(data: any) {
  console.log("itmmmmmmmmmmmmmmmmmmmmmmm",data)
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
  const [rating, setRating] = useState(0);

  const ratingChanged = (newRating: any) => {
    setRating(newRating);
  };
  // console.log("this is added to favourites", dataa.dataa);
  return (
    <div className="custom_padding1 pt-5">
      {/* <div className="using_flex"> */}
      <Carousel
        responsive={responsive}
        draggable={true}
        removeArrowOnDeviceType={[
          "tablet",
          "mobile",
          "desktop",
          "superLargeDesktop",
        ]}
        autoPlay={true}
        autoPlaySpeed={2000}
        infinite={true}
      >
        {data?.data?.sectionnew?.map((item: any, index: any) => {
          console.log("Sdsdsdsdsd", item);
          return (
            <div key={index}>
              <div>
                <img className="img-fluid img_dynamic" src={item?.imageUrl} />
              </div>
              <div className="neg_stars_top">
                <div className="btn btn-light rounded-circle">
                  <div className="text-end ">
                    <ReactStars
                      count={1}
                      onChange={ratingChanged}
                      size={24}
                      activeColor="#ffd700"
                      value={rating}
                    />
                  </div>
                </div>
              </div>
              <p className="m-0  card_heading_text pt-3 pb-2">{item?.name}</p>
              <p className="m-0  card_heading_text2">{item?.description}</p>
              <p className="m-0 pt-2">
                <span className="text_50">50$</span>
                <span className="text_15 px-1">15%</span>
                <span className="text_15">OFF</span>
              </p>
            </div>
          );
        })}
      </Carousel>
      {/* </div> */}
      {/* <div className="col-md-12 text-end pt-5">
        <span className="btn btn-danger active_ind mx-2">01</span>
        <span className="btn btn-light btn-sm  unselected_numbers mx-2">
          02
        </span>
        <span className="btn btn-light btn-sm unselected_numbers mx-2">03</span>
        <span className="btn btn-light btn-sm unselected_numbers mx-2">04</span>
        <span className="btn btn-light btn-sm unselected_numbers mx-2">05</span>
        <span className="btn btn-light background_view_all ">View All</span>
      </div> */}
    </div>
  );
}

export default Foryou;
