"""
AquaWatch SD — Anomaly Detection Script
========================================
Run this to analyze the raw SD dataset and print detected anomalies.
Also exports a processed JSON file usable by the React frontend.

Usage:
    pip install pandas
    python anomaly_detection.py

Input:  analyte_tests_effluent_datasd.csv  (place in same folder)
Output: processed_data.json
"""

import pandas as pd
import json
from pathlib import Path

# ── EPA Maximum Contaminant Levels (MCLs) ─────────────────────────────────
THRESHOLDS = {
    "Fluoride":   {"max": 4.0,  "unit": "MG/L"},
    "pH":         {"min": 6.5,  "max": 8.5, "unit": "pH"},
    "Total THMs": {"max": 80.0, "unit": "UG/L"},
    "Chlorate":   {"max": 800,  "unit": "UG/L"},
    "Chlorite":   {"max": 800,  "unit": "UG/L"},
    "Bromate":    {"max": 10,   "unit": "UG/L"},
    "Nitrate":    {"max": 10.0, "unit": "MG/L"},
}

def load_data(path="analyte_tests_effluent_datasd.csv"):
    df = pd.read_csv(path)
    df["analyte_value"] = pd.to_numeric(df["analyte_value"], errors="coerce")
    df["date_sample"]   = pd.to_datetime(df["date_sample"])
    df = df.dropna(subset=["analyte_value"])
    df["year_month"] = df["date_sample"].dt.to_period("M").astype(str)
    return df

def detect_anomalies(df):
    """Find readings that exceed EPA thresholds."""
    anomalies = []
    for analyte, bounds in THRESHOLDS.items():
        sub = df[df["analyte"] == analyte].copy()
        if sub.empty:
            continue

        violations = pd.DataFrame()
        if "max" in bounds:
            violations = pd.concat([violations, sub[sub["analyte_value"] > bounds["max"]]])
        if "min" in bounds:
            violations = pd.concat([violations, sub[sub["analyte_value"] < bounds["min"]]])

        for _, row in violations.iterrows():
            anomalies.append({
                "date":        str(row["date_sample"].date()),
                "analyte":     analyte,
                "value":       round(row["analyte_value"], 3),
                "unit":        bounds["unit"],
                "location":    row.get("source_description", "Unknown"),
                "sample_id":   row.get("sample_id", ""),
                "limit":       bounds.get("max", bounds.get("min")),
            })

    return sorted(anomalies, key=lambda x: x["date"], reverse=True)

def monthly_averages(df, analytes=None):
    """Compute monthly averages per analyte."""
    if analytes:
        df = df[df["analyte"].isin(analytes)]
    grouped = df.groupby(["year_month", "analyte"])["analyte_value"].mean().round(3)
    result  = {}
    for (ym, analyte), val in grouped.items():
        result.setdefault(analyte, {})[ym] = val
    return result

def dataset_summary(df):
    return {
        "total_readings": len(df),
        "date_range":     f"{df['date_sample'].min().date()} to {df['date_sample'].max().date()}",
        "analytes":       sorted(df["analyte"].unique().tolist()),
        "sites":          df["sample_source"].nunique(),
    }

def main():
    csv_path = Path("analyte_tests_effluent_datasd.csv")
    if not csv_path.exists():
        print("ERROR: analyte_tests_effluent_datasd.csv not found in current directory.")
        print("Download it from: https://data.sandiego.gov/datasets/analyte-tests-effluent/")
        return

    print("Loading data...")
    df = load_data(csv_path)

    print("\n── Dataset Summary ──────────────────────────────")
    summary = dataset_summary(df)
    for k, v in summary.items():
        print(f"  {k}: {v}")

    print("\n── Detected Anomalies (EPA threshold violations) ─")
    anomalies = detect_anomalies(df)
    print(f"  {len(anomalies)} violations found\n")
    for a in anomalies[:10]:  # Print first 10
        print(f"  [{a['date']}] {a['analyte']}: {a['value']} {a['unit']} "
              f"(limit: {a['limit']}) @ {a['location'][:50]}")

    print("\n── Computing monthly averages ────────────────────")
    key_analytes = list(THRESHOLDS.keys())
    monthly = monthly_averages(df, key_analytes)
    for analyte, data in monthly.items():
        print(f"  {analyte}: {len(data)} monthly data points")

    # Export JSON
    output = {
        "summary":   summary,
        "anomalies": anomalies,
        "monthly":   monthly,
    }
    out_path = "processed_data.json"
    with open(out_path, "w") as f:
        json.dump(output, f, indent=2, default=str)
    print(f"\n✅ Exported to {out_path}")
    print("   Import this JSON into your React app's data.js if needed.")

if __name__ == "__main__":
    main()
