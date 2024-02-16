import { createAddress, updateAddress } from "@/helper";
import { Button } from "@/styles/Button.style";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Loader from "../Loaders/Loader";
import { Console } from "console";

interface Location {
  line1: string;
  line2: string;
  addressName: string;
  state: string;
  townCity: string;
  postalCode: string;
  addressNote: string;
  userId: number;
  countryId: number;
  latitude: number;
  longitude: number;
  isResidentialAddress: boolean;
  radius: number;
  addressTypeValue: number;
  createdBy: number;
}

interface Props {
  location: Location;
  cancelingCreateAddress: any;
  isAddressUpdate: any;
}

const CreateAndUpdateAddress = ({
  location,
  cancelingCreateAddress,
  isAddressUpdate,
}: Props) => {
  const [addLocation, setAddLocation] = useState<Location>(location);
  const [isLoading, setIsLoading] = useState(false);
  const [userorderid, setorderID] = useState<any>();
  const [addresserror, setAddresserror] = useState<any>(null);
  const [addresserror1, setAddresserror1] = useState<any>(null);
  const [addresserror2, setAddresserror2] = useState<any>(null);
  const [flowaddress, setFlowaddress] = useState<any>(false);
  const router = useRouter();

  const onClickHandler = async (e: any) => {
    // alert("click 1")
    e.preventDefault();
    if (isAddressUpdate) {
      // alert("api 1")
      setIsLoading(true);
      updateAddress(addLocation)
        .then((res) => {
          return
          cancelingCreateAddress(addLocation, true, location);
          window.location.reload();
        })
        .catch((e) => alert(e))
        .finally(() => setIsLoading(false));
    } else {
      // alert("api 2")
      setIsLoading(true);
      console.log("addLocation", addLocation);
      createAddress(addLocation)
        .then(async (response) => {
          console.log("response?.response?.code", response?.code)
          if (response?.code === 0) {
            cancelingCreateAddress(addLocation, true);
            return
            window.location.reload();
          }
          else if (response?.code > 0) {
            setAddresserror2(response?.response?.data?.errors?.postalCode)
            setAddresserror1(response?.response?.data?.errors?.townCity)
            setAddresserror(response?.response?.data?.errors?.line2)
            console.log("response", response)
          }
        })
        .finally(() => setIsLoading(false));
    }
  };


  const onClickHandler2 = async (e: any) => {
    // alert("click 2")
    e.preventDefault();
    if (isAddressUpdate) {
      setIsLoading(true);
      updateAddress(addLocation)
        .then((res) => {
          return
          alert("api c1")
          cancelingCreateAddress(addLocation, true, location);
          window.location.reload();
        })
        .catch((e) => alert(e))
        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(true);
      createAddress(addLocation)
        .then(async (response) => {
          if (response?.code === 0) {
            cancelingCreateAddress(addLocation);
            console.log("click 3");
            localStorage.removeItem('addressflag');
            router.push("/flowManagementPages/expert_address");
          } else {
            setAddresserror2(response?.response?.data?.errors?.postalCode)
            setAddresserror1(response?.response?.data?.errors?.townCity)
            setAddresserror(response?.response?.data?.errors?.line2)
            console.log("response", response)
          }

        })
        .finally(() => setIsLoading(false));
    }
  };

  console.log("addLocation?.line2", addLocation?.postalCode);



  useEffect(() => {
    const orderId = localStorage.getItem("orderId");
    setorderID(orderId)
  }, [])


  const onClickHandler1 = () => {
    setAddresserror("Please Complete the inputs below!")
  }

  useEffect(() => {
    const addressFlag = localStorage.getItem('addressflag');
    if (addressFlag !== null) {
      // Key exists in local storage, log 'Anas'
      setFlowaddress(true);
    } else {
      // Key doesn't exist in local storage, log 'Waqar'
      setFlowaddress(false);
    }
  }, [])


  return (
    <>

      <div className=" margin_bottom_new mt-4 mb-5">
        <div className="row">
          <div
            className="col-md-12">
            {addresserror === null && addresserror1 === null && addresserror2 === null ? null :
              <div className="alert alert-danger" role="alert">
                {addresserror}<br />{addresserror1}<br />{addresserror2}
              </div>}
            {/* <div className="col-md-12 border_for_all_pages"
            >
              <div
                className="label_address_font_pixl"
              >
                Address Name
              </div>
              <input
                type="text"
                className="border border-0 font_for_address_inputs"
                value={addLocation.addressName}
                onChange={(e) =>
                  setAddLocation((prevItem) => ({
                    ...prevItem,
                    addressName: e.target.value,
                  }))
                }
                placeholder="Address Name"
              />
            </div> */}
          </div>


          <div
            className="col-md-12"

          >
            <div className="col-md-12 border_for_all_pages mt-3"
            >
              <div
                className="label_address_font_pixl"
              >
                Address Name
              </div>
              <input
                type="text"
                className="border border-0 font_for_address_inputs"
                value={addLocation?.line1}
                onChange={(e) =>
                  setAddLocation((prevItem) => ({
                    ...prevItem,
                    line1: e.target.value,
                  }))
                }
                placeholder="Home"
              />
            </div>
          </div>
          <div
            className="col-md-6"

          >
            <div className="col-md-12 border_for_all_pages mt-3" >
              <div
                className="label_address_font_pixl"
              >
                Flat & Building Number
              </div>
              <input
                type="text"
                className="border border-0 font_for_address_inputs"
                value={addLocation?.line2}
                onChange={(e) =>
                  setAddLocation((prevItem) => ({
                    ...prevItem,
                    line2: e.target.value,
                  }))
                }
                placeholder="Flat & Building"
              />
            </div>
            {addLocation?.line2 === undefined || addLocation?.line2 === "" ? <p className="m-0 pt-1 pb-0 error_text px-3 ">Please Fill This Field</p> : null}
          </div>
          <div
            className="col-md-6 mt-3"

          >
            <div className="col-md-12 border_for_all_pages"
            >
              <div
                className="label_address_font_pixl"
              >
                Street Address
              </div>
              <input
                type="text"
                className="border border-0 font_for_address_inputs"
                value={addLocation?.state}
                onChange={(e) =>
                  setAddLocation((prevItem) => ({
                    ...prevItem,
                    state: e.target.value,
                  }))
                }
                placeholder="342 Ed Edward Road"
              />

            </div>
            {addLocation?.state === undefined || addLocation?.state === "" ? <p className="m-0 pt-1 pb-0 error_text px-3 ">Please Fill This Field</p> : null}
          </div>
          <div
            className="col-md-6"
          >
            <div className="col-md-12 border_for_all_pages mt-3" >
              <div
                className="label_address_font_pixl"
              >
                City
              </div>
              <input
                type="text"
                className="border border-0 font_for_address_inputs"
                value={addLocation?.townCity}
                onChange={(e) =>
                  setAddLocation((prevItem) => ({
                    ...prevItem,
                    townCity: e.target.value,
                  }))
                }
                placeholder="New Island"
              />
            </div>
            {addLocation?.townCity === undefined || addLocation?.townCity === "" ? <p className="m-0 pt-1 pb-0 error_text px-3 ">Please Fill This Field</p> : null}
          </div>
          <div
            className="col-md-6"

          >
            <div className="col-md-12 border_for_all_pages mt-3"
            >
              <div
                className="label_address_font_pixl"
              >
                Postal Code
              </div>
              <input
                type="text"
                className="border border-0 font_for_address_inputs"
                value={addLocation?.postalCode}
                onChange={(e) =>
                  setAddLocation((prevItem) => ({
                    ...prevItem,
                    postalCode: e.target.value,
                  }))
                }
                placeholder="Enter Postal Code"
              />
            </div>
            {addLocation?.postalCode === undefined || addLocation?.postalCode === "" ? <p className="m-0 pt-1 pb-0 error_text px-3 ">Please Fill This Field</p> : null}
          </div>
          <div
            className="col-md-12"

          >
            <div className="col-md-12 border_for_all_pages mt-3"
            >
              <div
                className="label_address_font_pixl"
              >
                Address Note
              </div>
              <input
                type="text"
                className="border border-0 font_for_address_inputs"
                value={addLocation?.addressNote}
                onChange={(e) =>
                  setAddLocation((prevItem) => ({
                    ...prevItem,
                    addressNote: e.target.value,
                  }))
                }
                placeholder="My House is away from bridge..."
              />
            </div>
            {/* {addLocation?.addressNote === "" ? <p className="m-0 pt-1 pb-0 error_text px-3 ">Please Fill This Field</p> : null} */}
          </div>
          <div className="d-flex align-items-center justify-content-end mt-5 pt-5">
            <div className="d-flex align-items-center ">
              <button
                className="bg-danger bg-opacity-25 text-danger border-0 rounded px-4 py-2"
                onClick={cancelingCreateAddress}
              >
                Cancel
              </button>
              {isLoading ? (
                <Loader
                  status={isLoading}
                  style={{
                    margin: "0 0 0 0.5rem",
                  }}
                />
              ) : (
                <>
                  {flowaddress ? <button
                    className={`${addLocation?.townCity && addLocation.line2 ? "btn btn-danger universal_button_color  " : "btn btn-secondary"}`}
                    style={{
                      margin: "0 0 0 0.5rem",
                      padding: "0.5rem 1.5rem",
                    }}
                    onClick={addLocation?.townCity && addLocation.line2 ? onClickHandler2 : onClickHandler1}
                  >
                    Save
                  </button> :
                    (
                      <button
                        className={`${addLocation?.townCity && addLocation.line2 ? "btn btn-danger universal_button_color " : "btn btn-secondary"}`}
                        style={{
                          margin: "0 0 0 0.5rem",
                          padding: "0.5rem 1.5rem",
                        }}

                        onClick={addLocation?.townCity && addLocation.line2 ? onClickHandler : onClickHandler1}
                      >
                        Save
                      </button>
                    )
                  }
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default CreateAndUpdateAddress;
