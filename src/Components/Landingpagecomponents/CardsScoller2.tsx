import React, { useState, useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "aos/dist/aos.css";
import Aos from "aos";
import { useRouter } from "next/router";

const CardScroller2 = ({ newdata }: any) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeCard, setActiveCard] = useState<any | null>(null);
  const [horizontalImages, setHorizontalImages] = useState([]);
  const [verticalImages, setVerticalImages] = useState([]);
  const [imageLoading, setImageLoading] = useState(true);

  const router = useRouter();
  const handleClickIndustry = (data: any) => {
    if (data.hasChild === true) {
      router.push(`/industries/${data.bannerIndustryId}`);
    } else {
      router.push(`/services/servicesByIndustryId/${data.bannerIndustryId}`);
    }
  };

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  const responsivee = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
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

  console.log("newdata", newdata);

  useEffect(() => {
    if (newdata && newdata.length > 0) {
      const horizontal: any = [];
      const vertical: any = [];

      newdata.forEach((item: any) => {
        item.attachments.forEach((attachment: any) => {
          if (attachment.isHorizontal) {
            horizontal.push(attachment);
          } else {
            vertical.push(attachment);
          }
        });
      });

      setHorizontalImages(horizontal);
      setVerticalImages(vertical);
    }
  }, [newdata]);

  console.log("hori", horizontalImages);
  console.log("ver", verticalImages);
  useEffect(() => {
    setTimeout(function () {}, 6000);
    Aos.init({
      offset: 100,
      duration: 2000,
      easing: "ease",
      once: true,
    });
  }, []);
  useEffect(() => {
    Aos.refresh(); // Reset AOS when content changes
  }, [activeCard]);

  useEffect(() => {
    // Update the active card whenever the index changes
    if (newdata && newdata[activeIndex]) {
      setActiveCard(newdata[activeIndex]);
    }

    // Reset activeIndex to 0 when it reaches 4
    if (activeIndex === 4) {
      setActiveIndex(0);
    }
  }, [activeIndex, newdata]);

  const handleAfterChange = (index: any) => {
    setActiveIndex(index - 3);
    setActiveCard(newdata[index]);
  };

  console.log("activeCard", activeCard);

  return (
    <div className="card-scroller mt-4 ">
      <div className=" mt-4">
        <div className="col-md-12 ">
          <div className="col-md-12 img-transition ">
            {activeCard ? (
              <img
                data-aos="zoom-in"
                data-aos-easing="fade-zoom-in"
                src={activeCard?.attachments[0].imageUrl}
                // src="/imagess/bg1.png"
                alt="Card Image"
                className="img-fluid height_width_scroller rounded "
              />
            ) : (
              <div>
                <img
                  src="/imagess/white.jpg"
                  alt="Card Image"
                  className="img-fluid height_width_scroller rounded "
                />
              </div>
            )}
            <div className="col-md-12 px-3 margin_top_neg">
              <div className="row">
                <div className="col-md-6 m-auto padding_new_conv">
                  {activeCard && (
                    <>
                      <p data-aos="fade-right" className="display_newnew">
                        {activeCard.serviceName}{" "}
                      </p>
                      <button
                        data-aos="zoom-in"
                        onClick={(e: any) => handleClickIndustry(activeCard)}
                        className="btn btn-danger button_exp_style rounded-pill px-4 py-1"
                      >
                        {" "}
                        Explore{" "}
                      </button>
                    </>
                  )}
                </div>
                <div className="col-md-6 px-3">
                  <div className="row">
                    <Carousel
                      responsive={responsivee}
                      removeArrowOnDeviceType={[
                        "tablet",
                        "mobile",
                        "desktop",
                        "superLargeDesktop",
                      ]}
                      draggable={true}
                      afterChange={handleAfterChange}
                      infinite={true}
                      autoPlay={true}
                      customTransition="all 2s"
                      transitionDuration={2000}
                      autoPlaySpeed={4000} // Adjust the speed here
                      itemClass="carousel-item-padding-40-px"
                    >
                      {newdata?.map((item: any, index: any) => {
                        return (
                          <div className="  me-3" key={index}>
                            {item.attachments.map(
                              (attachment: any, attachmentIndex: any) => {
                                return (
                                  <>
                                    {!attachment.isHorizontal ? (
                                      <img
                                        key={attachmentIndex}
                                        className="img-fluid img_rad "
                                        src={attachment.imageUrl}
                                        alt={`Image ${attachmentIndex}`}
                                      />
                                    ) : null}
                                  </>
                                );
                              }
                            )}
                            <p className="margin_top_crousal1_neg px-4">
                              {item?.serviceName}
                            </p>
                          </div>
                        );
                      })}
                    </Carousel>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardScroller2;
