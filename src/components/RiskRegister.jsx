const IMPACT_STYLES = {
  High:   { color: "#A32D2D", weight: 600 },
  Medium: { color: "#854F0B", weight: 600 },
  Low:    { color: "#3B6D11", weight: 600 },
};

export default function RiskRegister({ risks }) {
  return (
    <div style={{ marginBottom: "1.5rem" }}>
      <div style={{ fontSize: 11, fontWeight: 600, color: "#aeaeb2", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 10 }}>
        Risk register
      </div>
      <div style={{ background: "#fff", border: "0.5px solid #d2d2d7", borderRadius: 12, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: "0.5px solid #d2d2d7" }}>
              {["Risk", "Owner", "Impact", "Mitigation"].map((h) => (
                <th key={h} style={{ textAlign: "left", padding: "8px 14px", fontSize: 11, fontWeight: 600, color: "#6e6e73", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {risks.map((r, i) => {
              const { color, weight } = IMPACT_STYLES[r.impact];
              return (
                <tr key={r.id} style={{ borderBottom: i < risks.length - 1 ? "0.5px solid #f2f2f7" : "none" }}>
                  <td style={{ padding: "11px 14px", color: "#1d1d1f", maxWidth: 200 }}>{r.description}</td>
                  <td style={{ padding: "11px 14px", color: "#6e6e73" }}>{r.owner}</td>
                  <td style={{ padding: "11px 14px", color, fontWeight: weight }}>{r.impact}</td>
                  <td style={{ padding: "11px 14px", color: "#6e6e73", maxWidth: 220 }}>{r.mitigation}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
