/**
 * Great-arc-ish curved polylines for Leaflet (client-safe, no deps).
 * Produces a gentle quadratic arc between two points, taking the short way
 * around the antimeridian (endpoint longitudes are adjusted by ±360 so
 * Bering-strait connections don't streak across the whole map).
 */
export type LatLng = [number, number];

export function shortestLng(fromLng: number, toLng: number): number {
  let d = toLng - fromLng;
  if (d > 180) return toLng - 360;
  if (d < -180) return toLng + 360;
  return toLng;
}

export function arcPoints(a: LatLng, b: LatLng, segments = 48): LatLng[] {
  const [lat1, lng1] = a;
  const lat2 = b[0];
  const lng2 = shortestLng(lng1, b[1]);

  const dx = lng2 - lng1;
  const dy = lat2 - lat1;
  const dist = Math.sqrt(dx * dx + dy * dy);
  if (dist < 0.01) return [a, [lat2, lng2]];

  // Perpendicular unit vector; bow the arc toward the nearer pole slightly.
  const nx = -dy / dist;
  const ny = dx / dist;
  const bow = Math.min(dist * 0.18, 14);

  const pts: LatLng[] = [];
  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const lift = Math.sin(Math.PI * t) * bow;
    const lat = lat1 + dy * t + nx * lift;
    const lng = lng1 + dx * t + ny * lift;
    pts.push([Math.max(-85, Math.min(85, lat)), lng]);
  }
  return pts;
}
