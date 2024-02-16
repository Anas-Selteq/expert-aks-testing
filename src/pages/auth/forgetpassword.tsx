import React, { useEffect, useState } from "react";
import Image from "next/image";
import Loader from "@/Components/Loaders/Loader";
import PhoneInputField from "@/Components/CountryPhoneInput/CountryPhoneInput";
import ReusableAuthPage from "@/Components/reusable_auth_page";
import { forgetpassowrd, numberVerifier } from "@/helper";
import { useRouter } from "next/router";
import { Button } from "@/styles/Button.style";
import { Message } from "@/styles/message.style";
import { BiChevronDown } from "react-icons/bi";
import Countries from "../countries.json";
import { GoogleReCaptcha } from "react-google-recaptcha-v3";
import { useSelector } from "react-redux";
import axios from "axios";
import Layout2 from "@/Components/Layout2/Layout2";

const SignUp = () => {
  const router = useRouter();
  const numbersignin: any | null =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("loginnumber") as any)
      : null;
  // const newtypesign = JSON.parse(numbersignin)
  // console.log("new", numbersignin)
  const { profile } = useSelector((state: any) => state);
  const [phoneNumber, setPhoneNumber] = useState<any>(``);
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

  // const numbersignin: any = localStorage.getItem("loginnumber");
  // const newtypesign = JSON.parse(numbersignin)
  // console.log("new", newtypesign)

  useEffect(() => {
    if(localStorage.getItem("loginnumber"))
    {
    const numbersignin: any = localStorage.getItem("loginnumber");
    setPhoneNumber(JSON.parse(numbersignin))
    } else {
      router.push("/auth/signup")
    }
  }, [])
  

  


  const handleToken = (token: any) => {
    setAuthToken(token);
    return token;
  };

  console.log("authToken-------------------------->", authToken)
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setLoader(true);
    setErrorMessage("");
    await forgetpassowrd(phoneNumber, authToken, selectedcountryy)
      .then(async (result: any) => {
        setTokenRefresh((r) => !r);
        if (result?.code === 0) {
          localStorage.removeItem("loginnumber");
          localStorage.setItem("forget", "true");
          router.push({
            pathname: "/auth/mobile_verification",
            query: { ...result?.result },
          });
          localStorage.setItem("response_id", JSON.stringify(result))
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

  // useEffect(() => {
    // Check if localStorage is available
   

 

  // }, []);

  return (
    <Layout2>
    <ReusableAuthPage
      form={
        <form onSubmit={handleSubmit}>
          <>
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
              Forget <span style={{ color: "#dc0000" }}>Password!</span>
            </div>
            <div>

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
              value={phoneNumber}
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
    </Layout2>
  );
};

export default SignUp;
