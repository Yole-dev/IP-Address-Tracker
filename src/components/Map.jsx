import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useTracker } from "../contexts/TrackerContext";
import "leaflet/dist/leaflet.css";

export default function Map() {
  const { ipAddressData } = useTracker();
  const { location } = ipAddressData || {};

  if (!location) {
    return <MapErrorView />;
  }

  const { lat, lng } = location;

  return <MapLayout lat={lat} lng={lng} />;
}

function MapLayout({ lat, lng }) {
  const position = [lat || 0, lng || 0];

  return (
    <div className="w-full h-[65svh]">
      <MapContainer center={position} zoom={10} scrollWheelZoom={true}>
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
    </div>
  );
}

function MapErrorView() {
  return (
    <div className=" w-full h-[65svh] flex items-center justify-center bg-gray-500 text-heading ">
      Please try loading the map again
    </div>
  );
}
