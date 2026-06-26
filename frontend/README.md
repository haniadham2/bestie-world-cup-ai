# Bestie 🐥

**Your AI Bestie for the World Cup.**

A mobile-first web app that helps first-time World Cup viewers enjoy every
match without feeling confused or left out. This repo contains **Sprint 1 —
Foundation**: the UI shell, navigation, and reusable components. No AI yet.

## Tech stack

- **Next.js 14** (App Router)
- **TypeScript** (strict)
- **Tailwind CSS** — pastel design system
- **Framer Motion** — page transitions and micro-interactions

## Getting started

```bash
cd frontend
npm install
npm run dev
```

Open http://localhost:3000 on a phone-sized viewport.

## Screens (Sprint 1)

1. **Landing** (`/`) — hero, mascot, "Start Watching".
2. **Match selection** (`/matches`) — two example fixtures as cards.
3. **Companion** (`/companion/[matchId]`) — mascot + moment buttons.
   Buttons currently show a "Coming in Sprint 2" toast.

## Project structure

```
frontend/
  app/                      # Next.js App Router pages
    layout.tsx              # Root layout, fonts, metadata
    globals.css             # Tailwind + base styles
    page.tsx                # Landing page  (/)
    matches/page.tsx        # Match selection  (/matches)
    companion/[matchId]/page.tsx  # Companion  (/companion/:id)
  components/               # Reusable, single-responsibility UI
    Button.tsx
    Card.tsx
    Header.tsx
    MascotPlaceholder.tsx
    ScreenContainer.tsx
    MatchCard.tsx
    MomentButton.tsx
    Toast.tsx
  hooks/                    # Reusable React hooks
    useToast.ts
  lib/                      # Pure helpers + static data
    cn.ts
    matches.ts
    moments.ts
  types/                    # Shared TypeScript types
    index.ts
  services/                 # (reserved) API clients — e.g. OpenAI, future
  components/animations/    # (reserved) shared motion variants
  public/                   # static assets
```

`services/` and `components/animations/` are intentionally empty in Sprint 1
and reserved for later sprints (kept under version control via `.gitkeep`).
