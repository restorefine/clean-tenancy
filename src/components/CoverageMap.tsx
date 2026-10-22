"use client";

import { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";

// ── Hub area coordinates ──────────────────────────────────────
const GLASGOW_PINS: { name: string; lat: number; lng: number }[] = [
  { name: "Airdrie",       lat: 55.8636, lng: -3.9796 },
  { name: "Ayr",           lat: 55.4628, lng: -4.6295 },
  { name: "Clydebank",     lat: 55.9010, lng: -4.4024 },
  { name: "Cumbernauld",   lat: 55.9445, lng: -3.9920 },
  { name: "Dunfermline",   lat: 56.0719, lng: -3.4593 },
  { name: "East Kilbride", lat: 55.7640, lng: -4.1773 },
  { name: "Falkirk",       lat: 56.0019, lng: -3.7839 },
  { name: "Hamilton",      lat: 55.7775, lng: -4.0394 },
  { name: "Helensburgh",   lat: 56.0036, lng: -4.7280 },
  { name: "Irvine",        lat: 55.6114, lng: -4.6699 },
  { name: "Kilmarnock",    lat: 55.6118, lng: -4.4956 },
  { name: "Lanark",        lat: 55.6748, lng: -3.7768 },
  { name: "Motherwell",    lat: 55.7884, lng: -3.9892 },
  { name: "Paisley",       lat: 55.8456, lng: -4.4235 },
  { name: "Stirling",      lat: 56.1165, lng: -3.9369 },
];

const EDINBURGH_PINS: { name: string; lat: number; lng: number }[] = [
  { name: "Dalkeith",      lat: 55.8990, lng: -3.0598 },
  { name: "Dunfermline",   lat: 56.0719, lng: -3.4593 },
  { name: "Galashiels",    lat: 55.6186, lng: -2.8106 },
  { name: "Kirkcaldy",     lat: 56.1123, lng: -3.1614 },
  { name: "Linlithgow",    lat: 55.9778, lng: -3.5964 },
  { name: "Livingston",    lat: 55.8831, lng: -3.5219 },
  { name: "Musselburgh",   lat: 55.9428, lng: -3.0539 },
  { name: "North Berwick", lat: 56.0572, lng: -2.7231 },
];

// Glasgow hub HQ: city centre
const GLASGOW_HQ = { lat: 55.8642, lng: -4.2518 };
// Edinburgh hub HQ: city centre
const EDINBURGH_HQ = { lat: 55.9533, lng: -3.1883 };

export default function CoverageMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const initialised = useRef(false);

  useEffect(() => {
    if (initialised.current || !mapRef.current) return;
    initialised.current = true;

    // Dynamically import Leaflet only in browser
    import("leaflet").then((L) => {
      // Fix default icon paths broken by webpack
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });

      const map = L.map(mapRef.current!, {
        center: [55.88, -3.72],
        zoom: 8,
        scrollWheelZoom: false,
        zoomControl: true,
      });

      // OpenStreetMap tiles, no API key needed
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 18,
      }).addTo(map);

      // ── Custom circle markers ────────────────────────────────
      const glasgowStyle = { color: "#fff", fillColor: "#2c66b0", fillOpacity: 1, weight: 2, radius: 7 };
      const edinburghStyle = { color: "#fff", fillColor: "#3f8a24", fillOpacity: 1, weight: 2, radius: 7 };
      const hqStyle = (fill: string) => ({ color: "#fff", fillColor: fill, fillOpacity: 1, weight: 3, radius: 11 });

      // Glasgow area pins
      GLASGOW_PINS.forEach(({ name, lat, lng }) => {
        L.circleMarker([lat, lng], glasgowStyle)
          .bindPopup(`<strong>${name}</strong><br/><span style="color:#2c66b0;font-size:11px">Glasgow Hub coverage</span>`)
          .addTo(map);
      });

      // Edinburgh area pins
      EDINBURGH_PINS.forEach(({ name, lat, lng }) => {
        L.circleMarker([lat, lng], edinburghStyle)
          .bindPopup(`<strong>${name}</strong><br/><span style="color:#3f8a24;font-size:11px">Edinburgh Hub coverage</span>`)
          .addTo(map);
      });

      // HQ hub markers (larger)
      L.circleMarker([GLASGOW_HQ.lat, GLASGOW_HQ.lng], hqStyle("#2c66b0"))
        .bindPopup("<strong>Glasgow Hub</strong><br/><span style='font-size:11px'>Primary Operations Centre</span>")
        .addTo(map);

      L.circleMarker([EDINBURGH_HQ.lat, EDINBURGH_HQ.lng], hqStyle("#3f8a24"))
        .bindPopup("<strong>Edinburgh Hub</strong><br/><span style='font-size:11px'>Eastern Region Centre</span>")
        .addTo(map);
    });

  }, []);

  return (
    <div
      ref={mapRef}
      className="w-full h-full min-h-[420px] rounded-3xl overflow-hidden z-0"
      style={{ minHeight: "420px" }}
    />
  );
}
