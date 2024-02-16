import React, { useState, useEffect } from "react";

function Layout3({ children }: any) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loaderTimer = setTimeout(() => {
      setLoading(false); // After 3 seconds, set loading to false
    }, 1000);

    return () => {
      clearTimeout(loaderTimer);
    };
  }, []);

  return (
    <div>
      {loading ? (
        <div className="col-md-12 pt-5 mt-5 text-center"></div>
      ) : (
        children
      )}
    </div>
  );
}

export default Layout3;
