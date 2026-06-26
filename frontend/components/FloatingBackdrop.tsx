"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Ambient layer of soft, blurred pastel blobs that drift slowly behind every
 * screen. Purely decorative (pointer-events-none, aria-hidden) — it gives the
 * whole app a sense of gentle, living atmosphere without touching content.
 *
 * Only transform + opacity animate, so it stays buttery at 60 FPS.
 */
const BLOBS = [
  { className: "left-[-12%] top-[8%] h-56 w-56 bg-bubblegum/30", dx: 24, dy: 18, d: 14 },
  { className: "right-[-14%] top-[22%] h-64 w-64 bg-sky/30", dx: -28, dy: 22, d: 17 },
  { className: "left-[-8%] bottom-[10%] h-52 w-52 bg-mint/30", dx: 20, dy: -16, d: 16 },
  { className: "right-[-10%] bottom-[6%] h-60 w-60 bg-lavender/30", dx: -22, dy: -20, d: 19 },
];

export default function FloatingBackdrop() {
  const reduce = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {BLOBS.map((b, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full blur-3xl ${b.className}`}
          animate={
            reduce
              ? undefined
              : { x: [0, b.dx, 0], y: [0, b.dy, 0], scale: [1, 1.12, 1] }
          }
          transition={{
            duration: b.d,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 1.5,
          }}
        />
      ))}
    </div>
  );
}
