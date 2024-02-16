import Layout2 from '@/Components/Layout2/Layout2';
import NotesNewpc from '@/Components/NotesMobile/NotesNewpc';
import NotesPc from '@/Components/NotesMobile/Notespc';
import PurchaseSummary from '@/Components/flow_management/purchase_summary';
import { getOrderIdInLocalStorage } from '@/Components/helper';
import { addCart, addDefaultPaymentMethod, addNewPaymentMethod, getAllListOfPayments, getPurchaseOrderWithId, patchPurchaseOrder } from '@/helper';
import { EncryptObject } from '@/utils/crypto';
import axios from 'axios';
import { useRouter } from 'next/router';
import { enqueueSnackbar } from 'notistack';
import React, { useCallback, useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Moment from 'react-moment';
import { useSelector } from 'react-redux';

function OrderSummary() {
    const router = useRouter();
    const [purchaseOrder, setPurchaseOrder] = useState<any>({});
    const [isLoading, setIsLoading] = useState(false);
    const [GetVouchersData, setGetVouchersData] = useState<any>('');
    const { profile } = useSelector((state: any) => state);
    const [vouchersselect, SetVouchersselect] = useState<any>(0);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [voucherappled, setVoucherApplied] = useState<any>('');
    const [DiscountcodeSuccess, setDiscountcodeSuccess] = useState<any>('');
    const [inputDiscountCode, setInputDiscountCode] = useState<any>('');
    const [dicountcodeerror, setDicountcodeerror] = useState<any>('');
    const [Referalcodeerror, setReferalcodeerror] = useState<any>('');
    const [ReferalcodeSuccess, setReferalcodeSuccess] = useState<any>('');
    const [inputReferalCode, setInputReferalCode] = useState<any>('');
    const [Finaltotalprice, setFinaltotalprice] = useState<any>('');
    const [inputVoucherCode, setInputVoucherCode] = useState<any>('');
    const [Inputvouchercodeerror, setInputvouchercodeerror] = useState<any>('');
    const [InputvoucherRes, setInputvoucherRes] = useState<any>('');
    const [matchedItems, setMatchedItems] = useState<any>('')
    const [newVoucherIndex, setNewIndexVoucher] = useState<any>(null)
    const [loadervoucher, setLoadervoucher] = useState<any>(false);
    const [loaderdiscount, setLoaderDiscount] = useState<any>(false);
    const [loaderReferral, setLoaderReferral] = useState<any>(false);
    const [listOfPaymentMethod, setListOfPaymentMethod] = useState<any>([]);
    const [defaultPayment, setDefaultPayment] = useState<any>(null);
    const [LoadingNew, setLoadingNew] = useState<any>(false);
    const [carddefault, setcarddefault] = useState<any>(false);
    const [loadernewpayment, setLoadernewpayment] = useState<any>(false);
    const [checkvouchers, setcheckvouchers] = useState<any>(false);
    const [newdefault, setnewdefault] = useState<any>(false);

    const [CardNuumber, setCardNuumber] = useState<any>("");
    const [HolderName, setHolderName] = useState<any>("");
    const [ExpiryMonth, setExpiryMonth] = useState<any>(1);
    const [ExpiryYear, setExpiryYear] = useState<any>("");
    const [Cvv, setCvv] = useState<any>("");
    const [City, setCity] = useState<any>("");
    const [Country, setCountry] = useState<any>("");
    const [Flat, setFlat] = useState<any>("");
    const [Address, setAddress] = useState<any>("");
    const [Paymentadded, setPaymentadded] = useState<any>(false);
    const [jwtToken, setJwtToken] = useState<any>(null);
    const [AllCountries, setAllCountries] = useState<any>([])
    const [JwtRefreshToken, setJwtRefreshToken] = useState<any>("");
    const [paymentLoading, setPaymentLoading] = useState<any>(false);
    const [notesnew, setNotesnew] = useState<any>([]);







    const [show3, setShow3] = useState(false);
    const handleClose3 = () => setShow3(false);
    const handleShow3 = () => setShow3(true);


    const [show4, setShow4] = useState(false);
    const handleClose4 = () => setShow4(false);
    const handleShow4 = () => setShow4(true);

    const [show5, setShow5] = useState(false);
    const handleClose5 = () => setShow5(false);
    const handleShow5 = () => setShow5(true);

    const [show6, setShow6] = useState(false);
    const handleClose6 = () => setShow6(false);
    const handleShow6 = () => setShow6(true);

    const [show7, setShow7] = useState(false);
    const handleClose7 = () => setShow7(false);
    const handleShow7 = () => setShow7(true);

    const [show8, setShow8] = useState(false);
    const handleClose8 = () => setShow8(false);
    const handleShow8 = () => setShow8(true);

    const [show9, setShow9] = useState(false);
    const handleClose9 = () => setShow9(false);
    const handleShow9 = () => setShow9(true);

    const [show10, setShow10] = useState(false);
    const handleClose10 = () => setShow10(false);
    const handleShow10 = () => setShow10(true);

    useEffect(() => {
        setJwtToken(localStorage?.getItem("jwtToken"));
    }, []);

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
                    // localStorage.setItem("jwtRefreshToken", response?.data?.result?.jwtRefreshToken)
                    // localStorage.setItem("jwtToken", response?.data?.result?.jwtToken)
                    if (response?.data?.code === 0) {
                        localStorage.setItem("jwtRefreshToken", response?.data?.result?.jwtRefreshToken)
                        localStorage.setItem("jwtToken", response?.data?.result?.jwtToken)
                    }
                    // window.location.reload();
                    // Only update state if the component is still mounted
                } catch (error) {
                    console.log(error);
                }
            };
            Jwtset();
        }
    }, [profile?.firstName != undefined, JwtRefreshToken])

    useEffect(() => {
        const getpurchaseorderid = parseInt(getOrderIdInLocalStorage())
        const fetchDataFromAPI = async () => {
            try {
                const response = await axios.get(`https://gateway.findanexpert.net/notesapi_svc/pv/notes/?id=${getpurchaseorderid}&type=purchase_order_id&timezone=Asia/Karachi`);
                // /notesapi_svc/pv/notes/?id=780&type=provider&timezone=Asia/Karachi

                setNotesnew(response.data.result);

                // localStorage.setItem("notes_id", response.data?.result[0]?.id)
                console.log('get notes:', response.data);
            } catch (error) {
                console.error('API Error:', error);
            }
        };

        fetchDataFromAPI(); // This will trigger the GET request when the component mounts
    }, []);



    const today = new Date();
    const currentYear = today.getFullYear();


    const monthOptions = Array.from({ length: 12 }, (_, index) => {
        const monthValue = (index + 1).toString().padStart(2, "0");
        return (
            <option key={monthValue} value={monthValue}>
                {monthValue}
            </option>
        );
    });

    const yearOptions = Array.from({ length: 10 }, (_, index) => {
        const yearValue = (currentYear + index).toString();
        return (
            <option key={yearValue} value={yearValue}>
                {yearValue}
            </option>
        );
    });

    const getListOfPayments = async () => {
        await getAllListOfPayments(profile?.externalCustomerId)
            .then((res) => {
                setListOfPaymentMethod(res?.paymentList?.data ?? []);
            })
            .catch((e) => {
                if (JwtRefreshToken) {
                    Jwtset()
                }
                // alert(e)
            })
            .finally(() => setIsLoading(false));
    }

    useEffect(() => {
        setJwtRefreshToken(localStorage?.getItem("jwtRefreshToken"));
    }, []);

    useEffect(() => {
        const getallcountries = async () => {
            const isToken = jwtToken !== null;

            const headers = {
                // Authorization: isToken ? `Bearer ${jwtToken}` : undefined,
                "Content-Type": "application/json", // Update the content type if needed
                // withCredentials: true,
            };

            try {
                const response = await axios.get(
                    `https://gateway.findanexpert.net/signup_svc/pb/country/getCountry`
                    , { headers }
                );

                // Handle the response as needed
                // console.log("all countries", response.data);
                setAllCountries(response.data.result);
                // Update your state or perform actions with the fetched data
            } catch (error) {
                // Handle errors
                console.error("Fetch error:", error);

                // You can also update state or take other actions based on the error
            }
        };
        getallcountries();
    }, [])

    // console.log("All countries", AllCountries)




    const paymentAdd = async (DiscountCodeRes: any) => {
        setPaymentLoading(true);
        // try {
        const requestBody = {
            billingAddress: {
                city: City,
                country: Country,
                line1: Flat,
                line2: Address,
                postalCode: "47000",
                state: "london"
            },
            cardNumber: CardNuumber,
            cardOwnerName: HolderName,
            cvv: Cvv,
            email: profile?.primaryEmail,
            expirationMonth: ExpiryMonth,
            expirationYear: ExpiryYear,
            userId: profile?.externalCustomerId,
            fcmTokken: "",
            isDefault: true
        };
        const encryptedData = EncryptObject(JSON.stringify(requestBody));
        const data = {
            inputModel: encryptedData,
        }
        await addNewPaymentMethod(data).then((res) => {
            setVoucherApplied(res);
            if (res.code === 0) {
                setPaymentLoading(false)
                setPaymentadded(!Paymentadded)
                handleClose9();
                setShow8(true);
                enqueueSnackbar('Payment card added!', { variant: 'success' });
                getListOfPayments();
            } else {
                setPaymentLoading(false)
                // alert("not patched in purchase order")
                enqueueSnackbar('Payment card not added!', { variant: 'error' });
            }

            // Handle the response data accordingly
            // console.log('response.data', response.data);
        }).catch((error) => {
            // Handle errors here
            console.error('Error:', error);
            if (JwtRefreshToken) {
                Jwtset()
            }
        }).finally(() => setPaymentLoading(false));
        // console.log("jsondata", requestBody, item,"-->",selectedserviceparse)
        // return
        // const response = await axios.post('https://gateway.findanexpert.net/payment_svc/pv/Payment/SavePaymentMethod', data);
        // setVoucherApplied(response)
        // console.log("amas", response.data.code)
        // if (response.data.code === 0) {
        //     setPaymentLoading(false)
        //     setPaymentadded(!Paymentadded)
        //     handleClose9();
        //     setShow8(true);
        //     enqueueSnackbar('Payment card added!', { variant: 'success' });
        // } else {
        //     setPaymentLoading(false)
        //     // alert("not patched in purchase order")
        //     enqueueSnackbar('Payment card not added!', { variant: 'error' });
        // }

        // Handle the response data accordingly
        // console.log('response.data', response.data);
        // } catch (error) {
        //     // Handle errors here
        //     setPaymentLoading(false)
        //     console.error('Error:', error);
        //     if (JwtRefreshToken) {
        //         Jwtset()
        //     }
        // } finally {
        //     // Any cleanup or finalization code can go here
        //     // setLoading(false);
        // }
    };

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





    // **************************************************************************************************************************
    ////////////////////////////////////////////Function to get Profile///////////////////////////////////////////////
    // **************************************************************************************************************************




    useEffect(() => {
        setIsLoading(true);
        if (profile?.userId !== undefined) {
            getAllListOfPayments(profile?.externalCustomerId)
                .then((res) => {
                    setListOfPaymentMethod(res?.paymentList?.data ?? []);
                })
                .catch((e) => {
                    if (JwtRefreshToken) {
                        Jwtset()
                    }
                    // alert(e)
                })
                .finally(() => setIsLoading(false));
        }
    }, [profile.userId, carddefault, Paymentadded]);

    useEffect(() => {
        if (profile.userId !== undefined) {
            getAllListOfPayments(profile.userId)
                .then((res) => {
                    if (res.paymentList === null) {
                        console.log("");
                    } else {
                        for (let i = 0; i < res.paymentList.data.length; i++) {
                            if (res.paymentList.data[i].defaultPaymentMethod === true) {
                                setDefaultPayment(res.paymentList.data[i]);
                            }
                        }
                    }
                })
                .catch((e) => {
                    // console.log(e);
                    if (JwtRefreshToken) {
                        Jwtset()
                    }
                });
        }
    }, [profile, Paymentadded]);

    useEffect(() => {
        const gettotalprice: any = localStorage.getItem("incremented_price")
        const inttotalprice = parseInt(gettotalprice)
        setFinaltotalprice(inttotalprice);
    }, [])

    // **************************************************************************************************************************
    ////////////////////////////////////////////Function to get purchase order api///////////////////////////////////////////////
    // **************************************************************************************************************************

    const getPurchaseOrder = useCallback(() => {
        const purchaseOrderId = parseInt(getOrderIdInLocalStorage());
        if (isNaN(purchaseOrderId)) {
            // router.replace("/");--------------------------------------------------------------------------------------------------------
        } else {
            //   setIsLoading(true);
            getPurchaseOrderWithId(purchaseOrderId)
                .then((res) => setPurchaseOrder(res.result))
                .catch((e) => alert(e))
                .finally(() => console.log(false));
        }
    }, [router]);


    useEffect(() => {
        getPurchaseOrder();
        // if (profile?.userId) {
        //   fetchAddresses();
        // }
    }, [getPurchaseOrder, profile.userId]);




    // ------------------> Patch Discount code shaheer <----------------------//
    const discountCodePurchaseorder = async (DiscountCodeRes: any) => {
        try {
            const requestBody = {
                purchaseOrderId: purchaseOrder?.data?.purchaseOrderId,
                discountcode: DiscountCodeRes?.result?.discountCode[0],
                // totalAmount: purchaseOrder?.data?.amountpayable === 0 ? Finaltotalprice : purchaseOrder?.data?.amountpayable,
                // totalAmount: purchaseOrder?.data?.hasattribute === "true" ? purchaseOrder?.data?.attributes[0]?.attributePrice : Finaltotalprice,
                totalAmount: Finaltotalprice,
                hasdiscountcode: true,
                currentStep: 4,
            };
            // console.log("jsondata", requestBody, item,"-->",selectedserviceparse)
            // return
            const response = await axios.patch('https://gateway.findanexpert.net/purchaseorder_svc/pb/updatePurchaseOrder/', requestBody);
            setVoucherApplied(response)
            // console.log("amas", response.data.code)
            if (response.data.code === 0) {
                getPurchaseOrder();
                enqueueSnackbar('Discount code applied!', { variant: 'success' });
            } else {
                // alert("not patched in purchase order")
                enqueueSnackbar('Discount code not applied', { variant: 'error' });
            }

            // Handle the response data accordingly
            // console.log('response.data', response.data);
        } catch (error) {
            // Handle errors here
            console.error('Error:', error);
        } finally {
            // Any cleanup or finalization code can go here
            // setLoading(false);
        }
    };

    // ------------------> Patch Voucher code shaheer <----------------------//
    const purchaseorderonclick = async (voucherRes: any) => {
        setLoadervoucher(true);
        try {
            const requestBody = {
                purchaseOrderId: purchaseOrder?.data?.purchaseOrderId,
                vouchercode: voucherRes?.data?.result?.vouchers[0],
                hasvouchercode: true,
                // totalAmount: purchaseOrder.data.amountpayable === 0 ? Finaltotalprice : purchaseOrder.data.amountpayable,
                // totalAmount:  Finaltotalprice,
                // totalAmount: purchaseOrder?.data?.hasattribute === "true" ? purchaseOrder?.data?.attributes[0]?.attributePrice : Finaltotalprice,
                totalAmount: Finaltotalprice,
                currentStep: 4,
            };
            // console.log("jsondata", requestBody, item,"-->",selectedserviceparse)
            // return
            const response = await axios.patch('https://gateway.findanexpert.net/purchaseorder_svc/pb/updatePurchaseOrder/', requestBody);
            setVoucherApplied(response)
            // console.log("amas", response.data.code)
            if (response.data.code === 0) {
                getPurchaseOrder();
                setLoadervoucher(false);
                enqueueSnackbar('Voucher code applied', { variant: 'success' });
            } else {
                enqueueSnackbar('Voucher code not applied!', { variant: 'error' });
                setLoadervoucher(false);
            }

            // Handle the response data accordingly
            // console.log('response.data', response.data);
        } catch (error) {
            // Handle errors here
            console.error('Error:', error);
            setLoadervoucher(false);
        } finally {
            // Any cleanup or finalization code can go here
            // setLoading(false);
        }
    };

    // ------------------> Patch Referral code shaheer <----------------------//
    const purchaseorderupdateonReferral = async (ReferralResponse: any) => {
        try {
            const requestBody = {
                purchaseOrderId: purchaseOrder?.data?.purchaseOrderId,
                referal_code: ReferralResponse?.result?.discount_details,
                // totalAmount: purchaseOrder?.data?.amountpayable === 0 ? Finaltotalprice : purchaseOrder?.data?.amountpayable,
                // totalAmount: purchaseOrder?.data?.hasattribute === "true" ? purchaseOrder?.data?.attributes[0]?.attributePrice : Finaltotalprice,
                totalAmount: Finaltotalprice,
                hasreferal_code: true,
                currentStep: 4,
            };
            // console.log("jsondata", requestBody)
            // return
            const response = await axios.patch('https://gateway.findanexpert.net/purchaseorder_svc/pb/updatePurchaseOrder/', requestBody);
            setVoucherApplied(response)
            // console.log("amas", response.data.code)
            if (response.data.code === 0) {
                getPurchaseOrder();
                enqueueSnackbar('Referral Applied!', { variant: 'success' });
            } else {
                enqueueSnackbar('Referral code not applied!', { variant: 'error' });
            }

            // Handle the response data accordingly
            // console.log('response.data', response.data);
        } catch (error) {
            // Handle errors here
            console.error('Error:', error);
        } finally {
            // Any cleanup or finalization code can go here
            // setLoading(false);
        }
    };

    // ------------------> Post code set as default Payment <----------------------//
    const setasdefaultpayment = async (paymentdef: any) => {
        setLoadernewpayment(true);
        await addDefaultPaymentMethod(profile?.externalCustomerId, paymentdef?.id).then((res) => {
            console.log("IT IS COMING HERE", res);
            if (res.code === 0) {
                getListOfPayments();
                getPurchaseOrder();
                setcarddefault(!carddefault)
                enqueueSnackbar('Default card updated!', { variant: 'success' });
                setLoadernewpayment(false);
            } else {
                enqueueSnackbar('Default card not updated!', { variant: 'error' });
                setLoadernewpayment(false);
            }
        }).catch((error) => {
            console.error('Error:', error);
        }).finally(() => setLoadernewpayment(false));
        // try {
        //     const requestBody = {
        //         paymentMethodId: paymentdef?.id,
        //         userId: profile?.externalCustomerId,
        //     };
        //     const response = await axios.post('https://gateway.findanexpert.net/payment_svc/pv/Payment/AddDefaultPaymentMethod', requestBody);
        //     // setVoucherApplied(response)
        //     // console.log("amas", response.data.code)
        // if (response.data.code === 0) {
        //     getPurchaseOrder();
        //     setcarddefault(!carddefault)
        //     enqueueSnackbar('Default card updated!', { variant: 'success' });
        //     setLoadernewpayment(false);
        // } else {
        //     enqueueSnackbar('Default card not updated!', { variant: 'error' });
        //     setLoadernewpayment(false);
        // }

        //     // Handle the response data accordingly
        //     // console.log('response.data', response.data);
        // } catch (error) {
        //     // Handle errors here
        //     console.error('Error:', error);
        //     setLoadernewpayment(false);
        // } finally {
        //     // Any cleanup or finalization code can go here
        //     // setLoading(false);
        // }
    };


    // **************************************************************************************************************************
    /////////////////////////////////////////////Getting Current Date/////////////////////////////////////////////////////////////
    // **************************************************************************************************************************
    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentDate(new Date());
        }, 1000); // Update every second

        return () => clearInterval(intervalId); // Cleanup on component unmount
    }, []);


    // **************************************************************************************************************************
    //////////////////////////////////////////////////// Get Vouchers api ///////////////////////////////////////////////////////
    // **************************************************************************************************************************
    // ------------------> Get Purchase order Api <----------------------//
    useEffect(() => {
        const getPurchaseOrder = () => {
            const purchaseOrderId = parseInt(getOrderIdInLocalStorage());
            if (isNaN(purchaseOrderId)) {
                router.replace("/");
            } else {
                // setIsLoading(true);
                getPurchaseOrderWithId(purchaseOrderId)
                    .then((res) => {
                        // console.log("resssssssssssss", res?.result);
                        setPurchaseOrder(res?.result);
                    })
                    .catch((e) => alert(e))
                    .finally(() => setIsLoading(false));
            }
        };
        getPurchaseOrder();
    }, [router, voucherappled]);

    // ------------------> Get All Vouchers Api <-------------------------------------------------------------------------------------------------//
    useEffect(() => {
        const selectedservice: any = localStorage.getItem("selectedService");
        const selectedserviceparse = JSON.parse(selectedservice);
        // console.log("newnewanas", selectedserviceparse?.serviceId)
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://gateway.findanexpert.net/discountcode_svc/pb/Voucher/GetActiveVoucherByUserId?id=${profile?.externalCustomerId}`);
                setGetVouchersData(response.data);
                console.log("response.data", response.data?.electronicVouchers)
            } catch (error: any) {
                console.log(error);
            } finally {
            }
        };

        fetchData();
    }, [profile?.externalCustomerId, voucherappled]);


    const selectedservicevoucher = (serviceIdnew: any) => {

        const selectedService: any = localStorage.getItem("selectedService");
        const selectedServiceParse = JSON.parse(selectedService);

        serviceIdnew.services?.forEach((item: any, index: any) => {
            if (item?.serviceId === selectedServiceParse?.serviceId) {
                setcheckvouchers(true);
                // console.log("checkvouchers", checkvouchers)
                VerifyVouchers(serviceIdnew)
                enqueueSnackbar('Service voucher applied!', { variant: 'success' });
                return;
            }
            if (checkvouchers === false) {
                enqueueSnackbar('cannot be applied under this service', { variant: 'error' });
            } else {

            }
        });
    }




    // ------------------> Verify Vouchers Api <----------------------//
    const VerifyVouchers = async (item: any) => {
        setLoadervoucher(true);
        const selectedservice: any = localStorage.getItem("selectedService");
        const selectedserviceparse = JSON.parse(selectedservice);
        const formattedDate = currentDate.toISOString();
        const gettotalprice: any = localStorage.getItem("incremented_price")
        const inttotalprice = parseInt(gettotalprice)
        try {
            const requestBody = {
                // voucherId: item?.id,
                purchaseOrderId: purchaseOrder?.data?.purchaseOrderId,
                serviceId: selectedserviceparse?.serviceId,
                countryId: 1,
                customerId: profile?.externalCustomerId,
                voucherCode: item?.voucherCode,
                // amount: purchaseOrder?.data?.amountpayable === 0 ? inttotalprice : purchaseOrder?.data?.amountpayable,
                amount: purchaseOrder?.data?.hasattribute === "true" ? purchaseOrder?.data?.attributes[0]?.attributePrice : Finaltotalprice,
                expiryDate: `${formattedDate}`
            };
            // console.log("jsondata", requestBody, item,"-->",selectedserviceparse)
            // return
            const response = await axios.post('https://gateway.findanexpert.net/discountcode_svc/pb/Voucher/VerfiyVoucher', requestBody);
            setVoucherApplied(response)
            // console.log("amas", response.data.code)
            if (response.data.code === 0) {
                purchaseorderonclick(response)
                handleClose6();
                setLoadervoucher(false);
                enqueueSnackbar('Voucher Verified', { variant: 'success' });
            } else {
                // enqueueSnackbar('Voucher Not Verified!', { variant: 'error' });
                enqueueSnackbar(`${response.data.message}`, { variant: 'error' });
                setLoadervoucher(false);
            }

            // Handle the response data accordingly
            // console.log('response.data', response.data);
        } catch (error) {
            // Handle errors here
            console.error('Error:', error);
            setLoadervoucher(false);
        } finally {
            // Any cleanup or finalization code can go here
            // setLoading(false);
        }
    };

    // ------------------> Verify Input Vouchers Api <----------------------//
    const VerifyInputVouchers = async (item: any) => {
        const selectedservice: any = localStorage.getItem("selectedService");
        const selectedserviceparse = JSON.parse(selectedservice);
        const formattedDate = currentDate.toISOString();
        const gettotalprice: any = localStorage.getItem("incremented_price")
        const inttotalprice = parseInt(gettotalprice)
        try {
            const requestBody = {
                // voucherId: item?.id,
                purchaseOrderId: purchaseOrder?.data?.purchaseOrderId,
                serviceId: selectedserviceparse?.serviceId,
                countryId: 1,
                customerId: profile?.externalCustomerId,
                voucherCode: inputVoucherCode,
                // amount: inttotalprice,
                amount: purchaseOrder?.data?.hasattribute === "true" ? purchaseOrder?.data?.attributes[0]?.attributePrice : Finaltotalprice,
                expiryDate: `${formattedDate}`
            };
            // console.log("jsondata", requestBody)

            const response = await axios.post('https://gateway.findanexpert.net/discountcode_svc/pb/Voucher/VerfiyVoucher', requestBody);
            if (response.data.code === 0) {
                purchaseorderonclick(response)
                setInputvoucherRes(response)
                handleClose6();
                enqueueSnackbar('Voucher verified!', { variant: 'success' });
            } else {
                // setInputvouchercodeerror(response.data.message)
                enqueueSnackbar(`${response.data.message}`, { variant: 'error' });
            }

            // Handle the response data accordingly
            // console.log('response.data', response.data);
        } catch (error) {
            // Handle errors here
            console.error('Error:', error);
        } finally {
            // Any cleanup or finalization code can go here
            // setLoading(false);
        }
    };

    // ------------------> Verify Discount code  Api <----------------------//
    const VerifyDiscountCode = async (item: any) => {
        setLoaderDiscount(true)
        const formattedDate = currentDate.toISOString();
        const gettotalprice: any = localStorage.getItem("incremented_price")
        const inttotalprice = parseInt(gettotalprice)
        try {
            const requestBody = {
                countryId: 1,
                // dicountCodeId: 0,
                serviceId: 0,
                purchaseorderId: 0,
                customerId: profile?.externalCustomerId,
                dcode: inputDiscountCode,
                // amount: inttotalprice,
                amount: purchaseOrder?.data?.hasattribute === "true" ? purchaseOrder?.data?.attributes[0]?.attributePrice : Finaltotalprice,
                expiryDate: `${formattedDate}`
            };
            const response = await axios.post('https://gateway.findanexpert.net/discountcode_svc/pb/DiscountCode/VerfiyDiscountCode', requestBody);
            // console.log("responseresponse", response.data.code)
            if (response.data.code === 0) {
                setDiscountcodeSuccess(response)
                discountCodePurchaseorder(response.data)
                setLoaderDiscount(false)
                handleClose5();
                enqueueSnackbar('Discount code verified!', { variant: 'success' });
            } else {
                // setDicountcodeerror(response.data.message)
                setLoaderDiscount(false)
                // enqueueSnackbar('Discount code verified!', { variant: 'error' });
                enqueueSnackbar(`${response.data.message}`, { variant: 'error' });
            }


            // Handle the response data accordingly
            // console.log('response.data', response.data);
        } catch (error) {
            setLoaderDiscount(false)
            // Handle errors here
            console.error('Error:', error);
        } finally {
            // Any cleanup or finalization code can go here
            // setLoading(false);
        }
    };

    // ------------------> Verify Referal code  Api <----------------------//
    const VerifyRaferalCode = async (item: any) => {
        setLoaderReferral(true)
        const gettotalprice: any = localStorage.getItem("incremented_price")
        const inttotalprice: any = parseInt(gettotalprice)
        try {

            const formData = new FormData();
            formData.append('referral_code', inputReferalCode);
            formData.append('customer_id', profile?.externalCustomerId);
            formData.append('user_country', '1');
            // formData.append('amount', purchaseOrder?.data?.amountpayable === 0 ? inttotalprice : purchaseOrder?.data?.amountpayable,);
            formData.append('amount', purchaseOrder?.data?.hasattribute === "true" ? purchaseOrder?.data?.attributes[0]?.attributePrice : Finaltotalprice);
            formData.append('purchase_order_id', purchaseOrder?.data?.purchaseOrderId);

            const response = await axios.post('https://gateway.findanexpert.net/referral_svc/pv/referral/validity/', formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }
                },
            );
            // console.log("responseresponse", response.data.code)
            if (response.data.code === 0) {
                setLoaderReferral(false)
                setReferalcodeSuccess(response)
                purchaseorderupdateonReferral(response?.data)
                handleClose10();
                enqueueSnackbar('Referral Verified', { variant: 'success' });
            } else {
                enqueueSnackbar(`${response.data.message}`, { variant: 'error' });
                // setReferalcodeerror("Same Code Applied")
                // enqueueSnackbar('Referral Not Verified!', { variant: 'error' });
                setLoaderReferral(false)
            }


            // Handle the response data accordingly
            // console.log('referal', response.data);
        } catch (error) {
            // Handle errors here
            console.error('Error:', error);
            setLoaderReferral(false)
        } finally {
            // Any cleanup or finalization code can go here
            // setLoading(false);
        }
    };





    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////// End /////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



    // patching data in purchase order 
    const savePaymentMethodId = () => {
        const getlocalstoragequantity: any = localStorage.getItem("quantity_selected") === null ? null : localStorage.getItem("quantity_selected");
        const getlocalstoragequantitymain: any = localStorage.getItem("main_quantity");
        const getlocalstoragequantitynew: any = JSON.parse(localStorage.getItem("setQuantity_QuantityPage")) === null ? null : parseInt(JSON.parse(localStorage.getItem("setQuantity_QuantityPage")));
        // console.log("anas",  ,)
        // return
        if (listOfPaymentMethod[0]?.defaultPaymentMethod != true) {
            enqueueSnackbar('Please set your card as default! ', { variant: 'error' });
        } else {
            setLoadingNew(true);
            const selectedservice: any = localStorage.getItem("selectedService");
            const selectedServiceObject = JSON.parse(selectedservice);
            // console.log("--->", selectedServiceObject);
            const OrderId = parseInt(getOrderIdInLocalStorage());
            const cartData = {
                currency: "gbp",
                userId: purchaseOrder?.data?.customerId,
                countryId: purchaseOrder?.data?.countryId,
                // amount: purchaseOrder?.data?.amountpayable === 0 ? Finaltotalprice : purchaseOrder?.data?.amountpayable,
                amount: Finaltotalprice,
                createdBy: 0,
                serviceSKU: selectedServiceObject?.serviceSKU,
                purchaseOrderId: OrderId,
            };


            addCart(cartData)
                .then((res) => {
                    const cartId = res?.result?.cartId;
                    // return
                    const data = {
                        amountpayable: purchaseOrder?.data?.amountpayable === 0 ? Finaltotalprice : purchaseOrder?.data?.amountpayable,
                        quantity: getlocalstoragequantity != null ? getlocalstoragequantity : getlocalstoragequantitynew != null ? getlocalstoragequantitynew : 1,
                        noOfVisits: 1,
                        purchaseOrderId: OrderId,
                        paymentMethodId: listOfPaymentMethod[0]?.id,
                        submitPurchaseOrder: true,
                        currentStep: purchaseOrder?.data?.totalStep,
                        cartId: cartId,
                        totalPrice: purchaseOrder?.data?.amountpayable === 0 ? Finaltotalprice : purchaseOrder?.data?.amountpayable,
                        totalAmount: purchaseOrder?.data?.amountpayable === 0 ? Finaltotalprice : purchaseOrder?.data?.amountpayable,
                        amount: purchaseOrder?.data?.amountpayable === 0 ? Finaltotalprice : purchaseOrder?.data?.amountpayable,
                    };
                    console.log("sdsdsd", data);

                    // return
                    return patchPurchaseOrder(data);
                })

                .then((res) => {
                    setLoadingNew(false);
                    router.replace("/verifying_Slots");
                })
                .catch((e) => {
                    setLoadingNew(true);
                    console.error(e)
                });
        }
    };

    const selectVoucher = (item: any, index: any) => {
        // console.log("selectedVoucher", item)
        setNewIndexVoucher(index)
        VerifyVouchers(item)
    }

    const errordiscountcode = () => {
        enqueueSnackbar('Voucher cannot be applied you can only apply one', { variant: 'error' });
    }

    const errorvouchercode = () => {
        enqueueSnackbar('Discount cannot be applied you can only apply one ', { variant: 'error' });
    }

    const errornopayment = () => {
        enqueueSnackbar('Please add payment to proceed!', { variant: 'error' });
    }
    const errorpayment = () => {
        enqueueSnackbar('Please fill all the fields!', { variant: 'error' });
    }

    // console.log("listOfPaymentMethod", listOfPaymentMethod.length)

    // console.log("matchedItems", purchaseOrder?.data?.discountcode?.id === undefined)
    return (
        <Layout2>
            <div className='margin_bottom_new mb-md-5 pb-md-5 mt-3'>
                <PurchaseSummary purchaseOrder={purchaseOrder} />

                <div className='col-md-12 border_color_background padding_lef_r_summary mt-md-4 mt-0' onClick={handleShow3}>
                    <label className='label_summary m-0 p-0'>Notes</label>
                    <div className='d-flex mb-2'>
                        <img className="img-fluid" src="/imagess/nnotes.png" /> <span className='relevent_notes ps-1 padding_top_new_summary'>{notesnew.length === 0 ? <>Add Notes</>: <>{notesnew.length} Notes added</> } </span>
                    </div>
                </div>
                <div className='col-md-12 border_color_background mt-2 padding_lef_r_summary'>
                    <div onClick={purchaseOrder?.data?.vouchercode?.id === undefined ? handleShow5 : errorvouchercode}>
                        <label className='label_summary m-0 p-0' >Discount Code</label>
                        <div className='d-flex mb-2'>
                            <img className="img-fluid" src="/imagess/ndis.png" />   <span className='relevent_notes ps-1 padding_top_new_summary'>Add Discount Code </span>
                        </div>
                    </div>
                    <hr className='m-0 p-0 background_line' />
                    <div onClick={handleShow10}>
                        <label className='label_summary m-0 p-0' >Referral Code</label>
                        <div className='d-flex mb-2'>
                            <img className="img-fluid" src="/imagess/npro.png" />   <span className='relevent_notes ps-1 padding_top_new_summary'>Add Referral Code</span>
                        </div>

                    </div>
                    <hr className='m-0 p-0 background_line' />
                    <div onClick={purchaseOrder?.data?.discountcode?.id !== undefined ? errordiscountcode : handleShow6} className='mb-2'>
                        <label className='label_summary m-0 p-0'>Voucher</label>
                        <div className='d-flex '>
                            <img className="img-fluid" src="/imagess/nvo.png" />   <span className='relevent_notes ps-1 padding_top_new_summary'>Add Voucher</span>
                        </div>
                    </div>
                </div>
                <div className='col-md-12 border_color_background mt-2 padding_lef_r_summary'>
                    <label className='label_summary m-0 p-0' >Payment Method</label>
                    <p className='mb-2 relevent_notes' onClick={handleShow7}> <img className="img-fluid" src="/imagess/card.png" /> Credit/ Debit Card</p>
                    <hr className='m-0 p-0 background_line' />
                    <div onClick={handleShow8}>
                        <label className='label_summary m-0 p-0' >Payment Card</label>
                        {listOfPaymentMethod.length === 0 ?
                            <p className='mb-2 relevent_notes' ><img className="img-fluid" src="/imagess/visa.png" /> Please add credit/debit card.</p> :
                            <>
                                {listOfPaymentMethod?.map((items: any, index: any) => {
                                    // if (items?.defaultPaymentMethod) {
                                    //     setnewdefault(true)
                                    // }
                                    return (
                                        <>
                                            {items?.defaultPaymentMethod === true &&
                                                <p className='mb-2 relevent_notes'  > <img className="img-fluid" src="/imagess/visa.png" /> **** **** **** {items?.card?.last4} </p>
                                            }
                                        </>
                                    )
                                })}
                            </>
                        }
                    </div>
                    <hr className='m-0 p-0 background_line' />
                    <label className='label_summary m-0 p-0'>Billing Address</label>
                    <p className='mb-2 relevent_notes' >  <img className="img-fluid " src="/imagess/locr.png" />  {purchaseOrder?.address?.centerAddress[0]?.addressName}</p>
                    <hr className='m-0 p-0 background_line' />
                    <div onClick={handleShow4}>
                        <label className='label_summary m-0 p-0'>Payment Option</label>
                        <p className='mb-2 relevent_notes' > <img className="img-fluid" src="/imagess/full.png" /> Full Payment</p>
                    </div>
                </div>

                {/* <div className='col-md-12 border_color_background mt-2 px-2'>
                    <label className='label_summary m-0 p-0'>Discount Code</label>
                    <p className='mb-3 relevent_notes' onClick={purchaseOrder?.data?.vouchercode?.id === undefined ? handleShow5 : errorvouchercode} > <img className="img-fluid" src="/imagess/discountt.png" /> Apply Discount Code</p>
                    <hr className='m-0 p-0 background_line  ' />
                    <label className='label_summary m-0 p-0'>Vouchers</label>
                    <p className='mb-2 p-0 relevent_notes' onClick={purchaseOrder?.data?.discountcode?.id !== undefined ? errordiscountcode : handleShow6} > <img className="img-fluid" src="/imagess/voucherr.png" /> Add Vouchers</p>
                </div> */}



                <div className='col-md-12 border_color_background mt-2  mb-1 padding_lef_r_summary py-3'>

                    <div className='row'>
                        <div className='col-md-6 col-6 '>
                            <p className='m-0 p-0 sub_total_text1'>Sub total</p>
                        </div>
                        <div className='col-md-6 col-6  '>
                            <p className='m-0 p-0 sub_total_text2'>£
                                {/* {purchaseOrder?.data?.hasattribute === "true" ?
                                    purchaseOrder?.data?.attributes[0]?.attributePrice :
                                    Finaltotalprice} */}
                                {Finaltotalprice}
                                {/* {Finaltotalprice ? Finaltotalprice : null} */}
                            </p>
                        </div>
                    </div>
                    {purchaseOrder?.data?.voucherdiscountPrice != 0 ?
                        <div className='row'>
                            <div className='col-md-6 col-6 mt-1'>
                                <p className='m-0 p-0 sub_total_text3'>Voucher Discount</p>
                            </div>
                            <div className='col-md-6 col-6 mt-1 text-end'>
                                <p className='m-0 p-0 sub_total_text4'>£{purchaseOrder?.data?.voucherdiscountPrice}</p>
                            </div>
                        </div> : null}
                    {purchaseOrder?.data?.codediscountPrice != 0 ?
                        <div className='row'>
                            <div className='col-md-6 col-6 mt-1'>
                                <p className='m-0 p-0 sub_total_text3'>Discount</p>
                            </div>
                            <div className='col-md-6 col-6 mt-1 text-end'>
                                <p className='m-0 p-0 sub_total_text4'>£{purchaseOrder?.data?.codediscountPrice}</p>
                            </div>
                        </div> : null}
                    {purchaseOrder?.data?.ReferralcodediscountPrice != 0 ?
                        <div className='row'>
                            <div className='col-md-6 col-6 mt-1'>
                                <p className='m-0 p-0 sub_total_text3'>Referral Discount</p>
                            </div>
                            <div className='col-md-6 col-6 mt-1 text-end'>
                                <p className='m-0 p-0 sub_total_text4'>£{purchaseOrder?.data?.ReferralcodediscountPrice}</p>
                            </div>
                        </div> : null}
                    <div className='col-md-12 mt-2'>
                        <hr className='my-2 p-0 background_line  ' />
                    </div>
                    <div className='row'>
                        <div className='col-md-6 col-6 mt-1'>
                            <p className='m-0 p-0 sub_total_text6'>To Pay</p>
                        </div>
                        <div className='col-md-6 col-6 mt-1 text-end mt-1'>

                            <p className='m-0 p-0 sub_total_text6'>£{purchaseOrder?.data?.amountpayable === 0 ?
                                <>
                                    {Finaltotalprice}
                                    {/* {purchaseOrder?.data?.hasattribute === "true" ?
                                        purchaseOrder?.data?.attributes[0]?.attributePrice :
                                        Finaltotalprice} */}
                                </>
                                : purchaseOrder?.data?.amountpayable}</p>

                        </div>
                    </div>
                </div>
                <div className='col-md-12'>
                    {/* <p className='m-0 p-0 reward_small'>
                        You will earn <span className='reward_red'>0 Reward Points</span> on this booking
                    </p> */}
                </div>
                {/* ************************************************************************ */}
                {/* ************************************************************************ */}
                {/* ************************************************************************ */}
                {/* ******************************---> All Modals <---********************** */}
                {/* ************************************************************************ */}
                {/* ************************************************************************ */}
                {/* ************************************************************************ */}
                {/* Notes Modal ---------------------------------------------------- */}
                <Modal size="lg" centered show={show3} onHide={handleClose3}>

                    <Modal.Body className='model_height_notes'>
                        <div className='col-md-12'>
                            <div className='m-0 p-0 col-md-12'>
                                <h6 className='mb-0'><b>Notes</b></h6>
                                <p className='m-0 p-0 notes_para'>Notes/instruction for the service provider</p>
                            </div>
                            <NotesNewpc />
                        </div>
                    </Modal.Body>
                </Modal>
                {/* Payment Options ----------------------------------------------------  */}
                <Modal size="lg" centered show={show4} onHide={handleClose4}>

                    <Modal.Body>
                        <div className='col-md-12'>
                            <div className='m-0 p-0 col-md-12'>
                                <h6 className='mb-0'><b>Payment Options</b></h6>
                                <p className='m-0 pt-1 pb-0 notes_para'>Please select your payment option</p>
                            </div>
                            <div className='col-md-12 border_color_background  mt-4'>
                                <div className='col-md-12 background_address_bar_active_new px-3'>
                                    <div className='row py-2  '>
                                        <div className='col-md-6 col-6 pt-1'><p className='mb-2 relevent_notes' > <img className="img-fluid" src="/imagess/full.png" /> Full Payment</p></div>
                                        <div className='col-md-6 col-6'>
                                            <div className="row">
                                                <div className="col-md-10 col-10  text-end">
                                                    {/* <button className="badge bg-secondary btn_default_design btn-sm rounded-pill px-3">Default</button> */}
                                                </div>
                                                <div className="col-md-2  col-2 text-end">
                                                    <img className="img-fluid " src="/imagess/radius.png" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <hr className='m-0 p-0 background_line  ' />
                                <div className='col-md-12  px-3'>
                                    <div className='row py-2 '>
                                        <div className='col-md-6 col-6 pt-1'><p className='mb-2 relevent_notes' > <img className="img-fluid" src="/imagess/full.png" /> 4 months installment</p></div>
                                        <div className='col-md-6 col-6'>
                                            <div className="row">
                                                <div className="col-md-10 col-10  text-end">
                                                    <img className='img-fluid' src='/imagess/def.png' />
                                                </div>
                                                <div className="col-md-2  col-2 text-end">
                                                    <img className="img-fluid " src="/imagess/nonradius.png" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <hr className='m-0 p-0 background_line  ' />
                                <div className='col-md-12  px-3'>
                                    <div className='row py-2'>
                                        <div className='col-md-6 col-6 pt-1'><p className='mb-2 relevent_notes' > <img className="img-fluid" src="/imagess/full.png" /> 6 months installment</p></div>
                                        <div className='col-md-6 col-6'>
                                            <div className="row">
                                                <div className="col-md-10 col-10  text-end">
                                                </div>
                                                <div className="col-md-2  col-2 text-end">
                                                    <img className="img-fluid " src="/imagess/nonradius.png" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* border_bottom_new */}
                            </div>
                            <div className='text-center pt-5 pb-4 mt-5' >
                                <button
                                    onClick={handleClose4}
                                    className="btn btn-danger color_danger button_width_slots mt-5 px-2 py-2"
                                >
                                    Apply Now
                                </button>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>
                {/* Discount Code ---------------------------------------------------- */}
                <Modal size="lg" centered show={show5} onHide={handleClose5}>

                    <Modal.Body>
                        <div className='col-md-12'>
                            <div className='m-0 p-0 col-md-12'>
                                <h6 className='mb-1'><b>Discount Code</b></h6>
                                <p className='m-0 pt-0 pb-0 notes_para'>Please enter your discount/reward code below.</p>
                            </div>
                            <div className='col-md-12 border_discount px-2 py-1 mt-4 '>
                                <p className='m-0 p-0 discount_code_text'>Discount Code</p>
                                <input
                                    type="email"
                                    className="form-control input_discount"
                                    id="exampleInputEmail1"
                                    aria-describedby="emailHelp"
                                    placeholder="Have a code? Enter it here"
                                    onChange={(e: any) => setInputDiscountCode(e.target.value)}
                                />
                            </div>
                            <p className='m-0 p-0' style={{ color: "red", fontSize: "12px" }}>{dicountcodeerror}</p>
                            <div className='col-md-12 text-center mt-5 pt-5'>
                                <button className='btn btn-danger button_apply_new_order_summary' onClick={VerifyDiscountCode}> Apply Now&nbsp;&nbsp;
                                    {loaderdiscount === true ?
                                        <div className="spinner-border text-light spinner-border-sm" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div> : null
                                    }
                                </button>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>
                {/* Voucher ---------------------------------------------------- */}
                <Modal size="lg" centered show={show6} onHide={handleClose6}>

                    <Modal.Body>
                        <div className='col-md-12'>
                            <div className='m-0 p-0 col-md-12'>
                                <h6 className='mb-1'><b>Voucher</b></h6>
                                <p className='m-0 pt-0 pb-0 notes_para'>Please enter voucher code below</p>
                            </div>
                            <div className='col-md-12 border_discount px-2 py-1 mt-3 '>
                                <p className='m-0 p-0 discount_code_text'>Voucher Code</p>
                                <input
                                    type="email"
                                    className="form-control input_discount"
                                    id="exampleInputEmail1"
                                    aria-describedby="emailHelp"
                                    placeholder="Have a code? Enter it here"
                                    onChange={(e: any) => setInputVoucherCode(e.target.value)}
                                />
                            </div>
                            <p className='m-0 p-0' style={{ color: "red", fontSize: "12px" }}>{Inputvouchercodeerror}</p>

                            <div className='col-md-12 '>
                                {/* <div className='col-md-12  mt-3 mb-2'>
                                    <div className='d-flex'>
                                        <p className={`m-0 p-0 universal_cursor ${vouchersselect === 1 ? 'vouchers_active' : 'vouchers_unselected'}`} onClick={() => SetVouchersselect(1)}>Gift Voucher</p>
                                        &nbsp; <p className='m-0 p-0 vouchers_unselected'> | </p> &nbsp;
                                        <p className={`m-0 p-0 universal_cursor ${vouchersselect === 0 ? 'vouchers_active' : 'vouchers_unselected'}`} onClick={() => SetVouchersselect(0)}>Service Voucher</p>
                                    </div>
                                    <hr className='m-0 p-0' />
                                </div> */}
                                {/* {vouchersselect === 0 ? */}
                                    <>
                                        <p className='mb-2 mt-3 pt-0 pb-0 notes_para'>Please select voucher from below {loadervoucher === true ?
                                            <div className="spinner-border text-danger spinner-border-sm" role="status">
                                                <span className="visually-hidden">Loading...</span>
                                            </div> : null
                                        }
                                        </p>
                                        <div className='row'>
                                            {GetVouchersData?.electronicVouchers?.map((item: any, index: any) => {
                                                // console.log("array1", item?.id)
                                                return (
                                                    <div key={index} className='col-md-6 col-12 mt-2 mt-md-0 mb-4'>
                                                        <div className='col-md-12'>
                                                            <img className='img-fluid w-100' src='/imagess/voucher1.png' />
                                                        </div>
                                                        <div className='col-md-12  border_card_v'>
                                                            <div className='col-md-12 px-2 pb-1'>
                                                                <div className='row'>
                                                                    <div className='col-md-6 m-auto'>
                                                                        <p className='m-0 p-0 pt-1 exp_date'>Exp: &nbsp;
                                                                            <Moment format="DD/MM/YYYY">
                                                                                {item?.expiryDate}
                                                                            </Moment>, <b>£{item?.amount}</b>
                                                                        </p>
                                                                    </div>
                                                                    <div onClick={(e: any) => selectedservicevoucher(item)} className='col-md-6 text-end universal_cursor'>
                                                                        <img className='img-fluid' src='/imagess/newrad.png' />
                                                                    </div>
                                                                </div>

                                                            </div>
                                                        </div>

                                                    </div>
                                                )
                                            })}

                                            {/* <div className='col-md-6 col-12 mt-2 mt-md-0 mb-4'>
                                        <div className='col-md-12'>
                                            <img className='img-fluid w-100' src='/imagess/voucher1.png' />
                                        </div>
                                        <div className='col-md-12  border_card_v'>
                                            <div className='col-md-12 px-2 pb-1'>
                                                <div className='row'>
                                                    <div className='col-md-6 m-auto'>
                                                        <p className='m-0 p-0 pt-1 exp_date'>Exp: 24 Dec 2023</p>
                                                    </div>
                                                    <div className='col-md-6 text-end'>
                                                        <img className='img-fluid' src='/imagess/newrad1.png' />
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                        <p className='mb-2 mt-2 pt-0 pb-0 notes_para1'>
                                            Could not Redeem Voucher. Voucher Minimum amount is larger then
                                            your current total.
                                        </p>
                                    </div> */}
                                        </div>
                                    </> 
                                    {/* : vouchersselect === 1 ? */}
                                        <>
                                            <div className='row'>
                                                <p className='mb-2 pt-0 pb-0 notes_para'>Gift a voucher from below {GetVouchersData?.giftVouchers?.length}</p>
                                                {GetVouchersData?.giftVouchers?.map((item: any, index: any) => {
                                                    return (
                                                        <>
                                                            <div className='col-md-6 col-12 mt-2 mt-md-0 mb-4'>
                                                                <div className='col-md-12'>
                                                                    <img className='img-fluid w-100' src='/imagess/voucher1.png' />
                                                                </div>
                                                                <div className='col-md-12  border_card_v'>
                                                                    <div className='col-md-12 px-2 pb-1'>
                                                                        <div className='row'>
                                                                            <div className='col-md-6 m-auto'>
                                                                                <p className='m-0 p-0 pt-1 exp_date'>Exp:&nbsp;
                                                                                    <Moment format="DD/MM/YYYY">
                                                                                        {item?.expiryDate}
                                                                                    </Moment>, <b>£{item?.amount}</b>
                                                                                </p>
                                                                            </div>
                                                                            <div className='col-md-6 text-end universal_cursor'>
                                                                                <img onClick={(e) => selectVoucher(item, index)} className='img-fluid' src='/imagess/newrad.png' />
                                                                                {newVoucherIndex === index && loadervoucher === true ?
                                                                                    <div className="spinner-border text-danger spinner-border-sm" role="status">
                                                                                        <span className="visually-hidden">Loading...</span>
                                                                                    </div> : null
                                                                                }
                                                                            </div>
                                                                        </div>

                                                                    </div>
                                                                </div>
                                                            </div>
                                                            {/* <div className='col-md-6 col-12 mt-2 mt-md-0 mb-4'>
                                         <div className='col-md-12'>
                                             <img className='img-fluid w-100' src='/imagess/voucher1.png' />
                                         </div>
                                         <div className='col-md-12  border_card_v'>
                                             <div className='col-md-12 px-2 pb-1'>
                                                 <div className='row'>
                                                     <div className='col-md-6 m-auto'>
                                                         <p className='m-0 p-0 pt-1 exp_date'>Exp: 24 Dec 2023</p>
                                                     </div>
                                                     <div className='col-md-6 text-end'>
                                                         <img className='img-fluid' src='/imagess/newrad1.png' />
                                                     </div>
                                                 </div>
 
                                             </div>
                                         </div>
                                         <p className='mb-2 mt-2 pt-0 pb-0 notes_para1'>
                                             Could not Redeem Voucher. Voucher Minimum amount is larger then
                                             your current total.
                                         </p>
                                     </div> */}
                                                        </>

                                                    )
                                                })}
                                            </div>
                                        </>
                                        {/* // : null} */}

                            </div>
                            <div className='col-md-12 text-center'>
                                {inputVoucherCode.length === 0 ?
                                    <button className='btn btn-danger universal_button_color w-50' disabled> Apply  </button>
                                    :
                                    <button className='btn btn-danger universal_button_color w-50' onClick={VerifyInputVouchers}> Apply  </button>
                                }
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>
                {/* Payment Methods ---------------------------------------------------- */}
                <Modal size="lg" centered show={show7} onHide={handleClose7}>

                    <Modal.Body>
                        <div className='col-md-12 pt-2'>
                            <div className='m-0 p-0 col-md-12'>
                                <h6 className='mb-0'><b>Payment Method</b></h6>
                                <p className='m-0 pt-1 pb-0 notes_para'>Please select your payment method</p>
                            </div>
                            <div className='col-md-12 border_color_background  mt-4'>
                                <div className='col-md-12  px-3'>
                                    <div className='row py-2  '>
                                        <div className='col-md-6 col-6 pt-1'><p className='mb-2 relevent_notes' > <img className="img-fluid" src="/imagess/expertp.png" /> Expert Wallet</p></div>
                                        <div className='col-md-6 col-6'>
                                            <div className="row">
                                                <div className="col-md-12 col-10  text-end">
                                                    <img className='img-fluid' src='/imagess/newdef.png' />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-md-12 px-2'>
                                    <hr className="background_line m-0" />
                                </div>
                                <div className='col-md-12 background_address_bar_active_new  px-3'>
                                    <div className='row py-2 '>
                                        <div className='col-md-6 col-6 pt-1'><p className='mb-2 relevent_notes' > <img className="img-fluid" src="/imagess/cardp.png" /> Credit/ Debit Card</p></div>
                                        <div className='col-md-6 col-6'>
                                            <div className="row">
                                                <div className="col-md-12 col-10  text-end">
                                                    {/* <button className="badge bg-secondary btn_default_design btn-sm rounded-pill px-3">Default</button> */}

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-md-12 px-2'>
                                    <hr className="background_line m-0" />
                                </div>
                                <div className='col-md-12  px-3'>
                                    <div className='row py-2'>
                                        <div className='col-md-6 col-6 pt-1'><p className='mb-2 relevent_notes' > <img className="img-fluid" src="/imagess/cashp.png" /> Cash</p></div>
                                        <div className='col-md-6 col-6'>
                                            <div className="row">
                                                <div className="col-md-10 col-10  text-end">

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-md-12 px-2'>
                                    <hr className="background_line m-0" />
                                </div>
                                <div className='col-md-12  px-3'>
                                    <div className='row py-2'>
                                        <div className='col-md-6 col-6 pt-1'><p className='mb-2 relevent_notes' > <img className="img-fluid" src="/imagess/paypal.png" /> Pay Pal</p></div>
                                        <div className='col-md-6 col-6'>
                                            <div className="row">
                                                <div className="col-md-10 col-10  text-end">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-md-12 px-2'>
                                    <hr className="background_line m-0" />
                                </div>
                                <div className='col-md-12  px-3'>
                                    <div className='row py-2'>
                                        <div className='col-md-6 col-6 pt-1'><p className='mb-2 relevent_notes' > <img className="img-fluid" src="/imagess/google.png" /> Google Pay</p></div>
                                        <div className='col-md-6 col-6'>
                                            <div className="row">
                                                <div className="col-md-10 col-10  text-end">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-md-12 px-2'>
                                    <hr className="background_line m-0" />
                                </div>
                                <div className='col-md-12  px-3'>
                                    <div className='row py-2'>
                                        <div className='col-md-6 col-6 pt-1'><p className='mb-2 relevent_notes' > <img className="img-fluid" src="/imagess/linkp.png" /> Pay By Link</p></div>
                                        <div className='col-md-6 col-6'>
                                            <div className="row">
                                                <div className="col-md-10 col-10  text-end">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-md-12 px-2'>
                                    <hr className="background_line m-0" />
                                </div>
                                <div className='col-md-12  px-3'>
                                    <div className='row py-2'>
                                        <div className='col-md-6 col-6 pt-1'><p className='mb-2 relevent_notes' > <img className="img-fluid" src="/imagess/applep.png" /> Apple Pay</p></div>
                                        <div className='col-md-6 col-6'>
                                            <div className="row">
                                                <div className="col-md-10 col-10  text-end">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* border_bottom_new */}
                            </div>
                            <div className='text-center pt-3 pb-4 ' >
                                <button
                                    onClick={handleClose7}
                                    className="btn btn-danger color_danger button_width_slots mt-4 px-2 py-2"
                                >
                                    Select
                                </button>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>
                {/* Payment Cards ---------------------------------------------------- */}
                <Modal size="lg" centered show={show8} onHide={handleClose8}>

                    <Modal.Body>
                        <div className='col-md-12'>
                            <div className='m-0 p-0 col-md-12'>
                                <h6 className='mb-0'><b>Card Payment{loadernewpayment ? <div className="spinner-grow spinner-grow-sm text-danger" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div> : null}</b></h6>
                                <p className='m-0 pt-1 pb-0 notes_para'>Please select your payment method</p>
                            </div>
                            <div className='col-md-12 border_color_background  mt-4'>

                                {listOfPaymentMethod?.map((items: any, index: any) => {
                                    return (
                                        <div key={index} onClick={(e) => setasdefaultpayment(items)} className={`col-md-12 ${items?.defaultPaymentMethod === true ? "background_address_bar_active_new" : ""}  px-3`}>

                                            <div className='row  '>
                                                <div className='col-md-6 col-6'>
                                                    <label className='label_summary m-0 p-0'>{items?.billing_details?.name}</label>
                                                    <p className='mb-2 relevent_notes' > <img className="img-fluid" src="/imagess/cardp.png" /> **** **** **** {items?.card?.last4} <span className='ps-md-5 time_font'>{items?.card?.exp_month}/{items?.card?.exp_year}</span></p> </div>
                                                <div className='col-md-6 col-6 m-auto'>
                                                    <div className="row">
                                                        <div className="col-md-10 col-10  text-end">
                                                            {/* <button className="badge bg-secondary btn_default_design btn-sm rounded-pill px-3">Default</button> */}
                                                            {items?.defaultPaymentMethod === true ?
                                                                <img className='img-fluid' src='/imagess/def.png' />
                                                                : null}
                                                        </div>
                                                        <div className="col-md-2  col-2 text-end">
                                                            {items?.defaultPaymentMethod === true ?
                                                                <img className="img-fluid " src="/imagess/radius.png" />
                                                                :
                                                                <img className="img-fluid " src="/imagess/nonradius.png" />
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <hr className='m-0 p-0 background_line  ' />
                                        </div>
                                    )
                                })}



                                {/* border_bottom_new */}
                            </div>
                            <div className='text-start  pb-4' >
                                <button
                                    onClick={() => {
                                        handleClose8();
                                        handleShow9();
                                    }}
                                    className="btn btn-danger btn-sm button_style_addnew  mt-4 px-4 py-1"
                                >
                                    Add New
                                </button>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>
                {/* Add Payment Cards ---------------------------------------------------- */}
                <Modal size="lg" centered show={show9} onHide={handleClose9}>

                    <Modal.Body className='body_color_payment'>
                        <div className='row'>
                            <div className='col-md-6 '>
                                <div className='m-0 p-0 col-md-12 '>
                                    <h6 className='mb-0'><b>Add Card
                                        {paymentLoading ?
                                            <div className="spinner-grow spinner-grow-sm" role="status">
                                                <span className="visually-hidden">Loading...</span>
                                            </div>
                                            : null
                                        }
                                    </b></h6>
                                    <p className='m-0 pt-1 pb-0 notes_para'>Please add card number and card holder name</p>
                                </div>
                            </div>
                            <div className='col-md-6 m-auto display_pc'>
                                <div className='m-0 p-0 col-md-12 text-end' >
                                    <img className='img-fluid universal_cursor' onClick={handleClose9} src='/imagess/x.png' />
                                </div>

                            </div>
                        </div>
                        <div className='col-md-12'>

                            <div className='row'>
                                <div className='col-md-5 display_pc m-auto text-center'>
                                    <img className='img-fluid' src='/imagess/master.png' />
                                </div>
                                <div className='col-md-1 display_pc m-auto text-center'>
                                    <img className='img-fluid' src='/imagess/vline.png' />
                                </div>
                                <div className='col-md-6 '>
                                    <div className='col-md-12 border_discount px-2 pb-1 pt-2 mt-3 '>
                                        <p className='m-0 p-0 discount_code_text'>Card Number</p>
                                        <input
                                            onChange={(e: any) => setCardNuumber(e.target.value)}
                                            type="text"
                                            className="form-control input_discount"
                                            id="exampleInputEmail1"
                                            aria-describedby="emailHelp"
                                            placeholder="**** **** **** ****"
                                            maxLength={16}
                                        />
                                    </div>
                                    <div className='col-md-12 border_discount px-2 pb-1 pt-2 mt-2'>
                                        <p className='m-0 p-0 discount_code_text'>Card Holder Name</p>
                                        <input
                                            onChange={(e: any) => setHolderName(e.target.value)}
                                            type="text"
                                            className="form-control input_discount"
                                            id="exampleInputEmail1"
                                            aria-describedby="emailHelp"
                                            placeholder="Enter card holder name"
                                        />
                                    </div>
                                    <div className='row'>
                                        <div className='col-md-6'>
                                            <div className='col-md-12 border_discount px-2 pb-0 pt-1 mt-2'>
                                                <p className='m-0 p-0 discount_code_text'>Expiry</p>
                                                {/* <input
                                            type="month"
                                            className="form-control input_discount"
                                            id="exampleInputEmail1"
                                            aria-describedby="emailHelp"
                                            placeholder="Month"
                                        /> */}
                                                <select
                                                    className="form-control border_removal1 ps-0"
                                                    id="expiry"
                                                    value={ExpiryMonth}
                                                    onChange={(e: any) => setExpiryMonth(e.target.value)}
                                                >
                                                    {monthOptions}
                                                </select>
                                            </div>
                                        </div>
                                        <div className='col-md-6'>
                                            <div className='col-md-12 border_discount px-2 pb-0 pt-1 mt-2'>
                                                <p className='m-0 p-0 discount_code_text'>Expiry</p>
                                                {/* <input
                                            type="year"
                                            className="form-control input_discount"
                                            id="exampleInputEmail1"
                                            aria-describedby="emailHelp"
                                            placeholder="Year"
                                        /> */}
                                                <select
                                                    className="form-control border_removal1 ps-0"
                                                    id="expiry-year"
                                                    value={ExpiryYear}
                                                    onChange={(e) => setExpiryYear(e.target.value)}
                                                >
                                                    {yearOptions}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-md-12 border_discount px-2 pb-1 pt-2 mt-2'>
                                        <p className='m-0 p-0 discount_code_text'>Security Code</p>
                                        <input
                                            onChange={(e: any) => setCvv(e.target.value)}
                                            type="text"
                                            className="form-control input_discount"
                                            id="exampleInputEmail1"
                                            aria-describedby="emailHelp"
                                            placeholder="CVV/ CVC Number"
                                            maxLength={3}
                                        />
                                    </div>
                                    <div className='row'>
                                        <div className='col-md-6'>
                                            <div className='col-md-12 border_discount px-2 pb-1 pt-2 mt-2'>
                                                <p className='m-0 p-0 discount_code_text'>City</p>
                                                <input
                                                    type="email"
                                                    className="form-control input_discount"
                                                    id="exampleInputEmail1"
                                                    aria-describedby="emailHelp"
                                                    placeholder="City"
                                                />
                                            </div>
                                        </div>
                                        <div className='col-md-6'>
                                            <div className='col-md-12 border_discount px-2 pb-1 pt-2 mt-2'>
                                                <p className='m-0 p-0 discount_code_text'>Country</p>
                                                {/* <input
                                            onChange={(e: any) => setCountry(e.target.value)}
                                            type="text"
                                            className="form-control input_discount"
                                            id="exampleInputEmail1"
                                            aria-describedby="emailHelp"
                                            placeholder="Country"
                                            maxLength={2}
                                        /> */}
                                                <select className="form-control input_discount" onChange={(e) => setCountry(e.target.value)} id="exampleFormControlSelect1">
                                                    <option value="" className='input_discount' >Select Country</option>
                                                    {AllCountries?.map((item: any, index: any) => {
                                                        return (
                                                            <option key={index} value={item.isoCode} className='px-4'>{item?.name}</option>
                                                        )
                                                    })}

                                                </select>


                                            </div>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-md-6'>
                                            <div className='col-md-12 border_discount px-2 pb-1 pt-2 mt-2'>
                                                <p className='m-0 p-0 discount_code_text'>Flat/Building</p>
                                                <input
                                                    onChange={(e: any) => setFlat(e.target.value)}
                                                    type="text"
                                                    className="form-control input_discount"
                                                    id="exampleInputEmail1"
                                                    aria-describedby="emailHelp"
                                                    placeholder="Flat/Building"
                                                />
                                            </div>
                                        </div>
                                        <div className='col-md-6'>
                                            <div className='col-md-12 border_discount px-2 pb-1 pt-2 mt-2'>
                                                <p className='m-0 p-0 discount_code_text'>Street Address</p>
                                                <input
                                                    onChange={(e: any) => setAddress(e.target.value)}
                                                    type="text"
                                                    className="form-control input_discount"
                                                    id="exampleInputEmail1"
                                                    aria-describedby="emailHelp"
                                                    placeholder="Street Address"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className='text-center pt-3 pb-3 ' >
                                        {paymentLoading ?
                                            <button
                                                className="btn btn-danger color_danger button_width_slots mt-4 px-2 py-2"
                                            >
                                                Save Now
                                            </button> :
                                            <button
                                                onClick={CardNuumber.length === 0 && HolderName.length === 0 && ExpiryMonth.length === 0 && ExpiryYear.length === 0 && Cvv.length === 0 && City.length === 0 && Country.length === 0 && Flat.length === 0 && Address.length === 0 ? errorpayment : paymentAdd}
                                                className="btn btn-danger color_danger button_width_slots mt-4 px-2 py-2"
                                            >
                                                Save Now
                                            </button>
                                        }
                                    </div>
                                </div>
                            </div>




                        </div>
                    </Modal.Body>
                </Modal>
                {/* Referal code ------------------------------------------------------ */}
                <Modal size="lg" centered show={show10} onHide={handleClose10}>

                    <Modal.Body>
                        <div className='col-md-12'>
                            <div className='m-0 p-0 col-md-12'>
                                <h6 className='mb-1'><b>Add Referral Code</b></h6>
                                <p className='m-0 pt-0 pb-0 notes_para'>Please enter your Referral code below.</p>
                            </div>
                            <div className='col-md-12 border_discount px-2 py-1 mt-4 '>
                                <p className='m-0 p-0 discount_code_text'>Referral Code</p>
                                <input
                                    type="email"
                                    className="form-control input_discount"
                                    id="exampleInputEmail1"
                                    aria-describedby="emailHelp"
                                    placeholder="Have a code? Enter it here"
                                    onChange={(e: any) => setInputReferalCode(e.target.value)}
                                />
                            </div>
                            <p className='m-0 p-0' style={{ color: "red", fontSize: "12px" }}>{Referalcodeerror}</p>
                            <div className='col-md-12 text-center mt-5 pt-5'>
                                <button className='btn btn-danger button_apply_new_order_summary' onClick={VerifyRaferalCode}> Apply Now
                                    {loaderReferral === true ?
                                        <div className="spinner-border text-light spinner-border-sm" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div> : null
                                    }
                                </button>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>

                <div className='col-md-12 text-center mt-5'>
                    <button
                        className="btn btn-danger color_danger button_width_slots mt-4  py-2"
                        onClick={listOfPaymentMethod.length == 0 ? errornopayment : savePaymentMethodId}
                    >
                        Pay Now
                        {LoadingNew ?
                            <div className="spinner-border spinner-border-sm text-light" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                            : null
                        }
                    </button>
                </div>
            </div>
        </Layout2>
    )
}

export default OrderSummary