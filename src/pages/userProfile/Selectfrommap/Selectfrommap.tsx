import Layout2 from '@/Components/Layout2/Layout2';
import AddLocation from '@/Components/components/add_location'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

function Selectfrommap() {
    const [showMap, setShowMap] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState<any>();
    const { profile } = useSelector((state: any) => state);
    const [JwtRefreshToken, setJwtRefreshToken] = useState<any>("");

    useEffect(() => {
        setJwtRefreshToken(localStorage?.getItem("jwtRefreshToken"));
    }, []);

    useEffect(() => {
        const Jwtset = async () => {

            // Convert the JWT token object to a string
            // const jwtTokenString = JSON.stringify(JwtRefreshToken);

            // Encode the JWT token to Base64
            const base64Token = Buffer.from(JwtRefreshToken).toString('base64');



            try {
                const response = await axios.get(
                    `https://gateway.findanexpert.net/signup_svc/pb/users/getnewRefreshToken?tokenModel=${base64Token}`
                );
                // localStorage.setItem("jwtRefreshToken", response?.data?.result?.jwtRefreshToken)
                // localStorage.setItem("jwtToken", response?.data?.result?.jwtToken)
                if (response?.data?.code === 0) {
                    localStorage.setItem("jwtRefreshToken", response?.data?.result?.jwtRefreshToken)
                    localStorage.setItem("jwtToken", response?.data?.result?.jwtToken)
                }
                // Only update state if the component is still mounted
            } catch (error) {
                console.log(error);
            }
        };
        if (JwtRefreshToken) {
            Jwtset();
        }
    }, [JwtRefreshToken])

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
        localStorage.setItem("useraddingaddress", JSON.stringify(selectedLocation));
        console.log("selectedLocation1", selectedLocation)
        // return;
        // setShowCreateAddress(true);
    };


    return (
        <div className='col-md-12 px-3' style={{ overflowY: "auto" }}>
            <Layout2>
                <div className='col-md-12 margin_bottom_new'>
                    <AddLocation
                        showMap={showMap}
                        createAddressHandler={createAddressHandler}
                    />
                </div>
            </Layout2>
        </div>
    )
}

export default Selectfrommap