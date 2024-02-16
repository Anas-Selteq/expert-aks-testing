import React from "react";
import { Layout } from "@/Components/Layout/Layout";
import { Provider } from "react-redux";
import { AppProps } from "next/app";
import { store } from "../Redux/Store";
import "bootstrap/dist/css/bootstrap.css";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import { SnackbarProvider } from 'notistack';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>

      <GoogleReCaptchaProvider
        // for live expert.expert.one ---------------------------------------------------
        // reCaptchaKey={"6Lc9JswnAAAAAOUy4eosizReIHVoCUdJITXaIVJL"}
        // for stagging ---------------------------------------------------
        //  reCaptchaKey={"6LeZosonAAAAAJpKxRmz25GvttloR64GYXlpAT1V"}
        // for dev --------------------------------------------------------
        //  reCaptchaKey={"6LfSRs8oAAAAAMxm0sXrrA3P9nu1vNhA7bTEmTMo"}
        // expert.one live recaptcha --------------------------------------
        // reCaptchaKey={"6LdO-9MoAAAAAJKEseLeAlUidlz_AxvgPd_L2-G4"}--
        reCaptchaKey={"6Lez7WApAAAAAMQaCfa4X2Yo6AHd-wkLZhgnhDdV"}
        scriptProps={{
          async: true, // Load asynchronously
          defer: true, // Defer execution
          appendTo: 'head', // optional, default to "head", can be "head" or "body",
          nonce: undefined // optional, default undefined
        }}

      >
        <SnackbarProvider maxSnack={3}
          anchorOrigin={{
            vertical: 'top', // 'top', 'bottom'
            horizontal: 'right', // 'left', 'center', 'right'
          }}
        >
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </SnackbarProvider>
      </GoogleReCaptchaProvider>
    </Provider>
  );
}
