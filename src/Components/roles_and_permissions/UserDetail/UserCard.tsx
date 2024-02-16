import React, { FC } from "react";
import Styles from "./UserDetail.module.css";
import { AiOutlineMail } from "react-icons/ai";
import { Status } from "../StatusComponent/Status";

export const UserCard: FC = () => {
  return (
    <div className={Styles.userCardBox}>
      <div className={Styles.userImage}></div>
      <div className={Styles.userBox}>
        <div className={Styles.userDetailBox}>
          <p className={Styles.userInfo}>Usman Khan</p>
          <Status />
        </div>
        <p className={Styles.expertId}>Expert ID: 84396</p>
        <div className={Styles.userEmail}>
          <AiOutlineMail size={18} color="#aaaaaa" /> <p>johndoe@gmail.com</p>
        </div>
      </div>
    </div>
  );
};
