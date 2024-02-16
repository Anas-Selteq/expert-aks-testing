import React from "react";
import Styles from "../../styles/Landingpagemodules/CategoryItem.module.css";
import Image from "next/image";
import { useRouter } from "next/router";

interface CategoryItemProps {
  data: any;
}

const CategoryItem: React.FC<CategoryItemProps> = ({ data }) => {
  const router = useRouter();
  const handleClickIndustry = () => {
    if (data.hasChild === true) {
      router.push(`/industries/${data.id}`);
    } else {
      router.push(`/services/servicesByIndustryId/${data.id}`);
    }
  };

  return (
    <div className="col-md-12 text-center">
      {/* <div className={Styles.categoryItemContainer} onClick={handleClickIndustry}>
      <Image src={data?.imageUrl} alt={data?.name} height={51} width={51} />
      <p>{data?.name}</p>
    </div> */}
      <div className="row pt-md-5 mt-md-3 ">
        <div className="col-md col-6 text-center" onClick={handleClickIndustry}>
          <img
            className="img-fluid img_size_set"
            src={data?.attachments[0]?.imageUrl}
            alt={data?.serviceName}
          />
          <p style={{ color: "gray" }} className="pt-2">
            {data?.serviceName}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CategoryItem;
