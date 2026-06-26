"use client";

import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import ScreenContainer from "@/components/ScreenContainer";
import Header from "@/components/Header";
import Scoreboard from "@/components/Scoreboard";
import Bestie, { type BestieMood } from "@/components/Bestie";
import SpeechBubble, { type BubbleStatus } from "@/components/SpeechBubble";
import GoalCelebration from "@/components/GoalCelebration";
import MomentButton from "@/components/MomentButton";
import PersonalityPicker from "@/components/PersonalityPicker";
import { MOMENTS } from "@/lib/moments";
import { getMatchById } from "@/lib/matches";
import { askBestie } from "@/services/bestie";
import { usePersonality } from "@/hooks/usePersonality";
import type { Moment } from "@/types";

/** The little story each tap tells. */
type Stage = "idle" | "thinking" | "reacting" | "talking" | "error";

/** Maps a tapped moment to Bestie's reaction. */
function reactionForMoment(momentId?: string): BestieMood {
  switch (momentId) {
    case "goal":
      return "goal";
    case "yellow-card":
      return "yellow";
    case "red-card":
      return "red";
    case "offside":
      return "offside";
    case "corner-kick":
      return "corner";
    case "var":
      return "var";
    case "penalty":
      return "penalty";
    default:
      return "idle";
  }
}

/**
 * Companion screen — Bestie watches the live match with you. Tapping a moment
 * tells a tiny story: she thinks, *reacts* to what happened, then speaks her
 * explanation in a dialogue bubble.
 */
export default function CompanionPage() {
  const params = useParams<{ matchId: string }>();
  const match = getMatchById(params.matchId);
  const { personality, setPersonality } = usePersonality();

  const [stage, setStage] = useState<Stage>("idle");
  const [reply, setReply] = useState("");
  const [activeMoment, setActiveMoment] = useState<Moment | null>(null);
  const reactTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (reactTimer.current) clearTimeout(reactTimer.current);
    };
  }, []);

  const matchLabel = match
    ? `${match.home.name} vs ${match.away.name}`
    : "this match";

  // Bestie's expression follows the story.
  const mood: BestieMood =
    stage === "thinking"
      ? "thinking"
      : stage === "reacting" || stage === "talking"
        ? reactionForMoment(activeMoment?.id)
        : "idle";

  // The bubble only speaks while thinking, talking, or apologising.
  const bubbleStatus: BubbleStatus =
    stage === "thinking"
      ? "thinking"
      : stage === "talking"
        ? "talking"
        : stage === "error"
          ? "error"
          : "idle";

  const isBusy = stage === "thinking" || stage === "reacting";
  const showGoal =
    (stage === "reacting" || stage === "talking") && activeMoment?.id === "goal";

  const handleMoment = async (moment: Moment) => {
    if (isBusy) return; // ignore taps mid-story
    if (reactTimer.current) clearTimeout(reactTimer.current);

    setActiveMoment(moment);
    setReply("");
    setStage("thinking");

    try {
      const text = await askBestie({
        match: matchLabel,
        moment: moment.label,
        vibe: personality,
      });
      // React first…
      setReply(text);
      setStage("reacting");
      // …then speak.
      reactTimer.current = setTimeout(() => setStage("talking"), 1100);
    } catch {
      setStage("error");
    }
  };

  return (
    <ScreenContainer gradient="from-peach/50 via-cream to-lavender/50">
      <Header showBack />

      {match && (
        <div className="mt-1">
          <Scoreboard match={match} />
        </div>
      )}

      <div className="mt-5 flex flex-col items-center gap-3 text-center">
        <Bestie mood={mood} personality={personality} size={196} />
        <h1 className="text-3xl font-black tracking-tight text-ink sm:text-4xl">
          Bestie&apos;s on the couch with you
        </h1>
        <p className="text-sm font-bold text-ink/45">
          Tap whatever just happened 👇
        </p>
      </div>

      {/* Bestie speaks — dialogue bubble connected to her. */}
      <div className="mt-4 min-h-[1px]">
        <SpeechBubble
          status={bubbleStatus}
          reply={reply}
          momentLabel={activeMoment?.label}
        />
      </div>

      {/* Personality picker — choice persists in localStorage. */}
      <div className="mt-6">
        <PersonalityPicker selected={personality} onSelect={setPersonality} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.4 }}
        className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3"
      >
        {MOMENTS.map((moment, i) => (
          <MomentButton
            key={moment.id}
            moment={moment}
            onPress={handleMoment}
            index={i}
            active={activeMoment?.id === moment.id && stage !== "idle"}
          />
        ))}
      </motion.div>

      {/* GOAL! cinematic */}
      <AnimatePresence>{showGoal && <GoalCelebration key="goal" />}</AnimatePresence>
    </ScreenContainer>
  );
}
