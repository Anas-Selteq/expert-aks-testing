import React from "react";
import Styles from "../../styles/Landingpagemodules/Products.module.css";
import ServiceCard from "../Reusable/ServiceCard";
import Heading from "../Reusable/Heading";

interface ProductsProps {
  data: {
    textValue: string;
    sectionnew: {
      name: string;
      description: string;
      imageUrl: string;
    }[];
  };
}

const Products: React.FC<ProductsProps> = ({ data }) => {
  return (
    <div>
      <div className={Styles.headingAlign}>
        <Heading text={data?.textValue} />
      </div>
      <div className={Styles.productListContainer}>
        {data?.sectionnew?.map((item, index) => (
          <div className={Styles.productBox} key={index}>
            <ServiceCard
              service={item}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
