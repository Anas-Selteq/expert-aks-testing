import React from "react";
import { FAECodeInput } from "../VerificationInput/VerificationInput";
import Loader from "../Loaders/Loader";
import { Message } from "@/styles/message.style";
import { Button } from "@/styles/Button.style";

const VerifyManagedEmail = ({
  handleClick,
  email,
  profile,
  setOTP,
  resend,
  resendHandler,
  success,
  seconds,
  loader,
  errorMessage,
  showResend = true,
}: {
  handleClick: (e: any) => void;
  email: string | string[] | undefined;
  profile: any;
  setOTP: (value: string) => void;
  resend: boolean;
  resendHandler: () => void;
  success: boolean;
  seconds: number;
  loader: boolean;
  errorMessage: any;
  showResend?: boolean;
}) => {
  return (
    <form onSubmit={handleClick}>
      <h3
        style={{
          margin: " 0 0 6px 0",
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
          margin: "0",
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
          marginBottom: "4rem",
          fontSize: "16px",
          fontWeight: 600,
          letterSpacing: "normal",
          textAlign: "center",
          color: "#444",
        }}
      >
        {email || profile.primaryEmail || "email id is missed"}
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
        className="mb-1 p-0"
        style={{
          marginTop: "2rem",
          fontSize: "14px",
          textAlign: "center",
          color: "#a9a9a9",
        }}
      >
        Having problem?
      </p>
      {showResend ? (
        resend ? (



          <button
            disabled
            style={{
              marginLeft: "auto",
              marginRight: "auto",
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
              marginLeft: "auto",
              marginRight: "auto",
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
        )
      ) : null}
      <div className="text-center">
        {resend && <h6 style={{ color: "#292929" }}>{seconds}</h6>}
      </div>
      {loader ? (
        <Loader
          style={{
            marginTop: "3rem",
          }}
          status={loader}
        />
      ) : (
        <Button style={{ marginTop: "3rem" }} type="submit" width="340px">
          Verify Now
        </Button>
      )}
      {errorMessage.message === "" ? null : (
        <Message type={errorMessage.type}>{errorMessage.message}</Message>
      )}
    </form>
  );
};
export default VerifyManagedEmail;
