import { useSelector } from "react-redux";

function Editemailprofile() {
  const { profile } = useSelector((state: any) => state);
  return (
    <div className="col-md-12  bg-white height_of_edit_screens">
      <div className="container total_height_dashboard mt-1 pt-4 pb-5">
        <div className="row">
          {/* Sidenavigation code  */}
          <div className="col-md-3 ">
            <div className="col-md-12 pr-5">
              <div className="col-md-12 background_color_sidebar px-4 py-2">
                <img
                  className="img-fluid image_icon_width"
                  src="../assets/images/userwhite.png"
                />{" "}
                Profile
              </div>
            </div>
          </div>
          <div className="col-md-9">
            <div
              className="col-md-12 border_profile px-5  pb-4 py-4"
              style={{ borderRadius: "8px" }}
            >
              <p>Email </p>
              <input
                className="form-control"
                type="text"
                value={profile?.primaryEmail}
              />
              <div className="col-md-12 text-end py-4">
                <button className="btn btn-danger"> Save & Continue </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Editemailprofile;
