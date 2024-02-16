import Layout2 from '@/Components/Layout2/Layout2'
import { useRouter } from 'next/router'
import React from 'react'

function VoucherAdd() {
    const router = useRouter();
    const nextpage = ( ) =>{
        router.push("/AllVouchers/Voucherslist")
    }
  return (
    <Layout2>
    <div className='col-md-12 margin_bottom_new pt-3'>
        <div className='col-md-12 white_bg_new mt-4 px-4 py-5 '>
            <div className='col-md-12 py-5 text-center'>
                <img className='img-fluid' src='/imagess/hand.png' />
                <p className='m-0 p-0 mt-4 added_text'>£25 Added</p>
                <p className='m-0 p-0 text_success_wallet'>Your Voucher is successfully redeem</p>
                <img className='img-fluid mt-3' src='/imagess/addtowallet.png' />
            </div>
        </div>
        <div className='col-md-12 text-center'>
            <button className='btn btn-danger px-5 mt-4 universal_button_color' onClick={nextpage}> Back to Manage Voucher </button>
        </div>
    </div>
    </Layout2>
  )
}

export default VoucherAdd