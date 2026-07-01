# Bestie — AI Strategy

| | |
|---|---|
| **Version** | 1.0 |
| **Status** | ✅ Reflects the current AI implementation. |
| **Last updated** | 2026-06-30 |
| **Owner** | Product + Engineering |

---

## 1. Role of AI in the product

AI has exactly one job: **turn a tapped football moment into a short, warm, in-character reaction + explanation.** It is not a general chatbot, a Q&A box, or a stats engine. The user never types; they tap a moment, and the AI produces one friendly line (≤35 words) in the selected personality's voice.

## 2. Model choice

- **Model:** OpenAI **`gpt-4o-mini`**, via the official `openai` Node SDK.
- **Parameters:** `temperature: 0.9` (playful variety), `max_tokens: 120` (comfortably covers ≤35 words).
- **Rationale:** `gpt-4o-mini` is fast and inexpensive per call — important because **every tap is a live API call** — and more than capable for short, tone-driven generations. A larger model would add cost/latency without meaningful benefit for one-sentence reactions.
- **Trade-offs:** small models can occasionally drift in tone or length; we constrain this with the prompt (doc 07) rather than a bigger model.

## 3. Personality system

Five modes (`lib/personalities.ts`) — **Cute, Funny, Hype, Coach, Beginner** — each carrying a `style` tone instruction injected into the prompt. The mode shapes **both** the words (via the prompt) and the mascot's look (via the `Bestie` component). One shared source of truth keeps client and server in sync (PRD §7.5, §11).

## 4. Guardrails & principles

- **Honesty (critical).** No live data exists, so the AI must be *emotionally* live and team/match aware but must **never state invented scores, scorers, or specific events** it cannot know. This protects beginner trust.
- **Tone.** Warm, cute, funny, encouraging; never patronizing; never a teacher/textbook/commentator.
- **Brevity.** Hard limit of ≤35 words; one thought, not a lecture or list.
- **Simplicity.** Everyday English and relatable analogies.
- **Safety/appropriateness.** Friendly, family-appropriate content suitable for all ages.

## 5. Context strategy

Each request sends the minimum useful context: the **match** (team names), the **moment** tapped, and the **personality** tone. No conversation history, user data, or live state is sent (there is none to send). This keeps prompts small, fast, and private.

## 6. Reliability & failure behavior

- The key is read **server-side only**; the client never sees it.
- The route returns clear status codes (500 missing key, 400 bad input, 502 model failure); the client always resolves failures to a friendly fallback ("Oops 💕 Bestie got a little confused. Try again!"). The user never sees a raw error (PRD §8, §14).

## 7. Cost, latency & privacy

- **Cost:** one `gpt-4o-mini` call per tap; low per-call cost but scales linearly with taps.
- **Latency:** covered UX-wise by the "Bestie is thinking…" state and the react-before-explain beat.
- **Privacy:** no personal data collected; only match/moment/vibe are sent to OpenAI. Personality preference stays in the browser's `localStorage`.

## 🔮 Future Vision
- **Ground responses in live data** (once a sports-data API exists) so Bestie can reference real scores/events — relaxing the honesty constraint safely.
- **Streaming** token-by-token for faster perceived response.
- **Caching** common moment×personality responses to cut cost/latency.
- **Evaluation harness** (doc 08) and prompt/versioning discipline; possible fine-tuning if tone consistency needs it.
