import React, { useState } from "react";
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import SpeechToText from "@/Components/VoiceCommand/VoiceInput";

const IndustriesMob = ({data1, data2}: any) => {

    console.log("...........",data1, data2);

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
      const [rating, setRating] = useState(0);

      const ratingChanged = (newRating: any) => {
        setRating(newRating);
      };
  return (
    <div>

   

    
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
            <div className="text-center" >
            <img className="img-fluid height_width_landing_ind" src={data1?.imageUrl} alt={data1?.name}  />
            <h6 className="pt-1">Electiric</h6>
            </div>
        </Carousel>
        </div>
   
  );
};

export default IndustriesMob;
