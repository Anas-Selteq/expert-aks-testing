import React, { FC } from "react";
import Styles from "./ContactScreen.module.css";
import { InputFields } from "../../Components/InputFields/InputFields"
// import { mainImage } from "../../assets";
import Image from "next/image";
import { Buttons } from "../../Components/Buttons/Buttons";

const ContactScreen: FC = () => {
  return (
    <div className={Styles.contactScreenContainer}>
    <div>
      <div>
        <p className={Styles.contactHeading}>Contact Us</p>
        <hr className={Styles.headingLine} />
      </div>
      <p className={Styles.contactDescription}>
        We are looking forward to hearing from you. If you have any questions,
        comments or suggestions, send in your details, and our careers advisor
        will contact you immediately.
      </p>
      <InputFields name="Name" placeholder="Enter Your Name" />
      <InputFields name="Email" placeholder="Enter Your Email" />
      <InputFields name="Subject" placeholder="Enter Your Subject" />
      <InputFields name="Message" placeholder="Enter Your Message" />
      <div className={Styles.btnContainer}>
        <div className={Styles.btnDesign}>Send Message</div>
      </div>
    </div>

    <div className={Styles.imageContainer}>
      <img src="../imagess/mainImage.png" alt="Main Image" className={Styles.imgPicture} />
      <div className={Styles.iconsBox}>
        <Buttons text="Email" iconName="email" />
        <Buttons text="Call Us" iconName="call" />
        <Buttons text="Message" iconName="msg" />
      </div>
    </div>
  </div>
  );
};

export default ContactScreen;
