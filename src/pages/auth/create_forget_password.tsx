import InputField from "@/Components/InputField";
import Image from "next/image";
import Loader from "@/Components/Loaders/Loader";
import { resetOrAddUserPassword } from "@/helper";
import { Button } from "@/styles/Button.style";
import { Message } from "@/styles/message.style";

import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import ReusableAuthPage from "@/Components/reusable_auth_page";

function CreateForgetPassword() {
  const [errorMessage, setErrorMessage] = React.useState({
    type: false,
    message: "",
  });
  const [loader, setLoader] = React.useState(false);

  const [confirmMessage, setConfirmMessage] = React.useState("");
  const router = useRouter();
  const query = router.query || {};
  const { recreatePassword, userOTP } = query;
  const [passwordValue, setPassword] = useState("");
  const [confirmPassword, setConfirm] = useState();

  useEffect(() => {
    if (!userOTP) {
      //   router.replace("/signup");
    }
  }, [router, userOTP]);

  const validatePassword = () => {
    const regex = /^(?=.*\d)(?=.*[!\"£$@#%^&*])(?=.*[a-zA-Z]).{8,}$/;
    return regex.test(passwordValue);
  };
  const messages = [
    {
      text: "At least eight characters",
      regex: /^.{8,}$/,
    },
    {
      text: "At least one number",
      regex: /^(?=.*\d)/,
    },
    {
      text: '!"£$@#%^&* at least one symbol',
      regex: /^(?=.*[!\"£$@#%^&*])/,
    },
  ];
  const invalidMessages = messages.filter(
    ({ regex }) => !regex.test(passwordValue)
  );
  const renderRequirementMessage = () => {
    if (validatePassword()) {
      return (
        <div
          style={{
            fontSize: "14px",
            margin: "auto",
            display: "block",
            width: "332px",
            listStyle: "none",
            paddingLeft: "0",
            paddingTop: "6px",
            color: "green",
          }}
        >
          Password meets requirements
        </div>
      );
    }

    return (
      <div style={{ color: "red" }}>
        <ul
          style={{
            fontSize: "14px",
            margin: "auto",
            display: "block",
            width: "332px",
            listStyle: "none",
            paddingLeft: "0",
            paddingTop: "6px",
          }}
        >
          {invalidMessages.map(({ text }) => (
            <li key={text}>{text}</li>
          ))}
        </ul>
      </div>
    );
  };

  const handleClick = (e: any) => {
    e.preventDefault();
    if (confirmPassword !== passwordValue) {
      setConfirmMessage("Please confirm your password");
    } else if (invalidMessages.length !== 0) {
      return;
    } else if (passwordValue == "") {
      setConfirmMessage("Please confirm your password");
    } else {
      setLoader(true);
      resetOrAddUserPassword(query.userId,true, passwordValue, userOTP)
        .then((result) => {
          if (result?.code === 0) {
            setErrorMessage({ type: true, message: result?.message });
            setTimeout(() => {
              router.push({
                pathname: "/userProfile/profile/",
              });
            }, 2000);
          } else {
            setErrorMessage({ type: false, message: result?.message });
          }
        })
        .catch((e) => alert(e))
        .then(() => setLoader(false));
    }
  };

  return (
    <ReusableAuthPage
      form={
        <>
          <h3
            style={{
              margin: " 0 0 4% 0",
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
            Create <span style={{ color: "#dc0000" }}>Password</span>
          </h3>
          <form onSubmit={handleClick}>
            <br />
            <InputField
              type="password"
              onChange={(e: any) => setPassword(e.target.value)}
              isPasswordField={true}
              indicateIcon="https://1864597015.rsc.cdn77.org/newexpertpreprod/icons/lock.svg"
              placeholder="Password"
              passwordLabel=""
              label="Password"
            />
            <InputField
              type="password"
              onChange={(e: any) => setConfirm(e.target.value)}
              isPasswordField={true}
              indicateIcon="https://1864597015.rsc.cdn77.org/newexpertpreprod/icons/lock.svg"
              message={confirmPassword !== passwordValue ? confirmMessage : ""}
              placeholder="Confirm Password"
              passwordLabel=""
              label="Confirm Password"
            />
            <div
              style={{
                marginTop: "3rem",
                marginBottom: "2rem",
              }}
            >
              {messages.map((regex, index) => (
                <div key={index} className="d-flex">
                  <Image
                    src={
                      regex.regex.test(passwordValue)
                        ? "/assets/Images/radio_check.png"
                        : "/assets/Images/close_red.png"
                    }
                    alt=""
                    height={20}
                    width={20}
                  />
                  <p style={{ marginLeft: "0.5rem" }}>{regex.text}</p>
                </div>
              ))}
            </div>
            {loader ? (
              <Loader style={{}} status={loader} />
            ) : (
              <Button type="submit" width="340px">
                Save & Continue
              </Button>
            )}
            {errorMessage.message === "" ? null : (
              <Message type={errorMessage.type}>{errorMessage.message}</Message>
            )}
          </form>
        </>
      }
      handleToken={() => {}}
    />
  );
}

export default CreateForgetPassword;
