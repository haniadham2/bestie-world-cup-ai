"use client";

import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import ScreenContainer from "@/components/ScreenContainer";
import Header from "@/components/Header";
import MascotPlaceholder from "@/components/MascotPlaceholder";
import MomentButton from "@/components/MomentButton";
import Toast from "@/components/Toast";
import { useToast } from "@/hooks/useToast";
import { MOMENTS } from "@/lib/moments";
import { getMatchById } from "@/lib/matches";
import type { Moment } from "@/types";

/**
 * Companion screen — Bestie sits next to you during the match.
 * Sprint 1: tapping a moment just shows a "Coming in Sprint 2" toast.
 */
export default function CompanionPage() {
  const params = useParams<{ matchId: string }>();
  const match = getMatchById(params.matchId);
  const { toast, showToast } = useToast();

  const handleMoment = (_moment: Moment) => {
    showToast("Coming in Sprint 2 ✨");
  };

  return (
    <ScreenContainer gradient="from-peach/50 via-cream to-lavender/50">
      <Header showBack />

      <div className="flex flex-col items-center gap-3 text-center">
        <MascotPlaceholder size="lg" />
        <h1 className="text-3xl font-extrabold text-ink">
          Bestie is watching with you
        </h1>
        {match && (
          <p className="text-base font-bold text-ink/60">
            {match.home.flag} {match.home.name} vs {match.away.name}{" "}
            {match.away.flag}
          </p>
        )}
        <p className="text-sm font-bold text-ink/50">
          Tap whatever just happened 👇
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.4 }}
        className="mt-7 grid grid-cols-2 gap-4"
      >
        {MOMENTS.map((moment) => (
          <MomentButton key={moment.id} moment={moment} onPress={handleMoment} />
        ))}
      </motion.div>

      <Toast message={toast.message} visible={toast.visible} />
    </ScreenContainer>
  );
}
