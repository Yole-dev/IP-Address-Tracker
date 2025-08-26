import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import L from "leaflet";
import { useTracker } from "../contexts/TrackerContext";
import "leaflet/dist/leaflet.css";
import Spinner from "./Spinner";
import customMarker from "../assets/images/icon-location.svg";

export default function Map() {
  const { ipAddressData, isLoading, error } = useTracker();
  const { location } = ipAddressData || {};

  return (
    <div className="w-full h-[65vh] flex items-center justify-center">
      {(isLoading || !ipAddressData?.location) && <Spinner />}

      {!isLoading && ipAddressData && <MapLayout location={location} />}

      {!isLoading && error && <MapErrorView error={error} />}
    </div>
  );
}

function MapLayout({ location }) {
  const mapLat = location?.lat || 0;
  const mapLng = location?.lng || 0;
  const position = [mapLat, mapLng];

  // adding custom marker img
  const customMarkerIcon = L.icon({
    iconUrl: customMarker,
    iconSize: [60, 70],
    iconAnchor: position,
  });

  return (
    <MapContainer
      center={position}
      zoom={13}
      scrollWheelZoom={true}
      zoomControl={false}
      className="w-full h-full inset-0 z-0"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position} icon={customMarkerIcon} />
      <ChangeMapPosition position={position} />
    </MapContainer>
  );
}

function ChangeMapPosition({ position }) {
  const map = useMap();
  map.setView(position);

  return null;
}

function MapErrorView({ error }) {
  return <div className=" w-full bg-gray-200 text-heading ">{error}</div>;
}
