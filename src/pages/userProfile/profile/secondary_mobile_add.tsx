import React, { useEffect, useState } from 'react'
import SideBar from '../../../Components/components/sidebar'
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { GoogleReCaptcha } from "react-google-recaptcha-v3";
import { addSecondaryMobileNumber } from '@/helper';
import { AUTH_ACTIONS } from '@/Redux/Actions/loginPageAction';
import PhoneInputField from '@/Components/CountryPhoneInput/CountryPhoneInput';
import { enqueueSnackbar } from 'notistack';

const generateRandomId = () => {
    return Math.random().toString(36).substring(2, 15);
};

const getDeviceId = () => {
    const storedDeviceId = localStorage.getItem('deviceId');
    return storedDeviceId || generateRandomId();
};

function secondary_mobile_add() {

    const [secondaryemailval, seSecondaryemailval] = useState<any>("")
    const { profile } = useSelector((state: any) => state);
    const [deviceId, setDeviceId] = useState('');
    const router = useRouter();
    const [authToken, setAuthToken] = useState<any>("");
    const [valueee, setValueee] = useState<any>(profile?.secondaryMobile ? profile?.secondaryMobile : "")
    const [loading, setLoading] = useState(false);


    console.log("profile?.secondaryMobile", parseInt(profile?.secondaryMobile))

    const handleToken = (token: any) => {
        setAuthToken(token);
        return token;
    };
    useEffect(() => {
        const id = getDeviceId();
        setDeviceId(id);
        localStorage.setItem('deviceId', id);
        console.log('Device ID:', id);
    }, []);
    useEffect(() => {
        const handleBeforeUnload = (event: any) => {
            // Your custom logic here, for example, show a confirmation message
            const message = "Are you sure you want to leave?";
            event.returnValue = message; // Standard for most browsers
            return message; // For some older browsers
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);



    // const addSecondaryemailfunc = async () => {
    //     const token = localStorage.getItem("jwtToken");
    //     const apiUrl = 'https://gateway.findanexpert.net/signup_svc/pv/users/addSecondaryMobile';
    //     // const requestData = {
    //     //     userId: profile?.userId,
    //     //     text: secondaryemailval,
    //     //     type: 2,
    //     //     modifiedBy: profile?.userId
    //     // };

    //     const data = {
    //         userId: profile?.userId,
    //         secondaryMobile: `${valueee}`,
    //         deviceId: deviceId,
    //         modifiedBy: profile?.userId,
    //         isCrossPlatForm: false,
    //         isMobile: false,
    //         raptchaToken: authToken,
    //         isAndroidRequest: false,
    //         mobileCaptchaData: {
    //             projectId: "findanexpert-client",
    //             recaptchaAction: "LOGIN",
    //             recaptchaSiteKey: "6LdbmQMlAAAAAI0uG7ZSF6Uhf8gpPfoG6f9bjpCK",
    //         },
    //     };
    //     const headers = {
    //         'Content-Type': 'application/json', // Adjust the content type as needed
    //         'Authorization': `${token}`, // Add any custom headers here
    //     };

    //     try {
    //         const response = await axios.post(apiUrl, data, { headers });
    //         console.log("resssss", response);
    //         ResendEmailSecondaryOtp();
    //         // setData(response.data);
    //         // setError(null);
    //     } catch (err) {
    //         // setError(err.response.data);
    //         // setData(null);
    //     }
    // };



    const ResendEmailSecondaryOtp = async () => {
        const token = localStorage.getItem("jwtToken");
        const apiUrl = 'https://gateway.findanexpert.net/signup_svc/pb/users/resendEmailOtp';
        const requestData = {
            userId: profile?.userId,
            type: 2,
            secondaryemailval: profile?.secondaryMobile ? `${profile?.secondaryMobile}` : secondaryemailval,
        };
        console.log("resssss", secondaryemailval);
        return;
        const headers = {
            'Content-Type': 'application/json', // Adjust the content type as needed
            'Authorization': `${token}`, // Add any custom headers here
        };

        try {
            const response = await axios.post(apiUrl, requestData, { headers });
            console.log("resssss", response);
            router.push("secondaryEmail_verify");
            // setData(response.data);
            // setError(null);
        } catch (err) {
            // setError(err.response.data);
            // setData(null);
        }
    };



    const secondaryMobileNumberHandler = () => {
        setLoading(true);
        addSecondaryMobileNumber(
            profile.userId,
            valueee,
            authToken
        ).then((result: any) => {
            setLoading(false)
            console.log("result-------->", result)
            if (result?.code === 0) {
                localStorage.setItem("secondarymobileverify", JSON.stringify(valueee))
                router.push("/userProfile/profile/SecondaryMobile_verify")
            } 
            if (result?.code === 1) {
                enqueueSnackbar(`${result?.message}`, { variant: 'error' });
                router.push("/userProfile/profile/manage_mobiles")
            } 
            // 
            //   setTokenRefresh((r) => !r);
            //   if (result?.code === 0 || result?.code === 6) {
            //     onClickFunction(valueee);
            //     dispatch({
            //       type: AUTH_ACTIONS.SECONDARY_MOBILE_ADD,
            //       payload: { secondaryMobile: valueee },
            //     });
            //   } else {
            //     alert(result?.message || "Invalid credentials");
            //   }
            console.log("resss", result);
        }).catch((e) => {
            setLoading(false);
            alert(e)
        });
    };




    return (
        <SideBar activeIndex={0}>
            <GoogleReCaptcha onVerify={handleToken} />
            <div className="col-md-12 mt-4 margin_bottom_new">
                <div className='col-md-12 background_main_email p-2'>
                    <div className='row'>
                        <div className='col-md-12'>
                            <p className='m-0 pb-2 px-0 pt-0 primary_email_label'>Secondary Mobile</p>
                            {/* <input type='text' placeholder='Add Secondary Mobile' className='w-100 input_style' onChange={(event)=>seSecondaryemailval(event?.target.value)} /> */}
                            <PhoneInput
                                placeholder={profile?.secondaryMobile ? `${profile?.secondaryMobile}` : "Enter Mobile Number"}
                                value={valueee}
                                onChange={setValueee}
                                maxLength={18}
                            />

                        </div>
                    </div>

                </div>
                <div className='col-md-12 text-end button_size_fixed '>
                    {loading === false ?
                        <button className='btn btn-danger universal_button_color px-5'
                            onClick={secondaryMobileNumberHandler}
                        >Add  Mobile</button> :
                        <div className="spinner-border text-danger" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    }
                </div>
            </div>
        </SideBar>
    )
}

export default secondary_mobile_add