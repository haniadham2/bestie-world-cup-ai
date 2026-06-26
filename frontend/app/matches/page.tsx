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
      <Header title="Pick a match" showBack />

      <div className="mt-2 mb-6 px-1">
        <p className="text-base font-bold text-ink/60">
          Who are we cheering for today? 🎉
        </p>
      </div>

      <div className="flex flex-col gap-5">
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
