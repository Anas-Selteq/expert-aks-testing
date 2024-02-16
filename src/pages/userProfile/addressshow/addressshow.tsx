import Layout2 from '@/Components/Layout2/Layout2';
import ManageAddress from '@/Components/address/manage_address'
import { AUTH_ACTIONS } from '@/Redux/Actions/loginPageAction';
import { getAddresses, removeAddress } from '@/helper';
import { removeCookie } from '@/utils/utils';
import { useRouter } from "next/router";
import { enqueueSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

function addressshow() {

    const { profile } = useSelector((state: any) => state);
    const [addresses, setAddresses] = useState<any>([]);
    const [selectedIndex, setSelectedIndex] = useState<any>(0);
    const [showMap, setShowMap] = useState(false);
    const router = useRouter();
    const dispatch = useDispatch();
   



    //Getting Addresses
    useEffect(() => {
        function fetchData() {
            getAddresses(profile?.externalCustomerId).then(async (response: any) => {
                if (response && response?.result?.addresses) {
                    setAddresses(response?.result?.addresses);
                }
                if(response?.response?.status === 401)
                {
                    enqueueSnackbar('Your session has been expired, You have been logged out!', { variant: 'warning' });
                    dispatch({ type: AUTH_ACTIONS.LOGOUT });
                    removeCookie && removeCookie("profile");
                    localStorage.removeItem("jwtToken");
                    localStorage.removeItem("jwtRefreshToken");
                    localStorage.clear();
                    router.push("/");
                }
            });
        }
        if (profile?.userId) {
            fetchData();
        }
    }, [profile?.userId]);


    //Delete Address
    let handleDelete = (id: any) => {
        setSelectedIndex(-1);
        removeAddress(id).then(async (result: any) => {
            setAddresses(addresses.filter((e: any) => e.id !== id));
        });
    };
    //Update Address
    const handleEdit = (address: any) => {
        const editeddata = {
            userId: profile?.externalCustomerId,
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
        }
        localStorage.setItem("editedAddress", JSON.stringify(editeddata))
        router.push("/userProfile/addressshow/addressedit")
        // setSelectedLocation({
        //   userId: profile?.userId,
        //   line1: address?.line1,
        //   line2: address?.line2,
        //   townCity: address?.townCity,
        //   postalCode: address?.postalCode,
        //   state: address?.state,
        //   countryId: 0,
        //   latitude: address?.latitude,
        //   longitude: address?.longitude,
        //   addressNote: address?.addressNote,
        //   isResidentialAddress: true,
        //   radius: 5,
        //   addressTypeValue: 1,
        //   createdBy: 10,
        // });
        // setShowCreateAddress(true);
        // setIsAddressUpdate(true);
    };



    return (
        <div>

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
                                onClick={() => router.push("/userProfile/Selectfrommap/Selectfrommap")}
                            >
                                Add New
                            </button>
                        </div>
                    </div>
                </div>
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
            </Layout2>
        </div>
    )
}

export default addressshow