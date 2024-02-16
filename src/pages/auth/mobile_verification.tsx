import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { resendOTPCode, VerificationAction } from "@/helper";
import ReusableAuthPage from "@/Components/reusable_auth_page";
import VerifyManagedMobile from "@/Components/auth/verify_mobile";
import { GoogleReCaptcha } from "react-google-recaptcha-v3";

function MobileVerification() {
  const router = useRouter();
  const query = router.query;
  const { userId, priamryMobile, recreatePassword } = query || {};
  const [loader, setLoader] = useState(false);
  const [loadToken, setLoadToken] = useState(false);
  const [otp, setOTP] = useState("");
  const [authToken, setAuthToken] = useState("");
  const [seconds, setSeconds] = useState(60);
  const [success, setSuccess] = useState<any>(false);
  const [resend, setResend] = useState<any>(false);
  const [newtoken, setNewToken] = useState("");
  const [errorMessage, setErrorMessage] = useState({
    type: false,
    message: "",
  });






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

  const resendHandler = () => {
    setLoader(true);
    resendOTPCode(userId, authToken)
      .then((result) => {
        setResend(false);
        setErrorMessage({
          type: true,
          message:
            result?.message === 'Successfully'
              ? 'Code Sent! Please check your mobile.'
              : result?.message,
        });
        setSuccess(true);
        localStorage.setItem('response', JSON.stringify(result));
        startTimer(60);
      })
      .catch((e) => alert(e))
      .finally(() => setLoader(false));
  };



  // -----------------------------------------------------------------










  // -----------------------------------------------------------------

  const handleClick = (e: any) => {
    e.preventDefault();
    setLoader(true);
    setErrorMessage({ type: false, message: "" });
    VerificationAction(Number(userId), otp, priamryMobile)
      .then((result) => {
        if (localStorage.getItem("forget")) {
          localStorage.removeItem("forget");
          router.push({
            pathname: "/auth/Resetpassword",
            query: { ...query, userOTP: otp, userId, recreatePassword },
          });

        } else {
          if (result?.statusCode === 0 && recreatePassword) {
            router.push({
              pathname: "/auth/create_forget_password",
              query: { ...query, userOTP: otp, userId, recreatePassword },
            });
          } else if (result?.statusCode === 0 && !recreatePassword) {
            router.push({
              pathname: "/auth/create_password",
              query: { userOTP: otp, userId, recreatePassword },
            });
          } else {
            setErrorMessage({ type: false, message: result?.message });
          }
        }
      })
      .catch((e) => alert(e))
      .finally(() => setLoader(false));
  };

  React.useEffect(() => {
    if (!priamryMobile || !userId) {
      // router.replace("/auth/signup");
    }
  }, [priamryMobile, router, userId]);




  useEffect(() => {
    setAuthToken(newtoken);
  }, [newtoken])



  const handleToken = (token: any) => {
    console.log("token", token);
    setNewToken(token);
    setAuthToken(token);
    return token;
  };


  console.log("useddd", authToken);

  console.log("newtoken", newtoken);
  return (
    <ReusableAuthPage
      form={
        <>
          {/* {!authToken && <GoogleReCaptcha onVerify={handleToken} />} */}
          <GoogleReCaptcha onVerify={handleToken} />
          {/* !authToken &&  */}
          <VerifyManagedMobile
            handleClick={handleClick}
            primaryMobile={priamryMobile}
            setOTP={setOTP}
            resend={resend}
            resendHandler={resendHandler}
            success={success}
            timer={timer}
            loader={loader}
            errorMessage={errorMessage}
            otp={otp}
          />
        </>
      }
      handleToken={handleToken}
    />
  );
}

export default MobileVerification;
