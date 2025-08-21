import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useTracker } from "../contexts/TrackerContext";
import "leaflet/dist/leaflet.css";
import Spinner from "./Spinner";

export default function Map() {
  const { ipAddressData, isLoading, error } = useTracker();
  const { location } = ipAddressData || {};

  return (
    <div className="w-full h-[65vh] flex items-center justify-center">
      {(isLoading || !ipAddressData) && <Spinner />}

      {!isLoading && ipAddressData && <MapLayout location={location} />}

      {!isLoading && !ipAddressData && <MapErrorView />}
    </div>
  );
}

function MapLayout({ location }) {
  const lat = location?.lat || 0;
  const lng = location?.lng || 0;
  const position = [lat, lng];

  console.log(position);

  return (
    <MapContainer
      center={position}
      zoom={13}
      scrollWheelZoom={true}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
}

function MapErrorView() {
  return (
    <div className=" w-full bg-gray-500 text-heading ">
      Please try loading the map again
    </div>
  );
}
