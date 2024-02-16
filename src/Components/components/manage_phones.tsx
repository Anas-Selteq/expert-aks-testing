import React from "react";
import Image from "next/image";
import { useSelector } from "react-redux";
import { BiChevronRight } from "react-icons/bi";

interface ComponentProps {
  onClickHandler: () => void;
}

const ManagePhones: React.FC<ComponentProps> = ({ onClickHandler }) => {
  const { profile } = useSelector((state: any) => state);
  return (
    <div>
      <InputFields
        label="Primary Number"
        value={profile?.primaryMobile}
        isVerify={profile?.primaryMobileVerify}
        onClickHandler={() => {}}
      />
      <hr
        style={{
          width: "100%",
          color: "white",
          height: "0.1rem",
          backgroundColor: "white",
        }}
      />
      <InputFields
        label="Secondary Number"
        value={profile?.secondaryMobile ?? "No Mobile Added"}
        isVerify={profile.secondaryMobileVerify}
        onClickHandler={onClickHandler}
      />
    </div>
  );
};

export default ManagePhones;

const InputFields = ({
  label,
  value,
  isVerify,
  onClickHandler,
}: {
  label: any;
  value: any;
  isVerify: any;
  onClickHandler: any;
}) => {
  return (
    <div className="row px-md-3 px-3">
      <div className="col-md-12">
        <div
          style={{
            color: "grey",
            fontSize: "14px",
          }}
        >
          {label}
        </div>
      </div>
      <div className="col-md-6 col-6 m-auto">
        {value.length === 0 ? (
          <div className="font_normal_email_fields">Add Secondary Mobile</div>
        ) : (
          <div className="font_normal_email_fields">{value}</div>
        )}
      </div>
      <div className="col-md-6 col-6 text-end">
        {isVerify ? (
          <span>
            <Image
              src="/assets/Images/verified.png"
              alt="verify"
              height={15}
              width={55}
            />
            &nbsp;
            <Image
              src="/assets/Images/rightt.png"
              alt="keyright"
              height={11.08}
              width={6.33}
            />
          </span>
        ) : (
          <span
            className="fw-bold text-danger "
            style={{
              fontSize: "0.6rem",
            }}
            // onClick={onClickHandler}
          >
            Verify Now &nbsp;
            <Image
              src="/assets/Images/rightt.png"
              alt="keyright"
              height={11.08}
              width={6.33}
            />
          </span>
        )}
      </div>
    </div>
  );
};
