# Bestie — Frontend 🐥

The **Next.js application** for Bestie, your AI World Cup companion. Tap what just
happened in a match and Bestie reacts in character, then explains it in a friendly
sentence.

**Live:** [bestie-world-cup-ai.vercel.app](https://bestie-world-cup-ai.vercel.app/) ·
**Product docs:** [`../docs`](../docs)

## Tech stack

- **Next.js 14** (App Router) + **React 18**
- **TypeScript** (strict)
- **Tailwind CSS** — pastel design system (`tailwind.config.ts`)
- **Framer Motion** — all animation
- **OpenAI** (`gpt-4o-mini`) via one server route

## Getting started

**Prerequisites:** Node.js 18+ and an OpenAI API key with available credit.

```bash
cd frontend
npm install
cp .env.example .env.local     # then add your key:  OPENAI_API_KEY=sk-...
npm run dev
```

Open <http://localhost:3000> in a phone-sized viewport. To test on a real phone on
the same Wi-Fi: `npm run dev -- -H 0.0.0.0`, then visit `http://<your-ip>:3000`.

### Environment variables

| Variable | Required | Notes |
| --- | --- | --- |
| `OPENAI_API_KEY` | ✅ | Read **server-side only** in `app/api/bestie/route.ts`; never exposed to the client. `.env.local` is git-ignored. |

### Scripts

| Script | Does |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Lint |

## Screens

1. **Landing** (`/`) — value-first hero with an auto-playing demo of the core loop (tap → Bestie reacts → explains) and a **Start Watching** CTA.
2. **Match selection** (`/matches`) — two example fixtures (Brazil vs England, USA vs Mexico) as cards.
3. **Companion** (`/companion/[matchId]`) — a live-style scoreboard, the animated Bestie mascot, a personality picker, and 8 tappable moment tiles. Tapping a moment runs **thinking → react → speak** and Bestie explains it in a typed speech bubble.

## How the AI works

- The client (`services/bestie.ts`) sends `POST /api/bestie` with `{ match, moment, vibe }`.
- The route (`app/api/bestie/route.ts`, Node runtime) reads `OPENAI_API_KEY`, builds the prompt (`lib/bestiePrompt.ts` + the selected personality's tone from `lib/personalities.ts`), calls `gpt-4o-mini` (`temperature 0.9`, `max_tokens 120`), and returns `{ reply }`.
- Responses are ≤35 words, warm, beginner-first, and **emotionally live but honest** (no invented scores — there's no live data). Failures resolve to a friendly fallback in the UI.

## Personality modes

Five modes in `lib/personalities.ts` — **Cute, Funny, Hype, Coach, Beginner** — each
changes both Bestie's **voice** (prompt tone) and her **look** (mascot accessories).
The choice persists in `localStorage` (`bestie:personality`) via `hooks/usePersonality.ts`.

## Project structure

```
frontend/
  app/
    layout.tsx                     # Root layout, Nunito font, metadata
    globals.css                    # Tailwind + base styles
    page.tsx                       # Landing  (/)
    matches/page.tsx               # Match selection  (/matches)
    companion/[matchId]/page.tsx   # Companion  (/companion/:id)
    api/bestie/route.ts            # POST /api/bestie  → OpenAI gpt-4o-mini
  components/
    Bestie.tsx                     # Animated SVG mascot (idle life + event reactions + personality looks)
    SpeechBubble.tsx               # Disney-style bubble; types the reply as dialogue
    LandingDemo.tsx                # Auto-cycling demo of the core loop (landing hero)
    Scoreboard.tsx                 # Cosmetic live scoreboard (LIVE badge, flags, ticking minute)
    GoalCelebration.tsx            # Full-screen GOAL! moment (ball into net + confetti), via portal
    StadiumBackdrop.tsx            # Ambient stadium atmosphere behind every screen
    MomentButton.tsx               # Tappable football moment tile
    MatchCard.tsx                  # Fixture card on the match-selection screen
    PersonalityPicker.tsx          # Chips to choose Bestie's personality
    Button.tsx  Card.tsx  Header.tsx  ScreenContainer.tsx   # UI primitives
    MascotPlaceholder.tsx  ResponseCard.tsx  FloatingBackdrop.tsx  Toast.tsx  # legacy (unused)
  hooks/
    usePersonality.ts              # localStorage-backed personality (SSR-safe)
    useTypewriter.ts               # reveals reply text character-by-character
    useToast.ts                    # (legacy)
  lib/
    bestiePrompt.ts                # system prompt + per-request message builder
    personalities.ts               # the 5 personality modes + tone strings
    matches.ts                     # the 2 example matches
    moments.ts                     # the 8 tappable moments
    cn.ts                          # className helper
  services/bestie.ts               # client fetch wrapper for /api/bestie
  types/index.ts                   # shared TypeScript types
  public/                          # static assets
```

> A few early-build files (`MascotPlaceholder`, `ResponseCard`, `FloatingBackdrop`,
> `Toast`) remain in the tree but are no longer imported — kept for history, safe to remove.

## Deployment

Deployed on **Vercel** with the project **root directory set to `frontend/`** and the
`OPENAI_API_KEY` environment variable configured. Merges to `main` build automatically.

## Screenshots

See [`../screenshots`](../screenshots) for capture instructions and where images live;
the animated hero mascot is at [`../assets/bestie-hero.svg`](../assets/bestie-hero.svg).
