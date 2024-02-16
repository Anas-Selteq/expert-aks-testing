import Layout2 from '@/Components/Layout2/Layout2'
import React, { useState } from 'react'
import Moment from 'react-moment';
import { useSelector } from 'react-redux';
import AllBookingslist from '../userProfile/bookings/AllBookingslist/AllBookingslist';
import AllSalesorderlist from '../userProfile/bookings/AllSalesorderlist/AllSalesorderlist';
import AllpurchaseorderDetail from '../userProfile/bookings/AllpurchaseorderDetail/AllpurchaseorderDetail';

function AllBookingsNew() {
    const [vouchersselect, SetVouchersselect] = useState<any>(1);
    const [GetVouchersData, setGetVouchersData] = useState<any>('');
    const { profile } = useSelector((state: any) => state);
    return (
        <Layout2>
            <div className='col-md-12 mt-4 margin_bottom_new'>
                <p className='m-0 p-0 manage_v_text '>Bookings</p>
                {/* <p className='m-0 p-0 sub_manage_v_text'>Please check your all bookings</p> */}
                <div className='col-md-12  mt-3 mb-5 px-2 '>
                    <div className='col-md-12  '>
                        <div className='row white_bg_new'>
                            <div className='col-md-12  mt-2 '>
                                <div className='d-flex pe-3'>
                                    <p className={`m-0 p-0 universal_cursor ps-md-5 pe-md-5  px-3 pb-2  ${vouchersselect === 1 ? 'vouchers_active14' : 'vouchers_unselected14'}`} onClick={() => SetVouchersselect(1)}>Bookings</p>
                                    &nbsp; <p className='m-0 p-0 vouchers_unselected'> | </p> &nbsp;
                                    <p className={`m-0 p-0 universal_cursor px-md-5 px-3 ${vouchersselect === 0 ? 'vouchers_active14' : 'vouchers_unselected14'}`} onClick={() => SetVouchersselect(0)}>Orders</p>
                                    {/* &nbsp; <p className='m-0 p-0 vouchers_unselected'> | </p> &nbsp;
                                    <p className={`m-0 p-0 universal_cursor px-md-2 px-2 ${vouchersselect === 2 ? 'vouchers_active14' : 'vouchers_unselected14'}`} onClick={() => SetVouchersselect(2)}>Incomplete Orders</p> */}
                                </div>

                            </div>
                            <div className='col-md-6 text-end m-auto'>

                            </div>
                            {/* <div className='col-md-12'>
                                <hr className='m-0 p-0' />
                            </div> */}
                        </div>
                        {vouchersselect === 0 ?
                            <>
                                {/* For Service Vouchers -------------------------------------------------------------------------------------------------------- */}
                                <div className='col-md-12 mt-2 mb-3'>
                                    {/*  */}
                                    <AllSalesorderlist />
                                </div>
                            </> : vouchersselect === 1 ?
                                <>
                                    {/* For All Bookings -------------------------------------------------------------------------------------------------------- */}
                                    <div className='col-md-12 mt-2 mb-3'>
                                        {/*  */}

                                        <AllBookingslist />
                                    </div>
                                </>
                                : vouchersselect === 2 ?
                                    <>
                                        {/* For All Bookings -------------------------------------------------------------------------------------------------------- */}
                                        <div className='col-md-12 mt-2 mb-3'>
                                            {/*  */}
                                            <AllpurchaseorderDetail />
                                        </div>
                                    </>
                                    : null}

                    </div>
                </div>
            </div>
        </Layout2>
    )
}

export default AllBookingsNew