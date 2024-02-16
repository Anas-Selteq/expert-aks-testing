import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { getAllServices } from "@/helper";
import { getOrderIdInLocalStorage, setServiceInLocalStorage } from "@/Components/helper";

const Services = () => {
  const router = useRouter();
  const [listOfServices, setListOfServices] = useState([]);
  useEffect(() => {
    const requestAllServices = () => {
      getAllServices()
        .then((res) => setListOfServices(res.result.services))
        .catch((e) => alert(e))
        .finally(() => {});
    };
    requestAllServices();
  }, []);

  const handleChildServices = (service: any) => {
    if (service.hasChild === true) {
      router.push(`/services/${service.serviceId}`);
    } else {
      const orderId = getOrderIdInLocalStorage();
      if(!orderId){
        setServiceInLocalStorage(service);
      }else{
        alert("Already A Pending Purchase order Please Complete it first");
      }
      router.push(`/services/serviceDetail/detail`);
    }
  };

  return (
    <div className="p-4 text-center">
      404 Not found
      {/* <div className="d-flex flex-wrap justify-content-center align-items-center">
        {listOfServices?.map((itm: any, index: any) => (
          <div key={index} className="mt-3 me-3 text-center ">
            <div
              className="border_cards"
              onClick={() => handleChildServices(itm)}
            >
              <Image
                src={
                  itm.serviceImage ??
                  "https://img.freepik.com/premium-photo/male-hand-touching-service-concept_220873-7591.jpg"
                }
                alt="serviceImage"
                height={339}
                width={678}
              />
              <div className="py-3">
                <p className="mb-0" key={index}>
                  {itm.serviceName}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default Services;