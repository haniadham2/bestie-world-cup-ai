"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";

/**
 * Full-screen GOAL! moment: a football rockets into the net while confetti
 * rains and a big "GOAL!" stamps in. Plays once when Goal is tapped, then
 * fades. Overlay only — pointer-events-none, no layout impact.
 *
 * Rendered through a portal to <body> so its `fixed` positioning is anchored
 * to the real viewport, not a transformed ancestor.
 */
export default function GoalCelebration() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return createPortal(<GoalOverlay />, document.body);
}

function GoalOverlay() {
  const colors = ["#FF9EC4", "#A8D8FF", "#B8F2D8", "#FFE08A", "#D6C7FF", "#FF5D73"];
  const confetti = Array.from({ length: 28 }, (_, i) => ({
    left: `${(i * 37) % 100}%`,
    delay: (i % 7) * 0.05,
    color: colors[i % colors.length],
    rot: (i % 2 ? 1 : -1) * 360,
    drift: (i % 5) - 2,
  }));

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-50 overflow-hidden"
      initial={{ opacity: 1 }}
      animate={{ opacity: [1, 1, 0] }}
      transition={{ duration: 2, times: [0, 0.7, 1] }}
      aria-hidden="true"
    >
      {/* Goal net + flying ball, centered */}
      <div className="absolute left-1/2 top-[34%] -translate-x-1/2">
        <svg width="200" height="150" viewBox="0 0 200 150">
          {/* Net */}
          <rect x="30" y="20" width="140" height="86" rx="6" fill="none" stroke="#ffffff" strokeOpacity="0.85" strokeWidth="4" />
          <g stroke="#ffffff" strokeOpacity="0.35" strokeWidth="1.5">
            {[46, 62, 78, 94, 110, 126, 142, 158].map((x) => (
              <line key={x} x1={x} y1="22" x2={x} y2="104" />
            ))}
            {[36, 52, 68, 84, 100].map((y) => (
              <line key={y} x1="32" y1={y} x2="168" y2={y} />
            ))}
          </g>
          {/* Ball flies bottom-left into the net */}
          <motion.g
            initial={{ x: -120, y: 150, scale: 0.6 }}
            animate={{ x: 70, y: 40, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <circle cx="0" cy="0" r="13" fill="#fff" stroke="#3A3258" strokeWidth="1.5" />
            <path d="M0 -6 l4 3 -1.5 5 h-5 l-1.5 -5 z" fill="#3A3258" />
          </motion.g>
        </svg>
      </div>

      {/* GOAL! stamp */}
      <motion.div
        className="absolute left-1/2 top-[58%] -translate-x-1/2"
        initial={{ scale: 0, rotate: -12, opacity: 0 }}
        animate={{ scale: [0, 1.25, 1], rotate: [-12, 4, -6], opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.45 }}
      >
        <span className="bg-gradient-to-r from-bubblegum to-peach bg-clip-text text-6xl font-black tracking-tight text-transparent drop-shadow sm:text-7xl">
          GOAL!
        </span>
      </motion.div>

      {/* Confetti rain */}
      {confetti.map((c, i) => (
        <motion.span
          key={i}
          className="absolute top-[-6%] h-3 w-2 rounded-[2px]"
          style={{ left: c.left, backgroundColor: c.color }}
          initial={{ y: 0, opacity: 0, rotate: 0 }}
          animate={{ y: "115vh", x: c.drift * 30, opacity: [0, 1, 1, 0.8], rotate: c.rot }}
          transition={{ duration: 1.8, ease: "easeIn", delay: c.delay }}
        />
      ))}
    </motion.div>
  );
}
