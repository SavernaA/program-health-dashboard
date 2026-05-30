const STATUS_STYLES = {
  "On Track": { bg: "#EAF3DE", color: "#27500A" },
  "At Risk":  { bg: "#FAEEDA", color: "#633806" },
  Blocked:    { bg: "#FCEBEB", color: "#791F1F" },
};

const STATE_ICONS = {
  done:     { symbol: "✓", color: "#3B6D11" },
  active:   { symbol: "●", color: "#185FA5" },
  upcoming: { symbol: "○", color: "#aeaeb2" },
};

export default function TeamCard({ team, onCycleStatus }) {
  const { bg, color } = STATUS_STYLES[team.status];

  return (
    <div style={{
      background: "#fff",
      border: "0.5px solid #d2d2d7",
      borderRadius: 12,
      padding: "1rem 1.25rem",
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: "#1d1d1f" }}>{team.name}</div>
        <button
          onClick={onCycleStatus}
          style={{
            fontSize: 11, fontWeight: 600, padding: "3px 10px",
            borderRadius: 99, cursor: "pointer", border: "none",
            background: bg, color,
          }}
        >
          {team.status}
        </button>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
        {team.milestones.map((m) => {
          const { symbol, color: ic } = STATE_ICONS[m.state];
          return (
            <div key={m.name} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 12 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 7, color: "#6e6e73" }}>
                <span style={{ color: ic, fontWeight: 700, fontSize: 13 }}>{symbol}</span>
                {m.name}
              </div>
              <div style={{ color: "#aeaeb2" }}>{m.date}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
