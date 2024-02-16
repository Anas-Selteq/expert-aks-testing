import React from "react";
import Image from "next/image";

const BusinessCard = ({
  src,
  title,
  type,
  radio,
}: {
  src: string;
  title: string;
  type: string;
  radio: boolean;
}) => {
  return (
    <div className="d-flex justify-content-between align-items-center ">
      <div className="d-flex">
        <Image
          className="rounded-circle"
          src={src}
          alt="Profile"
          height={50}
          width={50}
        />
        <div className="d-flex flex-column ms-3 pt-2 ">
          <span className="s_f_1">{title}</span>
          <span className="s_f_2">{type}</span>
        </div>
      </div>
      <div>
        <input type="radio" style={{accentColor:"red"}} checked={radio} />
      </div>
    </div>
  );
};

export default BusinessCard;
