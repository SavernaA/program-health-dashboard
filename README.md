# iOS Release Program Health Dashboard

A program management tool I built to track OS release health across engineering teams — powered by React and the Claude API.

**Live demo:** [saverna-program-dashboard](https://main.d1p5y0vbc7xrm3.amplifyapp.com) — deployed on AWS Amplify

## What this is

I built this to simulate what real program management looks like during an OS release cycle. It tracks milestone status across four engineering teams, flags active risks, calculates overall program health, and uses the Claude API to generate a quick executive status update based on whatever the current team data shows.

## Features

- **Phase tracker** — shows where the program is in the release lifecycle: Planning → Development → Convergence → Release
- **Team milestone status** — four teams with milestone gates you can click through (On Track / At Risk / Blocked)
- **Program health indicator** — automatically reflects the worst team status, not the average
- **Risk register** — active risks with owners, impact levels, and mitigations
- **AI executive summary** — hits the Claude API and returns a 3-4 sentence VP-ready status update based on live data

## How I built this

I used Claude as my primary collaborator throughout. I directed the structure, made the program management calls, and caught and corrected what the AI got wrong.

### What I directed the AI to build

Four engineering teams, a release phase bar, a risk register, and a live Claude API integration for executive summary generation. I defined the program management language — convergence gates, milestone states, worst-case health logic — and the overall data structure.

### What the AI got right

The initial component structure, status cycling logic, and risk register table were solid on the first pass. The Claude API prompt setup was also accurate.

### What the AI got wrong — and how I caught it

**Issue 1 — Health indicator logic was inverted.** It was showing "On Track" even when teams were Blocked. I caught it by setting all four teams to Blocked and watching the indicator stay green. I directed a rewrite: program health should always reflect the worst status, not the majority. A program is never green when something is blocked.

**Issue 2 — Executive summary prompt was too verbose.** The first output had headers, bullet points, and phrases like "I am pleased to report." I rewrote the prompt with hard constraints: no bullets, no headers, no filler, 3-4 sentences, crisp tone. Much better on the second pass.

**Issue 3 — Risk register had no visual hierarchy.** Everything looked the same. I directed the AI to add color-coded impact levels — High in red, Medium in amber, Low in green — so critical items are immediately visible.

**Issue 4 — Component structure was monolithic.** The first version was one 400-line file. I directed a refactor into separate components (Dashboard, TeamCard, RiskRegister, ExecutiveSummary) with a centralized data file.

### What I validated before merging

- All status transitions tested manually across all four teams
- Program health logic checked against every edge case combination
- Claude API response handling tested for empty content and network errors

## Program management decisions

**Why worst-case health, not average**
If one team is blocked, the program is at risk. That needs to be visible immediately — not averaged away.

**Why risks have owners**
Unowned risks don't get resolved. Naming an owner creates the accountability loop that actually drives mitigation.

**Why the executive summary is AI-generated but human-reviewed**
The Claude API drafts it from live data — but I'd always read and edit before sending. The tool accelerates drafting, it doesn't replace judgment.

**Why convergence is its own phase**
Convergence isn't just late development. The codebase is hardening, features are locked, and every change needs explicit approval. It deserves its own gate.

## Tech stack

- React — component architecture with hooks
- Vite — local development and build
- Claude API (claude-sonnet-4-20250514) — live executive summary generation
- AWS Amplify — deployment and hosting
- GitHub Actions — CI pipeline for lint and build validation

## Setup

```bash
git clone https://github.com/SavernaA/program-health-dashboard
cd program-health-dashboard
npm install
npm run dev
```

### Environment Variables

The Claude API integration requires an Anthropic API key, configured as an environment variable in AWS Amplify.

## Why I built this

I wanted to show how I think about program management — not just describe it. Knowing how to direct AI tools, validate their output, catch their mistakes, and ship something real is a skill I wanted to demonstrate openly. This is that.

---

Built by Saverna Ahmad · [github.com/SavernaA](https://github.com/SavernaA) · [linkedin.com/in/saverna-ahmad-40657166](https://linkedin.com/in/saverna-ahmad-40657166)
