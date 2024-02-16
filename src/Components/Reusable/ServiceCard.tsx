import React from "react";
import Styles from "../../styles/Landingpagemodules/ServiceCard.module.css";
import Image from "next/image";
import { useRouter } from "next/router";
import { getOrderIdInLocalStorage, setServiceInLocalStorage } from "@/Components/helper";

interface ServiceCardProps {
  service: any;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  const router = useRouter();
  const handleChildServices = () => {
    if (service.hasChild === true) {
      router.push(`/services/${service.id}`);
    } else {
      const orderId = getOrderIdInLocalStorage();
      if(!orderId){
        setServiceInLocalStorage(service);
      }
      router.push(`/services/serviceDetail/detail`);
    }
  };

  return (
    <div className={Styles.serviceCardContainer} onClick={handleChildServices}>
      <div className={Styles.imageBox}>
        <Image
          src={service?.imageUrl}
          alt={service?.name}
          className={Styles.img}
          height={276}
          width={208}
        />
        <div className={Styles.addToFav}>
          <Image
            src="../imagess/SimpleStar.png"
            alt={service?.name}
            height={31.47}
            width={31.47}
          />
        </div>
      </div>
      <p className={Styles.serviceTitle}>{service?.name}</p>
      <p className={Styles.serviceInfo}>{service?.description}</p>
      <p className={Styles.servicePrice}>
        <span>{service?.servicePrice}$</span> <span className={Styles.serviceOFF}>15% OFF</span>
      </p>
    </div>
  );
};

export default ServiceCard;
