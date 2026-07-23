"use client";

import dynamic from "next/dynamic";
import type { ExploreMapProps } from "./ExploreMap";

const ExploreMap = dynamic(() => import("./ExploreMap"), {
  ssr: false,
  loading: () => (
    <div
      style={{
        height: "calc(100vh - 57px)",
        display: "grid",
        placeItems: "center",
        color: "#5f6c8c",
      }}
    >
      Charting the world…
    </div>
  ),
});

export default function ExploreMapLoader(props: ExploreMapProps) {
  return <ExploreMap {...props} />;
}
