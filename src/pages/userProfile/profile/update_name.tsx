import React, { useState } from "react";
import SideBar from "@/Components/components/sidebar";
import { useDispatch, useSelector } from "react-redux";
import { BiChevronLeft } from "react-icons/bi";
import { useRouter } from "next/router";
import { updateUserNames } from "@/helper";
import { AUTH_ACTIONS } from "@/Redux/Actions/loginPageAction";
import Loader from "@/Components/Loaders/Loader";
import { enqueueSnackbar } from "notistack";

const NameUpdate = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const isFirstName = router.query === null ? false : router.query.data;
  const { profile } = useSelector((state: any) => state);
  const [name, setName] = useState(
    isFirstName ? profile?.firstName : profile?.lastName
  );
  const [isLoading, setIsLoading] = useState(false);

  const onClickHandler = () => {
    setIsLoading(true);
    updateUserNames(
      profile.userId,
      isFirstName ? name : profile.firstName,
      isFirstName ? profile.lastName : name,
      profile.userId
    )
      .then((res) => {
        dispatch({
          type: AUTH_ACTIONS.SET_NAMES_BASIC_INFO,
          payload: {
            firstName: isFirstName ? name : profile.firstName,
            lastName: isFirstName ? profile.lastName : name,
          },
        });
        router.replace({ pathname: "/userProfile/profile/" });
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setIsLoading(false));
  };

  const onClickHandlerNew = () => {
    enqueueSnackbar('Please input name!', { variant: 'error' });
  }

  // console.log("name",name )

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
        className="px-4 "
      >
        <div className="row py-2">
          <div className="col-md-6">
            {" "}
            <span>Edit Name</span>
          </div>
        </div>
      </div>
      <div className=" margin_bottom_new " style={{height:"100vh"}}>
        {/* <BiChevronLeft />
        Back */}

        <div className=" border_for_all_pages_new mt-4 " >
          <div className="row align-items-center px-3 label_text_profile">
            {isFirstName ? "First Name" : "Last Name"}
          </div>
          <input
            type="text"
            className="border border-0 input_profile_all"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="JOHN"
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
            
              onClick={name === "" ? onClickHandlerNew:onClickHandler}
            >
              Save Changes
            </button>
          </div>
        )}
      </div>
    </SideBar>
  );
};

export default NameUpdate;
