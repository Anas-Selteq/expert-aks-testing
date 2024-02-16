import Head from "next/head";
import styled from "styled-components";
import React, { useState, useEffect } from "react";
import Hero from "@/Components/Hero/Hero";
import Industries from "@/Components/Industriess/Industries";
import { getAllSectionsDetails } from "@/helper";
import TrendingLand from "@/Components/Landingpagecomponents/TrendingLand";
import Justforyou from "@/Components/Landingpagecomponents/Justforyou";
import Productsforyouu from "@/Components/Landingpagecomponents/Productsforyouu";
import Layout2 from "@/Components/Layout2/Layout2";
import SStories from "@/Components/Landingpagecomponents/SStories";
import Offers from "@/Components/Landingpagecomponents/Offers";
import NewTrendingLand from "@/Components/Landingpagecomponents/NewTrendingLand";
import Footer from "@/Components/Footer/Footer";
import Skeleton from '@mui/material/Skeleton';
import SkeletonLoaders from "@/Components/SkeletonLoaders/SkeletonLoaders";
import Link from "next/link";
import axios from "axios";
import { useSelector } from "react-redux";


export default function Home() {
  const Main = styled.main``;
  const [data, setData] = useState<any>();
  const [components, setComponents] = useState<any>([]);
  const [allresponselanding, setLandingres] = useState<any>("");
  const [receivedData, setReceivedData] = useState<any>(null);
  const [receivedDataCode, setReceivedDataCode] = useState(null);
  const [userLocation, setUserLocation] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [Loading, setLoading] = useState<any>(false);
  const [indicator, setInducator] = useState<any>(false);
  const [PermissionGrantedNew, setPermissionGrantedNew] = useState<any>(false);
  const [permissionsetted, setPermissionsetted] = useState<any>(null)
  const [JwtRefreshToken, setJwtRefreshToken] = useState<any>("");
  const { profile } = useSelector((state: any) => state);

  useEffect(() => {
    setJwtRefreshToken(localStorage?.getItem("jwtRefreshToken"));
  }, []);

  useEffect(() => {
    const newstage: any = localStorage.getItem("newstage")

    if (JSON.parse(newstage) != null) {
      setPermissionsetted(newstage)
    }
  }, [PermissionGrantedNew])


  useEffect(() => {
    if (profile?.firstName != undefined) {
      const Jwtset = async () => {

        // Convert the JWT token object to a string
        // const jwtTokenString = JSON.stringify(JwtRefreshToken);

        // Encode the JWT token to Base64
        const base64Token = Buffer.from(JwtRefreshToken).toString('base64');



        try {
          const response = await axios.get(
            `https://gateway.findanexpert.net/signup_svc/pb/users/getnewRefreshToken?tokenModel=${base64Token}`
          );
          if (response?.data?.code === 0) {
            localStorage.setItem("jwtRefreshToken", response?.data?.result?.jwtRefreshToken)
            localStorage.setItem("jwtToken", response?.data?.result?.jwtToken)
          }
          // window.location.reload();
          // Only update state if the component is still mounted
        } catch (error: any) {
          console.log("error.response",error)
          setError(error);
        }
      };
      Jwtset();
    }
  }, [profile?.firstName != undefined, JwtRefreshToken])


  console.log("newnew", permissionsetted === null)
  // console.log("newstage", permissionsetted === true)

  const updatedpolicy = () => {
    setPermissionGrantedNew(true);
    // console.log("newnew", PermissionGrantedNew)
    localStorage.setItem("newstage", "true");
  }

  // getting the current location of the user code ---------------------------------
  useEffect(() => {
    // Function to fetch user location using the Geolocation API
    const fetchUserLocation = () => {
      if (navigator.geolocation) {
        // Show an alert to request permission
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            setUserLocation({ latitude, longitude });
          },
          (error) => {
            setError(error.message);
          }
        );
      } else {
        setError("Geolocation is not supported in this browser.");
      }
    };

    fetchUserLocation();
  }, []);

  console.log("userLocation",)

  const handleDataReceived = (data: any) => {
    // Handle the data received from the child component
    setReceivedData(data?.result);
    // console.log("ddcc",data?.result?.services)
    setReceivedDataCode(data?.code);
  };

  console.log("receivedData---->>>>>>>>", receivedData);


  const apiCall = () => {
    setLoading(true);
    getAllSectionsDetails()
      .then((res: any) => {
        setLandingres(res?.result?.sectionsDetails);
        setLoading(false);
        const componentsToRender = res?.result?.sectionsDetails?.map(
          (item: any) => {
            if (item?.name === "All services") {
              var position = parseInt(item?.positionNo);
              return {
                component: <Productsforyouu data={item} />,
                positionNo: position,
              };
            }
            else if (item?.sectionVariationName === "Industry Grid View") {
              var position = parseInt(item?.positionNo);
              return {
                component: <Industries data={item} />,
                pos: position,
              };
            } else if (item?.name === "Banner" && item?.positionNo >= 4) {
              var position = parseInt(item?.positionNo);
              return {
                component: <Justforyou data={item} />,
                pos: position,
              };
            } else if (item?.name === "stories") {
              var position = parseInt(item?.positionNo);
              return {
                component: <SStories data={item} />,
                pos: position,
              };
            } else if (item?.name === "Just for you") {
              var position = parseInt(item?.positionNo);
              return {
                component: <NewTrendingLand data={item} />,
                pos: position,
              };
            } else if (item?.name === "Recommended") {
              var position = parseInt(item?.positionNo);
              return {
                component: <NewTrendingLand data={item} />,
                positionNo: position,
              };
            } else if (item?.name === "services") {
              var position = parseInt(item?.positionNo);
              return {
                component: <TrendingLand data={item} />,
                positionNo: position,
              };
            } else if (item?.name === "Offers") {
              var position = parseInt(item?.positionNo);
              return {
                component: <Offers data={item} />,
                positionNo: position,
              };
            } else if (item?.name === "Trending") {
              var position = parseInt(item?.positionNo);
              return {
                component: <TrendingLand data={item} />,
                positionNo: position,
              };
            }

            return null;
          }
        );

        let sortedComponents = componentsToRender
          .filter((component: any) => component !== null)
          .sort((a: any, b: any) => a?.pos - b?.pos);

        setComponents(sortedComponents);
      })

      .catch((err) => {
        console.log(err),
          setLoading(false)
        setInducator(true);
      });
  };

  console.log("landing--------------->", allresponselanding);
  useEffect(() => {
    apiCall();
  }, []);
  return (
    <Layout2>
      <div className="new-page-landing" id="style-2">
        <Head>
          <title> Expert | AnyService, AnyTime, AnyWhere </title>
          <meta name="description" content="AnyService offers Expert anytime, anywhere. Access a wide range of services seamlessly, ensuring convenience and quality expertise on demand. " />
          <script
            src="https://www.google.com/recaptcha/api.js"
            async
            defer
          ></script>
        </Head>
        <Main>
          {permissionsetted === null ?
            <div className="col-md-12 cookies_modal text-center  ">
              <p className="m-0 p-0 py-2">
                We use cookies to enhance your visit to our site. By continuing to browse the site, you are agreeing to our <Link className="cookies_modalnew" href={"/auth/Cookies"} ><u>use of cookies</u></Link>&nbsp;&nbsp;<button className="btn btn-danger btn-sm py-1 universal_button_color" onClick={updatedpolicy}>I Accept</button>
              </p>
            </div> : null
          }
          <div style={{ marginBottom: "30px" }}>
            <Hero
            // onDataReceived={handleDataReceived}
            />
            <h1></h1>
            {Loading === false ?
              <>
                {components?.map((component: any, index: any) => (
                  <React.Fragment key={index}>
                    {component?.component}
                  </React.Fragment>
                ))}
              </>
              :
              <div className="col-md-12 padding_all_ser mb-4 mt-4">
                <SkeletonLoaders />
              </div>
            }
            {indicator == false ? null :
              <div className="col-md-12 text-center padding_all_ser mt-4 mb-4">
                <SkeletonLoaders />
                <button className="btn btn-danger rounded-pill px-4 mt-4 px-5" onClick={() => window.location.reload()}>Reload!</button>
              </div>
            }
            <Footer />
          </div>
        </Main>
      </div>
    </Layout2>
  );
}
