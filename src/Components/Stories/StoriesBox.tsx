import React from "react";
import Styles from "../../styles/Landingpagemodules/Stories.module.css";

interface StoriesBoxProps {
  text: string;
  image: string;
}

const StoriesBox: React.FC<StoriesBoxProps> = ({ text, image }) => {
  return (
    <div className={Styles.storyBox}>
      <img src={image} alt="" />
      <div className={Styles.test}>
        <p>{text}</p>
      </div>
    </div>
  );
};

export default StoriesBox;
