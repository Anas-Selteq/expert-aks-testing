var CryptoJS = require("crypto-js");

export const encryptObject = (object: any) => {
  return CryptoJS.AES.encrypt(JSON.stringify(object), "selteq").toString();
};

export const decryptObject = (object: any) => {
  return JSON.parse(
    CryptoJS.AES.decrypt(object, "selteq").toString(CryptoJS.enc.Utf8)
  );
};

/* -------------------------------------------------------------------------- */
/*                               Purchase Order                               */
/* -------------------------------------------------------------------------- */
export const setOrderIdInLocalStorage = (purchaseOrderId: any) => {
  return localStorage.setItem("orderId", purchaseOrderId);
};

export const getOrderIdInLocalStorage = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("orderId") as string;
  }
  return "";
};

export const removeOrderIdInLocalStorage = () => {
  return localStorage.removeItem("orderId");
};

/* -------------------------------------------------------------------------- */
/*                                  Services                                  */
/* -------------------------------------------------------------------------- */
export const setServiceInLocalStorage = (service: any) => {
  return localStorage.setItem("selectedService", JSON.stringify(service));
};

export const getServiceFromLocalStorage = () => {
  if(typeof window !== "undefined"){
    return JSON.parse(localStorage.getItem("selectedService") as string);
  }
  return {};
};

export const removeServiceFromLocalStorage = () => {
  return localStorage.removeItem("selectedService");
}

/* -------------------------------------------------------------------------- */
/*                                  Payments                                  */
/* -------------------------------------------------------------------------- */
export const setPaymentInLocalStorage = (paymentMethodId: any) => {
  return localStorage.setItem("defaultPaymentMethodId", paymentMethodId);
};

export const getPaymentFromLocalStorage = () => {
  return localStorage.getItem("defaultPaymentMethodId") as string;
};
