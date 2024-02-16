import { addNewPaymentMethod } from "../../helper";
import { useEffect, useRef, useState } from "react";
import { number, expirationDate, cvv } from "card-validator";
import creditCardType from "credit-card-type";
import Loader from "../Loaders/Loader";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import axios from "axios";
import { EncryptObject } from "@/utils/crypto";
import { enqueueSnackbar } from "notistack";
import { removeCookie } from "@/utils/utils";
import { AUTH_ACTIONS } from "@/Redux/Actions/loginPageAction";

const AddPayment = ({ }: {}) => {
  /* -------------------------------------------------------------------------- */
  /*                                  Variables                                 */
  /* -------------------------------------------------------------------------- */
  const [cardNumbers, setCardNumbers] = useState(["", "", "", ""]);
  const [declinedstatus, Setdeclinedstatus] = useState("")
  const [cardHolderName, setCardHolderName] = useState("");
  const [selectedMonth, setSelectedMonth] = useState(1);
  const [selectedYear, setSelectedYear] = useState("");
  const [cvc, setCvc] = useState("");
  const [cardLabel, setCardLabel] = useState("Visa");
  const [isCardValid, setIsCardValid] = useState(true);
  const [validcard, setValidcard] = useState(false);
  const [address, setAddress] = useState({
    flatBuildingNumber: "",
    streetAddress: "",
    country: "",
    city: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const { profile } = useSelector((state: any) => state);
  const [userorderid, setorderID] = useState<any>()
  const router = useRouter();
  const [flowpayment, setFlowpayment] = useState<any>(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>(Array(4).fill(null));
  const [jwtToken, setJwtToken] = useState<any>(null);
  const [AllCountries, setAllCountries] = useState<any>([])
  const [JwtRefreshToken, setJwtRefreshToken] = useState<any>("");
  const dispatch = useDispatch();

  console.log("AllCountries", AllCountries[187])


  useEffect(() => {
    setJwtRefreshToken(localStorage?.getItem("jwtRefreshToken"));
  }, []);

  useEffect(() => {
    const Jwtset = async () => {

      // Convert the JWT token object to a string
      // const jwtTokenString = JSON.stringify(JwtRefreshToken);

      // Encode the JWT token to Base64
      const base64Token = Buffer.from(JwtRefreshToken).toString('base64');



      try {
        const response = await axios.get(
          `https://gateway.findanexpert.net/signup_svc/pb/users/getnewRefreshToken?tokenModel=${base64Token}`
        );
        // localStorage.setItem("jwtRefreshToken", response?.data?.result?.jwtRefreshToken)
        // localStorage.setItem("jwtToken", response?.data?.result?.jwtToken)
        if (response?.data?.code === 0) {
          localStorage.setItem("jwtRefreshToken", response?.data?.result?.jwtRefreshToken)
          localStorage.setItem("jwtToken", response?.data?.result?.jwtToken)
        }
        // Only update state if the component is still mounted
      } catch (error) {
        console.log(error);
      }
    };
    if (JwtRefreshToken) {
      Jwtset();
    }
  }, [JwtRefreshToken])

  /* -------------------------------------------------------------------------- */
  /*                                  Functions                                 */
  /* -------------------------------------------------------------------------- */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };
  console.log("address", address)

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    const paymentObject = {
      email: profile?.primaryEmail,
      userId: profile?.externalCustomerId,
      cardOwnerName: cardHolderName,
      cardNumber: cardNumbers?.join(""),
      expirationYear: selectedYear,
      expirationMonth: selectedMonth,
      isDefault: true,
      cvv: cvc,
      fcmTokken: "",
      billingAddress: {
        city: address?.city,
        country: address?.country,
        line1: address?.flatBuildingNumber,
        line2: address?.streetAddress,
        state: "tes",
        postalCode: "47000",
      },
    };
    const encryptedObject = EncryptObject(JSON.stringify(paymentObject));
    const data = {
      inputModel: encryptedObject,
    }
    addNewPaymentMethod(data)
      .then((res) => {
        console.log("ress", res)
        if (res.code === 1) {
          Setdeclinedstatus("Your Card is Declined")
        } else if (res.code === 0) {
          {
            localStorage.getItem("paymentflag") ?
              router.push("/flowManagementPages/payment-seperate")
              :
              router.push("/userProfile/payment")
          }
          localStorage.removeItem("paymentflag")
          // onClickHandler();
        }
      })
      .catch((error: any) => {
        if (error?.response?.status === 401) {
          enqueueSnackbar('Your session has been expired, You have been logged out!', { variant: 'warning' });
          dispatch({ type: AUTH_ACTIONS.LOGOUT });
          removeCookie && removeCookie("profile");
          localStorage.removeItem("jwtToken");
          localStorage.removeItem("jwtRefreshToken");
          localStorage.clear();
          router.push("/");
          window.location.reload();
        }
      })
      .finally(() => setIsLoading(false));
  };


  const handleSubmit2 = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    const paymentObject = {
      email: profile?.primaryEmail,
      userId: profile?.userId,
      cardOwnerName: cardHolderName,
      cardNumber: cardNumbers?.join(""),
      expirationYear: selectedYear,
      expirationMonth: selectedMonth,
      cvv: cvc,
      billingAddress: {
        city: address?.city,
        country: address?.country,
        line1: address?.flatBuildingNumber,
        line2: address?.streetAddress,
        state: "tes",
        postalCode: "47000",
      },
    };
    addNewPaymentMethod(paymentObject)
      .then((res) => {
        console.log(".res", res);
        localStorage.removeItem('paymentflag');
        router.push("/flowManagementPages/payment-seperate");
        // onClickHandler();
      })
      .catch((e) => alert(e))
      .finally(() => setIsLoading(false));
  };



  const checkValidation = () => {

    const countryValidation = /^[A-Z]{2}$/.test(address.country);

    const isFormValid =
      countryValidation &&
      isCardValid &&
      address.flatBuildingNumber !== "" &&
      address.streetAddress !== "" &&
      address.city !== "";

    return !isFormValid;
  };

  useEffect(() => {
    const isCardNumberValid = number(cardNumbers.join("")).isValid;
    const isExpirationDateValid = expirationDate({
      month: selectedMonth,
      year: selectedYear,
    }).isValid;
    const isCvvValid = cvv(cvc).isValid;
    const dataValid = isCardNumberValid && isExpirationDateValid && isCvvValid;
    const cardTypeResult = creditCardType(cardNumbers.join(""));
    const cardTypeLabel =
      cardTypeResult && cardTypeResult[0]
        ? cardTypeResult[0].niceType
        : "Unknown";
    setCardLabel(cardTypeLabel);
    setIsCardValid(dataValid);
  }, [cardNumbers, selectedMonth, selectedYear, cvc]);

  useEffect(() => {
    const orderId = localStorage.getItem("orderId");
    setorderID(orderId)
  }, [])

  const today = new Date();
  const currentYear = today.getFullYear();
  const monthOptions = Array.from({ length: 12 }, (_, index) => {
    const monthValue = (index + 1).toString().padStart(2, "0");
    return (
      <option key={monthValue} value={monthValue}>
        {monthValue}
      </option>
    );
  });

  const yearOptions = Array.from({ length: 10 }, (_, index) => {
    const yearValue = (currentYear + index).toString();
    return (
      <option key={yearValue} value={yearValue}>
        {yearValue}
      </option>
    );
  });

  const handleCardNumberChange = (index: number, value: string) => {
    setValidcard(true)
    const newCardNumbers = [...cardNumbers];
    newCardNumbers[index] = value;
    setCardNumbers(newCardNumbers);
    if (value.length === 4 && index < cardNumbers.length - 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1]!.focus();
    }

  };
  const handleCvcValue = (e: any) => {
    const value = e.target.value;
    const sanitizedValue = value.replace(/\D/g, "");
    const trimmedValue = sanitizedValue.slice(0, 3);
    console.log(typeof trimmedValue);
    if (trimmedValue.length >= 4) {
    } else {
      setCvc(trimmedValue);
    }
  };
  const handleCardHolderNameChange = (e: any) => {
    const value = e.target.value;
    const sanitizedValue = value.replace(/[^A-Za-z\s]/g, ""); // Remove non-alphabetic and non-space characters
    setCardHolderName(sanitizedValue);
  };

  useEffect(() => {
    const paymentflag = localStorage.getItem('paymentflag');
    if (paymentflag !== null) {
      // Key exists in local storage, log 'Anas'
      setFlowpayment(true);
    } else {
      // Key doesn't exist in local storage, log 'Waqar'
      setFlowpayment(false);
    }
  }, [])

  const back = () => {
    {
      localStorage.getItem("paymentflag") ?
        router.push("/flowManagementPages/payment-seperate")
        :
        router.push("/userProfile/payment")
    }
    localStorage.removeItem("paymentflag")
  }

  console.log("cardNumbers.length", cardNumbers)

  useEffect(() => {
    setJwtToken(localStorage?.getItem("jwtToken"));
  }, []);

  useEffect(() => {
    const getallcountries = async () => {
      const isToken = jwtToken !== null;

      const headers = {
        // Authorization: isToken ? `Bearer ${jwtToken}` : undefined,
        "Content-Type": "application/json", // Update the content type if needed
        // withCredentials: true,
      };

      try {
        const response = await axios.get(
          `https://gateway.findanexpert.net/signup_svc/pb/country/getCountry`
          , { headers }
        );

        // Handle the response as needed
        console.log("all countries", response.data);
        setAllCountries(response.data.result);
        // Update your state or perform actions with the fetched data
      } catch (error) {
        // Handle errors
        console.error("Fetch error:", error);

        // You can also update state or take other actions based on the error
      }
    };
    getallcountries();
  }, [])

  return (
    <div className="margin_set_bottom pb-5 mt-4">
      {declinedstatus.length !== 0 ?
        <div className="alert alert-danger" role="alert">
          {declinedstatus}
        </div>
        : null}
      <div className="row">
        <div className="col-md-7 px-md-2">
          <div
            className={`bg-white rounded border ${validcard === false ? null : `${isCardValid ? "" : "border-danger"
              }`} p-3`}
          >
            <div className="">
              <span className="card_number_text">Card Number</span>
              <div className="">
                <div className="card-number-input">
                  {cardNumbers.map((number, index) => (
                    <input
                      key={index}
                      type="tel"
                      maxLength={4}
                      name="cardNumber"
                      placeholder="0000"
                      className="border border-0 border-bottom me-3 card_placeholder"
                      style={{
                        width: "15%",
                      }}
                      onKeyPress={(e) => {
                        if (e.which < 48 || e.which > 57) e.preventDefault(); // Prevent entering non-digit characters
                      }}
                      value={number}
                      onChange={(e) =>
                        handleCardNumberChange(index, e.target.value)
                      }
                      ref={(el) => (inputRefs.current[index] = el)}
                      required
                    />
                  ))}
                </div>
              </div>
            </div>
            <label htmlFor="Name" className="card_number_text pt-3 ">
              Card Holder Name
            </label>
            <div>
              <input
                type="text"
                id="Name"
                className="form-control card-input-field"
                value={cardHolderName}
                placeholder="Card Holder Name"
                onChange={handleCardHolderNameChange}
              />
            </div>
            <div className="row pt-3 ">
              <div className="col-md-6 col-8">
                <div >
                  <label htmlFor="expiry" className="card_number_text">
                    Expire Date
                  </label>
                  <div className="d-flex">
                    <select
                      className="form-control border_removal"
                      id="expiry"
                      value={selectedMonth}
                      onChange={(e: any) => setSelectedMonth(e.target.value)}
                    >
                      {monthOptions}
                    </select>&nbsp;&nbsp;
                    <select
                      className="form-control border_removal"
                      id="expiry-year"
                      value={selectedYear}
                      onChange={(e) => setSelectedYear(e.target.value)}
                    >
                      {yearOptions}
                    </select>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-4">
                <div>
                  <label htmlFor="cvc" className="card_number_text px-3">
                    CVC
                  </label>
                  <div>
                    <input
                      type="number"
                      id="cvc"
                      value={cvc}
                      onChange={handleCvcValue}
                      maxLength={3}
                      min="0"
                      max="999"
                      pattern="[0-9]*" // Allow only digits on mobile devices
                      inputMode="numeric" // Show numeric keyboard on mobile devices
                      placeholder="000"
                      className=" border border-0 border-bottom card_placeholder1 form-control"
                      onKeyPress={(e) => {
                        if (e.which < 48 || e.which > 57) e.preventDefault(); // Prevent entering non-digit characters
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {validcard === false ? null :
        <>
          {isCardValid ? null : (
            <p className="text-danger pt-2 m-0 pb-0 font_size_card_not_valid">This Card is not valid</p>
          )}
        </>
      }
      <div className="col-md-12">
        <div className="row">
          <div className="col-md-12 px-md-2 mt-3">
            <div className="rounded outline_of_input">
              <div
                className="input_font_header"
              >
                Flat & Building Number
              </div>
              <input
                type="text"
                className="border border-0 input_field_text"
                style={{
                  outline: "none",
                  width: "100%",
                }}
                placeholder="Flat & Building Number"
                name="flatBuildingNumber"
                value={address.flatBuildingNumber}
                disabled={isLoading}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="mt-3 px-md-2">
            <div className="rounded outline_of_input ">
              <div
                className="input_font_header"
              >
                Street Address
              </div>
              <input
                type="text"
                style={{
                  outline: "none",
                  width: "100%",
                }}
                className="border border-0 input_field_text"
                placeholder="Street Address"
                name="streetAddress"
                value={address.streetAddress}
                disabled={isLoading}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="col-md-6 px-md-2 mt-3">
            <div className="rounded outline_of_input">
              <div
                className="input_font_header"
              >
                Country
              </div>
              {/* <input
                type="text"
                className="border border-0 input_field_text "
                style={{
                  outline: "none",
                  width: "100%",
                }}
                placeholder="Country"
                name="country"
                value={address.country}
                disabled={isLoading}
                onChange={handleInputChange}
              /> */}
              <select id="country" name="country" onChange={(e: any) => handleInputChange(e)} className="border w-100 border-0 input_field_text ">
              <option value="" className='input_discount' > Select Country</option>
                {AllCountries?.map((item: any, index: any) => {
                  return (
                    <option key={index} value={item.isoCode} className='px-4'>{item?.name}</option>
                  )
                })}
              </select>
            </div>
          </div>
          <div className="col-md-6 px-md-2 mt-3">
            <div className="rounded outline_of_input">
              <div
                className="input_font_header"
              >
                City
              </div>
              <input
                type="text"
                className="border border-0 input_field_text"
                style={{
                  outline: "none",
                  width: "100%",
                }}
                placeholder="City"
                name="city"
                value={address.city}
                disabled={isLoading}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>
      </div>
      {/* <div className="d-flex my-4">
        <input
       
        />
        <input
          type="text"
          placeholder="Street Address"
          className="rounded border border-primary-subtle px-3 py-2"
          name="streetAddress"
          value={address.streetAddress}
          disabled={isLoading}
          onChange={handleInputChange}
        />
      </div>
      <input
        type="text"
        placeholder="UK"
        className="rounded border border-primary-subtle px-3 py-2 me-4"
        name="country"
        value={address.country}
        disabled={isLoading}
        onChange={handleInputChange}
      />
      <input
        type="text"
        placeholder="City"
        className="rounded border border-primary-subtle px-3 py-2"
        name="city"
        value={address.city}
        disabled={isLoading}
        onChange={handleInputChange}
      /> */}
      <div className="d-flex justify-content-end mt-4 pt-3">
        <button
          className="bg-danger bg-opacity-25 border-0 rounded text-danger me-4 px-md-5 px-3 py-2"
          disabled={isLoading}
          onClick={back}
        >
          Go Back
        </button>
        {isLoading ? (
          <Loader status={isLoading} style={{}} />
        ) : (
          <>
            {checkValidation() ?
              <button
                type="submit"
                className="btn btn-light background_disabled_button px-md-5"
                disabled={checkValidation()}
                onClick={handleSubmit}
              >
                Save Now
              </button>
              :
              <>
                {/* {flowpayment ?
                  <button
                    className="btn btn-danger px-md-5"
                    type="submit"
                    onClick={handleSubmit2}
                  >
                    Add Now
                  </button> :
                  
                } */}
                <button
                  className="btn btn-danger px-md-5"
                  type="submit"
                  onClick={handleSubmit}
                >
                  Save Now
                </button>

              </>
            }
          </>

        )}
      </div>
    </div>
  );
};

export default AddPayment;
