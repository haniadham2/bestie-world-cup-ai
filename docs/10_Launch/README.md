# Bestie — Launch

| | |
|---|---|
| **Version** | 1.0 |
| **Status** | 🟡 Pre-launch. App runs locally; not yet deployed. |
| **Last updated** | 2026-06-30 |
| **Owner** | Product + Engineering |

> Honest snapshot: the app builds and runs, the AI flow works with a valid key, and it has been tested on a phone via the local network. It has **not** been deployed to production, and there is **no analytics/monitoring** yet.

---

## 1. Current readiness

- ✅ Runs locally (`npm run dev`) and passes `tsc --noEmit`.
- ✅ AI flow works end-to-end with a valid `OPENAI_API_KEY` (billing/quota required).
- ✅ Mobile-tested over local network (`-H 0.0.0.0`).
- ⚠️ Not deployed to Vercel yet.
- ⚠️ No analytics, error monitoring, or alerting.
- ⚠️ Only two example fixtures; scoreboard is cosmetic.

## 2. Pre-launch checklist

**Engineering**
- [ ] Set `OPENAI_API_KEY` as a Vercel environment variable (never commit it).
- [ ] Production build passes (`next build`) and deploys to Vercel.
- [ ] Verify the `/api/bestie` route works in production (Node runtime, key present).
- [ ] Confirm error fallback appears on forced failure (bad key / rate limit).
- [ ] Cross-device mobile QA (iOS Safari, Android Chrome); check safe-area/scroll on small screens.
- [ ] Reduced-motion pass; basic accessibility pass (labels, contrast, focus).
- [ ] Performance sanity (~60 FPS on a mid-range phone).

**Product**
- [ ] Landing passes the 3-second comprehension check with ≥1 fresh viewer.
- [ ] Personality outputs spot-checked against the doc-08 rubric (esp. honesty & ≤35 words).
- [ ] Copy proofread; no "Your AI Bestie" phrasing.

**Cost/ops**
- [ ] Estimate OpenAI spend at expected tap volume; set a billing limit/alert.

## 3. Deployment plan

- **Host:** Vercel (Next.js native). Connect the GitHub repo (`frontend/` as the app root).
- **Env:** `OPENAI_API_KEY` in Vercel project settings (Production + Preview).
- **Process:** merge to `main` → Vercel preview → verify → promote to production.

## 4. Go-to-market (proposals — not committed) 🔮

- **Timing:** launch during the tournament when casual-viewer demand peaks; the value is inherently seasonal.
- **Audience:** casual viewers watching socially; reach via social clips showing Bestie reacting to iconic moments (leans on the future shareable-card feature).
- **Hook:** "Watch the World Cup with Bestie — tap any moment, she explains it." Lead with the demo.

## 5. Monitoring & success (post-launch) 🔮

No telemetry exists today. Before/at launch, add at minimum: error monitoring on `/api/bestie`, and basic product analytics for the metrics in PRD §16 (activation, taps per match, retention, shares). Until then, success is judged qualitatively (comprehension + delight with real users).

## 6. Risks at launch

- **AI cost/latency** under real traffic (per-tap calls). Mitigate with a billing cap and, later, caching.
- **Key/quota misconfiguration** is the most likely failure — the friendly fallback prevents a broken experience but users get no answer; verify billing pre-launch.
- **Thin content** (2 fixtures, no live data) may limit perceived value; set expectations and prioritize the Future Vision items if the concept resonates.

## 7. Rollback

Vercel keeps immutable deployments; roll back by promoting the previous good deployment. No database migrations exist to reverse.

## 🔮 Future Vision
- Analytics + monitoring pipeline; a launch dashboard; a post-launch retro; expanded fixtures and the shareable-card growth loop.
