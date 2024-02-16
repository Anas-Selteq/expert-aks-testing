import React from "react";
import Styles from "../../styles/Landingpagemodules/TrendingServiceCard.module.css";
import { BsArrowRight } from "react-icons/bs";

interface TrendingServiceCardProps {
  name: string | undefined;
  description: string | undefined;
}

const TrendingServiceCard: React.FC<TrendingServiceCardProps> = ({
  name,
  description,
}) => {
  return (
    <div className={Styles.trendingServiceCard}>
      <img src="../imagess/electric.png" alt="" />

      <div className={Styles.serviceInfoCard}>
        <h3>{name}</h3>
        <p>{description}</p>
        <div className={Styles.serviceCardArrow}>
          <BsArrowRight size={"18px"} />
        </div>
      </div>
    </div>
  );
};

export default TrendingServiceCard;
