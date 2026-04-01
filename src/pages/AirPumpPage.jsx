import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { HiOutlineMapPin, HiOutlineMagnifyingGlass } from "react-icons/hi2";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for default marker icons in Leaflet with React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Sample air pump locations in Denmark
const airPumpLocations = [
  {
    id: 1,
    name: "Copenhagen Central Station",
    address: "Bernstorffsgade 16, 1577 København",
    lat: 55.6726,
    lng: 12.5648,
    type: "Free Public Pump",
    hours: "24/7",
  },
  {
    id: 2,
    name: "Nørrebro Bike Shop",
    address: "Nørrebrogade 45, 2200 København N",
    lat: 55.6897,
    lng: 12.5529,
    type: "Bike Shop",
    hours: "Mon-Fri: 9-18, Sat: 10-15",
  },
  {
    id: 3,
    name: "Frederiksberg Garden",
    address: "Frederiksberg Runddel, 2000 Frederiksberg",
    lat: 55.6714,
    lng: 12.5256,
    type: "Free Public Pump",
    hours: "24/7",
  },
  {
    id: 4,
    name: "Aarhus City Hall",
    address: "Rådhuspladsen 2, 8000 Aarhus C",
    lat: 56.1535,
    lng: 10.2103,
    type: "Free Public Pump",
    hours: "24/7",
  },
  {
    id: 5,
    name: "Odense Train Station",
    address: "Østre Stationsvej 27, 5000 Odense C",
    lat: 55.4009,
    lng: 10.3883,
    type: "Free Public Pump",
    hours: "24/7",
  },
  {
    id: 6,
    name: "Vesterbro Cykler",
    address: "Vesterbrogade 97, 1620 København V",
    lat: 55.6695,
    lng: 12.5489,
    type: "Bike Shop",
    hours: "Mon-Fri: 8-18, Sat: 9-14",
  },
  {
    id: 7,
    name: "Amager Strand Park",
    address: "Amager Strandvej 1, 2300 København S",
    lat: 55.6553,
    lng: 12.6493,
    type: "Free Public Pump",
    hours: "24/7",
  },
  {
    id: 8,
    name: "Aalborg Bike Hub",
    address: "Boulevarden 13, 9000 Aalborg",
    lat: 57.0467,
    lng: 9.9354,
    type: "Bike Shop",
    hours: "Mon-Fri: 10-17, Sat: 10-14",
  },
];

// Component to recenter map
function RecenterMap({ lat, lng }) {
  const map = useMap();
  map.setView([lat, lng], 13);
  return null;
}

export default function AirPumpPage() {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [mapCenter, setMapCenter] = useState({ lat: 55.6761, lng: 12.5683 }); // Copenhagen default

  const filteredLocations = airPumpLocations.filter(
    (loc) =>
      loc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      loc.address.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleLocationClick = (location) => {
    setSelectedLocation(location);
    setMapCenter({ lat: location.lat, lng: location.lng });
  };

  return (
    <div className="min-h-screen pt-20 bg-gray-50/40">
      <div className="flex flex-col lg:flex-row h-[calc(100vh-5rem)]">
        {/* Sidebar */}
        <div className="w-full lg:w-96 bg-white border-r border-gray-100 flex flex-col h-64 lg:h-full">
          {/* Header */}
          <div className="p-6 border-b border-gray-100">
            <h1 className="text-2xl font-semibold text-gray-900 mb-1">Find Air Pumps</h1>
            <p className="text-sm text-gray-500">Locate free bike air pumps near you</p>

            {/* Search */}
            <div className="relative mt-4">
              <HiOutlineMagnifyingGlass className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search locations..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all text-sm"
              />
            </div>
          </div>

          {/* Locations List */}
          <div className="flex-1 overflow-y-auto">
            {filteredLocations.length === 0 ? (
              <div className="p-6 text-center text-gray-500 text-sm">No locations found</div>
            ) : (
              <div className="divide-y divide-gray-100">
                {filteredLocations.map((location) => (
                  <button
                    key={location.id}
                    onClick={() => handleLocationClick(location)}
                    className={`w-full p-4 text-left hover:bg-gray-50 transition-colors ${
                      selectedLocation?.id === location.id ? "bg-blue-50" : ""
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                          location.type === "Free Public Pump"
                            ? "bg-green-100 text-green-600"
                            : "bg-blue-100 text-blue-600"
                        }`}
                      >
                        <HiOutlineMapPin className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium text-gray-900 text-sm truncate">
                          {location.name}
                        </p>
                        <p className="text-xs text-gray-500 truncate mt-0.5">{location.address}</p>
                        <div className="flex items-center gap-2 mt-1.5">
                          <span
                            className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                              location.type === "Free Public Pump"
                                ? "bg-green-100 text-green-700"
                                : "bg-blue-100 text-blue-700"
                            }`}
                          >
                            {location.type}
                          </span>
                          <span className="text-[10px] text-gray-400">{location.hours}</span>
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Map */}
        <div className="flex-1 relative">
          <MapContainer
            center={[mapCenter.lat, mapCenter.lng]}
            zoom={12}
            className="h-full w-full"
            zoomControl={false}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <RecenterMap lat={mapCenter.lat} lng={mapCenter.lng} />

            {filteredLocations.map((location) => (
              <Marker
                key={location.id}
                position={[location.lat, location.lng]}
                eventHandlers={{
                  click: () => setSelectedLocation(location),
                }}
              >
                <Popup>
                  <div className="p-1">
                    <p className="font-semibold text-gray-900">{location.name}</p>
                    <p className="text-xs text-gray-500 mt-1">{location.address}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span
                        className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                          location.type === "Free Public Pump"
                            ? "bg-green-100 text-green-700"
                            : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {location.type}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      <span className="font-medium">Hours:</span> {location.hours}
                    </p>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>

          {/* Map Legend */}
          <div className="absolute bottom-6 left-6 bg-white rounded-xl shadow-lg border border-gray-100 p-4 z-[1000]">
            <p className="text-xs font-semibold text-gray-700 mb-2">Legend</p>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-green-500" />
                <span className="text-xs text-gray-600">Free Public Pump</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-blue-500" />
                <span className="text-xs text-gray-600">Bike Shop</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
