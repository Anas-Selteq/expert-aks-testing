import React from "react";
import Loader from "../Loaders/Loader";
import { Button } from "@/styles/Button.style";
import { Message } from "@/styles/message.style";
import { FAECodeInput } from "../VerificationInput/VerificationInput";
import { GoogleReCaptcha } from "react-google-recaptcha-v3";

const VerifyManagedMobile = ({
  handleClick,
  otp,
  primaryMobile,
  setOTP,
  resend,
  resendHandler,
  success,
  timer,
  loader,
  errorMessage,
}: {
  handleClick: (e: any) => void;
  primaryMobile: any;
  otp: any;
  setOTP: (value: string) => void;
  resend: boolean;
  resendHandler: () => void;
  success: boolean;
  timer: number;
  loader: boolean;
  errorMessage: any;
}) => {
  const containsAlphabets = /[a-zA-Z]/.test(otp);
  console.log("resend",resend)
  return (
    <form onSubmit={handleClick}>
      <h3
        style={{
          margin: " 0 0 5.8px 0",
          fontFamily: "Roboto",
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
        Mobile <span style={{ color: "#dc0000" }}>Verification</span>
      </h3>
      <p
        style={{
          margin: "0 0 0 0",
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
        className="mt-3 mb-2"
      >
        Enter the code that was sent to
      </p>
      <p
        style={{
          marginBottom: "5rem",
          fontSize: "16px",
          fontWeight: 600,
          letterSpacing: "normal",
          textAlign: "center",
          color: "#444444",
        }}
      >
        {primaryMobile || "mobile number is missed"}
      </p>
      <FAECodeInput
        id="pinCode"
        type="text"
        isValid={true}
        fields={6}
        onChange={setOTP}
        name="pinCode"
        inputMode="numeric"
      // value={pinCode}
      />

      <p
        style={{
          marginTop: "2rem",
          fontSize: "14px",
          textAlign: "center",
          color: "#a9a9a9",
        }}
        className="mb-1"
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
          onClick={resendHandler}
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
          onClick={resendHandler}
        >
          Resend Code
        </button>
      )}
      <div className="text-center">
        {resend && <h6 style={{ color: "#292929" }}>{timer}</h6>}
      </div>
      {loader ? (
        <Loader style={{}} status={loader} />
      ) : (
        <>
       { otp.length === 6  ?
          <Button  type="submit" width="340px">
            Verify Now
          </Button> : 
          <Button disabled style={{backgroundColor:"#d88080"}}  type="button" width="340px">
          Verify Now
        </Button>
       }
       </>
      )}
      {errorMessage.message === "" ? null : (
        <Message type={errorMessage.type}>{errorMessage.message}</Message>
      )}
    </form>
  );
};
export default VerifyManagedMobile;
