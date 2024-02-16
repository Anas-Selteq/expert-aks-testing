import React, { FC } from "react";
import Styles from "./Buttons.module.css";
import { AiOutlineMail, AiOutlineMessage } from "react-icons/ai";
import { IoCallOutline } from "react-icons/io5";

interface ButtonsProps {
  text: string;
  iconName: string;
}

export const Buttons: FC<ButtonsProps> = ({ text, iconName }) => {
  return (
    <>
      {iconName === "email" ? (
        <div className={Styles.iconBox}>
          <div>
            <AiOutlineMail color="white" size={25} />
          </div>
          <p>{text}</p>
        </div>
      ) : iconName === "call" ? (
        <div className={Styles.iconBox}>
          <div>
            <IoCallOutline color="white" size={25} />
          </div>
          <p>{text}</p>
        </div>
      ) : iconName === "msg" ? (
        <div className={Styles.iconBox}>
          <div>
            <AiOutlineMessage color="white" size={25} />
          </div>
          <p>{text}</p>
        </div>
      ) : null}
    </>
  );
};
