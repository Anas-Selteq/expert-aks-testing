import React, { useState } from "react";
import Image from "next/image";
import { BsThreeDotsVertical } from "react-icons/bs";

interface CreditCardProps {
  defaultBtn: boolean;
  cardProvider: string;
  lastFourDigits: string;
  expireMonth: string;
  expireYear: string;
  onDeleteClickHandler: any;
  paymentMethodId: any;
  setAsDefaultHandler: any;
}

const CreditCard: React.FC<CreditCardProps> = ({
  defaultBtn,
  cardProvider,
  lastFourDigits,
  expireMonth,
  expireYear,
  onDeleteClickHandler,
  paymentMethodId,
  setAsDefaultHandler,
}) => {
  const [showPopUp, setShowPopUp] = useState(false);
  return (
    <div
      className={` ${defaultBtn ? "background_card_payment_default pt-4" : "background_card_payment pt-4"
        } rounded px-4 py-2 me-4 mb-4`}
      style={{
        width: "100%",
        fontSize: "80%",
      }}
    >
      <div className="col-md-12">
        <div className="row">
          <div className="col-md-6 col-6">
            <p className="m-0 p-0 card_bank_text">BANK NAME</p>
            {cardProvider === "visa" ? (
              <p className="m-0 p-0 card_bank_text1">Visa Card</p>
            ) : cardProvider === "mastercard" ? (
              <p className="m-0 p-0 card_bank_text1">Master Card</p>
            ) : cardProvider === "amex" ? (
              <p className="m-0 p-0 card_bank_text1">Amex</p>
            ) : (
              <p className="m-0 p-0 card_bank_text1">No company</p>
            )}
          </div>
          <div className="col-md-6 col-6 text-end">
            <div className="row">
              {defaultBtn && (
                <div className="col-md-12 ">

                  <div className="px-3 py-2 rounded badge bg-light text-danger">
                    Saved as default
                  </div>

                </div>
              )}
              {defaultBtn ? null : (
                <div>
                  <span
                    style={{
                      fontSize: "",
                      cursor: "pointer",
                      marginTop: "16px",
                      color: "white"
                    }}
                    onClick={() => setShowPopUp(!showPopUp)}
                    id="dropdownMenuButton"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <BsThreeDotsVertical />
                  </span>
                  <div className={`dropdown ${showPopUp ? "show" : ""}`}>
                    <div
                      className={`dropdown-menu ${showPopUp ? "show" : ""}`}
                      aria-labelledby="dropdownMenuButton"
                    >
                      <div className="px-2 py-2">
                        <div
                          className="cursor-pointer"
                          onClick={(e) => {
                            setShowPopUp(false);
                            setAsDefaultHandler(paymentMethodId);
                          }}
                        >
                          <i className="fas fa-edit me-2"></i>
                          <span>set as Default</span>
                        </div>
                        <div
                          onClick={(e) => {
                            setShowPopUp(false);
                            onDeleteClickHandler(paymentMethodId);
                          }}
                          className="cursor-pointer"
                        >
                          <i className="fas fa-trash-alt me-2"></i>
                          <span>Delete</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-12 py-3">
        <div className="row">
          <div className="col-md-6 col-6">
            <img className="img-fluid" src="/imagess/redicons/chip.png" />
          </div>
          <div className="col-md-6 col-6 m-auto text-end">
            <img className="img-fluid" src="/imagess/redicons/signal.png" />
          </div>
        </div>
      </div>
      <div className="col-md-12 pt-2">
        <p className="digits_cards">**** **** **** {` ${lastFourDigits}`}</p>
      </div>
      <div className="col-md-12 pb-2 ">
        <p className="text_expire">
          Expires {expireMonth}-{expireYear}
        </p>

      </div>
    </div>
  );
};

export default CreditCard;
