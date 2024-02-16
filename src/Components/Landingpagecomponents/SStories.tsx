import React from 'react'
import Carousel from 'react-multi-carousel';

function SStories(data: any) {
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
      items: 4,
    },
  };
  return (
    <div className="col-md-12 custom_padding1 pt-5 text-center">
    <div className='row on_pc_screeen'>
        {data?.data?.sectionnew?.map((item: any, index: any) => {
            return(
                <div className='col-md col-4'>
                <img className="img-fluid img_circle" src={item?.imageUrl} />
                <p className="m-0 font_size_set_stories pt-3 pb-2">{item?.name}</p>
                </div>
            )
        })}
    </div>
    <div className='display_mob'>
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
              {data?.data?.sectionnew?.map((item: any, index: any) => {
                
                return(
                  <div className="text-center" >
                  <img className="img-fluid height_width_landing_ind" src={item?.imageUrl} alt={item?.name}  />
                  <h6 className="pt-1">{item?.name}</h6>
                  </div>
                 )
                })}

            </Carousel>
    </div>
    </div>
  )
}

export default SStories
