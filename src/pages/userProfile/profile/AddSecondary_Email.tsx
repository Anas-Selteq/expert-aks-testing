import React, { useEffect, useState } from 'react';
import SideBar from '../../../Components/components/sidebar';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { enqueueSnackbar } from 'notistack';

function AddSecondary_Email() {

  const [loading, setLoading] = useState(false);
  const [emailValidationError, setEmailValidationError] = useState('');
  const { profile } = useSelector((state: any) => state);
  const [secondaryemailval, setSecondaryemailval] = useState(`${profile?.secondaryEmail ? profile?.secondaryEmail : ""}`);
  const router = useRouter();
  const [JwtRefreshToken, setJwtRefreshToken] = useState<any>("");

  useEffect(() => {
    setJwtRefreshToken(localStorage?.getItem("jwtRefreshToken"));
  }, []);

  const validateEmail = (email: any) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const handleEmailChange = (event: any) => {
    const email = event.target.value;
    setSecondaryemailval(email);
    setEmailValidationError(validateEmail(email) ? '' : 'Invalid email format');
  };

  const isAddButtonDisabled = secondaryemailval === '' || !!emailValidationError;

  const addSecondaryemailfunc = async () => {
    setLoading(true);
    const token = localStorage.getItem('jwtToken');
    const apiUrl = 'https://gateway.findanexpert.net/signup_svc/pv/users/addUserEmails';
    const requestData = {
      userId: profile?.userId,
      text: secondaryemailval,
      type: 2,
      modifiedBy: profile?.userId,
    };

    const headers = {
      'Content-Type': 'application/json',
      Authorization: `${token}`,
    };

    try {
      const response: any = await axios.post(apiUrl, requestData, { headers });
      console.log('Response:', response);
      setLoading(false);
      if (response?.data?.code === 0) {
      ResendEmailSecondaryOtp();
      }
      if(response?.data?.code === 1)
      {
        enqueueSnackbar(`${response?.data?.message}`, { variant: 'error' });
        router.push("/userProfile/profile/manage_email")
      }
    } catch (error) {
      setLoading(false);
      console.error('Error:', error);
      if (JwtRefreshToken) {
        Jwtset()
      }
    }
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

  const ResendEmailSecondaryOtp = async () => {
    const token = localStorage.getItem('jwtToken');
    const apiUrl = 'https://gateway.findanexpert.net/signup_svc/pb/users/resendEmailOtp';
    const requestData = {
      userId: profile?.userId,
      type: 2,
    };

    const headers = {
      'Content-Type': 'application/json',
      Authorization: `${token}`,
    };

    try {
      const response = await axios.post(apiUrl, requestData, { headers });
      console.log('Response:', response);
      router.push('secondaryEmail_verify');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <SideBar activeIndex={0}>
      <div className="col-md-12 mt-4 margin_bottom_new" style={{ height: "80vh" }}>
        <div className="col-md-12 background_main_email p-2">
          <div className="row">
            <div className="col-md-12">
              <p className="m-0 p-0 primary_email_label">Secondary email</p>
              <input
                type="text"
                placeholder="Add Secondary Email"
                className="w-100 input_style"
                onChange={handleEmailChange}
                value={secondaryemailval}
              />

            </div>
          </div>
        </div>
        {emailValidationError && <p className='pt-1' style={{ color: 'red', fontSize: "14px" }}>{emailValidationError}</p>}
        <div className="col-md-12 text-end button_size_fixed ">
          {loading === false ?
            <button className="btn btn-danger universal_button_color px-5" onClick={addSecondaryemailfunc} disabled={isAddButtonDisabled}>
              Add Email
            </button>
            :
            <div className="spinner-border text-danger" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          }
        </div>
      </div>
    </SideBar>
  );
}

export default AddSecondary_Email;

