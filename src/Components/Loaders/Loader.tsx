import { LoaderIcon } from "@/styles/Loader";
import React from "react";

function Loader({ status, style={} }: { status: boolean, style: object }) {
  return (
    <>
      {status ? (
        <>
          {/* <LoaderIcon
            alt=""
            src="https://www.html-code-generator.com/images/meta/css/css-loading-animation.png"
          /> */}
          <div className="text-center text-danger pt-3" style={style}>
            <div className="spinner-border" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        </>
      ) : (
        ""
      )}
    </>
  );
}

export default Loader;
