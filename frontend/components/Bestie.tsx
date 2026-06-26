"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

/** The expressions Bestie can play. */
export type BestieMood = "idle" | "thinking" | "goal" | "yellow" | "red" | "var";

interface BestieProps {
  mood?: BestieMood;
  /** Rendered pixel size (square). */
  size?: number;
  className?: string;
}

/* Palette (kept inline so the SVG is self-contained). */
const C = {
  body: "#FFD23F",
  bodyDark: "#FFC123",
  belly: "#FFE9A8",
  beak: "#FF9F1C",
  feet: "#FF9F1C",
  cheek: "#FF9EC4",
  ink: "#3A3258",
  mouth: "#6B2737",
  white: "#FFFFFF",
};

/**
 * Per-mood face configuration: where the pupils look, how open the eyes are,
 * and which mouth shape to show. Animated smoothly between moods.
 */
const FACE: Record<
  BestieMood,
  { pupilX: number; pupilY: number; eyeOpen: number; mouth: string }
> = {
  idle: { pupilX: 0, pupilY: 0, eyeOpen: 1, mouth: "beak" },
  thinking: { pupilX: 2, pupilY: -5, eyeOpen: 1, mouth: "beak" },
  goal: { pupilX: 0, pupilY: 0, eyeOpen: 0.55, mouth: "smile" },
  yellow: { pupilX: 0, pupilY: 0, eyeOpen: 1.18, mouth: "oSmall" },
  red: { pupilX: 0, pupilY: -1, eyeOpen: 1.25, mouth: "oBig" },
  var: { pupilX: 3, pupilY: -3, eyeOpen: 1, mouth: "wavy" },
};

/**
 * Bestie — a fully animated SVG companion. Every body part is its own motion
 * element. Idle, she breathes, blinks, flaps, tilts her head, and is wrapped
 * in floating sparkles and a soft glow. The `mood` prop swaps her expression
 * and triggers reactions. Only transforms and opacity animate, so it stays at
 * 60 FPS.
 */
export default function Bestie({
  mood = "idle",
  size = 220,
  className,
}: BestieProps) {
  const reduce = useReducedMotion();
  const face = FACE[mood];

  // Whole-body bob / jump.
  const bodyMotion =
    mood === "goal"
      ? { y: [0, -36, 4, -16, 0] }
      : mood === "idle"
        ? { y: [0, -6, 0] }
        : { y: [0, -3, 0] };
  const bodyTransition =
    mood === "goal"
      ? { duration: 0.9, ease: "easeOut", times: [0, 0.3, 0.5, 0.7, 1] }
      : { duration: mood === "idle" ? 3 : 4, repeat: Infinity, ease: "easeInOut" };

  // Wing behaviour per mood.
  const leftWing =
    mood === "red"
      ? { rotate: -55, y: -18 }
      : { rotate: reduce ? 0 : [0, 0, -22, 0, 0] };
  const rightWing =
    mood === "var"
      ? { rotate: [-70, -60, -70], y: -42, x: -52 } // scratch the head
      : mood === "red"
        ? { rotate: 55, y: -18 }
        : { rotate: reduce ? 0 : [0, 0, 22, 0, 0] };
  const wingTransition =
    mood === "var"
      ? { duration: 0.5, repeat: Infinity, ease: "easeInOut" }
      : mood === "red"
        ? { duration: 0.3 }
        : { duration: 4, repeat: Infinity, ease: "easeInOut", times: [0, 0.6, 0.7, 0.8, 1] };

  return (
    <div
      className={className}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 220 220" width={size} height={size}>
        <defs>
          <radialGradient id="bestie-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFC9E6" stopOpacity="0.9" />
            <stop offset="55%" stopColor="#D6C7FF" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#D6C7FF" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Soft glow */}
        <motion.circle
          cx={110}
          cy={114}
          r={96}
          fill="url(#bestie-glow)"
          animate={reduce ? undefined : { opacity: [0.55, 0.85, 0.55], scale: [1, 1.06, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformBox: "view-box", transformOrigin: "110px 114px" }}
        />

        <Sparkles reduce={!!reduce} />

        {/* Whole character: bob / jump */}
        <motion.g animate={bodyMotion} transition={bodyTransition}>
          {/* Breathing */}
          <motion.g
            animate={reduce ? undefined : { scale: [1, 1.035, 1] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformBox: "view-box", transformOrigin: "110px 150px" }}
          >
            {/* Feet */}
            <path d="M96 168 l-9 9 M96 168 l0 12 M96 168 l9 9" stroke={C.feet} strokeWidth="5" strokeLinecap="round" fill="none" />
            <path d="M124 168 l-9 9 M124 168 l0 12 M124 168 l9 9" stroke={C.feet} strokeWidth="5" strokeLinecap="round" fill="none" />

            {/* Left wing */}
            <motion.ellipse
              cx={52} cy={116} rx={16} ry={26} fill={C.bodyDark}
              animate={leftWing} transition={wingTransition}
              style={{ transformBox: "view-box", transformOrigin: "62px 98px" }}
            />
            {/* Right wing */}
            <motion.ellipse
              cx={168} cy={116} rx={16} ry={26} fill={C.bodyDark}
              animate={rightWing} transition={wingTransition}
              style={{ transformBox: "view-box", transformOrigin: "158px 98px" }}
            />

            {/* Body */}
            <ellipse cx={110} cy={114} rx={62} ry={64} fill={C.body} />
            <ellipse cx={110} cy={130} rx={42} ry={42} fill={C.belly} opacity={0.6} />

            {/* Head tuft */}
            <motion.g
              animate={reduce ? undefined : { rotate: [0, 6, 0, -6, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              style={{ transformBox: "view-box", transformOrigin: "110px 56px" }}
            >
              <path d="M110 54 q-7 -14 -2 -22 q6 6 6 16 z" fill={C.bodyDark} />
              <path d="M110 54 q7 -13 13 -16 q-1 9 -8 18 z" fill={C.bodyDark} />
            </motion.g>

            {/* Head (tilts) */}
            <motion.g
              animate={
                mood === "idle" && !reduce ? { rotate: [0, -5, 0, 4, 0, -3, 0] } : { rotate: 0 }
              }
              transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
              style={{ transformBox: "view-box", transformOrigin: "110px 150px" }}
            >
              {/* Cheeks */}
              <circle cx={80} cy={120} r={9} fill={C.cheek} opacity={0.7} />
              <circle cx={140} cy={120} r={9} fill={C.cheek} opacity={0.7} />

              <Eye cx={90} cy={101} face={face} reduce={!!reduce} blinkDelay={0} />
              <Eye cx={130} cy={101} face={face} reduce={!!reduce} blinkDelay={0.04} />

              <Mouth type={face.mouth} />
            </motion.g>
          </motion.g>
        </motion.g>

        {/* Thinking overlay */}
        <AnimatePresence>
          {mood === "thinking" && <ThinkingOverlay reduce={!!reduce} />}
        </AnimatePresence>

        {/* Goal confetti (one-shot) */}
        <AnimatePresence>
          {mood === "goal" && <Confetti key="confetti" />}
        </AnimatePresence>
      </svg>
    </div>
  );
}

/* ----------------------------- Eyes ----------------------------- */

function Eye({
  cx,
  cy,
  face,
  reduce,
  blinkDelay,
}: {
  cx: number;
  cy: number;
  face: (typeof FACE)[BestieMood];
  reduce: boolean;
  blinkDelay: number;
}) {
  const origin = `${cx}px ${cy}px`;
  return (
    // Outer: how open the eye is (mood).
    <motion.g
      animate={{ scaleY: face.eyeOpen }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      style={{ transformBox: "view-box", transformOrigin: origin }}
    >
      {/* Inner: the blink. */}
      <motion.g
        animate={reduce ? undefined : { scaleY: [1, 1, 0.1, 1] }}
        transition={{
          duration: 5,
          times: [0, 0.93, 0.965, 1],
          repeat: Infinity,
          repeatDelay: blinkDelay,
          ease: "easeInOut",
        }}
        style={{ transformBox: "view-box", transformOrigin: origin }}
      >
        <ellipse cx={cx} cy={cy} rx={12} ry={13} fill={C.white} />
        <motion.g
          animate={{ x: face.pupilX, y: face.pupilY }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <circle cx={cx} cy={cy} r={6.5} fill={C.ink} />
          <circle cx={cx - 2} cy={cy - 2.5} r={2.2} fill={C.white} />
        </motion.g>
      </motion.g>
    </motion.g>
  );
}

/* ----------------------------- Mouth ----------------------------- */

function Mouth({ type }: { type: string }) {
  const beak = (
    <path d="M101 123 L119 123 L110 137 Z" fill={C.beak} />
  );
  switch (type) {
    case "smile":
      return (
        <>
          {beak}
          <path
            d="M99 140 Q110 152 121 140"
            stroke={C.mouth}
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
          />
        </>
      );
    case "oSmall":
      return <ellipse cx={110} cy={132} rx={7} ry={8} fill={C.mouth} />;
    case "oBig":
      return <ellipse cx={110} cy={134} rx={9} ry={13} fill={C.mouth} />;
    case "wavy":
      return (
        <>
          {beak}
          <path
            d="M101 143 q5 -5 9 0 q4 5 9 0"
            stroke={C.mouth}
            strokeWidth="3.5"
            strokeLinecap="round"
            fill="none"
          />
        </>
      );
    default:
      return beak;
  }
}

/* ----------------------------- Sparkles ----------------------------- */

function Sparkles({ reduce }: { reduce: boolean }) {
  const spots = [
    { x: 28, y: 58, s: 1 },
    { x: 192, y: 70, s: 0.8 },
    { x: 40, y: 162, s: 0.7 },
    { x: 184, y: 150, s: 0.9 },
    { x: 110, y: 20, s: 0.6 },
  ];
  return (
    <>
      {spots.map((sp, i) => (
        <motion.path
          key={i}
          d="M0 -6 L1.6 -1.6 L6 0 L1.6 1.6 L0 6 L-1.6 1.6 L-6 0 L-1.6 -1.6 Z"
          fill="#FFF3B0"
          transform={`translate(${sp.x} ${sp.y}) scale(${sp.s})`}
          animate={reduce ? { opacity: 0.7 } : { opacity: [0.2, 1, 0.2], scale: [0.7, 1.1, 0.7] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
          style={{ transformBox: "view-box", transformOrigin: `${sp.x}px ${sp.y}px` }}
        />
      ))}
    </>
  );
}

/* ----------------------------- Thinking overlay ----------------------------- */

function ThinkingOverlay({ reduce }: { reduce: boolean }) {
  return (
    <motion.g
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Speech bubble */}
      <motion.g
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 18 }}
        style={{ transformBox: "view-box", transformOrigin: "176px 40px" }}
      >
        <rect x={150} y={24} width={52} height={30} rx={14} fill={C.white} />
        <path d="M158 50 l-6 12 l16 -8 z" fill={C.white} />
        {[166, 176, 186].map((cx, i) => (
          <motion.circle
            key={cx}
            cx={cx}
            cy={39}
            r={3.2}
            fill={C.ink}
            animate={reduce ? undefined : { y: [0, -4, 0] }}
            transition={{ duration: 0.7, repeat: Infinity, ease: "easeInOut", delay: i * 0.15 }}
          />
        ))}
      </motion.g>

      {/* Floating question marks */}
      {[0, 1].map((i) => (
        <motion.text
          key={i}
          x={56 + i * 8}
          y={64}
          fontSize={20}
          fontWeight="800"
          fill="#B57BFF"
          animate={reduce ? { opacity: 0.8 } : { y: [-4, -22], opacity: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: i * 0.9 }}
        >
          ?
        </motion.text>
      ))}

      {/* Rotating stars near the head */}
      <motion.g
        animate={reduce ? undefined : { rotate: 360 }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        style={{ transformBox: "view-box", transformOrigin: "110px 44px" }}
      >
        <path d="M110 30 l2 5 l5 1 l-4 4 l1 5 l-4 -3 l-4 3 l1 -5 l-4 -4 l5 -1 z" fill="#FFD23F" />
        <path d="M134 40 l1.5 3.5 l3.5 .7 l-2.6 2.6 l.6 3.6 l-3 -1.9 l-3 1.9 l.6 -3.6 l-2.6 -2.6 l3.5 -.7 z" fill="#FFB6D5" />
      </motion.g>
    </motion.g>
  );
}

/* ----------------------------- Confetti ----------------------------- */

function Confetti() {
  const colors = ["#FF9EC4", "#A8D8FF", "#B8F2D8", "#FFE08A", "#D6C7FF"];
  const pieces = Array.from({ length: 14 }, (_, i) => {
    const angle = (i / 14) * Math.PI * 2;
    return {
      dx: Math.cos(angle) * (60 + (i % 3) * 18),
      dy: Math.sin(angle) * (60 + (i % 3) * 18) - 20,
      color: colors[i % colors.length],
      rot: (i % 2 ? 1 : -1) * 220,
    };
  });
  return (
    <motion.g initial={{ opacity: 1 }} exit={{ opacity: 0 }}>
      {pieces.map((p, i) => (
        <motion.rect
          key={i}
          x={107}
          y={100}
          width={7}
          height={10}
          rx={2}
          fill={p.color}
          initial={{ x: 0, y: 0, opacity: 0, rotate: 0 }}
          animate={{
            x: p.dx,
            y: [0, p.dy, p.dy + 70],
            opacity: [1, 1, 0],
            rotate: p.rot,
          }}
          transition={{ duration: 1.3, ease: "easeOut", times: [0, 0.4, 1] }}
        />
      ))}
    </motion.g>
  );
}
