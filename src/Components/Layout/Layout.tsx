// components/Layout.js
import React from "react";
import Header from "../Header/Header";
import GlobalStyles from "../../styles/Global";
import { useDispatch, useSelector } from "react-redux";
import { getCookie } from "../../utils/utils";
import { AUTH_ACTIONS } from "@/Redux/Actions/loginPageAction";

export const Layout = ({ children }: { children: any }) => {
  const { message, loading, profile } = useSelector((state: any) => state);
  const dispatch = useDispatch();

  // React.useEffect(() => {
  //   let userProfile = getCookie("profile");
  //   if (userProfile) {
  //     dispatch({
  //       type: AUTH_ACTIONS.SET_PROFILE,
  //       payload: JSON.parse(userProfile),
  //     });
  //   }
  // }, [dispatch]);
  React.useEffect(() => {
    let userProfile = getCookie("profile");
    if (userProfile) {
      try {
        dispatch({
          type: AUTH_ACTIONS.SET_PROFILE,
          payload: JSON.parse(userProfile),
        });
      } catch (error) {
        console.error("Error parsing user profile:", error);
        // You might want to handle this error gracefully, e.g., show an error message.
      }
    }
  }, [dispatch]);
  return (
    <div>
      <GlobalStyles />
      <Header profile={profile} />
      {children}
    </div>
  );
};
