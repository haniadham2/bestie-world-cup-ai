"use client";

import { AnimatePresence, motion } from "framer-motion";

export type ResponseStatus = "idle" | "thinking" | "done" | "error";

interface ResponseCardProps {
  status: ResponseStatus;
  /** The moment the viewer tapped, e.g. "Penalty" — shown as a little chip. */
  momentLabel?: string;
  /** Bestie's reply (when status is "done"). */
  reply?: string;
}

const THINKING_TEXT = "✨ Bestie is thinking...";
const ERROR_TEXT = "Oops 💕 Bestie got a little confused. Try again.";

/**
 * The animated card that shows Bestie's reaction. Swaps smoothly between
 * the thinking, answer, and error states with Framer Motion.
 */
export default function ResponseCard({
  status,
  momentLabel,
  reply,
}: ResponseCardProps) {
  return (
    <AnimatePresence mode="wait">
      {status !== "idle" && (
        <motion.div
          key={status}
          initial={{ opacity: 0, y: 16, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -12, scale: 0.96 }}
          transition={{ type: "spring", stiffness: 300, damping: 24 }}
          role="status"
          aria-live="polite"
          className="rounded-4xl bg-white p-6 shadow-soft"
        >
          {momentLabel && status !== "error" && (
            <span className="mb-3 inline-block rounded-full bg-lavender/40 px-3 py-1 text-xs font-extrabold text-ink/70">
              {momentLabel}
            </span>
          )}

          {status === "thinking" && <ThinkingText />}

          {status === "done" && (
            <p className="text-lg font-bold leading-snug text-ink">{reply}</p>
          )}

          {status === "error" && (
            <p className="text-lg font-bold leading-snug text-ink">
              {ERROR_TEXT}
            </p>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/** Gently pulsing "thinking" line with three bouncing dots. */
function ThinkingText() {
  return (
    <div className="flex items-center gap-2">
      <motion.span
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 1.4, repeat: Infinity }}
        className="text-lg font-bold text-ink"
      >
        {THINKING_TEXT}
      </motion.span>
    </div>
  );
}
