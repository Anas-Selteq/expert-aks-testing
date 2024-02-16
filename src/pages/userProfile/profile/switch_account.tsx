import React,{useState,useEffect} from "react";
import SideBar from "@/Components/components/sidebar";
import { useRouter } from "next/router";
import { GetAllBusinessUserById } from "@/helper";
import { BiPlus, BiUser } from "react-icons/bi";
import BusinessCard from "@/Components/roles_and_permissions/business_card";
import Loader from "@/Components/loader";
import BusinessProfile from "@/Components/roles_and_permissions/business_profile";
import { useSelector } from "react-redux";

const SwitchAccount = () => {
  const router = useRouter();
  const [businessesList, setBusinessesList] = useState([]);
  const [profileDetailPage, setProfileDetailPage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const {profile } = useSelector((state: any) => state)
  const [selectedBusiness, setSelectedBusiness] = useState({});
  const businessID =
    typeof window !== "undefined" && localStorage.getItem("businessId");

  useEffect(() => {
    const fetchBusinessList = () => {
      setIsLoading(true);
      GetAllBusinessUserById(profile?.userId)
        .then((res) => {
          setBusinessesList(res.result.business);
        })
        .catch((e) => alert(e))
        .finally(() => setIsLoading(false));
    };
    fetchBusinessList();
  }, [profile]);

  const setBusinessHandler = (business: any) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("businessId", business.businessId);
    }
    setProfileDetailPage(true);
    setSelectedBusiness(business);
  };

  const removeBusinessProfileHandler = () => {
    setProfileDetailPage(false);
    setSelectedBusiness({});
  };

  const removeBusinessIdFromStorage = () => {
    if(typeof window !== "undefined"){
      localStorage.removeItem("businessId");
    }
  }

  if (profileDetailPage) {
    return <SideBar activeIndex={0}><BusinessProfile business={selectedBusiness} /></SideBar>;
  } else {
    return (
      <SideBar activeIndex={0}>
         <div
        style={{
          width: "100%",
          fontSize: "18px",
          backgroundColor: "white",
          borderTop: "1px solid lightgray",
          borderBottom: "0.7px solid #dcdcdc",
          fontFamily: "Roboto",
          fontWeight: "800",
          fontStyle: "normal",
          letterSpacing: "normal",
          color: "#404145",
          position: "relative",
          zIndex: "1",
        }}
        className="px-4"
      >
        <div className="row py-2">
          <div className="col-md-6">
            {" "}
            <span>Switch Accounts</span>
          </div>
          
       
        </div>
      </div>
      <div className="px-md-5 px-3 mt-3" style={{ height: "100vh" }}>
        <div className=" rounded border bg-white border_for_all_pages">
          <div onClick={removeBusinessIdFromStorage}>
          <BusinessCard
            title={profile?.firstName + " " + profile?.lastName}
            type="Personal Account"
            src={profile?.imageURL ? `https://1864597015.rsc.cdn77.org/consentformattachments/images/staging/${ profile?.imageURL}`:"/imagess/redicons/cam.png"}
            radio={businessID === null ? true : false}
          /></div>
          <hr  className="background_line mt-1 mb-2"  />
          {businessesList.map((business: any, index: number) => {
            return (
              <div key={index} onClick={() => setBusinessHandler(business)}>
                <BusinessCard
                  radio={
                    businessID === null
                      ? false
                      : business.businessId === parseInt(businessID as string)
                  }
                  title={business.businessName}
                  type="Business Account"
                  src={
                    business.businessLogo.includes("https://") ||
                    business.businessLogo.includes("http://")
                      ? business.businessLogo
                      : "/imagess/redicons/cam.png"
                  }
                />
                <hr  className="background_line mt-1 mb-2"  />
              </div>
            );
          })}
          {isLoading ? (
            <Loader />
          ) : (
            <div
              className="d-flex align-items-center"
              onClick={() => router.push("/userProfile/profile/add_new_business")}
              style={{cursor:"pointer"}}
            >
             <img className="img-fluid width_icon_add" src="/imagess/redicons/addicon.png" />
              <div className="s_f_1 px-3">Add New Business</div>
            </div>
          )}
        </div>
      </div></SideBar>
    );
  }
};
export default SwitchAccount;
