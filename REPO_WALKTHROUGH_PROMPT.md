# Detailed Repository Walkthrough — "Bestie – AI World Cup Companion"

> Paste this into ChatGPT (or any LLM) so it understands the entire codebase: the
> folder hierarchy and what every file contains. Source: the project's `main` branch
> (`github.com/haniadham2/bestie-world-cup-ai`). **Do not paste your `.env.local` or API key.**

---

You are reviewing a complete codebase called **Bestie**, a mobile-first web app that acts as a cute AI companion for watching FIFA World Cup matches. A user taps "what just happened" (Goal, Red Card, VAR, …) and an animated mascot named Bestie reacts in character and explains the moment in friendly, beginner language. Stack: **Next.js 14 (App Router) + React 18 + TypeScript (strict) + Tailwind CSS + Framer Motion**, with the **OpenAI API (`gpt-4o-mini`)** called from a server route. No database, no auth, no sports-data API; personality choice persists in `localStorage`.

Below is the full hierarchy and a detailed description of every file.

## Top-level hierarchy

```
bestie-world-cup-ai/
├── frontend/                  # the entire Next.js application
├── docs/                      # product documentation (10 numbered sections)
├── prompts/                   # AI prompt working files (placeholder)
├── evaluations/               # AI response test sets / rubrics (placeholder)
├── assets/                    # brand & design assets (placeholder)
├── screenshots/               # product screenshots (placeholder)
├── demo/                      # demo recordings / GIFs (placeholder)
├── decision_logs/             # lightweight architecture decision records (placeholder)
├── README.md                  # full project overview (problem, solution, scope, stack, roadmap)
├── LICENSE                    # MIT
└── .gitignore                 # root ignores (node_modules, .next, env, OS cruft)
```

The repo is a **monorepo-style product workspace**: `frontend/` holds the runnable app; the other top-level folders hold product/strategy documentation. Each `docs/NN_*/README.md` is a structured placeholder (PRD, User Research, Competitive Analysis, Product Strategy, AI Strategy, System Architecture, Prompt Engineering, AI Evaluation, Roadmap, Launch) listing the sections to fill in.

## `frontend/` hierarchy

```
frontend/
├── app/                       # Next.js App Router (pages + API)
│   ├── layout.tsx
│   ├── globals.css
│   ├── page.tsx               # "/"            Landing
│   ├── matches/page.tsx       # "/matches"     Match selection
│   ├── companion/[matchId]/page.tsx   # "/companion/:id"  Companion (main screen)
│   └── api/bestie/route.ts    # "POST /api/bestie"  OpenAI call
├── components/                # 18 React components (see below)
├── hooks/                     # usePersonality, useTypewriter, useToast
├── lib/                       # data + prompt + helpers
├── services/                  # bestie.ts (client API wrapper)
├── types/                     # index.ts (shared TypeScript types)
├── public/                    # static assets (empty placeholder)
├── tailwind.config.ts         # design system (pastel + stadium colors, radii, shadows)
├── tsconfig.json              # strict TS, @/* path alias
├── next.config.mjs            # reactStrictMode
├── postcss.config.mjs         # tailwind + autoprefixer
├── .env.example               # OPENAI_API_KEY=   (template; real key lives in .env.local, git-ignored)
└── package.json               # deps below
```

**Dependencies:** `next ^14.2.35`, `react/react-dom ^18.3.1`, `framer-motion ^11.3.0`, `openai ^4.56.0`. Dev: `typescript ^5.5.3`, `tailwindcss ^3.4.6`, `postcss`, `autoprefixer`, `@types/*`. Scripts: `dev`, `build`, `start`, `lint`.

---

## App routes (`frontend/app/`)

**`layout.tsx`** — Root layout. Loads the **Nunito** Google font (rounded, friendly), sets `<html>`/`<body>`, exports `metadata` (title "Bestie — Your AI Bestie for the World Cup", description) and `viewport` (theme color, mobile scaling).

**`globals.css`** — Tailwind layers + base styles: cream background, ink text color, antialiasing, removes mobile tap-highlight.

**`page.tsx`** (Landing, "/") — `LandingPage`. Value-first hero that answers "what does this app do?" before "who is Bestie?". Contains: a spinning ⚽️ "World Cup Companion" pill, headline **"Watch the World Cup with Bestie"** + subhead, the `<LandingDemo />` (auto-playing demo of the core loop), and a pulsing CTA **"Start Watching →"** that routes to `/matches`, plus the line "Never feel lost watching soccer again."

**`matches/page.tsx`** (Match selection, "/matches") — `MatchesPage`. A bold "Pick a match ⚽️" heading and a staggered list of `<MatchCard />`s from `lib/matches`. Tapping a card routes to `/companion/[matchId]`.

**`companion/[matchId]/page.tsx`** (Companion, the main screen) — `CompanionPage`, ~171 lines, the heart of the app. Responsibilities:
- Reads `matchId` from the route, looks up the match (`getMatchById`), and reads the saved personality (`usePersonality`).
- Holds a small **stage machine**: `"idle" | "thinking" | "reacting" | "talking" | "error"`.
- `reactionForMoment(momentId)` maps a tapped moment to a Bestie mood (goal→goal, yellow-card→yellow, red-card→red, offside→offside, corner-kick→corner, var→var, penalty→penalty, else idle).
- On tap (`handleMoment`): set `thinking`, call `askBestie({match, moment, vibe})`; on success store reply, set `reacting`, then after ~1100ms set `talking` (so Bestie **reacts before she explains**); on failure set `error`.
- Renders: `<Scoreboard>` (cosmetic live bar), `<Bestie mood={...} personality={...}>`, a heading, the `<SpeechBubble>` (thinking/talking/error), `<PersonalityPicker>`, the grid of `<MomentButton>`s (the active one highlighted), and `<GoalCelebration>` when Goal is tapped.

**`api/bestie/route.ts`** (`POST /api/bestie`) — Server route, `runtime = "nodejs"`. Reads `OPENAI_API_KEY` (server-only; never sent to client). Validates JSON body `{ match, moment, vibe }`, normalizes `vibe` to a known personality id (default `cute`). Calls OpenAI `chat.completions.create` with `model: "gpt-4o-mini"`, `temperature: 0.9`, `max_tokens: 120`, a system prompt + a per-moment user message. Returns `{ reply }`. Error handling: 500 if key missing, 400 for bad input, 502 if OpenAI fails.

---

## Components (`frontend/components/`)

**`Bestie.tsx`** (~619 lines — the largest file) — The animated SVG mascot: a cute yellow bird drawn entirely in SVG with each body part its own Framer Motion element. Exports `type BestieMood = "idle" | "thinking" | "goal" | "yellow" | "red" | "offside" | "corner" | "var" | "penalty"`. Props: `mood`, `personality`, `size`, `className`. Always-alive idle behavior: soft breathing, blinking eyes, occasional wing flap, gentle head tilt, floating sparkles, soft glow, tiny bounce. Per-mood reactions: goal (jump + spin + confetti + stars), yellow (surprised, leans back), red (shocked, dramatic shake, sweat drop), offside (confused, head tilt, floating "?"), corner (excited, points to a corner flag), var (thinking, eyes dart, loading dots), penalty (nervous tremble + sweat). Personality looks: cute (bigger eyes + blush), funny (laughing squint), hype (flames + warm glow), coach (cap + whistle), beginner (a little book). Only transform/opacity animate (60 FPS); respects `prefers-reduced-motion`. Internal sub-components: Eye, Mouth, Sparkles, Flames, ThinkingOverlay, OffsideMark, VarDots, CornerPointer, SweatDrop, GoalSparkle, Confetti, CoachGear, BeginnerBook.

**`SpeechBubble.tsx`** — Disney-style dialogue bubble with a tail pointing up to Bestie. Exports `type BubbleStatus = "idle" | "thinking" | "talking" | "error"`. When `talking`, uses `useTypewriter` to reveal the reply character-by-character (with a blinking caret); when `thinking`, shows "Bestie's watching…" + bouncing dots; `error` shows the friendly fallback ("Oops 💕 Bestie got a little confused. Try again!"). Animated in/out with `AnimatePresence`.

**`LandingDemo.tsx`** — The landing hero that *is* the product demo. Auto-cycles every ~4.2s through scripted steps (Goal / Red Card / VAR): highlights a moment tile (ring + bouncing 👆), shows a flow arrow, renders `<Bestie>` reacting to that mood, and types the matching line in a `<SpeechBubble>`. Demonstrates the tap→react→explain loop without words. Lines are emotionally live but invent no scores.

**`Scoreboard.tsx`** — Cosmetic broadcast scoreboard so the companion screen feels live: animated country flags, a pulsing red **LIVE** badge, a 0–0 score, and a match minute that ticks up every ~4s (purely visual; no real data).

**`GoalCelebration.tsx`** — Full-screen GOAL! moment rendered through a **React portal to `document.body`** (so its `fixed` positioning isn't trapped by an animated ancestor). A football flies into a net, confetti rains, a "GOAL!" stamp pops, then it fades. Plays when Goal is tapped.

**`StadiumBackdrop.tsx`** — Ambient stadium atmosphere behind every screen (rendered inside `ScreenContainer`): soft floodlight beams, drifting pastel light pools, a grass-tone glow + faint pitch stripes at the bottom, slowly drifting/spinning footballs, and twinkles. Decorative, `pointer-events-none`, subtle.

**`MomentButton.tsx`** — A tappable football "moment" tile. Props: `moment`, `onPress`, `index` (stagger), `active` (selection glow). Idle bob, hover lift, emoji wiggle on hover, a soft colored disc behind each emoji (color keyed by moment id), and a pink glow ring when selected.

**`MatchCard.tsx`** — A fixture card. Gradient kickoff strip with a light shimmer and a pulsing "LIVE SOON" badge, two `TeamBadge`s (flag that wiggles on hover + name), a pulsing "vs", and a "Watch with Bestie →" cue. Composes the generic `Card`.

**`PersonalityPicker.tsx`** — Row of chips for the 5 personality modes (from `lib/personalities`). Selected chip highlighted by a sliding gradient pill (Framer `layoutId`). Scrolls horizontally on mobile, wraps on desktop, accessible as a radio group.

**`ScreenContainer.tsx`** — Mobile-first page wrapper used by all screens. Centers content in a phone-width column (`max-w-md`, widening to `md:max-w-xl`), animates each screen in/out, and renders `<StadiumBackdrop />` behind the content. Optional pastel `gradient` prop.

**`Button.tsx`** — The primary button. Rounded, spring hover/tap, `primary`/`secondary` variants and `md`/`lg` sizes. The primary variant has a looping light "sheen" sweep to invite taps.

**`Card.tsx`** — Generic soft rounded surface; becomes a keyboard-accessible button when given `onClick` (adds hover lift + tap motion).

**`Header.tsx`** — Slim top bar with an optional springy circular back button and optional title.

**Legacy / now-unused (kept in the repo, not imported anymore):** `MascotPlaceholder.tsx` (the original emoji-in-a-circle mascot, replaced by `Bestie`), `ResponseCard.tsx` (the original white reply box, replaced by `SpeechBubble`), `FloatingBackdrop.tsx` (earlier ambient layer, replaced by `StadiumBackdrop`), `Toast.tsx` (the Sprint-1 "Coming in Sprint 2" toast).

---

## Hooks (`frontend/hooks/`)

**`usePersonality.ts`** — Reads/persists the chosen personality in `localStorage` (`bestie:personality`). SSR-safe: renders the default on the server and first client paint, then hydrates the saved value in an effect to avoid hydration mismatch. Returns `{ personality, setPersonality, hydrated }`.

**`useTypewriter.ts`** — Reveals `text` one character at a time when `active`. Honors `prefers-reduced-motion` (shows the full line instantly). Returns `{ shown, done }`.

**`useToast.ts`** — (Legacy) auto-hiding toast controller from Sprint 1; no longer used by the main flow.

---

## Lib (`frontend/lib/`)

**`bestiePrompt.ts`** — Bestie's AI voice. Exports `BESTIE_SYSTEM_PROMPT` (personality + rules: warm, cute, funny, encouraging, beginner-friendly, never patronizing, never teacher-like, ≤35 words, simple English + everyday analogies) and `buildBestieUserMessage({match, moment, vibe})`, which injects the selected personality's tone (via `getPersonality`) into the per-request message.

**`personalities.ts`** — The 5 modes as `PERSONALITIES: Personality[]` — **cute 🐥, funny 😂, hype 🔥, coach 🧢, beginner 🌱** — each with `id`, `label`, `emoji`, `tagline`, and a `style` tone instruction. Also `DEFAULT_PERSONALITY_ID = "cute"`, `PERSONALITY_STORAGE_KEY = "bestie:personality"`, `isPersonalityId()` type guard, and `getPersonality()` safe lookup.

**`matches.ts`** — `MATCHES: Match[]` with two hard-coded example fixtures (Brazil 🇧🇷 vs England 🏴, USA 🇺🇸 vs Mexico 🇲🇽), each with id, teams, kickoff label, and a Tailwind gradient. Plus `getMatchById(id)`.

**`moments.ts`** — `MOMENTS: Moment[]` — the 8 tappable moments: Goal ⚽️, Yellow Card 🟨, Red Card 🟥, Offside 🚩, Corner Kick 📐, Penalty 🎯, VAR 📺, "What Should I Say?" 💬.

**`cn.ts`** — Tiny `cn(...classes)` className joiner (filters falsy values); no dependency.

---

## Services & Types

**`services/bestie.ts`** — `askBestie(input: BestieRequest): Promise<string>`. Client wrapper that POSTs to `/api/bestie`, throws on non-OK responses (so the UI can show the friendly fallback), and returns the reply text.

**`types/index.ts`** — Shared types: `Team`, `Match`, `Moment`, `PersonalityId` (`"cute" | "funny" | "hype" | "coach" | "beginner"`), `Personality`, `BestieRequest` (`{ match: string; moment: string; vibe: PersonalityId }`), `BestieResponse` (`{ reply: string }`).

---

## How a single interaction flows end-to-end
1. User opens "/", sees the auto-playing demo, taps **Start Watching** → "/matches".
2. Picks a `MatchCard` → "/companion/[matchId]".
3. Taps a `MomentButton` → `CompanionPage.handleMoment` sets stage `thinking`.
4. `services/bestie.askBestie` POSTs `{ match, moment, vibe }` to `/api/bestie`.
5. The route builds the prompt (`bestiePrompt` + the personality from `personalities`) and calls `gpt-4o-mini`, returning `{ reply }`.
6. Stage → `reacting`: `Bestie` plays the event reaction (e.g. jump + confetti for Goal, `GoalCelebration` overlay fires).
7. After ~1.1s, stage → `talking`: `SpeechBubble` types the reply as dialogue.
8. Any failure → stage `error` → friendly fallback in the bubble.

## Constraints baked into the codebase
No backend service, no database, no auth, no payments, no real-time event detection, **no sports-data API** (so no real scores — the scoreboard is cosmetic and Bestie never invents scores/scorers). Memory is `localStorage` only. Model is `gpt-4o-mini`. Optimized for shipping an MVP quickly with clean, modular, strongly-typed code.
