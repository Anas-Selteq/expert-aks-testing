import dynamic from "next/dynamic";

const Map  = dynamic(() => import("../map/map"), {
  loading: ()=><p>Loading...</p>,
    ssr: false
  });
export default Map;