"use client";

import { motion } from "framer-motion";
import type { Match } from "@/types";
import Card from "./Card";

interface MatchCardProps {
  match: Match;
  onSelect: (match: Match) => void;
}

/**
 * A single fixture rendered as a tappable, gradient-topped card.
 * Composes the generic Card so motion + a11y come for free, then adds its own
 * playful details: a shimmering kickoff strip, flags that wiggle on hover, a
 * pulsing "vs", and a "Watch" cue that nudges forward.
 */
export default function MatchCard({ match, onSelect }: MatchCardProps) {
  const { home, away, kickoff, gradient } = match;

  return (
    <Card
      onClick={() => onSelect(match)}
      aria-label={`Watch ${home.name} versus ${away.name}`}
      className="group overflow-hidden p-0"
    >
      {/* Kickoff strip with a slow light shimmer + live badge. */}
      <div className={`relative flex items-center justify-between overflow-hidden bg-gradient-to-r ${gradient} px-5 py-3`}>
        <motion.span
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 bg-white/30 blur-md"
          animate={{ x: ["-40%", "520%"] }}
          transition={{ duration: 1.4, repeat: Infinity, repeatDelay: 3.5, ease: "easeInOut" }}
        />
        <span className="relative text-sm font-bold text-white/90">{kickoff}</span>
        <span className="relative flex items-center gap-1.5 rounded-full bg-black/20 px-2.5 py-1">
          <motion.span
            className="h-1.5 w-1.5 rounded-full bg-white"
            animate={{ opacity: [1, 0.3, 1], scale: [1, 1.4, 1] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
          />
          <span className="text-[10px] font-black uppercase tracking-widest text-white">
            Live soon
          </span>
        </span>
      </div>

      <div className="flex items-center justify-between gap-3 px-6 py-6">
        <TeamBadge flag={home.flag} name={home.name} />
        <motion.span
          className="text-lg font-extrabold text-ink/40"
          animate={{ scale: [1, 1.18, 1] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        >
          vs
        </motion.span>
        <TeamBadge flag={away.flag} name={away.name} />
      </div>

      {/* Gentle "watch" cue that nudges right as you hover the card. */}
      <div className="flex items-center justify-center gap-1 pb-4 text-sm font-extrabold text-ink/50">
        <span>Watch with Bestie</span>
        <motion.span
          aria-hidden="true"
          animate={{ x: [0, 4, 0] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
        >
          →
        </motion.span>
      </div>
    </Card>
  );
}

function TeamBadge({ flag, name }: { flag: string; name: string }) {
  return (
    <div className="flex flex-1 flex-col items-center gap-2">
      <motion.span
        className="text-5xl"
        aria-hidden="true"
        whileHover={{ rotate: [0, -10, 10, -6, 0], scale: 1.12 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        {flag}
      </motion.span>
      <span className="text-center text-base font-extrabold text-ink">
        {name}
      </span>
    </div>
  );
}
