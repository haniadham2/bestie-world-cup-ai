<div align="center">

# 🐥 Bestie

### Your AI Bestie for the World Cup

A mobile-first web app that helps first-time World Cup viewers enjoy every match
without feeling confused or left out.

</div>

---

## The Problem

The World Cup is the biggest shared event on the planet — but for casual viewers
like **Emily**, watching can feel alienating. She's on the couch with friends,
family, or a partner who *get* soccer, and she doesn't. Something happens on
screen, everyone reacts, and she's left thinking *"wait… what just happened?"* —
but doesn't want to ask and feel embarrassed.

Existing options don't help: ESPN and stats apps assume you already understand
the game, education apps feel like homework, and betting apps are a different
universe entirely. Nothing is built to simply sit beside her and help her enjoy
the moment.

## The Solution

**Bestie is an AI companion, not a teacher.** It feels like a warm, funny best
friend sitting next to you on the couch. When something happens — a goal, a red
card, a VAR review — you tap it, and Bestie explains it in a friendly sentence or
two, never lecturing, never overwhelming.

Our product philosophy:

> **Never teach. Always help. Never lecture. Always encourage. Never overwhelm. Always simplify.**

## MVP Scope

The MVP (built across sprints) focuses on the core companion experience:

- **Landing page** — meet Bestie.
- **Match selection** — pick a match to watch.
- **Companion screen** — tap in-match moments (Goal, Yellow/Red Card, Offside,
  Corner Kick, Penalty, VAR, "What Should I Say?").
- **AI-generated explanations** — short, warm, beginner-friendly.
- **Beautiful animations** and **mobile-first responsive design.**

**Not in scope:** authentication, payments, real-time event detection, or a
database. We optimize for fast delivery and delight, not infrastructure.

### Sprint status

| Sprint | Focus | Status |
| ------ | ----- | ------ |
| **Sprint 1** | Foundation — UI shell, navigation, components, animations (no AI) | ✅ Done |
| **Sprint 1.5** | Professional repository structure & docs | ✅ Done |
| **Sprint 2** | Wire up the OpenAI API for real moment explanations | 🔜 Next |

## Tech Stack

**Frontend**

- [Next.js](https://nextjs.org/) (App Router)
- React + TypeScript (strict)
- Tailwind CSS — pastel design system
- Framer Motion — page transitions & micro-interactions

**AI**

- OpenAI API

**Deployment**

- Vercel

**Memory**

- v1: browser `localStorage`
- Future: FastAPI · Redis · PostgreSQL · Sports Data API

## Getting Started

```bash
cd frontend
npm install
npm run dev
```

Open <http://localhost:3000> and view it at a phone-sized viewport.

## Repository Structure

```
world-cup-bestie-ai/
├── frontend/              # The Next.js app (Sprint 1) — see frontend/README.md
├── docs/                  # Product & engineering documentation
│   ├── 01_PRD/
│   ├── 02_User_Research/
│   ├── 03_Competitive_Analysis/
│   ├── 04_Product_Strategy/
│   ├── 05_AI_Strategy/
│   ├── 06_System_Architecture/
│   ├── 07_Prompt_Engineering/
│   ├── 08_AI_Evaluation/
│   ├── 09_Roadmap/
│   └── 10_Launch/
├── prompts/               # AI prompt files (system + per-moment templates)
├── evaluations/           # AI response test sets, rubrics, results
├── assets/                # Brand & design assets (mascot, logos, colors)
├── screenshots/           # Product screenshots for docs & portfolio
├── demo/                  # Demo recordings, GIFs, hosted links
├── decision_logs/         # Lightweight architecture decision records
├── README.md
├── LICENSE
└── .gitignore
```

## Roadmap

**Now (done)** — Sprint 1 foundation: landing, match selection, and companion
screens with a reusable component system, pastel design, and animations.

**Next** — Connect the OpenAI API so tapping a moment returns a real Bestie
explanation; build "What Should I Say?"; persist viewer context in
`localStorage`.

**Later** — Real fixtures via a Sports Data API; a backend (FastAPI) with caching
(Redis) and a database (PostgreSQL); live event detection.

See [`docs/09_Roadmap`](docs/09_Roadmap) for detail.

## License

Released under the [MIT License](LICENSE).
