"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Bestie, { type BestieMood } from "@/components/Bestie";
import SpeechBubble from "@/components/SpeechBubble";

/**
 * The landing hero IS the product demo. It auto-plays the core loop —
 * tap a moment → Bestie reacts → Bestie explains — so a first-time visitor
 * understands what the app does in a few seconds, without reading anything.
 */
const STEPS: { id: string; label: string; emoji: string; mood: BestieMood; line: string }[] = [
  {
    id: "goal",
    label: "Goal",
    emoji: "⚽️",
    mood: "goal",
    line: "GOOOAL!! 🎉 Everyone's on their feet — what an amazing moment!",
  },
  {
    id: "red-card",
    label: "Red Card",
    emoji: "🟥",
    mood: "red",
    line: "Whoa! That's a red card — that player has to leave the game. Big drama!",
  },
  {
    id: "var",
    label: "VAR",
    emoji: "📺",
    mood: "var",
    line: "The ref is checking the replay… let's see what they decide!",
  },
];

export default function LandingDemo() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setStep((s) => (s + 1) % STEPS.length), 4200);
    return () => clearInterval(id);
  }, []);

  const current = STEPS[step];

  return (
    <div className="flex w-full flex-col items-center">
      {/* Step 1 — what you tap */}
      <span className="mb-3 text-sm font-extrabold uppercase tracking-[0.15em] text-ink/45">
        Tap what just happened
      </span>
      <div className="flex items-center gap-3">
        {STEPS.map((s, i) => {
          const active = i === step;
          return (
            <motion.div
              key={s.id}
              className="relative flex flex-col items-center gap-1 rounded-3xl bg-white px-4 py-3 shadow-soft"
              animate={{
                scale: active ? 1.08 : 0.94,
                opacity: active ? 1 : 0.55,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
            >
              {active && (
                <motion.span
                  layoutId="demo-ring"
                  className="pointer-events-none absolute inset-0 rounded-3xl ring-4 ring-bubblegum/70"
                  transition={{ type: "spring", stiffness: 300, damping: 26 }}
                />
              )}
              <span className="text-2xl" aria-hidden="true">
                {s.emoji}
              </span>
              <span className="text-xs font-extrabold text-ink">{s.label}</span>
              {active && (
                <motion.span
                  aria-hidden="true"
                  className="absolute -bottom-6 text-xl"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 0.9, repeat: Infinity, ease: "easeInOut" }}
                >
                  👆
                </motion.span>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Flow arrow */}
      <motion.span
        aria-hidden="true"
        className="my-3 text-2xl text-ink/30"
        animate={{ y: [0, 5, 0] }}
        transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
      >
        ↓
      </motion.span>

      {/* Step 2 — Bestie reacts */}
      <Bestie mood={current.mood} size={168} />

      {/* Step 3 — Bestie explains */}
      <div className="mt-2 min-h-[110px] w-full">
        <SpeechBubble status="talking" reply={current.line} momentLabel={current.label} />
      </div>
    </div>
  );
}
