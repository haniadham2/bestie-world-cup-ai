"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useTypewriter } from "@/hooks/useTypewriter";

export type BubbleStatus = "idle" | "thinking" | "talking" | "error";

interface SpeechBubbleProps {
  status: BubbleStatus;
  /** The moment tapped, e.g. "Penalty" — shown as a tiny header chip. */
  momentLabel?: string;
  /** Bestie's reply (revealed as dialogue when talking). */
  reply?: string;
}

const ERROR_TEXT = "Oops 💕 Bestie got a little confused. Try again!";

/**
 * A Disney-style speech bubble that connects up to Bestie with a little tail,
 * so her reply reads as dialogue she's speaking — not a chatbot text box.
 */
export default function SpeechBubble({
  status,
  momentLabel,
  reply,
}: SpeechBubbleProps) {
  const talking = status === "talking";
  const { shown, done } = useTypewriter(reply ?? "", talking);

  return (
    <AnimatePresence mode="wait">
      {status !== "idle" && (
        <motion.div
          key={status}
          initial={{ opacity: 0, y: -10, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8, scale: 0.92 }}
          transition={{ type: "spring", stiffness: 320, damping: 22 }}
          className="relative mx-auto w-full max-w-sm"
        >
          {/* Tail pointing up to Bestie */}
          <div className="mx-auto -mb-2 h-5 w-5 translate-y-1 rotate-45 rounded-sm bg-white shadow-soft" />

          <div className="relative rounded-[28px] bg-white px-6 py-5 shadow-soft ring-1 ring-ink/5">
            {momentLabel && status !== "error" && (
              <span className="mb-2 inline-flex items-center gap-1 rounded-full bg-lavender/40 px-3 py-1 text-xs font-extrabold uppercase tracking-wide text-ink/70">
                {momentLabel}
              </span>
            )}

            {status === "thinking" && <ThinkingDots />}

            {talking && (
              <p className="text-xl font-bold leading-relaxed tracking-[-0.01em] text-ink sm:text-[1.4rem]">
                {shown}
                {!done && (
                  <motion.span
                    aria-hidden="true"
                    className="ml-0.5 inline-block"
                    animate={{ opacity: [1, 0.2, 1] }}
                    transition={{ duration: 0.6, repeat: Infinity }}
                  >
                    ▍
                  </motion.span>
                )}
              </p>
            )}

            {status === "error" && (
              <p className="text-lg font-bold leading-relaxed text-ink">
                {ERROR_TEXT}
              </p>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ThinkingDots() {
  return (
    <div className="flex items-center gap-3 py-1">
      <span className="text-lg font-extrabold text-ink/80">Bestie&apos;s watching</span>
      <span className="flex items-end gap-1 pb-1">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="h-2.5 w-2.5 rounded-full bg-gradient-to-r from-bubblegum to-peach"
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 0.7, repeat: Infinity, ease: "easeInOut", delay: i * 0.15 }}
          />
        ))}
      </span>
    </div>
  );
}
