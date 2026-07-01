# Bestie — Product Requirements Document (PRD)

| | |
|---|---|
| **Product** | Bestie — AI World Cup Companion |
| **Document** | Product Requirements Document (PRD) |
| **Version** | 1.0 |
| **Status** | ✅ Reflects current implementation (MVP in progress) |
| **Last updated** | 2026-06-30 |
| **Owner** | Product |
| **Source of truth** | The current `frontend/` implementation on `main`. Anything not yet built is explicitly marked **🔮 Future Vision**. |

> **How to read this document.** Everything in the numbered functional/AI/non-functional sections describes behavior that **exists in the codebase today** unless it carries a **🔮 Future Vision** tag. A new engineering team should be able to rebuild the current product from Sections 1–14, and understand the intended direction from Section 15.

---

## 1. Overview

Bestie is a **mobile-first web app that acts as a cute AI companion for watching FIFA World Cup matches**. During a match, the user taps whatever just happened on screen — a goal, a red card, a VAR check — and an animated mascot named **Bestie** reacts emotionally in character and then explains the moment in warm, simple, beginner-friendly language.

The experience is deliberately **not** a chatbot, a stats app, or a soccer encyclopedia. The AI is meant to "disappear" behind a playful, emotional companion experience. The guiding feeling: *"It's like watching the World Cup with your cutest, funniest friend."*

### 1.1 Problem statement

The World Cup is the largest shared live event in the world, but for casual viewers it can be alienating. A first-time viewer (watching with friends, a partner, or family who understand the game) constantly experiences moments they don't understand — and often feels too embarrassed to ask "what just happened?" out loud. Existing tools don't help: broadcast apps and stats products assume prior knowledge, education apps feel like homework, and betting apps are irrelevant. Nothing is designed to simply sit beside a newcomer and help them enjoy the moment.

### 1.2 Solution

A companion app where the entire interaction is: **tap what just happened → Bestie reacts → Bestie explains it simply.** Explanations are short (≤35 words), emotional, and never condescending. The product optimizes for delight, emotional connection, and clarity — not information density.

### 1.3 Product philosophy

> Never teach. Always help. Never lecture. Always encourage. Never overwhelm. Always simplify.

---

## 2. Goals & non-goals

### 2.1 Goals (MVP)
- Let a first-time viewer understand any tapped match moment in seconds, in plain language.
- Make the core loop (**tap → react → explain**) understandable within ~3 seconds of opening the app.
- Deliver a delightful, "adorable," premium-feeling experience that feels made specifically for the World Cup.
- Ship quickly with a simple, maintainable, strongly-typed frontend and a single AI endpoint.

### 2.2 Non-goals (explicitly out of scope for the MVP)
- ❌ User accounts / authentication
- ❌ Payments or subscriptions
- ❌ A database or server-side persistence
- ❌ Real-time automatic event detection (the user taps manually)
- ❌ Live sports data (scores, lineups, fixtures) — **no sports-data API is integrated**
- ❌ Product analytics / telemetry instrumentation
- ❌ A soccer education curriculum, statistics, or betting features

---

## 3. Target users & personas

**Primary persona — "Emily."** A casual World Cup viewer watching with a boyfriend/friends/family. Doesn't understand soccer, doesn't want to ask embarrassing questions, wants to feel included in the excitement, and loves beautiful, cute, delightful mobile apps.

**Mission:** *Nobody should feel left out while watching the World Cup.*

**Anti-persona.** The die-hard fan seeking deep stats, tactics, or betting odds. Bestie is intentionally not for them.

---

## 4. Product principles

1. **Show, don't tell.** The landing page demonstrates the loop rather than describing it.
2. **Companion, not chatbot.** Every response is tied to a live football moment and delivered as character dialogue.
3. **Emotionally live, factually honest.** Bestie reacts with big energy and is match/team aware, but — because there is no live data — she **never states invented scores or scorers**.
4. **Delight over speed.** Every interaction animates; nothing changes state instantly.
5. **Adorable, not elaborate.** Bestie is a simple, lovable mascot, not a flagship character.
6. **Mobile-first.** Designed for a phone held while watching a match on another screen.

---

## 5. Scope summary — implemented vs. future

| Capability | Status |
|---|---|
| Landing page with live demo of the loop | ✅ Implemented |
| Match selection (2 example fixtures) | ✅ Implemented |
| Companion screen with 8 tappable moments | ✅ Implemented |
| OpenAI-powered explanations (`gpt-4o-mini`) | ✅ Implemented |
| 5 personality modes (change AI tone **and** mascot look) | ✅ Implemented |
| Personality persistence (localStorage) | ✅ Implemented |
| Animated mascot with idle life + per-event reactions | ✅ Implemented |
| Typed "speech bubble" dialogue | ✅ Implemented |
| Cosmetic live scoreboard, stadium atmosphere, goal celebration | ✅ Implemented |
| Reduced-motion support | ✅ Implemented |
| Real fixtures / scores / lineups | 🔮 Future Vision |
| Automatic live event detection | 🔮 Future Vision |
| Backend service, database, caching | 🔮 Future Vision |
| Analytics & experimentation | 🔮 Future Vision |
| Shareable reaction card; onboarding coachmark; stadium sounds | 🔮 Future Vision |

---

## 6. User flows

### 6.1 Primary flow (implemented)
1. **Landing (`/`)** — User arrives; an auto-playing demo cycles through Goal → Red Card → VAR, showing a tile being "tapped," Bestie reacting, and a typed explanation. User taps **Start Watching**.
2. **Match selection (`/matches`)** — User picks one of two match cards.
3. **Companion (`/companion/[matchId]`)** — User optionally picks a personality, then taps a moment. Bestie thinks → reacts in character → speaks the explanation. User taps more moments as the match unfolds.

### 6.2 Error flow (implemented)
If the AI request fails (missing key, network, OpenAI error), Bestie shows a friendly fallback in the bubble: *"Oops 💕 Bestie got a little confused. Try again!"* No crash, no technical error surfaced.

---

## 7. Functional requirements

Requirement IDs are stable references for engineering and QA.

### 7.1 Landing page (`/`)
- **FR-L1** Display a "World Cup Companion" badge, a value-first headline (**"Watch the World Cup with Bestie"**), and a subhead describing the tap-to-explain value.
- **FR-L2** Display an **auto-playing demo** (`LandingDemo`) that cycles (~4.2s interval) through three scripted moments (Goal, Red Card, VAR): highlight the corresponding tile, render Bestie reacting to that mood, and type a matching one-line explanation in a speech bubble. Demo copy must be emotionally live but contain **no invented scores**.
- **FR-L3** Provide a primary CTA ("Start Watching →") that navigates to `/matches`.
- **FR-L4** Copy must not use the phrase "Your AI Bestie" (value-first messaging).

### 7.2 Match selection (`/matches`)
- **FR-M1** Display a heading and the list of available matches from `lib/matches` as `MatchCard`s. Current data set: **Brazil vs England** and **USA vs Mexico** (hard-coded; exactly two).
- **FR-M2** Each card shows both teams (emoji flag + name), a kickoff label, and a cosmetic "LIVE SOON" badge.
- **FR-M3** Tapping a card navigates to `/companion/[matchId]` for that match.
- **FR-M4** A back control returns to the landing page.

### 7.3 Companion screen (`/companion/[matchId]`)
- **FR-C1** Resolve the match from the route param via `getMatchById`. (If unknown, the screen still functions using a generic "this match" label.)
- **FR-C2** Display a **cosmetic scoreboard** (`Scoreboard`): animated flags, a pulsing **LIVE** badge, a **0–0** score, and a match minute that ticks up ~every 4s. This is decorative only — **not** real data.
- **FR-C3** Render the animated `Bestie` mascot reflecting the current interaction mood.
- **FR-C4** Display a **personality picker** with the 5 modes; the current selection is visually highlighted.
- **FR-C5** Display a grid of **8 moment tiles** (`MomentButton`) from `lib/moments`: **Goal, Yellow Card, Red Card, Offside, Corner Kick, Penalty, VAR, What Should I Say?**
- **FR-C6** On tapping a moment, run the interaction sequence (see FR-C7). While a request is in flight, ignore additional taps.
- **FR-C7 (interaction sequence / "reaction before explanation")** The screen transitions through stages: `idle → thinking → reacting → talking` (or `→ error`).
  - `thinking`: Bestie shows a thinking animation; the bubble shows "Bestie's watching…" with animated dots.
  - `reacting`: on reply received, Bestie plays the event-specific reaction (e.g., jumps + confetti for Goal). Held ~1.1s.
  - `talking`: the bubble types out the reply as dialogue (typewriter effect).
- **FR-C8** The active/selected moment tile is visually highlighted while the sequence runs.
- **FR-C9 (Goal celebration)** When the tapped moment is **Goal**, render a full-screen celebration overlay (`GoalCelebration`): a football flies into a net, confetti rains, and a "GOAL!" stamp appears, then it fades. Rendered via a portal to `document.body`.
- **FR-C10** A back control returns to `/matches`.

### 7.4 Moment → reaction mapping (implemented)
| Moment (id) | Bestie reaction (mood) |
|---|---|
| Goal (`goal`) | Jump + spin, confetti, stars, big smile + full-screen celebration |
| Yellow Card (`yellow-card`) | Surprised face, leans backward |
| Red Card (`red-card`) | Shocked, open mouth, dramatic shake, sweat drop |
| Offside (`offside`) | Confused, head tilt, floating "?" |
| Corner Kick (`corner-kick`) | Excited, points toward a corner flag |
| Penalty (`penalty`) | Nervous tremble, slow bounce, sweat |
| VAR (`var`) | Thinking, eyes dart side to side, loading dots |
| What Should I Say? (`what-should-i-say`) | Neutral/idle reaction; AI returns a suggested line to say out loud |

### 7.5 Personality modes (implemented)
- **FR-P1** Five modes exist: **Cute 🐥, Funny 😂, Hype 🔥, Coach 🧢, Beginner 🌱** (`lib/personalities`).
- **FR-P2** The selected mode changes **both** (a) the AI response tone (injected into the prompt) and (b) Bestie's appearance (e.g., Cute = bigger eyes + blush, Funny = laughing squint, Hype = flames + warm glow, Coach = cap + whistle, Beginner = a book).
- **FR-P3** The selection persists across sessions in `localStorage` under key `bestie:personality`; default is `cute`.
- **FR-P4** Persistence must be SSR-safe (default rendered on server and first client paint; saved value hydrated in an effect).

---

## 8. AI / LLM requirements

- **AI-1 (Endpoint)** A single server route, **`POST /api/bestie`**, running on the Node.js runtime. It accepts `{ match: string, moment: string, vibe: PersonalityId }` and returns `{ reply: string }`.
- **AI-2 (Model)** OpenAI **`gpt-4o-mini`**, called via the official `openai` Node SDK, `temperature: 0.9`, `max_tokens: 120`.
- **AI-3 (Key handling)** `OPENAI_API_KEY` is read **server-side only** from environment (`.env.local`) and never exposed to the client.
- **AI-4 (System prompt)** Bestie's persona is fixed in `lib/bestiePrompt.ts`: warm, cute, funny, encouraging, beginner-friendly, never patronizing, never teacher-like; replies **≤35 words**, simple everyday English with relatable analogies; one quick friendly thought, not a lecture or list.
- **AI-5 (Per-request message)** The user message includes the match label, the tapped moment, and the selected personality's tone instruction (`style`), and asks Bestie to react to this moment and explain it simply.
- **AI-6 (Honesty constraint)** Because no live data exists, responses may be emotionally live and team/match aware but must not assert factual scores, scorers, or events that cannot be known. *(Enforced by prompt design; see Section 15 for how live data would change this.)*
- **AI-7 (Validation & defaults)** The route validates presence of `match` and `moment`; `vibe` is normalized to a known personality id, defaulting to `cute` for unknown values.
- **AI-8 (Error responses)** `500` if the API key is missing, `400` for invalid/empty input, `502` if the OpenAI call fails. The client (`services/bestie.ts`) throws on any non-OK response so the UI can show the friendly fallback (FR-6.2).

---

## 9. Non-functional requirements

- **NFR-1 (Performance / 60 FPS)** All animation must use only GPU-composited properties (`transform`, `opacity`). No layout-thrashing animations.
- **NFR-2 (Reduced motion)** Respect `prefers-reduced-motion`: looping/idle animations quiet down and the typewriter reveals text instantly.
- **NFR-3 (Responsive, mobile-first)** Content is a phone-width column (`max-w-md`) that widens gently on desktop (`md:max-w-xl`); designed for portrait phone use.
- **NFR-4 (Type safety)** TypeScript `strict` mode; the app must pass `tsc --noEmit` with zero errors.
- **NFR-5 (Resilience)** No unhandled error may surface raw to the user; the AI failure path always resolves to the friendly fallback.
- **NFR-6 (Accessibility)** Interactive elements expose accessible labels/roles (e.g., moment tiles have `aria-label`; personality picker is a radio group; decorative layers are `aria-hidden`).
- **NFR-7 (Privacy)** No personal data is collected or stored beyond the personality preference in the browser's `localStorage`.

---

## 10. Information architecture & navigation

| Route | Screen | Component |
|---|---|---|
| `/` | Landing | `app/page.tsx` → `LandingDemo` |
| `/matches` | Match selection | `app/matches/page.tsx` → `MatchCard` |
| `/companion/[matchId]` | Companion | `app/companion/[matchId]/page.tsx` |
| `POST /api/bestie` | AI endpoint | `app/api/bestie/route.ts` |

Navigation is linear and forward-driven (Landing → Matches → Companion) with back controls on inner screens. No tab bar, no deep menus.

---

## 11. Data model (current types)

Defined in `types/index.ts`:

- **`Team`** `{ name: string; flag: string }`
- **`Match`** `{ id: string; home: Team; away: Team; kickoff: string; gradient: string }`
- **`Moment`** `{ id: string; label: string; emoji: string }`
- **`PersonalityId`** `"cute" | "funny" | "hype" | "coach" | "beginner"`
- **`Personality`** `{ id: PersonalityId; label: string; emoji: string; tagline: string; style: string }`
- **`BestieRequest`** `{ match: string; moment: string; vibe: PersonalityId }`
- **`BestieResponse`** `{ reply: string }`

Static content lives in code: `lib/matches.ts` (2 matches), `lib/moments.ts` (8 moments), `lib/personalities.ts` (5 personalities). There is no runtime datastore.

---

## 12. System architecture (current)

- **Frontend:** Next.js 14 (App Router) + React 18 + TypeScript, styled with Tailwind CSS, animated with Framer Motion. Client components handle interaction and animation.
- **AI backend:** A single Next.js **Route Handler** (`/api/bestie`) that proxies to OpenAI. This is the only server-side code; there is no separate backend service.
- **State/memory:** React state on the companion screen (interaction stage, reply, active moment); `localStorage` for personality preference. No database.
- **Deployment target:** Vercel.

```
[ Client UI ] --tap--> services/bestie.ts --POST /api/bestie--> [ Route Handler ] --> [ OpenAI gpt-4o-mini ]
      ^                                                                                        |
      +------------------------ { reply } rendered as typed dialogue --------------------------+
```

---

## 13. Design system & UX guidelines (current)

- **Palette:** Soft pastels — cream, bubblegum pink, peach, sky, mint, lavender, sunny yellow, ink (text), plus subtle stadium/pitch accents (grass, pitch, night). Defined in `tailwind.config.ts`.
- **Type:** Nunito (rounded, friendly), heavy weights for headings.
- **Shape/space:** Large rounded corners, soft shadows, generous whitespace, large tap targets.
- **Motion:** Spring animations and soft easing; page transitions; ambient stadium atmosphere behind every screen (`StadiumBackdrop`).
- **Character:** Bestie is a cute yellow bird drawn in SVG with independently animated parts (eyes, wings, head, beak). She always feels alive: breathing, blinking, gentle head tilt, tiny bounce, sparkles, soft glow. Expression set: happy (idle), surprised, thinking, celebrating, shocked — plus the event reactions in §7.4.
- **Tone of copy:** Warm, playful, encouraging; short; never corporate/technical/educational.

---

## 14. Edge cases & error handling (current)

- **Missing API key** → route returns 500; UI shows friendly fallback.
- **OpenAI failure / rate limit / no quota** → route returns 502; UI shows friendly fallback.
- **Invalid request body** → route returns 400.
- **Unknown personality value** → defaults to `cute`.
- **Rapid taps** → ignored while a request is in flight.
- **Unknown `matchId`** → screen still works with a generic match label.
- **Empty model output** → treated as an error → friendly fallback.

---

## 15. 🔮 Future Vision (planned, NOT implemented)

Clearly out of the current build; documented to guide direction. None of the below exists today.

- **Live football data.** Integrate a Sports Data API for real fixtures, scores, lineups, and events. This would make the scoreboard real and allow the AI honesty constraint (AI-6) to relax so Bestie can reference actual scores/scorers.
- **Automatic event detection.** Detect moments live so the user doesn't have to tap.
- **Backend & infrastructure.** A dedicated backend (e.g., FastAPI), caching (Redis), and a database (PostgreSQL) for personalization, history, and scale.
- **Richer "What Should I Say?"** A dedicated flow producing shareable, situation-aware lines to say out loud with friends.
- **Shareable reaction card.** A one-tap share of Bestie's reaction to a moment, for word-of-mouth growth.
- **First-tap onboarding.** A gentle coachmark the first time on the companion screen.
- **Ambient stadium sound.** Optional crowd atmosphere (design is "sound-ready").
- **Analytics & experimentation.** Instrumentation for activation, taps per match, retention, and A/B testing.
- **Expanded match catalog.** More than two fixtures, tournament schedule awareness.

---

## 16. Success metrics (proposed — instrumentation NOT yet implemented)

> ⚠️ No analytics are currently integrated. These are the intended metrics once instrumentation exists (see §15).

- **Activation:** % of first sessions that reach the companion screen and tap ≥1 moment.
- **Comprehension:** qualitative — a first-time user can explain what the app does after seeing the landing page (the design's own pass/fail bar).
- **Engagement:** average moment taps per match session.
- **Delight/retention:** return rate across match days; share actions (once shipped).

---

## 17. Dependencies & tech stack

- **Runtime/libraries:** `next@^14.2.35`, `react`/`react-dom@^18.3.1`, `framer-motion@^11.3.0`, `openai@^4.56.0`.
- **Tooling:** TypeScript `^5.5.3` (strict), Tailwind CSS `^3.4.6`, PostCSS, Autoprefixer.
- **External service:** OpenAI API (requires `OPENAI_API_KEY` with available quota/billing).
- **Hosting:** Vercel (target).

---

## 18. Assumptions, risks & open questions

**Assumptions**
- The user is watching a match on another screen and holding their phone.
- The user will manually tap moments as they happen.
- An OpenAI key with billing is available in the deployment environment.

**Risks**
- **No live data** limits how specific/factual Bestie can be; over-promising specificity would erode trust (mitigated by AI-6).
- **Per-tap API cost/latency** — each tap is a live model call; heavy use has cost and a short "thinking" delay.
- **AI variability** — tone/length must be constrained by the prompt; occasional off-brand replies are possible.

**Open questions**
- How many real fixtures should the MVP expose before/at launch?
- Should "What Should I Say?" become its own first-class flow vs. a moment tile?
- What is the minimum analytics needed to judge launch success?

---

## 19. Acceptance criteria (build verification)

A build satisfies this PRD when:
1. All three routes render and navigate as in §10; the landing demo auto-cycles and shows the loop (§7.1).
2. The companion screen exposes all 8 moments and 5 personalities; personality persists across reloads (§7.3–7.5).
3. Tapping a moment runs the `thinking → reacting → talking` sequence, with reaction visibly preceding the typed explanation; Goal triggers the full-screen celebration (§7.3).
4. `POST /api/bestie` uses `gpt-4o-mini`, keeps the key server-side, and returns `{ reply }`; all three error codes behave per §8 and always resolve to the friendly fallback in the UI.
5. Animations run at ~60 FPS using transform/opacity only and respect reduced-motion (§9).
6. `tsc --noEmit` passes with zero errors.
7. No feature outside §5/§7/§8 (e.g., real scores, accounts, analytics) is present — those remain Future Vision.

---

## 20. Glossary

- **Moment** — a tappable football event (Goal, VAR, …) that triggers a Bestie reaction + explanation.
- **Personality / vibe** — one of the five tones that shape both Bestie's words and her look.
- **Reaction** — Bestie's animated, in-character response to a moment, shown before the explanation.
- **Companion screen** — the main in-match screen where the core loop happens.
- **Cosmetic scoreboard** — the decorative LIVE scoreboard; not backed by real data.
