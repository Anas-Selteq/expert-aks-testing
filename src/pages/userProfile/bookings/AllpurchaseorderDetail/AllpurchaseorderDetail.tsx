import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import Moment from 'react-moment';
import { useSelector } from 'react-redux';

function AllpurchaseorderDetail() {
    const { profile } = useSelector((state: any) => state);
    const [allbookingsss, setAllbookingsss] = useState<any>();
    const [Loading, setLoading] = useState<any>(false);
    const newprofile = profile ? profile : "";

    useEffect(() => {
        // for Bookings --------------------------- 
        const fetchDataofaalbookings = async () => {
            setLoading(true);
            try {
                // Replace 'your-api-url' with the actual API endpoint you want to request data from
                const apiUrl = `https://gateway.findanexpert.net/purchaseorder_svc/pb/getCustomerPurchaseOrder/?customerId=${profile?.externalCustomerId}&timeZone=Europe/London`;
                // const apiUrl = 'https://gateway.findanexpert.net/bookingorder_svc/pb/getBookingList/?customerId=1&page=1';
                const response = await axios.get(apiUrl);
                setAllbookingsss(response?.data?.result?.data);
                setLoading(false);
            } catch (error) {
                // Handle errors here
                console.error("Error fetching data:");
                setLoading(false);
            }
        };
        fetchDataofaalbookings();

    }, [newprofile]);

    console.log("allbookingsss", allbookingsss)


    const router = useRouter();
    const handleClickBookingDetail = (item: any) => {
        console.log("newdate", item)
        localStorage.setItem("purchaseorderId", item?.expertBookingId);
        localStorage.setItem("appointment_id_booking", item?.appointments[0]?.id);
        router.push(`/userProfile/bookings/Servicedetail/${item?.expertBookingId}`);
    };
    const handleClick = (id: any) => {
        localStorage.setItem("purchaseorderId", id);
        const nabu = router.push(`/userProfile/bookings/PurchaseOrderDetail/${id}`);
    };
    return (
        <div >
            {Loading === false ?
                <>
                    {allbookingsss?.map((item: any, index: any) => {
                        // console.log("abs", item?.dateJson[0])
                        return (
                            <div className='row px-3 mt-3'
                                key={index}
                                onClick={() =>
                                    handleClick(item?.data?.purchaseOrderId)
                                }
                            >
                                <div className='col-md-1 col-2  pe-0'>
                                    <img className='img-fluid rounded-circle' src={item?.data?.businessImage?.length === 0 ? "/imagess/avatar.png" : "/imagess/avatar.png"} />
                                </div>
                                <div className='col-md-11 col-10'>
                                    <div className='col-md-12 pt-2'>
                                        <p className='m-0 p-0 main_waxflow_text'>  {item?.data?.serviceName}</p>
                                    </div>
                                    <div className='col-md-12'>
                                        <div className='row'>
                                            <div className='col-md-6 col-8'>
                                                <p className='m-0 p-0 main_waxflow_text1'>London {item?.data?.serviceType}</p>
                                            </div>
                                            <div className='col-md-6 col-4 text-end'>
                                                <p className='m-0 p-0 main_waxflow_text2'>
                                                    <Moment format="DD MMM, YYYY">
                                                        {item?.data?.dateJson[0]?.bookingDate}
                                                    </Moment>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-md-12'>
                                        <div className='row'>
                                            <div className='col-md-6 col-6'>
                                                {/* <p className='m-0 mt-1 p-0 main_waxflow_text2'><span>Total Appointments: <span className='text-danger'>{item?.appointments?.length}</span></span> , <span>Booked Appointments: <span className='text-success'>{item?.appointments?.length}</span></span></p> */}
                                            </div>
                                            <div className='col-md-6 col-6 text-end mt-1'>
                                                {/* <p className='m-0 p-0 main_waxflow_text2'>  {item?.dateJson[0]?.timeFrom} to {item?.dateJson[0]?.timeTo}  <img className='img-fluid' src='/imagess/rightnew.png' /></p> */}
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>

                        );
                    })}
                </>
                :
                <div className='col-md-12 text-center'>
                    <div className="spinner-border text-danger mt-2" role="status">
                        <span className="visually-hidden">Loading...</span>

                    </div>
                </div>
            }
        </div>
    )
}

export default AllpurchaseorderDetail