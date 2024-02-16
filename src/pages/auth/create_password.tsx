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
  const [confirmPassword, setConfirm] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [errorconfirmpassword, setErrorconfirmpassword] = useState("");

  useEffect(() => {
    if (!userOTP) {
      //   router.replace("/signup");
    }
  }, [router, userOTP]);

  const validatePassword = () => {
    const regex = /^(?=.*\d)(?=.*[!\"£$@#%^&()<>*{}~`?/{}';:+=-_[]\|.])(?=.*[a-zA-Z]).{8,}$/;
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
      regex: /^(?=.*[!\"£$@#%^&()<>*{}~`?/{}';:+=-])/,
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
      // setConfirmMessage("Please confirm your password");
    } else if (invalidMessages.length !== 0) {
      return;
    } else if (passwordValue == "") {
      setConfirmMessage("Please confirm your password");
    } else {
      setLoader(true);
      resetOrAddUserPassword(query.userId, false, passwordValue, userOTP)
        .then((result) => {
          if (result?.code === 0) {
            setErrorMessage({ type: true, message: result?.message });
            localStorage.setItem("jwtToken", result.result.jwtToken);
            localStorage.setItem(
              "jwtRefreshToken",
              result.result.jwtRefreshToken
            );
            router.push({
              pathname: "/auth/profile_information",
              query: { ...query },
            });
          } else {
            setErrorMessage({ type: false, message: result?.message });
          }
        })
        .catch((e) => alert(e))
        .finally(() => setLoader(false));
    }
  };

  const passwordcheck = () => {
    if (passwordValue.length === 0 && confirmPassword.length === 0) {
      setErrorPassword("Please enter password");
      setErrorconfirmpassword("Please enter password");
    } else if (confirmPassword.length === 0) {
      setErrorconfirmpassword("Please enter password");
    } else if (passwordValue.length) {
      setErrorPassword("Please enter password");
    } else {
      console.log("");
    }
  };

  return (
    <ReusableAuthPage
      form={
        <>
          <h3
            style={{
              margin: " 0 0 4% 0",
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
            <div className="text-start">
              <p className="m-0 p-0" style={{ fontSize: "12px", color: "red" }}>
                {errorPassword}
              </p>
            </div>
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
            <div className="text-start">
              <p className="m-0 p-0" style={{ fontSize: "12px", color: "red" }}>
                {errorconfirmpassword}
              </p>
            </div>
            <div className="col-md-12 text-start mt-1">
              {confirmPassword.length === 0 ? null : (
                <>
                  {passwordValue != confirmPassword ? (
                    <p
                      className="m-0 p-0 "
                      style={{ fontSize: "10px", color: "red" }}
                    >
                      Password Not Matched!
                    </p>
                  ) : null}
                </>
              )}
            </div>
            <div
              style={{
                marginTop: "3rem",
                marginBottom: "2rem",
              }}
            >
              {messages.map((regex, index) => (
                <div key={index} className="d-flex p-0 m-0">
                  <Image
                    src={
                      regex.regex.test(passwordValue)
                        ? "/assets/Images/radio_check.png"
                        : "/assets/Images/close_red.png"
                    }
                    alt=""
                    height={16}
                    width={16}
                    style={{ marginTop: "0.2%" }}
                  />
                  <p
                    className="my-0 pb-1"
                    style={{
                      marginLeft: "0.5rem",
                      color: "#6c6c6c",
                      fontSize: "12px",
                      fontFamily: "Roboto",
                    }}
                  >
                    {regex.text}
                  </p>
                </div>
              ))}
            </div>
            {/* {loader ? (
              <Loader style={{}} status={loader} />
            ) : (
              /^(?=.*\d)(?=.*[!\"£$@#%^&*])(?=.*[a-zA-Z]).{8,}$/.test(
                passwordValue
              ) &&
              passwordValue === confirmPassword && (
                <Button type="submit" width="340px">
                  Save & Continuee
                </Button>
              )
            )} */}
            {loader ? (
              <Loader style={{}} status={loader} />
            ) : (
              <div>
                {passwordValue === confirmPassword &&
                /^(?=.*\d)(?=.*[!\"£$@#%^&*])(?=.*[a-zA-Z]).{8,}$/.test(
                  passwordValue
                ) ? (
                  <Button
                    type="submit"
                    width="340px"
                    style={
                      passwordValue === confirmPassword &&
                      /^(?=.*\d)(?=.*[!\"£$@#%^&*])(?=.*[a-zA-Z]).{8,}$/.test(
                        passwordValue
                      )
                        ? { backgroundColor: "#DF1919" }
                        : { backgroundColor: "#ef9393 ", cursor: "no-drop" }
                    }
                  >
                    Save & Continue
                  </Button>
                ) : (
                  <Button
                    width="340px"
                    onClick={passwordcheck}
                    style={
                      passwordValue === confirmPassword &&
                      /^(?=.*\d)(?=.*[!\"£$@#%^&*])(?=.*[a-zA-Z]).{8,}$/.test(
                        passwordValue
                      )
                        ? { backgroundColor: "#DF1919" }
                        : { backgroundColor: "#ef9393 ", cursor: "no-drop" }
                    }
                  >
                    Save & Continue
                  </Button>
                )}
              </div>
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
