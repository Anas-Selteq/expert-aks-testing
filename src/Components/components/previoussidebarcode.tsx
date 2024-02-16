import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { removeCookie } from "@/utils/utils";
import { AUTH_ACTIONS } from "@/Redux/Actions/loginPageAction";

interface MyComponentProps {
  children: React.ReactNode;
  activeIndex: number;
}

const drawerDetails = [
  {
    title: "Profile",
    link: "/userProfile/profile/ ",
    imageLink: "/assets/images/userwhite.png",
  },
  {
    title: "Addresses",
    link: "/userProfile/addressshow/addressshow/ ",
    imageLink: "/assets/images/cir.png",
  },
  {
    title: "User",
    link: "/userProfile/user/",
    imageLink: "/assets/images/box.png",
  },
  {
    title: "Bookings",
    link: "/AllBookingsNew",
    imageLink: "/assets/images/box.png",
  },
  {
    title: "Settings",
    link: "/userProfile/settings",
    imageLink: "/assets/images/set.png",
  },
  {
    title: "Payments",
    link: "/userProfile/payment",
    imageLink: "/assets/images/visa.png",
  },
];

const SideBar: React.FC<MyComponentProps> = ({ activeIndex = 0, children }) => {
  const dispatch = useDispatch();
  return (
    <>
      <div className="bg-white p-5 d-flex">
        {/* side navigation for pc  */}
        <div className="me-5 pe-5 side_nav_hide">
          {drawerDetails.map((item, index) => (
            <Link
              href={item.link}
              key={index}
              style={{
                textDecoration: "none",
                color: activeIndex === index ? "white" : "black",
              }}
            >
              <div
                className={` mt-4 ${
                  index === activeIndex
                    ? "background_color_sidebar"
                    : "background_color_sidebar_one"
                } px-4 py-2`}
              >
                <Image
                  className="img-fluid image_icon_width"
                  src={item.imageLink}
                  alt="Addresses"
                  height={25.8}
                  width={25.8}
                  style={{
                    filter: activeIndex === index ? "invert(100%)" : "none",
                  }}
                />{" "}
                {item.title}
              </div>
            </Link>
          ))}
          <div
            onClick={(e) => {
              dispatch({ type: AUTH_ACTIONS.LOGOUT });
              removeCookie && removeCookie("profile");
              localStorage.removeItem("jwtToken");
              localStorage.removeItem("jwtRefreshToken");
            }}
            className="mt-4 background_color_sidebar_one px-4 py-2"
          >
            <Link href="/" className="style_a_tag">
              <Image
                className="img-fluid image_icon_width"
                src="/assets/images/out.png"
                alt="Logout"
                height={25.8}
                width={25.8}
              />{" "}
              Logout
            </Link>
          </div>
        </div>
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
                  localStorage.removeItem("jwtToken");
                  localStorage.removeItem("jwtRefreshToken");
                }}
                className="btn btn-danger mt-2"
              >
                Logout
              </button>
            </Link>
          </div>
        </div>
        <div className="w-100">{children}</div>
      </div>
    </>
  );
};
export default SideBar;
