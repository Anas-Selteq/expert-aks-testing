import React, { useState } from "react";
import Styles from "../styles/Landingpagemodules/Hero.module.css";
import ReactStars from "react-rating-stars-component";
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import SpeechToText from "@/Components/VoiceCommand/VoiceInput";

const Landingformob = () => {

  const [inputValue, setInputValue] = useState<string>('');
  const [isRecording, setIsRecording] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handlePostData = () => {
    // Perform the POST API call using Axios here with inputValue
    // axios.post('YOUR_API_ENDPOINT', { data: inputValue })
    //   .then(response => {
    //     // Handle the API response here
    //   })
    //   .catch(error => {
    //     // Handle errors here
    //   });
    console.log("Posting data:", inputValue);
  };

  const handleInputKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handlePostData();
    }
  };





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

      const responsivee = {
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

      const responsiveee = {
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
          items: 2,
        },
      };


      const responsiveeee = {
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
          items: 3,
        },
      };

      const [rating, setRating] = useState(0);

      const ratingChanged = (newRating: any) => {
        setRating(newRating);
      };
  return (
    <div className="main_landing_mob">

    {/* Hero Section for mobile ------------------------------------------------  */}
    <div className={Styles.heroSlidermob}>
      <Swiper
        spaceBetween={0}
        modules={[Autoplay, Pagination]}
        className="mySwiper"
        // pagination={{
        //   clickable: true,
        // }}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        speed={1200}
      >
        <SwiperSlide>
          <div className={Styles.heroSlider}>
            <img src="../imagess/landingformob/landingbanners.png" className="img-fluid" alt="Hero" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={Styles.heroSlider}>
              <img src="../imagess/landingformob/landingbanners.png" className="img-fluid" alt="Hero" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className={Styles.heroSlider}>
              <img src="../imagess/landingformob/landingbanners.png" className="img-fluid" alt="Hero" />
          </div>
        </SwiperSlide>
      </Swiper>
      <div className="col-md-12 position_set_mob_landing">
    <h6>Find1 the <strong>Service You Need</strong> Today!</h6>
    <div className="col-md-12 pt-2">
    <div className="input-group">
    <input
        className="form-control input_left_tendon"
        type="text"
        placeholder="Search here...."
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyPress}
    />
    <div className="input-group-append p-1 right_tendon">
    <SpeechToText
               setInputValue={setInputValue}
               isRecording={isRecording}
               setIsRecording={setIsRecording}
              />
    </div>
    </div>

    </div>
    <div className="col-md-12 text-center pt-4">
        <h1 className="big_heading"><strong><b>Big Offers</b></strong></h1>
        <h2 className="mt-2">
                <strong>Get discount on<br/>
            many Services Everyday!</strong>     
        </h2>
    </div>
    <div className="col-md-12 text-center margin_top_buttton">
        <button className="btn btn-danger px-4 py-2 color_button_mob_landing"> <img className="img-fluid" src="/imagess/landingformob/mobile.png" /> Get the App </button>
    </div>
    </div>
    </div>

    {/* Industries Section For mobile ------------------------------------------  */}
    <div className="col-md-12 px-3 pt-4 pb-3">
        <h2>Industries</h2>
        <div className="col-md-12 mt-3">
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
            <div className="text-center">
            <img className="img-fluid height_width_landing_ind" src="../imagess/landingformob/ind1.png" />
            <h6 className="pt-1">Electiric</h6>
            </div>
            <div className="text-center">
            <img className="img-fluid height_width_landing_ind" src="../imagess/landingformob/ind1.png" />
            <h6 className="pt-1">Electiric</h6>
            </div>
            <div className="text-center">
            <img className="img-fluid height_width_landing_ind" src="../imagess/landingformob/ind1.png" />
            <h6 className="pt-1">Electiric</h6>
            </div>
            <div className="text-center">
            <img className="img-fluid height_width_landing_ind" src="../imagess/landingformob/ind1.png" />
            <h6 className="pt-1">Electiric</h6>
            </div>
            <div className="text-center">
            <img className="img-fluid height_width_landing_ind" src="../imagess/landingformob/ind1.png" />
            <h6 className="pt-1">Electiric</h6>
            </div>
        </Carousel>
        </div>
    </div>

    {/* Trending section  */}
    <div className="col-md-12 px-3 pt-3 pb-3">
    <h2>Trending</h2>
    <div className="col-md-12 mt-3">
    <Carousel
        responsive={responsivee}
        draggable={true}
        removeArrowOnDeviceType={[
          "tablet",
          "mobile",
          "desktop",
          "superLargeDesktop",
        ]}
      >
        
            <div >
            <div className="col-md-12 bg_card_ground px-2 ">
             <img className="img-fluid w-100 img_rad" src="/imagess/electric.png" />
            </div>
            <div className="col-md-12 px-2 margin_top_negg">
            <div className="bg_set_new px-2">
            <p className="m-0 p-0">Electric</p>
                <p className="m-0 pt-1 pb-2 description_of_card">
                  We provide an extensive range of electrical services like
                  installation, repairs & maintenance, to make sure your house is
                  electrically insulated & safe.
                </p>
            </div>
            </div>
          </div>
      
    </Carousel>
    </div>
    </div>


    {/* banner 1 offers   */}
    <div className="col-md-12 px-3 pt-3 pb-3">
    <h2>Just For You</h2>
    <img className="img-fluid" src="/imagess/landingformob/b1.png" />
    </div>

     {/* Trending section  */}
     <div className="col-md-12 px-3 pt-3 pb-3">
    <h2>Cleaner</h2>
    <div className="col-md-12 mt-3">
    <Carousel
        responsive={responsiveee}
        draggable={true}
        removeArrowOnDeviceType={[
          "tablet",
          "mobile",
          "desktop",
          "superLargeDesktop",
        ]}
      >
        <div className="px-2">
          <div className="card_width_further">
            <div className=" bottom_card_inf11">
              <div className="text-end ">
                {/* <i className="fas fa-arrow-right"></i> */}
                <ReactStars
                  count={1}
                  onChange={ratingChanged}
                  size={24}
                  activeColor="#ffd700"
                  value={rating} // Pass the current rating as the value
                />
              </div>
            </div>
          </div>
          <p className="m-0  card_heading_text pt-3 pb-2">HOME CLEANING</p>
          <p className="m-0  card_heading_text2">Including Kitchen</p>
          <p className="m-0 pt-2">
            <span className="text_50">50$</span>
            <span className="text_15 px-1">15%</span>
            <span className="text_15">OFF</span>
          </p>
        </div>

        <div className="px-2">
          <div className="card_width_further">
            <div className=" bottom_card_inf11">
              <div className="text-end ">
                {/* <i className="fas fa-arrow-right"></i> */}
                <ReactStars
                  count={1}
                  onChange={ratingChanged}
                  size={24}
                  activeColor="#ffd700"
                  value={rating} // Pass the current rating as the value
                />
              </div>
            </div>
          </div>
          <p className="m-0  card_heading_text pt-3 pb-2">HOME CLEANING</p>
          <p className="m-0  card_heading_text2">Including Kitchen</p>
          <p className="m-0 pt-2">
            <span className="text_50">50$</span>
            <span className="text_15 px-1">15%</span>
            <span className="text_15">OFF</span>
          </p>
        </div>

        <div className="px-2">
          <div className="card_width_further">
            <div className=" bottom_card_inf11">
              <div className="text-end ">
                {/* <i className="fas fa-arrow-right"></i> */}
                <ReactStars
                  count={1}
                  onChange={ratingChanged}
                  size={24}
                  activeColor="#ffd700"
                  value={rating} // Pass the current rating as the value
                />
              </div>
            </div>
          </div>
          <p className="m-0  card_heading_text pt-3 pb-2">HOME CLEANING</p>
          <p className="m-0  card_heading_text2">Including Kitchen</p>
          <p className="m-0 pt-2">
            <span className="text_50">50$</span>
            <span className="text_15 px-1">15%</span>
            <span className="text_15">OFF</span>
          </p>
        </div>
      
    </Carousel>
    </div>
    <div className="col-md-12 mt-3">
    <Carousel
        responsive={responsiveee}
        draggable={true}
        removeArrowOnDeviceType={[
          "tablet",
          "mobile",
          "desktop",
          "superLargeDesktop",
        ]}
      >
        <div className="px-2">
          <div className="card_width_further">
            <div className=" bottom_card_inf11">
              <div className="text-end ">
                {/* <i className="fas fa-arrow-right"></i> */}
                <ReactStars
                  count={1}
                  onChange={ratingChanged}
                  size={24}
                  activeColor="#ffd700"
                  value={rating} // Pass the current rating as the value
                />
              </div>
            </div>
          </div>
          <p className="m-0  card_heading_text pt-3 pb-2">HOME CLEANING</p>
          <p className="m-0  card_heading_text2">Including Kitchen</p>
          <p className="m-0 pt-2">
            <span className="text_50">50$</span>
            <span className="text_15 px-1">15%</span>
            <span className="text_15">OFF</span>
          </p>
        </div>

        <div className="px-2">
          <div className="card_width_further">
            <div className=" bottom_card_inf11">
              <div className="text-end ">
                {/* <i className="fas fa-arrow-right"></i> */}
                <ReactStars
                  count={1}
                  onChange={ratingChanged}
                  size={24}
                  activeColor="#ffd700"
                  value={rating} // Pass the current rating as the value
                />
              </div>
            </div>
          </div>
          <p className="m-0  card_heading_text pt-3 pb-2">HOME CLEANING</p>
          <p className="m-0  card_heading_text2">Including Kitchen</p>
          <p className="m-0 pt-2">
            <span className="text_50">50$</span>
            <span className="text_15 px-1">15%</span>
            <span className="text_15">OFF</span>
          </p>
        </div>

        <div className="px-2">
          <div className="card_width_further">
            <div className=" bottom_card_inf11">
              <div className="text-end ">
                {/* <i className="fas fa-arrow-right"></i> */}
                <ReactStars
                  count={1}
                  onChange={ratingChanged}
                  size={24}
                  activeColor="#ffd700"
                  value={rating} // Pass the current rating as the value
                />
              </div>
            </div>
          </div>
          <p className="m-0  card_heading_text pt-3 pb-2">HOME CLEANING</p>
          <p className="m-0  card_heading_text2">Including Kitchen</p>
          <p className="m-0 pt-2">
            <span className="text_50">50$</span>
            <span className="text_15 px-1">15%</span>
            <span className="text_15">OFF</span>
          </p>
        </div>
      
    </Carousel>
    </div>
    </div>

     {/* banner 1 offers   */}
     <div className="col-md-12 px-3 pt-3 pb-3">
     <h2>Products for You</h2>
    <img className="img-fluid mt-3" src="/imagess/landingformob/b2.png" />
    </div>

     {/* Trending section  */}
     <div className="col-md-12 px-3 pt-3 pb-3">
    <h2>Cleaner</h2>
    <div className="col-md-12 mt-3">
    <Carousel
        responsive={responsiveeee}
        draggable={true}
        removeArrowOnDeviceType={[
          "tablet",
          "mobile",
          "desktop",
          "superLargeDesktop",
        ]}
      >
        <div className="px-2">
          <div className="card_width_further1">
            <div className=" bottom_card_inf11">
              <div className="text-end ">
                {/* <i className="fas fa-arrow-right"></i> */}
                <ReactStars
                  count={1}
                  onChange={ratingChanged}
                  size={24}
                  activeColor="#ffd700"
                  value={rating} // Pass the current rating as the value
                />
              </div>
            </div>
          </div>
          <p className="m-0  card_heading_text pt-3 pb-2">HOME CLEANING</p>
          <p className="m-0  card_heading_text2">Including Kitchen</p>
          <p className="m-0 pt-2">
            <span className="text_50">50$</span>
            <span className="text_15 px-1">15%</span>
            <span className="text_15">OFF</span>
          </p>
        </div>

        <div className="px-2">
          <div className="card_width_further1">
            <div className=" bottom_card_inf11">
              <div className="text-end ">
                {/* <i className="fas fa-arrow-right"></i> */}
                <ReactStars
                  count={1}
                  onChange={ratingChanged}
                  size={24}
                  activeColor="#ffd700"
                  value={rating} // Pass the current rating as the value
                />
              </div>
            </div>
          </div>
          <p className="m-0  card_heading_text pt-3 pb-2">HOME CLEANING</p>
          <p className="m-0  card_heading_text2">Including Kitchen</p>
          <p className="m-0 pt-2">
            <span className="text_50">50$</span>
            <span className="text_15 px-1">15%</span>
            <span className="text_15">OFF</span>
          </p>
        </div>

        <div className="px-2">
          <div className="card_width_further1">
            <div className=" bottom_card_inf11">
              <div className="text-end ">
                {/* <i className="fas fa-arrow-right"></i> */}
                <ReactStars
                  count={1}
                  onChange={ratingChanged}
                  size={24}
                  activeColor="#ffd700"
                  value={rating} // Pass the current rating as the value
                />
              </div>
            </div>
          </div>
          <p className="m-0  card_heading_text pt-3 pb-2">HOME CLEANING</p>
          <p className="m-0  card_heading_text2">Including Kitchen</p>
          <p className="m-0 pt-2">
            <span className="text_50">50$</span>
            <span className="text_15 px-1">15%</span>
            <span className="text_15">OFF</span>
          </p>
        </div>

        <div className="px-2">
          <div className="card_width_further1">
            <div className=" bottom_card_inf11">
              <div className="text-end ">
                {/* <i className="fas fa-arrow-right"></i> */}
                <ReactStars
                  count={1}
                  onChange={ratingChanged}
                  size={24}
                  activeColor="#ffd700"
                  value={rating} // Pass the current rating as the value
                />
              </div>
            </div>
          </div>
          <p className="m-0  card_heading_text pt-3 pb-2">HOME CLEANING</p>
          <p className="m-0  card_heading_text2">Including Kitchen</p>
          <p className="m-0 pt-2">
            <span className="text_50">50$</span>
            <span className="text_15 px-1">15%</span>
            <span className="text_15">OFF</span>
          </p>
        </div>
      
    </Carousel>
    </div>
   
    </div>

   
   
 </div>
  );
};

export default Landingformob;
