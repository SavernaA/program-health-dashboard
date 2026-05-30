import { useState } from "react";

export default function ExecutiveSummary({ teams }) {
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function generateSummary() {
    setLoading(true);
    setError("");
    setSummary("");

    const onTrack = teams.filter((t) => t.status === "On Track").map((t) => t.name);
    const atRisk  = teams.filter((t) => t.status === "At Risk").map((t) => t.name);
    const blocked = teams.filter((t) => t.status === "Blocked").map((t) => t.name);

    const prompt = `You are an Engineering Program Manager at Apple writing a concise executive status update for VP-level leadership. Write 3-4 sentences in a professional, direct Apple tone. No bullet points. No headers. No fluff. Just the update.

Program: iOS 20 OS Release — Week 24 of 52, currently in Convergence phase. Target release: September 12.

Team status:
- On Track: ${onTrack.join(", ") || "none"}
- At Risk: ${atRisk.join(", ") || "none"}
- Blocked: ${blocked.join(", ") || "none"}

Key risks: Accessibility audit failures blocking convergence gate (High impact), VoiceOver regression in Settings with unknown root cause (Medium), device validation coverage gap on iPad mini (Low).

Write the executive summary now:`;

    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [{ role: "user", content: prompt }],
        }),
      });
      const data = await res.json();
      const text = data.content?.find((b) => b.type === "text")?.text;
      if (text) {
        setSummary(text);
      } else {
        setError("No response received. Check your API key.");
      }
    } catch (e) {
      setError("Unable to reach Claude API. Make sure VITE_ANTHROPIC_API_KEY is set in your .env file.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ background: "#fff", border: "0.5px solid #d2d2d7", borderRadius: 12, padding: "1.25rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 14, fontWeight: 600, color: "#1d1d1f" }}>Executive summary</span>
          <span style={{ fontSize: 11, background: "#E6F1FB", color: "#0C447C", padding: "2px 9px", borderRadius: 99, fontWeight: 600 }}>
            Claude API
          </span>
        </div>
        <button
          onClick={generateSummary}
          disabled={loading}
          style={{
            fontSize: 13, padding: "6px 14px", borderRadius: 8, cursor: loading ? "default" : "pointer",
            border: "0.5px solid #d2d2d7", background: loading ? "#f5f5f7" : "#fff",
            color: loading ? "#aeaeb2" : "#1d1d1f", fontWeight: 500,
          }}
        >
          {loading ? "Generating..." : "Generate summary"}
        </button>
      </div>
      <div style={{ fontSize: 14, lineHeight: 1.7, color: summary ? "#1d1d1f" : "#aeaeb2", fontStyle: summary ? "normal" : "italic" }}>
        {error
          ? <span style={{ color: "#A32D2D" }}>{error}</span>
          : summary
          ? summary
          : "Click \"Generate summary\" to produce an AI-powered VP-ready executive status update based on current program health."}
      </div>
    </div>
  );
}
