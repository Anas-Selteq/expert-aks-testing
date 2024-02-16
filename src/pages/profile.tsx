import React, { useEffect, useState } from "react";
import Moment from "react-moment";
import style from "../styles/stylescss/Profile.module.css";
import Image from "next/image";
import Link from "next/link";
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
  // UploadImage,
  uploadUserImage,
  VerifyUserEmailAction,
} from "@/helper";
import ImageUploadCard from "@/Components/UploadAvatar/UploadAvatar";
import { useDispatch, useSelector } from "react-redux";
import { AUTH_ACTIONS } from "@/Redux/Actions/loginPageAction";
import { removeCookie } from "@/utils/utils";
// import { SideBar } from "@/Components/components/sidebar";
import ContainerWithInput from "@/Components/Input/input_field";

const Profile_page = () => {
  const router = useRouter();
  const { profile } = useSelector((state: any) => state);
  const [profileData, setProfileData] = useState<any>([]);
  const [loader, setLoader] = React.useState(false);
  const [imageUrl, setImageUrl] = React.useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [value, setValue] = useState("");
  const dispatch = useDispatch();
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
  const sideMenu: any = [
    {
      link: "/profile",
      text: "proifle",
      icon:
        "https://1864597015.rsc.cdn77.org/newexpertpreprod/icons/user-white.svg",
      active: true,
    },
    {
      link: "/",
      text: "Addresses",
      icon:
        "https://1864597015.rsc.cdn77.org/newexpertpreprod/icons/location-black.svg",
      active: false,
    },
    {
      link: "/",
      text: "Order",
      icon:
        "https://1864597015.rsc.cdn77.org/newexpertpreprod/icons/down-black.svg",
      active: false,
    },
    {
      link: "/",
      text: "Setting",
      icon:
        "https://1864597015.rsc.cdn77.org/newexpertpreprod/icons/go-black.svg",
      active: false,
    },
    {
      link: "/",
      text: "Logout",
      icon:
        "https://1864597015.rsc.cdn77.org/newexpertpreprod/icons/down-black.svg",
      active: false,
    },
  ];

  const onChangeFile = async (e: any) => {
    e.preventDefault();

    try {
      let result = await uploadUserImage(8, e.target.files[0], "dev");
      let imageurl =
        result?.code === 0
          ? "https://1864597015.rsc.cdn77.org/consentformattachments/images/staging/" +
            result.result?.imageURL
          : null;
      let changedUserImage = await updateUserImage(profile.userId, imageurl);
      console.log("------- profile changed -------");
      console.log(imageurl);
      console.log("------- profile changed -------");
    } catch (error) {
      console.log("-------- error catched ----------");
      console.log(error);
      console.log("-------- error catched ----------");
    }
    // .then((result: any) => {
    //   setLoader(false);
    //   if (result?.code === 0) {
    //     setImageUrl(result?.result?.imageURL);
    //   } else {
    //     setErrorMessage({ type: false, message: result?.message });
    //   }
    // });
  };

  const handleOptionChange = (e: any) => {
    setSelectedOption(e.target.value);
  };
  return (
    <div className="col-md-12 bg-white">
      {/* <Dashboard sidebar={sideMenu}> */}
      <div className="container total_height_dashboard mt-1 pt-4 pb-5">
        <ContainerWithInput
          label="Email"
          inputValue={"djasda"}
          handleInputValue={() => {}}
        />
        <div className="row">
          {/* Sidenavigation code  */}
          <div className="col-md-3  ">
            {/* side navigation for pc  */}
            <div className="col-md-12 pr-5 side_nav_hide">
              <div className="col-md-12 background_color_sidebar px-4 py-2">
                <img
                  className="img-fluid image_icon_width"
                  src="../assets/images/userwhite.png"
                />{" "}
                Profile
              </div>
              <div className="col-md-12 mt-2 background_color_sidebar_one px-4 py-2">
                <img
                  className="img-fluid image_icon_width"
                  src="../assets/images/cir.png"
                />{" "}
                Addresses
              </div>
              <div className="col-md-12 mt-2 background_color_sidebar_one px-4 py-2">
                <img
                  className="img-fluid image_icon_width"
                  src="../assets/images/box.png"
                />{" "}
                Bookings
              </div>
              <div className="col-md-12 mt-2 background_color_sidebar_one px-4 py-2">
                <img
                  className="img-fluid image_icon_width"
                  src="../assets/images/set.png"
                />{" "}
                Settings
              </div>
              <div
                onClick={(e) => {
                  dispatch({ type: AUTH_ACTIONS.LOGOUT });
                  removeCookie && removeCookie("profile");
                }}
                className="col-md-12 mt-2 background_color_sidebar_one px-4 py-2"
              >
                <Link href="/" className="style_a_tag">
                  <img
                    className="img-fluid image_icon_width"
                    src="../assets/images/out.png"
                  />{" "}
                  Logout
                </Link>
              </div>
            </div>
            {/* <SideBar /> */}
            {/* side navigation for mobile  */}
            <div className="col-md-12 mobile_responsive_navigation px-3">
              <div className="row pb-4">
                <button className="btn btn-danger"> Profile </button>

                <button className="btn btn-danger mt-2"> Addresses </button>

                <button className="btn btn-danger mt-2"> Bookings </button>

                <button className="btn btn-danger mt-2"> Settings </button>
                <Link href="/" className="style_a_tag">
                  <button
                    onClick={(e) => {
                      dispatch({ type: AUTH_ACTIONS.LOGOUT });
                      removeCookie && removeCookie("profile");
                    }}
                    className="btn btn-danger mt-2"
                  >
                    {" "}
                    Logout{" "}
                  </button>
                </Link>
              </div>
            </div>
          </div>
          {/* Main content code  */}
          <div className="col-md-9 ">
            {/* Profile code section  */}
            <div
              className="col-md-12 px-5  pb-4 border_profile "
              style={{ borderRadius: "8px" }}
            >
              <div className="row">
                <div className="col-md-2">
                  {profile?.imageURL ? (
                    <ImageUploadCard
                      type="button"
                      changeFile={onChangeFile}
                      imgLink={profile?.imageURL}
                      src={profile?.imageURL}
                    />
                  ) : (
                    <ImageUploadCard
                      type="button"
                      changeFile={onChangeFile}
                      imgLink={imageUrl}
                    />
                  )}
                </div>
                <div className="col-md-10 m-auto">
                  <div className="col-md-12 pt-4">
                    <p className="heading_name_profile mb-0 pb-0">
                      Hi, {profile?.firstName} {profile?.lastName}
                    </p>
                    <p className="subheading_profile mb-0 pb-0">
                      {" "}
                      Personal Account{" "}
                    </p>
                    <p className="subheading_profile_switch">
                      {" "}
                      <b>Switch Account </b>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Basic info section  */}
            <div
              className="col-md-12 px-5  pb-4 border_profile mt-4"
              style={{ borderRadius: "8px" }}
            >
              <div className="col-md-12 pt-4">
                <p className="basic_text">Basic info</p>
              </div>
              <div className="col-md-12 pt-3">
                <Link href="/basic-info-names" className="style_a_tag">
                  <div className="row">
                    <div className="col-md-6">
                      <p className="basic_text1 mb-0 pb-0">First Name</p>
                    </div>
                    <div className="col-md-6 text-end">
                      <p className="basic_text2 mb-0 pb-0">
                        {profile?.firstName}&nbsp;
                        <img
                          className="img-fluid right_icon_style"
                          src="../assets/images/rightt.png"
                        />{" "}
                      </p>
                    </div>
                  </div>
                </Link>
                <hr className="background_line" />
              </div>
              <div className="col-md-12 pt-3">
                <div className="row">
                  <div className="col-md-6">
                    <p className="basic_text1 mb-0 pb-0">Last Name</p>
                  </div>
                  <div className="col-md-6 text-end">
                    <p className="basic_text2 mb-0 pb-0">
                      {profile?.lastName} &nbsp;
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
                    <p className="basic_text1 mb-0 pb-0">Gender</p>
                  </div>
                  <div className="col-md-6 text-end">
                    {/* <p className="basic_text2 mb-0 pb-0">
                      Male &nbsp;
                      <img
                        className="img-fluid right_icon_style"
                        src="../assets/images/rightt.png"
                      />{" "}
                    </p> */}

                    {profile?.genderId === 0 ? (
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
            </div>

            {/* Contact info section  */}
            <div
              className="col-md-12 px-5  pb-4 border_profile mt-4"
              style={{ borderRadius: "8px" }}
            >
              <div className="col-md-12 pt-4">
                <p className="basic_text">Contact info</p>
              </div>
              <div className="col-md-12 pt-3">
                {/* <Link href="/edit-email-profile" className="style_a_tag"> */}
                <div className="row">
                  <div className="col-md-6 m-auto   ">
                    <p className="basic_text1 mb-0 pb-0 ">Emails</p>
                  </div>
                  <div className="col-md-6 text-end">
                    {/* <p className="basic_text2 mb-0 pb-0">dummy@gmail.com</p>
                    <p className="basic_text2 mb-0 pb-0">dummy1@gmail.com</p> */}
                    {/* <Link> */}
                    <Link href="/email-details" className="style_a_tag">
                      <p className="basic_text2 mb-0 pb-0">
                        {profile?.primaryEmailVerify ? (
                          <img
                            className="img-fluid img_width_verified"
                            src="../assets/Images/verified.png"
                          />
                        ) : (
                          <img
                            className="img-fluid img_width_verified"
                            src="/assets/Images/unverified.png"
                          />
                        )}{" "}
                        &nbsp;
                        {profile?.primaryEmail}{" "}
                        <img
                          className="img-fluid right_icon_style"
                          src="../assets/images/rightt.png"
                        />
                      </p>
                      <p className="basic_text2 mb-0 pb-0">
                        {profile?.secondaryEmailVerify ? (
                          <img
                            className="img-fluid img_width_verified"
                            src="../assets/Images/verified.png"
                          />
                        ) : (
                          <img
                            className="img-fluid img_width_verified"
                            src="/assets/Images/unverified.png"
                          />
                        )}{" "}
                        &nbsp;
                        {profile?.secondaryEmail}{" "}
                        <img
                          className="img-fluid right_icon_style"
                          src="../assets/images/rightt.png"
                        />
                      </p>
                    </Link>
                    {/* </Link> */}
                  </div>
                </div>
                {/* </Link> */}
                <hr className="background_line" />
              </div>
              <div className="col-md-12 pt-3">
                <div className="row">
                  <div className="col-md-6">
                    <p className="basic_text1 mb-0 pb-0">Phone</p>
                  </div>
                  <div className="col-md-6 text-end">
                    <Link href="/mobile-details-login" className="style_a_tag">
                      <p className="basic_text2 mb-0 pb-0">
                        {profile?.primaryMobileVerify ? (
                          <img
                            className="img-fluid img_width_verified"
                            src="../assets/Images/verified.png"
                          />
                        ) : (
                          <img
                            className="img-fluid img_width_verified"
                            src="/assets/Images/unverified.png"
                          />
                        )}{" "}
                        &nbsp;
                        {profile?.primaryMobile} &nbsp;
                        <img
                          className="img-fluid right_icon_style"
                          src="../assets/images/rightt.png"
                        />{" "}
                      </p>
                      <p className="basic_text2 mb-0 pb-0">
                        {profile?.secondaryMobileVerify ? (
                          <img
                            className="img-fluid img_width_verified"
                            src="../assets/Images/verified.png"
                          />
                        ) : (
                          <img
                            className="img-fluid img_width_verified"
                            src="/assets/Images/unverified.png"
                          />
                        )}{" "}
                        &nbsp;{" "}
                        {profile?.secondaryMobile ? <span>+</span> : null}{" "}
                        {profile?.secondaryMobile} &nbsp;
                        <img
                          className="img-fluid right_icon_style"
                          src="../assets/images/rightt.png"
                        />{" "}
                      </p>
                    </Link>
                  </div>
                </div>
                <hr className="background_line" />
              </div>
            </div>

            {/* Password section  */}
            {/* <div
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
            </div> */}

            {/* Personal documents section  */}
            {/* <div
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
            </div> */}
          </div>
        </div>
      </div>
      {/* </Dashboard> */}
    </div>
  );
};

export default Profile_page;
