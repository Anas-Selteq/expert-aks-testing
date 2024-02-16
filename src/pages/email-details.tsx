import React, { useEffect, useState } from "react";
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
  getUserDetail,
  updateUserImage,
  uploadUserImage,
  VerifyUserEmailAction,
  VerifyUserEmailSecondaryAction,
} from "@/helper";
import ImageUploadCard from "@/Components/UploadAvatar/UploadAvatar";
import { useDispatch, useSelector } from "react-redux";
import { AUTH_ACTIONS } from "@/Redux/Actions/loginPageAction";
import { removeCookie } from "@/utils/utils";

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

  useEffect(() => {
    getUserDetail(8).then((res) => {
      setProfileData(res?.result);
    });
  }, []);

  const handleEmailClick = () => {
    // if profile.email is verified --> just go
    // : send otp sms and on success --> go to otp page:
    VerifyUserEmailAction({ userId: profile.userId, type: 1 }).then((resp) => {
      console.log("---- response send email otp ---------");

      console.log(resp);
      console.log("---- response send email otp ---------");
      router.push("/email-verification-code");
    });
  };

  const handleEmailClickSecondary = () => {
    // if profile.email is verified --> just go
    // : send otp sms and on success --> go to otp page:
    VerifyUserEmailSecondaryAction({ userId: profile.userId, type: 2 }).then(
      (resp) => {
        console.log("---- response send email otp ---------");

        console.log(resp);
        console.log("---- response send email otp ---------");
        router.push("/secondary-email-verify");
      }
    );
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
  console.log("value-----------", selectedOption);
  console.log("value-----------", value);
  console.log("profile-----------", profile);
  return (
    <div className="col-md-12 bg-white">
      {/* <Dashboard sidebar={sideMenu}> */}
      <div className="container total_height_dashboard mt-1 pt-4 pb-5">
        <div className="row">
          {/* Sidenavigation code  */}
          <div className="col-md-3 side_nav_hide ">
            <div className="col-md-12 pr-5">
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
          </div>
          {/* Main content code  */}
          <div className="col-md-9 ">
            {/* Profile code section  */}
            <div
              className="col-md-12 px-5  pb-4 border_profile "
              style={{ borderRadius: "8px" }}
            >
              <div className="row pt-4">
                <div className="col-md-6 m-auto">
                  <h6>Manage Emails</h6>
                  <h6 className="text_des_email">
                    Don&#39;t worry, your information is private and we will not
                    share this info with anyone outside Expert!
                  </h6>
                </div>
                <div className="col-md-6 text-end">
                  <img
                    className="img-fluid"
                    src="../assets/Images/sidebanner.png"
                  />
                </div>
              </div>
            </div>

            {/* Email info section  */}
            <div
              className="col-md-12 px-5  pb-4 border_profile mt-4"
              style={{ borderRadius: "8px" }}
            >
              {/* ---------------------------------- Primary Details ------------------------------------ */}
              <div className="col-md-12 pt-3">
                <div className="col-md-12 ">
                  <h6 className="email_font_screen">
                    Expert Account Mobile Number
                  </h6>
                </div>
                <div className="col-md-12 ">
                  <h6 className="email_font_screen_sub">
                    The email used to identify your expert account to you. You
                    can&#39;t change this address.
                  </h6>
                </div>

                <div className="row">
                  <div className="col-md-6 m-auto   ">
                    <p
                      onClick={(e) =>
                        !profile?.primaryEmailVerify && handleEmailClick()
                      }
                      className="basic_text1 mb-0 pb-0 "
                    >
                      {" "}
                      {profile?.primaryEmail}
                    </p>
                  </div>
                  <div className="col-md-6 text-end">
                    {/* <p className="basic_text2 mb-0 pb-0">dummy@gmail.com</p>
                    <p className="basic_text2 mb-0 pb-0">dummy1@gmail.com</p> */}
                    {/* <Link> */}
                    <p
                      className="basic_text2 mb-0 pb-0"
                      onClick={(e) =>
                        !profile?.primaryEmailVerify && handleEmailClick()
                      }
                    >
                      {profile?.primaryEmailVerify ? (
                        <img
                          onClick={(e) =>
                            !profile?.primaryEmailVerify && handleEmailClick()
                          }
                          className="img-fluid img_width_verified"
                          src="/assets/Images/verified.png"
                        />
                      ) : (
                        <img
                          className="img-fluid img_width_verified"
                          src="/assets/Images/unverified.png"
                        />
                      )}{" "}
                    </p>
                    {/* </Link> */}
                  </div>
                </div>

                <hr className="background_line" />
              </div>

              {/* ---------------------------------- Secondary Details ------------------------------------ */}
              <div className="col-md-12 pt-3">
                <div className="col-md-12 ">
                  <h6 className="email_font_screen">Secondary Email</h6>
                </div>
                <div className="col-md-12 ">
                  <h6 className="email_font_screen_sub">
                    The email where expert can contact you if there&#39;s
                    unusual activity in your account.
                  </h6>
                </div>
                {/* <Link href="/edit-email-profile" className="style_a_tag"> */}
                {profile?.secondaryEmail ? (
                  <div className="row">
                    <div className="col-md-6 m-auto   ">
                      <p
                        className="basic_text1 mb-0 pb-0 "
                        onClick={(e) =>
                          !profile?.secondaryEmailVerify &&
                          handleEmailClickSecondary()
                        }
                      >
                        {" "}
                        {profile?.secondaryEmail}
                      </p>
                    </div>
                    <div className="col-md-6 text-end">
                      {/* <p className="basic_text2 mb-0 pb-0">dummy@gmail.com</p>
                        <p className="basic_text2 mb-0 pb-0">dummy1@gmail.com</p> */}
                      {/* <Link> */}
                      <p className="basic_text2 mb-0 pb-0">
                        {profile?.secondaryEmailVerify ? (
                          <img
                            className="img-fluid img_width_verified"
                            src="/assets/Images/verified.png"
                          />
                        ) : (
                          <img
                            className="img-fluid img_width_verified"
                            src="/assets/Images/unverified.png"
                          />
                        )}
                      </p>
                      {/* </Link> */}
                    </div>
                  </div>
                ) : (
                  <Link href="/add-secondary-email">
                    <h6 className="recovery_text_red">Add Secondary Email</h6>
                  </Link>
                )}
                {/* </Link> */}
                <hr className="background_line" />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* </Dashboard> */}
    </div>
  );
};

export default Profile_page;
