import Layout2 from '@/Components/Layout2/Layout2';
import { useRouter } from 'next/router';
import React from 'react'
import { useSelector } from 'react-redux';

function Managelistmobile() {
    const { profile } = useSelector((state: any) => state);
    const router = useRouter();
    const secondaryemail = () => {
      router.push('/userProfile/profile/secondary_mobile_add');
    }
    return (
        <div>
            <div className='col-md-12 background_main_email pb-3 pt-3 '>
                <div className='col-md-12 px-3 ' >
                    <div className='row'>
                        <div className='col-md-6 col-6'>
                            <p className='m-0 p-0 primary_email_label'>Primary mobile</p>
                            <p className='m-0 p-0 primary_email_text pt-2'>{profile?.primaryMobile}</p>
                        </div>
                        <div className='col-md-6 col-6 pt-3  text-end'>
                            {profile?.primaryMobileVerify === false ?
                                <p className='m-0 p-0 icon_red'>Verify Now</p>
                                :
                                <img
                                    src="/assets/Images/verified.png"
                                    alt="verify"
                                    style={{width:"55px", height:"15px"}}
                                />}
                        </div>
                    </div>

                </div>
                <hr className="background_line" />
                <div className='col-md-12 px-3 ' >
                    <div className='row'>
                        <div className='col-md-6 col-6'>
                            <p className='m-0 p-0 primary_email_label'>Secondary mobile</p>
                            <p className='m-0 p-0 primary_email_text pt-2'>{profile?.secondaryMobile?.length === 0 ? "Add secondary mobile." : profile?.secondaryMobile}</p>
                        </div>
                        <div className='col-md-6 col-6 pt-3  text-end'>
                            {profile?.secondaryMobileVerify === false ?

                                <div className='col-md-12 flex_using_for_verify text-end  '>
                                    <p className='m-0 p-0 icon_red' onClick={secondaryemail}>{profile?.secondaryMobile?.length === 0 ? "Add Mobile" : "Verify Now"}</p>
                                </div>

                                :
                                <div className='row'>
                                    <div className='col-md-10 text-end border_right_line pe-1'>
                                        <p className='m-0 p-0 primary_email_label pt-2 universal_cursor' onClick={secondaryemail}><i className="fas fa-edit"></i></p>
                                    </div>
                                    <div className='col-md-2 ps-0'>
                                        <img
                                            // onClick={secondaryemail}
                                            src="/assets/Images/verified.png"
                                            alt="verify"
                                            style={{width:"55px", height:"15px"}}
                                        />
                                    </div>
                                </div>
                            }
                        </div>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default Managelistmobile