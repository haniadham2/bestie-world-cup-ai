"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import type { Match } from "@/types";

interface ScoreboardProps {
  match: Match;
}

/**
 * A broadcast-style scoreboard so the companion screen feels like a *live*
 * World Cup match: animated flags, a pulsing LIVE badge, and a ticking match
 * minute. Purely cosmetic — no real data, no API.
 */
export default function Scoreboard({ match }: ScoreboardProps) {
  const [minute, setMinute] = useState(23);

  // Cosmetic "live" minute that keeps gently ticking up.
  useEffect(() => {
    const id = setInterval(() => {
      setMinute((m) => (m >= 90 ? 45 : m + 1));
    }, 4000);
    return () => clearInterval(id);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className="mx-auto flex w-full max-w-sm items-center justify-between gap-3 rounded-3xl bg-night/90 px-4 py-3 text-white shadow-soft"
    >
      <Side flag={match.home.flag} name={match.home.name} />

      <div className="flex flex-col items-center gap-1">
        <div className="flex items-center gap-1 rounded-full bg-white/10 px-2 py-0.5">
          <motion.span
            className="h-2 w-2 rounded-full bg-[#FF5D73]"
            animate={{ opacity: [1, 0.3, 1], scale: [1, 1.25, 1] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
          />
          <span className="text-[10px] font-black uppercase tracking-widest">Live</span>
        </div>
        <div className="text-2xl font-black tabular-nums">0&nbsp;-&nbsp;0</div>
        <div className="flex items-center gap-1 text-[11px] font-bold text-white/70">
          <motion.span
            animate={{ opacity: [1, 0.4, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            ●
          </motion.span>
          <span className="tabular-nums">{minute}&rsquo;</span>
        </div>
      </div>

      <Side flag={match.away.flag} name={match.away.name} />
    </motion.div>
  );
}

function Side({ flag, name }: { flag: string; name: string }) {
  return (
    <div className="flex flex-1 flex-col items-center gap-1">
      <motion.span
        className="text-3xl"
        aria-hidden="true"
        animate={{ rotate: [0, -6, 6, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
      >
        {flag}
      </motion.span>
      <span className="text-xs font-extrabold uppercase tracking-wide text-white/90">
        {name}
      </span>
    </div>
  );
}
