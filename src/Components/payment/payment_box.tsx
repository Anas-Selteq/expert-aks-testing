import React from "react";
import Image from "next/image";
import { AiOutlineRight } from "react-icons/ai";

const PaymentBox = () => {
  return (
    <div className="border border-primary-subtle rounded py-2 px-4 d-flex justify-content-between align-items-center">
      <div>
        <p className="fs-5">Payment Method</p>
        <p className="fs-6 me-5">
          Don&apos;t worry, your information is private and we will not share
          this info with anyone outside Expert!
        </p>
        <div className="d-flex align-items-center text-danger justify-content-start">
          Learn More
          <AiOutlineRight />
        </div>
      </div>
      <div>
        <Image
          src="/assets/images/people_group.png"
          alt="Information"
          width={190}
          height={173}
        />
      </div>
    </div>
  );
};
export default PaymentBox;
