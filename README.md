# 💧 AquaWatch SD
### AI-Powered Water Quality Monitor for San Diego Residents

> Built at the **Claude Community × City of San Diego Impact Lab Hackathon** · March 7, 2026

---

## Team
**Team Name:** AquaWatch SD  
**Team Members:** Pallavi Gudipati — Builder

---

## Problem Statement
San Diego publishes water quality monitoring data — but it is effectively invisible to the public. The City's effluent dataset contains 9,431 chemical readings across 14 analytes spanning a decade, yet readings like "Chlorite: 489 UG/L" or "Total THMs: 29.2 UG/L" are meaningless to most residents. Anomalies — like the 2021 spike to 166 UG/L of Total THMs (2× the EPA limit) — are buried in raw CSVs with no public-facing alert or explanation. This is a civic transparency and public health equity problem. The data exists — it's just inaccessible.

---

## What It Does
AquaWatch SD transforms San Diego's raw water quality data into a clear, interactive, AI-powered dashboard. It ingests and processes the City's real effluent monitoring dataset, visualizes 10 years of monthly chemical trends, detects anomalies where readings approach or exceed EPA Maximum Contaminant Levels, and uses the Claude AI API to generate plain-English explanations of any reading — so any resident can understand whether their water was safe, without needing a chemistry degree.

---

## Data Sources
| Dataset | Source | Usage |
|---------|--------|-------|
| Analyte Tests Effluent | [https://data.sandiego.gov/datasets/monitoring-analytes-plant-effluent/] | Primary dataset — 9,431 readings, 14 analytes, 2016–2026 |
| EPA MCL Reference Standards | US EPA | Threshold benchmarks for anomaly detection |

---

## Architecture
```
data.sandiego.gov (analyte_tests_effluent_datasd.csv)
        ↓
Python + Pandas (backend/anomaly_detection.py)
  • Data cleaning & normalization
  • ND (non-detect) handling
  • Monthly aggregation per analyte
  • EPA threshold comparison
        ↓
React Dashboard (src/)
  • Interactive area & bar charts (Recharts)
  • Metric cards with live status badges
  • Anomaly timeline log
        ↓
Claude AI API
  • On-demand plain-English explanations
  • Contextualized for non-technical SD residents
```

---

## Quick Start (VS Code)

### Prerequisites
- Node.js 18+ → https://nodejs.org
- Git → https://git-scm.com
- An Anthropic API key → https://console.anthropic.com

### Steps

```bash
# 1. Clone the repo
git clone https://github.com/GudipatiPallavi/AquaWatch.git
cd aquawatch-sd

# 2. Install dependencies
npm install

# 3. Set up your API key
cp .env.example .env
# Open .env in VS Code and replace the placeholder with your real API key

# 4. Run the app
npm start
# Opens at http://localhost:3000
```

### Run Python Anomaly Detection (optional)
```bash
cd backend
pip install pandas
# Place analyte_tests_effluent_datasd.csv in this folder
python anomaly_detection.py
```

---

## Deployment (Vercel — free, ~2 minutes)

```bash
npm install -g vercel
vercel deploy
```

When prompted, add `REACT_APP_ANTHROPIC_API_KEY` as an environment variable in the Vercel dashboard.

---

## Links
- **GitHub:** _[(https://github.com/GudipatiPallavi/AquaWatch/tree/master)]_
- **Dataset:** https://data.sandiego.gov/datasets/monitoring-analytes-plant-effluent/
- **Demo Video:** [ https://drive.google.com/file/d/1s2anB9zRsfbrpHhuMABENtTEKq4QYMie/view?usp=sharing ]

---

*AquaWatch SD · Claude Community × City of San Diego Impact Lab · March 2026*
