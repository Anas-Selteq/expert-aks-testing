import InputField from "@/Components/InputField";
import Loader from "@/Components/Loaders/Loader";
import { signIn } from "@/helper";
import { Button } from "@/styles/Button.style";
import { Flex, Item } from "@/styles/Flex.styled";
import { Message } from "@/styles/message.style";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useRouter } from "next/router";
import * as React from "react";
import { forgetPassword } from "@/helper";
import { useDispatch } from "react-redux";
import { AUTH_ACTIONS } from "@/Redux/Actions/loginPageAction";
import Image from "next/image";
import { formatMobileNumber } from "@/utils/utils";
import { InputTag } from "@/styles/Input.style";
import ReusableAuthPage from "@/Components/reusable_auth_page";
import Link from "next/link";

function Password() {
  const [errorMessage, setErrorMessage] = React.useState({
    type: false,
    message: "",
  });
  const [confirmMessage, setConfirmMessage] = React.useState("");
  const router = useRouter();
  const query = router.query || {};
  const { userId, priamryMobile, recreatePassword } = query || {};
  const [passwordValue, setPassword] = React.useState("");
  const [loader, setLoader] = React.useState(false);
  const [rememberMe, setRememberMe] = React.useState(false);
  const [selectedSer, setSelectedsir] = React.useState<any>("")
  const [CheckValue1, setCheckValue1] = React.useState<any>(false)


  const dispatch = useDispatch();
  React.useEffect(() => {
    if (!priamryMobile) {
      router.replace("/auth/signup");
    }
  }, [priamryMobile, router]);

  React.useEffect(() => {
    const storedData: any = localStorage.getItem('onclickselectedservice');
    setSelectedsir(JSON.parse(storedData));

  }, [])

  console.log("storedData", selectedSer)


  const handleClick = (e: any) => {
    const gettingseourl = localStorage.getItem("urlseoaddress")
    e.preventDefault();
    setLoader(true);
    signIn(query?.priamryMobile, passwordValue)
      .then((result) => {
        if (result?.code === 0) {
          localStorage.setItem("jwtToken", result?.result?.jwtToken);
          localStorage.setItem(
            "jwtRefreshToken",
            result?.result?.jwtRefreshToken
          );
          dispatch({
            type: AUTH_ACTIONS.LOGIN_SUCCESS,
            payload: result?.result?.user,
          });
          // if (selectedSer) {
          //   // router.push("/flowManagementPages/content-page");
          //   router.push(`/Service/${gettingseourl}?service=${selectedSer.serviceSKU}`);
          //   // router.push("/");
          // } else {
          router.push("/");
          // }

        } else if (result?.code === 4) {
          if (result?.result?.user?.firstName) {
            router.push({ pathname: "/auth/add_email", query: { ...query } });
          } else {
            router.push({
              pathname: "/auth/profile_information",
              query: { userId },
            });
          }
        } else {
          setErrorMessage({ type: false, message: result?.message });
        }
      })
      .catch((e) => alert(e))
      .finally(() => setLoader(false));
  };

  React.useEffect(() => {
    const handleKeyPress = (event: any) => {
      if (event.key === 'Enter') {
        handleClick(event);
      }
    };

    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleClick]);




  const ForgotPassword = (e: any) => {
    setLoader(true);
    forgetPassword(query?.priamryMobile)
      .then((result) => {
        if (result?.code === 0) {
          router.push({
            pathname: "/auth/mobile_verification",
            query: { ...result?.result, recreatePassword: true },
          });
          setErrorMessage({ type: false, message: result?.message });
        } else {
          setErrorMessage({ type: false, message: result?.message });
        }
      })
      .catch((e) => alert(e))
      .finally(() => setLoader(false));
  };
  return (
    <ReusableAuthPage
      form={
        <>
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
            {formatMobileNumber(priamryMobile || "+44789390444")}
          </h3>
          <p
            style={{
              margin: "0.6px 0 40px 0",
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
            Is already registered.
          </p>
          <InputField
            type="password"
            onChange={(e: any) => setPassword(e.target.value)}
            isPasswordField={true}
            indicateIcon="https://1864597015.rsc.cdn77.org/newexpertpreprod/icons/lock.svg"
            placeholder="Enter Password"
            passwordLabel=""
            label="Password"
          />
          <Flex
            style={{
              backgroundColor: "rgba(250, 235, 215, 0)",
              width: "340px",
            }}

          >
            <Item className="d-flex m-2 align-items-center">
              {/* <Image
                src={
                  rememberMe
                    ? "/assets/Images/radio_check.png"
                    : "/assets/Images/radio_uncheck.png"
                }
                alt={rememberMe ? "checked" : "unChecked"}
                height={20}
                width={20}
              /> */}
              <input
                className="form-check-input check_padding"
                type="checkbox"
                // onChange={() => setCheckValue(!checkValue)}
                id="inlineCheckbox1"
                defaultValue="option1"
                checked
              />
              <p
                className="pt-2"
                style={{
                  marginLeft: "0.5rem",
                  marginBottom: "0",
                  fontSize: "12px",
                  color: "#6c6c6c",
                }}
                onClick={() => setRememberMe(!rememberMe)}
              >
                Remember Me
              </p>
            </Item>
            <Item>
              <p
                // onClick={ForgotPassword}
                className="pt-2x"
                style={{
                  cursor: "pointer",
                  margin: "0px",
                  fontFamily: "Poppins",
                  fontSize: "12px",
                  fontWeight: "normal",
                  fontStretch: "normal",
                  fontStyle: "normal",
                  lineHeight: "normal",
                  letterSpacing: "normal",
                  textAlign: "right",
                  color: "#a9a9a9",
                }}
              >
                <Link href="/auth/forgetpassword">
                  Forgot Password?
                </Link>
              </p>
            </Item>
          </Flex>
          {/* <div className="col-md-12 d-flex px-2">
            <input
              className="form-check-input check_padding "
              type="checkbox"
              onChange={() => setCheckValue1(!CheckValue1)}
              id="inlineCheckbox1"
            />
            <p
              className="pt-2 px-2"
              style={{
                fontSize: "12px",
                color: "#6c6c6c",
              }}
              onClick={() => setRememberMe(!rememberMe)}
            >
              Please accept <strong>Terms & Conditions.</strong>
            </p>
          </div> */}
          {loader ? (
            <Loader style={{}} status={loader} />
          ) : (
            <Button onClick={handleClick} width="340px" >
              Login
            </Button>
          )}
          {errorMessage.message === "" ? null : (
            <Message type={errorMessage.type}>{errorMessage.message}</Message>
          )}
        </>
      }
      handleToken={() => { }}
    />
  );
}

export default Password;
