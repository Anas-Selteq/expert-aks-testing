import React, { useEffect, useState } from "react";
import Image from "next/image";
import { BiChevronLeft } from "react-icons/bi";
import SideBar from "@/Components/components/sidebar";
import ManageEmail from "@/Components/components/manage_email";
import UpdateEmail from "@/Components/components/update_email_and_phone_input";
import VerifyManagedEmail from "@/Components/auth/verify_email";
import { useDispatch, useSelector } from "react-redux";
import EmailManagement from "@/Components/components/email_management";
import {
  EmailVerificationAction,
  addUserEmail,
  addUserSecondaryEmail,
  resendEmailOTPCode,
  resendSecondaryEmailOTPCode,
} from "@/helper";
import { AUTH_ACTIONS } from "@/Redux/Actions/loginPageAction";
import { useRouter } from "next/router";
import { GoogleReCaptcha } from "react-google-recaptcha-v3";

const ManageEmails = () => {
  const { profile } = useSelector((state: any) => state);
  const [isPrimary, setIsPrimary] = useState(false);
  const [isSecondary, setIsSecondary] = useState(false);
  const [showVerifyEmail, setShowVerifyEmail] = useState(false);
  const [showUpdatePage, setShowUpdatePage] = useState(false);
  const [email, setEmail] = useState("");
  const router = useRouter();
  const [loader, setLoader] = React.useState(false);
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
  const [otp, setOTP] = useState("");
  const dispatch = useDispatch();

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
    EmailVerificationAction(otp, email, profile.userId).then((result) => {
      if (result?.statusCode === 0) {
        /* -------------------------------- work here ------------------------------- */
        dispatch({
          type: AUTH_ACTIONS.SECONDARY_EMAIL_ADD,
          payload: { secondaryEmail: email },
        });
        dispatch({
          type: AUTH_ACTIONS.UPDATE_SECONDARY_EMAIL,
          payload: { secondaryEmailVerify: true },
        });
        router.replace("/userProfile/profile");
      } else {
        setErrorMessage({ type: false, message: result?.message });
      }
    });
  };

  const resendHandler = () => {
    setLoader(true);
    if (isPrimary) {
      let type = profile.userId ? 1 : 2;
      resendEmailOTPCode(profile.userId, type)
        .then((res) => {
          setLoader(false);
          Setresend(false);
          setErrorMessage({
            type: true,
            message:
              res?.message == "Successfully"
                ? "Code Sent! Please check your account."
                : res?.message,
          });
          setSuccess(true);
        })
        .catch((e) => alert(e));
    }
    if (isSecondary) {
      resendSecondaryEmailOTPCode(profile?.userId).then((result) => {
        setLoader(false);
        Setresend(false);
        setErrorMessage({
          type: true,
          message:
            result?.message == "Successfully"
              ? "Code Sent! Please check your account."
              : result?.message,
        });
        setSuccess(true);
      });
    } else {
      alert("NO more options");
    }
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

  const verifyHandler = (isPrimary = false, isSecondary = false) => {
    if (isPrimary) {
      setIsSecondary(false);
      setIsPrimary(true);
      setShowUpdatePage(true);
      setShowVerifyEmail(false);
    } else if (!isPrimary && isSecondary) {
      setIsSecondary(true);
      setIsPrimary(false);
      setShowUpdatePage(true);
      setShowVerifyEmail(false);
    } else if (!isPrimary && !isSecondary) {
      setIsSecondary(false);
      setIsPrimary(false);
      setShowUpdatePage(true);
      setShowVerifyEmail(false);
    }
  };

  const addEmailHandler = (email: any) => {
    if (isPrimary) {
      setShowUpdatePage(false);
      addUserEmail({
        userId: profile?.userId,
        text: email,
        modifiedBy: 0,
      })
        .then((result) => {
          if (result?.code === 0) {
            setEmail(email);
            setShowVerifyEmail(true);
          } else {
            alert(result?.message);
            setIsSecondary(true);
            setShowUpdatePage(true);
          }
        })
        .catch((e) => alert(e))
        .finally(() => setLoader(false));
    }
    if (isSecondary) {
      setShowUpdatePage(false);
      const data = {
        userId: profile?.userId,
        text: email,
        modifiedBy: 0,
      };
      addUserSecondaryEmail(data)
        .then((res) => {
          if (res?.code === 0) {
            setEmail(email);
            setShowVerifyEmail(true);
          } else {
            alert(res?.message);
            setIsSecondary(true);
            setShowUpdatePage(true);
          }
        })
        .catch((e) => alert(e));
    } else {
      alert("No options for other mails");
    }
  };




  

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
            <span>Manage Email</span>
          </div>
        </div>
      </div>
      <div>
        {/* <BiChevronLeft />
        Back */}
        {/* <div className="border_profile p-3">
          <div className="d-flex justify-content-between">
            <div className="d-flex flex-column justify-content-center ">
              <h4 className="manage-address">Manage Email</h4>
              <p className="manage-address-detail">
                Don&#39;t worry, your information is private and we will not
                share this info with anyone outside Expert
              </p>
            </div>
            <div>
              <Image
                src="/assets/Images/img6.png"
                height={135.54}
                width={170}
                alt="create account"
                className="rounded-circle mx-auto d-block"
              />
            </div>
          </div>
        </div> */}
        <div className="col-md-12 mt-4 margin_bottom_new" style={{height:"100vh"}}>
          {/* {showVerifyEmail ? (
            <>
              {!authToken && <GoogleReCaptcha onVerify={handleToken} />}
              <VerifyManagedEmail
                handleClick={handleClick}
                email={email}
                profile={profile}
                setOTP={setOTP}
                resend={true}
                resendHandler={resendHandler}
                success={success}
                seconds={seconds}
                showResend={false}
                loader={loader}
                errorMessage={errorMessage}
              />
            </>
          ) : (
            <>
              {showUpdatePage ? (
                <EmailManagement
                  isPrimary={isPrimary}
                  isSecondary={isSecondary}
                  onClickHandler={addEmailHandler}
                />
              ) : (
                <ManageEmail verifyHandler={verifyHandler} />
              )}
            </>
          )} */}
          <ManageEmail />
        </div>
      </div>
    </SideBar>
  );
};
export default ManageEmails;
function dispatch(arg0: { type: any; payload: { secondaryEmail: any } }) {
  throw new Error("Function not implemented.");
}
