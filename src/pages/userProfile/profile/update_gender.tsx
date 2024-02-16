import React, { useState } from "react";
import SideBar from "@/Components/components/sidebar";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/styles/Button.style";
import { BiChevronLeft } from "react-icons/bi";
import { updateUserGender } from "@/helper";
import { AUTH_ACTIONS } from "@/Redux/Actions/loginPageAction";
import { useRouter } from "next/router";
import Loader from "@/Components/Loaders/Loader";

const UpdateGender = () => {
  const { profile } = useSelector((state: any) => state);
  const dispatch = useDispatch();
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState(
    profile?.genderId === 1
      ? "Male"
      : profile?.genderId === 2
      ? "Female" : profile?.genderId === 3
      ? "Transgender" : null
  );
  const [isLoading, setIsLoading] = useState(false);

  const handleOptionChange = (event: any) => {
    setSelectedOption(event.target.value);
  };

  const onClickHandler = (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    const selectedGender =
      selectedOption === "Male"
        ? 1
        : selectedOption === "Female"
        ? 2 
        :selectedOption === "Transgender" ?
         3: 0;
    updateUserGender(profile.userId, selectedGender, profile.userId)
      .then((res) => {
        dispatch({
          type: AUTH_ACTIONS.ADD_GENDER,
          payload: {
            genderId: selectedGender,
          },
        });
        router.replace({ pathname: "/userProfile/profile" });
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <SideBar activeIndex={0}>
      <div
        style={{
          width: "100%",
          fontSize: "18px",
          backgroundColor: "white",
          borderTop: "1px solid lightgray",
          borderBottom: "0.7px solid #dcdcdc",
          fontFamily: "Roboto",
          fontWeight: "800",
          fontStyle: "normal",
          letterSpacing: "normal",
          color: "#404145",
          position: "relative",
          zIndex: "1",
        }}
        className="px-4"
      >
        <div className="row py-2">
          <div className="col-md-6">
            {" "}
            <span>Edit Gender</span>
          </div>
        </div>
      </div>
      <div className="margin_bottom_new" style={{height:"100vh"}}>
        <div className="px-3 border_profile mt-4">
          <div className="px-0 border_for_all_pages ">
            <div
              className="d-flex flex-column px-3"
              style={{
                textAlign: "left",
              }}
            >
              <div
               className="input_font_header pb-1"
              >
                Gender
              </div>
              <div>
                <input
                  type="radio"
                  style={{
                    accentColor: "red",
                    marginRight: "0.3rem",
                  }}
                  name="example"
                  id="man"
                  disabled={isLoading}
                  value="Male"
                  checked={selectedOption === "Male"}
                  onChange={handleOptionChange}
                />
               <span className="text_for_all_selection">Male</span> 
                <input
                  type="radio"
                  style={{
                    accentColor: "red",
                    margin: "0 0.3rem 0 2rem",
                  }}
                  name="example"
                  id="woman"
                  disabled={isLoading}
                  value="Female"
                  checked={selectedOption === "Female"}
                  onChange={handleOptionChange}
                />
                <span className="text_for_all_selection">Female</span>
                <input
                  type="radio"
                  style={{
                    accentColor: "red",
                    margin: "0 0.3rem 0 2rem",
                  }}
                  name="example"
                  id="shemale"
                  disabled={isLoading}
                  value="Transgender"
                  checked={selectedOption === "Transgender"}
                  onChange={handleOptionChange}
                />
                <span className="text_for_all_selection">Other</span>
              </div>
            </div>
          </div>
          {isLoading ? (
            <Loader
              status={isLoading}
              style={{
                marginTop: "50%",
                marginLeft: "auto",
                marginRight: "0",
              }}
            />
          ) : (
            <div
              className="d-flex justify-content-end button_size_fixed"
            >
              <button className="btn btn-danger universal_button_color mt-5" onClick={onClickHandler}>
                Save Changes
              </button>
            </div>
          )}
        </div>
      </div>
    </SideBar>
  );
};

export default UpdateGender;
