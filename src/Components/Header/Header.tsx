import { Logo, StyledHeader } from "@/styles/Header.styled";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { AUTH_ACTIONS } from "@/Redux/Actions/loginPageAction";
import { removeCookie } from "@/utils/utils";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import Layout3 from "../Layoutforheader/Layoutforheader";
import axios from "axios";
import { getOrderIdInLocalStorage, setServiceInLocalStorage } from "../helper";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import SpeechToText from "../VoiceCommand/VoiceInput";
import Styles from "../../styles/Landingpagemodules/Hero.module.css";
import { RxCross2 } from "react-icons/rx";
import { SlOptionsVertical } from "react-icons/sl";

export default function Header(props: any) {
  const [tabbar1, settabbar1] = useState(false);
  const { profile } = useSelector((state: any) => state);
  const [notificationpannel, setNotoficationpannel] = useState<any>(false);
  const [notifications, setNotifications] = useState<any>([]);
  const [informationpannel, setInformationpannel] = useState<any>(true);
  const [allCountries, setAllCountries] = useState<any>([]);
  const [jwtToken, setJwtToken] = useState<any>(null);
  const [dataa, setData] = useState<any>("");
  const [inputValue, setInputValue] = useState<string>("");
  const [closedropdown, setClosedropdown] = useState<any>(false);
  const [newdatasearch, setNewdatasearch] = useState<any>([]);
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [isOpennn11, setIsOpennn11] = useState(false);
  const [isOpen12, setIsOpen12] = useState<any>(false);
  const [isOpennew, setIsOpennew] = useState<any>("");
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [isOpen13, setIsOpen13] = useState<any>(false);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const [isOpenCountry, setIsOpenCountry] = useState<any>(0);
  const router = useRouter();

  console.log("profileee", profile);

  // user profile fetch ----------------------------------------------------------------------------

  // useEffect(() => {
  //   console.log("profile?.userId", profile?.userId)
  //   fetchData();
  // }, [profile?.userId]);

  // const fetchData = async () => {
  //   const isToken = jwtToken !== null;
  //   const headers = {
  //     Authorization: isToken ? `Bearer ${jwtToken}` : undefined,
  //     "Content-Type": "application/json",
  //   };
  //   try {
  //     const response = await axios.get(
  //       `https://gateway.findanexpert.net/signup_svc/pv/users/getUserById?id=${profile?.userId}`,
  //       { headers }
  //     );
  //     dispatch({
  //       type: AUTH_ACTIONS.LOGIN_SUCCESS,
  //       payload: response.data?.result?.user,
  //     });
  //   } catch (error) {
  //   }
  // };

  // profile fetch api ends ------------------------------------------------------------------------

  // useEffect(() => {
  //   const countryName = localStorage.getItem("countryName");
  //   const countrycondition = countryName? countryName : "Select Country" ;
  //   setIsOpennew(countrycondition)
  // }, []);

  const [isOpenCountryName, setIsOpenCountryName] = useState<any>(
    "United Kingdom"
  );
  const [isOpenCountryImg, setIsOpenCountryImg] = useState<any>(
    "https://1864597015.rsc.cdn77.org/consentformattachments/images/staging/img_1_2023_09_12_10_51_23.png"
  );

  useEffect(() => {
    const countryName = localStorage.getItem("countryName");
    const countryImg = localStorage.getItem("countryImg");
    if (countryName) {
      setIsOpenCountryName(countryName);
    }
    if (countryImg) {
      setIsOpenCountryImg(countryImg);
    }
  }, []);

  useEffect(() => {
    const handleRouteChange = () => {
      // Clear the input value when navigating away
      setInputValue("");
    };

    // Listen for the route change event
    router.events.on("beforeHistoryChange", handleRouteChange);

    // Remove the event listener when the component is unmounted
    return () => {
      router.events.off("beforeHistoryChange", handleRouteChange);
    };
  }, [router.events]);

  const handleInputChange = (e: any) => {
    setInputValue(e.target.value);
  };

  const countryselected = (item: any) => {
    setIsOpenCountryName(item?.name);
    setIsOpenCountryImg(item?.countryFlagImage);
    localStorage.setItem("countryName", item?.name);
    localStorage.setItem("countryImg", item?.countryFlagImage);
  };

  const [show, setShow] = useState(false);

  const handleClose1 = () => setShow(false);
  const handleShow1 = () => setShow(true);

  const [expandnew, setExpandnew] = useState<any>(false);

  const togglemenu = () => {
    setExpandnew(!expandnew);
  };

  console.log("opennnnn", isOpennn11);

  console.log(props);

  const currentURL = router.asPath;
  const endURL = currentURL.split("/").pop();
  console.log("sdsdsdsdsdsd", endURL);
  const dispatch = useDispatch();
  const tabbarone = () => {
    settabbar1(!tabbar1);
  };
  const opennotification = () => {
    setNotoficationpannel(!notificationpannel);
    setInformationpannel(true);
  };
  const openinformationpannel = () => {
    setInformationpannel(!informationpannel);
    setNotoficationpannel(false);
  };

  const buttonclick = () => {
    setInformationpannel(true);
    setNotoficationpannel(false);
  };

  useEffect(() => {
    if (inputValue.length > 0) {
      fetchDataaSearch();
      setClosedropdown(true);
      setIsOpen13(true);
    } else {
      setClosedropdown(false);
      setIsOpen13(false);
    }
  }, [inputValue.length]);

  useEffect(() => {
    setClosedropdown(false);
    setIsOpen13(false);
  }, [inputValue.length === 0]);

  //  Search data api -------------------------------------------------------------------------------------------------------
  const fetchDataaSearch = async () => {
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
      setNewdatasearch(response.data?.result?.services);

      // onDataReceived(response.data);

      // alert("record not foound");

      // Update your state or perform actions with the fetched data
    } catch (error) {
      // Handle errors
      setClosedropdown(false);
      setIsOpen13(false);
      console.error("Fetch error:", error);

      // You can also update state or take other actions based on the error
    }
  };

  // Seo api implemented ------------------------------------------------------------------------------------------------------------
  const handlenextpage = async (service: any) => {
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
        console.log(
          "SEO page api data",
          response?.data?.result?.serviceDeposit
        );
        setClosedropdown(false);
        setIsOpen13(false);

        // Update state or do something else with the data if needed
        // setData(response.data?.result?.outPutSectionModels);

        // Redirect to the service detail page
        const number1: any = 1;
        localStorage.setItem("main_quantity", number1);
        router.push(
          `/Service/${response?.data?.result?.serviceDeposit?.url.length === 0
            ? "undefined-Seo"
            : response?.data?.result?.serviceDeposit?.url
          }?service=${service.serviceSKU}`
        );
      } catch (error) {
        // Handle errors here
        // setError(error);
        console.error("error", error);
      }
    }
  };

  useEffect(() => {
    setJwtToken(localStorage?.getItem("jwtToken"));
  }, []);

  useEffect(() => {
    getallcountries();
  }, []);

  const getallcountries = async () => {
    const isToken = jwtToken !== null;

    const headers = {
      // Authorization: isToken ? `Bearer ${jwtToken}` : undefined,
      "Content-Type": "application/json", // Update the content type if needed
      // withCredentials: true,
    };

    try {
      const response = await axios.get(
        `https://gateway.findanexpert.net/signup_svc/pb/country/getCountry`,
        { headers }
      );

      // Handle the response as needed
      console.log("all countries", response.data);
      setAllCountries(response.data.result);
      setFilteredCountries(response.data.result);
      // Update your state or perform actions with the fetched data
    } catch (error) {
      // Handle errors
      console.error("Fetch error:", error);

      // You can also update state or take other actions based on the error
    }
  };

  const currentEndpointt = router.pathname;

  const targetEndpointlogin = "/auth/signup";

  const [selectedflag, setSelectedflag] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const isToken = jwtToken !== null;

      const headers = {
        Authorization: isToken ? `Bearer ${jwtToken}` : undefined,
        "Content-Type": "application/json", // Update the content type if needed
      };

      try {
        const response = await axios.get(
          `https://gateway.findanexpert.net/notification_svc/pv/get/all?page=3&limit=20&userId=${props.profile.userId}&sort=createdAt:-1`
        );

        // Handle the response as needed
        console.log("Fetch successful:", response.data.result);
        setNotifications(response.data.result);
        getallcountries();
        // Update your state or perform actions with the fetched data
      } catch (error) {
        // Handle errors
        console.error("Fetch error:", error);
        getallcountries();
        // You can also update state or take other actions based on the error
      }
    };
    fetchData();
  }, [jwtToken]);

  const navigateToUserProfile = () => {
    setIsOpennn11(false); // Close the Dropdown
    router.push("/userProfile/profile"); // Navigate to the specified route
  };

  const navigateToUserProfile1 = () => {
    setIsOpennn11(false); // Close the Dropdown
    router.push("/userProfile/profile/ProfileUserView"); // Navigate to the specified route
  };

  const navigateToUsersetting = () => {
    setIsOpennn11(false); // Close the Dropdown
    router.push("/userProfile/profile"); // Navigate to the specified route
  };

  const navigateToUserAddress = () => {
    setIsOpennn11(false); // Close the Dropdown
    settabbar1(false);
    router.push("/userProfile/addressshow/addressshow"); // Navigate to the specified route
  };
  const navigateToUserAllbookings = () => {
    setIsOpennn11(false); // Close the Dropdown
    settabbar1(false);
    router.push("/AllBookingsNew"); // Navigate to the specified route
  };
  const navigateToUsersettings = () => {
    setIsOpennn11(false); // Close the Dropdown
    settabbar1(false);
    router.push("/userProfile/settings"); // Navigate to the specified route
  };

  const navigateToUserPayments = () => {
    setIsOpennn11(false); // Close the Dropdown
    settabbar1(false);
    router.push("/userProfile/payment"); // Navigate to the specified route
  };

  const navigateToUserReferral = () => {
    setIsOpennn11(false); // Close the Dropdown
    settabbar1(false);
    router.push("/Referral"); // Navigate to the specified route
  };
  const navigateToUserChat = () => {
    setIsOpennn11(false); // Close the Dropdown
    settabbar1(false);
    router.push("/Chat"); // Navigate to the specified route
  };

  const navigateToUserReferralHeader = () => {
    router.push("/Referral"); // Navigate to the specified route
    setIsOpennn11(false); // Close the Dropdown
    settabbar1(false);
  };

  const navigateToUserVouchers = () => {
    router.push("/AllVouchers/Voucherslist");
    setIsOpennn11(false); // Close the Dropdown
    settabbar1(false);
  };

  console.log("vv", isOpenCountry);

  const logoutconfirmation = () => {
    const userConfirmed = window.confirm("Are you sure you want to proceed?");
    if (userConfirmed) {
      dispatch({ type: AUTH_ACTIONS.LOGOUT });
      removeCookie && removeCookie("profile");
      localStorage.removeItem("jwtToken");
      localStorage.removeItem("jwtRefreshToken");
      localStorage.clear();
      setIsOpennn11(false);
      router.push("/").then(() => window.location.reload());
    } else {
      console.log("");
    }
  };

  const handleSearch = (query: any) => {
    setSearchQuery(query);
    // Filter countries based on search query
    const filtered = allCountries.filter(country =>
      country.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredCountries(filtered);
  };

  return (
    <Layout3>
      <div>
        {/* new navigation for pc updated  */}
        <div className="col-md-12 background_color_navigation_two display_none_on_mobile py-3">
          <div className="col-md-12 px-4">
            <div className="row">
              <div className="col-md-9 col-6">
                <div className="row">
                  <div className="col-md-2 col-3">
                    {endURL === "" ? (
                      <Link href="/">
                        <img
                          className="img-fluid width_ll"
                          src="/imagess/expertlll.png"
                        />
                      </Link>
                    ) : (
                      <Link href="/">
                        <img
                          className="img-fluid width_ll"
                          src="/imagess/expertlll.png"
                        />
                      </Link>
                    )}
                  </div>
                  {endURL === "" ? (
                    <div className="col-md-10 ps-4 col-9 m-auto">
                      {endURL === "" ? (
                        <div className="row">
                          <div className="col-md-2 "></div>
                          <div className="col-md-10">
                            <div className="row">
                              <div className="col-md-6 ps-3 pt-2">
                                <p className="sloganTextmain ps-2 ">
                                  Find the{" "}
                                  <span className="sloganBold">
                                    Service You Need
                                  </span>{" "}
                                  Today!
                                </p>
                              </div>
                              <div className="col-md-5 text-end">
                                {/* <p className="m-0 pt-2 color_of_becoming">
                                  <Link href={"https://plexaar.com/"} target="_blank" className="style_a_tag11">
                                    Become an expert
                                  </Link>
                                </p> */}
                              </div>
                              <div className="col-md-1 text-end">
                                {/* <Link href={"/Referral"} className="style_a_tag11">
                                  <p className="m-0 pt-2 color_of_becoming">

                                    Referral

                                  </p>
                                </Link> */}
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <>
                          {currentEndpointt !== targetEndpointlogin ? (
                            <>
                              <input
                                className="form-control form-control-sm input_width12"
                                placeholder="Search..."
                                value={inputValue}
                                // onChange={(e: any) => setInputValue(e.target.value)}
                                onChange={handleInputChange}
                              />
                              {closedropdown === false ? null : (
                                <div className="col-md-12 bg-white new_screen_position3 mt-2 rounded py-2 px-4">
                                  <>
                                    {newdatasearch.length > 0 ? (
                                      <>
                                        {newdatasearch?.map(
                                          (item: any, index: any) => {
                                            return (
                                              <div
                                                className="row universal_cursor"
                                                onClick={(e: any) =>
                                                  handlenextpage(item)
                                                }
                                              >
                                                <div className="col-md-6 m-auto pt-2">
                                                  <p className="font_size_search">
                                                    {item?.serviceName}
                                                  </p>
                                                </div>
                                                <div className="col-md-6 text-end">
                                                  <img
                                                    className="img-fluid img_height_search rounded"
                                                    src={item?.serviceImage}
                                                  />
                                                </div>
                                              </div>
                                            );
                                          }
                                        )}
                                      </>
                                    ) : (
                                      <p className="font_size_search">
                                        No Record Found
                                      </p>
                                    )}
                                  </>
                                </div>
                              )}
                            </>
                          ) : null}
                        </>
                      )}
                    </div>
                  ) : (
                    <>
                      <div className="col-md-5 ps-4 col-9 m-auto">
                        {endURL === "" ? (
                          <div className="row">
                            <div className="col-md-2 "></div>
                            <div className="col-md-10">
                              <div className="row">
                                <div className="col-md-6 ps-4 pt-2">
                                  <p className="sloganTextmain ps-2 ">
                                    Find the{" "}
                                    <span className="sloganBold">
                                      Service You Need
                                    </span>{" "}
                                    Today!
                                  </p>
                                </div>
                                <div className="col-md-6 text-end">
                                  <p className="m-0 pt-2 color_of_becoming">
                                    <Link
                                      href={"https://plexaar.com/"}
                                      target="_blank"
                                      className="style_a_tag11"
                                    >
                                      Become an expert
                                    </Link>
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <>
                            {/* {currentEndpointt !== targetEndpointlogin ? <>


                              {closedropdown === false ? null :
                                <div className="col-md-12 bg-white new_screen_position3 mt-2 rounded py-2 px-4">




                                </div>
                              }
                            </> : null} */}
                            <Dropdown
                              show={isOpen13}
                              onToggle={() => setIsOpen13(!isOpen13)}
                            >
                              <Dropdown.Toggle
                                variant="success"
                                id="countrydrop111"
                              >
                                <div className="input-group shadow_new ">
                                  <input
                                    className="form-control form-control-sm input_left_tendon1"
                                    placeholder="Search..."
                                    value={inputValue}
                                    autoComplete="off"
                                    // onChange={(e: any) => setInputValue(e.target.value)}
                                    onChange={handleInputChange}
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
                                        // onClick={fetchData}
                                        onClick={() => setInputValue("")}
                                      >
                                        <RxCross2
                                          color="#FF0000"
                                          size={16.48}
                                        />
                                      </button>
                                    )}
                                  </div>
                                </div>
                              </Dropdown.Toggle>
                              <Dropdown.Menu className="dropdown_size1 px-2 mt-2">
                                {/* For Countries ---------------------------------------------------------- */}
                                <div className="col-md-12 px-2">
                                  <>
                                    {/* {newdatasearch.length > 0 ? <>
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
                                    } */}
                                    <>
                                      {newdatasearch.length > 0 ? (
                                        <>
                                          {newdatasearch?.map(
                                            (item: any, index: any) => {
                                              return (
                                                <div
                                                  className="row universal_cursor"
                                                  onClick={(e: any) =>
                                                    handlenextpage(item)
                                                  }
                                                >
                                                  <div className="col-md-6 m-auto pt-2">
                                                    <p className="font_size_search">
                                                      {item?.serviceName}
                                                    </p>
                                                  </div>
                                                  <div className="col-md-6 text-end">
                                                    <img
                                                      className="img-fluid img_height_search rounded"
                                                      src={item?.serviceImage}
                                                    />
                                                  </div>
                                                </div>
                                              );
                                            }
                                          )}
                                        </>
                                      ) : (
                                        <p className="font_size_search">
                                          No Record Found
                                        </p>
                                      )}
                                    </>
                                  </>
                                </div>
                              </Dropdown.Menu>
                            </Dropdown>
                          </>
                        )}
                      </div>
                      <div className="col-md-5 pt-2 m-auto">
                        <div className="row">
                          <div className="col-md-4 ">
                            <Link
                              href={"https://plexaar.com/"}
                              target="_blank"
                              className="style_a_tag11"
                            >
                              <p className="header1_expert m-0 p-0 universal_cursor ">
                                Become an Expert
                              </p>
                            </Link>
                          </div>
                          <div className="col-md-2">
                            <p className="header1_expert m-0 p-0 universal_cursor">
                              Help
                            </p>
                          </div>
                          <div className="col-md-6">
                            <p
                              className="header1_expert m-0 p-0 universal_cursor"
                              onClick={navigateToUserReferralHeader}
                            >
                              Referral
                            </p>
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  {/* <div className="col-md-5 pt-2 m-auto">
                    <div className="row">
                      <div className="col-md-4 ">
                        <p className="header1_expert m-0 p-0 universal_cursor ">Become an Expert</p>
                      </div>
                      <div className="col-md-2">
                        <p className="header1_expert m-0 p-0 universal_cursor">Help</p>
                      </div>
                      <div className="col-md-6">
                        <p className="header1_expert m-0 p-0 universal_cursor">Referral</p>
                      </div>
                    </div>
                  </div> */}
                </div>
              </div>
              <div className="col-md-3 col-6  m-auto px-3">
                <div className="d-flex justify-content-end">
                  <div className="col-md-6 text-end border_right ">
                    <div className="using_flex_count">
                      {/* <img
                      onClick={opennotification}
                      className="img-fluid new_width_set"
                      src="/imagess/noti.png"
                    /> */}
                      {/* <img
                        onClick={opennotification}
                        className="img-fluid new_width_set2"
                        src="/imagess/bell.png"
                      /> */}

                      <Dropdown className="px-1">
                        <Dropdown.Toggle id="notifydrop">
                          <img
                            className="img-fluid new_width_set"
                            src="/imagess/bell.png"
                          />
                        </Dropdown.Toggle>

                        <Dropdown.Menu className="dropdown_size2 " id="style-3">
                          {props.profile?.firstName ? (
                            <>
                              {/* {notifications?.map((item: any, index: any) => { */}
                              {/* return ( */}
                              {/* ////////////////////////////////////////////// */}

                              <div className="col-md-12 text-center pt-3">
                                <img
                                  className="img-fluid"
                                  src="/imagess/bellbig.png"
                                />
                                <p className="new_notifications_font m-0 p-0 pt-3">
                                  No Notifications Yet
                                </p>
                                <p className="font_notifictions_sub_para">
                                  You have no notifications right now.
                                  <br />
                                  Come back later.{" "}
                                </p>
                                <button className="btn btn-danger mt-3 universal_button_color2 py-2">
                                  Allow Notifications
                                </button>
                                {/* <div className="col-md-12 px-3">
                                  <div className="row">
                                    <div className="col-md-1 pe-0">
                                      <img className="img-fluid" src="/imagess/dot.png" />
                                    </div>
                                    <div className="col-md-11 ps-0 pt-1">
                                      <div className="row">
                                        <div className="col-md-6">
                                          <p className="m-0 p-0 notifications_lising_header"> Cleaning Service</p>
                                        </div>
                                        <div className="col-md-5 pe-0 m-auto text-end">
                                          <p className="m-0 p-0 min_ago_notifications">5 min ago</p>
                                        </div>
                                        <div className="col-md-1">
                                          <SlOptionsVertical className="spread_icon_color universal_cursor" />
                                        </div>
                                        <div className="col-md-12 pt-1">
                                          <p className="m-0 p-0 desc_notifications">Your Order for Cleaning Service is marked as Complete!</p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-12 ">
                                    <hr className="line_notifications mb-1 mt-2" />
                                  </div>
                                </div>
                                <div className="col-md-12 px-3 background_active">
                                  <div className="row ">
                                    <div className="col-md-1 pe-0">
                                      <img className="img-fluid" src="/imagess/dot.png" />
                                    </div>
                                    <div className="col-md-11 ps-0 pt-1">
                                      <div className="row">
                                        <div className="col-md-6">
                                          <p className="m-0 p-0 notifications_lising_header"> Cleaning Service</p>
                                        </div>
                                        <div className="col-md-5 m-auto pe-0 text-end">
                                          <p className="m-0 p-0 min_ago_notifications">5 min ago</p>
                                        </div>
                                        <div className="col-md-1">
                                          <SlOptionsVertical className="spread_icon_color universal_cursor" />
                                        </div>
                                        <div className="col-md-12 pt-1">
                                          <p className="m-0 p-0 desc_notifications">Your Order for Cleaning Service is marked as Complete!</p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-12">
                                    <hr className="line_notifications mb-1 mt-2" />
                                  </div>
                                </div> */}

                                {/* <div className="col-md-12">
                                  <hr className="line_notifications mb-1 mt-2" />
                                </div> */}
                              </div>
                            </>
                          ) : (
                            <div className="col-md-12 pt-4 text-center">
                              <img
                                className="img-fluid pt-3"
                                src="/imagess/bellbig.png"
                              />
                              <p className="new_notifications_font m-0 p-0 pt-3">
                                No Notifications Yet
                              </p>
                              <p className="font_notifictions_sub_para">
                                You have no notifications right now.
                                <br />
                                Come back later.{" "}
                              </p>
                              <button className="btn btn-danger mt-3 universal_button_color2 py-2">
                                Allow Notifications
                              </button>
                            </div>
                          )}
                        </Dropdown.Menu>
                      </Dropdown>

                      <Dropdown
                        className="px-3"
                        show={isOpen12}
                        onToggle={() => setIsOpen12(!isOpen12)}
                      >
                        <Dropdown.Toggle variant="success" id="countrydrop">
                          <img
                            // onClick={openinformationpannel}
                            className="img-fluid new_width_set1"
                            // src={selectedflag ? selectedflag : "/imagess/ukk.jpg"}
                            src={isOpenCountryImg}
                          />
                          <img
                            // onClick={openinformationpannel}
                            className="img-fluid ps-2"
                            src={"/imagess/downn.png"}
                          />
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="dropdown_size px-2 mt-2">
                          {/* For Countries ---------------------------------------------------------- */}
                          <div className="col-md-12 px-2">
                            {isOpenCountry === 0 ? (
                              <>
                                <label className="countrytext">
                                  Change country
                                </label>
                                <div
                                  onClick={() => setIsOpenCountry(1)}
                                  className="col-md-12  radius_selection mt-2 pt-1 pb-2 universal_cursor"
                                >
                                  <div className="row px-2">
                                    <div className="col-md-8">
                                      <img
                                        className="img-fluid img_flag_width_height rounded-circle"
                                        src={isOpenCountryImg}
                                      />
                                      <span className="innertext ps-1">
                                        {isOpenCountryName}
                                      </span>
                                    </div>
                                    <div className="col-md-4 text-end">
                                      <img
                                        className="img-fluid"
                                        src="/imagess/down-n.png"
                                      />
                                    </div>
                                  </div>
                                </div>
                                <label className="countrytext mt-3">
                                  Change language
                                </label>
                                <div
                                  className="col-md-12  radius_selection mt-2 pt-1 pb-2 universal_cursor"
                                  onClick={() => setIsOpenCountry(2)}
                                >
                                  <div className="row px-2">
                                    <div className="col-md-8">
                                      <span className="innertext">
                                        English-EN
                                      </span>
                                    </div>
                                    <div className="col-md-4 text-end">
                                      <img
                                        className="img-fluid"
                                        src="/imagess/down-n.png"
                                      />
                                    </div>
                                  </div>
                                </div>
                                <label className="countrytext mt-3">
                                  Change currency
                                </label>
                                <div className="col-md-12  radius_selection mt-2 pt-1 pb-2 universal_cursor">
                                  <div className="row px-2">
                                    <div className="col-md-8">
                                      <span
                                        className="innertext"
                                        onClick={() => setIsOpenCountry(3)}
                                      >
                                        UK - Pound - EN
                                      </span>
                                    </div>
                                    <div className="col-md-4 text-end">
                                      <img
                                        className="img-fluid"
                                        src="/imagess/down-n.png"
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="col-md-12 mt-4">
                                  <label
                                    className="btn btn-danger w-100 countrytext1 mt-4 universal_cursor py-2"
                                    onClick={() => setIsOpen12(!isOpen12)}
                                  >
                                    Save Changes
                                  </label>
                                </div>
                              </>
                            ) : isOpenCountry === 1 ? (
                              <>
                                <label className="countrytext">
                                  Change country
                                </label>
                                <div
                                  className="col-md-12 radius_selection mt-2 pt-1 pb-2 mt-2 universal_cursor"
                                  onClick={() => setIsOpenCountry(0)}
                                >
                                  <div className="row px-1">
                                    <div className="col-md-8">
                                      <img
                                        className="img-fluid img_flag_width_height rounded-circle"
                                        src={isOpenCountryImg}
                                      />
                                      <span className="innertext ps-1">
                                        {isOpenCountryName}
                                      </span>
                                    </div>
                                    <div className="col-md-4 text-end">
                                      <img
                                        className="img-fluid"
                                        src="/imagess/down-n.png"
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div
                                  className="col-md-12 height_country_drop border_listt_countries mt-2 px-2 pt-1"
                                  id="style-2"
                                >
                                  <input className="form-control form-control-sm form_search_new innertext1"
                                    value={searchQuery}
                                    onChange={(e) => handleSearch(e.target.value)}
                                    placeholder="Search.." type="text" />
                                  <>
                                    <p
                                      className="m-0 p-0 universal_cursor"
                                      onClick={() => {
                                        setIsOpenCountry(0);
                                      }}
                                    >
                                      <img
                                        onClick={openinformationpannel}
                                        className="img-fluid img_flag_width_height rounded-circle"
                                        src={isOpenCountryImg}
                                      />
                                      &nbsp;&nbsp;
                                      <span className="innertext1">
                                        {isOpenCountryName}
                                      </span>
                                    </p>
                                  </>
                                  <hr className="mt-1 mb-1" />
                                  {filteredCountries?.map(
                                    (item: any, index: any) => {
                                      return (
                                        <>
                                          <p
                                            className="m-0 p-0 universal_cursor"
                                            onClick={() => {
                                              setSelectedflag(
                                                item?.countryFlagImage
                                              ),
                                                setOpen1(!open1),
                                                countryselected(item),
                                                setIsOpenCountry(0);
                                            }}
                                          >
                                            <img
                                              onClick={openinformationpannel}
                                              className="img-fluid img_flag_width_height rounded-circle"
                                              src={item.countryFlagImage}
                                            />
                                            &nbsp;&nbsp;
                                            <span className="innertext1">
                                              {item.name}
                                            </span>
                                          </p>
                                        </>
                                      );
                                    }
                                  )}
                                </div>
                                <div className="col-md-12 ">
                                  <label
                                    className="btn btn-danger w-100 countrytext1 mt-4 universal_cursor py-2"
                                    onClick={() => setIsOpen12(!isOpen12)}
                                  >
                                    Save Changes
                                  </label>
                                </div>
                              </>
                            ) : isOpenCountry === 2 ? (
                              <>
                                <label className="countrytext">
                                  Change Language
                                </label>
                                <div
                                  className="col-md-12 radius_selection mt-2 pt-1 pb-2 mt-2"
                                  onClick={() => setIsOpenCountry(0)}
                                >
                                  <div className="row px-1">
                                    <div className="col-md-8">
                                      <span className="innertext universal_cursor">
                                        English-EN
                                      </span>
                                    </div>
                                    <div className="col-md-4 text-end">
                                      <img
                                        className="img-fluid"
                                        src="/imagess/down-n.png"
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="col-md-12 height_country_drop border_listt_countries mt-2 px-2 pt-1">
                                  <>
                                    <p
                                      className="m-0 p-0 universal_cursor"
                                      onClick={() => {
                                        setIsOpenCountry(0);
                                      }}
                                    >
                                      <span className="innertext1">
                                        English-EN
                                      </span>
                                    </p>
                                  </>
                                </div>
                                <div className="col-md-12 ">
                                  <label
                                    className="btn btn-danger w-100 countrytext1 mt-4 universal_cursor py-2"
                                    onClick={() => setIsOpen12(!isOpen12)}
                                  >
                                    Save Changes
                                  </label>
                                </div>
                              </>
                            ) : isOpenCountry === 3 ? (
                              <>
                                <label className="countrytext">
                                  Change Currency
                                </label>
                                <div
                                  className="col-md-12 radius_selection mt-2 pt-1 pb-2 mt-2"
                                  onClick={() => setIsOpenCountry(0)}
                                >
                                  <div className="row px-1">
                                    <div className="col-md-8">
                                      <span className="innertext ">
                                        UK - Pound - EN
                                      </span>
                                    </div>
                                    <div className="col-md-4 text-end">
                                      <img
                                        className="img-fluid"
                                        src="/imagess/down-n.png"
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="col-md-12 height_country_drop border_listt_countries mt-2 px-2 pt-1 universal_cursor">
                                  <>
                                    <p
                                      className="m-0 p-0"
                                      onClick={() => {
                                        setIsOpenCountry(0);
                                      }}
                                    >
                                      <span className="innertext1">
                                        UK - Pound - EN
                                      </span>
                                    </p>
                                  </>
                                </div>
                                <div className="col-md-12 ">
                                  <label
                                    className="btn btn-danger w-100 countrytext1 mt-4 universal_cursor py-2"
                                    onClick={() => setIsOpen12(!isOpen12)}
                                  >
                                    Save Changes
                                  </label>
                                </div>
                              </>
                            ) : null}
                          </div>

                          {/* For Language ---------------------------------------------------------- */}
                          {/* <div className="col-md-12">
                            <button
                              onClick={() => setOpen2(!open2)}
                              aria-controls="example-collapse-text"
                              aria-expanded={open2}
                              className="btn btn-danger w-100 text-left mt-2"
                            >
                              Select Language
                            </button>
                            <Collapse in={open2}>
                              <div className="px-1">
                                <h6 onClick={() => setOpen2(!open2)}>English</h6>
                              </div>
                            </Collapse>
                          </div> */}

                          {/* For Currency ---------------------------------------------------------- */}
                          {/* <div className="col-md-12">
                            <button
                              onClick={() => setOpen3(!open3)}
                              aria-controls="example-collapse-text"
                              aria-expanded={open3}
                              className="btn btn-danger w-100 text-left mt-2"
                            >
                              Select Currency
                            </button>
                            <Collapse in={open3}>

                              <div className="px-1">
                                <h6 onClick={() => setOpen3(!open3)}>Pound</h6>
                              </div>
                            </Collapse>
                          </div> */}
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                  </div>

                  {/* Notifications DropDown  */}
                  {notificationpannel === true ? (
                    <div className=" position_set_notifcation1 " id="style-2">
                      <div className="col-md-12 text-center pt-5">
                        <i
                          style={{ color: "lightgray", fontSize: "140%" }}
                          className="fas fa-bell"
                        ></i>
                        <p style={{ color: "gray" }}>No Notifications Yet!</p>
                      </div>
                    </div>
                  ) : null}

                  <div className="d-flex px-2 justify-content-between">
                    &nbsp;
                    {props.profile?.firstName ? (
                      <>
                        <img
                          className="img-fluid img_height_width_profile"
                          // src={`https://1864597015.rsc.cdn77.org/consentformattachments/images/staging/${props.profile?.imageURL
                          //   ? props.profile?.imageURL
                          //   : "/imagess/redicons/cam.png"
                          //   }`}
                          src={
                            props.profile?.imageURL === ""
                              ? `/imagess/avatar.png`
                              : `${props.profile?.imageURL}`
                          }
                        />

                        <Dropdown
                          drop="start"
                          show={isOpennn11}
                          onToggle={() => setIsOpennn11(!isOpennn11)}
                        >
                          <Dropdown.Toggle variant="white" id="dropdown-basicc">
                            <p className="m-0 pt-1 text_user_profile">
                              &nbsp;&nbsp;Hello,{" "}
                              {props.profile?.firstName || ""}{" "}
                              <i className="fas fa-angle-down"></i>
                            </p>
                          </Dropdown.Toggle>

                          {/* mega menu --------------------------------------------------------------------------------------------------------------------------------------------- */}
                          {expandnew === false ? (
                            <Dropdown.Menu id="new_drop1">
                              <div className="col-md-12">
                                <div className="row">
                                  <div className="col-md-12 px-0 position_rel">
                                    <div className="col-md-12">
                                      <div className="d-flex">
                                        <div >
                                          <img
                                            className="img-fluid img_ava1 rounded-circle"
                                            src={
                                              props.profile?.imageURL === ""
                                                ? `/imagess/avatar.png`
                                                : `${props.profile?.imageURL}`
                                            }
                                          />
                                        </div>
                                        <div className="ps-2 pt-2">
                                          <p className="m-0 font_new_header">Usman Khan</p>
                                          <p className="m-0 font_new_header2">Usman Khan@gmail.com</p>
                                        </div>
                                      </div>
                                      <div className="d-flex px-2 universal_cursor pt-2" onClick={navigateToUserProfile}>
                                        <div>
                                          <img className="img-fluid" src="/imagess/profiled.png" />
                                        </div>
                                        <div className="pt-1 ps-2">
                                          <p className="m-0 account_font">My Account</p>
                                        </div>
                                      </div>
                                      <div className="d-flex px-2 universal_cursor pt-1"
                                        onClick={
                                          navigateToUserAllbookings
                                        }
                                      >
                                        <div>
                                          <img className="img-fluid" src="/imagess/cartd.png" />
                                        </div>
                                        <div className="pt-1 ps-2">
                                          <p className="m-0 account_font">My Orders</p>
                                        </div>
                                      </div>
                                      <div className="d-flex px-2 universal_cursor pt-1" onClick={navigateToUserAddress}>
                                        <div>
                                          <img className="img-fluid" src="/imagess/locationd.png" />
                                        </div>
                                        <div className="pt-1 ps-2">
                                          <p className="m-0 account_font">My Addresses</p>
                                        </div>
                                      </div>
                                      <div className="d-flex px-2 universal_cursor pt-1" onClick={navigateToUserPayments}>
                                        <div>
                                          <img className="img-fluid" src="/imagess/walletd.png" />
                                        </div>
                                        <div className="pt-1 ps-2">
                                          <p className="m-0 account_font">Payment Details</p>
                                        </div>
                                      </div>
                                      <div className="d-flex px-2 universal_cursor pt-1" onClick={navigateToUserVouchers}>
                                        <div>
                                          <img className="img-fluid" src="/imagess/cupond.png" />
                                        </div>
                                        <div className="pt-1 ps-2">
                                          <p className="m-0 account_font">My Vouchers</p>
                                        </div>
                                      </div>
                                      <div className="d-flex px-2 universal_cursor pt-1" onClick={navigateToUserReferral}>
                                        <div>
                                          <img className="img-fluid" src="/imagess/heartd.png" />
                                        </div>
                                        <div className="pt-1 ps-2">
                                          <p className="m-0 account_font">Referral</p>
                                        </div>
                                      </div>
                                      {/* <div className="d-flex px-2 universal_cursor pt-1">
                                        <div>
                                          <img className="img-fluid" src="/imagess/walletd2.png" />
                                        </div>
                                        <div className="pt-1 ps-2">
                                          <p className="m-0 account_font">My Wallet</p>
                                        </div>
                                      </div> */}
                                      {/* <div className="d-flex px-2 universal_cursor pt-1">
                                        <div>
                                          <img className="img-fluid" src="/imagess/legal.png" />
                                        </div>
                                        <div className="pt-1 ps-2">
                                          <p className="m-0 account_font">Legal</p>
                                        </div>
                                      </div> */}
                                      <div className="d-flex px-2 universal_cursor pt-1" onClick={navigateToUsersettings}>
                                        <div>
                                          <img className="img-fluid" src="/imagess/settingd.png" />
                                        </div>
                                        <div className="pt-1 ps-2">
                                          <p className="m-0 account_font">Setting</p>
                                        </div>
                                      </div>
                                      {/* <div className="d-flex px-2 universal_cursor pt-1">
                                        <div>
                                          <img className="img-fluid" src="/imagess/helpd.png" />
                                        </div>
                                        <div className="pt-1 ps-2">
                                          <p className="m-0 account_font">Help</p>
                                        </div>
                                      </div> */}
                                    </div>
                                    <div className="col-md-12">
                                      <hr className="background_line mb-2 mt-3" />
                                    </div>
                                    {/* <div className="d-flex px-2 universal_cursor">
                                      <div>
                                        <img className="img-fluid" src="/imagess/usersblack.png" />
                                      </div>
                                      <div className="pt-1 ps-2">
                                        <p className="m-0 account_font">Add user</p>
                                      </div>
                                    </div>
                                    <div className="d-flex px-2 universal_cursor">
                                      <div>
                                        <img className="img-fluid" src="/imagess/building.png" />
                                      </div>
                                      <div className="pt-1 ps-2">
                                        <p className="m-0 account_font">Add Business Account</p>
                                      </div>
                                    </div> */}
                                    <div className="d-flex px-2 universal_cursor  " onClick={logoutconfirmation}>
                                      <div>
                                        <img className="img-fluid" src="/imagess/logoutblack.png" />
                                      </div>
                                      <div className="pt-1 ps-2">
                                        <p className="m-0 account_font">Logout</p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Dropdown.Menu>
                          ) : (
                            <Dropdown.Menu id="new_drop">
                              <div className="col-md-12">
                                <div className="row">
                                  <div className="col-md-7">
                                    <div className="col-md-12 box_number_one">
                                      <div className="col-md-12">
                                        <p className="m-0 p-0 left_head_1">
                                          Recent Searches
                                        </p>
                                      </div>
                                      <div className="col-md-12 ">
                                        <button className="btn btn-secondary btn-sm mt-2 px-4 me-2 rounded-pill py-1 secondary_button_pills">
                                          Injectables...
                                        </button>
                                        <button className="btn btn-secondary btn-sm mt-2 px-4 me-2 rounded-pill py-1 secondary_button_pills">
                                          Laser Hair Removal..
                                        </button>
                                        <button className="btn btn-secondary btn-sm mt-2 px-4 me-2 rounded-pill py-1 secondary_button_pills">
                                          Injectables...
                                        </button>
                                        <button className="btn btn-secondary btn-sm mt-2 px-4 me-2 rounded-pill py-1 secondary_button_pills">
                                          Laser Hair Removal..
                                        </button>
                                        <button className="btn btn-secondary btn-sm mt-2 px-4 me-2 rounded-pill py-1 secondary_button_pills">
                                          Injectables...
                                        </button>
                                        <button className="btn btn-secondary btn-sm mt-2 px-4 me-2 rounded-pill py-1 secondary_button_pills">
                                          Laser Hair Removal..
                                        </button>
                                        <button className="btn btn-secondary btn-sm mt-2 px-4 me-2 rounded-pill py-1 secondary_button_pills">
                                          Injectables...
                                        </button>
                                        <button className="btn btn-secondary btn-sm mt-2 px-4 me-2 rounded-pill py-1 secondary_button_pills">
                                          Laser Hair Removal..
                                        </button>
                                      </div>
                                      <div className="col-md-12 mt-3">
                                        <p className="m-0 p-0 left_head_1">
                                          Offers
                                        </p>
                                      </div>
                                      <div className="col-md-12">
                                        <div className="row mt-1">
                                          <div className="col-md-3 text-center ">
                                            <div className="col-md-12 py-3 background_pink_new">
                                              Black Friday
                                              <br />
                                              Sale
                                            </div>
                                          </div>
                                          <div className="col-md-3 text-center ">
                                            <div className="col-md-12 py-3 background_yellow_new">
                                              Laser Hair
                                              <br />
                                              Removal Deals
                                            </div>
                                          </div>
                                          <div className="col-md-3 text-center ">
                                            <div className="col-md-12 py-3 background_blue_new">
                                              Packages
                                              <br />
                                              Discount
                                            </div>
                                          </div>
                                          <div className="col-md-3 text-center ">
                                            <div className="col-md-12 py-3 background_pink_dark_new">
                                              Buy 1<br />
                                              Get 1 Free
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="col-md-12 mt-3">
                                        <p className="m-0 p-0 left_head_1">
                                          More to love
                                        </p>
                                      </div>
                                      <div className="flex_new mt-1">
                                        <div className="item_width  me-3">
                                          <img
                                            className="img-fluid"
                                            src="/imagess/more.png"
                                          />
                                          <div className="col-md-12 text-center py-1 top_margin_neg">
                                            Plumbing
                                          </div>
                                        </div>
                                        <div className="item_width  me-3">
                                          <img
                                            className="img-fluid"
                                            src="/imagess/more.png"
                                          />
                                          <div className="col-md-12 text-center py-1 top_margin_neg">
                                            Plumbing
                                          </div>
                                        </div>
                                        <div className="item_width  me-3">
                                          <img
                                            className="img-fluid"
                                            src="/imagess/more.png"
                                          />
                                          <div className="col-md-12 text-center py-1 top_margin_neg">
                                            Plumbing
                                          </div>
                                        </div>
                                        <div className="item_width  me-3">
                                          <img
                                            className="img-fluid"
                                            src="/imagess/more.png"
                                          />
                                          <div className="col-md-12 text-center py-1 top_margin_neg">
                                            Plumbing
                                          </div>
                                        </div>
                                        <div className="item_width  me-3">
                                          <img
                                            className="img-fluid"
                                            src="/imagess/more.png"
                                          />
                                          <div className="col-md-12 text-center py-1 top_margin_neg">
                                            Plumbing
                                          </div>
                                        </div>
                                        <div className="item_width  me-3">
                                          <img
                                            className="img-fluid"
                                            src="/imagess/more.png"
                                          />
                                          <div className="col-md-12 text-center py-1 top_margin_neg">
                                            Plumbing
                                          </div>
                                        </div>
                                        <div className="item_width  me-3">
                                          <img
                                            className="img-fluid"
                                            src="/imagess/more.png"
                                          />
                                          <div className="col-md-12 text-center py-1 top_margin_neg">
                                            Plumbing
                                          </div>
                                        </div>
                                        <div className="item_width  ">
                                          <img
                                            className="img-fluid"
                                            src="/imagess/more.png"
                                          />
                                          <div className="col-md-12 text-center py-1 top_margin_neg">
                                            Plumbing
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-3">
                                    <div className="col-md-12 box_number_two">
                                      <div className="col-md-12">
                                        <div className="d-flex">
                                          <img
                                            className="img-fluid img_ava1 rounded-circle"
                                            //  src="/imagess/chelsford.png"
                                            src={
                                              props.profile?.imageURL === ""
                                                ? `/imagess/avatar.png`
                                                : `https://1864597015.rsc.cdn77.org/consentformattachments/images/staging/${props.profile?.imageURL}`
                                            }
                                          />
                                          <span className="chelsford_new_changes ps-2 pe-2 pt-3">
                                            {props.profile?.firstName || ""}{" "}
                                            {props.profile?.lastName || ""}
                                          </span>
                                          <i
                                            id="icon_new_changes"
                                            className="fas fa-sort-down"
                                          ></i>
                                        </div>
                                        <div className="row  mt-3">
                                          <div className="col-md-6">
                                            <div
                                              onClick={navigateToUserProfile}
                                              className="d-flex universal_cursor mt-3"
                                            >
                                              <img
                                                className="img-fluid icon_width_new"
                                                src="/imagess/userss.png"
                                              />
                                              <p className="newbusiness">
                                                {" "}
                                                Manage Profile
                                              </p>
                                            </div>
                                            <div
                                              onClick={navigateToUserAddress}
                                              className="d-flex universal_cursor margin_drop_cus"
                                            >
                                              <img
                                                className="img-fluid icon_width_new"
                                                src="/imagess/wish.png"
                                              />
                                              <p className="newbusiness">
                                                Address
                                              </p>
                                            </div>
                                            <div
                                              onClick={
                                                navigateToUserAllbookings
                                              }
                                              className="d-flex universal_cursor margin_drop_cus"
                                            >
                                              <img
                                                className="img-fluid icon_width_new"
                                                src="/imagess/bag.png"
                                              />
                                              <p className="newbusiness">
                                                All Bookings
                                              </p>
                                            </div>
                                            <div
                                              onClick={navigateToUsersettings}
                                              className="d-flex universal_cursor margin_drop_cus"
                                            >
                                              <img
                                                className="img-fluid icon_width_new"
                                                src="/imagess/seet.png"
                                              />
                                              <p className="newbusiness">
                                                Settings
                                              </p>
                                            </div>
                                            <div
                                              onClick={navigateToUserPayments}
                                              className="d-flex universal_cursor margin_drop_cus"
                                            >
                                              <img
                                                className="img-fluid icon_width_new"
                                                src="/imagess/payy.png"
                                              />
                                              <p className="newbusiness">
                                                Payments
                                              </p>
                                            </div>
                                            <div
                                              onClick={navigateToUserVouchers}
                                              className="d-flex universal_cursor margin_drop_cus"
                                            >
                                              <img
                                                className="img-fluid icon_width_new"
                                                src="/imagess/bag.png"
                                              />
                                              <p className="newbusiness">
                                                navigateToUserVouchers
                                              </p>
                                            </div>
                                          </div>

                                          {/* <div className="col-md-6">
                                          <div className="d-flex mt-3">
                                            <img className="img-fluid icon_width_new" src="/imagess/bag.png" />
                                            <p className="newbusiness">My Orders</p>
                                          </div>
                                          <div className="d-flex margin_drop_cus">
                                            <img className="img-fluid icon_width_new" src="/imagess/bag.png" />
                                            <p className="newbusiness">Reward  Points</p>
                                          </div>
                                          <div className="d-flex margin_drop_cus">
                                            <img className="img-fluid icon_width_new" src="/imagess/bag.png" />
                                            <p className="newbusiness">Preferences</p>
                                          </div>
                                          <div className="d-flex margin_drop_cus">
                                            <img className="img-fluid icon_width_new" src="/imagess/bag.png" />
                                            <p className="newbusiness">Payments</p>
                                          </div>
                                          <div className="d-flex margin_drop_cus">
                                            <img className="img-fluid icon_width_new" src="/imagess/bag.png" />
                                            <p className="newbusiness">Quotes</p>
                                          </div>
                                        </div> */}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-2 px-0 position_rel">
                                    <div className="col-md-12 px-3 box_number_three p-1">
                                      <div className="row new_profile px-2 py-2">
                                        <div className="col-md-4 px-0 text-center">
                                          <img
                                            className="img-fluid img_ava1 rounded-circle"
                                            src={
                                              props.profile?.imageURL === ""
                                                ? `/imagess/avatar.png`
                                                : `https://1864597015.rsc.cdn77.org/consentformattachments/images/staging/${props.profile?.imageURL}`
                                            }
                                          />
                                        </div>
                                        <div className="col-md-8 px-0 m-auto">
                                          <p className="ps-2 m-0 chelsford_new_changes1">
                                            {props.profile?.firstName || ""}{" "}
                                            {props.profile?.lastName || ""}
                                          </p>
                                          <p className="ps-2 m-0 chelsford_new_changes2">
                                            Account ID:{" "}
                                            {props.profile?.accountNumber || ""}
                                          </p>
                                        </div>
                                      </div>

                                      <div
                                        onClick={navigateToUserProfile}
                                        className="d-flex universal_cursor mt-4 px-3"
                                      >
                                        <img
                                          className="img-fluid icon_width_new1"
                                          src="/imagess/users.png"
                                        />
                                        <p className="newbusiness1 ps-3">
                                          {" "}
                                          Login & Security
                                        </p>
                                      </div>

                                      <div
                                        onClick={navigateToUsersettings}
                                        className="d-flex universal_cursor mt-2 px-3"
                                      >
                                        <img
                                          className="img-fluid icon_width_new"
                                          src="/imagess/sett.png"
                                        />
                                        <p className="newbusiness1 ps-3">
                                          {" "}
                                          Setting
                                        </p>
                                      </div>
                                      <div className="col-md-12 px-0  ">
                                        <button
                                          onClick={logoutconfirmation}
                                          className="btn btn-secondary text-start button_pos "
                                        >
                                          <img
                                            className="img-fluid pe-3"
                                            src="/imagess/logout.png"
                                          />{" "}
                                          Logout{" "}
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-md-10 pt-1 mt-2">
                                    <span className="new_changesbusiness">
                                      Add Business
                                    </span>{" "}
                                    <span className="ps-4 new_changesbusiness">
                                      Add Users
                                    </span>
                                  </div>
                                  <div className="col-md-2 ps-0 pt-1 mt-2">
                                    <div
                                      className="d-flex  universal_cursor"
                                      onClick={togglemenu}
                                    >
                                      <img
                                        className="img-fluid icon_width_new2 mt-1"
                                        src="/imagess/Vector.png"
                                      />
                                      <p className="new_changesbusiness ps-3">
                                        {" "}
                                        Switch to indivitual user
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Dropdown.Menu>
                          )}
                        </Dropdown>
                      </>
                    ) : (
                      <p className="m-auto  text_user_profile">
                        <Link href="/auth/signup" className="login_signup">
                          <button
                            className="btn btn-light font_size_and_style btn-sm"
                            onClick={buttonclick}
                          >
                            Signup/ Login
                          </button>
                        </Link>
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* navigation mobile ---------------------------------------------------------------------------------------------------  */}
        <div className="navigation_mobile">
          {props.profile?.firstName ? (
            <div className="col-md-12 background_color_navigation_two_mob py-2">
              <div className="col-md-12 px-4">
                <div className="row">
                  <div className="col-md-6 col-6 m-auto">
                    <Link href="/">
                      <img
                        className="img-fluid img_logo_mobile_size"
                        src="/imagess/expmob.png"
                      />
                    </Link>
                  </div>
                  <div className="col-md-6 col-6 text-end m-auto ">
                    {/* <span > <img className="img-fluid" src="/imagess/shopingc.png" /></span> */}
                    {/* <span className="px-2" > <img className="img-fluid" src="/imagess/bb.png" /></span> */}
                    <span onClick={tabbarone}>
                      {" "}
                      <img className="img-fluid" src="/imagess/menu.png" />
                    </span>
                  </div>
                </div>
              </div>

              {tabbar1 ? (
                <div className="col-md-12 background_color_navigation_two1">
                  {/* Header of mobile Navigation  */}
                  <div className="col-md-12 px-4 header_bottom pt-2">
                    <div className="row">
                      <div className="col-md-6 col-6 m-auto">
                        <img
                          className="img-fluid img_logo_mobile_size"
                          src="/imagess/expmob.png"
                        />
                      </div>
                      <div className="col-md-6 col-6 text-end">
                        <span onClick={tabbarone}>
                          <button className="btn btn-light btn-sm">
                            <i className="fas fa-times"></i>
                          </button>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12 px-2 pt-3 drop_down_signup pb-5">
                    {/* profile information show  */}
                    <div className="col-md-12 border_white_mobile_navigaton px-2 py-2">
                      <div className="row">
                        <div className="col-md-6 text-center col-4">
                          <img
                            className="img-fluid mobile_img_adj"
                            // src={`https://1864597015.rsc.cdn77.org/consentformattachments/images/staging/${props.profile?.imageURL
                            //   ? props.profile?.imageURL
                            //   : "/imagess/redicons/cam.png"
                            //   }`}
                            src={
                              props.profile?.imageURL === ""
                                ? `/imagess/avatar.png`
                                : `${props.profile?.imageURL}`
                            }
                          />
                        </div>
                        <div className="col-md-6 col-8  m-auto">
                          <p className="m-0 p-0 color_text_mobile_black">
                            <b>
                              Hi,&nbsp;
                              {props.profile?.firstName}{" "}
                              {props.profile?.lastName}
                            </b>
                          </p>
                          <p className="m-0 p-0 color_text_mobile">
                            {props.profile?.primaryEmail}
                          </p>
                        </div>
                      </div>
                    </div>
                    {/* Other buttons  */}
                    <div className="col-md-12 px-4">
                      <Link
                        href="/userProfile/profile/"
                        className="style_a_tag"
                      >
                        <div
                          onClick={tabbarone}
                          className="btn_style_light_new mt-2 w-100 py-2"
                        >
                          <img
                            className="img-fluid pe-2"
                            style={{ width: "30px  " }}
                            src="/imagess/users.png"
                          />{" "}
                          Manage Account
                        </div>
                      </Link>
                      <div
                        onClick={navigateToUserAddress}
                        className="btn_style_light_new mt-2 w-100 py-2"
                      >
                        <img
                          className="img-fluid pe-2"
                          src="/imagess/locationnn.png"
                        />{" "}
                        Address
                      </div>
                      <div
                        onClick={navigateToUserAllbookings}
                        className="btn_style_light_new mt-2 w-100 py-2"
                      >
                        <img
                          className="img-fluid pe-2"
                          src="/imagess/bookingsss.png"
                        />{" "}
                        All Bookings
                      </div>
                      <div
                        onClick={navigateToUsersettings}
                        className="btn_style_light_new mt-2 w-100 py-2"
                      >
                        <img
                          className="img-fluid pe-2"
                          src="/imagess/settinggg.png"
                        />{" "}
                        Settings
                      </div>
                      <div
                        onClick={navigateToUserPayments}
                        className="btn_style_light_new mt-2 w-100 py-2"
                      >
                        <img
                          className="img-fluid pe-2"
                          src="/imagess/paymentsss.png"
                        />{" "}
                        Payments
                      </div>
                      <div
                        onClick={navigateToUserReferral}
                        className="btn_style_light_new mt-2 w-100 py-2"
                      >
                        <img
                          className="img-fluid pe-2"
                          style={{ width: "30px  " }}
                          src="/imagess/users.png"
                        />{" "}
                        Referral
                      </div>
                      <div
                        onClick={navigateToUserVouchers}
                        className="btn_style_light_new mt-2 w-100 py-2"
                      >
                        <img
                          className="img-fluid pe-2"
                          src="/imagess/bookingsss.png"
                        />{" "}
                        All Vouchers
                      </div>

                      {/* <div onClick={navigateToUserChat} className="btn_style_light_new mt-2 w-100 py-2">
                      <img className="img-fluid pe-2" src="/imagess/bookingsss.png" />   Chat
                      </div> */}

                      <Modal centered show={show} onHide={handleClose1}>
                        <Modal.Header closeButton>
                          <Modal.Title>Sign-out!</Modal.Title>
                        </Modal.Header>
                        <Modal.Body className="text-center">
                          <img className="img-fluid" src="/imagess/alert.gif" />
                          <br />
                          Are you sure you want to Sign-out!
                        </Modal.Body>
                        <Modal.Footer>
                          <Button variant="secondary" onClick={handleClose1}>
                            Cancel
                          </Button>
                          <Button
                            variant="primary"
                            // onClick={handleClose}
                            onClick={(e) => {
                              dispatch({ type: AUTH_ACTIONS.LOGOUT });
                              setIsOpennn11(false);
                              removeCookie && removeCookie("profile");
                              localStorage.removeItem("jwtToken");
                              localStorage.removeItem("jwtRefreshToken");
                              localStorage.clear();
                              router.push("/");
                              handleClose1;
                            }}
                          >
                            Logout
                          </Button>
                        </Modal.Footer>
                      </Modal>
                    </div>
                    <div
                      className="btn_style_light_new_bor mt-2 w-100 py-2 px-4 py-2 mt-5"
                      onClick={(e) => {
                        dispatch({ type: AUTH_ACTIONS.LOGOUT });
                        removeCookie && removeCookie("profile");
                        localStorage.removeItem("jwtToken");
                        localStorage.removeItem("jwtRefreshToken");
                        localStorage.clear();
                        router.push("/");
                        handleClose1;
                      }}
                    >
                      <img
                        className="img-fluid pe-4"
                        src="/imagess/leftttt.png"
                      />
                      <strong> Logout </strong>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          ) : (
            <>
              {/* Navigation Number 2  */}
              <div className="col-md-12 background_color_navigation_two_mob py-2">
                <div className="col-md-12 px-4">
                  <div className="row">
                    <div className="col-md-6 col-6 m-auto ">
                      <Link href="/">
                        <img
                          className="img-fluid img_logo_mobile_size"
                          src="/imagess/expmob.png"
                        />
                      </Link>
                    </div>
                    <div className="col-md-6 col-6 text-end m-auto ">
                      {/* <span > <img className="img-fluid" src="/imagess/shopingc.png" /></span> */}
                      {/* <span className="px-2" > <img className="img-fluid" src="/imagess/bb.png" /></span> */}
                      <span onClick={tabbarone}>
                        {" "}
                        <img className="img-fluid" src="/imagess/menu.png" />
                      </span>
                    </div>
                  </div>
                </div>

                {tabbar1 ? (
                  <div className="col-md-12 background_color_navigation_two1">
                    {/* Header of mobile Navigation  */}
                    <div className="col-md-12 px-4 header_bottom pt-2">
                      <div className="row ">
                        <div className="col-md-6 col-6 m-auto">
                          <Link href="/">
                            <img
                              className="img-fluid img_logo_mobile_size"
                              src="/imagess/expmob.png"
                            />
                          </Link>
                        </div>
                        <div className="col-md-6 col-6 text-end ">
                          <span onClick={tabbarone}>
                            {" "}
                            <img
                              className="img-fluid"
                              src="/imagess/menu.png"
                            />
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-12 pt-3 px-3 pb-4 drop_down_signup ">
                      <div className="col-md-12">
                        <Link href="/auth/signup" className="login_signup">
                          <button
                            className="btn btn-outline-danger mt-2 w-100 py-2"
                            onClick={tabbarone}
                          >
                            Signup/ Login
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            </>
          )}
        </div>
      </div>
    </Layout3>
  );
}
