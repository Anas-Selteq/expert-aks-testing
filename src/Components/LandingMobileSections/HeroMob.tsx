import React, { useEffect, useRef, useState } from "react";
import Styles from "../../styles/Landingpagemodules/Hero.module.css";
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper";
import "react-multi-carousel/lib/styles.css";
import SpeechToText from "@/Components/VoiceCommand/VoiceInput";
import Link from "next/link";
import axios from "axios";
import { BiSearch } from "react-icons/bi";
import { getOrderIdInLocalStorage, setServiceInLocalStorage } from "../helper";
import { useRouter } from "next/router";
import Typed from 'typed.js';

const HeroMob = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [jwtToken, setJwtToken] = useState<any>(null);
  const [newdatasearch, setNewdatasearch] = useState<any>([])
  const [closedropdown, setClosedropdown] = useState<any>(false)
  const [openinputfield, setOpeninputfield] = useState<any>(true)

  console.log("openinputfield", openinputfield)

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
    if (e.key === "Enter") {
      // handlePostData();
      fetchData();
    }
  };

  useEffect(() => {
    setJwtToken(localStorage?.getItem("jwtToken"));
  }, [jwtToken]);

  useEffect(() => {
    if (inputValue.length > 0) {
      fetchData();
      setClosedropdown(true)
    } else {
      setClosedropdown(false)
    }

  }, [inputValue.length])

  useEffect(() => {
    setClosedropdown(false)
  }, [inputValue.length === 0])

  //  Search data api -------------------------------------------------------------------------------------------------------
  const fetchData = async () => {
    const isToken = jwtToken !== null;

    const headers = {
      "Content-Type": "application/json", // Update the content type if needed
    };

    try {
      const response = await axios.get(
        // `https://gateway.findanexpert.net/homepage_svc/pb/Sections/searchSectionsByServiceName?countryId=1&searchService=${inputValue}&isMobile=false`
        `https://gateway.findanexpert.net/homepage_svc/pb/Services/searchServices?text=${inputValue}&countryId=1&isMobile=false`
      );

      // Handle the response as needed
      console.log("Fetch successful:", response);
      setNewdatasearch(response.data?.result?.services)


      // onDataReceived(response.data);

      // alert("record not foound");

      // Update your state or perform actions with the fetched data
    } catch (error) {
      // Handle errors
      setClosedropdown(false)
      console.error("Fetch error:", error);

      // You can also update state or take other actions based on the error
    }
  };

  const router = useRouter();
  const handlenextpage = async (service: any) => {
    localStorage.setItem("selectedService", JSON.stringify(service));
    // router.push(`/Service/${item?.serviceUrl.length > 0 ? item?.serviceUrl : "undefined-Seo"}?service=${item.serviceSKU}`);
    if (service.hasChild === true) {
      // Redirect to child services page
      router.push(`/services/${service.serviceId}`);
    } else {
      const orderId = getOrderIdInLocalStorage();
      if (!orderId) {
        setServiceInLocalStorage(service);
        // alert("i am setted")
      }
      const isToken = jwtToken !== null;
      const headers = {
        Authorization: isToken ? `Bearer ${jwtToken}` : undefined,
        "Content-Type": "application/json",
      };

      try {
        const response = await axios.get(
          `https://gateway.findanexpert.net/serviceinventory_svc/pb/Service/GetServiceSEO?serviceSKU=${service?.serviceSKU}`,
          { headers }
        );

        // Handle the response data here
        console.log("SEO page api data", response?.data?.result?.serviceDeposit);

        // Update state or do something else with the data if needed
        // setData(response.data?.result?.outPutSectionModels);

        // Redirect to the service detail page
        router.push(`/Service/${response?.data?.result?.serviceDeposit?.url.length === 0 ? "undefined-Seo" : response?.data?.result?.serviceDeposit?.url}?service=${service.serviceSKU}`);
      } catch (error) {
        // Handle errors here
        // setError(error);
        console.error("error", error);
      }
    }

  }



  const [rating, setRating] = useState(0);

  const ratingChanged = (newRating: any) => {
    setRating(newRating);
  };

  const inputElementRef = useRef<HTMLInputElement | null>(null);
  const typedInstanceRef = useRef<Typed | null>(null);

  useEffect(() => {
    const inputElement = inputElementRef.current;

    if (openinputfield && inputElement) {
      typedInstanceRef.current = new Typed(inputElement, {
        strings: ['Maths Tution', 'GP Consultation', 'Child Care', 'Home Cleaning','Music Tution','Party Makeup'],
        typeSpeed: 150,
        backSpeed: 30,
        backDelay: 3000,
        startDelay: 100, // Add a delay before animation starts
        loop: true,
      });
    }

    return () => {
      if (typedInstanceRef.current) {
        typedInstanceRef.current.destroy();
      }
    };
  }, [openinputfield]);


  return (
    <div>
      {/* Hero Section for mobile ------------------------------------------------  */}
      <div className="col-md-12 background_mobile_header">

        <div className="col-md-12 position_set_mob_landing">

          <div className="col-md-12 pb-4">
            <div className="input-group">
              <input
                className="form-control input_left_tendon"
                type="text"
                // placeholder="Search “Any service, Any time , Anywhere”"
                // value={inputValue}
                // onChange={handleInputChange}
                id="myInput"
                onClick={() => setOpeninputfield(false)}
                ref={inputElementRef}
                value={inputValue}
                onChange={(e: any) => setInputValue(e.target.value)}
                onKeyDown={handleInputKeyPress}
              />
              <div className="input-group-append p-1 right_tendon" onClick={() => setOpeninputfield(false)}>
                {/* <SpeechToText
                  setInputValue={setInputValue}
                  isRecording={isRecording}
                  setIsRecording={setIsRecording}
                /> */}
                {inputValue.length === 0 ? (
                  <SpeechToText
                    setInputValue={setInputValue}
                    isRecording={isRecording}
                    setIsRecording={setIsRecording}
                  />
                ) : (
                  <button
                    className={Styles.VoiceSearchIconBg}
                    onClick={fetchData}
                  >
                    <BiSearch color="white" size={16.48} />
                  </button>
                )}
              </div>
            </div>
            {closedropdown === false ? null :
              <div className="col-md-12 bg-white new_screen_position2 mt-2 rounded py-2 px-4">

                <>
                  {newdatasearch.length > 0 ? <>
                    {newdatasearch?.map((item: any, index: any) => {
                      return (
                        <div className="row" onClick={(e: any) => handlenextpage(item)}>
                          <div className="col-md-2 col-1 pe-0 ">
                            <img className="img-fluid img_height_search rounded-circle" src={item?.serviceImage} />
                          </div>
                          <div className="col-md-10 col-11 m-auto pt-2">
                            <p className="font_size_search">{item?.serviceName}</p>
                          </div>


                        </div>
                      )
                    })}
                  </> :
                    <p className="font_size_search">No Record Found</p>
                  }
                </>


              </div>
            }
          </div>

          {/* <div className="col-md-12 pb-2">
            <img className="img-fluid" src="/imagess/locc.png" /><span className="px-2 font_london">London, UK</span>
          </div> */}

        </div>
      </div>
    </div>
  );
};

export default HeroMob;
