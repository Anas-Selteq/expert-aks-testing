import { Button } from "@/styles/Button.style";
import React, { useState } from "react";
import { BiHelpCircle } from "react-icons/bi";

const bookingList = ["Create", "Edit", "Cancel"];

const legalList = [
  "Personal Documents",
  "Financial Documents",
  "Payments",
  "Pictures",
];

const AddNewRole = ({ goBackHandler }: { goBackHandler: any }) => {
  const [enterNewRole, setEnterNewRole] = useState("");
  const [listOfBookings, setListOfBookings] = useState<string[]>([]);
  const [listOfLegal, setListOfLegal] = useState<string[]>([]);

  const bookingHandler = (booking: any) => {
    if (listOfBookings.includes(booking)) {
      setListOfBookings((prevList: any) =>
        prevList.filter((item: any) => item !== booking)
      );
    } else {
      setListOfBookings((prevList: any) => [...prevList, booking]);
    }
  };

  const legalHandler = (legal: any) => {
    if (listOfLegal.includes(legal)) {
      setListOfLegal((prevList: any) =>
        prevList.filter((item: any) => item !== legal)
      );
    } else {
      setListOfLegal((prevList: any) => [...prevList, legal]);
    }
  };

  const goBackToParentHandler = () => {
    goBackHandler(enterNewRole,listOfBookings,listOfLegal);
  }

  return (
    <>
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
            <span>Add New Role</span>
          </div>
        </div>
      </div>
      <div className="margin_bottom_new margin_set_bottom">
      <div
       className="rounded outline_of_input mt-4"
      >
        <div
         className="label_address_font_pixl"
        >
          New Role
        </div>
        <input
          type="text"
          className="border border-0 font_for_address_inputs"
          value={enterNewRole}
          onChange={(e) => setEnterNewRole(e.target.value)}
          style={{
            outline: "none",
            width: "100%",
          }}
          placeholder="Enter New Role"
        />
      </div>
      <div
        style={{
          color: "#aaa",
          margin: "1rem 0 1rem 0",
          fontSize: "14px"
        }}
      >
        <BiHelpCircle /> Permissions
      </div>
      <div
        className="rounded outline_of_input1 px-3" 
       
      >
        <div
          style={{
            color: "grey",
          }}
        >
          Bookings
        </div>
        {bookingList.map((booking: any, index: any) => (
          <div
            key={index}
            className="mt-3"
            onClick={() => bookingHandler(booking)}
          >
            <label>
              <input
                type="checkbox"
                id={booking}
                style={{
                  marginRight: "0.5rem",
                  accentColor: "red",
                }}
              />
           <span className="label_text_add_services">{booking}</span>   
            </label>
          </div>
        ))}
      </div>
      <div
        className="rounded outline_of_input1 mt-3 px-3"
      >
        <div
          style={{
            color: "grey",
          }}
        >
          Legal (User will be able to deal with)
        </div>
        {legalList.map((legal: any, index: any) => (
          <div key={index} className="mt-3" onClick={() => legalHandler(legal)}>
            <label>
              <input
                type="checkbox"
                id={legal}
                style={{
                  marginRight: "0.5rem",
                  accentColor: "red",
                }}
              />
             <span className="label_text_add_services">{legal}</span> 
            </label>
          </div>
        ))}
      </div>
      <div className="col-md-12 text-end mt-3"> 
      <button className="btn btn-danger mt-3" onClick={goBackToParentHandler}>
        Create New Role
      </button>
      </div>
      </div>
    </>
  );
};
export default AddNewRole;
