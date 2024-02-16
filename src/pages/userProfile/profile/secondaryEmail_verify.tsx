import { FAECodeInput } from '@/Components/VerificationInput/VerificationInput'
import SideBar from '@/Components/components/sidebar'
import { AUTH_ACTIONS } from '@/Redux/Actions/loginPageAction';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

function secondaryEmail_verify() {

  const [otp, setOTP] = useState<any>("");
  const { profile } = useSelector((state: any) => state);
  const dispatch = useDispatch();
  const router = useRouter();
  const [timer, setTimer] = useState(60);
  const [resend, setResend] = useState<any>(false);
  const [JwtRefreshToken, setJwtRefreshToken] = useState<any>("");

  useEffect(() => {
    setJwtRefreshToken(localStorage?.getItem("jwtRefreshToken"));
  }, []);

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

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    let isMounted = true; // Flag to track component mount state
    const fetchData = async () => {
      const isToken = token !== null;
      const headers = {
        Authorization: isToken ? `Bearer ${token}` : undefined,
        "Content-Type": "application/json",
      };

      try {
        const response = await axios.get(
          `https://gateway.findanexpert.net/signup_svc/pv/users/getUserById?id=${profile?.userId}`,
          { headers }
        );
        if (isMounted) {
          // Only update state if the component is still mounted
          dispatch({
            type: AUTH_ACTIONS.LOGIN_SUCCESS,
            payload: response.data?.result?.user,
          });
          console.log("new new", response);
        }
      } catch (error) {
        console.log(error);
        if (JwtRefreshToken) {
          Jwtset()
        }
      }
    };
    fetchData();
    return () => {
      isMounted = false; // Set the flag to false when the component unmounts
    };
  }, [profile?.userId, JwtRefreshToken]);

  const Jwtset = async () => {

    // Convert the JWT token object to a string
    // const jwtTokenString = JSON.stringify(JwtRefreshToken);

    // Encode the JWT token to Base64
    const base64Token = Buffer.from(JwtRefreshToken).toString('base64');



    try {
      const response = await axios.get(
        `https://gateway.findanexpert.net/signup_svc/pb/users/getnewRefreshToken?tokenModel=${base64Token}`
      );
      // localStorage.setItem("jwtRefreshToken", response?.data?.result?.jwtRefreshToken)
      // localStorage.setItem("jwtToken", response?.data?.result?.jwtToken)
      if (response?.data?.code === 0) {
        localStorage.setItem("jwtRefreshToken", response?.data?.result?.jwtRefreshToken)
        localStorage.setItem("jwtToken", response?.data?.result?.jwtToken)
      }
      window.location.reload();
      // Only update state if the component is still mounted
    } catch (error) {
      console.log(error);
    }
  };

  const addSecondaryemailfunc = async () => {
    const token = localStorage.getItem("jwtToken");
    const apiUrl = 'https://gateway.findanexpert.net/otp_generation_svc/pb/verify/otp/';
    const requestData = {
      email: profile?.secondaryEmail,
      otpCode: otp,
      userId: profile?.userId
    };

    const headers = {
      'Content-Type': 'application/json', // Adjust the content type as needed
      'Authorization': `${token}`, // Add any custom headers here
    };

    try {
      const response: any = await axios.post(apiUrl, requestData, { headers });
      console.log("resssss", response?.data?.statusCode);
      if (response?.data?.statusCode === 1) {
        alert(`${response.data.message}`)
      } else {
        router.push("/userProfile/profile");
      }
      // setData(response.data);
      // setError(null);
    } catch (err) {
      // setError(err.response.data);
      // setData(null);
    }
  };

  const resendSecondaryemailfunc = async () => {
    const token = localStorage.getItem("jwtToken");
    const apiUrl = 'https://gateway.findanexpert.net/signup_svc/pb/users/resendEmailOtp';
    const requestData = {
      userId: profile?.userId,
      type: 2,
    };

    const headers = {
      'Content-Type': 'application/json', // Adjust the content type as needed
      'Authorization': `${token}`, // Add any custom headers here
    };

    try {
      const response: any = await axios.post(apiUrl, requestData, { headers });
      console.log("resssss", response?.data?.statusCode);
      if (response?.data?.statusCode === 1) {
        alert(`${response.data.message}`)
      } else {
        // alert(`${response.data.message}`)
        startTimer(60);
      }
      // setData(response.data);
      // setError(null);
    } catch (err) {
      // setError(err.response.data);
      // setData(null);
    }
  };

  return (
    <SideBar activeIndex={0}>
      <div className="container mt-5 mb-4" >
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
                {/* <button className="btn btn-light btn-sm rounded-pill color_light_font">
                  Skip
                </button> */}
              </div>
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
                Secondary Email <span style={{ color: "#dc0000" }}>Verification</span>
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
                Enter the code that was sent to <br />
                <strong> {profile?.secondaryEmail || "email id is missed"} </strong>
              </p>
              {/* <p
                  style={{
                    fontSize: "16px",
                    fontWeight: 600,
                    letterSpacing: "normal",
                    textAlign: "center",
                    color: "#444",
                  }}
                >
                  {profile?.secondaryEmail || "email id is missed"}
                </p> */}
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
                    color: "#db0406",
                  }}
                  type="button"

                >
                  Resend Code
                </button>
              ) : (
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
                  onClick={resendSecondaryemailfunc}
                >
                  Resend Code
                </button>
              )}
              <div className="text-center">
                {resend && <h6 style={{ color: "#292929" }}>{timer}</h6>}
              </div>
              <div className='text-center mt-4'>
                <button className='btn btn-danger button_width_verify' onClick={addSecondaryemailfunc}>
                  Continue
                </button>
              </div>
              <div className="col-md-12 padding_apply_signup_terms1">
                <hr />
              </div>
              <div className="text-center position_of_font">
                <p className="font_set_terms_conditions m-0 p-0">
                  <strong><Link className="style_a_tag11" href={"/auth/Termsandcondition"}> Terms & Conditions</Link></strong> • <strong><Link className="style_a_tag11" href={"/auth/Privacypolicy"}>Privacy Policy</Link></strong> • <Link className="style_a_tag11" href={"/auth/Cookies"}><strong> Cookies
                    Policy </strong></Link>
                </p>
                <p className="m-0 p-0 font_set_terms_conditions1">
                  © 2024 Selteq Ltd.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SideBar>
  )
}

export default secondaryEmail_verify