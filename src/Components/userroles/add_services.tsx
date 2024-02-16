import { Button } from "@/styles/Button.style";
import React, { useState } from "react";
import Image from "next/image";

const checkboxList = [
  "Laser Hair Removal",
  "Laser Teeth Whitening",
  "Laser Hair Whitening",
  "Electrical",
  "Plumbing",
  "Barber",
  "Baby Sitter",
  "Manicure Pedicure",
];

const AddServices = ({
  goBackHandler,
  listOfServicesFromParent,
}: {
  goBackHandler: any;
  listOfServicesFromParent: any;
}) => {
  const [listOfServices, setListOfServices] = useState<string[]>(
    listOfServicesFromParent
  );
  const [isSelectedAllServices, setIsSelectedAllServices] = useState(
    listOfServicesFromParent.length === checkboxList.length ? true : false
  );

  /* -------------------------------------------------------------------------- */
  /*                             Select All Services                            */
  /* -------------------------------------------------------------------------- */
  const setListServices = (data: any) => {
    if (!data) {
      setListOfServices([]);
    } else {
      setListOfServices(checkboxList);
    }
    setIsSelectedAllServices(data);
  };

  /* -------------------------------------------------------------------------- */
  /*                               Handle Checkbox                              */
  /* -------------------------------------------------------------------------- */
  const handleCheckboxChange = (service: string) => {
    console.log(service);
    if (listOfServices.includes(service)) {
      setListOfServices((prevItem: any) =>
        prevItem.filter((item: any) => item !== service)
      );
      setIsSelectedAllServices(false);
    } else {
      setListOfServices((prevList: any) => [...prevList, service]);
      if (listOfServices.length === checkboxList.length - 1) {
        setIsSelectedAllServices(true);
      } else {
        setIsSelectedAllServices(false);
      }
    }
  };

  /* -------------------------------------------------------------------------- */
  /*                               Remove Service                               */
  /* -------------------------------------------------------------------------- */
  const handleRemoveService = (service: string) => {
    setListOfServices((prevList: any) =>
      prevList.filter((item: any) => item !== service)
    );
    setIsSelectedAllServices(false);
  };

  const goBackToParentHandler = () => {
    goBackHandler(listOfServices, isSelectedAllServices);
  };

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
            <span>Choose Services</span>
          </div>
        </div>
      </div>
      <div className="col-md-12 margin_bottom_new margin_set_bottom">
        <div className="d-flex justify-content-between py-3">
          <label className="label_text_add_services">
            <input
              type="checkbox"
              checked={isSelectedAllServices}
              onChange={(e) => {
                setListServices(e.target.checked);
              }}
              id="selectAllServices"
              style={{
                marginRight: "8px",
                accentColor: "red",
              }}
            />
            Select all Services
          </label>
          <div className="label_text_add_services">
            {listOfServices.length} Services Selected
          </div>
        </div>
        <div className="rounded selection_css">
          <div className="d-flex flex-wrap mt-2">
            {listOfServices.map((service: any) => (
              <>
                <div
                  key={service}
                  className="px-4 py-2 me-md-4  position-relative bg-white border_of_selected_services rounded d-inline-block"
                >
                  {service}
                  <Image
                    alt="cross"
                    src="/assets/appointment/cross.png"
                    className="position-absolute"
                    onClick={(e) => {
                      handleRemoveService(service);
                    }}
                    style={{
                      top: "6%",
                      right: "2%",
                      cursor: "pointer",
                    }}
                    height={13.34}
                    width={13.34}
                  />
                </div>
              </>
            ))}
          </div>
          <div className="px-2 px-md-0">
          <div
            className="rounded"
            style={{
              backgroundColor: "#F9F9F9",
              border: "1px solid #F9F9F9",
              padding: "0.5rem 1rem",
              margin: "0 0",
              marginTop: "1rem",
              marginRight: "0.6rem",
              width: "100%",
            }}
          >
            <input
              type="text"
              className="border border-0 form-control form-control-sm input_search_selected_service" 
              style={{
                outline: "none",
              }}
              placeholder="Laser"
            />
          </div>
          <div className="my-2">
            {checkboxList.map((check, index) => (
              <div key={index}>
                <label className="label_text_add_services">
                  <input
                    type="checkbox"
                    id={check}
                    checked={listOfServices.includes(check)}
                    onChange={(e) => {
                      handleCheckboxChange(check);
                    }}
                    style={{
                      marginRight: "8px",
                      accentColor: "red",
                    }}
                  />
                  {check}
                </label>
              </div>
            ))}
          </div>
          </div>
        </div>
          <div className="col-md-12 text-end mt-5 pt-5">
        <button className="btn btn-danger mt-3 " onClick={goBackToParentHandler}>
          Save & Continue
        </button>
        </div>
      </div>
    </>
  );
};
export default AddServices;
