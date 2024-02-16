import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { Box, Button, Modal } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 2,
};

const CheckoutCompletePage = () => {
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState("");
  const [basedurl, setBaseUrl] = useState("");
  const [paramters, setParameters] = useState("");
  const router = useRouter();
  const { transactionId, cartId } = router.query;
  const iframeRef = useRef(null);

  const getUrl = () => {
    const iframe = iframeRef.current;
    // http://localhost:3000/
    // https://expert.findanexpert.net/
    const handleIframeLoad = () => {
      const iframeUrl = iframe.contentWindow.location.href;
      if (iframeUrl.startsWith("http://localhost:3000/?cartId")) {
        console.log('URL starts with "http://localhost:3000/?cartId"');
        setOpen(false);
        setUrl(iframeUrl);
      } else {
        getUrl();
      }
      // Handle the loaded iframe URL as needed
      console.log("Iframe URL:", iframeUrl);
    };

    if (iframe) {
      iframe.addEventListener("load", handleIframeLoad);
    }

    return () => {
      if (iframe) {
        iframe.removeEventListener("load", handleIframeLoad);
      }
    };
  };

  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        const url =
          "https://hooks.stripe.com/redirect/authenticate/src_1NRBYdJHLdJRVYa5mOzLygO7?client_secret=src_client_secret_j6b8KvbmQ5moazDBPgdBtMU4&source_redirect_slug=test_YWNjdF8xS1pEUHFKSExkSlJWWWE1LF9PRGNvZXVzdnBSQnhZMklCMWlNdXU0N3hweThtRzVU01002Coo15jY";

        const iframe = iframeRef.current;
        if (iframe) {
          iframe.src = url;
        }
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [open]);

  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        getUrl();
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [open]);
  useEffect(() => {
    if (url) {
      const [baseUrl, queryParams] = url.split("?");

      // Printing the base URL
      setBaseUrl(baseUrl);
      console.log("Base URL:", baseUrl);

      // Splitting the query parameters based on the ampersand '&'
      const params = queryParams.split("&");

      // Creating an object to store the key-value pairs of the parameters
      const paramObject = {};

      // Looping through the params array and splitting each parameter based on the equal sign '='
      params.forEach((param) => {
        const [key, value] = param.split("=");
        paramObject[key] = value;
      });

      // Printing the parameter object
      setParameters(paramObject);
    }
  }, [url]);

  const thankYouHandler = () => {
    router.replace("/thank_you");
  };

  return (
    <div>
      <Button variant="contained" onClick={handleOpen}>
        Submit Booking
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <iframe
            ref={iframeRef}
            width="700"
            height="600"
            title="Payment IFrame"
          />
        </Box>
      </Modal>
      <p>
        <b>baseUrl</b>: {basedurl}
      </p>
      <p>
        <b>cartId</b>: {paramters.cartId}
      </p>
      <p>
        <b>payment_intent</b>: {paramters.payment_intent}
      </p>
      <p>
        <b>payment_intent_client_secret</b>:{" "}
        {paramters.payment_intent_client_secret}
      </p>
      <p>
        <b>source_redirect_slug</b>: {paramters.source_redirect_slug}
      </p>
      <p>
        <b>transactionId</b>: {paramters.transactionId}
      </p>
      {basedurl &&
        paramters.cartId &&
        paramters.payment_intent &&
        paramters.payment_intent_client_secret &&
        paramters.source_redirect_slug &&
        paramters.transactionId && (
          <button className="btn btn-danger" onClick={thankYouHandler}>
            Thank You
          </button>
        )}
    </div>
  );
};

export default CheckoutCompletePage;
