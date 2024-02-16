import React from "react";
import Styles from "../../styles/Landingpagemodules/Heading.module.css";

interface HeadingProps {
  text: string | undefined;
}

const Heading: React.FC<HeadingProps> = ({ text }) => {
  return <p className={Styles.headingResuable}>{text}</p>;
};

export default Heading;
