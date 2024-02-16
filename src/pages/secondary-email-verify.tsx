import Img from "@/Components/Image/Image";
import { LoginContainer } from "@/styles/Container.styled";
import { Flex, Item } from "@/styles/Flex.styled";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import { CopyRight } from "@/styles/CopyRight.styled";
import { Button } from "@/styles/Button.style";
import { FAECodeInput } from "@/Components/VerificationInput/VerificationInput";
import {
  EmailVerificationAction,
  resendSecondaryEmailOTPCode,
  VerificationAction,
} from "@/helper";
import { Message } from "@/styles/message.style";
import Loader from "@/Components/Loaders/Loader";
import {
  GoogleReCaptchaProvider,
  GoogleReCaptcha,
} from "react-google-recaptcha-v3";
import { useDispatch, useSelector } from "react-redux";
import { AUTH_ACTIONS } from "@/Redux/Actions/loginPageAction";
import ReactCodeInput from "react-code-input";
function EmailVerificationCode() {
  const router = useRouter();
  const [loader, setLoader] = React.useState(false);
  const { profile } = useSelector((state: any) => state);
  const [errorMessage, setErrorMessage] = React.useState({
    type: false,
    message: "",
  });
  const [authToken, setAuthToken] = React.useState("");
  const [tokenRefresh, setTokebRefresh] = React.useState(false);
  const [loadToken, setLoadToken] = React.useState(false);
  const [seconds, setSeconds] = useState(60);
  const [success, setSuccess] = useState<any>(false);
  const [resend, Setresend] = useState<any>(true);
  const dispatch = useDispatch();
  const [otp, setOTP] = useState("");
  const query = router.query;
  const { userId, email } = query || {};
  const myref = useRef(null);

  // const handlesecondarymail = (e: any) => {
  //   console.log("---- otp change handler ----");
  //   console.log(e.target.value);
  //   console.log("---- otp change handler ----");
  //   setOTP(e.target.value);
  // };

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

  const handleClick = (e: any) => {
    e.preventDefault();
    setLoader(true);
    EmailVerificationAction(
      otp,
      email || profile.secondaryEmail,
      profile.userId
    ).then((result) => {
      if (result?.statusCode === 0) {
        router.push({ pathname: "/profile", query: { userId } });
        dispatch({
          type: AUTH_ACTIONS.UPDATE_SECONDARY_EMAIL,
          payload: { secondaryEmailVerify: true },
        });
        // go to home page
      } else {
        setErrorMessage({ type: false, message: result?.message });
      }
    });
  };

  console.log("otpotpotpotp", otp);

  const resendHandler = () => {
    setLoader(true);
    // console.log("---ref");
    // console.log(myref.current);
    // setOTP("");
    // alert("called");
    // return;
    resendSecondaryEmailOTPCode(Number(userId || profile?.userId)).then(
      (result) => {
        setLoader(false);
        Setresend(false);
        setErrorMessage({
          type: true,
          message:
            result?.message == "Successfully"
              ? "Code Sent! Please check your gmail account."
              : result?.message,
        });
        setSuccess(true);
      }
    );
  };

  React.useEffect(() => {
    const interval = setInterval(() => {
      setLoadToken(!loadToken);
    }, 20000);
    return () => clearInterval(interval);
  }, [loadToken]);
  // /////////////////////////  functions
  const handleToken = React.useCallback(
    (token: any) => {
      setAuthToken(token);
    },
    [loadToken]
  );
  console.log("profile-----------", profile);
  return (
    <>
      <GoogleReCaptcha onVerify={handleToken} refreshReCaptcha={tokenRefresh} />
      <div className="container mt-5 mb-4">
        <div className="col-md-12 backgroundsignup">
          <div className="row">
            <div className="col-md-4 bg_image_signup bg-light">
              <div className="col-md-12 text-center   background_image_new d-flex align-items-center  h-100 justify-content-center">
                <img
                  className="img-fluid img_width_signup"
                  src={`https://1864597015.rsc.cdn77.org/newexpertpreprod/Images/logoOnbanner.png`}
                />
              </div>
            </div>
            <div className="col-md-8  m-auto">
              <div className="col-md-12 text-end px-3 pb-5">
                <button className="btn btn-light btn-sm rounded-pill color_light_font">
                  Skip
                </button>
              </div>
              <form onSubmit={handleClick}>
                <h3
                  style={{
                    margin: " 0 0 5.8px",
                    fontFamily: "Poppins",
                    fontSize: "30px",
                    fontWeight: "600",
                    fontStretch: "normal",
                    fontStyle: "normal",
                    lineHeight: "normal",
                    letterSpacing: "normal",
                    textAlign: "center",
                    color: "#22272e",
                  }}
                >
                  Email <span style={{ color: "#dc0000" }}>Verification</span>
                </h3>
                <p
                  style={{
                    margin: "0.6px 33px 40px 0.9px",
                    fontFamily: "Poppins",
                    fontSize: "14px",
                    fontWeight: "normal",
                    fontStretch: "normal",
                    fontStyle: "normal",
                    lineHeight: "normal",
                    letterSpacing: "normal",
                    textAlign: "center",
                    color: "#757677",
                  }}
                >
                  Enter the code that was sent to
                </p>
                <p
                  style={{
                    fontSize: "16px",
                    fontWeight: 600,
                    letterSpacing: "normal",
                    textAlign: "center",
                    color: "#444",
                  }}
                >
                  {email || profile?.secondaryEmail || "email id is missed"}
                </p>
                <FAECodeInput
                  id="pinCode"
                  value={otp}
                  type="text"
                  isValid={true}
                  fields={6}
                  onChange={setOTP}
                  name="pinCode"
                  inputMode="numeric"
                  // value={pinCode}
                />
                {/* <input
                  id="pinCode"
                  value={otp}
                  type="number"
                  onChange={handlesecondarymail}
                  name="pinCode"
                  inputMode="numeric"
                /> */}
                {/* <ReactCodeInput
                
                  // value={pinCode}
                /> */}
                <p
                  style={{
                    fontSize: "14px",
                    textAlign: "center",
                    color: "#a9a9a9",
                  }}
                >
                  Having problem?
                </p>
                {resend ? (
                  <button
                    style={{
                      margin: "auto",
                      display: "block",
                      background: "initial",
                      border: "0px",
                      outline: "initial",
                      fontSize: "14px",
                      fontWeight: "600",
                      textAlign: "center",
                      cursor: "pointer",
                      color: "#db0406",
                    }}
                    type="button"
                    onClick={resendHandler}
                  >
                    Resend Code
                  </button>
                ) : (
                  <button
                    disabled
                    style={{
                      margin: "auto",
                      display: "block",
                      background: "initial",
                      border: "0px",
                      outline: "initial",
                      fontSize: "14px",
                      fontWeight: "600",
                      textAlign: "center",
                      cursor: "wait",
                      color: "gray",
                    }}
                    type="button"
                    onClick={resendHandler}
                  >
                    Resend Code
                  </button>
                )}
                {/* <button
                  style={{
                    margin: "auto",
                    display: "block",
                    background: "initial",
                    border: "0px",
                    outline: "initial",
                    fontSize: "14px",
                    fontWeight: "600",
                    textAlign: "center",
                    cursor: "pointer",
                    color: "#db0406",
                  }}
                  type="button"
                  onClick={resendHandler}
                >
                  Resend Code
                </button> */}
                <div className="text-center">
                  {success && <h6 style={{ color: "#db0406" }}>{seconds}</h6>}
                </div>
                <Button type="submit" width="340px">
                  {" "}
                  Verify Number{" "}
                </Button>
                {loader ? (
                  <Loader status={loader} style={{}} />
                ) : (
                  <Message type={errorMessage.type}>
                    {" "}
                    {errorMessage.message}{" "}
                  </Message>
                )}
              </form>
              <div className="col-md-12 padding_apply_signup_terms1">
                <hr />
              </div>
              <div className="col-md-12 text-center ">
                <p className="font_set_terms_conditions">
                  Terms & Conditions • Privacy Policy • Copyright • Cookies
                  Policy • Help <br /> © 2024 Selteq Ltd.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EmailVerificationCode;
