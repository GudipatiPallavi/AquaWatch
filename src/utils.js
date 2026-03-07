import { THRESHOLDS, MONTHLY_DATA } from './data';

// Get the most recent value for an analyte
export function getLatestValue(analyte) {
  const raw = MONTHLY_DATA[analyte] || {};
  const keys = Object.keys(raw).sort();
  if (!keys.length) return null;
  return raw[keys[keys.length - 1]];
}

// Determine status of a reading
export function getStatus(analyte, value) {
  const t = THRESHOLDS[analyte];
  if (!t || value === null || value === undefined) return "normal";

  // pH: both min and max thresholds
  if (analyte === "pH") {
    if (value < t.min || value > t.max) return "danger";
    if (value < t.min + 0.3 || value > t.max - 0.3) return "warn";
    return "normal";
  }

  // Standard: max threshold
  if (t.max) {
    if (value >= t.max) return "danger";
    if (value >= t.max * 0.85) return "warn";
  }
  return "normal";
}

// Convert MONTHLY_DATA object → chart array
export function buildChartData(analyte) {
  const raw = MONTHLY_DATA[analyte] || {};
  return Object.entries(raw)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([ym, value]) => ({
      month: ym,
      label: ym.slice(2), // "23-01"
      value,
    }));
}

// Status visual config
export const STATUS_CONFIG = {
  normal: {
    label: "NORMAL",
    badgeClass: "badge-normal",
    bgColor: "rgba(6,182,212,0.08)",
    borderColor: "rgba(6,182,212,0.35)",
    textColor: "#22d3ee",
    emoji: "✅",
  },
  warn: {
    label: "ELEVATED",
    badgeClass: "badge-warn",
    bgColor: "rgba(245,158,11,0.08)",
    borderColor: "rgba(245,158,11,0.35)",
    textColor: "#fbbf24",
    emoji: "⚠️",
  },
  danger: {
    label: "ALERT",
    badgeClass: "badge-danger",
    bgColor: "rgba(239,68,68,0.08)",
    borderColor: "rgba(239,68,68,0.35)",
    textColor: "#f87171",
    emoji: "🚨",
  },
};
