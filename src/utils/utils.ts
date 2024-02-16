import Cookies from "js-cookie";
import moment from "moment";

export const theme = {
  colors: {
    black: "#000",
    grayBlack: "grey",
    white: "#fff",
    redColor: "red",
  },
};

export const getCookie = (key: string) => {
  return Cookies.get(key);
};

export const setCookie = (key: string, value: any) => {
  Cookies.set(key, value);
};

export const removeCookie = (key: string) => {
  Cookies.remove(key);
};


export const formatMobileNumber = (number:any) => {
  const digitsOnly = number.replace(/\D/g, '');
  const formattedNumber = `+${digitsOnly.slice(0, 2)} ${digitsOnly.slice(2, 5)} ${digitsOnly.slice(5, 8)} ${digitsOnly.slice(8)}`;
  return formattedNumber;
}

export const formatDate = (date:any)=>{
  return moment(date).format('Do MMM, YYYY');
}