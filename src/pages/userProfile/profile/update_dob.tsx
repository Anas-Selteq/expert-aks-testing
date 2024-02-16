import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import axios from "axios";
import { useRouter } from "next/router";
import { format } from "date-fns"; // Import format function from date-fns
import SideBar from "@/Components/components/sidebar";
import Moment from "react-moment";

const UpdateDOB = () => {
  const { profile } = useSelector((state: any) => state);
  const [value, onChange] = useState<any>(new Date());
  const [newdateee, setNewdateee] = useState<any>("");
  const [jwtToken, setJwtToken] = useState<any>(null);
  const [activealert, setActivealert] = useState<any>(false);
  const [activealertmsg, setActivealertmsg] = useState<any>("");
  const [JwtRefreshToken, setJwtRefreshToken] = useState<any>("");
  const router = useRouter();

  useEffect(() => {
    setJwtToken(localStorage?.getItem("jwtToken"));
    setJwtRefreshToken(localStorage?.getItem("jwtRefreshToken"));
  }, []);

  useEffect(() => {
    // Update the selected date to account for the time zone offset
    const inputDate = value;
    if (inputDate) {
      const correctedDate = new Date(
        inputDate.getFullYear(),
        inputDate.getMonth(),
        inputDate.getDate()
      );
      const formattedDate = format(correctedDate, "yyyy-MM-dd");
      setNewdateee(formattedDate);
      console.log("Formatted date:", formattedDate);
    } else {
      console.log("Invalid input date.");
    }
  }, [value]);

  const uploadImageprofile = async () => {
    const isToken = jwtToken !== null;

    const headers = {
      Authorization: isToken ? `Bearer ${jwtToken}` : undefined,
      "Content-Type": "application/json",
    };

    try {
      const currentDate = new Date();
      const selectedDate = new Date(newdateee);
      const ageDifference = currentDate.getFullYear() - selectedDate.getFullYear();

      if (ageDifference < 18) {
        setActivealert(true);
        setActivealertmsg("Age should be 18 or above.");
        return;
      }

      const data = {
        userId: profile?.userId,
        dob: newdateee,
        modifiedBy: profile?.userId,
      };

      const response = await axios.post(
        `https://gateway.findanexpert.net/signup_svc/pv/users/addUserDob`,
        data,
        { headers }
      );

      console.log("Upload successful:", response.data);

      if (response.data.code === -1) {
        setActivealert(true);
        setActivealertmsg(response.data.message);
      }

      router.push("/userProfile/profile/");
    } catch (error) {
      console.error("Upload error:", error);
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

  return (
    <SideBar activeIndex={0}>
      <div className="px-3 " style={{ height: "100vh" }}>
        <div className="col-md-12 mt-4 margin_bottom_new">
          <div className="border_for_all_pages">
            <div
              className="d-flex flex-column"
              style={{
                textAlign: "left",
              }}
            >
              <div
                style={{
                  color: "grey",
                  fontSize: "10px",
                }}
              >
                Date of Birth
              </div>
              <div className="input_profile_all_dob">
                {profile?.dob ?
                  <Moment format="DD-MM-YYYY">
                    {profile?.dob}
                  </Moment>
                  :
                  <p className="m-0 p-0">{newdateee.length === 0 ? <>Choose Date of birth</> : newdateee} </p>
                }
              </div>
            </div>

          </div>
          {activealert === true ? <p style={{ fontSize: "12px", color: "red" }}>{activealertmsg}</p> : null}
          <div className="row mt-3">
            <div className="col-md-3"></div>
            <div className="col-md-6">
              <Calendar onChange={onChange} value={value} />
            </div>
            <div className="col-md-3"></div>
          </div>
          <div className="d-flex justify-content-end button_size_fixed2">
            <button className="btn btn-danger universal_button_color" onClick={uploadImageprofile}>
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </SideBar>
  );
};

export default UpdateDOB;