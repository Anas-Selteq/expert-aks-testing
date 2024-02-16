import Img from "@/Components/Image/Image";
import { LoginContainer } from "@/styles/Container.styled";
import { Flex, Item } from "@/styles/Flex.styled";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import { CopyRight } from "@/styles/CopyRight.styled";
import { Button } from "@/styles/Button.style";
import { FAECodeInput } from "@/Components/VerificationInput/VerificationInput";
import Image from "next/image";
import {
  EmailVerificationAction,
  resendEmailOTPCode,
  VerificationAction,
  getUserDetail,
  getUserDetailById,
} from "@/helper";
import { Message } from "@/styles/message.style";
import Loader from "@/Components/Loaders/Loader";
import {
  GoogleReCaptchaProvider,
  GoogleReCaptcha,
} from "react-google-recaptcha-v3";
import { useDispatch, useSelector } from "react-redux";
import { AUTH_ACTIONS } from "@/Redux/Actions/loginPageAction";
import ReusableAuthPage from "@/Components/reusable_auth_page";
import VerifyManagedEmail from "@/Components/auth/verify_email";
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
  const [resend, setResend] = useState<any>(true);
  const [otp, setOTP] = useState("");
  const dispatch = useDispatch();
  const query = router.query;
  const { userId, email } = query || {};

  const [timer, setTimer] = useState(60);

  const startTimer = (seconds: any) => {
    setTimer(seconds);
    setResend(true);
  };

  const stopTimer = () => {
    setResend(false);
  };

  useEffect(() => {
    let interval: any;

    if (resend && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }

    if (timer === 0) {
      stopTimer();
      setTimer(60); // Reset timer to 60 seconds
    }

    return () => clearInterval(interval);
  }, [resend, timer]);


console.log("resend", resend)
 

  const handleClick = (e: any) => {
    e.preventDefault();
    setLoader(true);
    EmailVerificationAction(
      otp,
      email || profile?.primaryEmail,
      Number(userId || profile?.userId)
    )
      .then((result) => {
        if (result?.statusCode === 0) {
          getUserDetailById(userId)
            .then((result) => {
              dispatch({
                type: AUTH_ACTIONS.SET_PROFILE,
                payload: result?.result?.user,
              });
            })

            .catch((err) => alert(err.message))
            .finally(() => {
              dispatch({
                type: AUTH_ACTIONS.UPDATE_PRIMARY_EMAIL,
                payload: { primaryEmailVerify: true },
              });
            });
          router.replace("/");
        } else {
          setErrorMessage({ type: false, message: result?.message });
        }
      })
      .catch((e) => alert(e))
      .finally(() => setLoader(false));
  };

  useEffect(() => {
    if (!email || !userId) {
      //   router.replace("/signup");
    }
  }, [router, email, userId]);

  const resendHandler = () => {
    setLoader(true);
    let type = userId ? 1 : 2;
    resendEmailOTPCode(Number(userId || profile?.userId), type, undefined)
      .then((result) => {
        setResend(false);
        setErrorMessage({
          type: true,
          message:
            result?.message == "Successfully"
              ? "Code Sent! Please check your mail."
              : result?.message,
        });
        setSuccess(true);
        startTimer(60);
      })
      .catch((e) => alert(e))
      .finally(() => setLoader(false));
  };

  React.useEffect(() => {
    const interval = setInterval(() => {
      setLoadToken(!loadToken);
    }, 20000);
    return () => clearInterval(interval);
  }, [loadToken]);
  // /////////////////////////  functions
  const handleToken = React.useCallback((token: any) => {
    setAuthToken(token);
  }, []);
  // console.log("profile-----------d", seconds);
  return (
    <ReusableAuthPage
      form={
        <>
          {!authToken && <GoogleReCaptcha onVerify={handleToken} />}
          <VerifyManagedEmail
            handleClick={handleClick}
            email={email}
            profile={profile}
            setOTP={setOTP}
            resend={resend}
            resendHandler={resendHandler}
            success={success}
            seconds={timer}
            loader={loader}
            errorMessage={errorMessage}
          />
        </>
      }
      handleToken={handleToken}
    />
  );
}

export default EmailVerificationCode;
