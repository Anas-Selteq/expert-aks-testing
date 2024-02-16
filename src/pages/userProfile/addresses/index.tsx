import React, { useEffect, useState } from "react";
import Image from "next/image";
import { getAddresses, removeAddress } from "@/helper";
import Link from "next/link";
import { AiOutlineRight } from "react-icons/ai";
import { BiChevronLeft } from "react-icons/bi";
import SideBar from "@/Components/components/sidebar";
import ManageAddress from "@/Components/address/manage_address";
import CreateAndUpdateAddress from "@/Components/address/create_address";
import AddLocation from "@/Components/components/add_location";
import { useSelector } from "react-redux";

interface Address {
  id: number;
  line1: string;
  townCity: string;
  addressnotes: string;
}

interface ApiResponse {
  result: {
    addresses: Address[];
  };
}

const ManageAddresses = () => {
  const { profile } = useSelector((state: any) => state);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<any>();
  const [selectedIndex, setSelectedIndex] = useState<any>(0);
  const [showPopUp, setShowPopUp] = useState(false);
  const [showMap, setShowMap] = useState(true);
  const [showCreateAddress, setShowCreateAddress] = useState(false);
  const [isAddressUpdate, setIsAddressUpdate] = useState(false);

  //Delete Address
  let handleDelete = (id: any) => {
    setSelectedIndex(-1);
    removeAddress(id).then(async (result: any) => {
      setAddresses(addresses.filter((e) => e.id !== id));
    });
  };
  //Update Address
  const handleEdit = (address: any) => {
    setSelectedLocation({
      userId: profile?.userId,
      line1: address?.line1,
      line2: address?.line2,
      townCity: address?.townCity,
      postalCode: address?.postalCode,
      state: address?.state,
      countryId: 0,
      latitude: address?.latitude,
      longitude: address?.longitude,
      addressNote: address?.addressNote,
      isResidentialAddress: true,
      radius: 5,
      addressTypeValue: 1,
      createdBy: 10,
    });
    setShowCreateAddress(true);
    setIsAddressUpdate(true);
  };

  //Getting Addresses
  useEffect(() => {
    function fetchData() {
      getAddresses(profile?.userId).then(async (response: any) => {
        if (response && response?.result?.addresses) {
          setAddresses(response?.result?.addresses);
        }
      });
    }
    if (profile?.userId) {
      fetchData();
    }
  }, [profile?.userId]);

  const cancelCreateAddressHandler = (
    location = null,
    bool = false,
    previousLocation = null
  ) => {
    if (location !== null) {
      if (bool === true && previousLocation !== null) {
      }
      setAddresses((prevItems: any) => [...prevItems, location]);
    }
    setShowPopUp(false);
    setShowMap(false);
    setShowCreateAddress(false);
  };

  const createAddressHandler = (result: any) => {
    setSelectedLocation({
      userId: profile?.userId,
      line1: result?.formatted,
      line2: result?.components?.neighbourhood,
      townCity: result?.components?.city,
      postalCode: result?.components?.postcode,
      state: result?.components?.state,
      countryId: 0,
      latitude: result?.geometry?.lat,
      longitude: result?.geometry?.lng,
      addressName: result?.formatted,
      addressNote: "",
      isResidentialAddress: true,
      radius: 20,
      addressTypeValue: 1,
      createdBy: 10,
    });
    localStorage.setItem("useraddingaddress",JSON.stringify(selectedLocation));
    console.log("selectedLocation",selectedLocation)
    // return;
    setShowCreateAddress(true);
  };

  

  


  return (
    <SideBar activeIndex={1}>
      {showMap !== true ? (
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
            <div className="col-md-6 col-8 m-auto">
              {" "}
              <span>Manage Address</span>
            </div>
            <div className="col-md-6 col-4 text-end m-auto">
            {/* <button
                className="button_set_search px-4"
                onClick={() => setShowMap(!showMap)}
              >
               <img className="img-fluid" src="/imagess/redicons/search.png" />&nbsp; Search
              </button> */}
              <button
                className="btn btn-danger btn-sm button_style_danger"
                onClick={() => setShowMap(!showMap)}
              >
                Add New
              </button>
            </div>
          </div>
        </div>
      ) : null}
    
        {/* <BiChevronLeft />
        Back
        <div className="card p-3">
          <div className="d-flex justify-content-between">
            <div className="d-flex flex-column justify-content-center">
              <h4 className="manage-address">Create Addresses</h4>
              <p className="manage-address-detail">
                Your home and work addresses are used to personalize your
                experiences across Expert Services, like showing search results
                near your home, directions to work in Maps, and for more
                relevant ads. You can remove them any time.
              </p>
              <Link
                href="#"
                className="Learn-more mt-5"
                style={{
                  textDecoration: "none",
                  color: "red",
                }}
              >
                Learn more
                <AiOutlineRight />
              </Link>
            </div>
            <div>
              <Image
                src="/assets/Images/img2.png"
                height={135.54}
                width={181.32}
                alt="create account"
                className="rounded-circle mx-auto d-block"
              />
            </div>
          </div>
        </div> */}
        {!showMap && !showCreateAddress ? (
            <div
            className="px-md-5 px-3 scrool_hide"
            style={{
              overflowY: "scroll",
              overflowX: "hidden",
              height: "100vh",
              paddingBottom: "200%",
            }}
          >
          <ManageAddress
            setEditAddress={() => setShowMap(true)}
            addresses={addresses}
            selectedIndex={selectedIndex}
            setSelectedIndex={setSelectedIndex}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            // showPopUp={showPopUp}
            // setShowPopUp={setShowPopUp}
          />
          </div>
        ) : showMap && !showCreateAddress ? (
          <div
          className="scrool_hide margin_bottom_new"
          style={{
            overflowY: "scroll",
            overflowX: "hidden",
            height: "100vh",
            paddingBottom: "200%",
          }}
        >
          <AddLocation
            showMap={showMap}
            createAddressHandler={createAddressHandler}
          />
          </div>
        ) : (
          <>
          {showMap !== true ? (null):(
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
                <span>Create Address</span>
              </div>
            </div>
          </div>)}
            <div
            className="px-md-5 px-3 scrool_hide"
            style={{
              overflowY: "scroll",
              overflowX: "hidden",
              height: "100vh",
              paddingBottom: "200%",
            }}
          >
          <CreateAndUpdateAddress
            location={selectedLocation}
            isAddressUpdate={isAddressUpdate}
            cancelingCreateAddress={cancelCreateAddressHandler}
          />
          </div>
          </>
        )}
    </SideBar>
  );
};
export default ManageAddresses;
