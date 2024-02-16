import Img from "@/Components/Image/Image";
import PhoneInputField from "@/Components/CountryPhoneInput/CountryPhoneInput";
import { LoginContainer } from "@/styles/Container.styled";
import {
  GoogleReCaptchaProvider,
  GoogleReCaptcha,
} from "react-google-recaptcha-v3";
import { Flex, Item } from "@/styles/Flex.styled";
import { useRouter } from "next/router";
import * as React from "react";
import styled from "styled-components";
import { Button } from "@/styles/Button.style";
import { CopyRight } from "@/styles/CopyRight.styled";
import { addSecondaryMobileNumber } from "@/helper";
import { Message } from "@/styles/message.style";
import Loader from "@/Components/Loaders/Loader";
import { useDispatch, useSelector } from "react-redux";
import { AUTH_ACTIONS } from "@/Redux/Actions/loginPageAction";

function SignUp() {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = React.useState(0);
  const [error, setError] = React.useState("");
  const [loader, setLoader] = React.useState(false);
  const [authToken, setAuthToken] = React.useState("");
  const [tokenRefresh, setTokebRefresh] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [loadToken, setLoadToken] = React.useState(false);
  const { profile } = useSelector((state: any) => state);
  const dispatch = useDispatch();

  // React.useEffect(() => {
  //   const interval = setInterval(() => {
  //     setLoadToken(!loadToken);
  //   }, 20000);
  //   return () => clearInterval(interval);
  // }, [loadToken]);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    setLoader(true);
    setErrorMessage("");
    try {
      addSecondaryMobileNumber(profile.userId, phoneNumber, authToken).then(
        async (result: any) => {
          setLoader(false);

          setTokebRefresh((r) => !r);
          console.log("result", result?.code);
          if (result?.code === 0) {
            router.push({
              pathname: "/secondary-mobile-otp-verify",
              query: { ...result?.result, phoneNumber },
            });
            dispatch({
              type: AUTH_ACTIONS.SECONDARY_MOBILE_ADD,
              payload: { secondaryMobile: phoneNumber },
            });
          } else if (result?.code === 6) {
            router.push({
              pathname: "/secondary-mobile-otp-verify",
              query: { ...result?.result },
            });
            dispatch({
              type: AUTH_ACTIONS.SECONDARY_MOBILE_ADD,
              payload: { secondaryMobile: phoneNumber },
            });
          } else {
            setErrorMessage(result?.message || "Invalid credentials");
          }
        }
      );
    } catch (error) {
      console.error(error);
      setErrorMessage("An error occurred");
    }
  };

  // /////////////////////////  functions
  const handleToken = React.useCallback(
    (token: any) => {
      setAuthToken(token);
    },
    [loadToken]
  );

  console.log("token", authToken);

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
                  Skipped
                </button>
              </div>
              <form onSubmit={handleSubmit}>
                <>
                  <h3
                    style={{
                      margin: " 0 0 10.8px",
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
                    Welcome to <span style={{ color: "#dc0000" }}>Expert!</span>
                  </h3>
                  <p
                    style={{
                      margin: "0.6px 0px 41px 0.9px",
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
                    Please Enter your Mobile Number
                  </p>
                  <PhoneInputField
                    style={{
                      margin: "auto",
                      width: "100%",
                      fontFamily: "Poppins",
                      fontSize: "30px",
                      fontWeight: "600",
                      fontStretch: "normal",
                      fontStyle: "normal",
                      textAlign: "center",
                      color: "#22272e",
                    }}
                    onChangeInput={setPhoneNumber}
                    error={phoneNumber}
                  />
                  {phoneNumber.toString().length < 11 ? (
                    <Button
                      type="submit"
                      width="340px"
                      disabled
                      style={{ backgroundColor: "gray" }}
                    >
                      Next
                    </Button>
                  ) : (
                    <Button type="submit" width="340px">
                      Next
                    </Button>
                  )}
                  {loader ? (
                    <Loader status={loader} style={{}} />
                  ) : (
                    <Message> {errorMessage} </Message>
                  )}
                </>
              </form>

              <div className="col-md-12 padding_apply_signup_terms">
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

export default SignUp;
