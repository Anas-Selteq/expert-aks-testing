import { useRouter } from "next/router";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getAllIndustries } from "@/helper";

const Services = () => {
  const router = useRouter();
  const [industry, setIndustry] = useState([]);
  useEffect(() => {
    const getIndustries = async () => {
      getAllIndustries()
      .then((res) => setIndustry(res.result.industries))
      .catch((e) => alert(e))
      .finally(() => {});
    };
    getIndustries();
  }, []);

  const handleClickIndustry = (industryOne: any) => {
    console.log(industryOne)
    if (industryOne.hasChild === true) {
      router.push(`/industries/${industryOne.industryId}`);
    } else {
      router.push(`/services/servicesByIndustryId/${industryOne.industryId}`);
    }
  };

  return (
    <div className="p-4">
        <div className="d-flex justify-content-between px-1">
            <h4>
              <b>Browse by category</b>
            </h4>
            <h6>Show all </h6>
        </div>
      <div className="d-flex flex-wrap align-items-center justify-content-center">
        {industry.map((ind: any, index: number) => {
          return (
            <div key={index} className="box_width">
              <a
                onClick={(e) => handleClickIndustry(ind)}
              >
                <Image
                  className="img-fluid img_width_ind"
                  src={
                    ind.industryimageUrl.match(/\.\w+$/)
                      ? ind.industryimageUrl
                      : "https://1864597015.rsc.cdn77.org/Images/admin/Industry/3175b7f19511456fba22dd7196d7b88b.webp"
                  }
                  alt="Industry"
                  height={100}
                  width={100}
                />
                <p>{ind?.industryName}</p>
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Services;
