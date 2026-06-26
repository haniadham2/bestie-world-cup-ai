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
          className="rounded-4xl bg-white p-6 shadow-soft sm:p-7"
        >
          {momentLabel && status !== "error" && (
            <span className="mb-3 inline-block rounded-full bg-lavender/40 px-3 py-1 text-xs font-extrabold uppercase tracking-wide text-ink/70">
              {momentLabel}
            </span>
          )}

          {status === "thinking" && <ThinkingState />}

          {status === "done" && (
            <p className="text-xl font-bold leading-relaxed tracking-[-0.01em] text-ink sm:text-2xl">
              {reply}
            </p>
          )}

          {status === "error" && (
            <p className="text-lg font-bold leading-relaxed text-ink">
              {ERROR_TEXT}
            </p>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/** "Bestie is thinking..." with three playful bouncing dots. */
function ThinkingState() {
  return (
    <div className="flex items-center gap-3">
      <motion.span
        animate={{ opacity: [0.55, 1, 0.55] }}
        transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
        className="text-lg font-extrabold text-ink"
      >
        ✨ Bestie is thinking
      </motion.span>
      <span className="flex items-end gap-1 pb-1" aria-hidden="true">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="h-2 w-2 rounded-full bg-gradient-to-r from-bubblegum to-peach"
            animate={{ y: [0, -6, 0] }}
            transition={{
              duration: 0.7,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.15,
            }}
          />
        ))}
      </span>
    </div>
  );
}
