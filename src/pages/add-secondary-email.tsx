import Img from "@/Components/Image/Image";
import { LoginContainer } from "@/styles/Container.styled";
import { Flex, Item } from "@/styles/Flex.styled";
import * as React from "react";
import styled from "styled-components";
import { CopyRight } from "@/styles/CopyRight.styled";
import { useRouter } from "next/router";
import { Button } from "@/styles/Button.style";
import InputField from "@/Components/InputField";
import { addUserSecondaryEmail } from "@/helper";
import { Message } from "@/styles/message.style";
import Loader from "@/Components/Loaders/Loader";
import { useDispatch, useSelector } from "react-redux";
import { AUTH_ACTIONS } from "@/Redux/Actions/loginPageAction";

function AddEmail() {
  const [errorMessage, setErrorMessage] = React.useState({
    type: false,
    message: "",
  });
  const [loader, setLoader] = React.useState(false);
  const router = useRouter();
  const query = router.query;
  const [email, setEmail] = React.useState("");
  const { profile } = useSelector((state: any) => state);
  const dispatch = useDispatch();
  const [isValidEmail, setIsValidEmail] = React.useState(false);

  // This is required
  const validatePassword = () => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  const newregex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  function handleEmailChange(event: any) {
    const email = event.target.value;
    setEmail(email);
    setIsValidEmail(newregex.test(email));
  }

  const messages = [
    {
      text: "Write last name of domain eg (.net,.com etc)",
      regex: /^.[a-zA-Z]{2,}$/,
    },
  ];
  const invalidMessages = messages.filter(({ regex }) => !regex.test(email));

  // This is required
  // This is required
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
    setLoader(true);
    e.preventDefault();
    addUserSecondaryEmail({
      userId: Number(query?.userId || profile.userId),
      text: email,
      modifiedBy: 0,
    }).then((result) => {
      dispatch({
        type: AUTH_ACTIONS.SECONDARY_EMAIL_ADD,
        payload: { secondaryEmail: email },
      });
      setLoader(false);
      if (result?.code === 0) {
        router.push({
          pathname: "/secondary-email-verify",
          query: { ...query, email: email },
        });
      } else {
        setErrorMessage({ type: false, message: result?.message });
      }
    });
  };
  console.log(isValidEmail);
  return (
    <div className="container mt-5 mb-4">
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
            <div className="col-md-12 text-end px-3 pt-3 pb-5">
              <button className="btn btn-light btn-sm rounded-pill color_light_font">
                Skip
              </button>
            </div>
            <div style={{}}>
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
                Email <span style={{ color: "#dc0000" }}>Verification</span>
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
                Please enter your Email Address
              </p>
              <form onSubmit={handleClick}>
                <InputField
                  type="email"
                  onChange={(e: any) => {
                    setEmail(e.target.value);
                    handleEmailChange(e);
                  }}
                  indicateIcon="https://1864597015.rsc.cdn77.org/newexpertpreprod/icons/mail-icon.svg"
                  placeholder="Enter email Address"
                  passwordLabel=""
                  required
                />
                {email && renderRequirementMessage()}
                {isValidEmail ? (
                  <Button width="340px">Next</Button>
                ) : (
                  <Button
                    disabled
                    width="340px"
                    style={{ backgroundColor: "gray" }}
                  >
                    Next
                  </Button>
                )}

                {loader ? (
                  <Loader style={{}} status={loader} />
                ) : (
                  <Message type={errorMessage.type}>
                    {" "}
                    {errorMessage.message}{" "}
                  </Message>
                )}
              </form>
            </div>
            <div className="col-md-12 padding_apply_signup_terms">
              <hr />
            </div>
            <div className="col-md-12 text-center ">
              <p className="font_set_terms_conditions">
                Terms & Conditions • Privacy Policy • Copyright • Cookies Policy
                • Help <br /> © 2024 Selteq Ltd.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddEmail;
