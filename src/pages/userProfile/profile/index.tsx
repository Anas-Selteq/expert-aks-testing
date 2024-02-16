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
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { enqueueSnackbar } from "notistack";

const Profile_page = () => {
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
  const [NewToken, setNewToken] = useState(false);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // upload image api /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    setJwtToken(localStorage?.getItem("jwtToken"));
    setJwtRefreshToken(localStorage?.getItem("jwtRefreshToken"));
  }, []);

  console.log("JwtRefreshToken", JwtRefreshToken);

  const handleFileChange = (event: any) => {
    setFile(event.target.files[0]);
    imguploadrequesttosend(event.target.files[0]);
  };

  const imguploadrequesttosend = async (file: any) => {
    const JWTtoken = localStorage.getItem("jwtToken");
    const notes_id: any = localStorage.getItem("notes_id");
    console.log("JWTtoken", JWTtoken);
    // Create a new FormData object
    const formData: any = new FormData();
    var randomId = Math.floor(Math.random() * 1000000);

    formData.append("Id", randomId);
    formData.append("serviceName", "signup");
    formData.append("source", "Expert");
    formData.append("Files", file);
    formData.append("Category", "main");
    formData.append("FileType", "i");
    formData.append("CreatedBy", randomId);
    // setLoading(true);

    try {
      const response = await axios.post(
        "https://gateway.findanexpert.net/serviceinventory_svc/pb/ServiceAttachment/UploadAttachment",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Ensure you use multipart/form-data for form data
            Authorization: `Bearer ${JWTtoken}`,
          },
        }
      );

      // setResponseDatafirstnote(response.data);
      // setNewNotes(false);
      // updatenotesrequesttosendimg(response.data.paths[0])
      console.log("API Response new data:", response.data.paths[0]);
      uploadImageprofile(response.data.paths[0]);
      setTimeout(() => {
        fetchData();
      }, 2000);
      // setinputtextval("");
      // setLoading(false);
    } catch (error) {
      console.error("API Error:", error);
      // setLoading(false);
      // setNewNotes(false);
    }
  };

  // update user image -----------------------------------------------------------------------
  const uploadImageprofile = async (uploadurlimage: any) => {
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
        imagePath: uploadurlimage,
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

      // setupdatedimageloader(true);
      // setUpdatedImageLoader((prevState) => !prevState);
      // setImageurlupload(response.data);
    } catch (error) {
      // Handle errors
      if (error?.response?.status === 401) {
        enqueueSnackbar(
          "Your session has been expired, You have been logged out!",
          { variant: "warning" }
        );
        dispatch({ type: AUTH_ACTIONS.LOGOUT });
        removeCookie && removeCookie("profile");
        localStorage.removeItem("jwtToken");
        localStorage.removeItem("jwtRefreshToken");
        localStorage.clear();
        router.push("/");
        // window.location.reload();
      }
      console.error("Upload error:", error);
    }
  };

  useEffect(() => {
    console.log("profile?.userId", profile?.userId);
    let isMounted = true; // Flag to track component mount state
    fetchData();
  }, [profile?.userId, JwtRefreshToken, NewToken]);

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
      console.log("profileeee", response?.status);
      // Only update state if the component is still mounted
      if (response?.status === 200) {
        setData(response.data);
        // alert(response?.status)
        setUserprofileres(response.data?.result?.user);
        dispatch({
          type: AUTH_ACTIONS.LOGIN_SUCCESS,
          payload: response.data?.result?.user,
        });
      }
    } catch (error) {
      if (error?.response?.status === 401) {
        enqueueSnackbar(
          "Your session has been expired, You have been logged out!",
          { variant: "warning" }
        );
        dispatch({ type: AUTH_ACTIONS.LOGOUT });
        removeCookie && removeCookie("profile");
        localStorage.removeItem("jwtToken");
        localStorage.removeItem("jwtRefreshToken");
        localStorage.clear();
        router.push("/");
        // window.location.reload();
      }
      setError(error);
    }
  };

  const Jwtset = async () => {
    // Convert the JWT token object to a string
    // const jwtTokenString = JSON.stringify(JwtRefreshToken);

    // Encode the JWT token to Base64
    const base64Token = Buffer.from(JwtRefreshToken).toString("base64");

    try {
      const response = await axios.get(
        `https://gateway.findanexpert.net/signup_svc/pb/users/getnewRefreshToken?tokenModel=${base64Token}`
      );

      // localStorage.setItem("jwtRefreshToken", response?.data?.result?.jwtRefreshToken)
      // localStorage.setItem("jwtToken", response?.data?.result?.jwtToken)
      if (response?.data?.code === 0) {
        localStorage.setItem(
          "jwtRefreshToken",
          response?.data?.result?.jwtRefreshToken
        );
        localStorage.setItem("jwtToken", response?.data?.result?.jwtToken);
        setNewToken(true);
        window.location.reload();
      }

      // Only update state if the component is still mounted
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    const Jwtset = async () => {
      // Convert the JWT token object to a string
      // const jwtTokenString = JSON.stringify(JwtRefreshToken);

      // Encode the JWT token to Base64
      const base64Token = Buffer.from(JwtRefreshToken).toString("base64");

      try {
        const response = await axios.get(
          `https://gateway.findanexpert.net/signup_svc/pb/users/getnewRefreshToken?tokenModel=${base64Token}`
        );
        // localStorage.setItem("jwtRefreshToken", response?.data?.result?.jwtRefreshToken)
        // localStorage.setItem("jwtToken", response?.data?.result?.jwtToken)
        if (response?.data?.code === 0) {
          localStorage.setItem(
            "jwtRefreshToken",
            response?.data?.result?.jwtRefreshToken
          );
          localStorage.setItem("jwtToken", response?.data?.result?.jwtToken);
        }
        // Only update state if the component is still mounted
      } catch (error) {
        console.log(error);
      }
    };
    if (JwtRefreshToken) {
      Jwtset();
    }
  }, [profile?.userId, JwtRefreshToken]);

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
            <span>Manage Profile</span>
          </div>
        </div>
      </div>
      {userprofileres ? (
        <div className="w-100 margin_bottom_new">
          <div className="  " style={{ borderRadius: "8px" }}>
            {/* image show section for pc  */}
            <div className="col-md-12 border_for_all_pages1 mt-4">
              <div className="row">
                <div className="col-md-6">
                  <div className="d-flex">
                    <div className="">
                      {userprofileres && (
                        <img
                          className="img-fluid img_rounded_circle_new"
                          src={
                            userprofileres?.imageURL === ""
                              ? `/imagess/avatar.png`
                              : `${userprofileres?.imageURL}`
                          }
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
                          accept=".jpeg"
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
                  src={
                    userprofileres?.imageURL === ""
                      ? `/imagess/avatar.png`
                      : `${userprofileres?.imageURL}`
                  }
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
                    accept=".jpeg"
                    data-original-title="upload photos"
                  />
                </label>
                <p className="heading_name_profile mb-0 pb-1 pt-3 ">
                  <strong>
                    Hello, {userprofileres?.firstName}{" "}
                    {userprofileres?.lastName}
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

            {/* Additional info section  */}
            <div className="pb-4">
              <div className="pt-1 pb-3 ">
                <span className="basic_text">
                  {" "}
                  <img className="img-fluid " src="/imagess/info.png" />
                  &nbsp;
                </span>
                <span className="img_small basic_text">Additional Info</span>
              </div>
              <div className="border_for_all_pages">
                <Link
                  href="/userProfile/profile/update_gender"
                  className="style_a_tag"
                >
                  <CustomInput
                    label="Gender"
                    inputValue={
                      userprofileres?.genderId === 1
                        ? "Male"
                        : userprofileres?.genderId === 2
                        ? "Female"
                        : userprofileres?.genderId === 3
                        ? "Other"
                        : "Add Gender"
                    }
                    showIcon={true}
                  />
                </Link>
                <hr className="background_line" />
                <Link
                  href="/userProfile/profile/update_dob"
                  className="style_a_tag"
                >
                  <CustomInput
                    label="Date of Birth"
                    inputValue={
                      userprofileres?.dob
                        ? formatDate(userprofileres?.dob)
                        : "Add date of birth"
                    }
                    showIcon={true}
                  />
                </Link>
              </div>
            </div>

            {/* Cards section  */}
            <div className="row px-2 px-md-0">
              <div className="col-md col-3 px-md-3 px-1 mt-2">
                <div className="col-md-12 profile_cards">
                  <Link
                    href="/userProfile/addressshow/addressshow/"
                    className="style_a_tag"
                  >
                    <img
                      className="img-fluid pb-md-3 icon_size_cards_in_mobile "
                      src="/imagess/loc.png"
                    />
                    <div className="mt-1 mt-md-0">Addresses</div>
                  </Link>
                </div>
              </div>
              <div
                className="col-md col-3 px-md-3 px-1 mt-2 on_pc_screeen
"
              >
                <div className="col-md-12 profile_cards">
                  <img
                    className="img-fluid pb-md-3  icon_size_cards_in_mobile"
                    src="/imagess/cart.png"
                  />
                  <Link href="/AllBookingsNew" className="style_a_tag">
                    <div className="mt-1 mt-md-0">Orders</div>
                  </Link>
                </div>
              </div>
              <div className="col-md col-3 px-md-3 px-1 mt-2">
                <div className="col-md-12 profile_cards">
                  <img
                    className="img-fluid pb-md-3  icon_size_cards_in_mobile"
                    src="/imagess/clip.png"
                  />
                  <Link href="/AllBookingsNew" className="style_a_tag">
                    <div className="mt-1 mt-md-0">Bookings</div>
                  </Link>
                </div>
              </div>
              <div className="col-md col-3  px-md-3 px-1 mt-2">
                <div className="col-md-12 profile_cards">
                  <img
                    className="img-fluid pb-md-3  icon_size_cards_in_mobile"
                    src="/imagess/set.png"
                  />
                  <Link href="/userProfile/settings" className="style_a_tag">
                    <div className="mt-1 mt-md-0">Settings</div>
                  </Link>
                </div>
              </div>
              {/* <div className="col-md col- mt-2"></div> */}
            </div>
            {/* Login security and Signout section buttons s */}
            <div
              style={{
                backgroundColor: "#f5f6f7",
                margin: "2rem 0 1rem 0",
                padding: "20px",
              }}
            >
              <div className="col-md-12 border_for_all_pages">
                <div className="row">
                  <div className="col-md-6 col-9 m-auto">
                    <div className="login_text_profile">
                      <img className="img-fluid " src="/imagess/security.png" />{" "}
                      &nbsp;&nbsp;Login and Security
                    </div>
                  </div>
                  <div className="col-md-6 col-3 text-end">
                    <Image
                      src="/assets/Images/rightt.png"
                      alt="keyright"
                      height={11.19}
                      width={6.33}
                    />
                  </div>
                </div>
              </div>
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
                    <div className="login_text_profile">
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
              <img className="img-fluid" src="/imagess/alert.gif" />
              <br />
              Are you sure you want to Sign-out!
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Cancel
              </Button>
              <Button
                variant="primary"
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

export default Profile_page;

{
  /* <div className="col-md-12 pt-3">
                <div className="row">
                  <div className="col-md-6">
                    <p className="basic_text1 mb-0 pb-0">Gender</p>
                  </div>
                  <div className="col-md-6 text-end"> */
}
{
  /* <p className="basic_text2 mb-0 pb-0">
                      Male &nbsp;
                      <img
                        className="img-fluid right_icon_style"
                        src="../assets/images/rightt.png"
                      />{" "}
                    </p> */
}

{
  /* {profile?.genderId === 0 ? (
                      <Link
                        href="/addusergender"
                        className="text_style_profile"
                      >
                        <span>
                          Select &nbsp;
                          <img
                            className="img-fluid right_icon_style"
                            src="../assets/images/rightt.png"
                          />
                        </span>
                      </Link>
                    ) : profile?.genderId === 1003 ? (
                      <p className="basic_text2 mb-0 pb-0">Male</p>
                    ) : profile?.genderId === 1004 ? (
                      <p className="basic_text2 mb-0 pb-0">Female</p>
                    ) : profile?.genderId === 1005 ? (
                      <p className="basic_text2 mb-0 pb-0">Other</p>
                    ) : null}
                  </div>
                </div>
                <hr className="background_line" />
              </div>

              <div className="col-md-12 pt-3">
                <div className="row">
                  <div className="col-md-6">
                    <p className="basic_text1 mb-0 pb-0">Date of Birth</p>
                  </div>
                  <div className="col-md-6 text-end">
                    {profile?.dob ? (
                      <p className="basic_text2">
                        <Moment format="DD/MM/YYYY">{profile?.dob}</Moment>
                      </p>
                    ) : (
                      <Link href="/adduseredob" className="text_style_profile">
                        <span>
                          Select &nbsp;
                          <img
                            className="img-fluid right_icon_style"
                            src="../assets/images/rightt.png"
                          />
                        </span>
                      </Link>
                    )}{" "}
                  </div>
                </div>
                <hr className="background_line" />
              </div>
            </div> */
}

{
  /* Contact info section  */
}
// <div
//   className="col-md-12 px-5  pb-4 border_profile mt-4"
//   style={{ borderRadius: "8px" }}
// >
//   <div className="col-md-12 pt-4">
//     <p className="basic_text">Contact info</p>
//   </div>
//   <div className="col-md-12 pt-3">
//     {/* <Link href="/edit-email-profile" className="style_a_tag"> */}
//     <div className="row">
//       <div className="col-md-6 m-auto   ">
//         <p className="basic_text1 mb-0 pb-0 ">Emails</p>
//       </div>
//       <div className="col-md-6 text-end">
//         {/* <p className="basic_text2 mb-0 pb-0">dummy@gmail.com</p>
//         <p className="basic_text2 mb-0 pb-0">dummy1@gmail.com</p> */}
//         {/* <Link> */}
//         <Link href="/email-details" className="style_a_tag">
//           <p className="basic_text2 mb-0 pb-0">
//             {profile?.primaryEmailVerify ? (
//               <img
//                 className="img-fluid img_width_verified"
//                 src="../assets/Images/verified.png"
//               />
//             ) : (
//               <img
//                 className="img-fluid img_width_verified"
//                 src="/assets/Images/unverified.png"
//               />
//             )}{" "}
//             &nbsp;
//             {profile?.primaryEmail}{" "}
//             <img
//               className="img-fluid right_icon_style"
//               src="../assets/images/rightt.png"
//             />
//           </p>
//           <p className="basic_text2 mb-0 pb-0">
//             {profile?.secondaryEmailVerify ? (
//               <img
//                 className="img-fluid img_width_verified"
//                 src="../assets/Images/verified.png"
//               />
//             ) : (
//               <img
//                 className="img-fluid img_width_verified"
//                 src="/assets/Images/unverified.png"
//               />
//             )}{" "}
//             &nbsp;
//             {profile?.secondaryEmail}{" "}
//             <img
//               className="img-fluid right_icon_style"
//               src="../assets/images/rightt.png"
//             />
//           </p>
//         </Link>
//         {/* </Link> */}
//       </div>
//     </div>
//     {/* </Link> */}
//     <hr className="background_line" />
//   </div>
//   <div className="col-md-12 pt-3">
//     <div className="row">
//       <div className="col-md-6">
//         <p className="basic_text1 mb-0 pb-0">Phone</p>
//       </div>
//       <div className="col-md-6 text-end">
//         <Link href="/mobile-details-login" className="style_a_tag">
//           <p className="basic_text2 mb-0 pb-0">
//             {profile?.primaryMobileVerify ? (
//               <img
//                 className="img-fluid img_width_verified"
//                 src="../assets/Images/verified.png"
//               />
//             ) : (
//               <img
//                 className="img-fluid img_width_verified"
//                 src="/assets/Images/unverified.png"
//               />
//             )}{" "}
//             &nbsp;
//             {profile?.primaryMobile} &nbsp;
//             <img
//               className="img-fluid right_icon_style"
//               src="../assets/images/rightt.png"
//             />{" "}
//           </p>
//           <p className="basic_text2 mb-0 pb-0">
//             {profile?.secondaryMobileVerify ? (
//               <img
//                 className="img-fluid img_width_verified"
//                 src="../assets/Images/verified.png"
//               />
//             ) : (
//               <img
//                 className="img-fluid img_width_verified"
//                 src="/assets/Images/unverified.png"
//               />
//             )}{" "}
//             &nbsp;{" "}
//             {profile?.secondaryMobile ? <span>+</span> : null}{" "}
//             {profile?.secondaryMobile} &nbsp;
//             <img
//               className="img-fluid right_icon_style"
//               src="../assets/images/rightt.png"
//             />{" "}
//           </p>
//         </Link>
//       </div>
//     </div>
//     <hr className="background_line" />
//   </div>
// </div>

{
  /* Password section  */
}
{
  /* <div
              className="col-md-12 px-5  pb-4 border_profile mt-4"
              style={{ borderRadius: "8px" }}
            >
              <div className="col-md-12 pt-4">
                <p className="basic_text">Password</p>
              </div>

              <div className="col-md-12 pt-3">
                <div className="row">
                  <div className="col-md-6">
                    <p className="basic_text1 mb-0 pb-0">Last changed Oct 19</p>
                  </div>
                  <div className="col-md-6 text-end">
                    <p className="basic_text2 mb-0 pb-0">
                      .............
                      <img
                        className="img-fluid right_icon_style"
                        src="../assets/images/rightt.png"
                      />{" "}
                    </p>
                  </div>
                </div>
                <hr className="background_line" />
              </div>
            </div> */
}

{
  /* Personal documents section  */
}
{
  /* <div
              className="col-md-12 px-5  pb-4 border_profile mt-4"
              style={{ borderRadius: "8px" }}
            >
              <div className="col-md-12 pt-4">
                <p className="basic_text">Personal Documents</p>
              </div>
              <div className="col-md-12 pt-3">
                <div className="row">
                  <div className="col-md-6 m-auto   ">
                    <p className="basic_text1 mb-0 pb-0 ">
                      National Identity Card
                    </p>
                  </div>
                  <div className="col-md-6 text-end">
                    <p className="basic_text2 mb-0 pb-0">Muhammad</p>
                  </div>
                </div>
                <hr className="background_line" />
              </div>
              <div className="col-md-12 pt-3">
                <div className="row">
                  <div className="col-md-6">
                    <p className="basic_text1 mb-0 pb-0">
                      Educational documents
                    </p>
                  </div>
                  <div className="col-md-6 text-end">
                    <p className="basic_text2 mb-0 pb-0">
                      Zeeshan &nbsp;
                      <img
                        className="img-fluid right_icon_style"
                        src="../assets/images/rightt.png"
                      />{" "}
                    </p>
                  </div>
                </div>
                <hr className="background_line" />
              </div>
              <div className="col-md-12 pt-3">
                <div className="row">
                  <div className="col-md-6">
                    <p className="basic_text1 mb-0 pb-0">Medical documents</p>
                  </div>
                  <div className="col-md-6 text-end">
                    <p className="basic_text2 mb-0 pb-0">
                      Male &nbsp;
                      <img
                        className="img-fluid right_icon_style"
                        src="../assets/images/rightt.png"
                      />{" "}
                    </p>
                  </div>
                </div>
                <hr className="background_line" />
              </div>
            </div> */
}
