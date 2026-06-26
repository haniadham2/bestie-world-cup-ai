"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import ScreenContainer from "@/components/ScreenContainer";
import Header from "@/components/Header";
import MatchCard from "@/components/MatchCard";
import { MATCHES } from "@/lib/matches";
import type { Match } from "@/types";

/**
 * Match selection — pick a fixture to watch with Bestie.
 * Cards stagger in for a little extra delight.
 */
export default function MatchesPage() {
  const router = useRouter();

  const handleSelect = (match: Match) => {
    router.push(`/companion/${match.id}`);
  };

  return (
    <ScreenContainer gradient="from-cream to-sky/40">
      <Header showBack />

      <motion.div
        className="mb-7 mt-1 px-1"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <span className="text-xs font-black uppercase tracking-[0.18em] text-ink/45">
          Today&rsquo;s fixtures
        </span>
        <h1 className="mt-1 flex items-center gap-2 text-4xl font-black tracking-tight text-ink">
          Pick a match
          <motion.span
            aria-hidden="true"
            animate={{ rotate: [0, 18, -12, 0], scale: [1, 1.15, 1] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          >
            ⚽️
          </motion.span>
        </h1>
        <p className="mt-1 text-base font-bold text-ink/55">
          Who are we cheering for today?
        </p>
      </motion.div>

      <div className="flex flex-col gap-6">
        {MATCHES.map((match, i) => (
          <motion.div
            key={match.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.1, duration: 0.35 }}
          >
            <MatchCard match={match} onSelect={handleSelect} />
          </motion.div>
        ))}
      </div>
    </ScreenContainer>
  );
}
