import Layout2 from '@/Components/Layout2/Layout2'
import axios from 'axios';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react'
import { IoCodeSlash } from 'react-icons/io5'
import { MdOutlineInsertLink } from 'react-icons/md'
import Moment from 'react-moment';
import { useSelector } from 'react-redux';


function Referral() {

    const { profile } = useSelector((state: any) => state);
    const [referraldata, setReferralData] = useState<any>("")
    const [sendReferralList, setSendReferralList] = useState<any>([])
    const [sendReferralListDetails, setSendReferralListDetails] = useState<any>("")
    const [inputName, setInputName] = useState<any>("")
    const [InputEmail, setInputEmail] = useState<any>("")
    const { enqueueSnackbar } = useSnackbar();
    const router = useRouter();
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [newloading, setNewloading] = useState<any>(false)
    const [JwtRefreshToken, setJwtRefreshToken] = useState<any>("");


    useEffect(() => {
        setJwtRefreshToken(localStorage?.getItem("jwtRefreshToken"));
    }, []);

    useEffect(() => {

        const fetchData = async () => {
            try {
                const response = await axios.get(`https://gateway.findanexpert.net/referral_svc/pv/lead/?customer_id=${profile.externalCustomerId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${JwtRefreshToken}`,
                            'Content-Type': 'multipart/form-data',
                        }
                    },
                );
                console.log("response new", response?.data?.result);
                setSendReferralList(response?.data?.result)
                // setReferralData(response.data?.result[0]);
            } catch (error: any) {
                console.log(error);
                if (JwtRefreshToken) {
                    Jwtset()
                }
            } finally {
                // setLoading(false);
            }

        };
        fetchData();
    }, [profile?.userId, InputEmail, JwtRefreshToken]);


    const validateEmail = (email: any) => {
        // Regular expression for basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleInputChange = (e: any) => {
        const email = e.target.value;
        setInputEmail(email);

        // Check if the email is valid and update the state
        setIsEmailValid(validateEmail(email));
    };

    console.log("isEmailValid", isEmailValid)





    useEffect(() => {

        const fetchData = async () => {
            try {
                const response = await axios.get(`https://gateway.findanexpert.net/referral_svc/pv/referral/customer/?created_for=${profile.externalCustomerId}&created_for_type=2`,
                    {
                        headers: {
                            Authorization: `Bearer ${JwtRefreshToken}`,
                            'Content-Type': 'multipart/form-data',
                        }
                    },
                );
                console.log("response dataa", response.data?.result[0]);
                setReferralData(response.data?.result[0]);
            } catch (error: any) {
                console.log(error);
                if (JwtRefreshToken) {
                    Jwtset()
                }
            } finally {
                // setLoading(false);
            }

        };
        fetchData();
    }, [profile?.userId, JwtRefreshToken]);




    useEffect(() => {

        const fetchData = async () => {
            try {
                const response = await axios.get(`https://gateway.findanexpert.net/referral_svc/pv/referral/data/?user_type=2&user_id=${profile.externalCustomerId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${JwtRefreshToken}`,
                            'Content-Type': 'multipart/form-data',
                        }
                    },
                );
                console.log("response new", response?.data?.result);
                setSendReferralListDetails(response?.data?.result)
                // setReferralData(response.data?.result[0]);
            } catch (error: any) {
                console.log(error);
                if (JwtRefreshToken) {
                    Jwtset()
                }
            } finally {
                // setLoading(false);
            }

        };
        fetchData();
    }, [profile?.userId, InputEmail, JwtRefreshToken]);


    // Create Referral Api ----------------------------------------------------------------------
    const Createreferral = async () => {
        const gettingToken = localStorage?.getItem("jwtRefreshToken");
        if (profile?.externalCustomerId) {
            try {
                const requestBody = {
                    created_by: profile?.externalCustomerId,
                    created_by_type: 2,
                    payout: 1,
                    countries_by_super_admin: [1, 2],
                    expiry_date: "2024-12-23T03:10:59Z",
                    created_for: profile?.externalCustomerId,
                    created_for_type: 2,
                    business_id: 0,
                    min_amount: 0
                };
                // console.log("jsondata", requestBody, item,"-->",selectedserviceparse)
                // return
                const response = await axios.post('https://gateway.findanexpert.net/referral_svc/pv/referral/customer/', requestBody,
                    {
                        headers: {
                            Authorization: `Bearer ${gettingToken}`,
                            'Content-Type': 'application/json',
                        }
                    },
                );
                // setVoucherApplied(response)

                if (response.data.code === 1) {
                    enqueueSnackbar('Referral Code is already generated', { variant: 'error' });
                } else {
                    console.log("amas", response.data.code)
                    enqueueSnackbar('Code generated successfully', { variant: 'success' });
                    window.location.reload();
                }

                // Handle the response data accordingly
                console.log('response.data', response.data);
            } catch (error) {
                // Handle errors here
                console.error('Error:', error);
            } finally {
                // Any cleanup or finalization code can go here
                // setLoading(false);
            }
        } else {
            router.push("/auth/signup")
        }
    };


    // ------------------> Send Referral Code Api <----------------------//
    const SendReferral = async (item: any) => {
        const gettingToken = localStorage?.getItem("jwtRefreshToken");
        setNewloading(true)
        if (isEmailValid === true) {
            if (profile?.externalCustomerId) {
                if (referraldata === undefined) {
                    ErrorReferalcode()
                } else {
                    try {

                        const formData = new FormData();
                        formData.append('email', InputEmail);
                        formData.append('referral_code_id', referraldata?.id);
                        formData.append('name', inputName);

                        const response = await axios.post('https://gateway.findanexpert.net/referral_svc/pv/lead/', formData,
                            {
                                headers: {
                                    Authorization: `Bearer ${gettingToken}`,
                                    'Content-Type': 'multipart/form-data',
                                }
                            },
                        );
                        setNewloading(false)
                        console.log("responseresponse", response.data.message)
                        if (response.data.code === 0) {
                            setInputEmail('');
                            setInputName('');
                            enqueueSnackbar('Referral code sent!', { variant: 'success' });
                        }
                        if (response.data.code === 1) {
                            enqueueSnackbar(`${response.data.message}`, { variant: 'warning' });
                        }

                        // Handle the response data accordingly
                        console.log('referal', response.data);
                    } catch (error) {
                        setNewloading(false)
                        // Handle errors here
                        console.error('Error:', error);
                    } finally {
                        // Any cleanup or finalization code can go here
                        // setLoading(false);
                    }
                }
            } else {
                router.push("/auth/signup")
            }
        } else {
            enqueueSnackbar('Enter valid email first!', { variant: 'error' });
        }
    };


    // for copying code ----------------------------------------------------------------------->
    const copyReferralCode = () => {
        if (profile?.externalCustomerId) {
            // Use the referral code from the API
            const numberToCopy = referraldata?.referral_code;

            // Create a temporary input element
            const inputElement = document.createElement('input');
            inputElement.value = numberToCopy;

            // Append the input element to the body
            document.body.appendChild(inputElement);

            // Select the text in the input element
            inputElement.select();
            inputElement.setSelectionRange(0, 99999); // For mobile devices

            // Copy the selected text to the clipboard
            document.execCommand('copy');

            // Remove the temporary input element
            document.body.removeChild(inputElement);

            // Optionally, you can provide user feedback (e.g., tooltip, alert) that the code is copied
            enqueueSnackbar('Referral Code is Copied!', { variant: 'success' });
        } else {
            router.push("/auth/signup")
        }
    };

    const ErrorReferral = () => {
        enqueueSnackbar('Please enter Email and Name to send referral', { variant: 'warning' });
    }

    console.log("referraldata", referraldata === undefined)

    const ErrorReferalcode = () => {
        enqueueSnackbar('Please Generate code first!', { variant: 'warning' });
    }

    const ErrorReferralcodecopy = () => {
        enqueueSnackbar('Generate code first to copy and send!', { variant: 'warning' });
    }

    console.log("sendReferralListDetails", sendReferralListDetails)

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
            window.location.reload();
            // Only update state if the component is still mounted
        } catch (error) {
            console.log(error);
        }
    };


    return (
        <Layout2>
            <div className='col-md-12 new_overflow_referral'>
                <div className='col-md-12 bg_referral_img'>
                    <div className='row'>
                        <div className='col-md-5 padding_left_new_referral newpadding_main'>
                            <p className='m-0 p-0 text_head_ref'>
                                Recommend a friend and<br /> receive £25 off any service
                            </p>
                            <p className='m-0 p-0 pt-2 sub_heading_new'>
                                You can also share your referral link by copying and sending<br /> it to your friends or sharing it on social media.
                            </p>
                            <div className='col-md-12 paddin_top_input'>
                                <input className='form-control new_input-referral rounded-pill' value={inputName} type='text' placeholder='Name' onChange={(e: any) => setInputName(e.target.value)} />
                            </div>
                            <div className='col-md-12 pt-3'>
                                <input className='form-control new_input-referral rounded-pill' type='text' value={InputEmail} placeholder='Email'
                                    onChange={handleInputChange} />
                                {!isEmailValid && <p className='mt-2' style={{ color: 'white', fontSize: "10px" }}>Invalid email address</p>}
                            </div>
                            <div className='col-md-12 text-end pt-4'>
                                {newloading ?
                                    <div className="spinner-grow text-light" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                    :
                                    <img className='img-fluid' src='/imagess/send.png' onClick={InputEmail.length != 0 && inputName.length != 0 ? SendReferral : ErrorReferral} />
                                }
                            </div>
                        </div>
                        <div className='col-md-7 text-center m-auto pt-5 pe-md-0 pe-4'>
                            <div className='col-md-12 text-right-margin-p'>
                                <p className='m-0 p-0 price_range'>£{sendReferralListDetails?.total_payout}</p>
                                <p className='m-0 p-0 price_range_sub'>Total Earning</p>
                                {referraldata != undefined ?
                                    <p className='m-0 p-0 price_range_sub'>Referral code : {referraldata?.referral_code}</p>
                                    : null}
                                <div className='col-md-12 '>
                                    <div className='row pt-2'>
                                        <div className='col-md-8'></div>
                                        <div className='col-md-4 col-12 text-start '>
                                            <div className='col-md-12 newborder_code px-3 py-2'>
                                                <div className='row universal_cursor'>
                                                    {referraldata === undefined ?
                                                        <div className='col-md-12 col-12 text-center '>
                                                            <p className='m-0 p-0 copy_link' onClick={Createreferral}>Create Referral   &nbsp;&nbsp;<IoCodeSlash id="icons_link" /></p>
                                                        </div>
                                                        :
                                                        <div className='col-md-12 col-12 text-center'>
                                                            <p className='m-0 p-0 copy_link' onClick={referraldata === undefined ? ErrorReferralcodecopy : copyReferralCode}><MdOutlineInsertLink id="icons_link" /> &nbsp;&nbsp;&nbsp; Copy Referral Code</p>
                                                        </div>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* <div className='col-md-12 pt-5'>
                                <div className='display_flex_direction '>
                                    <img className='img-fluid' src='/imagess/email.png' />
                                    <img className='img-fluid' src='/imagess/facebook.png' />
                                    <img className='img-fluid' src='/imagess/whatsapp.png' />
                                    <img className='img-fluid' src='/imagess/instagram.png' />
                                    <img className='img-fluid' src='/imagess/moree.png' />
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>
                <div className='col-md-12 pt-5 mt-4 mb-5'>
                    <div className='col-md-12 text-center'>
                        <p className='m-0 p-0 new_steps_reward'>Get rewarded in three easy steps</p>
                    </div>
                    <div className='col-md-12 left_right_padding_ref pt-5'>
                        <div className='row'>
                            <div className='col-md-4'>
                                <div className='col-md-12 text-center'>
                                    <img className='img-fluid' src='/imagess/one.png' />
                                    <p className='m-0 p-0 send_code'>Send Code</p>
                                    <p className='m-0 p-0 send_subcode pt-2'>We’ll send invitation to your friends<br /> with your code</p>
                                </div>
                            </div>
                            <div className='col-md-4'>
                                <div className='col-md-12 text-center'>
                                    <img className='img-fluid' src='/imagess/two.png' />
                                    <p className='m-0 p-0 send_code'>Get Notified</p>
                                    <p className='m-0 p-0 send_subcode pt-2'>You will be notified via email once<br /> a friend is approved</p>
                                </div>
                            </div>
                            <div className='col-md-4'>
                                <div className='col-md-12 text-center'>
                                    <img className='img-fluid' src='/imagess/three.png' />
                                    <p className='m-0 p-0 send_code'>Earn £25</p>
                                    <p className='m-0 p-0 send_subcode pt-2'>After your friend book his/her first service<br /> you both get reward instantly</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-md-12 left_right_padding_ref mb-5 '>
                    <div className='col-md-12 border_background_new_color py-4 px-2 mt-5'>
                        <div className='row'>
                            <div className='col-md-4 text-center '>
                                <img className='img-fluid' src='/imagess/refvec.png' />
                            </div>
                            <div className='col-md-6 m-auto'>
                                <div className='col-md-12'>
                                    <div className='row'>
                                        <div className='col-md-6 col-6'>
                                            <p className='m-0 p-0 mt-3 referral_text'>Total Referrals</p>
                                            <p className='m-0 p-0 mt-3 referral_text'>Rewarded</p>
                                            <p className='m-0 p-0 mt-3 referral_text'>Pending</p>
                                            <p className='m-0 p-0 mt-3 referral_text'>Total Earning</p>
                                        </div>
                                        <div className='col-md-6 col-6 text-end'>
                                            <p className='m-0 p-0 mt-3 referral_text_values'>{sendReferralListDetails?.total_invites_sent}</p>
                                            <p className='m-0 p-0 mt-3 referral_text_values'>{sendReferralListDetails?.used_referrals_count}</p>
                                            <p className='m-0 p-0 mt-3 referral_text_values'>{sendReferralListDetails?.pending_invites_count}</p>
                                            <p className='m-0 p-0 mt-3 referral_text_values'>£{sendReferralListDetails?.total_payout}</p>
                                        </div>
                                    </div>
                                </div>
                                <p className='m-0 p-0 mt-4 new_wow_text'><b>WOW!</b> You are doing Great, keep it up.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-md-12 left_right_padding_ref mb-5 '>
                    <div className='col-md-12 border_background_new_color py-4 px-md-5 px-3 mt-5'>
                        <div className='row'>
                            <div className='col-md-6 col-6'>
                                <p className='m-0 p-0 people_offered'>People you referred</p>
                            </div>
                            <div className='col-md-6 col-6 text-end'>
                                <p className='m-0 p-0 people_offered_red'>View All</p>
                            </div>
                        </div>
                        <div className='col-md-12 pt-4'>
                            {/* <div className='row'>
                                <div className='col-md-1'>
                                    <img className='img-fluid' src='/imagess/userprofile.png' />
                                </div>
                                <div className='col-md-6 col-6 m-auto'>
                                    <p className='m-0 p-0 name_font'>Usman Khan&nbsp;&nbsp;&nbsp;<img className='img-fluid' src='/imagess/pendd.png' /></p>
                                    <p className='m-0 p-0 pt-1 name_font_sub'>loremipsum@gmail.com</p>
                                </div>
                                <div className='col-md-5 col-6 text-end'>
                                    <div className='col-md-12'>
                                        <button className='btn btn-danger btn-sm rounded-pill px-3 background_remender'> Send reminder <img className='img-fluid' src='/imagess/arrow.png' /></button>
                                    </div>
                                    <div className='col-md-12 px-1 mt-1'>
                                        <p className='m-0 p-0 time_avt'>09, Aug 2023 at 9:00 PST</p>
                                    </div>
                                </div>
                            </div>
                            <div className='col-md-12'>
                                <hr className='background_line' />
                            </div>
                            <div className='row'>
                                <div className='col-md-1'>
                                    <img className='img-fluid' src='/imagess/userprofile.png' />
                                </div>
                                <div className='col-md-6 col-6 m-auto'>
                                    <p className='m-0 p-0 name_font'>Usman Khan&nbsp;&nbsp;&nbsp;<img className='img-fluid' src='/imagess/succ.png' /></p>
                                    <p className='m-0 p-0 pt-1 name_font_sub'>loremipsum@gmail.com</p>
                                </div>
                                <div className='col-md-5 col-6 text-end'>
                                    <div className='col-md-12'>
                                        <p className='m-0 p-0 earned_new'>You Earned <span className='earned_price_r'>£450</span></p>
                                    </div>
                                    <div className='col-md-12 px-1 mt-1'>
                                        <p className='m-0 p-0 time_avt'>09, Aug 2023 at 9:00 PST</p>
                                    </div>
                                </div>
                            </div>
                            <div className='col-md-12'>
                                <hr className='background_line' />
                            </div>
                            <div className='row'>
                                <div className='col-md-1'>
                                    <img className='img-fluid' src='/imagess/userprofile.png' />
                                </div>
                                <div className='col-md-6 col-6 m-auto'>
                                    <p className='m-0 p-0 name_font'>Usman Khan&nbsp;&nbsp;&nbsp;<img className='img-fluid' src='/imagess/pendd.png' /></p>
                                    <p className='m-0 p-0 pt-1 name_font_sub'>loremipsum@gmail.com</p>
                                </div>
                                <div className='col-md-5 col-6 text-end'>
                                    <div className='col-md-12'>
                                        <button className='btn btn-danger btn-sm rounded-pill px-3 background_remender'> Send reminder <img className='img-fluid' src='/imagess/arrow.png' /></button>
                                    </div>
                                    <div className='col-md-12 px-1 mt-1'>
                                        <p className='m-0 p-0 time_avt'>09, Aug 2023 at 9:00 PST</p>
                                    </div>
                                </div>
                            </div> */}
                            {sendReferralList?.map((item: any, index: any) => {
                                console.log("item", item)
                                return (
                                    <>
                                        <div className='row'>
                                            <div className='col-md-1'>
                                                <img className='img-fluid' src='/imagess/userprofile.png' />
                                            </div>
                                            <div className='col-md-6 col-6 m-auto'>
                                                <p className='m-0 p-0 name_font'>{item?.name}&nbsp;&nbsp;&nbsp;{item?.is_used === true ? <img className='img-fluid' src='/imagess/succ.png' /> : <img className='img-fluid' src='/imagess/pendd.png' />}</p>
                                                <p className='m-0 p-0 pt-1 name_font_sub'>{item?.email}</p>
                                            </div>
                                            <div className='col-md-5 col-6 text-end'>
                                                <div className='col-md-12'>
                                                    <button className='btn btn-secondary btn-sm rounded-pill px-3 background_remender_secondary'> Send reminder <img className='img-fluid' src='/imagess/arrowg.png' /></button>
                                                </div>
                                                <div className='col-md-12 px-1 mt-1'>
                                                    <p className='m-0 p-0 time_avt'>
                                                        <Moment format='DD/MM/YY'>
                                                            {item?.created_at}
                                                        </Moment>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-md-12'>
                                            <hr className='background_line' />
                                        </div></>
                                )
                            })}

                        </div>
                    </div>
                </div>
            </div>
        </Layout2>
    )
}

export default Referral