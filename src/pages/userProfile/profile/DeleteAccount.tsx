import React, { useEffect, useState } from "react";
import SideBar from "@/Components/components/sidebar";
import { useDispatch, useSelector } from "react-redux";
import { BiChevronLeft } from "react-icons/bi";
import { useRouter } from "next/router";
import { DeleteUserAccount, updateUserNames } from "@/helper";
import { AUTH_ACTIONS } from "@/Redux/Actions/loginPageAction";
import Loader from "@/Components/Loaders/Loader";
import { removeCookie } from "@/utils/utils";

const DeleteAccount = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const isFirstName = router.query === null ? false : router.query.data;
  const { profile } = useSelector((state: any) => state);

  const [name, setName] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setName(profile?.primaryMobile);
  }, [profile?.primaryMobile]);

  const onClickHandler = () => {
    setIsLoading(true);
    DeleteUserAccount(profile?.primaryMobile, profile.modifiedby)
      .then((res) => {
          dispatch({ type: AUTH_ACTIONS.LOGOUT });
          removeCookie && removeCookie("profile");
          localStorage.removeItem("jwtToken");
          localStorage.removeItem("jwtRefreshToken");
          localStorage.clear();
          router.push("/");
      })
      .catch((err) => {
        router.replace({ pathname: "/userProfile/profile/DeleteAccount" });
        console.log(err);
      })
      .finally(() => setIsLoading(false));
  };

  const logoutconfirmation = () => {
    const userConfirmed = window.confirm('Are you sure you want to delete your account?');
    if (userConfirmed) {
      onClickHandler();
    } else {
      console.log('');
    }

  }

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
            <span>Delete Account</span>
          </div>
        </div>
      </div>
      <div className="px-md-5 px-3 " style={{height:"100vh"}}>
        {/* <BiChevronLeft />
        Back */}

        <div className=" border_for_all_pages mt-4">
          <div className="row align-items-center px-3 label_text_profile">
            Delete User Account
          </div>
          <input
            type="text"
            className="border border-0 input_profile_all w-100"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter Email To Delete Account"
          />
        </div>
        {isLoading ? (
          <Loader
            status={isLoading}
            style={{
              marginTop: "30%",
            }}
          />
        ) : (
          <div className="text-end ">
            <button
              className="btn btn-danger button_size_fixed universal_button_color px-4"
              onClick={logoutconfirmation}
            >
              Save Changes
            </button>
          </div>
        )}
      </div>
    </SideBar>
  );
};

export default DeleteAccount;
