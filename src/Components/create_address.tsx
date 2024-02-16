import React, { useState } from "react";
import img1 from "../public/images/img3.png";
import Image from "next/image";
import { AiOutlineRight } from "react-icons/ai";

const Createaddress = () => {
  const [address, setAddress] = useState({
    line1: "",
    line2: "",
    townCity: "",
    postalCode: "",
    state: "",
    countryId: 0,
    latitude: 0,
    longitude: 0,
    addressNote: "",
    isResidentialAddress: true,
    radius: 0,
    addressType: 0,
  });

  const handleChange = (e: any) => {
    setAddress({
      ...address,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(address);
    // TODO: Send the address object to the API endpoint
  };

  return (
    <>
      <div className="container">
        <div className="row d-flex justify-content-between">
          <div className="col-md-3">
            <div className="card card-border">side bar</div>
          </div>
          <div className="col-md-9">
            <div className="card p-4">
              <div className="row d-flex justify-content-between">
                <div className="col-md-9">
                  <h4 className="create-address">Create Address</h4>
                  <p className="address-detail">
                    Your home and work addresses are used to personalize your
                    experiences across Expert Services, like showing search
                    results near your home, directions to work in Maps, and for
                    more relevant ads. You can remove them any time.
                  </p>
                  <a href="" className="Learn-more mt-5">
                    Learn more
                    <AiOutlineRight />
                  </a>
                </div>
                <div className="col-md-3">
                  <Image
                    src="/assets/Images/img3.png"
                    height={200}
                    width={200}
                    alt="create account"
                    className="rounded-circle mx-auto d-block "
                  />
                </div>
              </div>
            </div>
            <div className="card p-4 mt-4">
              <div className="row d-flex justify-content-around">
                <form action="" onSubmit={handleSubmit}>
                  <div className="col-md-12">
                    <div className="input-group input-icons">
                      <input
                        type="text"
                        required
                        name="addressName"
                        value={address.line1}
                        onChange={handleChange}
                      />
                      <label htmlFor="">Address</label>
                    </div>
                  </div>
                  <div className="row p-0">
                    <div className="col-md-12">
                      <div className="input-group">
                        <input
                          type="text"
                          required
                          name="townCity"
                          value={address.townCity}
                          onChange={handleChange}
                        />
                        <label htmlFor="">Address Name</label>
                      </div>
                    </div>
                  </div>
                  <div className="row p-0">
                    <div className="col-md-6">
                      <div className="input-group">
                        <input
                          type="text"
                          required
                          name="line1"
                          value={address.line1}
                          onChange={handleChange}
                        />
                        <label htmlFor="">Flat & Building Number</label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="input-group">
                        <input
                          type="text"
                          required
                          name="line2"
                          value={address.line2}
                          onChange={handleChange}
                        />
                        <label htmlFor="">Street Address</label>
                      </div>
                    </div>
                  </div>
                  <div className="row p-0">
                    <div className="col-md-6">
                      <div className="input-group">
                        <input
                          type="text"
                          required
                          name="townCity"
                          value={address.townCity}
                          onChange={handleChange}
                        />
                        <label htmlFor="">City</label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="input-group">
                        <input
                          type="text"
                          required
                          name="postalCode"
                          value={address.postalCode}
                          onChange={handleChange}
                        />
                        <label htmlFor="">Postal Code</label>
                      </div>
                    </div>
                  </div>
                  <div className="row p-0">
                    <div className="col-md-12">
                      <div className="input-group">
                        <input
                          type="text"
                          required
                          name="state"
                          value={address.state}
                          onChange={handleChange}
                        />
                        <label htmlFor="">State</label>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="input-group">
                      <textarea
                        required
                        className="note-section"
                        name="addressNote"
                        value={address.addressNote}
                        onChange={handleChange}
                      />
                      <label htmlFor="">Address Note (Optional)</label>
                    </div>
                  </div>
                  <div className="button-row">
                    <button className="button1">Cancel</button>
                    <button className="button2">Save</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Createaddress;
