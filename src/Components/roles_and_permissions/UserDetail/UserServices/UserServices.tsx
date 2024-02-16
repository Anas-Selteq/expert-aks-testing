import React, { FC } from "react";
import Styles from "../UserDetail.module.css";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Status } from "../../StatusComponent/Status";


export const UserServices: FC = () => {
  return (
    <div className={Styles.userCardBox2}>
      <div className={Styles.moreOptionsBtn}>
        <BsThreeDotsVertical color="#b2bac5" size={21} />
      </div>
      <div className={Styles.serviceInfoBox}>
        <div className={Styles.serviceContainer}>
          <div className={Styles.serviceImage}></div>
          <div className={Styles.serviceUserName}>
            <div className={Styles.serviceInfo}>
              <p>Selteq IT Solution</p>
              <Status />
            </div>
            <p className={Styles.servicePost}>Admin</p>
          </div>
        </div>
        <hr className={Styles.serviceLine} />
        <div className={Styles.serviceToggle}>
          <p className={Styles.servicesAssigned}>6 Services Assigned</p>
        </div>
      </div>
    </div>
  );
};
