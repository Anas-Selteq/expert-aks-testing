import React, { useEffect, useState } from "react";
import Image from "next/image";
import { BiCamera } from "react-icons/bi";
import { useRouter } from "next/router";
import Loader from "@/Components/loader";
import { AddBusiness } from "@/helper";
import SideBar from "@/Components/components/sidebar";
import { useSelector } from "react-redux";

const HomePage = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const router = useRouter();
  const [isValid, setIsValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const {profile} = useSelector((state:any)=>state);
  const [businessInfo, setBusinessInfo] = useState({
    name: "",
    type: "",
    website: "",
    number: "",
  });

  const createBusiness = () => {
    setIsLoading(true);
    AddBusiness({
      businessLogo:
        "https://images.all-free-download.com/images/graphiclarge/railway_scenery_picture_empty_view_6930297.jpg",
      businessName: businessInfo.name,
      businessType: businessInfo.type,
      businessWebsite: businessInfo.website,
      industryType: businessInfo.type,
      businessNumber: businessInfo.number,
      userId: profile?.userId,
    })
      .then((res) => {
        router.replace("/userProfile/profile/switch_account");
      })
      .catch((e) => alert(e))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    if (
      selectedImage !== null &&
      businessInfo.name &&
      businessInfo.type &&
      businessInfo.number &&
      businessInfo.website
    ) {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  }, [businessInfo, selectedImage]);

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = () => {
    document.getElementById("file-input")?.click();
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setBusinessInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

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
            <span>Create Business</span>
          </div>
          
       
        </div>
      </div>
    <div className="p-md-5 px-3 pt-4 d-flex flex-column align-items-center">
     
      <div className="w-100">
      <div className="col-md-12 text-start border_for_all_pages">
      <div onClick={handleImageClick}>
        <Image
          src={
            selectedImage ??
            "https://1864597015.rsc.cdn77.org/newexpertpreprod/Images/avatar.png"
          }
          alt="Selected"
          height={80}
          width={80}
          className="rounded-circle"
        />
      </div>
      </div>
        <div className="d-flex flex-column border_for_all_pages py-2 mt-2">
          <span className="d_s_1">Business Name</span>
          <input
            type="text"
            name="name"
            className="bg-transparent outline-none input_outline_input_field"
            placeholder="Enter Business Name"
            value={businessInfo.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="d-flex flex-column border_for_all_pages py-2  my-2">
          <span className="d_s_1">Business Type</span>
          <input
            type="text"
            name="type"
            className="bg-transparent outline-none input_outline_input_field"
            placeholder="Enter Business Type"
            value={businessInfo.type}
            onChange={handleInputChange}
          />
        </div>
        <div className="d-flex flex-column border_for_all_pages py-2 ">
          <span className="d_s_1">Business Number</span>
          <input
            type="number"
            name="number"
            className="bg-transparent outline-none input_outline_input_field"
            placeholder="Enter Business Number"
            value={businessInfo.number}
            onChange={handleInputChange}
          />
        </div>
        <div className="d-flex flex-column border_for_all_pages py-2  my-2">
          <span className="d_s_1">Website</span>
          <input
            type="text"
            name="website"
            className="bg-transparent outline-none input_outline_input_field"
            placeholder="Enter Website"
            value={businessInfo.website}
            onChange={handleInputChange}
          />
        </div>
      </div>

      {isLoading ? <Loader /> : 
      <div className="col-md-12 text-end " style={{marginTop: "15%"}}>   
      <button
        className="btn btn-danger px-5"
        disabled={isValid}
        onClick={createBusiness}
      >
        Continue
      </button>
      </div>
      }
      <input
        type="file"
        accept="image/*"
        id="file-input"
        onChange={handleImageSelect}
        className="d-none"
      />
    </div></SideBar>
  );
};

export default HomePage;
