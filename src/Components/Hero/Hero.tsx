import React, { useEffect, useRef, useState } from "react";
import Styles from "../../styles/Landingpagemodules/Hero.module.css";
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper";
import { FaMicrophoneAlt } from "react-icons/fa";
import SpeechToText from "../VoiceCommand/VoiceInput";
import HeroMob from "../LandingMobileSections/HeroMob";
import axios from "axios";
import { BiSearch } from "react-icons/bi";
import Link from "next/link";
import { getAllSectionsDetails } from "@/helper";
import { useRouter } from "next/router";
import { getOrderIdInLocalStorage, setServiceInLocalStorage } from "../helper";
import Typed from 'typed.js';
import Skeleton from '@mui/material/Skeleton';
import { RxCross2 } from "react-icons/rx";
import Dropdown from "react-bootstrap/Dropdown";


const Hero = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [jwtToken, setJwtToken] = useState<any>(null);
  const [allresponselanding, setLandingres] = useState<any>("");
  const [newdatasearch, setNewdatasearch] = useState<any>([])
  const [closedropdown, setClosedropdown] = useState<any>(false)
  const [openinputfield, setOpeninputfield] = useState<any>(true)
  const [isOpen12, setIsOpen12] = useState<any>(false);

  console.log("openinputfield", allresponselanding)

  // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setInputValue(e.target.value);
  // };

  useEffect(() => {
    setJwtToken(localStorage?.getItem("jwtToken"));
  }, [jwtToken]);

  const handlePostData = () => {
    fetchData();
    console.log("Posting data:", inputValue);
  };



  // useEffect(() => {
  //   setClosedropdown(false)
  // }, [inputValue.length === 0])

  console.log("closedropdown", closedropdown)


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
      setIsOpen12(true)


      // onDataReceived(response.data);

      // alert("record not foound");

      // Update your state or perform actions with the fetched data
    } catch (error) {
      // Handle errors
      setClosedropdown(false)
      // setIsOpen12(false)
      console.error("Fetch error:", error);

      // You can also update state or take other actions based on the error
    }
  };







  const handleInputKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handlePostData();
    }
  };



  // landing page api call -------------------------------------------------------------

  const apiCall = () => {
    getAllSectionsDetails()
      .then((res: any) => {
        setLandingres(res?.result?.sectionsDetails);

      })
      .catch((err: any) => alert(err));
  };

  console.log("landingnew--------------->", newdatasearch);
  useEffect(() => {
    apiCall();
  }, []);
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
        const number1: any = 1;
        localStorage.setItem("main_quantity", number1);
        router.push(`/Service/${response?.data?.result?.serviceDeposit?.url.length === 0 ? "undefined-Seo" : response?.data?.result?.serviceDeposit?.url}?service=${service.serviceSKU}`);
      } catch (error) {
        // Handle errors here
        // setError(error);
        console.error("error", error);
      }
    }

  }




  const inputElementRef = useRef<HTMLInputElement | null>(null);
  const typedInstanceRef = useRef<Typed | null>(null);

  useEffect(() => {
    const inputElement = inputElementRef.current;

    if (openinputfield && inputElement) {
      typedInstanceRef.current = new Typed(inputElement, {
        strings: ['Maths Tution', "GP Consultation", "Child Care", "Home Cleaning", "Music Tution", "Party Makeup"],
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


  useEffect(() => {
    if (inputValue.length === 0) {

      setClosedropdown(false)
      setIsOpen12(false)
    } else {
      fetchData();
      setClosedropdown(true)
      setIsOpen12(true)
    }

  }, [inputValue.length])



  console.log("new>", isOpen12)

  return (
    <div>
      <div className="on_pc_screeen new_screen_position">
        <div className=" col-md-12 pt-2  background_color_redd_landing_header ">
          <div className="row">
            <div className="col-md-3 col-3"></div>
            <div className="col-md-6 col-6">
              <div className="col-md-12 ">
                <div className="col-md-12  pt-0 pb-2">
                  {/* {openinputfield === false ? */}
                  {/* <div className="input-group shadow_new " onClick={()=>setOpeninputfield(false)}>
                    <input
                     ref={inputElementRef}
                      className="form-control input_left_tendon "
                      type="text"
                      id="myInput"
                      onChange={(e: any) => setInputValue(e.target.value)}
                    />
                    <div className="input-group-append p-1 right_tendon">
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
                          <BiSearch color="#FF0000" size={16.48} />
                        </button>
                      )}
                    </div>
                  </div>  */}

                  {/* {closedropdown === false ? null :
                    <div className={`col-md-12 bg-white ${newdatasearch.length > 5 ? "new_screen_position2" : "new_screen_position_auto"} mt-2 rounded py-2 px-4`}>

                      <>
                        {newdatasearch.length > 0 ? <>
                          {newdatasearch?.map((item: any, index: any) => {
                            return (
                              <div className="row universal_cursor" onClick={(e: any) => handlenextpage(item)}>
                                <div className="col-md-1 pe-0 ">
                                  <img className="img-fluid img_height_search rounded-circle" src={item?.serviceImage} />
                                </div>
                                <div className="col-md-11 m-auto pt-2">
                                  <p className="font_size_search">{item?.serviceName}</p>
                                </div>

                              </div>
                            )
                          })}
                        </> :
                          <p className="font_size_search">No Record Found..</p>
                        }
                      </>


                    </div>
                  } */}
                  {/* onToggle={() => setIsOpen12(!isOpen12)}  */}
                  {/* onClick={() => setIsOpen12(!isOpen12)} */}
                  <Dropdown show={isOpen12} onToggle={() => setIsOpen12(!isOpen12)}>
                    <Dropdown.Toggle variant="success" id="countrydrop111"   >
                      <div className="input-group shadow_new ">
                        <input
                          onClick={() => setOpeninputfield(false)}
                          ref={inputElementRef}
                          className="form-control input_left_tendon "
                          id="myInput"
                          type="text"
                          value={inputValue}
                          onChange={(e: any) => setInputValue(e.target.value)}
                        />
                        <div className="input-group-append p-1 right_tendon" onClick={() => setOpeninputfield(false)}>
                          {inputValue.length === 0 ? (
                            <SpeechToText
                              setInputValue={setInputValue}
                              isRecording={isRecording}
                              setIsRecording={setIsRecording}
                            />
                          ) : (
                            <button
                              className={Styles.VoiceSearchIconBg}
                              // onClick={fetchData}
                              onClick={() => setInputValue("")}
                            >
                              <RxCross2 color="#FF0000" size={16.48} />
                            </button>
                          )}
                        </div>
                      </div>
                    </Dropdown.Toggle>
                    <Dropdown.Menu className={`${newdatasearch.length < 9 ? "dropdown_sizeless": "dropdown_size1"} px-2 mt-2`} >
                      {/* For Countries ---------------------------------------------------------- */}
                      <div className="col-md-12 px-2">
                        <>
                          {newdatasearch.length > 0 ? <>
                            {newdatasearch?.map((item: any, index: any) => {
                              return (
                                <div className="d-flex universal_cursor" onClick={(e: any) => handlenextpage(item)}>
                                  <div className="">
                                    <img className="img-fluid img_height_search rounded-circle" src={item?.serviceImage} />
                                  </div>
                                  <div className=" ps-2 pt-2">
                                    <p className="font_size_search">{item?.serviceName}</p>
                                  </div>

                                </div>
                              )
                            })}
                          </> :
                            <p className="font_size_search">
                              {inputValue.length === 0 ? <>Please type in to search..</> : <>No record found</>}
                            </p>
                          }
                        </>
                      </div>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </div>
            </div>
            <div className="col-md-3 col-3"></div>
          </div>
          <div className="col-md-12 px-4">
            <Link href={"https://plexaar.com/"} target="_blank" className="style_a_tag11">
              <button className="btn btn-outline-light btn-sm rounded-pill px-3">Become an expert</button>
            </Link>
          </div>
        </div>
        <div className="col-md-12">
          {allresponselanding ?

            <Link href="https://play.google.com/store/apps/details?id=com.findanexpert&pli=1" target="_blank"> <img className="img-fluid" src={allresponselanding[0]?.imageUrl} /></Link>
            :
            <Skeleton variant="rectangular" style={{ width: "100%", height: "50vh" }} />

          }
        </div>
      </div>
      <div className="heromob">
        <HeroMob />
      </div>
      <div className="display_mob ">
        <div className="col-md-12">
          {allresponselanding ?

            <Link href="https://play.google.com/store/apps/details?id=com.findanexpert&pli=1" target="_blank"> <img className="img-fluid display_banner" src={allresponselanding[0]?.sectionnew[0]?.attachments[1]?.imageUrl} /> </Link>
            :
            <Skeleton variant="rectangular" style={{ width: "100%", height: "30vh" }} />
          }
        </div>
      </div>
    </div>
  );
};

export default Hero;
