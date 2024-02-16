import Img from "@/Components/Image/Image";
import { LoginContainer } from "@/styles/Container.styled";
import { Flex, Item } from "@/styles/Flex.styled";
import * as React from "react";
import styled from "styled-components";
import { Button } from "@/styles/Button.style";
import InputField from "@/Components/InputField";
import { useRouter } from "next/router";
import ImageUploadCard from "@/Components/UploadAvatar/UploadAvatar";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Checkbox,
} from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import { addUserProfile, uploadUserImage } from "@/helper";
import { Message } from "@/styles/message.style";
import Loader from "@/Components/Loaders/Loader";

function PersonalInformation() {
  const [errorMessage, setErrorMessage] = React.useState({
    type: false,
    message: "",
  });
  const [loader, setLoader] = React.useState(false);
  const [imageUrl, setImageUrl] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [checkValue, setCheckValue] = React.useState(false);
  const [value, setValue] = React.useState("female");
  const [Terms, setTerms] = React.useState<any>("")
  const [One, setOne] = React.useState<any>("");
  const [OneStatus, setOneStatus] = React.useState<any>(false);
  const [Two, setTwo] = React.useState<any>("");
  const [FirstNameEmpty, setFirstNameEmpty] = React.useState<any>("");
  const [TermsEmpty, setTermsEmpty] = React.useState<any>("");
  const [lastNameEmpty, setlastNameEmpty] = React.useState<any>("");
  const [TwoStatus, setTwoStatus] = React.useState<any>(false);

  const radioBoxHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };
  const router = useRouter();
  const { userId } = router.query || {};

  console.log("checkValue", checkValue)

  const errorterms = () => {
    setTerms("Please select the agreement of expert.")
  }





  React.useEffect(() => {
    if (!userId) {
      // router.replace("/auth/signup");
    }
  }, [userId, router]);


  const handleInputChange = (e: any) => {
    const inputValue = e.target.value;

    // Check if the input contains only alphabets using a regular expression
    if (/^[a-zA-Z]*$/.test(inputValue)) {
      setFirstName(inputValue);
      setOne("");
      setOneStatus(false);
    } else {
      setOneStatus(true);
      setOne("Please enter only alphabets");
    }
    // You can add an else block to handle invalid input if needed
  };
  const handleInputChangetwo = (e: any) => {
    const inputValue = e.target.value;

    // Check if the input contains only alphabets using a regular expression
    if (/^[a-zA-Z]*$/.test(inputValue)) {
      setLastName(inputValue);
      setTwo("");
      setTwoStatus(false);
    } else {
      setTwoStatus(true);
      setTwo("Please enter only alphabets");
    }
  };

  const genderId = 1;
  const imagePath = "";
  const modifiedBy = 0;

  const handleClick = (e: any) => {
    console.log("errorMessage", errorMessage)
    e.preventDefault();
    if (checkValue == false) {
      setErrorMessage({
        type: false,
        message: "Please select the Terms & Conditions",
      });
      return;
    }
    setLoader(true);
    addUserProfile({
      userId: Number(userId),
      firstName,
      lastName,
      genderId,
      imagePath: imageUrl,
      modifiedBy,
    })
      .then((result) => {
        if (result?.code === 0) {
          router.push({ pathname: "/auth/add_email", query: { userId } });
        } else {
          setErrorMessage({ type: false, message: result?.message });
        }
      })
      .catch((e) => alert(e))
      .finally(() => setLoader(false));
  };
  const onChangeFile = (e: any) => {
    e.preventDefault();
    uploadUserImage(userId, e.target.files[0], "preprod")
      .then((result: any) => {
        if (result?.code === 0) {
          setImageUrl(
            "https://1864597015.rsc.cdn77.org/consentformattachments/images/staging/" +
            result?.result?.imageURL
          );
        } else {
          setErrorMessage({ type: false, message: result?.message });
        }
      })
      .catch((e) => alert(e))
      .finally(() => setLoader(false));
  };

  const handleLinkClick = (e: any) => {
    e.preventDefault();
    window.open(e.currentTarget.href, "_blank");
  };

  const diabled = () => {
    if (firstName.length === 0 && lastName.length === 0 && checkValue === false) {
      setFirstNameEmpty("Enter First Name")
      setlastNameEmpty("Enter Last Name")
      setTermsEmpty("Please accept terms and conditions")
    } else if (firstName.length === 0) {
      setFirstNameEmpty("Enter First Name")
    } else if (lastName.length === 0) {
      setlastNameEmpty("Enter Last Name")
    } else if (checkValue === false) {
      setTermsEmpty("Please accept terms and conditions")
    }

  }

  const submitButton =
    firstName && lastName && checkValue && OneStatus === false && TwoStatus === false ? (
      <Button type="submit" width="340px" style={{ marginTop: "4rem" }}>
        Confirm
      </Button>
    ) : (
      <Button
        type="submit"
        width="340px"
        // onClick={() => diabled}
        style={{ backgroundColor: "#e17375", marginTop: "4rem" }}
      >
        Confirm
      </Button>
    );

  return (
    <div className="container mt-5 mb-4 text-center">
      <div className="backgroundsignup">
        <div className="row">
          <div className="col-md-4 bg_image_signup bg-light">
            <div className="text-center background_image_new d-flex align-items-center  h-100 justify-content-center">
              <Image
                className="img-fluid img_width_signup"
                src="/assets/Images/logoOnbanner.png"
                alt="Logo"
                height={249.19}
                width={156.02}
              />
            </div>
          </div>
          <div
            className="col-md-8 mx-auto d-flex flex-column align-items-center profl_color_page"
          >
            {/* <div className="col-md-12 text-end px-3 py-3">
              <button className="btn btn-light btn-sm rounded-pill color_light_font">
                Skip
              </button>
            </div> */}
            <div className="m-auto">
              <form onSubmit={handleClick}>
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
                  Profile <span style={{ color: "#dc0000" }}>Information</span>
                </h3>
                <p
                  style={{
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
                >
                  Dear user please add your personal information to
                  <br />
                  complete Registration
                </p>
                <InputField
                  indicateIcon="https://1864597015.rsc.cdn77.org/newexpertpreprod/icons/person.svg"
                  placeholder="Enter first name"
                  label="Enter First Name"
                  passwordLabel=""
                  type="text"
                  required={true}
                  onChange={handleInputChange}
                />
                <div className="col-md-12 text-start px-5">
                  {One ? <p className="m-0 ps-1 pe-0" style={{ fontSize: "12px", color: "red" }}>{One}</p> : null}
                </div>
                <InputField
                  indicateIcon="https://1864597015.rsc.cdn77.org/newexpertpreprod/icons/person.svg"
                  placeholder="Enter last name"
                  label="Enter Last Name"
                  passwordLabel=""
                  type="text"
                  required={true}
                  onChange={handleInputChangetwo}
                />
                <div className="col-md-12 text-start px-5">
                  {Two ? <p className="m-0 ps-1 pe-0" style={{ fontSize: "12px", color: "red" }}>{Two}</p> : null}
                </div>
                {checkValue === false ? null :
                  <>
                    {Terms.length > 0 ? <p>{Terms}</p> : null}
                  </>}

                <div className="row px-md-5 pt-2 ">
                  <div className="form-check form-check-inline d-flex ">
                    &nbsp;&nbsp;&nbsp;
                    <input
                      className="form-check-input check_padding "
                      type="checkbox"
                      onChange={() => setCheckValue(!checkValue)}
                      id="inlineCheckbox1"
                      defaultValue="option1"
                    />
                    &nbsp;&nbsp;
                    <label
                      className="form-check-label"
                      htmlFor="inlineCheckbox1"
                    >

                      <span style={{ color: "#6c6c6c", fontSize: "12px" }}>
                        I agree to the Expert
                      </span>{" "}
                      <span
                        style={{
                          fontWeight: "bold",
                          color: "#444444",
                          textDecoration: "none",
                          fontSize: "12px",
                        }}
                      >
                        <strong><Link className="style_a_tag11" href={"/auth/Termsandcondition"}> Terms of Service </Link></strong>
                      </span>
                      <span style={{ color: "#6c6c6c", fontSize: "12px" }}>
                        and&nbsp;
                      </span>
                      <span
                        style={{
                          fontWeight: "bold",
                          color: "#444444",
                          textDecoration: "none",
                          fontSize: "12px",
                        }}
                      >
                        <strong><Link className="style_a_tag11" href={"/auth/Privacypolicy"}>Privacy Policy</Link></strong>
                      </span>
                    </label>
                  </div>
                </div>


                {loader ? <Loader style={{}} status={loader} /> : submitButton}
                {errorMessage.message === "" ? null : (
                  <Message type={errorMessage.type}>
                    {errorMessage.message}
                  </Message>
                )}
              </form>
            </div>
            <div className="text-center position_of_font">
              <hr />
              <p className="font_set_terms_conditions m-0 p-0">
                <strong><Link className="style_a_tag11" href={"/auth/Termsandcondition"}> Terms & Conditions</Link></strong> • <strong><Link className="style_a_tag11" href={"/auth/Privacypolicy"}>Privacy Policy</Link></strong> • <Link className="style_a_tag11" href={"/auth/Cookies"}><strong> Cookies
                  Policy </strong></Link>
              </p>
              <p className="m-0 p-0 font_set_terms_conditions1">
                © 2024 Selteq Ltd.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PersonalInformation;
