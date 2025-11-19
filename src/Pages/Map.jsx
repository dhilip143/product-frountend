import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// 🏪 Dummy locations
const dummyLocations = [
  { name: "Shop A", lat: 13.070, lng: 80.270 },
  { name: "Shop B", lat: 13.082, lng: 80.290 },
  { name: "Shop C", lat: 13.100, lng: 80.220 },
  { name: "Shop D", lat: 13.150, lng: 80.200 },
  { name: "Shop E", lat: 13.000, lng: 80.250 },
  { name: "Shop F", lat: 13.050, lng: 80.230 },
  { name: "Shop G", lat: 12.980, lng: 80.260 },
  { name: "Shop H", lat: 13.120, lng: 80.270 },
  { name: "Shop I", lat: 13.090, lng: 80.310 },
  { name: "Shop J", lat: 13.030, lng: 80.240 },
];

// 📏 Calculate distance (Haversine)
const getDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
};

// 🚗 Compute nearest neighbor path
const computePathOrder = (start, locations) => {
  const remaining = [...locations];
  const order = [];
  let current = { ...start };

  while (remaining.length) {
    let nearest = null;
    let shortest = Infinity;
    let index = -1;

    remaining.forEach((loc, i) => {
      const d = getDistance(current.lat, current.lng, loc.lat, loc.lng);
      if (d < shortest) {
        shortest = d;
        nearest = loc;
        index = i;
      }
    });

    if (nearest) {
      order.push(nearest);
      current = nearest;
      remaining.splice(index, 1);
    }
  }

  return order;
};

export default function MultiRouteMap() {
  const [start, setStart] = useState(null);
  const [routeOrder, setRouteOrder] = useState([]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const current = { lat: pos.coords.latitude, lng: pos.coords.longitude };
          setStart(current);
          const ordered = computePathOrder(current, dummyLocations);
          setRouteOrder(ordered);
        },
        (err) => {
          console.error("Location error", err);
          // fallback
          const fallback = { lat: 13.0827, lng: 80.2707 }; // Chennai
          setStart(fallback);
          const ordered = computePathOrder(fallback, dummyLocations);
          setRouteOrder(ordered);
        }
      );
    }
  }, []);

  if (!start) return <h3 style={{ textAlign: "center" }}>📍 Getting your location...</h3>;

  // Build all paths sequentially
  const polylinePoints = [start, ...routeOrder];
  const routeSegments = polylinePoints.slice(0, -1).map((p, i) => [
    [p.lat, p.lng],
    [polylinePoints[i + 1].lat, polylinePoints[i + 1].lng],
  ]);

  // 🎨 Colors for different paths
  const colors = [
    "red",
    "blue",
    "green",
    "orange",
    "purple",
    "brown",
    "pink",
    "teal",
    "black",
    "gray",
  ];

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <MapContainer center={start} zoom={12} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="© OpenStreetMap contributors"
        />

        {/* User marker */}
        <Marker position={start}>
          <Popup>📍 You are here (Start)</Popup>
        </Marker>

        {/* All shop markers */}
        {routeOrder.map((loc, i) => (
          <Marker key={i} position={[loc.lat, loc.lng]}>
            <Popup>
              <b>{i + 1}. {loc.name}</b>
              <br />
              Step #{i + 1}
            </Popup>
          </Marker>
        ))}

        {/* Draw each path line */}
        {routeSegments.map((segment, i) => (
          <Polyline
            key={i}
            positions={segment}
            pathOptions={{ color: colors[i % colors.length], weight: 5 }}
          />
        ))}
      </MapContainer>

      {/* Route list info */}
      <div style={{ padding: "10px", background: "#fff", textAlign: "center" }}>
        <h3>🧭 Route Order</h3>
        <p>Start ➜ {routeOrder.map((r, i) => `${i + 1}. ${r.name}`).join(" ➜ ")}</p>
      </div>
    </div>
  );
}
