import React, { useState, useEffect } from 'react';
import Carousel from 'react-multi-carousel';

const CardScroller = ({ newdata }: any) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeCardDetails, setActiveCardDetails] = useState<any | null>(null);
  const responsivee = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
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


  const displayCards = newdata.slice(currentIndex, currentIndex + 3);

  const nextCards = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + 3 < newdata.length ? prevIndex + 1 : 0
    );
    setActiveIndex((prevIndex) =>
      prevIndex + 1 < newdata.length ? prevIndex + 1 : 0
    );
  };

  const prevCards = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : newdata.length - 1
    );
    setActiveIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : newdata.length - 1
    );
  };

  const startAutoScroll = () => {
    const interval = setInterval(() => {
      nextCards();
    }, 3000); // Adjust the interval as needed (in milliseconds)

    return () => clearInterval(interval);
  };

  useEffect(() => {
    if (displayCards.length > 0) {
      setActiveCardDetails(displayCards[0]);
    }

    const autoScrollCleanup = startAutoScroll();
    return () => {
      autoScrollCleanup();
    };
  }, [displayCards]);

  const adjustedIndex = activeIndex + 1;

  return (
    <div className="card-scroller mt-4">
      <div className='col-md-12 '>
        <div className='col-md-12  '>
          {activeCardDetails && (
            <img
              src={activeCardDetails?.attachments[0].imageUrl}
              // src="/imagess/bg1.png"
              alt="Card Image" className='img-fluid height_width_scroller' />
          )}
          <div className='col-md-12 px-3 margin_top_neg'>
            <div className='row'>
              <div className='col-md-6 m-auto padding_new_conv'>
                {activeCardDetails && (
                  <>
                    <p className='display_newnew'>{activeCardDetails.serviceName}</p>
                    <button className='btn btn-danger button_exp_style rounded-pill px-4'> Explore </button>
                  </>
                )}
              </div>
              <div className='col-md-6'>
                <div className="row">
                  {displayCards.map((card: any, index: number) => (
                    <div className={`col-md-4 card-container`} key={card.id}>
                      <div className="card height_width_of_card object_fitt">
                        <img src={card.attachments[0].imageUrl} className='object_fitt' />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* <Carousel
            responsive={responsivee}
            draggable={true}
            afterChange={(index) => {
              setActiveIndex(index); 
              setActiveCardDetails(displayCards[index]);  
            }}
            infinite={true}
            autoPlay={true}
            customTransition="all 2s"
            transitionDuration={500}
            autoPlaySpeed={1000}
            itemClass="carousel-item-padding-40-px" 
          >
            {displayCards?.map((item: any, index: any) => {
            
              return (
                <div className="mx-2" key={index}>
                  <div className="col-md-12 bg_card_ground">
                    <p>{index}</p> 
                    <img
                      className="img-fluid w-100 img_rad"
                      src={item.attachments[0].imageUrl}
                    />
                  </div>
                </div>
              );
            })}
          </Carousel> */}


        </div>

      </div>
     
    </div>
  );
};

export default CardScroller;
