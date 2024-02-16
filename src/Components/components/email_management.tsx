import React, { useState } from "react";
import { useSelector } from "react-redux";

const EmailManagement = ({
  isPrimary,
  isSecondary,
  onClickHandler,
}: {
  isPrimary: boolean;
  isSecondary: any;
  onClickHandler: any;
}) => {
  const { profile } = useSelector((state: any) => state);
  const [email, setEmail] = useState(
    isPrimary ? profile.primaryEmail : isSecondary ? profile.secondaryEmail : ""
  );

  return (
    <>
      <div
        className="px-3 py-2 rounded"
        style={{
          backgroundColor: "lightgrey",
        }}
      >
        <div
          style={{
            color: "grey",
            fontSize: "0.8rem",
          }}
        >
          {isPrimary
            ? "Primary Email"
            : isSecondary
            ? "Secondary Email"
            : "Invoice Email"}
        </div>
        <input
          type="email"
          id={
            isPrimary
              ? "Primary Email"
              : isSecondary
              ? "Secondary Email"
              : "Invoice Email"
          }
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Please Enter Email"
          style={{
            backgroundColor: "transparent",
            border: "none",
            outline: "none",
            color: "black",
            width: "100%",
            fontWeight: "500",
            fontSize: "1.2rem",
          }}
        />
      </div>
      <div className="col-md-12 text-end mt-5">
      <button className="btn btn-danger" onClick={() => onClickHandler(email)}>
        Save & Continue
      </button>
      </div>
    </>
  );
};
export default EmailManagement;
