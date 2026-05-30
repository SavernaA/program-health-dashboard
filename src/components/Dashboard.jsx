import { useState } from "react";
import { INITIAL_TEAMS, RISKS, PROGRAM_META, PHASES, CURRENT_PHASE, STATUS_CYCLE } from "../data";
import TeamCard from "./TeamCard";
import RiskRegister from "./RiskRegister";
import ExecutiveSummary from "./ExecutiveSummary";

function getProgramHealth(teams) {
  if (teams.some((t) => t.status === "Blocked")) return "Blocked";
  if (teams.some((t) => t.status === "At Risk")) return "At Risk";
  return "On Track";
}

const healthStyles = {
  "On Track": { dot: "#639922", label: "On Track" },
  "At Risk":  { dot: "#EF9F27", label: "Monitoring" },
  Blocked:    { dot: "#E24B4A", label: "At Risk" },
};

export default function Dashboard() {
  const [teams, setTeams] = useState(INITIAL_TEAMS);
  const health = getProgramHealth(teams);
  const { dot, label } = healthStyles[health];

  function cycleStatus(id) {
    setTeams((prev) =>
      prev.map((t) => {
        if (t.id !== id) return t;
        const idx = STATUS_CYCLE.indexOf(t.status);
        return { ...t, status: STATUS_CYCLE[(idx + 1) % STATUS_CYCLE.length] };
      })
    );
  }

  const onTrackCount = teams.filter((t) => t.status === "On Track").length;

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif" }}>

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.5rem" }}>
        <div>
          <div style={{ fontSize: 22, fontWeight: 600, color: "#1d1d1f" }}>{PROGRAM_META.name}</div>
          <div style={{ fontSize: 13, color: "#6e6e73", marginTop: 4 }}>
            {PROGRAM_META.org} · Week {PROGRAM_META.week} of {PROGRAM_META.totalWeeks}
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, background: "#fff", border: "0.5px solid #d2d2d7", borderRadius: 10, padding: "8px 14px" }}>
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: dot }} />
          <span style={{ fontSize: 13, color: "#1d1d1f" }}>Program Health: {label}</span>
        </div>
      </div>

      {/* Phase Bar */}
      <div style={{ display: "flex", borderRadius: 10, overflow: "hidden", border: "0.5px solid #d2d2d7", marginBottom: "1.5rem" }}>
        {PHASES.map((phase, i) => {
          const isDone = i < CURRENT_PHASE;
          const isActive = i === CURRENT_PHASE;
          return (
            <div key={phase} style={{
              flex: 1, padding: "9px 0", textAlign: "center", fontSize: 13, fontWeight: 500,
              borderRight: i < PHASES.length - 1 ? "0.5px solid #d2d2d7" : "none",
              background: isDone ? "#3B6D11" : isActive ? "#185FA5" : "#f5f5f7",
              color: isDone || isActive ? "#fff" : "#6e6e73",
            }}>
              {phase}
            </div>
          );
        })}
      </div>

      {/* Metrics */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: "1.5rem" }}>
        {[
          { label: "Teams on track", value: `${onTrackCount} / 4`, sub: `${Math.round((onTrackCount/4)*100)}% green` },
          { label: "Open risks", value: RISKS.length, sub: "1 high impact" },
          { label: "Milestones due", value: PROGRAM_META.milestonesNext14Days, sub: "Next 14 days" },
          { label: "Days to release", value: PROGRAM_META.daysToRelease, sub: `Target: ${PROGRAM_META.releaseDate}` },
        ].map((m) => (
          <div key={m.label} style={{ background: "#f5f5f7", borderRadius: 10, padding: "1rem" }}>
            <div style={{ fontSize: 12, color: "#6e6e73", marginBottom: 6 }}>{m.label}</div>
            <div style={{ fontSize: 22, fontWeight: 600, color: "#1d1d1f" }}>{m.value}</div>
            <div style={{ fontSize: 11, color: "#aeaeb2", marginTop: 3 }}>{m.sub}</div>
          </div>
        ))}
      </div>

      {/* Teams */}
      <div style={{ fontSize: 11, fontWeight: 600, color: "#aeaeb2", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 10 }}>
        Team milestone status — click status to cycle
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: "1.5rem" }}>
        {teams.map((team) => (
          <TeamCard key={team.id} team={team} onCycleStatus={() => cycleStatus(team.id)} />
        ))}
      </div>

      {/* Risk Register */}
      <RiskRegister risks={RISKS} />

      {/* Executive Summary */}
      <ExecutiveSummary teams={teams} />
    </div>
  );
}
