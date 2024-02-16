import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { updateUserGender } from "@/helper";
import { AUTH_ACTIONS } from "@/Redux/Actions/loginPageAction";
import { useRouter } from "next/router";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

function BasicInfoname() {
  const { profile } = useSelector((state: any) => state);
  const dispatch = useDispatch();
  const [profileData, setprofileData] = useState({ ...profile });
  const router = useRouter();
  const query = router.query || {};
  const { userId, priamryMobile, recreatePassword } = query || {};

  const [selectedOption, setSelectedOption] = useState<any>(1003);

  const UpdateNamesBasicProfile = (e: any) => {
    e.preventDefault();
    updateUserGender(profile.userId, Number(selectedOption), profile.userId)
      .then((res:any) => {
        console.log("------------ res ---------------");
        console.log(res);
        console.log("------------ res ---------------");
        dispatch({
          type: AUTH_ACTIONS.ADD_GENDER,
          payload: {
            genderId: Number(selectedOption),
          },
        });
        router.push({ pathname: "/profile", query: { ...query } });
      })
      .catch((err:any) => {
        console.log("------- error ----------");
        console.log(err);
        console.log("------- error ----------");
      });
  };

  const handleChange = (e: any) => {
    const { type, name, value, checked } = e.target;
    setprofileData({
      ...profileData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  console.log("......................", selectedOption);

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
              <p>User Gender </p>

              <form onSubmit={(e) => UpdateNamesBasicProfile(e)}>
                <div className="form-group">
                  <select
                    value={selectedOption}
                    onChange={(e) => setSelectedOption(e.target.value)}
                    className="form-control"
                    id="exampleFormControlSelect1"
                  >
                    <option value="1003">Male</option>
                    <option value="1004">Femail</option>
                    <option value="1005">Other</option>
                  </select>
                </div>

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
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BasicInfoname;
