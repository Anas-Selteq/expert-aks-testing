import { useState } from "react";
import { GoogleReCaptcha } from "react-google-recaptcha-v3";
import Image from "next/image";
import Link from "next/link";
import Layout2 from "./Layout2/Layout2";

type HandleTokenFunction = (token: any) => void;
const ReusableAuthPage = ({
  form = <></>,
  handleToken,
}: {
  form?: JSX.Element;
  handleToken: HandleTokenFunction;
}) => {
  const updateAuthToken = (token: any) => {
    handleToken(token);
  };

  return (
    <>
      {/* {!authToken && <GoogleReCaptcha onVerify={handleToken} />} */}
      <div className="container mt-5 mb-4 text-center">
        <Layout2>
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
              <div className="col-md-8 mx-auto background_grid_auth d-flex flex-column align-items-center">
                <div className="m-auto">

                  {form}

                </div>
                <div className="text-center">

                  <div className="col-md-12 position_of_font">
                    <hr />
                    <p className="font_set_terms_conditions m-0 p-0">
                      <strong><Link className="style_a_tag11" href={"/auth/Termsandcondition"}> Terms & Conditions</Link></strong> • <strong><Link className="style_a_tag11" href={"/auth/Privacypolicy"}>Privacy Policy • </Link></strong> <Link className="style_a_tag11" href={"/auth/Cookies"}><strong>Cookies
                        Policy</strong></Link>
                    </p>
                    <p className="m-0 p-0 font_set_terms_conditions1">
                      © 2024 Selteq Ltd.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Layout2>
      </div>
    </>
  );
};

export default ReusableAuthPage;
