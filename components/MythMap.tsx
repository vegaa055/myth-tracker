"use client";

import { useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Polyline,
  Popup,
  useMap,
} from "react-leaflet";
import { arcPoints } from "@/lib/geo";
import { VERDICT_COLOR, VERDICT_LABEL } from "@/lib/similarity";
import type { Verdict } from "@/lib/types";
import "leaflet/dist/leaflet.css";

export interface MythMapMarker {
  id: string;
  lat: number;
  lng: number;
  title: string;
  region: string;
  cultureName: string;
  attestation: string;
  summary: string;
  isHub: boolean;
}

export interface MythMapConnection {
  fromId: string;
  toId: string;
  score: number;
  verdict: Verdict;
  sharedTop: string[];
}

export interface MythMapProps {
  origin: { known: boolean; lat?: number; lng?: number; region?: string };
  markers: MythMapMarker[];
  connections: MythMapConnection[];
  accent: string;
}

function FitBounds({ markers }: { markers: MythMapMarker[] }) {
  const map = useMap();
  useEffect(() => {
    if (markers.length === 0) return;
    const lats = markers.map((m) => m.lat);
    const lngs = markers.map((m) => m.lng);
    map.fitBounds(
      [
        [Math.min(...lats), Math.min(...lngs)],
        [Math.max(...lats), Math.max(...lngs)],
      ],
      { padding: [45, 45], maxZoom: 5 }
    );
  }, [map, markers]);
  return null;
}

export default function MythMap({
  origin,
  markers,
  connections,
  accent,
}: MythMapProps) {
  const byId = new Map(markers.map((m) => [m.id, m]));

  return (
    <div style={{ position: "relative" }}>
      <MapContainer
        center={[25, 20]}
        zoom={2}
        minZoom={2}
        worldCopyJump
        style={{ height: 520, width: "100%" }}
        scrollWheelZoom={true}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
        />
        <FitBounds markers={markers} />

        {connections.map((c) => {
          const from = byId.get(c.fromId);
          const to = byId.get(c.toId);
          if (!from || !to) return null;
          const color = VERDICT_COLOR[c.verdict];
          return (
            <Polyline
              key={`${c.fromId}-${c.toId}`}
              positions={arcPoints([from.lat, from.lng], [to.lat, to.lng])}
              pathOptions={{
                color,
                weight: 1.2 + c.score * 3.5,
                opacity: 0.75,
                dashArray: c.verdict === "likely-coincidence" ? "4 7" : undefined,
              }}
            >
              <Popup>
                <div className="pop-title">
                  {from.title} ↔ {to.title}
                </div>
                <div className="pop-sub">
                  similarity{" "}
                  <b style={{ color }}>{(c.score * 100).toFixed(0)}%</b> —{" "}
                  {VERDICT_LABEL[c.verdict]}
                </div>
                {c.sharedTop.length > 0 && (
                  <div>shares: {c.sharedTop.join(", ")}</div>
                )}
              </Popup>
            </Polyline>
          );
        })}

        {origin.known && origin.lat !== undefined && origin.lng !== undefined && (
          <>
            <CircleMarker
              center={[origin.lat, origin.lng]}
              radius={16}
              pathOptions={{
                color: "#d4a951",
                weight: 1.5,
                dashArray: "3 5",
                fill: false,
              }}
            />
            <CircleMarker
              center={[origin.lat, origin.lng]}
              radius={6}
              pathOptions={{ color: "#d4a951", fillColor: "#d4a951", fillOpacity: 1 }}
            >
              <Popup>
                <div className="pop-title">Proposed origin</div>
                <div>{origin.region}</div>
              </Popup>
            </CircleMarker>
          </>
        )}

        {markers.map((m) => (
          <CircleMarker
            key={m.id}
            center={[m.lat, m.lng]}
            radius={m.isHub ? 10 : 7}
            pathOptions={{
              color: m.isHub ? "#ffffff" : accent,
              weight: m.isHub ? 2.5 : 1.5,
              fillColor: accent,
              fillOpacity: 0.9,
            }}
          >
            <Popup>
              <div className="pop-title">{m.title}</div>
              <div className="pop-sub">
                {m.cultureName} · {m.region}
                {m.isHub ? " · reference form" : ""}
              </div>
              <div className="pop-sub">{m.attestation}</div>
              <div>{m.summary}</div>
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>

      <div className="map-legend">
        <div className="row">
          <span className="swatch" style={{ background: "#d4a951" }} />
          proposed origin
        </div>
        <div className="row">
          <span className="swatch" style={{ background: accent }} />
          regional variant
        </div>
        {(
          [
            "likely-common-origin",
            "possible-connection",
            "superficial-resemblance",
            "likely-coincidence",
          ] as Verdict[]
        ).map((v) => (
          <div className="row" key={v}>
            <span
              className="line-swatch"
              style={{ background: VERDICT_COLOR[v] }}
            />
            {VERDICT_LABEL[v]}
          </div>
        ))}
      </div>
    </div>
  );
}
