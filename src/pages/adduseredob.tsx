import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { updateUserDOB } from "@/helper";
import { AUTH_ACTIONS } from "@/Redux/Actions/loginPageAction";
import { useRouter } from "next/router";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import AddEmail from "./auth/add_email";

function BasicInfoname() {
  const { profile } = useSelector((state: any) => state);
  const dispatch = useDispatch();
  const [profileData, setprofileData] = useState({ ...profile });
  const router = useRouter();
  const query = router.query || {};
  const { userId, priamryMobile, recreatePassword } = query || {};
  const [isVerified, setIsVerified] = useState(false);

  const [dateofbirth, setDateofbirth] = useState("");

  const UpdateNamesBasicProfile = (e: any) => {
    e.preventDefault();
    updateUserDOB(profile.userId, dateofbirth, profile.userId)
      .then((res) => {
        console.log("------------ res ---------------");
        console.log(res);
        console.log("------------ res ---------------");
        dispatch({
          type: AUTH_ACTIONS.ADD_DOB,
          payload: {
            dob: dateofbirth,
          },
        });
        router.push({ pathname: "/profile", query: { ...query } });
      })
      .catch((err) => {
        console.log("------- error ----------");
        console.log(err);
        console.log("------- error ----------");
      });
  };

  // const handleChange = (e: any) => {
  //   const { type, name, value, checked, dob } = e.target;
  //   console.log("name, type, dob", type, name, value);
  //   setprofileData({
  //     ...profileData,
  //     [name]: type === "checkbox" ? checked : value,
  //   });
  // };

  const handleDateChange = (e: any) => {
    setDateofbirth(e.target.value);
    verifyAge(e.target.value);
  };

  const verifyAge = (inputDate: any) => {
    const today: any = new Date();
    const selectedDate: any = new Date(inputDate);
    const ageDiff = today - selectedDate;
    const ageDate = new Date(ageDiff);
    const age = Math.abs(ageDate.getUTCFullYear() - 1970);

    if (age >= 18) {
      setIsVerified(true);
    } else {
      setIsVerified(false);
    }
  };

  console.log("=======================>profileData", dateofbirth);
  return (
    <div className="col-md-12  bg-white height_of_edit_screens">
      <div className="container total_height_dashboard mt-1 pt-4 pb-5">
        <div className="row">
          {/* Sidenavigation code  */}
          <div className="col-md-3 ">
            <div className="col-md-12 pr-5">
              <div className="col-md-12 background_color_sidebar px-4 py-2">
                <img
                  className="img-fluid image_icon_width"
                  src="../assets/images/userwhite.png"
                />{" "}
                Profile
              </div>
            </div>
          </div>
          <div className="col-md-9">
            <div
              className="col-md-12 border_profile px-5  pb-4 py-4"
              style={{ borderRadius: "8px" }}
            >
              <p>User Date of Birth </p>
              <form onSubmit={(e) => UpdateNamesBasicProfile(e)}>
                <div className="col-md-12">
                  <TextField
                    id="outlined-basic"
                    type="date"
                    variant="outlined"
                    sx={{ width: "100%", borderRadius: "8px" }}
                    value={dateofbirth}
                    onChange={(e) => handleDateChange(e)}
                    name="dob"
                  />
                  {isVerified ? (
                    <h6 className="pt-2" style={{ color: "green" }}>
                      Age verification is successfull{" "}
                    </h6>
                  ) : (
                    <h6 className="pt-2" style={{ color: "red" }}>
                      You are under age minimum age limit is 18+
                    </h6>
                  )}
                  {isVerified ? (
                    <div className="col-md-12 text-end py-4">
                      <button
                        type="submit"
                        className="btn btn-danger"
                        style={{ backgroundColor: "#DB0406" }}
                      >
                        {" "}
                        Save & Continue{" "}
                      </button>
                    </div>
                  ) : (
                    <div className="col-md-12 text-end py-4">
                      <button
                        disabled
                        type="submit"
                        className="btn btn-danger"
                        style={{
                          backgroundColor: "gray",
                          border: "1px solid gray",
                        }}
                      >
                        {" "}
                        Save & Continue{" "}
                      </button>
                    </div>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BasicInfoname;
