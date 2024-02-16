import React, { useEffect, useState } from "react";
import Image from "next/image";
import Loader from "@/Components/Loaders/Loader";
import PhoneInputField from "@/Components/CountryPhoneInput/CountryPhoneInput";
import ReusableAuthPage from "@/Components/reusable_auth_page";
import { numberVerifier } from "@/helper";
import { useRouter } from "next/router";
import { Button } from "@/styles/Button.style";
import { Message } from "@/styles/message.style";
import { BiChevronDown } from "react-icons/bi";
import Countries from "../countries.json";
import { GoogleReCaptcha } from "react-google-recaptcha-v3";
import { useSelector } from "react-redux";
import axios from "axios";

const SignUp = () => {
  const router = useRouter();
  const { profile } = useSelector((state: any) => state);
  const [phoneNumber, setPhoneNumber] = useState<number>(0);
  const [loader, setLoader] = useState(false);
  const [authToken, setAuthToken] = useState<any>("");
  const [errorMessage, setErrorMessage] = useState("");
  const [tokenRefresh, setTokenRefresh] = useState(false);
  const [allCountries, setAllCountries] = useState<any>([]);
  const [selectedcountryy, setSelectedCountryy] = useState<any>(null);
  const [selectedcountryname, setSelectedCountryName] = useState<any>(null);
  const [jwtToken, setJwtToken] = useState<any>(null);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [showDropDown, setShowDropDown] = useState(false);

  const handleToken = (token: any) => {
    setAuthToken(token);
    return token;
  };



  console.log("authToken-------------------------->", authToken)
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setLoader(true);
    setErrorMessage("");
    await numberVerifier(phoneNumber, authToken, selectedcountryy)
      .then(async (result: any) => {
        setTokenRefresh((r) => !r);
        if (result?.code === 0) {
          router.push({
            pathname: "/auth/mobile_verification",
            query: { ...result?.result },
          });
        } else if (result?.code === 6) {
          router.push({
            pathname: "/auth/mobile_verification",
            query: { ...result?.result },
          });
        } else if (result?.code === 4) {
          router.push({
            pathname: "/auth/password",
            query: { ...result?.result },
          });
        } else if (result?.code === 3) {
          localStorage.setItem("loginnumber", JSON.stringify(phoneNumber))
          router.push({
            pathname: "/auth/password",
            query: { ...result?.result },
          });
        } else if (result?.code === -1 || result?.code === 7) {
          window.location.reload();
        } else {
          setErrorMessage(result?.message || "Invalid credentials");
        }
      })
      .catch((error) => {
        setErrorMessage(`An error occurred:${error}`);
      })
      .finally(() => setLoader(false));
  };

  const getallcountries = async () => {
    const isToken = jwtToken !== null;

    const headers = {
      // Authorization: isToken ? `Bearer ${jwtToken}` : undefined,
      "Content-Type": "application/json", // Update the content type if needed
    };

    try {
      const response = await axios.get(
        `https://gateway.findanexpert.net/signup_svc/pb/country/getCountry`
      );

      // Handle the response as needed
      console.log("all countries", response.data);
      setAllCountries(response.data.result);
      // Update your state or perform actions with the fetched data
    } catch (error) {
      // Handle errors
      console.error("Fetch error:", error);

      // You can also update state or take other actions based on the error
    }
  };

  useEffect(() => {
    setJwtToken(localStorage?.getItem("jwtToken"));
    getallcountries();
  }, [jwtToken]);

  const handleCountryClick = (country: any) => {
    setSelectedCountryy(country?.id);
    setSelectedCountryName(country?.name);
    setSelectedCountry(country?.countryFlagImage)
  }


  console.log("allCountriesallCountries", allCountries)

  const isPhoneNumberValid = phoneNumber.toString().length > 10;
  const submitButton = isPhoneNumberValid ? (
    <Button type="submit" width="340px" style={{ marginTop: "4rem" }}>
      Next
    </Button>
  ) : (
    <Button
      type="submit"
      width="340px"
      disabled
      style={{ backgroundColor: "#e17375", marginTop: "4rem" }}
    >
      Next
    </Button>
  );

  React.useEffect(() => {
    const handleKeyPress = (event: any) => {
      if (event.key === 'Enter') {
        handleSubmit(event);
      }
    };

    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleSubmit]);

  return (
    <ReusableAuthPage
      form={
        <form onSubmit={handleSubmit}>
          <>
            {/* <GoogleReCaptcha onVerify={handleToken} /> */}
            {!authToken && <GoogleReCaptcha onVerify={handleToken} />}
            <div
              style={{
                margin: " 0 0 10.8px",
                fontFamily: "Roboto",
                fontSize: "30px",
                fontWeight: "900",
                fontStretch: "normal",
                fontStyle: "normal",
                lineHeight: "normal",
                letterSpacing: "normal",
                textAlign: "center",
                color: "#22272e",
              }}
            >
              Welcome to <span style={{ color: "#dc0000" }}>Expert!</span>
            </div>
            <div>
              {/* <div className="position-relative pt-1">
                <div
                  className=" dropdown ms-2 d-flex text-primary justify-content-center"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowDropDown(!showDropDown);
                  }}
                >
                  <span className=" d-flex justify-content-center align-items-center text-dark ">
                    <img
                      src={selectedCountry.length === 0 ? "https://flagcdn.com/w320/gb.png" : selectedCountry}
                      alt={selectedCountry}
                      className="img-fluid img_style_flag1"
                      width={20}
                      height={15}
                    />
                    <div className="font_style_flag">
                    {selectedcountryname === null? <>Please Select Country</> : selectedcountryname}
                    </div>
                    <span className="icon_line">
                      <BiChevronDown />
                    </span>
                  </span>
                </div>
                <ul
                  className={`dropdown-menu ${
                    showDropDown ? "d-block" : ""
                  } position-absolute p-2 mt-1 overflow-auto bg-white`}
                  style={{
                    maxHeight: "25vh",
                    maxWidth: "25vw",
                  }}
                >
                  {allCountries.map((country: any, index: number) => (
                    <li
                      key={index}
                      className="dropdown-item"
                      onClick={() => {
                        setShowDropDown(false);
                        handleCountryClick(country);
                      }}
                    >
                      <img
                        src={country.countryFlagImage}
                        alt={country.name}
                        className="img-fluid img_style_flag"
                      />
                      {country.name}
                    </li>
                  ))}
                </ul>
              </div> */}
            </div>
            <p
              style={{
                margin: "0.6px 0px 41px 0.9px",
                fontFamily: "Roboto",
                fontSize: "14px",
                fontWeight: "normal",
                fontStretch: "normal",
                fontStyle: "normal",
                lineHeight: "normal",
                letterSpacing: "normal",
                textAlign: "center",
                color: "#6c6c6c",
              }}
              className="pt-2"
            >
              Please Enter your Mobile Number
            </p>
            <PhoneInputField
              style={{
                fontFamily: "Poppins",
                fontSize: "30px",
                fontWeight: "600",
                fontStretch: "normal",
                fontStyle: "normal",
                textAlign: "center",
                color: "#22272e",
              }}
              className="phone-input-field mx-auto"
              onChangeInput={setPhoneNumber}
              error={phoneNumber}
              required
            />
            {loader ? (
              <Loader style={{ marginTop: "4rem" }} status={loader} />
            ) : (
              submitButton
            )}
            {errorMessage === "" ? null : <Message>{errorMessage}</Message>}
          </>
        </form>
      }
      handleToken={handleToken}
    />
  );
};

export default SignUp;
