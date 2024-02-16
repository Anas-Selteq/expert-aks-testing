import React from "react";

function Justforyou2(data: any) {
  console.log("justforyou", data?.data);
  return (
    <div>
      <div className="col-md-12">
        <p className="m-0 pb-3 heading_landing_page">Products for Youu</p>
        <div className="col-md-12 background_banner_2">
          <div className="row">
            <div className="col-md-6 text-center">
              <img className="img-fluid" src="/imagess/ggg.png" />
            </div>
            <div className="col-md-6 m-auto">
              <p className="m-0 p-0 big_offers_text1">
                UPTO
                <br /> 50% OFF
              </p>
              <button className="btn btn-light mt-5 py-2 px-4">
                {" "}
                BOOK NOW{" "}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Justforyou2;
