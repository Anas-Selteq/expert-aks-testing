import { createAddress, updateAddress } from "@/helper";
import { Button } from "@/styles/Button.style";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Console } from "console";
import Layout2 from "@/Components/Layout2/Layout2";
import axios from "axios";
import { useSelector } from "react-redux";
import { postalCode } from "card-validator/dist/postal-code";

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
    const [flowaddress, setFlowaddress] = useState<any>(false);



    const [AddressName, setAddressName] = useState<any>("");
    const [FlatNumber, setFlatNumber] = useState<any>("");
    const [StreetAddress, setStreetAddress] = useState<any>("");
    const [City, setCity] = useState<any>("");
    const [PostalCode, setPostalCode] = useState<any>("");
    const [Notes, setNotes] = useState<any>("");
    const [Lat, setLat] = useState<any>("");
    const [Log, setLog] = useState<any>("");
    const [Loading, setLoading] = useState<any>(false);
    const router = useRouter();
    const { profile } = useSelector((state: any) => state);

    useEffect(() => {
        const editedAddress: any = localStorage.getItem('editedAddress');
        const parseAddress = JSON.parse(editedAddress);
        setAddressName(`${parseAddress?.line1}`)
        setFlatNumber(`${parseAddress?.line2}`)
        setStreetAddress(`${parseAddress?.state}`)
        setCity(`${parseAddress?.townCity}`)
        setPostalCode(`${parseAddress?.postalCode}`)
        // setNotes(`${JSON.parse(parseAddress?.N)}`)
        // setCity(`${parsedvalue?.components?.district ? parsedvalue?.components?.district : ""}`)
        // setStreetAddress(`${parsedvalue?.components?.subdistrict ? parsedvalue?.components?.subdistrict : ""}`)
        setLat(`${parseAddress?.longitude}`)
        setLog(`${parseAddress?.latitude}`)
        
        console.log("anas", parseAddress)
    }, [])




    console.log("addLocation?.line2", addLocation?.postalCode);



    useEffect(() => {
        const orderId = localStorage.getItem("orderId");
        setorderID(orderId)
    }, [])


    const onClickHandler1 = () => {
        setAddresserror("Please Complete the inputs below!")
    }

   


    const postData = async () => {
        setLoading(true)
        const apiUrl = 'https://gateway.findanexpert.net/address_svc/pv/UserAddress/updateAddress';

        const requestData = {
            userId: profile?.userId,
            line1: AddressName,
            line2: FlatNumber,
            townCity: City,
            postalCode: PostalCode,
            state: StreetAddress,
            countryId: 0,
            latitude: Lat,
            longitude: Log,
            addressName: AddressName,
            addressNote: Notes,
            isResidentialAddress: true,
            radius: 20,
            addressTypeValue: 1,
            createdBy: 10
        };

        try {
            const response = await axios.put(apiUrl, requestData);
            router.push("/userProfile/addressshow/addressshow")
            
            setLoading(false)
            //    window.location.reload();
        } catch (error) {
            // setResponseData(null);
            console.log('An error occurred');
            setLoading(false)
        }
    };

    const postData1 = () => {
        console.log("")
    }



    return (
        <>
            <Layout2>
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
                            <span>Edit Address</span>
                        </div>
                        <div className="col-md-6 col-4 text-end m-auto">

                        </div>
                    </div>
                </div>
                <div className=" margin_bottom_new mt-4 mb-5">
                    <div className="row">


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
                                    value={AddressName}
                                    onChange={(e) =>
                                        setAddressName(e.target.value)
                                    }
                                    placeholder="Home"
                                />
                                {AddressName.length === 0 ? <p className="m-0 pt-1 pb-0 error_text px-3 ">Please Fill This Field</p> : null}
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
                                    value={FlatNumber}
                                    onChange={(e) =>
                                        setFlatNumber(e.target.value)
                                    }
                                    placeholder="Flat & Building"
                                />

                            </div>
                            {FlatNumber.length === 0 ? <p className="m-0 pt-1 pb-0 error_text px-3 ">Please Fill This Field</p> : null}
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
                                    value={StreetAddress}
                                    onChange={(e) =>
                                        setStreetAddress(e.target.value)
                                    }
                                    placeholder="342 Ed Edward Road"
                                />

                            </div>
                            {StreetAddress.length === 0 ? <p className="m-0 pt-1 pb-0 error_text px-3 ">Please Fill This Field</p> : null}
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
                                    value={City}
                                    onChange={(e) =>
                                        setCity(e.target.value)
                                    }
                                    placeholder="New Island"
                                />
                            </div>
                            {City.length === 0 ? <p className="m-0 pt-1 pb-0 error_text px-3 ">Please Fill This Field</p> : null}
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
                                    value={PostalCode}
                                    onChange={(e) =>
                                        setPostalCode(e.target.value)
                                    }
                                    placeholder="Enter Postal Code"
                                />
                            </div>
                            {PostalCode.length === 0 ? <p className="m-0 pt-1 pb-0 error_text px-3 ">Please Fill This Field</p> : null}
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
                                        setNotes(e.target.value)
                                    }
                                    placeholder="My House is away from bridge..."
                                />
                            </div>
                        </div>
                        <div className="d-flex align-items-center justify-content-end mt-5 pt-5">
                            <div className="d-flex align-items-center ">
                                <button
                                    className="bg-danger bg-opacity-25 text-danger border-0 rounded px-4 py-2"
                                    onClick={cancelingCreateAddress}
                                >
                                    Cancel
                                </button>

                                <>
                                    {Loading ?
                                        <div className="spinner-border text-danger" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div>
                                        :
                                        <button
                                            className={`btn ${FlatNumber.length === 0 || StreetAddress.length === 0 || City.length === 0 || PostalCode.length === 0 ? "btn-secondary" : "btn-danger universal_button_color"}`}
                                            style={{
                                                margin: "0 0 0 0.5rem",
                                                padding: "0.5rem 1.5rem",
                                            }}
                                            onClick={FlatNumber.length === 0 || StreetAddress.length === 0 || City.length === 0 || PostalCode.length === 0 ? postData1 : postData}
                                            disabled={FlatNumber.length === 0 || StreetAddress.length === 0 || City.length === 0 || PostalCode.length === 0}
                                        >
                                            Save
                                        </button>
                                    }
                                </>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout2>
        </>
    );
};
export default CreateAndUpdateAddress;
