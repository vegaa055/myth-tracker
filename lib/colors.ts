/** Per-myth-family accent colours used on maps and cards (client-safe). */
export const FAMILY_COLOR: Record<string, string> = {
  "seven-sisters": "#8ab4ff",
  "cosmic-hunt": "#b18bfa",
  "great-flood": "#34d0c3",
  "storm-serpent": "#f472b6",
  "orpheus-type": "#9ca3af",
  "fire-theft": "#fb923c",
};

export function familyColor(mythId: string): string {
  return FAMILY_COLOR[mythId] ?? "#d4a951";
}
