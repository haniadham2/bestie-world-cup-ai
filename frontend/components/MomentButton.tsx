"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { Moment } from "@/types";

interface MomentButtonProps {
  moment: Moment;
  onPress: (moment: Moment) => void;
  /** Position in the grid — used to stagger the idle float. */
  index?: number;
}

/** A soft colour wash behind each moment's emoji, keyed by id. */
const TINT: Record<string, string> = {
  goal: "bg-mint/60",
  "yellow-card": "bg-sunny/60",
  "red-card": "bg-bubblegum/50",
  offside: "bg-sky/60",
  "corner-kick": "bg-lavender/60",
  penalty: "bg-peach/60",
  var: "bg-sky/50",
  "what-should-i-say": "bg-bubblegum/40",
};

/**
 * A large, friendly tile for an in-match moment (Goal, Penalty, …).
 * Breathes gently at rest, lifts on hover, and the emoji gives a happy
 * wiggle when you point at it — then squashes on tap.
 */
export default function MomentButton({
  moment,
  onPress,
  index = 0,
}: MomentButtonProps) {
  const reduce = useReducedMotion();
  const tint = TINT[moment.id] ?? "bg-lavender/50";

  return (
    <motion.button
      type="button"
      onClick={() => onPress(moment)}
      aria-label={moment.label}
      initial={false}
      animate={reduce ? undefined : { y: [0, -4, 0] }}
      transition={{
        duration: 3.4,
        repeat: Infinity,
        ease: "easeInOut",
        delay: (index % 4) * 0.25,
      }}
      whileHover={{ scale: 1.05, y: -4 }}
      whileTap={{ scale: 0.93 }}
      className="group flex aspect-square flex-col items-center justify-center gap-2 rounded-4xl bg-white p-3 shadow-soft"
    >
      <span className="relative grid h-14 w-14 place-items-center">
        {/* Colour disc that gently grows on hover. */}
        <motion.span
          aria-hidden="true"
          className={`absolute inset-0 rounded-full ${tint}`}
          initial={false}
          whileHover={{ scale: 1.12 }}
          transition={{ type: "spring", stiffness: 300, damping: 18 }}
        />
        <motion.span
          className="relative text-3xl"
          aria-hidden="true"
          whileHover={{ rotate: [0, -12, 12, -8, 0], scale: 1.15 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {moment.emoji}
        </motion.span>
      </span>
      <span className="text-center text-sm font-extrabold leading-tight text-ink">
        {moment.label}
      </span>
    </motion.button>
  );
}
