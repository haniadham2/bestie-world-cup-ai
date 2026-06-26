"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import ScreenContainer from "@/components/ScreenContainer";
import Header from "@/components/Header";
import Bestie, { type BestieMood } from "@/components/Bestie";
import MomentButton from "@/components/MomentButton";
import PersonalityPicker from "@/components/PersonalityPicker";
import ResponseCard, { type ResponseStatus } from "@/components/ResponseCard";
import { MOMENTS } from "@/lib/moments";
import { getMatchById } from "@/lib/matches";
import { askBestie } from "@/services/bestie";
import { usePersonality } from "@/hooks/usePersonality";
import type { Moment } from "@/types";

/** Maps a tapped moment to Bestie's reaction once the reply lands. */
function reactionForMoment(momentId?: string): BestieMood {
  switch (momentId) {
    case "goal":
      return "goal";
    case "yellow-card":
      return "yellow";
    case "red-card":
      return "red";
    case "var":
      return "var";
    default:
      return "idle";
  }
}

/**
 * Companion screen — Bestie sits next to you during the match.
 * Tapping a moment asks the AI (in the chosen personality) and shows the
 * reply in an animated card.
 */
export default function CompanionPage() {
  const params = useParams<{ matchId: string }>();
  const match = getMatchById(params.matchId);
  const { personality, setPersonality } = usePersonality();

  const [status, setStatus] = useState<ResponseStatus>("idle");
  const [reply, setReply] = useState("");
  const [activeMoment, setActiveMoment] = useState<Moment | null>(null);

  const matchLabel = match
    ? `${match.home.name} vs ${match.away.name}`
    : "this match";

  // Bestie's expression follows the conversation.
  const mood: BestieMood =
    status === "thinking"
      ? "thinking"
      : status === "done"
        ? reactionForMoment(activeMoment?.id)
        : "idle";

  const handleMoment = async (moment: Moment) => {
    if (status === "thinking") return; // ignore taps while Bestie is replying

    setActiveMoment(moment);
    setReply("");
    setStatus("thinking");

    try {
      const text = await askBestie({
        match: matchLabel,
        moment: moment.label,
        vibe: personality,
      });
      setReply(text);
      setStatus("done");
    } catch {
      setStatus("error");
    }
  };

  return (
    <ScreenContainer gradient="from-peach/50 via-cream to-lavender/50">
      <Header showBack />

      <div className="flex flex-col items-center gap-3 text-center">
        <Bestie mood={mood} size={200} />
        <h1 className="text-3xl font-extrabold text-ink sm:text-4xl">
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

      {/* Personality picker — choice persists in localStorage. */}
      <div className="mt-6">
        <PersonalityPicker selected={personality} onSelect={setPersonality} />
      </div>

      {/* Bestie's animated reply. */}
      <div className="mt-4 min-h-[1px]">
        <ResponseCard
          status={status}
          reply={reply}
          momentLabel={activeMoment?.label}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.4 }}
        className="mt-7 grid grid-cols-2 gap-4 sm:grid-cols-3"
      >
        {MOMENTS.map((moment, i) => (
          <MomentButton
            key={moment.id}
            moment={moment}
            onPress={handleMoment}
            index={i}
          />
        ))}
      </motion.div>
    </ScreenContainer>
  );
}
