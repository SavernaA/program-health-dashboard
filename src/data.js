export const PHASES = ["Planning", "Development", "Convergence", "Release"];
export const CURRENT_PHASE = 2; // 0-indexed, Convergence

export const STATUS_CYCLE = ["On Track", "At Risk", "Blocked"];

export const INITIAL_TEAMS = [
  {
    id: 1,
    name: "Frameworks & APIs",
    status: "On Track",
    milestones: [
      { name: "API freeze", date: "Jun 2", state: "done" },
      { name: "Internal beta", date: "Jun 20", state: "active" },
      { name: "Convergence gate", date: "Jul 15", state: "upcoming" },
    ],
  },
  {
    id: 2,
    name: "Accessibility",
    status: "Blocked",
    milestones: [
      { name: "VoiceOver audit", date: "May 28", state: "done" },
      { name: "Regression fix", date: "Jun 18", state: "active" },
      { name: "Convergence gate", date: "Jul 15", state: "upcoming" },
    ],
  },
  {
    id: 3,
    name: "Performance & Graphics",
    status: "On Track",
    milestones: [
      { name: "Perf baseline", date: "Jun 1", state: "done" },
      { name: "GPU optimization", date: "Jun 25", state: "active" },
      { name: "Final benchmarks", date: "Jul 10", state: "upcoming" },
    ],
  },
  {
    id: 4,
    name: "Device & QA",
    status: "At Risk",
    milestones: [
      { name: "Device matrix v1", date: "Jun 5", state: "done" },
      { name: "iPad mini coverage", date: "Jun 22", state: "active" },
      { name: "Validation sign-off", date: "Jul 18", state: "upcoming" },
    ],
  },
];

export const RISKS = [
  {
    id: 1,
    description: "Accessibility audit failures blocking convergence gate",
    owner: "Eng Lead — Frameworks",
    impact: "High",
    mitigation:
      "Daily standup with QA; escalation path to VP if not resolved by Week 26",
  },
  {
    id: 2,
    description: "VoiceOver regression in Settings — root cause unknown",
    owner: "Eng Lead — Accessibility",
    impact: "Medium",
    mitigation: "Dedicated debug sprint; daily status update to EPM",
  },
  {
    id: 3,
    description: "Device validation suite coverage gap on iPad mini",
    owner: "QA Program Lead",
    impact: "Low",
    mitigation: "Expanded device matrix requested; ETA Week 25",
  },
];

export const PROGRAM_META = {
  name: "iOS 20 — OS Release Program",
  org: "Software Engineering Org",
  week: 24,
  totalWeeks: 52,
  releaseDate: "Sep 12",
  daysToRelease: 84,
  milestonesNext14Days: 6,
};
