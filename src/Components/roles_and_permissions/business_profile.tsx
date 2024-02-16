import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import {
  BiChevronRight,
  BiFile,
  BiGlobe,
  BiGroup,
  BiHome,
  BiMobile,
  BiUser,
} from "react-icons/bi";
import Link from "next/link";
import CustomInput from "../Input/input_field";
import { formatDate, removeCookie } from "@/utils/utils";
import { useDispatch } from "react-redux";
import { AUTH_ACTIONS } from "@/Redux/Actions/loginPageAction";

const BusinessProfile = ({ business }: { business: any }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  return (
    <div>
      {/* <div className="p-5 d-flex flex-column align-items-center">
        <div className="d-flex flex-column align-items-center">
          <Image
            src={
              business.businessLogo ??
              "https://1864597015.rsc.cdn77.org/newexpertpreprod/Images/avatar.png"
            }
            alt="Selected"
            height={150}
            width={150}
            className="rounded-circle"
          />
          <span className="fs-5">{business.businessName}</span>
          <span className="fs-6 text-secondary text-opacity-25">
            Business Account
          </span>
          <span className="fs-6 text-secondary text-opacity-25">
            Account ID {business.businessId}
          </span>
        </div>
        <div className="w-100">
          <div className="d-flex align-items-center text-secondary text-opacity-75">
            <BiUser className="me-2" /> Name
          </div>
          <div className="d-flex justify-content-between align-items-center rounded bg-secondary bg-opacity-10 py-2 px-4 my-2">
            <div className="d-flex flex-column">
              <span className="text-secondary text-opacity-25 fs-6">
                Business Name
              </span>
              <span className="fs-5">{business.businessName}</span>
            </div>
            <BiChevronRight />
          </div>
          <div className="d-flex align-items-center text-secondary text-opacity-75">
            <BiHome className="me-2" /> Business Type
          </div>
          <div className="d-flex justify-content-between align-items-center rounded bg-secondary bg-opacity-10 py-2 px-4 my-2">
            <div className="d-flex flex-column">
              <span className="text-secondary text-opacity-25 fs-6">
                Business Type
              </span>
              <span className="fs-5">{business.businessType}</span>
            </div>
            <BiChevronRight />
          </div>
          <div className="d-flex align-items-center text-secondary text-opacity-75">
            <BiMobile className="me-2" /> Business Number
          </div>
          <div className="d-flex justify-content-between align-items-center rounded bg-secondary bg-opacity-10 py-2 px-4 my-2">
            <div className="d-flex flex-column ">
              <span className="text-secondary text-opacity-25 fs-6">
                Business Number
              </span>
              <span className="fs-5">{business.businessNumber}</span>
            </div>
            <BiChevronRight />
          </div>
          <div className="d-flex align-items-center text-secondary text-opacity-75">
            <BiGlobe className="me-2" /> Website
          </div>
          <div className="d-flex justify-content-between align-items-center rounded bg-secondary bg-opacity-10 py-2 px-4 my-2">
            <div className="d-flex flex-column ">
              <span className="text-secondary text-opacity-25 fs-6">
                Website
              </span>
              <span className="fs-5">{business.businessWebsite}</span>
            </div>
            <BiChevronRight />
          </div>
        </div>
      </div>
      <div className="bg-secondary bg-opacity-25 px-3 py-2">
        <div className="d-flex justify-content-between align-items-center bg-light rounded px-4 py-2"  onClick={()=>router.push("/userProfile/profile/add_user")}>
          <div className="d-flex align-items-center">
            <BiGroup className="text-secondary text-opacity-50 me-2" />
            <span>Add User</span>
          </div>
          <BiChevronRight />
        </div>
        <div className="d-flex justify-content-between align-items-center bg-light rounded px-4 py-2 mt-2">
          <div className="d-flex align-items-center">
            <BiFile className="text-secondary text-opacity-50 me-2" />
            <span>Documents</span>
          </div>
          <BiChevronRight />
        </div>
      </div> */}
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
            <span>Business Profile</span>
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
              <div className="col-md-6 ">
                <div className="row">
                  <div className="col-md-2 col-5 m-auto text-end pt-3">
                    <Image
                      src={
                        business.businessLogo ??
                        "https://1864597015.rsc.cdn77.org/newexpertpreprod/Images/avatar.png"
                      }
                      alt="Selected"
                      height={80}
                      width={80}
                      className="rounded-circle"
                    />
                    {/* <button className="btn btn-danger btn-sm ">A</button> */}
                    <img
                      className="img-fluid button_style"
                      src="/imagess/redicons/cam.png"
                    />
                  </div>
                  <div className="col-md-10 col-7 px-md-4 text-left pt-2">
                    <p className="heading_name_profile mb-0 pb-1 pt-4">
                      Hi, {business.businessName}
                    </p>
                    <p className="subheading_profile m-0 pt-1">
                      Business Account
                    </p>
                    <p className="subheading_profile pt-0 p-0">
                      {" "}
                      Account ID {business.businessId}
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 text-end m-auto">
                {/* <Link
                  href="/userProfile/profile/switch_account"
                  className="style_a_tag"
                >
                  <BiDotsVertical className="icon_color_every" />
                </Link> */}
              </div>
            </div>
          </div>

          {/* First/LastName section  */}
          <div className="pt-4">
            <p className="basic_text">
              <img className="img-fluid" src="/svgicons/person.svg" />
              Business Name
            </p>
          </div>
          <div className="border_for_all_pages">
            <CustomInput
              label="First Name"
              inputValue={business?.businessName}
              showIcon={true}
            />
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
                inputValue={business?.businessName}
                showIcon={true}
              />
            </Link>
          </div>

          {/* Show Email Section  */}
          <div className="pb-4 ">
            <div className="pt-4">
              <p className="basic_text">
                {" "}
                <img
                  className="img-fluid"
                  src="/imagess/redicons/home.png"
                />{" "}
                Business Type
              </p>
            </div>
            <div className="border_for_all_pages">
              <Link
                href="/userProfile/profile/manage_email"
                className="style_a_tag"
              >
                <CustomInput
                  label="Business Type"
                  inputValue={business?.businessType}
                  showIcon={true}
                  showVerify={true}
                />
              </Link>
            </div>
          </div>

          {/* Mobile Show section   */}
          <div className="pb-4">
            <div className="pt-1">
              <p className="basic_text">
                {" "}
                <img
                  className="img-fluid"
                  src="/imagess/redicons/call.png"
                />{" "}
                Business Number
              </p>
            </div>
            <div className="border_for_all_pages">
              <Link
                href="/userProfile/profile/manage_mobiles"
                className="style_a_tag"
              >
                <CustomInput
                  label="Business Number"
                  inputValue={business?.businessNumber}
                  showIcon={true}
                  showVerify={true}
                />
              </Link>
            </div>
          </div>

          {/* Additional info section  */}
          <div className="pb-4">
            <div className="pt-1 pb-3 ">
              <span className="basic_text">
                {" "}
                <img className="img-fluid " src="/imagess/redicons/web.png" />
                &nbsp;
              </span>
              <span className="img_small basic_text">Website</span>
            </div>
            <div className="border_for_all_pages">
              <CustomInput
                label="Website"
                inputValue={business?.businessWebsite}
                showIcon={true}
              />
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
                {/* <Link
                    href="/userProfile/settings/settings"
                    className="style_a_tag"
                  > */}
                <div className="mt-1 mt-md-0">Settings</div>
                {/* </Link> */}
              </div>
            </div>
            <div className="col-md col-3  px-md-3 px-1 mt-2">
              <div className="col-md-12 profile_cards">
                <img
                  className="img-fluid pb-md-3  icon_size_cards_in_mobile"
                  src="/imagess/set.png"
                />
                <Link
                  href="/userProfile/profile/DeleteAccount"
                  className="style_a_tag"
                >
                  <div className="mt-1 mt-md-0">Delete </div>
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
      </div>
    </div>
  );
};

export default BusinessProfile;
