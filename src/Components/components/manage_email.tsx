import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react'
import { useSelector } from 'react-redux';

function manage_email() {
  const { profile } = useSelector((state: any) => state);
  const router = useRouter();
  const secondaryemail = () => {
    router.push('/userProfile/profile/AddSecondary_Email');
  }
  return (
    <div className='col-md-12 background_main_email pb-3 pt-3 '>
      <div className='col-md-12 px-3 ' >
        <div className='row'>
          <div className='col-md-6 col-6'>
            <p className='m-0 p-0 primary_email_label'>Primary email</p>
            <p className='m-0 p-0 primary_email_text pt-2'>{profile?.primaryEmail}</p>
          </div>
          <div className='col-md-6 col-6 pt-3  text-end'>
            {profile?.primaryEmailVerify === false ?
              <p className='m-0 p-0 icon_red'>Verify Now</p>
              :
              <Image
                src="/assets/Images/verified.png"
                alt="verify"
                height={15}
                width={55}
              />}
          </div>
        </div>

      </div>
      <hr className="background_line" />
      <div className='col-md-12 px-3 ' >
        <div className='row'>
          <div className='col-md-6 col-6'>
            <p className='m-0 p-0 primary_email_label'>Secondary email</p>
            <p className='m-0 p-0 primary_email_text pt-2'>{profile?.secondaryEmail.length === 0 ? "Add secondary email" : profile?.secondaryEmail}</p>
          </div>
          <div className='col-md-6 col-6 pt-3  text-end'>
            {profile?.secondaryEmailVerify === false ?

              <div className='col-md-12 flex_using_for_verify text-end  '>
                <p className='m-0 p-0 icon_red' onClick={secondaryemail}>{profile?.secondaryEmail.length === 0 ? "Add Email" : "Verify Now"}</p>
              </div>

              :
              <div className='row'>
                <div className='col-md-10 text-end border_right_line pe-1'>
                  <p className='m-0 p-0 primary_email_label pt-2 universal_cursor' onClick={secondaryemail}><i className="fas fa-edit"></i></p>
                </div>
                <div className='col-md-2 ps-0'>
                  <Image
                    // onClick={secondaryemail}
                    src="/assets/Images/verified.png"
                    alt="verify"
                    height={15}
                    width={55}
                  />
                </div>
              </div>
            }
          </div>
        </div>

      </div>
    </div>
  )
}

export default manage_email