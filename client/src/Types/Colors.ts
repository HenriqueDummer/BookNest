export const accentColors = [
  "rgba(249,115,22)",
  "rgba(30, 144, 255)",
  "rgba(60, 179, 113)",
  "rgba(255, 140, 0)",
  "rgba(220, 20, 60)",
  "rgba(0, 191, 255)",
  "rgba(255, 99, 71)",
  "rgba(148, 0, 211)",
  "rgba(72, 61, 139)",
  "rgba(46, 139, 87)",
] as const;

export type AccentColor = typeof accentColors[number];
