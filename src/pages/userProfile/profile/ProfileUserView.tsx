import React, { useEffect, useState } from "react";
import Moment from "react-moment";
import style from "../styles/stylescss/Profile.module.css";
import Image from "next/image";
import Link from "next/link";
import fs from "fs";
import { IoIosArrowForward } from "react-icons/io";
import { HiBadgeCheck } from "react-icons/hi";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.min.js";
import Dashboard from "@/Components/Layout/Dashboard";
import { GoPrimitiveDot } from "react-icons/go";
import { useRouter } from "next/router";
import {
  updateUserImage,
  getUserDetail,
  uploadUserImage,
  VerifyUserEmailAction,
} from "@/helper";
import ImageUploadCard from "@/Components/UploadAvatar/UploadAvatar";
import { useDispatch, useSelector } from "react-redux";
import { AUTH_ACTIONS } from "@/Redux/Actions/loginPageAction";
import { formatDate, removeCookie } from "@/utils/utils";
import CustomInput from "@/Components/Input/input_field";
import SideBar from "@/Components/components/sidebar";
import { BiDotsVertical } from "react-icons/bi";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from "axios";

const ProfileUserView = () => {
  const router = useRouter();
  const { profile } = useSelector((state: any) => state);
  const [profileData, setProfileData] = useState<any>([]);
  const [loader, setLoader] = React.useState(false);
  const [imageUrl, setImageUrl] = React.useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [value, setValue] = useState("");
  const dispatch = useDispatch();
  const [jwtToken, setJwtToken] = useState<any>(null);
  const [file, setFile] = useState<any>(null);
  const [userId, setUserId] = useState<any>(1);
  const [imageurlupload, setImageurlupload] = useState<any>("");
  const [data, setData] = useState<any>([]);
  const [error, setError] = useState<any>(null);
  const [userprofileres, setUserprofileres] = useState<any>("");
  const [updatedimageloader, setupdatedimageloader] = useState<any>(true);
  const [updatedImageLoader, setUpdatedImageLoader] = useState<boolean>(false);
  const [JwtRefreshToken, setJwtRefreshToken] = useState<any>("");

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  // upload image api /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    setJwtToken(localStorage?.getItem("jwtToken"));
    setJwtRefreshToken(localStorage?.getItem("jwtRefreshToken"));
  }, []);

  const handleFileChange = (event: any) => {
    setFile(event.target.files[0]);
  };

  const uploadImage = async () => {
    const isToken = jwtToken !== null;

    const headers = {
      Authorization: isToken ? `Bearer ${jwtToken}` : undefined,
      "Content-Type": "multipart/form-data",
    };

    try {
      setupdatedimageloader(false);
      const formData = new FormData();

      formData.append("AllFilesToUpload", file);

      console.log("formData:", formData);

      const response = await axios.post(
        `https://gateway.findanexpert.net/signup_svc/pv/users/addUserImage?userId=${userId}&environment=dev`,
        formData,
        { headers }
      );

      // Handle the response as needed
      console.log("Upload successful:", response.data?.result?.imageURL);
      setImageurlupload(response.data?.result?.imageURL);
      setupdatedimageloader(false);
    } catch (error) {
      // Handle errors
      console.error("Upload error:", error);
      setupdatedimageloader(true);
      if (JwtRefreshToken) {
        Jwtset()
      }
    }
  };

  const uploadImageprofile = async () => {
    const isToken = jwtToken !== null;

    const headers = {
      Authorization: isToken ? `Bearer ${jwtToken}` : undefined,
      "Content-Type": "application/json",
    };

    try {
      const data = {
        userId: profile?.userId,
        firstName: profile?.firstName,
        lastName: profile?.lastName,
        imagePath: imageurlupload,
        modifiedBy: profile?.userId,
      };
      const response = await axios.post(
        `https://gateway.findanexpert.net/signup_svc/pv/users/addUserProfile`,
        data,
        { headers }
      );

      // Handle the response as needed
      console.log(
        "Upload successful:------------------------------",
        response.data
      );
      setupdatedimageloader(true);
      setUpdatedImageLoader((prevState) => !prevState);
      // setImageurlupload(response.data);
    } catch (error) {
      // Handle errors
      console.error("Upload error:", error);
      if (JwtRefreshToken) {
        Jwtset()
      }
    }
  };

  // Automatically upload the image when the file state changes
  useEffect(() => {
    if (file) {
      uploadImage();
    }
  }, [file]);

  useEffect(() => {
    if (imageurlupload) {
      uploadImageprofile();
    }
  }, [imageurlupload]);

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  // get user profile by if -------------------------------------------------------------------------------------

  useEffect(() => {
    console.log("profile?.userId", profile?.userId)
    let isMounted = true; // Flag to track component mount state
    fetchData();
    // return () => {
    //   isMounted = false; // Set the flag to false when the component unmounts
    // };
  }, [profile?.userId, updatedImageLoader]);

  const fetchData = async () => {
    const isToken = jwtToken !== null;
    const headers = {
      Authorization: isToken ? `Bearer ${jwtToken}` : undefined,
      "Content-Type": "application/json",
    };
    try {
      const response = await axios.get(
        `https://gateway.findanexpert.net/signup_svc/pv/users/getUserById?id=${profile?.userId}`,
        { headers }
      );
      // Only update state if the component is still mounted
      setData(response.data);
      console.log("profileeee", response.data);
      setUserprofileres(response.data?.result?.user);
      dispatch({
        type: AUTH_ACTIONS.LOGIN_SUCCESS,
        payload: response.data?.result?.user,
      });
    } catch (error) {
      setError(error);
      if (JwtRefreshToken) {
        Jwtset()
      }
    }
  };

  const Jwtset = async () => {

    // Convert the JWT token object to a string
    // const jwtTokenString = JSON.stringify(JwtRefreshToken);

    // Encode the JWT token to Base64
    const base64Token = Buffer.from(JwtRefreshToken).toString('base64');



    try {
      const response = await axios.get(
        `https://gateway.findanexpert.net/signup_svc/pb/users/getnewRefreshToken?tokenModel=${base64Token}`
      );
      // localStorage.setItem("jwtRefreshToken", response?.data?.result?.jwtRefreshToken)
      // localStorage.setItem("jwtToken", response?.data?.result?.jwtToken)
      if (response?.data?.code === 0) {
        localStorage.setItem("jwtRefreshToken", response?.data?.result?.jwtRefreshToken)
        localStorage.setItem("jwtToken", response?.data?.result?.jwtToken)
      }
      window.location.reload();
      // Only update state if the component is still mounted
    } catch (error) {
      setError(error);
    }
  };

  // get user profile by if -------------------------------------------------------------------------------------

  const businessID =
    typeof window !== "undefined" && localStorage.getItem("businessId");
  const [errorMessage, setErrorMessage] = React.useState({
    type: false,
    message: "",
  });
  function BasicInfo() {
    router.push("/edit-personal-information");
    // window.open('/', '_blank');
  }
  // function ContactInfo() {
  //   router.push('/');
  // }
  function Phone() {
    router.push("/phone-number-update");
    // window.open('/', '_blank');
  }
  function Password() {
    router.push("/update-password");
    // window.open('/', '_blank');
  }
  function PersonalDocuments() {
    router.push("/personal-docs");
    // window.open('/', '_blank');
  }
  function editEmail(email: any) {
    router.push({
      pathname: "/edit-email",
      query: { email: email, userId: 8 },
      // window.open('/', '_blank');
    });
  }

  // useEffect(() => {
  //   getUserDetail(8).then((res) => {
  //     setProfileData(res?.result);
  //   });
  // }, []);

  const handleEmailClick = () => {
    // if profile.email is verified --> just go
    // : send otp sms and on success --> go to otp page:
    VerifyUserEmailAction({ userId: profile.userId, type: 1 }).then((resp) => {
      console.log("---- response send email otp ---------");
      dispatch({
        type: AUTH_ACTIONS.UPDATE_PRIMARY_EMAIL,
        payload: { primaryEmail: true },
      });
      console.log(resp);
      console.log("---- response send email otp ---------");
      router.push("/email-verification-code");
    });
  };

  const [buttonColorOnHover, setButtonColorOnHover] = useState("white");
  const [buttonHoverCursor, setButtonHoverCursor] = useState("auto");

  const onChangeFile = async (e: any) => {
    e.preventDefault();
    try {
      console.log("UPLOADING IMAGEEEEEEEEEEEEEEEEEEE");
      let result = await uploadUserImage(
        profile?.userId,
        e.target.files[0],
        "dev"
      );
      let imageurl =
        result?.code === 0
          ? "https://1864597015.rsc.cdn77.org/consentformattachments/images/staging/" +
          result.result?.imageURL
          : null;
      console.log("IMAGE", imageurl);
      let changedUserImage = await updateUserImage(profile.userId, imageurl);
      setImageUrl(
        "https://1864597015.rsc.cdn77.org/consentformattachments/images/staging/" +
        result.result?.imageURL
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleOptionChange = (e: any) => {
    setSelectedOption(e.target.value);
  };

  return (
    <SideBar activeIndex={0}>
      <div
        style={{
          width: "100%",
          fontSize: "18px",
          backgroundColor: "white",
          borderTop: "1px solid lightgray",
          borderBottom: "0.7px solid #dcdcdc",
          fontFamily: "Roboto",
          fontWeight: "800",
          fontStyle: "normal",
          letterSpacing: "normal",
          color: "#404145",
          position: "relative",
          zIndex: "1",
        }}
        className="px-4"
      >
        <div className="row py-2">
          <div className="col-md-6">
            {" "}
            <span>User Profile</span>
          </div>
        </div>
      </div>
      {userprofileres ? (
        <div className="w-100 margin_bottom_new">
          <div
            className=" "
            style={{ borderRadius: "8px" }}
          >
            {/* image show section for pc  */}
            <div className="col-md-12 border_for_all_pages1 mt-4">
              <div className="row">
                <div className="col-md-6">
                  <div className="d-flex">
                    <div className="">
                      {userprofileres && (
                        <img
                          className="img-fluid img_rounded_circle_new"
                          src={userprofileres?.imageURL === "" ? `/imagess/avatar.png` : `https://1864597015.rsc.cdn77.org/consentformattachments/images/staging/${userprofileres?.imageURL}`}
                          alt="User Profile"
                        />
                      )}
                      <label htmlFor="file">
                        {updatedimageloader === true ? (
                          <img
                            className="img-fluid button_style"
                            src="/imagess/redicons/cam.png"
                          />
                        ) : (
                          <div
                            className="spinner-grow text-danger spinner-border-sm button_style1"
                            role="status"
                          >
                            <span className="visually-hidden">Loading...</span>
                          </div>
                        )}
                        <input
                          type="file"
                          id="file"
                          onChange={handleFileChange}
                          style={{ display: "none" }}
                          name="image"
                          // accept="image/gif,image/jpeg,image/jpg,image/png"
                          accept=".png, .jpg, .jpeg"
                          data-original-title="upload photos"
                        />
                      </label>
                    </div>
                    <div className=" ps-3 pt-2">
                      <p className="heading_name_profile mb-0 pb-1 ">
                        Hello, {userprofileres?.firstName}{" "}
                        {userprofileres?.lastName}
                      </p>
                      <p className="subheading_profile m-0 pt-1">
                        Personal Account
                      </p>
                      <p className="subheading_profile pt-0 mb-0 p-0">{`Account ID: ${userprofileres?.userId}`}</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 text-end m-auto">
                  {/* <Link
                    href="/userProfile/profile/switch_account"
                    className="style_a_tag"
                  > */}
                  {/* <BiDotsVertical className="icon_color_every" /> */}
                  {/* </Link> */}
                </div>
              </div>
            </div>

            {/* image show section for mobile  */}
            <div className="row pt-4 hide_onpc">
              <div className="col-md-12 col-11 text-center positon_relative_sett">
                <img
                  className="img-fluid img_profile_mobile_setting"
                  src={userprofileres?.imageURL === "" ? `/imagess/avatar.png` : `https://1864597015.rsc.cdn77.org/consentformattachments/images/staging/${userprofileres?.imageURL}`}
                />
                {/* <img className="img-fluid " src="/imagess/redicons/cam.png" /> */}
                <label htmlFor="file">
                  {updatedimageloader === true ? (
                    <img
                      className="img-fluid img_mobile_cam"
                      src="/imagess/redicons/cam.png"
                    />
                  ) : (
                    <div
                      className="spinner-grow text-danger spinner-border-sm button_style1"
                      role="status"
                    >
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  )}
                  <input
                    type="file"
                    id="file"
                    onChange={handleFileChange}
                    style={{ display: "none" }}
                    name="image"
                    accept="image/gif,image/jpeg,image/jpg,image/png"
                    data-original-title="upload photos"
                  />
                </label>
                <p className="heading_name_profile mb-0 pb-1 pt-3 ">
                  <strong>
                    Hello, {userprofileres?.firstName} {userprofileres?.lastName}
                  </strong>
                </p>
                <p className="subheading_profile m-0 pt-1">Personal Account</p>
                <p className="subheading_profile pt-0 mb-0 p-0">{`Account ID: ${userprofileres?.userId}`}</p>
              </div>
              <div className="position_set_icons_dots">
                {/* <Link
                  href="/userProfile/profile/switch_account"
                  className="style_a_tag"
                > */}
                {/* <BiDotsVertical className="icon_color_every" /> */}
                {/* </Link> */}
              </div>
            </div>

            {/* First/LastName section  */}
            <div className="pt-4">
              <p className="basic_text">
                <img className="img-fluid" src="/svgicons/person.svg" /> Name
              </p>
            </div>
            <div className="border_for_all_pages">
              <Link
                href={{
                  pathname: "/userProfile/profile/update_name",
                  query: {
                    data: true,
                  },
                }}
                className="style_a_tag"
              >
                <CustomInput
                  label="First Name"
                  inputValue={userprofileres?.firstName}
                  showIcon={true}
                  showVerify={false}
                />
              </Link>
              <hr className="background_line" />
              <Link
                href={{
                  pathname: "/userProfile/profile/update_name",
                  query: {},
                }}
                className="style_a_tag"
              >
                <CustomInput
                  label="Last Name"
                  inputValue={userprofileres?.lastName}
                  showIcon={true}
                />
              </Link>
            </div>

            {/* Show Email Section  */}
            <div className="pb-4 ">
              <div className="pt-4">
                <p className="basic_text">
                  {" "}
                  <img className="img-fluid" src="/imagess/msg.png" /> Email
                </p>
              </div>
              <div className="border_for_all_pages">
                <Link
                  href="/userProfile/profile/manage_email"
                  className="style_a_tag"
                >
                  <CustomInput
                    label="Primary Email"
                    inputValue={userprofileres?.primaryEmail}
                    showIcon={true}
                    showVerify={true}
                    verifiedOrNot={userprofileres?.primaryEmailVerify}
                  />
                </Link>
                <hr className="background_line" />
                <Link
                  href="/userProfile/profile/manage_email"
                  className="style_a_tag"
                >
                  {userprofileres?.secondaryEmail?.length === 0 ? (
                    <>
                      <div
                        style={{
                          fontFamily: "Roboto",
                          fontSize: "10px",
                          fontWeight: "normal",
                          fontStretch: "normal",
                          fontStyle: "normal",
                          lineHeight: "normal",
                          letterSpacing: "normal",
                          textAlign: "left",
                          color: "#aaa",
                        }}
                      >
                        Secondary Email
                      </div>
                      <div
                        className="pt-1"
                        style={{
                          fontFamily: "Roboto",
                          fontSize: "14px",
                          fontWeight: "normal",
                          fontStretch: "normal",
                          fontStyle: "normal",
                          lineHeight: "normal",
                          letterSpacing: "normal",
                          textAlign: "left",
                          color: "#000",
                        }}
                      >
                        Add Secondary Email
                      </div>
                    </>
                  ) : (
                    <CustomInput
                      label="Secondary Email"
                      inputValue={userprofileres?.secondaryEmail}
                      showIcon={true}
                      showVerify={true}
                      verifiedOrNot={userprofileres?.secondaryEmailVerify}
                    />
                  )}
                </Link>
              </div>
            </div>

            {/* Mobile Show section   */}
            <div className="pb-4">
              <div className="pt-1">
                <p className="basic_text">
                  {" "}
                  <img className="img-fluid" src="/imagess/mobb.png" /> Mobile
                </p>
              </div>
              <div className="border_for_all_pages">
                <Link
                  href="/userProfile/profile/manage_mobiles"
                  className="style_a_tag"
                >
                  <CustomInput
                    label="Primary Number"
                    inputValue={userprofileres?.primaryMobile}
                    showIcon={true}
                    showVerify={true}
                    verifiedOrNot={userprofileres?.primaryMobileVerify}
                  />
                </Link>
                <hr className="background_line" />

                <>
                  {userprofileres?.secondaryMobile?.length === 0 ? (
                    <>
                      <Link
                        href="/userProfile/profile/manage_mobiles"
                        className="style_a_tag"
                      >
                        <div
                          style={{
                            fontFamily: "Roboto",
                            fontSize: "10px",
                            fontWeight: "normal",
                            fontStretch: "normal",
                            fontStyle: "normal",
                            lineHeight: "normal",
                            letterSpacing: "normal",
                            textAlign: "left",
                            color: "#aaa",
                          }}
                        >
                          Secondary Mobile
                        </div>
                        <div
                          className="pt-1"
                          style={{
                            fontFamily: "Roboto",
                            fontSize: "14px",
                            fontWeight: "normal",
                            fontStretch: "normal",
                            fontStyle: "normal",
                            lineHeight: "normal",
                            letterSpacing: "normal",
                            textAlign: "left",
                            color: "#000",
                          }}
                        >
                          Add Secondary Mobile
                        </div>
                      </Link>
                    </>
                  ) : (
                    <Link
                      href="/userProfile/profile/manage_mobiles"
                      className="style_a_tag"
                    >
                      <CustomInput
                        label="Secondary Number"
                        inputValue={userprofileres?.secondaryMobile}
                        showIcon={true}
                        showVerify={true}
                        verifiedOrNot={userprofileres?.secondaryMobileVerify}
                      />
                    </Link>
                  )}
                </>
              </div>
            </div>


            {/* Login security and Signout section buttons s */}
            <div
              style={{
                backgroundColor: "#f5f6f7",
                margin: "2rem 0 1rem 0",
                padding: "20px",
              }}
            >
              <div
                onClick={handleShow}
                // onMouseEnter={(e: any) => {
                //   setButtonColorOnHover("lightgrey");
                //   setButtonHoverCursor("pointer");
                // }}
                // onMouseLeave={(e: any) => {
                //   setButtonColorOnHover("white");
                //   setButtonHoverCursor("auto");
                // }}
                // onClick={(e: any) => {
                //   dispatch({ type: AUTH_ACTIONS.LOGOUT });
                //   removeCookie && removeCookie("profile");
                // }}
                className="col-md-12 border_for_all_pages mt-2"
              >
                <div className="row">
                  <div className="col-md-6 col-6 m-auto">
                    {" "}
                    <div className="login_text_profile"


                    >
                      {" "}
                      <img
                        className="img-fluid"
                        src="/svgicons/sign-out.svg"
                      />{" "}
                      &nbsp;Sign out
                    </div>
                  </div>
                  <div className="col-md-6 col-6 text-end">
                    <Image
                      src="/assets/Images/rightt.png"
                      alt="keyright"
                      height={11.19}
                      width={6.33}
                    />
                  </div>
                </div>
              </div>
            </div>
            <br />
          </div>
          <Modal centered show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Sign-out!</Modal.Title>
            </Modal.Header>
            <Modal.Body className="text-center">

              <img className="img-fluid" src="/imagess/alert.gif" /><br />
              Are you sure you want to Sign-out!

            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Cancel
              </Button>
              <Button variant="primary"
                // onClick={handleClose}
                onClick={(e) => {
                  dispatch({ type: AUTH_ACTIONS.LOGOUT });
                  removeCookie && removeCookie("profile");
                  localStorage.removeItem("jwtToken");
                  localStorage.removeItem("jwtRefreshToken");
                  localStorage.clear();
                  router.push("/");
                  handleClose;
                }}
              >
                Logout
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      ) : (
        <div className="text-center">
          <div className="spinner-border text-danger" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
    </SideBar>
  );
};

export default ProfileUserView;

