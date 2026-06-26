"use client";

import { motion } from "framer-motion";
import type { Moment } from "@/types";

interface MomentButtonProps {
  moment: Moment;
  onPress: (moment: Moment) => void;
}

/**
 * A large, friendly tile for an in-match moment (Goal, Penalty, …).
 * Sprint 1: pressing only fires `onPress` which shows a toast.
 */
export default function MomentButton({ moment, onPress }: MomentButtonProps) {
  return (
    <motion.button
      type="button"
      onClick={() => onPress(moment)}
      aria-label={moment.label}
      whileHover={{ scale: 1.04, y: -2 }}
      whileTap={{ scale: 0.94 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className="flex aspect-square flex-col items-center justify-center gap-2 rounded-4xl bg-white p-3 shadow-soft"
    >
      <span className="text-4xl" aria-hidden="true">
        {moment.emoji}
      </span>
      <span className="text-center text-sm font-extrabold leading-tight text-ink">
        {moment.label}
      </span>
    </motion.button>
  );
}
