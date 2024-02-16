import React from "react";
import SideBar from "@/Components/components/sidebar";
import Link from "next/link";
import { Router, useRouter } from "next/router";

const Settings = () => {
  const router = useRouter();
  const new_passowrd = () =>
  {
      router.push("/userProfile/profile/UpdateUserPassword");
  }
  return (
    <SideBar activeIndex={4}>
      <div className="col-md-12 text-center  margin_bottom_new mt-5" style={{ height: "100vh" }}>
        <div className="col-md-12 profile_cards ">
          <img
            className="img-fluid pb-md-3  icon_size_cards_in_mobile"
            src="/imagess/set.png"
          />
          <Link
            href="/userProfile/profile/DeleteAccount"
            className="style_a_tag"
          >
            <div className="mt-1 mt-md-0">Delete <span className="on_pc_screeen">Account</span></div>
          </Link>
        </div>
        <div className="col-md-12 profile_cards mt-4 ">
          <img
            className="img-fluid pb-md-3  icon_size_cards_in_mobile"
            src="/imagess/set.png"
          />
          <Link
            href="/userProfile/profile/UpdateUserPassword"
            className="style_a_tag"
          >
            <div className="mt-1 mt-md-0">Update Passowrd</div>
          </Link>
        </div>
      </div>
    </SideBar>
  );
};

export default Settings;

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
            </div> */
}
