"use client";

import dynamic from "next/dynamic";
import type { MythMapProps } from "./MythMap";

const MythMap = dynamic(() => import("./MythMap"), {
  ssr: false,
  loading: () => (
    <div
      style={{
        height: 520,
        display: "grid",
        placeItems: "center",
        color: "#5f6c8c",
      }}
    >
      Charting the sky…
    </div>
  ),
});

export default function MythMapLoader(props: MythMapProps) {
  return <MythMap {...props} />;
}
