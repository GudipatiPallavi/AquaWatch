// ─────────────────────────────────────────────────────────────────────────────
// REAL DATA — City of San Diego Open Data Portal
// Source: analyte_tests_effluent_datasd.csv  |  data.sandiego.gov
// 9,431 readings · Jan 2016 – Mar 2026 · 14 analytes
// ─────────────────────────────────────────────────────────────────────────────

export const MONTHLY_DATA = {
  Fluoride: {
    "2023-01": 0.779, "2023-02": 0.653, "2023-03": 0.622, "2023-04": 0.611,
    "2023-05": 0.562, "2023-06": 0.587, "2023-07": 0.571, "2023-08": 0.634,
    "2023-09": 0.653, "2023-10": 0.671, "2023-11": 0.669,
    "2024-01": 0.659, "2024-02": 0.604, "2024-03": 0.732, "2024-04": 0.651,
    "2024-05": 0.809, "2024-06": 0.802, "2024-07": 0.813, "2024-08": 0.810,
    "2024-09": 0.761, "2024-10": 0.756, "2024-11": 0.734, "2024-12": 0.737,
    "2025-01": 0.704, "2025-02": 0.730, "2025-03": 0.720, "2025-04": 0.704,
    "2025-05": 0.733, "2025-06": 0.708, "2025-07": 0.725, "2025-08": 0.726,
    "2025-09": 0.680, "2025-10": 0.671, "2025-11": 0.665, "2025-12": 0.629,
    "2026-01": 0.701, "2026-02": 0.736, "2026-03": 0.616,
  },
  pH: {
    "2023-01": 8.064, "2023-02": 7.970, "2023-03": 8.015, "2023-04": 7.919,
    "2023-05": 7.783, "2023-06": 7.823, "2023-07": 7.801, "2023-08": 7.779,
    "2023-09": 7.861, "2023-10": 7.812, "2023-11": 7.886,
    "2024-01": 8.063, "2024-02": 7.957, "2024-03": 8.002, "2024-04": 7.841,
    "2024-05": 7.953, "2024-06": 8.064, "2024-07": 7.867, "2024-08": 7.835,
    "2024-09": 7.866, "2024-10": 7.840, "2024-11": 7.955, "2024-12": 7.783,
    "2025-01": 7.813, "2025-02": 8.045, "2025-03": 7.844, "2025-04": 7.857,
    "2025-05": 7.909, "2025-06": 7.856, "2025-07": 7.824, "2025-08": 7.749,
    "2025-09": 7.796, "2025-10": 8.728, "2025-11": 7.903, "2025-12": 7.743,
    "2026-01": 7.890, "2026-02": 7.851,
  },
  "Total THMs": {
    "2023-01": 13.12, "2023-02": 9.036, "2023-03": 4.175, "2023-04": 9.746,
    "2023-05": 11.21, "2023-06": 14.647, "2023-07": 6.056, "2023-08": 16.525,
    "2023-09": 29.188, "2023-10": 14.548, "2023-11": 6.606, "2023-12": 19.278,
    "2024-01": 13.296, "2024-02": 5.618, "2024-03": 5.236, "2024-04": 3.968,
    "2024-05": 2.355, "2024-06": 13.304, "2024-07": 2.910, "2024-08": 8.443,
    "2024-09": 4.765, "2024-10": 4.002, "2024-11": 3.044, "2024-12": 5.340,
    "2025-01": 7.358, "2025-02": 18.069, "2025-03": 3.725, "2025-05": 4.068,
    "2025-06": 7.309, "2025-07": 10.322, "2025-08": 11.591, "2025-09": 13.675,
    "2025-10": 13.897, "2025-11": 17.481, "2025-12": 23.262,
    "2026-01": 14.483, "2026-02": 16.500,
  },
  Chlorate: {
    "2023-01": 127.84, "2023-02": 127.91, "2023-03": 138.96, "2023-04": 176.6,
    "2023-05": 179.7, "2023-06": 164.0, "2023-07": 152.33, "2023-08": 170.25,
    "2023-09": 150.75, "2023-10": 233.1, "2023-11": 247.2, "2023-12": 180.0,
    "2024-01": 143.33, "2024-02": 164.0, "2024-03": 159.4, "2024-04": 181.8,
    "2024-05": 199.8, "2024-06": 203.6, "2024-07": 201.0, "2024-08": 212.4,
    "2024-09": 169.0, "2024-10": 194.8, "2024-11": 178.0, "2024-12": 183.8,
    "2025-01": 135.2, "2025-02": 127.6, "2025-03": 154.4, "2025-04": 203.2,
    "2025-05": 237.2, "2025-06": 201.6, "2025-07": 186.0, "2025-08": 213.2,
    "2025-09": 218.8, "2025-10": 249.2, "2025-11": 264.8,
    "2026-01": 178.5, "2026-02": 157.6,
  },
  Chlorite: {
    "2023-01": 160.75, "2023-02": 260.92, "2023-03": 282.51, "2023-04": 379.9,
    "2023-05": 373.5, "2023-06": 386.0, "2023-07": 406.25, "2023-08": 324.38,
    "2023-09": 242.0, "2023-10": 364.4, "2023-11": 398.7, "2023-12": 379.5,
    "2024-01": 345.5, "2024-02": 453.25, "2024-03": 403.5, "2024-04": 376.5,
    "2024-05": 437.2, "2024-06": 315.0, "2024-07": 489.0, "2024-08": 489.4,
    "2024-09": 390.4, "2024-10": 492.0, "2024-11": 366.4, "2024-12": 366.6,
    "2025-01": 330.4, "2025-02": 206.4, "2025-03": 335.6, "2025-04": 263.4,
    "2025-05": 230.8, "2025-06": 240.2, "2025-07": 317.8, "2025-08": 331.4,
    "2025-09": 287.6, "2025-10": 421.6, "2025-11": 460.6,
    "2026-01": 173.75, "2026-02": 389.6,
  },
};

// EPA / regulatory thresholds
export const THRESHOLDS = {
  Fluoride:      { max: 4.0,  unit: "MG/L", safe: "< 4.0 MG/L (EPA MCL)",    color: "#06b6d4", icon: "💧" },
  pH:            { min: 6.5, max: 8.5, unit: "pH",   safe: "6.5 – 8.5 (EPA range)", color: "#8b5cf6", icon: "⚗️" },
  "Total THMs":  { max: 80,   unit: "UG/L", safe: "< 80 UG/L (EPA MCL)",      color: "#f59e0b", icon: "🧪" },
  Chlorate:      { max: 800,  unit: "UG/L", safe: "< 800 UG/L",               color: "#10b981", icon: "🔬" },
  Chlorite:      { max: 800,  unit: "UG/L", safe: "< 800 UG/L (EPA MCL)",     color: "#ec4899", icon: "⚠️" },
};

// Real anomalies detected from the dataset
export const ANOMALIES = [
  {
    date: "April 2021",
    analyte: "Total THMs",
    value: 166,
    unit: "UG/L",
    limit: 80,
    location: "OT Filter Plant (OT FP Filter Combined Filter Effluent)",
    severity: "danger",
    description: "Major THM spike reaching 166 UG/L — more than 2× the EPA Maximum Contaminant Level of 80 UG/L. Recorded across all OT Filter Plant monitoring points simultaneously.",
  },
  {
    date: "March 2017",
    analyte: "Chlorite",
    value: 980,
    unit: "UG/L",
    limit: 800,
    location: "Ocean View Hills Pkwy · Alta View Drive · Topsail Drive",
    severity: "danger",
    description: "Chlorite peaked at 980 UG/L across multiple South San Diego sites, exceeding the EPA MCL of 800 UG/L. The event lasted several days affecting three monitoring locations.",
  },
  {
    date: "September 2023",
    analyte: "Total THMs",
    value: 29.2,
    unit: "UG/L",
    limit: 80,
    location: "OT Filter Plant",
    severity: "warn",
    description: "Elevated THM reading of 29.2 UG/L — within legal limits but the highest monthly average of 2023. Warrants monitoring.",
  },
  {
    date: "October 2025",
    analyte: "pH",
    value: 8.728,
    unit: "pH",
    limit: 8.5,
    location: "Multiple sites",
    severity: "warn",
    description: "Elevated average pH of 8.728 logged in October 2025 — just above the EPA secondary standard of 8.5. A single sensor may have recorded 24.3 pH (likely instrument error).",
  },
  {
    date: "Nov–Dec 2025",
    analyte: "Chlorate",
    value: 264.8,
    unit: "UG/L",
    limit: 800,
    location: "Multiple sites",
    severity: "warn",
    description: "Chlorate readings trending upward through late 2025, peaking at 264.8 UG/L in November. Still within limits, but the upward trend over 12 months is worth monitoring.",
  },
];

// Dataset summary stats
export const DATASET_STATS = {
  totalReadings: 9431,
  dateRange: "Jan 2016 – Mar 2026",
  analytesTracked: 14,
  sitesMonitored: "80+",
  source: "data.sandiego.gov",
};
