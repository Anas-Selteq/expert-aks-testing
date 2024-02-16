import axios from "axios";
import { useEffect, useState } from "react";
import { EncryptObject } from "./utils/crypto";
import { enqueueSnackbar } from "notistack";
import { useDispatch } from "react-redux";
import { AUTH_ACTIONS } from "./Redux/Actions/loginPageAction";
import { removeCookie } from "./utils/utils";
import { useRouter } from "next/router";



/* -------------------------------------------------------------------------- */
/*                                 local APIS                                 */
/* -------------------------------------------------------------------------- */
// const providerAvailabilityApi = "http://172.187.153.193:8083/provideravalability_svc/pb/";
// const providerCellApi = "http://172.187.153.193:8097/providercell_svc/pv/";
// const paymentApi = "http://172.187.153.193:8058/payment_svc/pb/"
// const cartApi = "http://172.187.153.193:8074/Cart_svc/pv /";
// const notesApi = "http://172.187.153.193:8094/notes/pb/";
// const addressApi = "http://172.187.153.193:8089/address_svc/pv/";
// const industryApi = "http://172.187.153.193:8090/industry_svc/pb/";
// const serviceInventoryApi = "http://172.187.153.193:8084/serviceInventory_svc/pb/";
// const purchaseOrderApi = "http://172.187.153.193:8096/purchaseOrder/pb/order/";
// const otpApi = "http://172.187.153.193:8049/otp_generation_svc/pb/verify/otp/";

/* -------------------------------------------------------------------------- */
/*                          with base URL of Gateway                          */
/* -------------------------------------------------------------------------- */
const baseUrl = "https://gateway.findanexpert.net/";



const signUpApi = `${baseUrl}signup_svc/`;
const providerAvailabilityApi = `${baseUrl}provideravalability_svc/pb/`;
const providerCellApi = `${baseUrl}providercell_svc/pv/`;
const paymentApi = `${baseUrl}payment_svc/pv/`;
const cartApi = `${baseUrl}cart_svc/pv/`;
const notesApi = `${baseUrl}notesapi_svc/pb/`;
const addressApi = `${baseUrl}address_svc/pv/`;
const industryApi = `${baseUrl}industry_svc/pb/`;
const BusinessUrl = `${baseUrl}business_svc/pv/`;
const bookingApi = `${baseUrl}bookingorder_svc/pb/`;
const serviceInventoryApi = `${baseUrl}serviceinventory_svc/pb/`;
const purchaseOrderApi = `${baseUrl}purchaseorder_svc/pb/`;
const otpApi = `${baseUrl}otp_generation_svc/pb/verify/otp/`;
const homePageSectionApi = `${baseUrl}homepage_svc/pb/`;
const serviceInventoryUrl = `${baseUrl}serviceInventory_svc/pb/`;
const salesorderdetail = `${baseUrl}sales_order_svc/pb/`;
const staffApi = `${baseUrl}staff_svc/pv/`;

/* -------------------------------------------------------------------------- */
/*                                previous APIS                               */
/* -------------------------------------------------------------------------- */
// const signUpApi = "https://microsignupapi-preprod.findanexpert.net/signup_svc/";
// const providerAvailabilityApi =
//   "https://provideravailability-prepod.findanexpert.net/provideravalability_svc/pb/";
// const providerCellApi =
//   "https://providercellapi-preprod.findanexpert.net/providercell_svc/pv/";
// const paymentApi =
//   "https://paymentserviceapi-preprod.findanexpert.net/payment_svc/pb/";
// const cartApi = "https://cartserviceapi-preprod.findanexpert.net/Cart_svc/pv /";
// const notesApi = "https://notesapi-preprod.findanexpert.net/notes/pb/";
// const addressApi =
//   "https://microexpertaddressapi-preprod.findanexpert.net/address_svc/pv/";
// const industryApi =
//   "https://expertindustryapi-preprod.findanexpert.net/industry_svc/pb/";
// const BusinessUrl = "https://expertbusinessapi-preprod.findanexpert.net/business_svc/pv/";
// const bookingApi = "https://bookingorderapi-preprod.findanexpert.net/bookingOrder/pb/";
// const serviceInventoryApi =
//   "https://microinventoryapi-preprod.findanexpert.net/serviceInventory_svc/pb/";
// const purchaseOrderApi =
// "https://purchaseorderapi-preprod.findanexpert.net/purchaseOrder/pb/";
// const otpApi = "https://otpgenerateapi-preprod.findanexpert.net/otp_generation_svc/pb/verify/otp/";
// const homePageSectionApi =
//   "https://experthomepageapi-preprod.findanexpert.net/homePage_svc/pb/";
// const serviceInventoryUrl =
//   "https://plexaarinventoryservice-preprod.findanexpert.net/serviceInventory_svc/pb/";

/* -------------------------------------------------------------------------- */
/*                                Plexaar APIS                                */
/* -------------------------------------------------------------------------- */
const partnerApi = `https://plexaargateway.findanexpert.net/partner_svc/pv/`;


const createApiConfigAndRequest = async (
  method: any,
  endpoint: any,
  data: any = null,
  isToken: boolean = false,
  content_type: string = "application/json"
) => {

  const config = {
    method,
    url: endpoint,
    headers: {
      "Content-Type": content_type,
      Authorization: isToken
        ? `Bearer ${localStorage.getItem("jwtToken")}`
        : undefined,
    },
    data: data && JSON.stringify(data),
  };
  try {
    const result = await axios(config);
    return result.data;
  } catch (error: any) {

    return error;
  }
};

const Jwtset = async (JwtRefreshToken: any) => {

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
    // setTimeout(() => {
    //   window.location.reload();
    // }, 3000);
    // Only update state if the component is still mounted
  } catch (error) {
    console.log(error);
  }
};

const createApiConfigAndRequestForFiles = async (
  method: any,
  url: any,
  data: any = null,
  isToken: boolean = false,
  content_type: string = "application/json"
) => {
  const config = {
    method,
    url: url,
    headers: {
      "Content-Type": content_type,
      Authorization: isToken
        ? `Bearer ${localStorage.getItem("jwtToken")}`
        : undefined,
    },
    data: data,
  };
  try {
    const result = await axios(config);
    return result.data;
  } catch (error) {
    return error;
  }
};

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("jwtToken");
    if (token && config.url && config.url.includes("/pv/")) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/* --------------------------- Checking the Number -------------------------- */
export const numberVerifier = (
  mobileNumber: number,
  recaptchaToken: string,
  selectedcountryy: any
) => {
  var data = {
    mobileNumber: `+${mobileNumber}`,
    countryId: 1,
    deviceId: navigator.userAgent,
    isMobile: false,
    isCrossPlatForm: false,
    raptchaToken: recaptchaToken,
    isAndroidRequest: false,
  };
  return createApiConfigAndRequest(
    "post",
    `${signUpApi}pb/users/register`,
    data
  );
};

/* --------------------------- Checking the Number -------------------------- */
export const forgetpassowrd = (
  mobileNumber: number,
  recaptchaToken: string,
  selectedcountryy: any
) => {
  var data = {
    mobileNumber: `+${mobileNumber}`,
    countryId: 1,
    deviceId: navigator.userAgent,
    isMobile: false,
    isCrossPlatForm: false,
    raptchaToken: recaptchaToken,
    isAndroidRequest: false,
  };
  return createApiConfigAndRequest(
    "post",
    `${signUpApi}pb/users/forgetPassword`,
    data
  );
};

/* --------------------- Adding Secondary Mobile Number --------------------- */
export const addSecondaryMobileNumber = (
  userId: number,
  secondaryMobile: number,
  recaptchaToken: string
) => {
  var data = {
    userId,
    secondaryMobile: `${secondaryMobile}`,
    deviceId: navigator.userAgent,
    isMobile: false,
    raptchaToken: recaptchaToken,
    isAndroidRequest: false,
    mobileCaptchaData: {
      projectId: "findanexpert-client",
      recaptchaAction: "LOGIN",
      recaptchaSiteKey: "6LdbmQMlAAAAAI0uG7ZSF6Uhf8gpPfoG6f9bjpCK",
    },
  };
  return createApiConfigAndRequest(
    "post",
    `${signUpApi}pv/users/addSecondaryMobile`,
    data
  );
};

/* --------------------- Resend Secondary Mobile Number --------------------- */
export const ResendSecondaryMobileNumber = (
  userId: number,
  recaptchaToken: string
) => {
  var data = {
    userId,
    type: 2,
    deviceId: navigator.userAgent,
    isMobile: false,
    raptchaToken: recaptchaToken,
    isAndroidRequest: false,
    mobileCaptchaData: {
      projectId: "findanexpert-client",
      recaptchaAction: "LOGIN",
      recaptchaSiteKey: "6LdbmQMlAAAAAI0uG7ZSF6Uhf8gpPfoG6f9bjpCK",
    },
  };
  return createApiConfigAndRequest(
    "post",
    `${signUpApi}pb/users/resendMobileOtp`,
    data
  );
};

/* --------------------------------- Sign In -------------------------------- */
export const signIn = (mobileNumber: any, password: string) => {
  var data = {
    mobileNumber: mobileNumber,
    password: password,
  };
  return createApiConfigAndRequest("post", `${signUpApi}pb/users/signIn`, data);
};

/* --------------------- update First Name and Last Name -------------------- */
export const updateUserNames = (
  userId: number,
  firstName: string,
  lastName: string,
  ModifiedBy: any
) => {
  let data = {
    userId,
    firstName,
    lastName,
    ModifiedBy: userId,
  };
  return createApiConfigAndRequest(
    "put",
    `${signUpApi}pv/users/updateBasicProfile`,
    data,
    true
  );
};

/* --------------------- Delete User Account -------------------- */
export const DeleteUserAccount = (
  mobileNumber: string,
  ModifiedBy: any
) => {
  let data = {
    mobileNumber,
    ModifiedBy: ModifiedBy,
  };
  return createApiConfigAndRequest(
    "delete",
    `${signUpApi}pv/users/deleteUserAccount`,
    data,
    true
  );
};

/* ------------------------------ Update Gender ----------------------------- */
export const updateUserGender = (
  userId: number,
  genderId: number,
  ModifiedBy: any
) => {
  let data = {
    userId,
    genderId,
    ModifiedBy: userId,
  };
  return createApiConfigAndRequest(
    "post",
    `${signUpApi}pv/users/addUsergender`,
    data,
    true
  );
};

/* -------------------------- Update Date of Birth -------------------------- */
export const updateUserDOB = (userId: number, dob: string, ModifiedBy: any) => {
  let data = {
    userId,
    dob,
    ModifiedBy: userId,
  };
  return createApiConfigAndRequest(
    "post",
    `${signUpApi}pv/users/addUserDob`,
    data,
    true
  );
};

/* ---------------------------- Upload User Image --------------------------- */
export const uploadUserImage = (
  userId?: any,
  fileInput?: any,
  environment?: string
) => {
  const form = new FormData();
  form.append("AllFilesToUpload", fileInput);
  return createApiConfigAndRequest(
    "post",
    `${signUpApi}pv/users/addUserImage?UserId=${userId}&environment=${environment}`,
    form,
    true,
    "multipart/form-data"
  );
};

/* ---------------------------- Update User Image --------------------------- */
export const updateUserImage = (userId?: any, imagePath?: any) => {
  let data = {
    userId,
    imagePath: imagePath,
    modifiedBy: userId,
  };

  return createApiConfigAndRequest(
    "put",
    `${signUpApi}pv/users/changeUserImage`,
    data,
    true
  );
};

// /* --------------------------- Reset User Password -------------------------- */
// export const resetUserPassword = (userId: any, password: any, userOTP: any) => {
//   var data = {
//     userId: userId,
//     password: password,
//     otp: userOTP,
//     deviceId: navigator.userAgent,
//   };
//   return createApiConfigAndRequest(
//     "post",
//     `${signUpApi}pb/users/resetUserPassword`,
//     data
//   );
// };

/* ----------------------------- Resend Otp Code ---------------------------- */
export const resendOTPCode = (userId: any, recaptchaToken?: any) => {
  const data = {
    userId: userId,
    type: 1,
    isMobile: false,
    isCrossPlatForm: false,
    raptchaToken: recaptchaToken,
    isAndroidRequest: false,
    mobileCaptchaData: {
      projectId: "findanexpert-client",
      recaptchaAction: "LOGIN",
      recaptchaSiteKey: "6LdbmQMlAAAAAI0uG7ZSF6Uhf8gpPfoG6f9bjpCK",
    },
  };
  return createApiConfigAndRequest(
    "post",
    `${signUpApi}pb/users/ResendMobileOtp`,
    data
  );
};

/* ------------------------ Resend Otp Code Secondary ----------------------- */
export const resendOTPCodeSecondary = (userId: any, recaptchaToken?: any) => {
  const data = {
    userId: userId,
    type: 2,
    isMobile: false,
    isCrossPlatForm: false,
    raptchaToken: recaptchaToken,
    isAndroidRequest: false,
    mobileCaptchaData: {
      projectId: "findanexpert-client",
      recaptchaAction: "LOGIN",
      recaptchaSiteKey: "6LdbmQMlAAAAAI0uG7ZSF6Uhf8gpPfoG6f9bjpCK",
    },
  };
  return createApiConfigAndRequest(
    "post",
    `${signUpApi}pb/users/ResendMobileOtp`,
    data
  );
};

/* -------------------------- Resend Email Otp Code ------------------------- */
export const resendEmailOTPCode = (
  userId: any,
  type: any,
  IsEmailOTP?: boolean
) => {
  let data = { userId, type };
  return createApiConfigAndRequest(
    "post",
    `${signUpApi}pb/users/resendEmailOtp`,
    data
  );
};

/* --------------------- Resend Secondary Email OTP Code -------------------- */
export const resendSecondaryEmailOTPCode = (
  userId: any,
  IsEmailOTP?: boolean
) => {
  let data = { userId, type: 2 };
  return createApiConfigAndRequest(
    "post",
    `${signUpApi}pb/users/resendEmailOtp`,
    data
  );
};

/* ---------------------------- Add User Profile ---------------------------- */
export const addUserProfile = ({
  userId,
  firstName,
  lastName,
  genderId,
  imagePath,
  modifiedBy,
}: {
  userId: number;
  firstName: string;
  lastName: string;
  genderId: number;
  imagePath: string;
  modifiedBy: number;
}) => {
  var data = {
    userId: userId,
    firstName: firstName,
    lastName: lastName,
    genderId: genderId,
    imagePath: imagePath,
    modifiedBy: modifiedBy || 0,
  };
  return createApiConfigAndRequest(
    "post",
    `${signUpApi}pv/users/addUserProfile`,
    data,
    true,
  );
};

/* ----------------------- Reset and Add User Password ---------------------- */
export const resetOrAddUserPassword = (
  userId: any,
  isRest?: boolean,
  password?: any,
  userOTP?: any
) => {
  var data = {
    userId: userId,
    password: password,
    otp: userOTP,
    deviceId: navigator.userAgent,
  };
  return createApiConfigAndRequest(
    "post",
    `${signUpApi}pb/users/${isRest == true ? "resetUserPassword" : "addUserPassword"
    }`,
    data
  );
};

/* ----------------------- Resett and Add User Password ---------------------- */
export const resettPassword = (
  userId: any,
  isRest?: boolean,
  password?: any,
  userOTP?: any
) => {
  var data = {
    userId: userId,
    password: password,
    otp: userOTP,
    deviceId: navigator.userAgent,
  };
  return createApiConfigAndRequest(
    "post",
    `${signUpApi}pb/users/resetUserPassword`,
    data
  );
};


/* ----------------------- update and Add User Password ---------------------- */
export const UpdatePassword = (
  userId: any,
  passwordValue: any,
  CurrentPassword: any
) => {
  var data = {
    userId: userId,
    newPassword: passwordValue,
    currentPassword: CurrentPassword
  };
  return createApiConfigAndRequest(
    "put",
    `${signUpApi}pv/users/changePassword`,
    data
  );
};

/* ----------------------------- Forget Password ---------------------------- */
export const forgetPassword = (mobileNumber: any) => {
  var data = {
    mobileNumber: mobileNumber,
    countryId: 1,
  };
  return createApiConfigAndRequest(
    "post",
    `${signUpApi}pb/users/forgetPassword`,
    data
  );
};

/* ----------------------------- Add User Email ----------------------------- */
export const addUserEmail = ({
  userId,
  text,
  modifiedBy,
}: {
  userId: number;
  text: string;
  modifiedBy: number;
}) => {
  var data = {
    userId: userId,
    text: text,
    type: 1,
    modifiedBy: modifiedBy,
  };
  return createApiConfigAndRequest(
    "post",
    `${signUpApi}pv/users/addUserEmails`,
    data,
    true,
  );
};

/* ------------------------ Add User Secondary Email ------------------------ */
export const addUserSecondaryEmail = ({
  userId,
  text,
  modifiedBy,
}: {
  userId: number;
  text: string;
  modifiedBy: number;
}) => {
  var data = {
    userId: userId,
    text: text,
    type: 2,
    modifiedBy: modifiedBy,
  };
  return createApiConfigAndRequest(
    "post",
    `${signUpApi}pv/users/addUserEmails`,
    data
  );
};

/* ----------------------------- Get User Detail ---------------------------- */
export const getUserDetail = (id: number) => {
  return createApiConfigAndRequest(
    "get",
    `${signUpApi}pv/users/getUserById?Id=${id}`
  );
};

/* -------------------------- Get User Detail By Id ------------------------- */
export const getUserDetailById = (id: any) => {
  return createApiConfigAndRequest(
    "get",
    `${signUpApi}pv/users/getUserById?Id=${id}`
  );
};

/* ------------------------------ Update Email ------------------------------ */
export const updateEmails = (
  id: number,
  text: string,
  type: number,
  ModifiedBy: any
) => {
  return createApiConfigAndRequest(
    "put",
    `${signUpApi}pv/users/updateEmails?UserId=${id}&text=${text}&type=${type}&ModifiedBy=${ModifiedBy}`
  );
};

/* ------------------------------ Update Mobile ----------------------------- */
export const updateMobile = (id: number, text: string) => {
  return createApiConfigAndRequest(
    "put",
    `${signUpApi}pv/users/updateMobile?UserId=${id}&text=${text}&type=2`
  );
};

/* -------------------------------------------------------------------------- */
/*                                Verifications                               */
/* -------------------------------------------------------------------------- */
export const VerificationAction = (
  userId: any,
  userOTP: string | number,
  phone: any
) => {
  var data = {
    userId: userId,
    otpCode: userOTP,
    phone: phone,
  };
  return createApiConfigAndRequest("post", otpApi, data);
};

export const EmailVerificationCodeAction = (
  // userId?:any
  userOTP: string | number,
  phone: any
) => {
  var data = {
    // userId: userId,
    otpCode: userOTP,
    phone: phone,
  };
  return createApiConfigAndRequest("post", otpApi, data);
};

export const EmailVerificationAction = (
  userOTP: any,
  email: any,
  userId: any
) => {
  var data = {
    otpCode: userOTP,
    email: email,
    userId: userId,
  };
  return createApiConfigAndRequest("post", otpApi, data);
};

export const VerifyUserEmailAction = ({
  userId,
  type,
}: {
  userId: number;
  type: number;
}) => {
  var data = {
    userId: userId,
    type,
  };
  return createApiConfigAndRequest(
    "post",
    `${signUpApi}pb/users/resendEmailOtp`,
    data,
    true,
  );
};

export const VerifyUserEmailSecondaryAction = ({
  userId,
  type,
}: {
  userId: number;
  type: number;
}) => {
  var data = {
    userId: userId,
    type,
  };
  return createApiConfigAndRequest(
    "post",
    `${signUpApi}pb/users/resendEmailOtp`,
    data
  );
};

export const VerifyUserMobileSecondaryAction = ({
  userId,
  type,
}: {
  userId: number;
  type: number;
}) => {
  var data = {
    userId: userId,
    type,
    isMobile: true,
    raptchaToken: "string",
    mobileCaptchaData: {
      projectId: "string",
      recaptchaAction: "string",
      recaptchaSiteKey: "string",
    },
  };
  return createApiConfigAndRequest(
    "post",
    `${signUpApi}pb/users/resendMobileOtp`,
    data
  );
};

/* -------------------------------------------------------------------------- */
/*                                    Slots                                   */
/* -------------------------------------------------------------------------- */
export const getTimeSlots = (data: any) => {
  return createApiConfigAndRequest(
    "post",
    `${providerAvailabilityApi}post/slots`,
    data
  );
};

/* -------------------------------------------------------------------------- */
/*                                   Address                                  */
/* -------------------------------------------------------------------------- */
export const removeAddress = (id: number) => {
  const data = {
    id: id,
    modifiedBy: 0,
  };
  return createApiConfigAndRequest(
    "delete",
    `${addressApi}UserAddress/removeAddress`,
    data,
    true
  );
};

export const createAddress = (formData: any) => {
  return createApiConfigAndRequest(
    "post",
    `${addressApi}UserAddress/addAddress`,
    formData
  );
};

export const getAddresses = (userId: any) => {
  return createApiConfigAndRequest(
    "get",
    `${addressApi}UserAddress/getAddressByUserId?Id=${userId}&addressTypeValue=1`
  );
};

export const updateAddress = (data: any) => {
  return createApiConfigAndRequest(
    "put",
    `${addressApi}UserAddress/updateAddress`,
    data,
  );
}

/* -------------------------------------------------------------------------- */
/*                             Purchase Order Api                             */
/* -------------------------------------------------------------------------- */
export const postPurchaseOrder = (data: any) => {
  return createApiConfigAndRequest("post", `${purchaseOrderApi}order/`, data);
  // return createApiConfigAndRequest("post", `  https://1553-119-155-4-95.ngrok-free.app/purchaseorder_svc/pb/order/`, data);
};

export const patchPurchaseOrder = (data: any) => {
  return createApiConfigAndRequest("patch", `${purchaseOrderApi}order/`, data);
  // return createApiConfigAndRequest("patch", `  https://1553-119-155-4-95.ngrok-free.app/purchaseorder_svc/pb/order/`, data);

};

export const getPurchaseOrderWithId = (id: number) => {
  return createApiConfigAndRequest(
    "get",
    `${purchaseOrderApi}getPurchaseOrderById/?PurchaseOrderId=${id}`
  );
};

export const getBookingsWithId = (id: number, appointmentid: any) => {
  return createApiConfigAndRequest(
    "get",
    `https://gateway.findanexpert.net/bookingorder_svc/pb/getBookingById/?expertBookingId=${id}&timeZone=Europe/London&appointmentId=${appointmentid}`
  );
};

export const getSalesOrderwithID = (id: number) => {
  return createApiConfigAndRequest(
    "get",
    `${salesorderdetail}sales_orders/${id}`
  );
};

export const getbookingorderwithId = (id: number) => {
  return createApiConfigAndRequest(
    "get",
    `${bookingApi}getBookingList/?customerId=${id}`
  );
};

export const updatePurchaseOrder = (data: any) => {
  return createApiConfigAndRequest(
    "patch",
    `${purchaseOrderApi}updatePurchaseOrder/`,
    data,
  );
}

export const getPurchaseOrderWithCustomerId = (userId: number) => {
  return createApiConfigAndRequest(
    "get",
    `${purchaseOrderApi}getCustomerPurchaseOrder/?customerId=${userId}`
  );
};

export const getAllPurchaseOrderWithCustomerId = (userId: number) => {
  return createApiConfigAndRequest(
    "get",
    `${purchaseOrderApi}allPurchaseOrder/?customerId=${userId}`
  );
};

/* -------------------------------------------------------------------------- */
/*                               Payment Methods                              */
/* -------------------------------------------------------------------------- */
export const getAllListOfPayments = (userId: number) => {
  return createApiConfigAndRequest(
    "get",
    `${paymentApi}Payment/ListOfCustomerPaymentMethods?UserId=${userId}`,
  );
};

export const addNewPaymentMethod = (object: any) => {
  return createApiConfigAndRequest(
    "post",
    `${paymentApi}Payment/SavePaymentMethod`,
    object
  );
};

export const deletePaymentMethod = (userId: any, paymentMethodId: any) => {
  const encryptedData = EncryptObject(JSON.stringify({
    userId: userId,
    paymentMethodId: paymentMethodId,
  }));
  const data = {
    inputModel: encryptedData
  }
  return createApiConfigAndRequest(
    "delete",
    `${paymentApi}Payment/RemovePaymentMethod`,
    data
  );
};

export const addDefaultPaymentMethod = (userId: any, paymentMethodId: any) => {
  const encryptedData = EncryptObject(JSON.stringify({
    userId: userId,
    paymentMethodId: paymentMethodId,
  }));
  const data = {
    inputModel: encryptedData
  }
  return createApiConfigAndRequest(
    "post",
    `${paymentApi}Payment/AddDefaultPaymentMethod`,
    data
  );
};

/* -------------------------------------------------------------------------- */
/*                                  Services                                  */
/* -------------------------------------------------------------------------- */
export const getAllServices = () => {
  return createApiConfigAndRequest(
    "get",
    `${serviceInventoryApi}Service/GetAllServices`
  );
};

export const getIndustryServiceByIndustryId = (id: number) => {
  return createApiConfigAndRequest(
    "get",
    `${serviceInventoryApi}IndustryServices/GetIndustryServiceByIndustryId?id=${id}`
  );
};

export const getAllChildServices = (id: any) => {
  return createApiConfigAndRequest(
    "get",
    // `${serviceInventoryApi}Service/GetAllChildServices?id=${id}`GetAllChildsByServiceId
    `${serviceInventoryApi}Service/GetAllChildsByServiceId?id=${id}`
  );
};

/* -------------------------------------------------------------------------- */
/*                                 Industries                                 */
/* -------------------------------------------------------------------------- */
export const getAllIndustries = () => {
  return createApiConfigAndRequest(
    "get",
    `${industryApi}Industry/GetIndustries`
  );
};

export const getIndustryById = (id: any) => {
  return createApiConfigAndRequest(
    "get",
    `${industryApi}Industry/getSubIndustriesByParentId?id=${id}`
  );
};

export const getIndustryByIndustryId = (id: any) => {
  return createApiConfigAndRequest(
    "get",
    `${serviceInventoryApi}IndustryServices/GetIndustryServiceByIndustryId?id=${id}`
  );
};

/* -------------------------------------------------------------------------- */
/*                               Flow Management                              */
/* -------------------------------------------------------------------------- */
export const getFlowManagementBySKU = (sku: any) => {
  return createApiConfigAndRequest(
    "get",
    `${serviceInventoryApi}Booking/GetBookingFlowByServiceSKU?ServiceSKU=${sku}`
  );
};

export const getBookingFlowByServiceId = (id: any) => {
  return createApiConfigAndRequest(
    "get",
    `${serviceInventoryApi}Booking/GetBookingFlowByServiceId?serviceId=${id}`
  );
}

/* -------------------------------------------------------------------------- */
/*                                    Notes                                   */
/* -------------------------------------------------------------------------- */
export const addNewNote = (notes: any) => {
  return createApiConfigAndRequest("post", `${notesApi}createnotes/`, notes);
};

export const getNotesData = (userId: number, purchaseOrderId: number) => {
  return createApiConfigAndRequest("get", `${notesApi}getnotes/?userId=${userId}&bookingId=${purchaseOrderId}&noteType=customer`)
}

export const uploadNoteVideo = (video: any) => {
  return createApiConfigAndRequestForFiles("post", `${notesApi}videos/`, video);
};

export const uploadNoteImage = (video: any) => {
  return createApiConfigAndRequest("post", "");
};

export const uploadNoteAudio = (video: any) => {
  return createApiConfigAndRequest("post", "");
};

/* -------------------------------------------------------------------------- */
/*                                  Providers                                 */
/* -------------------------------------------------------------------------- */
export const getAllProviderIds = (
  longitude: any,
  latitude: any,
  radius: number,
  serviceSKU: any
) => {
  return createApiConfigAndRequest(
    "get",
    `${providerCellApi}Provider/GetProviders?ServiceSKU=${serviceSKU}&latitude=${latitude}&longitude=${longitude}&radius=${radius}`
  );
};

export const getProviderAvailability = (providers: any) => {
  return createApiConfigAndRequest(
    "post",
    // `${staffApi}Staff/getStaffListById`,
    `${providerCellApi}Provider/GetProviderList`,
    providers
  );
};

/* -------------------------------------------------------------------------- */
/*                             Verify Dispatchment                            */
/* --------------------------------------------------------------  ------------ */
export const verifyDispatchment = (data: any) => {
  return createApiConfigAndRequest(
    "post",
    `${providerAvailabilityApi}verify/capture/`,
    data,
    true
  );
};

/* -------------------------------------------------------------------------- */
/*                           Get All Section Details                          */
/* -------------------------------------------------------------------------- */
export const getAllSectionsDetails = () => {
  return createApiConfigAndRequest(
    "get",
    `${homePageSectionApi}Sections/getAllSectionsDetails?countryId=1&isMobile=false`
  );
};

export const addCart = (data: any) => {
  return createApiConfigAndRequest("post", `${cartApi}Cart/AddCart`, data, true);
};

export const threedStatus = (data: any) => {
  return createApiConfigAndRequest(
    "post",
    `${paymentApi}Payment/ThreedsStatus`,
    data
  );
};

export const checkPayment = (data: any) => {
  return createApiConfigAndRequest(
    "post",
    `${paymentApi}Payment/CheckPayment`,
    data
  );
};

export const check3ds = (data: any) => {
  return createApiConfigAndRequest(
    "post",
    `${paymentApi}Payment/CheckThreedsStatus`,
    data
  );
};

/* -------------------------------------------------------------------------- */
/*                                  Bookings                                  */
/* -------------------------------------------------------------------------- */
export const getBookingListByCustomerId = (userId: number) => {
  return createApiConfigAndRequest(
    "get",
    `${bookingApi}getBookingList/?customerId=${userId}&page=1`
  );
};

export const getBookingById = (id: any) => {
  return createApiConfigAndRequest(
    "get",
    `${bookingApi}getBookingId/?bookingId=${id}`
  );
};

/* -------------------------------------------------------------------------- */
/*                            Roles and Permissions                           */
/* -------------------------------------------------------------------------- */
export const AddBusinessUser = async (data: any) => {
  return createApiConfigAndRequest(
    "post",
    `${BusinessUrl}Business/AddBusinessUser`,
    data
  );
};

export const SearchAllActiveServicesByBusinessId = async (
  businessId: number,
  enteredData: string
) => {
  return createApiConfigAndRequest(
    "get",
    `${serviceInventoryUrl}Service/SearchAllActiveServicesByBusinessId?businessId=${businessId}&name=${enteredData}`
  );
};

export const getChildServices = async (serviceId: number) => {
  return createApiConfigAndRequest(
    "get",
    `${serviceInventoryUrl}Service/GetAllChildServices?id=${serviceId}`
  );
};

export const GetAllMenus = async () => {
  return createApiConfigAndRequest("get", `${BusinessUrl}Menu/GetAllMenus`);
};

export const GetRoleByBusinessId = async (id: number) => {
  return createApiConfigAndRequest(
    "get",
    `${BusinessUrl}Roles/GetRoleByBusinessId?Id=${id}`
  );
};

export const CreateNewRole = async (data: any) => {
  return createApiConfigAndRequest("post", `${BusinessUrl}Roles/AddRole`, data);
};

export const AddRolePermissions = async (data: any) => {
  return createApiConfigAndRequest(
    "post",
    `${BusinessUrl}Roles/AddRolePermissions`,
    data
  );
};

export const AddBusiness = async (data: any) => {
  return createApiConfigAndRequest(
    "post",
    `${BusinessUrl}Business/AddBusiness`,
    data
  );
};

export const GetAllBusinessUserById = async (id: number) => {
  return createApiConfigAndRequest(
    "get",
    `${BusinessUrl}Business/GetAllBusinessByUserId?UserId=${id}`
  );
};

export const getAllBusinessList = (businessIds: any) => {
  const data = {
    // "matchedKey": "string",
    // "businessIds": businessIds
    ids: businessIds,
    source: 0
  }
  return createApiConfigAndRequest(
    "post",
    `${partnerApi}Partner/getPartnerListById`,
    data,
    true,
  );
}

/*
axios.interceptors.response.use(
  response => {
    return response
  },
  function (error) {
    const originalRequest = error.config

    if (
      error.response.status === 401 &&
      originalRequest.url === 'http://127.0.0.1:3000/v1/auth/token'
    ) {
      // renew JWT Token
    }

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      const refreshToken = localStorage.getItem("refreshToken")
      return axios
        .post('/auth/token', {
          refresh_token: refreshToken
        })
        .then(res => {
          if (res.status === 201) {
            localStorage.setItem("jwtToken", "res")
            axios.defaults.headers.common['Authorization'] =
              'Bearer ' + localStorage.getItem("jwtToken");
            return axios(originalRequest)
          }
        })
    }
    return Promise.reject(error)
  }
)
*/

// export const UploadUserImage = (userId?: any, fileInput?: any) => {
//   const form = new FormData();
//   form.append("AllFilesToUpload", fileInput);
//   const environment = "prepord";
//   return createApiConfigAndRequest(
//     "put",
//     `${signUpApi}pv/users/changeUserImage?UserId=${userId}&environment=${environment}`,
//     form,
//     false,
//     "multipart/form-data"
//   );
// };
