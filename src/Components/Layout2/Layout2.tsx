import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

function Layout2({ children }: any) {
  const [loading, setLoading] = useState(true);
  const { profile } = useSelector((state: any) => state);

  useEffect(() => {
    const loaderTimer = setTimeout(() => {
      setLoading(false); // After 1 seconds, set loading to false
    }, 1000);

    return () => {
      clearTimeout(loaderTimer);
    };
  }, []);

  return (
    <div>
      {/* {profile?.firstName ? (
        <> */}
      {loading ? (
        <div className="col-md-12 pt-5 mt-5 text-center " >
          <img className="img-fluid loader_size_new" style={{width:"150px", marginTop:"30px"}} src="/imagess/redicons/loader.gif" />
        </div>
      ) : (
        children
      )}
      {/* </>
      ) : (
        <div className="col-md-12 text-center">
          <img className="img-fluid" src="/imagess/loading.gif" />
          <h4>
            <strong>Login To Access</strong>
          </h4>
        </div>
      )} */}
    </div>
  );
}

export default Layout2;
