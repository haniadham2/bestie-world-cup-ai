# Bestie — Roadmap

| | |
|---|---|
| **Version** | 1.0 |
| **Status** | ✅ "Now" reflects shipped work. "Next/Later" are planned (🔮). |
| **Last updated** | 2026-06-30 |
| **Owner** | Product |

> Framed as **Now / Next / Later**. "Now" is built and in the codebase today; "Next" and "Later" are Future Vision.

---

## ✅ Now — shipped / in the codebase

- **Three-screen loop:** Landing → Match selection → Companion, mobile-first with animated transitions.
- **Working AI explanations:** `POST /api/bestie` → `gpt-4o-mini`, with server-side key handling and friendly error fallback.
- **Five personality modes** (Cute, Funny, Hype, Coach, Beginner) that change both AI tone and mascot look; choice persists in `localStorage`.
- **Animated mascot (Bestie):** idle life (breathe/blink/tilt/bounce/sparkle/glow) plus per-event reactions (goal, yellow, red, offside, corner, VAR, penalty).
- **Disney-style typed speech bubble** replacing the plain text box; **reaction-before-explanation** sequencing.
- **World Cup atmosphere:** stadium backdrop, cosmetic live scoreboard, full-screen goal celebration, football tiles, upgraded match cards.
- **Value-first landing** whose hero is an auto-playing demo of the core loop.
- **Foundations:** strict TypeScript (passes `tsc`), reduced-motion support, professional repo structure + PRD.

## 🔮 Next — highest-priority planned work (NOT built)

1. **Match-reactive voice (prompt-only).** Tune the prompt so Bestie reacts to *this* match more vividly while staying honest (no invented scores). Low effort, high delight; no API/architecture change.
2. **First-tap onboarding.** A gentle one-time coachmark on the companion screen so the tap loop is unmistakable.
3. **Shareable reaction card.** One-tap share of a Bestie reaction — the main word-of-mouth/virality lever.
4. **Premium polish pass.** Micro-interaction and typography refinements based on device testing.

## 🔮 Later — bigger bets (NOT built)

- **Live football data** via a Sports Data API: real fixtures, scores, lineups, events — makes the scoreboard real and lets Bestie safely reference actual context.
- **Automatic event detection** so users don't have to tap.
- **Backend & infra:** dedicated service, caching (Redis), database (PostgreSQL) for personalization/history/scale.
- **Analytics & experimentation** to measure activation, engagement, retention, and run A/B tests.
- **Expanded catalog:** more fixtures and tournament-schedule awareness.
- **Beyond the World Cup:** other tournaments/sports; an evergreen "watch with a friend" companion.

## Sequencing rationale

We front-load **delight and clarity** (voice, onboarding, sharing) because they directly serve the MVP's success bar and cost little. **Live data and backend** are deferred: they carry the most complexity and are the right investment only after the core experience proves it resonates.
