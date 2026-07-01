# Bestie — System Architecture

| | |
|---|---|
| **Version** | 1.0 |
| **Status** | ✅ Reflects the current implementation. Future infrastructure marked 🔮. |
| **Last updated** | 2026-06-30 |
| **Owner** | Engineering |

---

## 1. High-level picture

Bestie is a **single Next.js 14 application** (App Router). The frontend is React + TypeScript + Tailwind + Framer Motion. The only server-side code is **one Route Handler** that proxies to OpenAI. There is **no separate backend, database, or cache**. Deployment target is **Vercel**.

```
┌────────────────────────── Next.js app (Vercel) ──────────────────────────┐
│                                                                            │
│   Client (React, "use client")                    Server (Node runtime)   │
│   ┌───────────────────────────┐                   ┌────────────────────┐  │
│   │ Landing / Matches /        │   fetch POST      │ /api/bestie        │  │
│   │ Companion screens          │ ───────────────▶  │  route.ts          │  │
│   │  - Bestie (SVG + Motion)   │  {match,moment,   │  - reads API key   │  │
│   │  - SpeechBubble (typed)    │     vibe}         │  - builds prompt   │  │
│   │  - MomentButtons, etc.     │                   │  - calls OpenAI    │  │
│   │  - localStorage: vibe      │ ◀───────────────  │    gpt-4o-mini     │  │
│   └───────────────────────────┘   { reply }        └─────────┬──────────┘  │
│                                                              │             │
└──────────────────────────────────────────────────────────────┼───────────┘
                                                                 ▼
                                                        OpenAI API (external)
```

## 2. Runtime & rendering

- **App Router** with client components for the interactive screens (`"use client"`).
- The AI route runs on the **Node.js runtime** (`export const runtime = "nodejs"`), so the OpenAI SDK and server-only env vars work.
- Static content (matches, moments, personalities) is bundled in `lib/` — no runtime fetch.

## 3. Request lifecycle (one tap)

1. User taps a `MomentButton`; `CompanionPage` sets stage `thinking`.
2. `services/bestie.ts#askBestie` sends `POST /api/bestie` with `{ match, moment, vibe }`.
3. `route.ts` validates input, normalizes `vibe`, builds the prompt (`lib/bestiePrompt` + the personality `style` from `lib/personalities`), and calls `gpt-4o-mini`.
4. On success it returns `{ reply }`; the client stores it, plays the reaction (stage `reacting`, ~1.1s), then types it out (stage `talking`).
5. On failure the client shows the friendly fallback (stage `error`).

## 4. State & persistence

- **Ephemeral UI state:** React `useState` on the companion screen (stage, reply, active moment) and a timer ref for the reaction delay.
- **Persistent preference:** the chosen personality in `localStorage` (`bestie:personality`), read SSR-safely via `usePersonality`.
- **No database, no server session, no user accounts.**

## 5. Secrets & configuration

- `OPENAI_API_KEY` is read from the environment (`.env.local` locally; Vercel env var in production) **only inside the route handler**. It is never bundled to the client. `.env.example` documents the variable; `.env.local` is git-ignored.

## 6. Code structure (mapping to responsibilities)

| Layer | Location | Responsibility |
|---|---|---|
| Routes/pages | `app/` | Landing, Matches, Companion, and the AI route |
| Presentation | `components/` | Mascot, speech bubble, tiles, scoreboard, backdrops, primitives |
| Reusable logic | `hooks/` | `usePersonality`, `useTypewriter` (+ legacy `useToast`) |
| Data & prompt | `lib/` | `matches`, `moments`, `personalities`, `bestiePrompt`, `cn` |
| Client API | `services/bestie.ts` | Typed `fetch` wrapper for `/api/bestie` |
| Types | `types/index.ts` | Shared domain + request/response types |

## 7. Non-functional characteristics

- **Performance:** animations use only `transform`/`opacity` (GPU-composited) for ~60 FPS; `prefers-reduced-motion` respected.
- **Type safety:** strict TypeScript; passes `tsc --noEmit`.
- **Resilience:** all AI failures resolve to a friendly UI fallback; no raw errors surface.
- **Accessibility:** semantic roles/labels on interactive elements; decorative layers `aria-hidden`.

## 8. Dependencies

`next@^14.2.35`, `react`/`react-dom@^18.3.1`, `framer-motion@^11.3.0`, `openai@^4.56.0`; TypeScript, Tailwind, PostCSS, Autoprefixer (dev). External: OpenAI API.

## 🔮 Future Vision (target architecture, NOT built)
- A dedicated **backend (e.g., FastAPI)** for personalization, history, and orchestration.
- **Redis** caching of common responses; **PostgreSQL** for persistence.
- A **Sports Data API** feeding real fixtures/scores/events (would make the scoreboard real and enable live grounding).
- **Streaming** responses; **analytics/telemetry** pipeline.
