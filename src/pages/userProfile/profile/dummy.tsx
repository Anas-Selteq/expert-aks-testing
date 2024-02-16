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

const Profile_page = () => {
  const router = useRouter();
  const { profile } = useSelector((state: any) => state);
  const [profileData, setProfileData] = useState<any>([]);
  const [loader, setLoader] = React.useState(false);
  const [imageUrl, setImageUrl] = React.useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [value, setValue] = useState("");
  const dispatch = useDispatch();
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
            <span>Manage Profile</span>
          </div>
        </div>
      </div>
      <div className="w-100">
        <div
          className="px-md-5 pb-4 px-3 border_profile mb-5 pb-5 "
          style={{ borderRadius: "8px" }}
        >
          {/* image show section  */}
          <div className="col-md-12 border_for_all_pages mt-4">
            <div className="row">
              <div className="col-md-6">
                <div className="row">
                  <div className="col-md-2 col-5">
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
                  <div className="col-md-10 col-7 px-4 text-left m-auto">
                    <p className="heading_name_profile mb-0 pb-0 pt-4">
                      Hi, {profile?.firstName} {profile?.lastName}
                    </p>
                    <p className="subheading_profile m-0 py-1">
                      Personal Account
                    </p>
                    <p className="subheading_profile pt-0">{`ID ${profile?.userId}`}</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 text-end m-auto">
                <Link
                  href="/userProfile/profile/switch_account"
                  className="style_a_tag"
                >
                  <BiDotsVertical />
                </Link>
              </div>
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
                inputValue={profile?.firstName}
                showIcon={true}
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
                inputValue={profile?.lastName}
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
                  inputValue={profile?.primaryEmail}
                  showIcon={true}
                  showVerify={true}
                  verifiedOrNot={profile?.primaryEmailVerify}
                />
              </Link>
              <hr className="background_line" />
              <Link
                href="/userProfile/profile/manage_email"
                className="style_a_tag"
              >
                <CustomInput
                  label="Secondary Email"
                  inputValue={profile?.secondaryEmail}
                  showIcon={true}
                  showVerify={true}
                  verifiedOrNot={profile?.secondaryEmailVerify}
                />
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
                  inputValue={profile?.primaryMobile}
                  showIcon={true}
                  showVerify={true}
                  verifiedOrNot={profile?.primaryMobileVerify}
                />
              </Link>
              <hr className="background_line" />
              <Link
                href="/userProfile/profile/manage_mobiles"
                className="style_a_tag"
              >
                <CustomInput
                  label="Secondary Number"
                  inputValue={profile?.secondaryMobile}
                  showIcon={true}
                  showVerify={true}
                  verifiedOrNot={profile?.secondaryMobileVerify}
                />
              </Link>
            </div>
          </div>

          {/* Additional info section  */}
          <div className="pb-4">
            <div className="pt-1">
              <p className="basic_text">
                {" "}
                <img className="img-fluid" src="/imagess/info.png" />
                &nbsp;Additional Info
              </p>
            </div>
            <div className="border_for_all_pages">
              <Link
                href="/userProfile/profile/update_gender"
                className="style_a_tag"
              >
                <CustomInput
                  label="Gender"
                  inputValue={
                    profile?.genderId === 1003
                      ? "Male"
                      : profile?.genderId === 1004
                      ? "Female"
                      : "Other"
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
                  inputValue={formatDate(profile?.dob)}
                  showIcon={true}
                />
              </Link>
            </div>
          </div>

          {/* Cards section  */}
          <div className="row">
            <div className="col-md mt-2">
              <div className="col-md-12 profile_cards">
                <Link href="/userProfile/addressshow/addressshow/" className="style_a_tag">
                  <img className="img-fluid pb-3  " src="/imagess/loc.png" />
                  <div>Addresses</div>
                </Link>
              </div>
            </div>
            <div className="col-md mt-2">
              <div className="col-md-12 profile_cards">
                <img className="img-fluid pb-3  " src="/imagess/cart.png" />
                <Link
                  href="/userProfile/bookings/bookings"
                  className="style_a_tag"
                >
                  <div>Orders</div>
                </Link>
              </div>
            </div>
            <div className="col-md mt-2">
              <div className="col-md-12 profile_cards">
                <img className="img-fluid pb-3  " src="/imagess/clip.png" />
                <Link
                  href="/userProfile/bookings/bookings"
                  className="style_a_tag"
                >
                  <div>Bookings</div>
                </Link>
              </div>
            </div>
            <div className="col-md mt-2">
              <div className="col-md-12 profile_cards">
                <img className="img-fluid pb-3  " src="/imagess/set.png" />
                <Link
                  href="/userProfile/settings/settings"
                  className="style_a_tag"
                >
                  <div>Settings</div>
                </Link>
              </div>
            </div>
            <div className="col-md mt-2"></div>
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
                    Login and Security
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
              onMouseEnter={(e: any) => {
                setButtonColorOnHover("lightgrey");
                setButtonHoverCursor("pointer");
              }}
              onMouseLeave={(e: any) => {
                setButtonColorOnHover("white");
                setButtonHoverCursor("auto");
              }}
              onClick={(e: any) => {
                dispatch({ type: AUTH_ACTIONS.LOGOUT });
                removeCookie && removeCookie("profile");
              }}
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
                    Sign out
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
      </div>
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
