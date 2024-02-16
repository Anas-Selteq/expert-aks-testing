import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { removeCookie } from "@/utils/utils";
import { AUTH_ACTIONS } from "@/Redux/Actions/loginPageAction";
import { useRouter } from "next/router";
import Layout2 from "../Layout2/Layout2";
import Layout3 from "../Layoutforheader/Layoutforheader";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

interface MyComponentProps {
  children: React.ReactNode;
  activeIndex: number;
}



const drawerDetails = [
  {
    title: "Profile",
    link: "/userProfile/profile/",
    imageLink: "/assets/images/userwhite.png",
  },
  {
    title: "Addresses",
    link: "/userProfile/addressshow/addressshow/",
    imageLink: "/assets/images/cir.png",
  },
  {
    title: "User",
    link: "/userProfile/user/ ",
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
  const { profile } = useSelector((state: any) => state);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const currentURL = router.asPath;
  const endURL = currentURL.split("/").pop();
  const desiredURL = endURL;
  return (
    <div>
      <div className="col-md-12 px-0 overflow_main_dashboard">
        <div className="d-flex">
          {/* <Layout3>
            <div className="main_outer_div text-center">
              <div className="pb-5 pt-2">
                <Link href="#" className="link_icon_style">
                  <img
                    className="img-fluid"
                    src="/svgicons/text-continuous.svg"
                  />
                </Link>
              </div>
              <div className="mb-2">
                <Link href="/userProfile/profile/ " className="link_icon_style">
                  <button
                    className={
                      endURL === "profile"
                        ? "btn btn-danger button_danger_sidebar btn-sm"
                        : "btn btn-white btn-sm non_active"
                    }
                  >
                    {endURL === "profile" ? (
                      <img
                        className="img-fluid"
                        src="/imagess/redicons/userr.png"
                      />
                    ) : (
                      <img className="img-fluid" src="/svgicons/person.svg" />
                    )}
                  </button>
                </Link>
              </div>
              <div className="mb-2">
                <Link
                  href="/userProfile/addressshow/addressshow/ "
                  className="link_icon_style"
                >
                  <button
                    className={
                      endURL === "addresses"
                        ? "btn btn-danger button_danger_sidebar btn-sm"
                        : "btn btn-white btn-sm non_active"
                    }
                  >
                    {endURL === "addresses" ? (
                      <img
                        className="img-fluid"
                        src="/imagess/redicons/locr.png"
                      />
                    ) : (
                      <img
                        className="img-fluid"
                        src="/svgicons/locationn.svg"
                      />
                    )}
                  </button>
                </Link>
              </div>
              <div className="mb-2">
                <Link href="/userProfile/user/ " className="link_icon_style">
                  <button
                    className={
                      endURL === "user"
                        ? "btn btn-danger button_danger_sidebar btn-sm"
                        : "btn btn-white btn-sm non_active"
                    }
                  >
                    {endURL === "user" ? (
                      <img
                        className="img-fluid"
                        src="/imagess/redicons/usersr.png"
                      />
                    ) : (
                      <img className="img-fluid" src="/svgicons/people.svg" />
                    )}
                  </button>
                </Link>
              </div>
              <div className="mb-2">
                <Link href="/AllBookingsNew" className="link_icon_style">
                  <button
                    className={
                      endURL === "bookings"
                        ? "btn btn-danger button_danger_sidebar btn-sm"
                        : "btn btn-white btn-sm non_active"
                    }
                  >
                    {endURL === "bookings" ? (
                      <img
                        className="img-fluid"
                        src="/imagess/redicons/cartr.png"
                      />
                    ) : (
                      <img className="img-fluid" src="/svgicons/cartt.svg" />
                    )}
                  </button>
                </Link>
              </div>
              <div className="mb-2">
                <Link href="/userProfile/settings" className="link_icon_style">
                  <button
                    className={
                      endURL === "settings"
                        ? "btn btn-danger button_danger_sidebar btn-sm"
                        : "btn btn-white btn-sm non_active"
                    }
                  >
                    {endURL === "settings" ? (
                      <img
                        className="img-fluid"
                        src="/imagess/redicons/settingsr.png"
                      />
                    ) : (
                      <img className="img-fluid" src="/svgicons/settings.svg" />
                    )}
                  </button>
                </Link>
              </div>
              <div className="mb-2">
                <Link href="/userProfile/payment" className="link_icon_style">
                  <button

                    className={
                      endURL === "payment"
                        ? "btn btn-danger button_danger_sidebar btn-sm"
                        : "btn btn-white btn-sm non_active"
                    }
                  >
                    {endURL === "payment" ? (
                      <img
                        className="img-fluid"
                        src="/imagess/redicons/paymentr.png"
                      />
                    ) : (
                      <img className="img-fluid" src="/svgicons/payment.svg" />
                    )}
                  </button>
                </Link>
              </div>
              <div className="mb-2">
                <button
                  onClick={handleShow}
                  className={
                    endURL === "signout"
                      ? "btn btn-danger button_danger_sidebar btn-sm"
                      : "btn btn-white btn-sm non_active"
                  }
                >
                  {endURL === "signout" ? (
                    <img
                      className="img-fluid"
                      src="/imagess/redicons/signoutr.png"
                    />
                  ) : (
                    <img className="img-fluid" src="/svgicons/sign-out.svg" />
                  )}
                </button>
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
          </Layout3> */}
          {/* Content here-------------------------------------  */}
          <div className="w-100 children_overflow " id="style-2">
            <Layout2>{children}</Layout2>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SideBar;
