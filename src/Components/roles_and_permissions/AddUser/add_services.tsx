import React, { useState } from "react";
import Image from "next/image";
import {
  SearchAllActiveServicesByBusinessId,
  getChildServices,
} from "@/helper";

const AddServices = ({
  goBackHandler,
  listOfServicesFromParent,
}: {
  goBackHandler: any;
  listOfServicesFromParent: any;
}) => {
  /* -------------------------------------------------------------------------- */
  /*                                  VARIABLES                                 */
  /* -------------------------------------------------------------------------- */
  const [enteredValue, setEnteredValue] = useState("");
  const [isChildList, setIsChildList] = useState(false);
  const [allActiveServices, setAllActiveServices] = useState<any>([]);
  const [childServicesList, setChildServicesList] = useState<any>([]);
  const [selectedServices, setSelectedServices] = useState<any>(
    listOfServicesFromParent
  );

  /* -------------------------------------------------------------------------- */
  /*                                  FUNCTIONS                                 */
  /* -------------------------------------------------------------------------- */
  /* ----------------------- Handling Searched Services ----------------------- */
  const handleSearchedElements = (e: any) => {
    e.preventDefault();
    setEnteredValue(e.target.value);
    if (e.target.value.length > 1) {
      SearchAllActiveServicesByBusinessId(
        1, // parseInt(localStorage.getItem("businessId") as string),
        enteredValue
      )
        .then((res) => {
          console.log(res);
          setAllActiveServices(res.result.services);
        })
        .catch((e) => alert(e));
    }
  };

  /* ------------------------ Handling Selected Service ----------------------- */
  const handleSelectedService = (service: any) => {
    if (service.hasChild === true) {
      setIsChildList(true);
      getChildServices(service.serviceId)
        .then((res) => {
          if (res.result.services) {
            setChildServicesList(res.result.services);
          }
        })
        .catch((e) => alert(e));
    } else {
      if (selectedServices.includes(service)) {
        setSelectedServices((prevItem: any) =>
          prevItem.filter((item: any) => item !== service)
        );
      } else {
        setSelectedServices((prevList: any) => [...prevList, service]);
      }
    }
  };

  /* ------------------- Handling from child to parent list ------------------- */
  const handleGoBack = () => {
    setIsChildList(false);
    setChildServicesList([]);
  };

  /* ----------------------------- Remove Service ----------------------------- */
  const handleRemoveService = (service: string) => {
    setSelectedServices((prevList: any) =>
      prevList.filter((item: any) => item !== service)
    );
  };

  /* -------------------- Handling Data in parent Component ------------------- */
  const goBackToParentHandler = () => {
    goBackHandler(selectedServices, true);
  };

  return (
    <>
      <div>Choose Services</div>
      <div className="d-flex justify-content-between my-4 ">
        <label>
          <input
            type="checkbox"
            checked={true}
            onChange={(e) => {
              // setListServices(e.target.checked);
            }}
            id="selectAllServices"
            style={{
              marginRight: "1rem",
            }}
          />
          Select all Services
        </label>
        <div>All Services Selected</div>
      </div>
      <div
        className="rounded"
        style={{
          padding: "0.6rem 1rem",
          backgroundColor: "white",
          border: "1px solid lightgrey",
        }}
      >
        <div className="d-flex flex-wrap">
          {selectedServices.map((service: any) => (
            <>
              <div
                key={service.serviceId}
                className="px-4 py-2 me-4 mb-2 position-relative bg-light rounded d-inline-block"
              >
                {service.serviceName}
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
        <div
          className="rounded"
          style={{
            backgroundColor: "#f9f9f9",
            border: "1px solid lightgrey",
            padding: "0.5rem 1rem",
            margin: "0 0",
            marginTop: "1rem",
            marginRight: "0.6rem",
            width: "100%",
          }}
        >
          <input
            type="text"
            className="border border-0"
            value={enteredValue}
            onChange={handleSearchedElements}
            style={{
              outline: "none",
              border: "none",
              background: "none",
            }}
            placeholder="Laser"
          />
        </div>
        <div className="my-2">
          {isChildList
            ? childServicesList.map((service: any, index: number) => (
                <div key={index}>
                  <label>
                    <input
                      type="checkbox"
                      id={service}
                      checked={selectedServices.includes(service)}
                      onChange={(e) => handleSelectedService(service)}
                      style={{
                        marginRight: "1rem",
                        accentColor: "red",
                      }}
                    />
                    {service.serviceName}
                  </label>
                </div>
              ))
            : allActiveServices.map((service: any, index: number) => (
                <div key={index}>
                  <label>
                    <input
                      type="checkbox"
                      id={service.serviceId}
                      checked={selectedServices.includes(service)}
                      onChange={(e) => handleSelectedService(service)}
                      style={{
                        marginRight: "1rem",
                        accentColor: "red",
                      }}
                    />
                    {service.serviceName}
                  </label>
                </div>
              ))}
        </div>
      </div>
      <button className="btn btn-danger mt-3" onClick={goBackToParentHandler}>
        Save & Continue
      </button>
      {isChildList && (
        <button className="btn btn-danger mt-3 ml-3" onClick={handleGoBack}>
          GoBack
        </button>
      )}
    </>
  );
};
export default AddServices;
