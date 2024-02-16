import Layout2 from '@/Components/Layout2/Layout2'
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import Moment from 'react-moment';
import { useSelector } from 'react-redux';

function Voucherslist() {
    const [vouchersselect, SetVouchersselect] = useState<any>(0);
    const [GetVouchersData, setGetVouchersData] = useState<any>('');
    const { profile } = useSelector((state: any) => state);

    console.log("profile?.externalCustomerId",profile)

    const router = useRouter();

    useEffect(() => {
        const selectedservice: any = localStorage.getItem("selectedService");
        const selectedserviceparse = JSON.parse(selectedservice);
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://gateway.findanexpert.net/discountcode_svc/pb/Voucher/GetActiveVoucherByUserId?id=${profile?.externalCustomerId}`);
                setGetVouchersData(response.data);
                console.log("response.data", response.data?.electronicVouchers)
            } catch (error: any) {
                console.log(error);
            } finally {
                // setLoading(false);
            }
        };

        fetchData();
    }, [profile?.userId, profile?.externalCustomerId]);

    const selectVoucher = (item: any) => {
        console.log("selectedVoucher", item)
        router.push("/AllVouchers/VoucherAdd")

    }

    const viewVoucherDetail = () => {
        router.push("/AllVouchers/Vouchersview")

    }

    const viewhistory = () =>{
        router.push("/AllVouchers/Vouchershistory")
    }


    return (
        <Layout2>
            <div className='col-md-12 mt-4 margin_bottom_new'>
                <p className='m-0 p-0 manage_v_text '>Manage Vouchers</p>
                <p className='m-0 p-0 sub_manage_v_text'>Please check you available vouchers and redeem them.</p>
                <div className='col-md-12 white_bg_new mt-3 mb-5'>
                    <div className='col-md-12  '>
                        <div className='row'>
                            <div className='col-md-6 col-8  mt-3 '>
                                <div className='d-flex px-3'>
                                    <p className={`m-0 p-0 universal_cursor ${vouchersselect === 1 ? 'vouchers_active' : 'vouchers_unselected'}`} onClick={() => SetVouchersselect(1)}>Gift Voucher</p>
                                    &nbsp; <p className='m-0 p-0 vouchers_unselected'> | </p> &nbsp;
                                    <p className={`m-0 p-0 universal_cursor ${vouchersselect === 0 ? 'vouchers_active' : 'vouchers_unselected'}`} onClick={() => SetVouchersselect(0)}>Service Voucher</p>
                                </div>

                            </div>
                            <div className='col-md-6 col-4 text-end m-auto'>
                                <img className='img-fluid universal_cursor' onClick={viewhistory} src='/imagess/history.png' />
                            </div>
                            <div className='col-md-12'>
                                <hr className='m-0 p-0' />
                            </div>
                        </div>
                        {vouchersselect === 0 ?
                            <>
                                {/* For Service Vouchers -------------------------------------------------------------------------------------------------------- */}
                                <div className='row px-3 mt-3'>
                                    {GetVouchersData?.electronicVouchers?.map((item: any, index: any) => {
                                        return (
                                            <div className='col-md-6 col-12 mt-2 mt-md-0 mb-4'>
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
                                                                    </Moment>
                                                                </p>
                                                            </div>
                                                            <div className='col-md-6 text-end'>
                                                                <div className='row'>
                                                                    <div className='col-md-6 text-end'>
                                                                        <img onClick={(e) => viewVoucherDetail()} className='img-fluid' src='/imagess/view.png' />
                                                                    </div>
                                                                    {/* onClick={(e) => selectVoucher(item)} */}
                                                                    <div className='col-md-6'>
                                                                        <img  className='img-fluid' src='/imagess/newrad.png' />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </> : vouchersselect === 1 ?
                                <>
                                    {/* For Gift Vouchers -------------------------------------------------------------------------------------------------------- */}
                                    <div className='row px-3 mt-3'>
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
                                                                            </Moment>
                                                                        </p>
                                                                    </div>
                                                                    <div className='col-md-6 text-end'>
                                                                        <div className='row'>
                                                                            <div className='col-md-6 text-end'>
                                                                                <img onClick={(e) => viewVoucherDetail()} className='img-fluid' src='/imagess/view.png' />
                                                                            </div>
                                                                            {/* selectVoucher(item) */}
                                                                            <div className='col-md-6'>
                                                                                <img  className='img-fluid' src='/imagess/newrad.png' />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                            </div>
                                                        </div>
                                                    </div>
                                                </>

                                            )
                                        })}
                                    </div>
                                </>
                                : null}

                    </div>
                </div>
            </div>
        </Layout2>
    )
}

export default Voucherslist