import { useRouter } from "next/router";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getIndustryById } from "@/helper";
import Layout2 from "@/Components/Layout2/Layout2";
import { useSelector } from "react-redux";
import SideBar from "@/Components/components/sidebar";
import { GrFormAdd } from "react-icons/Gr";

function ChildIndustry() {
  const router = useRouter();
  const { id } = router.query;
  const [listOfIndustries, setListOfIndustries] = useState<any>([]);
  const { message, loading, profile } = useSelector((state: any) => state);
  const [selectedindex, setSelectedindex] = useState(null);
  const [loadingnew, setLoadingnew] = useState<any>(0);

  useEffect(() => {
    if (id) {
      const getIndustryByParentIndustryId = () => {
        getIndustryById(id)
          .then((res) => {
            if (res.result.industries) {
              setListOfIndustries(res.result.industries[0].childIndustries);
            }
          })
          .catch((e) => alert(e))
          .finally(() => { });
      };
      getIndustryByParentIndustryId();
    }
  }, [id]);

  const handlePageHere = (industry: any, index: any) => {
    setLoadingnew(1);
    setSelectedindex(index);
    if (industry.hasChild === true) {
      router.push(`/industries/${industry.industryId}`).then(() => window.location.reload());
    
    } else {
      router.push(`/services/servicesByIndustryId/${industry.industryId}`);
    }
  };

  return (
    <Layout2>
      {/* {profile?.firstName ? (
        
        <SideBar activeIndex={0}> */}

      <div className="col-md-12 custom_padding_services_pages">
        <div className="col-md-12">
          <p className="mb-2 p-0 service_choose">Please choose any Sub Industry</p>
        </div>
        <div className="row">
          {listOfIndustries.length === 0 ? (
            <div className="col-md-12 text-center">
              <div className="spinner-border text-danger" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            listOfIndustries?.map((itm: any, index: any) => (
              <div key={index} className="col-md-3 universal_cursor mt-2 text-center">
                {/* <div
                  className="border_cards"
                 
                >
                  <Image
                    src={itm.industryimageUrl}
                    alt="industryImage"
                    height={339}
                    width={678}
                  />
                  <div className="py-3">
                    <p className="mb-0" key={index}>
                      {itm.industryName}
                    </p>
                  </div>
                </div> */}
                <div
                  className="card_serices_by_industry_id mt-4 mt-md-0"
                  onClick={() => handlePageHere(itm, index)}
                >
                  <div>
                    <img
                      src={
                        itm.industryimageUrl ??
                        "https://img.freepik.com/premium-photo/male-hand-touching-service-concept_220873-7591.jpg"
                      }
                      alt="serviceImage"
                      className="img-fluid img_border"
                    />
                  </div>

                  <div className="col-md-12 overflow_new pb-2 pt-2 px-2">
                    <div className="row">
                      <div className="col-md-12 col-12 m-auto">
                        <p className="mb-0 title_text_services" key={index}>
                          {itm.industryName}&nbsp;&nbsp;
                          {/* {selectedindex === index ?
                            <>
                              {loadingnew === 1 ?
                                <div className="spinner-border spinner-border-sm text-light" role="status">
                                  <span className="visually-hidden">Loading...</span>
                                </div> : null
                              }
                            </>
                            : null} */}
                        </p>
                      </div>
                      {/* <div className="col-md-5 col-5 ">
                            <p className="mb-0 title_text_services1" key={index}>
                              £ NCFB
                            </p>
                          </div> */}
                      {/* <div className="col-md-7 col-7 pt-2" >
                          <p className="mb-0 title_text_services2" key={index}>
                            {itm?.description}
                          </p>
                        </div> */}
                      {/* <div className="col-md-5 col-5 text-end m-auto pt-1 ">
                            <div className="flex_using">
                              <div className="add_button"> <i className="fas fa-minus"></i> </div>
                              <span className="px-1">1</span>
                              <div className="add_button"> <i className="fas fa-plus"></i> </div>
                          </div>
                          </div> */}
                    </div>

                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

    </Layout2>
  );
}

export default ChildIndustry;
