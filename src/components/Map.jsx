import { MapContainer, TileLayer, Marker, Popup } from "leaflet";

export default function Map() {
  return (
    <div className=" w-full h-[65svh] flex items-center justify-center bg-gray-500 text-heading ">
      Please try loading the map again
    </div>
  );
}

function MapLayout() {
  const position = [lat, lng];

  return (
    <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
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
