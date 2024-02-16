import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Button } from "@/styles/Button.style";
import { Message } from "@/styles/message.style";
import Loader from "@/Components/Loaders/Loader";
import InputField from "@/Components/InputField";
import { addUserEmail } from "@/helper";
import ReusableAuthPage from "@/Components/reusable_auth_page";
function AddEmail() {
  const [addedEmail, setAddedEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(false);
  const router = useRouter();
  const [loader, setLoader] = useState(false);
  const [errorMessage, setErrorMessage] = useState({
    type: false,
    message: "",
  });
  const [authToken, setAuthToken] = useState("");
  const [emailValidationError, setEmailValidationError] = useState('');
  const query = router.query;
  const { userId, email } = query || {};

  const validatePassword = () => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(addedEmail);
  };

  const messages = [
    {
      text: "Write last name of domain eg (.net,.com etc)",
      regex: /^.[a-zA-Z]{2,}$/,
    },
  ];
  const invalidMessages = messages.filter(
    ({ regex }) => !regex.test(addedEmail)
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
          Email meets requirements
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
    setLoader(true);
    e.preventDefault();
    addUserEmail({
      userId: Number(query?.userId),
      text: addedEmail,
      modifiedBy: 0,
    })
      .then((result) => {
        if (result?.code === 0) {
          router.push({
            pathname: "/auth/email_verification",
            query: { ...query, email: addedEmail },
          });
        } else {
          setErrorMessage({ type: false, message: result?.message });
        }
      })
      .catch((e) => alert(e))
      .finally(() => setLoader(false));
  };

  const validateEmail = (email: any) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  function handleEmailChange(event: any) {
    const email1 = event.target.value;
    setAddedEmail(email1);
    setEmailValidationError(validateEmail(email1) ? '' : 'Invalid email format');
  }

  useEffect(() => {
    if (!email || !userId) {
      //   router.replace("/signup");
    }
  }, [router, email, userId]);
  // /////////////////////////  functions
  const handleToken = React.useCallback((token: any) => {
    setAuthToken(token);
  }, []);
  // console.log("profile-----------d", seconds);
  return (
    <ReusableAuthPage
      form={
        <>
          {" "}
          <h3
            style={{
              margin: " 0 0 5.8px",
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
            Email <span style={{ color: "#dc0000" }}>Verification</span>
          </h3>
          <p
            className="pt-2"
            style={{
              margin: "0.6px 0 40px 0",
              fontFamily: "Roboto",
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
            Please enter your Email Address
          </p>
          <form onSubmit={handleClick}>
            {/* <CustomInput 
            inputType="email"
            inputValue={addedEmail}
            handleInputValue={
              (e:any)=>{
                setAddedEmail(e.target.value);
                handleEmailChange(e);
              }
            }
            label="Email"
            placeholder="Enter Email Address"
            /> */}
            <InputField
              type="email"
              onChange={(e: any) => {
                setAddedEmail(e.target.value);
                handleEmailChange(e);
              }}
              indicateIcon="https://1864597015.rsc.cdn77.org/newexpertpreprod/icons/mail-icon.svg"
              placeholder="Enter email Address"
              passwordLabel=""
              required
              label="Email Address"
            />
            
            <div className="col-md-12 text-start">
            {emailValidationError ? <p className="m-0 p-0" style={{ fontSize: "12px", color: "red" }}>{emailValidationError}</p>: null}
            </div>
            {email && renderRequirementMessage()}
            {loader ? (
              <Loader
                style={{
                  marginTop: "5rem",
                }}
                status={loader}
              />
            ) : emailValidationError.length === 0 ? (
              <Button
                style={{
                  marginTop: "5rem",
                }}
                width="340px"
              >
                Next
              </Button>
            ) : (
              <Button
                disabled
                width="340px"
                style={{ backgroundColor: "#e17375", marginTop: "5rem" }}
              >
                Next
              </Button>
            )}
            {errorMessage.message === "" ? null : (
              <Message type={errorMessage.type}>{errorMessage.message}</Message>
            )}
          </form>
        </>
      }
      handleToken={handleToken}
    />
  );
}

export default AddEmail;
