# iOS Release Program Health Dashboard

A production-style Engineering Program Manager tool for tracking OS release health across multiple engineering teams — built with React and powered by the Claude API for real-time executive summary generation.

**Live demo:** [saverna-program-dashboard.vercel.app](#) ← deploy and add link

---

## What this is

This dashboard simulates the program management infrastructure an EPM uses to oversee an OS release cycle from planning through convergence to release. It tracks milestone status across four engineering teams, surfaces active risks, calculates overall program health, and generates VP-ready executive status updates using the Claude API.

It was built to demonstrate two things simultaneously:
- How I think about engineering program management — milestone gates, risk registers, convergence phases, executive communication
- How I work with agentic AI tools to build, validate, and iterate on real software

---

## Features

- **Phase tracker** — visualizes the full OS release lifecycle: Planning → Development → Convergence → Release
- **Team milestone status** — four engineering teams with real milestone gates and interactive status cycling (On Track / At Risk / Blocked)
- **Program health indicator** — automatically calculates overall program health based on team statuses
- **Risk register** — structured table of active risks with owners, impact ratings, and mitigations
- **AI executive summary** — calls the Claude API live to generate a 3-4 sentence VP-ready status update based on current team health data

---

## How I built this — the agentic AI collaboration process

This project was built using Claude, Claude Code, ChatGPT, and GitHub Copilot as active collaborators. This section documents that process honestly — including what the AI got wrong and how I caught and corrected it.

### What I directed the AI to build

I started by describing the program structure I wanted — four engineering teams, an OS release phase bar, a risk register, and a live Claude API integration for executive summary generation. I specified the Apple design aesthetic, the EPM-specific language (convergence gates, milestone states, program health), and the data structure I wanted.

### What the AI got right

The initial component structure, the status cycling logic, and the risk register table were all solid on the first pass. The Claude API integration prompt engineering was accurate.

### What the AI got wrong — and how I caught it

**Issue 1 — Health indicator logic was inverted.**
The first version flagged the program as "On Track" when teams were Blocked, because the AI mapped health to the majority status rather than the worst-case status. I caught this by testing edge cases — setting all four teams to Blocked and seeing "On Track" displayed. I directed a rewrite: health should reflect the worst team status, not the average. An EPM never reports green when anything is blocked.

**Issue 2 — Executive summary prompt was too verbose.**
The initial prompt produced summaries with headers, bullet points, and filler phrases like "I am pleased to report." I rewrote the prompt with explicit constraints: no bullets, no headers, no fluff, 3-4 sentences, Apple tone. The second output was significantly sharper.

**Issue 3 — Risk register had no visual hierarchy.**
The first pass rendered all risks with identical styling. I directed the AI to add color-coded impact levels (High in red, Medium in amber, Low in green) so a VP scanning the table can immediately identify critical items. This is standard EPM practice — the AI didn't know that, I did.

**Issue 4 — Component structure was monolithic.**
The initial build put everything in one 400-line file. I directed a refactor into separate components (Dashboard, TeamCard, RiskRegister, ExecutiveSummary) with a centralized data file. This reflects how a real engineering team would maintain this codebase.

### What I validated before merging

- All status cycle transitions tested manually across all four teams
- Program health logic verified against all edge case combinations
- Claude API response handling tested for empty content and network errors
- Design reviewed against Apple's Human Interface Guidelines spacing and typography principles

---

## Program management context

This tool reflects how I think about OS release programs. A few design decisions worth noting:

**Why worst-case health, not average health**
An EPM's job is to surface risk, not hide it. If one team is Blocked, the program is at risk regardless of how the other three are doing. Executive leadership needs to know immediately.

**Why the risk register uses owners, not just descriptions**
Unowned risks don't get resolved. Every risk in a real program has a named owner who is accountable for the mitigation. Tracking that in a visible register creates the accountability loop.

**Why the executive summary is AI-generated but human-reviewed**
The Claude API generates the summary based on live data — but an EPM always reads and edits before sending. This tool is designed to accelerate drafting, not replace judgment. In a real program, I'd review the output, adjust for context the tool doesn't have, and own the final communication.

**Why convergence gets its own phase**
Apple's OS release process treats convergence as a distinct, critical phase — not just "late development." Convergence means the codebase is hardening, features are locked, and every new change requires explicit approval. An EPM who doesn't understand convergence can't effectively manage an OS release program.

---

## Tech stack

- **React** — component architecture with hooks
- **Vite** — local development and build
- **Claude API** (`claude-sonnet-4-20250514`) — live executive summary generation
- **GitHub Actions** — CI pipeline for lint and build validation

---

## Setup

```bash
git clone https://github.com/SavernaA/program-health-dashboard
cd program-health-dashboard
npm install
```

Create a `.env` file:
```
VITE_ANTHROPIC_API_KEY=your_api_key_here
```

```bash
npm run dev
```

---

## Program artifacts

The `/program` folder contains supporting EPM documents that provide context for how this tool fits into a real program management workflow:

- [`MILESTONE_PLAN.md`](./program/MILESTONE_PLAN.md) — phased milestone plan for an OS release cycle
- [`RISK_REGISTER.md`](./program/RISK_REGISTER.md) — full risk register template with ownership and escalation paths
- [`WEEKLY_STATUS_TEMPLATE.md`](./program/WEEKLY_STATUS_TEMPLATE.md) — weekly program status report template for engineering managers and executive leadership
- [`RACI.md`](./program/RACI.md) — responsibility matrix across engineering, design, QA, and leadership

---

## Why I built this

Engineering Program Manager roles at Apple require both technical credibility and program leadership instincts. Most candidates demonstrate one or the other. This project is an attempt to demonstrate both at once — a working technical artifact that reflects genuine EPM thinking.

The agentic AI section above is not a disclaimer. It is the point. Knowing how to direct AI tools, validate their output, catch their mistakes, and produce production-quality results from the collaboration is an increasingly critical engineering skill. I wanted to document that process transparently rather than pretend the code emerged fully formed.

---

*Built by Saverna Ahmad · [github.com/SavernaA](https://github.com/SavernaA) · [linkedin.com/in/saverna-ahmad-40657166](https://linkedin.com/in/saverna-ahmad-40657166)*
