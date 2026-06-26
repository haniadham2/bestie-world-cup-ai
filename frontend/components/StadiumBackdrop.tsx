"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Living stadium atmosphere behind every screen: soft floodlight beams, a
 * grass-toned glow rising from the pitch, drifting footballs, and twinkles.
 * Decorative only (pointer-events-none, aria-hidden) and tuned to stay subtle
 * — football identity without visual noise. Transform/opacity only → 60 FPS.
 */
export default function StadiumBackdrop() {
  const reduce = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {/* Floodlight beams from the top corners */}
      <motion.div
        className="absolute -left-24 -top-32 h-[60vh] w-[55vw] rotate-12 bg-gradient-to-b from-white/40 to-transparent blur-3xl"
        animate={reduce ? undefined : { opacity: [0.35, 0.6, 0.35] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -right-24 -top-32 h-[60vh] w-[55vw] -rotate-12 bg-gradient-to-b from-white/40 to-transparent blur-3xl"
        animate={reduce ? undefined : { opacity: [0.5, 0.3, 0.5] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Soft pastel light pools */}
      {[
        { c: "bg-bubblegum/25", s: "left-[-12%] top-[14%] h-56 w-56", dx: 22, dy: 16, d: 15 },
        { c: "bg-sky/25", s: "right-[-14%] top-[30%] h-64 w-64", dx: -26, dy: 20, d: 18 },
        { c: "bg-lavender/25", s: "left-[-8%] bottom-[24%] h-52 w-52", dx: 18, dy: -14, d: 17 },
      ].map((b, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full blur-3xl ${b.c} ${b.s}`}
          animate={reduce ? undefined : { x: [0, b.dx, 0], y: [0, b.dy, 0], scale: [1, 1.12, 1] }}
          transition={{ duration: b.d, repeat: Infinity, ease: "easeInOut", delay: i * 1.4 }}
        />
      ))}

      {/* Grass glow rising from the pitch at the bottom */}
      <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-grass/35 via-mint/15 to-transparent" />
      {/* Faint pitch stripes */}
      <div
        className="absolute inset-x-0 bottom-0 h-32 opacity-[0.12]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, transparent 0 38px, #2E8B57 38px 76px)",
          maskImage: "linear-gradient(to top, black, transparent)",
          WebkitMaskImage: "linear-gradient(to top, black, transparent)",
        }}
      />

      {/* Drifting footballs */}
      {[
        { x: "12%", y: "20%", size: 26, dur: 13, delay: 0 },
        { x: "82%", y: "16%", size: 18, dur: 16, delay: 2 },
        { x: "70%", y: "70%", size: 22, dur: 15, delay: 1 },
        { x: "20%", y: "76%", size: 16, dur: 18, delay: 3 },
      ].map((f, i) => (
        <motion.div
          key={i}
          className="absolute opacity-[0.18]"
          style={{ left: f.x, top: f.y }}
          animate={reduce ? undefined : { y: [0, -22, 0], rotate: [0, 360] }}
          transition={{
            y: { duration: f.dur * 0.5, repeat: Infinity, ease: "easeInOut", delay: f.delay },
            rotate: { duration: f.dur, repeat: Infinity, ease: "linear" },
          }}
        >
          <MiniBall size={f.size} />
        </motion.div>
      ))}

      {/* Twinkles */}
      {[
        { x: "30%", y: "26%", d: 0 },
        { x: "76%", y: "40%", d: 0.8 },
        { x: "50%", y: "12%", d: 1.4 },
      ].map((s, i) => (
        <motion.div
          key={i}
          className="absolute text-sunny"
          style={{ left: s.x, top: s.y }}
          animate={reduce ? { opacity: 0.5 } : { opacity: [0.1, 0.8, 0.1], scale: [0.7, 1.1, 0.7] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut", delay: s.d }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14">
            <path d="M7 0 L8.4 5.6 L14 7 L8.4 8.4 L7 14 L5.6 8.4 L0 7 L5.6 5.6 Z" fill="currentColor" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}

function MiniBall({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32">
      <circle cx="16" cy="16" r="15" fill="#FFFFFF" stroke="#3A3258" strokeWidth="1.5" />
      <path d="M16 9 l5 3.6 -2 6 h-6 l-2 -6 z" fill="#3A3258" />
      <path d="M16 9 V4 M21 12.6 l4.5 -1.8 M19 18.6 l3 4 M13 18.6 l-3 4 M11 12.6 l-4.5 -1.8" stroke="#3A3258" strokeWidth="1.4" fill="none" />
    </svg>
  );
}
