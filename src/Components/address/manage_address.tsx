import { Button } from "@/styles/Button.style";
import React from "react";
import { BiChevronDown, BiDotsVertical, BiDotsVerticalRounded, BiSearch } from "react-icons/bi";
import { BsThreeDotsVertical } from "react-icons/bs";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

const ManageAddress = ({
  addresses,
  selectedIndex,
  setSelectedIndex,
  handleEdit,
  setEditAddress,
  handleDelete,
  // showPopUp,
  // setShowPopUp,
}: {
  addresses: any;
  selectedIndex: number;
  setSelectedIndex: any;
  setEditAddress: any;
  handleEdit: any;
  handleDelete: any;
  // showPopUp: any;
  // setShowPopUp: any;
}) => {
  return (
    <div className=" mt-4 margin_bottom_new">
      {/* <div className="d-flex justify-content-end align-items-center mb-5">
        <div
          className="d-flex align-items-center rounded-pill"
          style={{
            backgroundColor: "white",
            border: "1px solid lightgrey",
            padding: "0.5rem 1rem",
            margin: "0 0.6rem",
            width: "30%",
          }}
        >
          <BiSearch />
          <input
            type="text"
            className="border border-0"
            style={{
              marginLeft: "0.5rem",
              outline: "none",
            }}
            placeholder="Search"
          />
        </div>
        <button
          className="btn btn-danger rounded-pill"
          onClick={setEditAddress}
        >
          Add New Address
        </button>
      </div> */}
      {addresses?.length === 0 ? (
        <div className="text-center">
        <h6>No Address Found</h6>
        </div>
      ) : (
        addresses?.map((address: any, index: number) => {
          if (index === selectedIndex) {
            return (
              <div
                className="border_for_all_pages pt-1 px-0 mt-2"
                key={index}
                style={{ cursor: "default" }}
              >
                <div
                  className="row"
                  onClick={(e: any) => setSelectedIndex(index)}
                >
                  <div className="col-md-12 pt-2">
                    <div
                      className="px-3"
                      style={{
                        textAlign: "left",
                      }}
                    >
                      <div className="row">
                        <div className="col-md-7 col-7">
                          <div className="address_label">Address Name</div>
                          <div className="address_label_des pt-2">
                            {address.line1}
                          </div>
                        </div>
                        <div className="col-md-5 col-5 m-auto px-2 text-end">
                          <Dropdown className="d-inline mx-2">
                            <Dropdown.Toggle title={` Drop end `} id="dropdown-autoclose-true">
                              {index === 0 ? <img className="img-fluid" src="/imagess/redicons/editicon.png" /> : <BiDotsVertical className="icon_color_every2" />}

                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                              {/* <Dropdown.Item onClick={(e) => handleEdit(address)} > <span>Edit</span></Dropdown.Item> */}
                              <Dropdown.Item onClick={(e) => handleDelete(address.id)}> <span>Delete</span></Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                          {/* <div>
                      <span
                        onClick={() => setShowPopUp(!showPopUp)}
                        id="dropdownMenuButton"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                       <img className="img-fluid" src="/imagess/redicons/editicon.png" />
                      </span>
                      <div
                        className={`dropdown text-end ${
                          selectedIndex === index && showPopUp ? "show" : ""
                        }`}
                      >
                        <div
                          className={`dropdown-menu ${
                            selectedIndex === index && showPopUp ? "show" : ""
                          }`}
                          aria-labelledby="dropdownMenuButton"
                        >
                          <div className="">
                            <div
                              className="option"
                              onClick={(e) => handleEdit(address)}
                            >
                              <i className="fas fa-edit"></i>
                              <span>Edit</span>
                            </div>
                            <div
                              onClick={(e) => handleDelete(address.id)}
                              className="option"
                            >
                              <i className="fas fa-trash-alt"></i>
                              <span>Delete</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div> */}
                        </div>
                      </div>

                      <hr className="background_line mb-2 mt-2" />
                      <div className="address_label">Flat & Building</div>
                      <div className="address_label_des pt-2">
                        {address.line2 === ""
                          ? "Flat & Building"
                          : address.line2}
                      </div>
                      <hr className="background_line mb-2 mt-1" />
                      <div className="address_label">Street Address</div>
                      <div className="address_label_des pt-2">
                        {address.townCity}
                      </div>
                      <hr className="background_line mb-2 mt-2" />
                      <div className="address_label">Postal Code</div>
                      <div className="address_label_des pt-2">
                        {address.postalCode}
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            );
          } else {
            return (
              <div key={index} style={{ cursor: "default" }}>
                <div
                  className="d-flex align-items-center justify-content-between border_for_all_pages  px-0 mt-3"
                  onClick={(e: any) => setSelectedIndex(index)}
                >
                  <div
                    className="d-flex flex-column px-3"
                    style={{
                      textAlign: "left",
                    }}
                  >
                    <div
                      className="input_font_header pb-1"
                    >
                      Address Name
                    </div>
                    <div className="input_field_text pt-1">  {address.line1}</div>
                  </div>
                  <div className="px-3">
                    <BiChevronDown className="icon_color_every" />
                  </div>
                </div>
              </div>
            );
          }
        })
      )}
    </div>
  );
};

export default ManageAddress;
