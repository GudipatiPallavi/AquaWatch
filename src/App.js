import { useState } from "react";
import {
  AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ReferenceLine,
} from "recharts";
import "./App.css";
import { THRESHOLDS, ANOMALIES, DATASET_STATS } from "./data";
import { getLatestValue, getStatus, buildChartData, STATUS_CONFIG } from "./utils";
import { getWaterInsight } from "./api";

// ─── Custom Recharts Tooltip ───────────────────────────────────────────────
function CustomTooltip({ active, payload, label, unit, color }) {
  if (!active || !payload?.length) return null;
  const val = payload[0]?.value;
  return (
    <div className="custom-tooltip">
      <div className="tooltip-label">{label}</div>
      <div className="tooltip-value" style={{ color }}>
        {typeof val === "number" ? val.toFixed(3) : val} {unit}
      </div>
    </div>
  );
}

// ─── Metric Card ───────────────────────────────────────────────────────────
function MetricCard({ analyte, selected, onSelect }) {
  const val    = getLatestValue(analyte);
  const status = getStatus(analyte, val);
  const t      = THRESHOLDS[analyte];
  const sc     = STATUS_CONFIG[status];

  return (
    <button
      className={`metric-card ${selected ? "selected" : ""}`}
      onClick={() => onSelect(analyte)}
      style={{
        borderColor: selected ? sc.borderColor : undefined,
        background:  selected ? sc.bgColor : undefined,
        boxShadow:   selected ? `0 0 18px ${sc.borderColor}` : undefined,
      }}
    >
      <div className="metric-top">
        <span className="metric-label">{t.icon} {analyte}</span>
        <span className={`badge badge-${status}`}>{sc.label}</span>
      </div>
      <div>
        <span className="metric-value" style={{ color: t.color }}>
          {val !== null ? val.toFixed(3) : "—"}
        </span>
        <span className="metric-unit">{t.unit}</span>
      </div>
      <div className="metric-safe">{t.safe}</div>
    </button>
  );
}

// ─── AI Panel ──────────────────────────────────────────────────────────────
function AIPanel({ analyte }) {
  const [insight, setInsight]   = useState("");
  const [loading, setLoading]   = useState(false);

  const val    = getLatestValue(analyte);
  const status = getStatus(analyte, val);
  const t      = THRESHOLDS[analyte];
  const sc     = STATUS_CONFIG[status];

  async function handleInsight() {
    setLoading(true);
    setInsight("");
    const text = await getWaterInsight(analyte, val?.toFixed(3), t.unit, sc.label, t.safe);
    setInsight(text);
    setLoading(false);
  }

  // Reset insight when analyte changes
  // (simple approach: key on analyte in parent)
  return (
    <div className="card ai-panel">
      <div>
        <div className="ai-panel-title">✦ AI Insight</div>
        <div className="ai-panel-sub">Plain-English explanation · Powered by Claude</div>
      </div>

      <div
        className="ai-reading-box"
        style={{ background: sc.bgColor, border: `1px solid ${sc.borderColor}` }}
      >
        <div className="ai-reading-label">Latest Reading</div>
        <div>
          <span className="ai-reading-value" style={{ color: t.color }}>
            {val !== null ? val.toFixed(3) : "—"}
          </span>
          <span className="ai-reading-unit">{t.unit}</span>
        </div>
        <div style={{ marginTop: 6 }}>
          <span className={`badge badge-${status}`}>{sc.emoji} {sc.label}</span>
        </div>
      </div>

      <div className="ai-safe-text">
        Safe limit: <span className="ai-safe-val">{t.safe}</span>
      </div>

      {insight
        ? <div className="ai-result">{insight}</div>
        : <div className="ai-placeholder">
            {loading
              ? "⏳ Analyzing reading..."
              : "Click below for an AI-powered explanation written for San Diego residents"}
          </div>
      }

      <button className="ai-btn" onClick={handleInsight} disabled={loading}>
        {loading ? "⏳ Analyzing..." : insight ? "🔄 Re-analyze" : "✦ Explain This Reading"}
      </button>
    </div>
  );
}

// ─── Dashboard Tab ─────────────────────────────────────────────────────────
function DashboardTab() {
  const [selected, setSelected] = useState("Total THMs");
  const chartData = buildChartData(selected);
  const t = THRESHOLDS[selected];

  return (
    <>
      {/* Metric Cards */}
      <div className="metric-grid">
        {Object.keys(THRESHOLDS).map((a) => (
          <MetricCard key={a} analyte={a} selected={selected === a} onSelect={setSelected} />
        ))}
      </div>

      {/* Chart + AI */}
      <div className="dashboard-main">
        <div className="card">
          <div className="chart-header">
            <div>
              <div className="chart-title">{selected}</div>
              <div className="chart-sub">Monthly avg · 2023–2026 · {t.unit}</div>
            </div>
            <div className="chart-count">{chartData.length} data points</div>
          </div>

          <ResponsiveContainer width="100%" height={230}>
            <AreaChart data={chartData} margin={{ top: 5, right: 8, bottom: 5, left: 0 }}>
              <defs>
                <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor={t.color} stopOpacity={0.28} />
                  <stop offset="95%" stopColor={t.color} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="rgba(148,163,184,0.06)" />
              <XAxis
                dataKey="label"
                tick={{ fontSize: 9, fill: "#64748b" }}
                interval={5}
              />
              <YAxis tick={{ fontSize: 9, fill: "#64748b" }} width={48} />
              <Tooltip content={<CustomTooltip unit={t.unit} color={t.color} />} />
              {t.max && (
                <ReferenceLine
                  y={t.max}
                  stroke="#ef4444"
                  strokeDasharray="5 3"
                  label={{ value: `EPA MCL ${t.max}`, fill: "#ef4444", fontSize: 9, position: "insideTopRight" }}
                />
              )}
              {t.max && (
                <ReferenceLine
                  y={t.max * 0.85}
                  stroke="#f59e0b"
                  strokeDasharray="3 3"
                  label={{ value: "85%", fill: "#f59e0b", fontSize: 8, position: "insideTopRight" }}
                />
              )}
              <Area
                type="monotone"
                dataKey="value"
                stroke={t.color}
                strokeWidth={2}
                fill="url(#grad)"
                dot={false}
                activeDot={{ r: 4, fill: t.color }}
              />
            </AreaChart>
          </ResponsiveContainer>
          <div className="chart-source">
            Source: City of San Diego · Analyte Tests Effluent · data.sandiego.gov
          </div>
        </div>

        {/* AI panel keyed on selected so it resets between analytes */}
        <AIPanel key={selected} analyte={selected} />
      </div>

      {/* Stats row */}
      <div className="stats-row">
        {[
          { label: "Total Readings",    val: "9,431",   sub: "2016 – 2026" },
          { label: "Analytes Tracked",  val: "14",      sub: "Chemical parameters" },
          { label: "Sites Monitored",   val: "80+",     sub: "Across San Diego" },
          { label: "Anomalies Detected",val: "5",       sub: "From full dataset" },
        ].map((s) => (
          <div key={s.label} className="card stat-card">
            <div className="stat-label">{s.label}</div>
            <div className="stat-val">{s.val}</div>
            <div className="stat-sub">{s.sub}</div>
          </div>
        ))}
      </div>
    </>
  );
}

// ─── Anomalies Tab ─────────────────────────────────────────────────────────
function AnomaliesTab() {
  const chloriteData = buildChartData("Chlorite").slice(-24);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div className="card">
        <div className="chart-title" style={{ marginBottom: 4 }}>Detected Anomalies</div>
        <div style={{ fontSize: 12, color: "#64748b", marginBottom: 20 }}>
          Events where analyte levels exceeded or approached EPA Maximum Contaminant Levels — detected via statistical analysis of the SD effluent dataset.
        </div>
        <div className="anomaly-list">
          {ANOMALIES.map((a, i) => {
            const sc = STATUS_CONFIG[a.severity];
            const t  = THRESHOLDS[a.analyte];
            return (
              <div
                key={i}
                className="anomaly-item"
                style={{ background: sc.bgColor, border: `1px solid ${sc.borderColor}` }}
              >
                <div className="anomaly-icon">{a.severity === "danger" ? "🚨" : "⚠️"}</div>
                <div style={{ flex: 1 }}>
                  <div className="anomaly-header">
                    <span className="anomaly-name">{a.analyte}</span>
                    <span className="anomaly-date">{a.date}</span>
                    <span className="anomaly-val" style={{ color: sc.textColor }}>
                      {a.value} {a.unit}
                    </span>
                    <span className="anomaly-limit">Limit: {a.limit} {a.unit}</span>
                    <span className={`badge badge-${a.severity}`}>{sc.label}</span>
                  </div>
                  <div className="anomaly-desc">{a.description}</div>
                  <div className="anomaly-loc">📍 {a.location}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Chlorite trend bar chart */}
      <div className="card">
        <div className="chart-title" style={{ marginBottom: 4 }}>Chlorite Trend (last 24 months)</div>
        <div style={{ fontSize: 12, color: "#64748b", marginBottom: 16 }}>
          Avg monthly Chlorite levels. EPA MCL = 800 UG/L. 2017 spike reached 980 UG/L.
        </div>
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={chloriteData} margin={{ top: 5, right: 8, bottom: 20, left: 0 }}>
            <CartesianGrid stroke="rgba(148,163,184,0.06)" vertical={false} />
            <XAxis
              dataKey="label"
              tick={{ fontSize: 8, fill: "#64748b" }}
              angle={-45}
              textAnchor="end"
              interval={2}
            />
            <YAxis tick={{ fontSize: 9, fill: "#64748b" }} width={48} />
            <Tooltip content={<CustomTooltip unit="UG/L" color="#ec4899" />} />
            <ReferenceLine y={800} stroke="#ef4444" strokeDasharray="4 3"
              label={{ value: "MCL 800", fill: "#ef4444", fontSize: 9 }} />
            <Bar dataKey="value" fill="#ec4899" fillOpacity={0.7} radius={[3, 3, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// ─── About Tab ──────────────────────────────────────────────────────────────
function AboutTab() {
  const arch = [
    ["📡", "Data Source",        "City of San Diego Open Data Portal · analyte_tests_effluent_datasd.csv · data.sandiego.gov"],
    ["🐍", "Processing",         "Python + Pandas — data cleaning, normalization, ND handling, monthly aggregation"],
    ["📊", "Anomaly Detection",  "Statistical threshold analysis comparing readings against EPA Maximum Contaminant Levels"],
    ["⚛️", "Dashboard",          "React + Recharts — interactive area & bar charts, analyte selector, status badges"],
    ["🤖", "AI Explanation",     "Claude API (claude-sonnet-4-20250514) — on-demand plain-English explanations per reading"],
  ];

  return (
    <div className="card">
      <div className="about-section">
        <h2>About AquaWatch SD</h2>
        <p className="about-body">
          San Diego publishes water quality monitoring data — but it's invisible to most residents.
          The City's effluent dataset contains 9,431 chemical readings across 14 analytes spanning
          a decade, yet readings like "Chlorite: 489 UG/L" are meaningless to non-scientists.
          AquaWatch SD makes this data accessible, understandable, and actionable for every resident.
        </p>
      </div>

      <div className="divider" />

      <div className="about-section">
        <h2>Architecture</h2>
        {arch.map(([icon, label, desc]) => (
          <div key={label} className="arch-row">
            <span className="arch-icon">{icon}</span>
            <div>
              <span className="arch-label">{label}: </span>
              <span className="arch-desc">{desc}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="divider" />

      <div className="about-section">
        <h2>Dataset</h2>
        <div className="dataset-box">
          <strong>analyte_tests_effluent_datasd.csv</strong><br />
          {DATASET_STATS.totalReadings.toLocaleString()} readings · {DATASET_STATS.dateRange}<br />
          {DATASET_STATS.analytesTracked} analytes: Fluoride, pH, Total THMs, Chlorate, Chlorite,
          Bromide, Chloride, Sulfate, Nitrate, Bromate, Ortho Phosphate, and more<br />
          {DATASET_STATS.sitesMonitored} monitoring sites across San Diego<br />
          Source: City of San Diego Public Utilities · {DATASET_STATS.source}
        </div>
      </div>

      <div className="divider" />

      <div className="about-section" style={{ marginBottom: 0 }}>
        <h2>Team</h2>
        <p className="about-body">
          <strong style={{ color: "#e2e8f0" }}>AquaWatch SD</strong> — Built at the Claude Community × City of San Diego Impact Lab Hackathon, March 7, 2026.<br />
          <span>Pallavi Gudipati · Builder</span>
        </p>
      </div>
    </div>
  );
}

// ─── Root App ───────────────────────────────────────────────────────────────
export default function App() {
  const [tab, setTab] = useState("dashboard");
  const tabs = ["dashboard", "anomalies", "about"];

  return (
    <div className="app-wrapper">
      {/* Ambient glow */}
      <div className="ambient-glow">
        <div className="glow-1" />
        <div className="glow-2" />
      </div>

      <div className="container">
        {/* Header */}
        <div className="header">
          <div className="header-left">
            <div className="logo-row">
              <div className="logo-icon">💧</div>
              <h1 className="app-title">
                Aqua<span className="title-watch">Watch</span>{" "}
                <span className="title-sd">SD</span>
              </h1>
            </div>
            <div className="app-subtitle">
              San Diego Water Quality Monitor · Real data from data.sandiego.gov
            </div>
          </div>
          <div className="header-right">
            <div className="data-date">Data through</div>
            <div className="data-date-val">Mar 2026</div>
            <div className="data-count">9,431 readings · 10 years</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="tab-bar">
          {tabs.map((t) => (
            <button
              key={t}
              className={`tab-btn ${tab === t ? "active" : ""}`}
              onClick={() => setTab(t)}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Tab content */}
        {tab === "dashboard"  && <DashboardTab />}
        {tab === "anomalies"  && <AnomaliesTab />}
        {tab === "about"      && <AboutTab />}

        {/* Footer */}
        <div className="footer">
          Built at Claude Community × City of San Diego Impact Lab · Data: data.sandiego.gov · AI: Anthropic Claude API
        </div>
      </div>
    </div>
  );
}
