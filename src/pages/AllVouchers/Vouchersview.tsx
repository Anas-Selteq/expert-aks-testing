import Layout2 from '@/Components/Layout2/Layout2'
import React from 'react'

function Vouchersview() {
    return (
        <Layout2>
            <div className='col-md-12 margin_bottom_new mt-4'>
                <p className='m-0 p-0 manage_v_text '>Voucher Detail</p>
                <p className='m-0 p-0 sub_manage_v_text'>Following is detail of our voucher</p>
                <div className='col-md-12 white_bg_new mt-3 mb-4 px-4 py-2'>
                    <div className='row mt-1'>
                        <div className='col-md-6 col-6'>
                            <div className='row'>
                                <div className='col-md-2'>
                                    <img className='img-fluid' src='/imagess/vv.png' />
                                </div>
                                <div className='col-md-10 pt-1'>
                                    <p className='m-0 p-0 V_new'>Christmas Voucher</p>
                                    <p className='m-0 p-0 pt-1 V_new_sub'>Voucher 15654</p>
                                </div>
                            </div>
                        </div>
                        <div className='col-md-6 col-6   pt-1 text-end'>
                            <p className='m-0 p-0 V_new_active'>Active</p>
                            <p className='m-0 p-0 pt-1 V_new_p'>£56</p>
                        </div>

                    </div>
                    <div className='col-md-12'>
                        <hr className='m-0 p-0 background_line mt-2' />
                    </div>
                    <div className='col-md-12 py-2'>
                        <p className='m-0 p-0 V_new_sub'>Created Date</p>
                        <p className='m-0 p-0 V_new_sub_text'>26th December 2023 at 11:23</p>
                    </div>
                    <div className='col-md-12'>
                        <hr className='m-0 p-0 background_line mt-2' />
                    </div>
                    <div className='col-md-12 py-2'>
                        <p className='m-0 p-0 V_new_sub'>Voucher Type</p>
                        <p className='m-0 p-0 V_new_sub_text'>Services Vouchers</p>
                    </div>
                    <div className='col-md-12'>
                        <hr className='m-0 p-0 background_line mt-2' />
                    </div>
                    <div className='col-md-12 py-2'>
                        <p className='m-0 p-0 V_new_sub'>Assigned From</p>
                        <p className='m-0 p-0 V_new_sub_text'>Emerson Philips</p>
                    </div>
                    <div className='col-md-12'>
                        <hr className='m-0 p-0 background_line mt-2' />
                    </div>
                    <div className='col-md-12 py-2'>
                        <p className='m-0 p-0 V_new_sub'>Assigned To</p>
                        <p className='m-0 p-0 V_new_sub_text'>Jaxson Torff</p>
                    </div>
                    <div className='col-md-12'>
                        <hr className='m-0 p-0 background_line mt-2' />
                    </div>
                    <div className='col-md-12 py-2'>
                        <p className='m-0 p-0 V_new_sub'>Expiry Date</p>
                        <p className='m-0 p-0 V_new_sub_text'>26th December 2023 at 11:23</p>
                    </div>
                    <div className='col-md-12'>
                        <hr className='m-0 p-0 background_line mt-2' />
                    </div>
                    <div className='col-md-12 py-2'>
                        <p className='m-0 p-0 V_new_sub'>Services</p>
                        <div className='d-flex mt-2'>
                            <img className='img-fluid' src='/imagess/simage.png' />
                            <p className='m-0 p-0 V_new_sub_text ps-2 pt-1'>Car Wash</p>
                        </div>
                        <div className='d-flex mt-2'>
                            <img className='img-fluid' src='/imagess/simage.png' />
                            <p className='m-0 p-0 V_new_sub_text ps-2 pt-1'>Men Tailoring</p>
                        </div>
                        <div className='d-flex mt-2'>
                            <img className='img-fluid' src='/imagess/simage.png' />
                            <p className='m-0 p-0 V_new_sub_text ps-2 pt-1'>Nails Polish Remove</p>
                        </div>
                        <div className='d-flex mt-2'>
                            <img className='img-fluid' src='/imagess/simage.png' />
                            <p className='m-0 p-0 V_new_sub_text ps-2 pt-1'>Nails Polish Remove</p>
                        </div>
                    </div>
                </div>
                <div className='col-md-12 text-center mb-5'>
                    <button className='btn btn-danger px-5 universal_button_color width_button_radeem' > Radeem </button>
                </div>
            </div>
        </Layout2>
    )
}

export default Vouchersview