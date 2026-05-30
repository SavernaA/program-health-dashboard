# iOS 20 — Milestone Plan

**Program:** iOS 20 OS Release  
**Organization:** Software Engineering  
**EPM:** Saverna Ahmad  
**Last updated:** Week 24

---

## Release phases and milestone gates

### Phase 1 — Planning
| Milestone | Owner | Target | Status |
|---|---|---|---|
| Program kickoff | EPM | Week 1 | ✅ Complete |
| Engineering team leads confirmed | Eng Directors | Week 2 | ✅ Complete |
| Feature list locked | Product + Eng | Week 4 | ✅ Complete |
| Resource plan approved | Eng Directors | Week 4 | ✅ Complete |
| Risk register initialized | EPM | Week 4 | ✅ Complete |

### Phase 2 — Development
| Milestone | Owner | Target | Status |
|---|---|---|---|
| API freeze | Frameworks Lead | Week 18 | ✅ Complete |
| Internal alpha build | QA Lead | Week 16 | ✅ Complete |
| Accessibility audit v1 | Accessibility Lead | Week 20 | ✅ Complete |
| Performance baseline established | Perf Lead | Week 18 | ✅ Complete |

### Phase 3 — Convergence ← Current phase
| Milestone | Owner | Target | Status |
|---|---|---|---|
| VoiceOver regression resolved | Accessibility Lead | Week 26 | 🔴 Blocked |
| iPad mini device coverage complete | QA Lead | Week 25 | 🟡 At Risk |
| Internal beta build | Frameworks Lead | Week 26 | 🟢 On Track |
| GPU optimization complete | Perf Lead | Week 27 | 🟢 On Track |
| All convergence gates passed | All Eng Leads | Week 28 | ⬜ Pending |
| Executive release readiness review | EPM + Eng Directors | Week 29 | ⬜ Pending |

### Phase 4 — Release
| Milestone | Owner | Target | Status |
|---|---|---|---|
| Golden master build | Release Eng | Week 34 | ⬜ Pending |
| App Store submission | Release Eng | Week 35 | ⬜ Pending |
| Public release | All | Week 36 | ⬜ Pending |

---

## Convergence gate criteria

A team passes convergence when all of the following are true:

- Zero P0 or P1 bugs open against the team's components
- Accessibility audit score meets or exceeds threshold
- Device validation coverage ≥ 95% of supported device matrix
- Performance benchmarks within 5% of baseline
- Engineering Lead sign-off submitted to EPM

---

## Escalation path

| Condition | Action | Owner |
|---|---|---|
| Any team Blocked > 3 days | Escalate to Eng Director | EPM |
| Convergence gate missed by > 1 week | Executive review triggered | EPM + Eng Director |
| Release date at risk | VP notification + mitigation plan | EPM |
