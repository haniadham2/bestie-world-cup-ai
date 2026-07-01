# Bestie — User Research

| | |
|---|---|
| **Version** | 1.0 |
| **Status** | 🟡 Research plan + working assumptions. **No primary research has been conducted yet.** |
| **Last updated** | 2026-06-30 |
| **Owner** | Product |

> **Honesty note.** To date, Bestie's design has been driven by a clear persona and product intuition — **not** by conducted interviews, surveys, or usability tests. This document therefore contains **no findings or quotes** (none exist). It records the assumptions we are betting on, the questions we still need answered, and the plan to answer them.

---

## 1. Research goals

1. Validate that the target user (casual first-time viewer) actually feels the "left out / too embarrassed to ask" pain we designed for.
2. Test whether the core loop (**tap what happened → Bestie reacts → explains**) is understood without instruction.
3. Learn whether Bestie's tone and length (≤35 words, playful) land as "helpful and delightful" rather than "childish" or "not enough."
4. Understand real viewing context (second screen, social setting, noise, divided attention).

## 2. Primary persona (assumption, not yet validated)

**Emily** — casual World Cup viewer, watching with a partner/friends/family who understand soccer. Doesn't know the game, doesn't want to ask embarrassing questions, wants to share the excitement, loves cute and delightful apps. See PRD §3.

## 3. Working assumptions we are betting on

Each of these is currently **unvalidated** and should be tested:

- **A1.** Casual viewers frequently experience "what just happened?" moments and feel social friction asking.
- **A2.** People will hold a phone (second screen) while watching and are willing to tap during play.
- **A3.** A short, emotional explanation is more valuable to this user than a detailed/accurate one.
- **A4.** A cute mascot increases willingness to engage vs. a plain text assistant.
- **A5.** Manual tapping (vs. automatic detection) is acceptable for an MVP.
- **A6.** Not knowing the live score (Bestie can't say "1–0") won't significantly hurt perceived value.

## 4. Key questions to answer

- Do users understand what the app does from the landing page alone (the 3-second comprehension bar)?
- Which moments do they most want explained? (Is the current set of 8 right?)
- Does the "react before explain" beat feel delightful or slow?
- Which personality do they gravitate to, and does switching it matter to them?
- Does the ≤35-word limit feel "just right," too short, or too shallow?
- Is per-tap latency ("Bestie is thinking…") acceptable in a live-match context?

## 5. Proposed methods

- **Guided watch-alongs (qual, highest value):** observe 6–10 target users using Bestie during a real or recorded match; think-aloud.
- **First-impression test:** show only the landing page for ~5s, then ask "what does this app do?" (pass/fail on comprehension).
- **Moment-first-tap usability:** can a new user reach the companion screen and get an explanation unaided?
- **Lightweight survey:** post-session sentiment on clarity, delight, trust, and whether they'd use it again / recommend it.
- **Tone test:** compare a few personality outputs; capture preference and any "too childish / too shallow" reactions.

## 6. Success signals (qualitative, for the MVP)

- A first-time user can state the value ("I tap what happens and it explains it") after the landing page.
- Users complete their first explanation without help.
- Users describe Bestie as "cute/fun/helpful," not "confusing/robotic."
- Users express intent to use it again during the tournament.

## 7. How findings feed the product

Findings validate or revise the PRD assumptions (§3) and may reprioritize: the moment set (`lib/moments`), tone/length constraints (`lib/bestiePrompt`), the reaction timing, and Future Vision items (live data, onboarding, sharing).

## 🔮 Future Vision
- Recruit and run the studies above; maintain an insights repository with themes ranked by frequency × impact.
- Once analytics exist (see PRD §16), triangulate qualitative findings with behavioral data.
