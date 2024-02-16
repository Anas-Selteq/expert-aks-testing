import { AUTH_ACTIONS } from "@/Redux/Actions/loginPageAction";
import { addSecondaryMobileNumber } from "@/helper";
import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import { useDispatch, useSelector } from "react-redux";
import { GoogleReCaptcha } from "react-google-recaptcha-v3";

interface Props {
  onClickFunction: (num:any) => void;
}

const AddSecondaryMobileNumber:React.FC<Props> = ({onClickFunction}) => {
  const { profile } = useSelector((state: any) => state);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [authToken, setAuthToken] = useState("");
  const [tokenRefresh, setTokenRefresh] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const dispatch = useDispatch();

  const secondaryMobileNumberHandler = () => {
    addSecondaryMobileNumber(
      profile.userId,
      parseInt(phoneNumber),
      authToken
    ).then((result: any) => {
      setTokenRefresh((r) => !r);
      if (result?.code === 0 || result?.code === 6) {
        onClickFunction(phoneNumber);
        dispatch({
          type: AUTH_ACTIONS.SECONDARY_MOBILE_ADD,
          payload: { secondaryMobile: phoneNumber },
        });
      } else {
        setErrorMessage(result?.message || "Invalid credentials");
      }
    }).catch((e)=>alert(e));
  };

  const handleToken = React.useCallback((token: any) => {
    setAuthToken(token);
  }, []);

  return (
    <div>
      {!authToken && <GoogleReCaptcha onVerify={handleToken} />}
      <div className="px-4">
        <span className="text-secondary fs-6">Secondary Number</span>
        <PhoneInput
          country="gb"
          value={phoneNumber}
          onChange={(phone) => setPhoneNumber(phone)}
        />
        {errorMessage && ""}
      </div>
      <div className="d-flex justify-content-end px-4">
        <button
          className=" btn btn-danger"
          onClick={secondaryMobileNumberHandler}
        >
          Save And Continue
        </button>
      </div>
    </div>
  );
};
export default AddSecondaryMobileNumber;
