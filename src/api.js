// ─────────────────────────────────────────────────────────────────────────────
// Claude API Integration
// NOTE: For production, move this to a backend server (Node/Express or Python)
// so your API key is never exposed in the browser.
// For hackathon demo, set REACT_APP_ANTHROPIC_API_KEY in your .env file.
// ─────────────────────────────────────────────────────────────────────────────

export async function getWaterInsight(analyte, value, unit, status, safeRange) {
  const apiKey = process.env.REACT_APP_ANTHROPIC_API_KEY;

  if (!apiKey) {
    return "⚠️ Add your REACT_APP_ANTHROPIC_API_KEY to the .env file to enable AI insights. See README for instructions.";
  }

  const prompt = `You are AquaWatch SD — a friendly, trustworthy AI water quality assistant for San Diego residents. You explain city water monitoring data in plain English.

Current reading from San Diego's official monitoring data:
- Chemical: ${analyte}
- Value: ${value} ${unit}  
- Status: ${status.toUpperCase()}
- Safe range: ${safeRange}
- Data source: City of San Diego Open Data Portal (data.sandiego.gov)

Write 2–3 clear, friendly sentences for a regular San Diego resident (not a scientist):
1. What this reading actually means in plain English
2. Whether they should be concerned right now (be honest but calm)
3. One reassurance or practical takeaway

Rules: No jargon. No "As an AI". Keep it conversational and direct. If status is NORMAL, be reassuring. If ELEVATED or ALERT, be honest but not alarmist.`;

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
        "anthropic-dangerous-direct-browser-access": "true",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 200,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    if (!response.ok) {
      const err = await response.json();
      console.error("API error:", err);
      return `API error: ${err.error?.message || "Unknown error. Check your API key."}`;
    }

    const data = await response.json();
    return data.content?.[0]?.text || "No insight returned.";
  } catch (error) {
    console.error("Fetch error:", error);
    return "Could not connect to AI service. Check your internet connection and API key.";
  }
}
