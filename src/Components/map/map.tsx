import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  ZoomControl,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useState, useEffect, useRef } from "react";
import "leaflet-fullscreen/dist/leaflet.fullscreen.css";
import "leaflet-fullscreen/dist/Leaflet.fullscreen.js";

const Map = ({
  center,
  zoom,
  selectedLocationHandler,
  defaultGeometry,
  isFullScreen,
}: {
  defaultGeometry: any;
  center: any;
  zoom: number;
  selectedLocationHandler: any;
  isFullScreen: boolean;
}) => {
  const [selectedLocation, setSelectedLocation] = useState(defaultGeometry);
  const [selected, setSelected] = useState(false);
  const mapRef = useRef<L.Map>(null);

  const customIcon = L.icon({
    iconUrl: "/assets/Images/location_marker.png",
    iconSize: [32, 32], // Adjust the size of the marker icon
    iconAnchor: [16, 32],
  });

  const LocationMarker = () => {
    useMapEvents({
      click(e: any) {
        setSelectedLocation(e.latlng);
        selectedLocationHandler(e.latlng);
      },
    });

    return selectedLocation ? (
      <Marker position={selectedLocation} draggable={true} icon={customIcon}>
        <Popup>
          Latitude: {selectedLocation.lat} ::::: Longitude:{" "}
          {selectedLocation.lng}
        </Popup>
      </Marker>
    ) : null;
  };

  // const MapRender = () => {
  //   const map = mapRef.current;
  //   const fullscreenControl = L?.control?.fullscreen({
  //     position: "bottomleft",
  //     title: "Show me the fullscreen!",
  //     titleCancel: "Exit fullscreen mode",
  //     content: "",
  //     forceSeparateButton: true,
  //     forcePseudoFullscreen: true,
  //     fullscreenElement: false,
  //   });
  //   fullscreenControl.addTo(map);
  //   map?.on("enterFullscreen", function () {
  //     console.log("entered fullscreen");
  //   });
  //   map?.on("exitFullscreen", function () {
  //     console.log("exited fullscreen");
  //   });
  // };

  // useEffect(() => {
  //   setSelected(true);
  //   if (selected === true) {
  //     MapRender();
  //   }
  // }, [selected]);

  useEffect(() => {
    if (mapRef.current) {
      const map = mapRef.current;
      map?.setView(center, zoom);
    }
  }, [center, zoom, isFullScreen]);

  return (
    <MapContainer
      ref={mapRef}
      center={center}
      zoom={zoom}
      scrollWheelZoom={true}
      zoomControl={false}
      className="map_styles"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution=""
      />
      <LocationMarker />
      <ZoomControl position="bottomright" />
    </MapContainer>
  );
};

export default Map;
