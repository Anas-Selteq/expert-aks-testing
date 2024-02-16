import React, { useEffect, useState } from "react";
import Image from "next/image";
import { BiChevronLeft } from "react-icons/bi";
import SideBar from "@/Components/components/sidebar";
import VerifyManagedMobile from "@/Components/auth/verify_mobile";
import ManagePhones from "@/Components/components/manage_phones";
import "react-phone-input-2/lib/style.css";
import { VerificationAction, resendOTPCodeSecondary } from "@/helper";
import { useDispatch, useSelector } from "react-redux";
import AddSecondaryMobileNumber from "@/Components/components/add_secondary_mobile";
import { AUTH_ACTIONS } from "@/Redux/Actions/loginPageAction";
import { GoogleReCaptcha } from "react-google-recaptcha-v3";
import { useRouter } from "next/router";
import Managelistmobile from "./Managelistmobile";

const ManageMobiles = () => {
  const { profile } = useSelector((state: any) => state);
  const router = useRouter();
  const [isSecondaryPhoneUpdate, setIsSecondaryPhoneUpdate] = useState(false);
  const [isGettingPhoneNumber, setIsGettingPhoneNumber] = useState(false);
  const [isVerifyPhone, setIsVerifyPhone] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [authToken, setAuthToken] = React.useState("");
  const [tokenRefresh, setTokenRefresh] = React.useState(false);
  const [seconds, setSeconds] = useState(60);
  const [success, setSuccess] = useState<any>(false);
  const [resend, Setresend] = useState<any>(true);
  const [loader, setLoader] = useState(false);
  const [otp, setOtp] = useState("");
  const [loadToken, setLoadToken] = React.useState(false);
  const [errorMessage, setErrorMessage] = useState({});
  const dispatch = useDispatch();

  const onNumberSaveChangeHandler = (phoneNum: any) => {
    setPhoneNumber(phoneNum);
    setIsVerifyPhone(true);
  };

  const handleClick = (e: any) => {
    e.preventDefault();
    setLoader(true);
    setErrorMessage({ type: false, message: "" });
    // alert(phoneNumber);
    VerificationAction(profile.userId, otp, `+${phoneNumber}`)
      .then((result) => {
        if (result?.statusCode === 0) {
          dispatch({
            type: AUTH_ACTIONS.UPDATE_SECONDARY_MOBILE,
            payload: {
              secondaryMobile: `+${phoneNumber}`,
              secondaryMobileVerify: true,
            },
          });
          router.replace("/userProfile/profile");
        } else {
          setErrorMessage({ type: false, message: result?.message });
        }
      })
      .catch((e) => alert(e))
      .finally(() => setLoader(false));
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSeconds((seconds) => {
        const newSeconds = seconds - 1;
        if (newSeconds <= 0) {
          setSuccess(false);
          Setresend(true);
          setSeconds(60);
          return 0;
        }
        return newSeconds;
      });
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const resendHandler = () => {
    setLoader(true);
    resendOTPCodeSecondary(Number(profile?.userId), authToken).then(
      (result) => {
        Setresend(false);
        setLoader(false);
        setErrorMessage({
          type: true,
          message:
            result?.message == "Successfully"
              ? "Code Sent! Please check your mobile."
              : result?.message,
        });
        setSuccess(true);
      }
    );
  };

  // /////////////////////////  functions
  React.useEffect(() => {
    const interval = setInterval(() => {
      setLoadToken(!loadToken);
    }, 20000);
    return () => clearInterval(interval);
  }, [loadToken]);

  const handleToken = React.useCallback((token: any) => {
    setAuthToken(token);
  }, []);

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
            <span>Manage Mobile Number</span>
          </div>
        </div>
      </div>
      <div>
        <div className="col-md-12 mt-4" style={{height:"100vh"}}>
          {isVerifyPhone ? (
            <>
              {!authToken && <GoogleReCaptcha onVerify={handleToken} />}
              
            </>
          ) : (
            <>
              <div
                style={{
                  backgroundColor: "#f8fafc",
                  borderRadius: "1rem",
                  padding: "1rem 0 1rem 0",
                }}
              >
                 <div className="margin_bottom_new">
                    <div className="col-md-12 px-0  ">
                      <Managelistmobile />
                    </div>
                  </div>
              </div>
            </>
          )}
        </div>
        <div className="col-md-12 px-md-5 px-3 text-end">
          <button
           
            className="btn btn-danger button_for_email_page"
            // onClick={
            //   () => {}
            //   // isPrimaryEmailUpdate || isSecondaryEmailUpdate || isInvoiceEmailUpdate ? onVerifyEmailHandler:onPrimaryClickHandler
            // }
          >
            Save & Continue
          </button>
        </div>
      </div>
    </SideBar>
  );
};
export default ManageMobiles;
