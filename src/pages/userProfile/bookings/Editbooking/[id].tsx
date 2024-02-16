import React, { useEffect, useState } from "react";
import SideBar from "@/Components/components/sidebar";
import { useRouter } from "next/router";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import axios from "axios";
import { getTimeSlots, updatePurchaseOrder } from "@/helper";

function Editbooking() {
  const [selectedDay, setSelectedDay] = useState<any>("");
  const [slots, setSlots] = useState<any>("");
  const [value, onChange] = useState<any>(new Date());
  const [providerIdd, setProviderId] = useState<any>(null);
  const [addresss, setAddress] = useState<string>('');

  // this gets the id from the params ----------------------
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const providerId = localStorage.getItem("providerArray");
    setProviderId(providerId);
    console.log("log>>>>>>>", providerId);
    const storedApiResponseJSON = localStorage.getItem("selected_address");
    if (storedApiResponseJSON) {
    const modifiedString = storedApiResponseJSON.replace(/"/g, '');
    setAddress(modifiedString)
    }
  
  }, []);

  // api hits first and get the slots --------------------------------------
  const handleCalendarChange = async (selectedDate: any) => {
    onChange(selectedDate);
    setSelectedDay(selectedDate);
    const formattedDate = formatDate(selectedDate);
    const data = {
      date: formattedDate,
      slotDuration: 15,
      providerId: JSON.parse(providerIdd),
      page: 1,
      pageSize: 2,
    };
    console.log("data--->",data)
    getTimeSlots(data)
      .then((res) => {
        setSlots(res?.result);
      })
      .catch((e) => alert(e));
  };

  const formatDate = (dateString: any) => {
    const date = new Date(dateString);
    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
    return formattedDate;
  };

  // spi hits secondly when we have to update the bookings time --------------------------------------
  const editlotbooking = async (timeFrom: any, timeTo: any) => {
    const formattedDate = formatDate(selectedDay);
    const data = {
      purchaseOrderId: id,
      transectionId: "",
      countryId: 0,
      bookingDate: formattedDate,
      timeFrom: timeFrom,
      timeTo: timeTo,
    };
    updatePurchaseOrder(data)
      .then((res) => {
        alert("Edited Please Go Back to Booking page");
        return;
        window.location.href = "/AllBookingsNew";
      })
      .catch((e) => alert(e));
  };

  console.log("proider list", slots);

  return (
    <SideBar activeIndex={3}>
      <div
        className="col-md-12 "
        style={{ paddingLeft: "5%", paddingRight: "5%", paddingTop: "2%", marginBottom: "200%" }}
      >
        <div
          className="col-md-12 bg-white p-3"
          style={{ borderRadius: "8px", border: "1px solid lightgray" }}
        >
          <div className="row">
            <div className="col-md-1 col-4 text-center">
              <img
                className="img-fluid"
                src="/imagess/london.png"
              />
            </div>
            <div className="col-md-11 col-8 pt-1 px-0 m-auto">
              <p className="m-0 pb-2 Sunspots_frankle">
                <b>Laser Hair Removal</b>
              </p>
              <img className="img-fluid width_add_buttons" src="/imagess/add.png" />
              {/* <span className="btn btn-danger btn-sm button_fiz">
                <img
                  className="img-fluid img_set"
                  src="../images/editbooking/minus.png"
                />
              </span>{" "}
              1{" "}
              <span className="btn btn-danger btn-sm button_fiz1">
                <img
                  className="img-fluid img_set"
                  src="../images/editbooking/plus.png"
                />
              </span> */}
            </div>
          </div>
          <div className="px-3 pt-3 pb-1">
            <hr className="m-0 " />
          </div>
          <div className="col-md-12 px-3">
            <label className="label_font_size">Address</label>
            <p className="m-0 p-0">
              <img
                className="img-fluid"
                src="/imagess/location.png"
              />{" "}
              <span className="font_sub_text">{addresss}</span>
            </p>
          </div>
          <div className="px-3 pt-3 pb-1">
            <hr className="m-0 " />
          </div>
          {/* <div className="col-md-12 px-3">
            <label className="label_font_size">Notes</label>
            <p className="m-0 p-0">
            <img
                className="img-fluid"
                src="/imagess/check.png"
              />{" "}
              <span className="font_sub_text">10 Notes</span>
            </p>
          </div>
          <div className="px-3 pt-3 pb-1">
            <hr className="m-0 " />
          </div> */}
          {/* <div className="col-md-12 px-3">
            <label className="label_font_size">Question Answers</label>
            <p className="m-0 p-0">
            <img
                className="img-fluid"
                src="/imagess/check.png"
              />{" "}
              <span className="font_sub_text">Click on View</span>
            </p>
          </div> */}
        </div>
        <div className="col-md-12 pt-3">
          <div className="row">
            <div className="col-md-6 ">
              <Calendar onChange={handleCalendarChange} value={value} />
            </div>
            <div className="col-md-6 mt-md-0 mt-3">
              <div className="col-md-12 border_for_all_pages p-3 new_height" id="style-2">
                <h3 className="px-3">Slots</h3>
                {slots?.providerList?.length === 0 ? (
                  <h6 className="px-3">We are sorry no slots avaliable</h6>
                ) : (
                  <>
                    <div className="row">
                      {slots?.providerList?.map((item: any, index: any) => {
                        console.log("itemmm<><><><><><", item);
                        return (
                          <div key={index} className="col-md-6">
                            <button
                              className="btn btn-danger button_color px-5 mx-2"
                              onClick={(e) => {
                                e.preventDefault();
                                editlotbooking(item.from, item.endTo);
                              }}
                            >
                              <b>from :</b> {item.from}&nbsp; <b>End To:</b>{" "}
                              {item.endTo}
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* 
       {formattedDate} */}
      </div>
    </SideBar>
  );
}

export default Editbooking;
