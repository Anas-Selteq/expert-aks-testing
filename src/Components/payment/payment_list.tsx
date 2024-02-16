import React, { useEffect, useState } from "react";
import CreditCard from "./credit_card";
import { BiSearch } from "react-icons/bi";
import {
  addDefaultPaymentMethod,
  deletePaymentMethod,
  getAllListOfPayments,
} from "@/helper";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loaders/Loader";
import { setPaymentInLocalStorage } from "../helper";
import axios from "axios";
import { Console } from "console";
import { enqueueSnackbar } from "notistack";
import { AUTH_ACTIONS } from "@/Redux/Actions/loginPageAction";
import { removeCookie } from "@/utils/utils";
import { useRouter } from "next/router";


const PaymentList = ({ onClickHandler }: { onClickHandler: any }) => {
  /* -------------------------------------------------------------------------- */
  /*                                  Variables                                 */
  /* -------------------------------------------------------------------------- */
  const { profile } = useSelector((state: any) => state);
  const [listOfPaymentMethod, setListOfPaymentMethod] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [JwtRefreshToken, setJwtRefreshToken] = useState<any>("");
  const router = useRouter();
  const dispatch = useDispatch();


  useEffect(() => {
    setJwtRefreshToken(localStorage?.getItem("jwtRefreshToken"));
  }, []);

  // useEffect(() => {
  //   const Jwtset = async () => {

  //     // Convert the JWT token object to a string
  //     // const jwtTokenString = JSON.stringify(JwtRefreshToken);

  //     // Encode the JWT token to Base64
  //     const base64Token = Buffer.from(JwtRefreshToken).toString('base64');



  //     try {
  //       const response = await axios.get(
  //         `https://gateway.findanexpert.net/signup_svc/pb/users/getnewRefreshToken?tokenModel=${base64Token}`
  //       );
  //       // localStorage.setItem("jwtRefreshToken", response?.data?.result?.jwtRefreshToken)
  //       // localStorage.setItem("jwtToken", response?.data?.result?.jwtToken)
  //       if (response?.data?.code === 0) {
  //         localStorage.setItem("jwtRefreshToken", response?.data?.result?.jwtRefreshToken)
  //         localStorage.setItem("jwtToken", response?.data?.result?.jwtToken)
  //       }
  //       // Only update state if the component is still mounted
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   if (JwtRefreshToken) {
  //     Jwtset();
  //   }
  // }, [profile?.userId, JwtRefreshToken])
  /* -------------------------------------------------------------------------- */
  /*                                  Functions                                 */
  /* -------------------------------------------------------------------------- */
  useEffect(() => {
    setIsLoading(true);
    if (profile?.userId !== undefined) {
      getAllListOfPayments(profile?.externalCustomerId)
        .then((res) => {
          setListOfPaymentMethod(res?.paymentList?.data ?? []);
          if(res?.response?.status === 401){
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
        .catch((error: any) => {
          
        })
        .finally(() => setIsLoading(false));  
    }
  }, [profile.userId]);

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
      window.location.reload();
      // Only update state if the component is still mounted
    } catch (error) {
      console.log(error);
    }
  };

  const deletePaymentMethodHandler = (selectedPaymentMethodId: any) => {
    setIsLoading(true);
    deletePaymentMethod(profile?.externalCustomerId, selectedPaymentMethodId)
      .then((res) => {
        setListOfPaymentMethod((prev: any) =>
          prev.filter((item: any) => item.id !== selectedPaymentMethodId)
        );
      })
      .catch((e) => alert(e))
      .finally(() => setIsLoading(false));
  };

  const setAsDefaultHandler = (selectedPaymentMethodId: any) => {
    setIsLoading(true);
    addDefaultPaymentMethod(profile?.externalCustomerId, selectedPaymentMethodId)
      .then((res) => {
        setPaymentInLocalStorage(selectedPaymentMethodId);
        setListOfPaymentMethod((prevList: any) => {
          const updatedList = prevList.map((paymentMethod: any) => {
            if (paymentMethod.id === selectedPaymentMethodId) {
              return { ...paymentMethod, defaultPaymentMethod: true };
            } else {
              return { ...paymentMethod, defaultPaymentMethod: false };
            }
          });
          return updatedList;
        });
      })
      .catch((e) => alert(e))
      .finally(() => setIsLoading(false));
  };

  return (
    <>
      {/* <div className="col-md-12 mb-5">
        <div className="row">
          <div className="col-md-6"></div>
          <div className="col-md-6 ">
            <div className="row text-end">
              <div className="col-md-1"></div>
              <div className="col-md-6">
            <div
              className="d-flex align-items-center rounded-pill border border-primary-subtle"
              style={{
                padding: "0.3rem 1rem",
              }}
            >
              <BiSearch />
              <input
                type="text"
                className="border border-0 form-control form-control-sm "
                style={{
                  marginLeft: "0.5rem",
                  outline: "none",
                }}
                disabled={isLoading}
                placeholder="Search"
              />
              
            </div>
            </div>
            <div className="col-md-5 m-md-auto mt-2">
            <span>
            {isLoading ? (
          <Loader style={{}} status={isLoading} />
        ) : (
          <button
            className="btn btn-danger rounded-pill w-100"
            onClick={onClickHandler}
          >
            Add Payment Method
          </button>
        )}
            </span>
            </div>
            
            </div>
           
          </div>
      
       
        </div>
      </div> */}
      <div className="col-md-12 mb-5 pb-5 mt-4 ">
        <div className="row">
          {isLoading ? (
            <Loader style={{}} status={isLoading} />
          ) : (
            <>
              {listOfPaymentMethod?.length === 0 ? <>No Payment Method</> : listOfPaymentMethod.map((item: any, index: any) => {
                return (
                  <div className=" col-sm-6 col-lg-4 ">
                    <CreditCard
                      key={index}
                      defaultBtn={item.defaultPaymentMethod}
                      cardProvider={item.card.brand}
                      lastFourDigits={item.card.last4}
                      expireMonth={item.card.exp_month}
                      expireYear={item.card.exp_year}
                      onDeleteClickHandler={deletePaymentMethodHandler}
                      setAsDefaultHandler={setAsDefaultHandler}
                      paymentMethodId={item.id}
                    />
                  </div>
                );
              })}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default PaymentList;
