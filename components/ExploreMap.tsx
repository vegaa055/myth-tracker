"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Polyline,
  Tooltip,
} from "react-leaflet";
import { arcPoints } from "@/lib/geo";
import { VERDICT_COLOR, VERDICT_LABEL } from "@/lib/similarity";
import type { Verdict } from "@/lib/types";
import "leaflet/dist/leaflet.css";

export interface ExploreConnection {
  otherId: string;
  title: string;
  region: string;
  mythName: string;
  sameFamily: boolean;
  score: number;
  verdict: Verdict;
  shared: string[];
}

export interface ExplorePoint {
  id: string;
  mythId: string;
  mythName: string;
  color: string;
  title: string;
  region: string;
  cultureName: string;
  culturePeriod: string;
  cultureDescription: string;
  lat: number;
  lng: number;
  attestation: string;
  summary: string;
  fullText: string;
  variations: string[];
  originText: string;
  motifs: { name: string; role: string; rare: boolean }[];
  connections: ExploreConnection[];
}

export interface ExploreMapProps {
  points: ExplorePoint[];
  families: { id: string; name: string; color: string }[];
}

export default function ExploreMap({ points, families }: ExploreMapProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const byId = useMemo(() => new Map(points.map((p) => [p.id, p])), [points]);
  const selected = selectedId ? byId.get(selectedId) ?? null : null;

  return (
    <div className="explore-layout">
      <div className="explore-map" style={{ position: "relative" }}>
        <MapContainer
          center={[24, 30]}
          zoom={2}
          minZoom={2}
          worldCopyJump
          style={{ height: "100%", width: "100%" }}
          scrollWheelZoom={true}
        >
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
          />

          {selected &&
            selected.connections.map((c) => {
              const other = byId.get(c.otherId);
              if (!other) return null;
              return (
                <Polyline
                  key={c.otherId}
                  positions={arcPoints(
                    [selected.lat, selected.lng],
                    [other.lat, other.lng]
                  )}
                  pathOptions={{
                    color: VERDICT_COLOR[c.verdict],
                    weight: 1.2 + c.score * 3.5,
                    opacity: 0.8,
                    dashArray:
                      c.verdict === "likely-coincidence" ? "4 7" : undefined,
                  }}
                />
              );
            })}

          {points.map((p) => {
            const isSelected = p.id === selectedId;
            const isConnected =
              selected?.connections.some((c) => c.otherId === p.id) ?? false;
            return (
              <CircleMarker
                key={p.id}
                center={[p.lat, p.lng]}
                radius={isSelected ? 10 : isConnected ? 8 : 6.5}
                pathOptions={{
                  color: isSelected ? "#ffffff" : p.color,
                  weight: isSelected ? 2.5 : 1.5,
                  fillColor: p.color,
                  fillOpacity: selected && !isSelected && !isConnected ? 0.45 : 0.95,
                }}
                eventHandlers={{ click: () => setSelectedId(p.id) }}
              >
                <Tooltip direction="top" offset={[0, -6]} opacity={0.95}>
                  <b>{p.title}</b>
                  <br />
                  {p.mythName} · {p.region}
                </Tooltip>
              </CircleMarker>
            );
          })}
        </MapContainer>

        <div className="map-legend">
          {families.map((f) => (
            <div className="row" key={f.id}>
              <span className="swatch" style={{ background: f.color }} />
              {f.name}
            </div>
          ))}
        </div>
      </div>

      <aside className="explore-panel">
        {!selected ? (
          <div className="empty-state">
            <span className="glyph">✦</span>
            Click any point to read the story told there — its accepted
            telling, its variations, its proposed origin, and every scored
            connection it has to other stories on the map.
          </div>
        ) : (
          <div key={selected.id}>
            <span
              className="family-tag"
              style={{ color: selected.color, borderColor: selected.color }}
            >
              {selected.mythName}
            </span>
            <h2>{selected.title}</h2>
            <div className="byline">
              {selected.cultureName} · {selected.region}
              <br />
              {selected.attestation}
            </div>

            <p style={{ fontSize: "0.92rem" }}>{selected.summary}</p>

            <details open>
              <summary
                style={{ cursor: "pointer", color: "#d4a951", fontSize: "0.88rem" }}
              >
                The accepted telling
              </summary>
              <div className="full-text">{selected.fullText}</div>
            </details>

            {selected.variations.length > 0 && (
              <>
                <h3>Known variations</h3>
                <ul className="variations">
                  {selected.variations.map((v, i) => (
                    <li key={i}>{v}</li>
                  ))}
                </ul>
              </>
            )}

            <h3>Point of origin</h3>
            <div className="origin-note">{selected.originText}</div>

            <h3>Motifs in this telling</h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
              {selected.motifs.map((m) => (
                <span
                  key={m.name}
                  className={`motif-chip ${m.rare ? "rare" : ""} role-${m.role}`}
                  title={`${m.role}${m.rare ? " · globally rare motif" : ""}`}
                >
                  {m.name}
                </span>
              ))}
            </div>

            <h3>Connections ({selected.connections.length})</h3>
            {selected.connections.length === 0 && (
              <div style={{ color: "#5f6c8c", fontSize: "0.85rem" }}>
                No meaningful motif overlap with any other story in the
                database — this telling stands alone.
              </div>
            )}
            {selected.connections.map((c) => (
              <div
                key={c.otherId}
                className="conn-item"
                onClick={() => setSelectedId(c.otherId)}
                title="Jump to this story"
              >
                <div className="conn-head">
                  <span className="conn-title">{c.title}</span>
                  <span
                    className="verdict"
                    style={{
                      color: VERDICT_COLOR[c.verdict],
                      borderColor: VERDICT_COLOR[c.verdict],
                    }}
                  >
                    <span className="dot" />
                    <span className="score-num">
                      {(c.score * 100).toFixed(0)}%
                    </span>
                  </span>
                </div>
                <div className="conn-sub">
                  {c.mythName}
                  {c.sameFamily ? "" : " (different family)"} · {c.region} ·{" "}
                  {VERDICT_LABEL[c.verdict]}
                </div>
                {c.shared.length > 0 && (
                  <div className="conn-sub">shares: {c.shared.join(", ")}</div>
                )}
              </div>
            ))}

            <h3>Go deeper</h3>
            <Link href={`/myth/${selected.mythId}`} style={{ fontSize: "0.88rem" }}>
              Open the full {selected.mythName} dossier →
            </Link>
          </div>
        )}
      </aside>
    </div>
  );
}
