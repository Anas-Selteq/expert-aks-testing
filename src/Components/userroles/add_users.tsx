import { Button } from "@/styles/Button.style";
import Link from "next/link";
import React from "react";
import {
  BiChevronDown,
  BiChevronUp,
  BiSpreadsheet,
  BiUser,
} from "react-icons/bi";

const AddUsersDetails = ({
  showPermissions,
  setShowPermissions,
  rolesList,
  createNewRoleHandler,
  servicesHandler,
  isAgreeTerms,
  setIsAgreeTerms,
  listOfServices,
  isSelectedAllServices,
}: {
  showPermissions: any;
  setShowPermissions: any;
  rolesList: any;
  createNewRoleHandler: any;
  servicesHandler: any;
  isAgreeTerms: any;
  setIsAgreeTerms: any;
  listOfServices: any;
  isSelectedAllServices: any;
}) => {
  return (
    <div className="mb-5 pb-5 ">
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
            <span>Add User</span>
          </div>
        </div>
      </div>
      <div className="mx-md-5  margin_bottom_new mt-4 mb-5">
        <div className="col-md-12">
        <div className="row">
          <div className="col-md-6">
          <div className="rounded outline_of_input">
            <div
              className="label_address_font_pixl"
            >
              First Name
            </div>
            <input
              type="text"
              className="border border-0 font_for_address_inputs"
             
              placeholder="Enter First Name"
            />
          </div>
          </div>
          <div className="col-md-6 mt-md-0 mt-3">
          <div className="rounded outline_of_input">
            <div
             className="label_address_font_pixl"
            >
              Last Name
            </div>
            <input
              type="text"
              className="border border-0 font_for_address_inputs"
              placeholder="Enter Last Name"
            />
          </div>
          </div>
        </div>
        </div>
        <div className="col-md-12">
        <div className="rounded outline_of_input mt-3">
          <div
           className="label_address_font_pixl"
          >
            User Email or ID
          </div>
          <input
            type="text"
            className="border border-0 font_for_address_inputs"
            placeholder="Enter Email or ID"
          />
        </div>
        </div>
        <div>
          <div className="heading_services pt-3 pb-3">
            <img
              className="img-fluid font_inner_icon_services"
              src="/svgicons/person.svg"
            />
            &nbsp;
            <span>Services</span>
          </div>
          <div className="para_text_services">
            Dear User if you want to select multiple service so you can click on
            select service.
          </div>
          <div
            className="rounded services_drop_down" 
            onClick={servicesHandler}
          >
            <div className="d-flex justify-content-between">
              <div
                style={{
                  fontSize: "1rem",
                  color: "red",
                }}
              >
                Services Selected
              </div>
              <div className="font_size_selected_ser pt-1">
                {isSelectedAllServices ? "All" : listOfServices.length}
                <BiChevronDown />
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="col-md-12">
            <div className="row">
              <div className="col-md-6 col-6">
            <div className="heading_services">
              <img
                className="img-fluid new_icon_role"
                src="/svgicons/person.svg"
              /> <span>Role</span>
            </div>
            </div>
            <div className="col-md-6 col-6">
              <div className="col-md-12 text-end">
              <p className="role_add_new" onClick={createNewRoleHandler}> + Add New Role</p>
              </div>
            </div>
            </div>
          </div>
          <div
          className="row"
            style={{
              width: "100%",
            }}
          >
            {rolesList.map((role: any, index: number) => (
              <div className="col-md-3 col-12">
              <label
                key={index}
                className="label_text_add_services"
              >
                <input
                   className="check_services_box"
                  type="checkbox"
                  checked={role.checked}
                  id="admin-checkbox"
                />&nbsp;&nbsp;
                <span className="check_text">{role.title}</span>
              </label>
              </div>
            ))}
          </div>
          <div
           className="permission_text mt-3"
            onClick={() => setShowPermissions(!showPermissions)}
          >
            See permissions{" "}
            {showPermissions ? <BiChevronUp /> : <BiChevronDown />}
          </div>
          {showPermissions ? (
            <>
              <div
                className="Permission_new pt-3 pb-2"
              >
              <img
                className="img-fluid font_inner_icon_services"
                src="/svgicons/person.svg"
              /> 
               &nbsp; Permissions
              </div>
              <div className="col-md-12 px-1">
              <ul>
                <li className="setting_ul_text_font">Service Booking Permission</li>
                <li className="setting_ul_text_font">Service Edit Permission</li>
                <li className="setting_ul_text_font">Service Delete Permission</li>
                <li className="setting_ul_text_font">Permission 4</li>
                <li className="setting_ul_text_font">New Permission 5</li>
              </ul>
              </div>
            </>
          ) : null}
          <div
          className="Allow_text"
          >
            You are Allowing the below user to access your account to perform
            action on your behalf
          </div>
          <label>
            <input
              className="form-check-input check_padding "
              type="checkbox"
              id="admin-checkbox"
              checked={isAgreeTerms}
              onChange={setIsAgreeTerms}
            />
            &nbsp;&nbsp;
            <span className="i_agree_text">
            I agree to the <b>Terms & Conditions of Services</b></span>
          </label>
          {isAgreeTerms ? (
            <div  className="col-md-12 text-end mt-md-0 mt-3" >
              <Link href="/userProfile/user">
              <button className="btn btn-danger px-5 btn-sm">
              <b>Add User</b>
            </button>
            </Link>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
export default AddUsersDetails;
