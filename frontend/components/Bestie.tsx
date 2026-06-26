"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { PersonalityId } from "@/types";

/** Every expression Bestie can play, including football reactions. */
export type BestieMood =
  | "idle"
  | "thinking"
  | "goal"
  | "yellow"
  | "red"
  | "offside"
  | "corner"
  | "var"
  | "penalty";

interface BestieProps {
  mood?: BestieMood;
  /** Drives the always-on visual personality (cap, flames, book…). */
  personality?: PersonalityId;
  size?: number;
  className?: string;
}

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
  sweat: "#7CC6FF",
};

interface Face {
  pupilX: number;
  pupilY: number;
  eyeOpen: number;
  mouth: string;
  lookAround?: boolean;
}

const BASE_FACE: Record<BestieMood, Face> = {
  idle: { pupilX: 0, pupilY: 0, eyeOpen: 1, mouth: "softSmile" },
  thinking: { pupilX: 2, pupilY: -5, eyeOpen: 1, mouth: "beak" },
  goal: { pupilX: 0, pupilY: 0, eyeOpen: 0.5, mouth: "smile" },
  yellow: { pupilX: 0, pupilY: 0, eyeOpen: 1.2, mouth: "oSmall" },
  red: { pupilX: 0, pupilY: -1, eyeOpen: 1.3, mouth: "oBig" },
  offside: { pupilX: -3, pupilY: -2, eyeOpen: 1, mouth: "wavy" },
  corner: { pupilX: 4, pupilY: -2, eyeOpen: 0.7, mouth: "smile" },
  var: { pupilX: 0, pupilY: 0, eyeOpen: 1, mouth: "beak", lookAround: true },
  penalty: { pupilX: 0, pupilY: 1, eyeOpen: 1.12, mouth: "wavy" },
};

/** Idle expression tweaks per personality, so the character reads instantly. */
function faceFor(mood: BestieMood, personality?: PersonalityId): Face {
  const f = { ...BASE_FACE[mood] };
  if (mood !== "idle") return f;
  switch (personality) {
    case "cute":
      return { ...f, eyeOpen: 1.15, mouth: "smile" };
    case "funny":
      return { ...f, eyeOpen: 0.5, mouth: "smile" };
    case "hype":
      return { ...f, mouth: "smile" };
    default:
      return f;
  }
}

/**
 * Bestie — a fully animated SVG companion that always feels alive: breathing,
 * blinking, flapping, floating, sparkling. The `mood` prop plays football
 * reactions; `personality` adds an always-on look. Transform + opacity only.
 */
export default function Bestie({
  mood = "idle",
  personality,
  size = 220,
  className,
}: BestieProps) {
  const reduce = useReducedMotion();
  const face = faceFor(mood, personality);
  const body = bodyAnim(mood, !!reduce);
  const wings = wingAnim(mood, !!reduce);

  return (
    <div className={className} style={{ width: size, height: size }} aria-hidden="true">
      <svg viewBox="0 0 220 220" width={size} height={size}>
        <defs>
          <radialGradient id="bestie-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFC9E6" stopOpacity="0.9" />
            <stop offset="55%" stopColor="#D6C7FF" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#D6C7FF" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="bestie-glow-hype" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFD27F" stopOpacity="0.95" />
            <stop offset="55%" stopColor="#FF8A5B" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#FF8A5B" stopOpacity="0" />
          </radialGradient>
          {/* Soft body gradient — a gentle highlight so Bestie reads round, not flat. */}
          <radialGradient id="bestie-body" cx="42%" cy="34%" r="78%">
            <stop offset="0%" stopColor="#FFE989" />
            <stop offset="58%" stopColor="#FFD23F" />
            <stop offset="100%" stopColor="#FFC525" />
          </radialGradient>
        </defs>

        {/* Soft glow (warmer for Hype) */}
        <motion.circle
          cx={110}
          cy={114}
          r={96}
          fill={personality === "hype" ? "url(#bestie-glow-hype)" : "url(#bestie-glow)"}
          animate={reduce ? undefined : { opacity: [0.55, 0.85, 0.55], scale: [1, 1.06, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformBox: "view-box", transformOrigin: "110px 114px" }}
        />

        <Sparkles reduce={!!reduce} />
        {personality === "hype" && <Flames reduce={!!reduce} />}

        {/* Whole character */}
        <motion.g animate={body.animate} transition={body.transition}>
          <motion.g
            animate={reduce ? undefined : { scale: [1, 1.035, 1] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformBox: "view-box", transformOrigin: "110px 150px" }}
          >
            {/* Feet */}
            <path d="M96 168 l-9 9 M96 168 l0 12 M96 168 l9 9" stroke={C.feet} strokeWidth="5" strokeLinecap="round" fill="none" />
            <path d="M124 168 l-9 9 M124 168 l0 12 M124 168 l9 9" stroke={C.feet} strokeWidth="5" strokeLinecap="round" fill="none" />

            {/* Wings */}
            <motion.ellipse
              cx={52} cy={116} rx={16} ry={26} fill={C.bodyDark}
              animate={wings.left} transition={wings.transition}
              style={{ transformBox: "view-box", transformOrigin: "62px 98px" }}
            />
            <motion.ellipse
              cx={168} cy={116} rx={16} ry={26} fill={C.bodyDark}
              animate={wings.right} transition={wings.transition}
              style={{ transformBox: "view-box", transformOrigin: "158px 98px" }}
            />

            {/* Body */}
            <ellipse cx={110} cy={115} rx={63} ry={65} fill="url(#bestie-body)" />
            <ellipse cx={110} cy={132} rx={40} ry={40} fill={C.belly} opacity={0.45} />

            {/* Tuft */}
            <motion.g
              animate={reduce ? undefined : { rotate: [0, 6, 0, -6, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              style={{ transformBox: "view-box", transformOrigin: "110px 56px" }}
            >
              <path d="M110 54 q-7 -14 -2 -22 q6 6 6 16 z" fill={C.bodyDark} />
              <path d="M110 54 q7 -13 13 -16 q-1 9 -8 18 z" fill={C.bodyDark} />
            </motion.g>

            {/* Head */}
            <motion.g
              animate={headAnim(mood, !!reduce)}
              transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
              style={{ transformBox: "view-box", transformOrigin: "110px 150px" }}
            >
              <circle cx={76} cy={124} r={personality === "cute" ? 11 : 9.5} fill={C.cheek} opacity={personality === "cute" ? 0.85 : 0.72} />
              <circle cx={144} cy={124} r={personality === "cute" ? 11 : 9.5} fill={C.cheek} opacity={personality === "cute" ? 0.85 : 0.72} />

              <Eye cx={92} cy={103} face={face} reduce={!!reduce} blinkDelay={0} />
              <Eye cx={128} cy={103} face={face} reduce={!!reduce} blinkDelay={0.04} />

              <Mouth type={face.mouth} />

              {personality === "coach" && <CoachGear />}
            </motion.g>
          </motion.g>
        </motion.g>

        {/* Always-on personality props that sit beside Bestie */}
        {personality === "beginner" && <BeginnerBook reduce={!!reduce} />}

        {/* Mood overlays */}
        <AnimatePresence mode="wait">
          {mood === "thinking" && <ThinkingOverlay key="think" reduce={!!reduce} />}
          {mood === "offside" && <OffsideMark key="off" />}
          {mood === "var" && <VarDots key="var" reduce={!!reduce} />}
          {mood === "corner" && <CornerPointer key="corner" reduce={!!reduce} />}
          {(mood === "red" || mood === "penalty") && (
            <SweatDrop key="sweat" small={mood === "penalty"} />
          )}
          {mood === "goal" && <GoalSparkle key="goalsp" />}
        </AnimatePresence>

        <AnimatePresence>
          {mood === "goal" && <Confetti key="confetti" />}
        </AnimatePresence>
      </svg>
    </div>
  );
}

/* --------------------------- motion configs --------------------------- */

function bodyAnim(mood: BestieMood, reduce: boolean) {
  if (reduce) return { animate: undefined, transition: undefined };
  switch (mood) {
    case "goal":
      return {
        animate: { y: [0, -40, 4, -18, 0], rotate: [0, -8, 8, -4, 0] },
        transition: { duration: 1.0, ease: "easeOut", times: [0, 0.3, 0.5, 0.7, 1] },
      };
    case "yellow":
      return { animate: { rotate: [0, -14, -9, -11, -10] }, transition: { duration: 0.7, ease: "easeOut" } };
    case "red":
      return {
        animate: { x: [0, -9, 9, -7, 7, -4, 0], rotate: [0, -3, 3, -2, 2, 0] },
        transition: { duration: 0.75, ease: "easeInOut" },
      };
    case "offside":
      return { animate: { rotate: [0, -10, -7, -9] }, transition: { duration: 0.6, ease: "easeOut" } };
    case "corner":
      return { animate: { y: [0, -9, 0] }, transition: { duration: 0.7, repeat: Infinity, ease: "easeInOut" } };
    case "penalty":
      return {
        animate: { y: [0, -5, 0], x: [0, -1.6, 1.6, 0] },
        transition: {
          y: { duration: 1.2, repeat: Infinity, ease: "easeInOut" },
          x: { duration: 0.22, repeat: Infinity, ease: "easeInOut" },
        },
      };
    case "thinking":
      return { animate: { y: [0, -3, 0] }, transition: { duration: 3, repeat: Infinity, ease: "easeInOut" } };
    default:
      return { animate: { y: [0, -6, 0] }, transition: { duration: 3, repeat: Infinity, ease: "easeInOut" } };
  }
}

function headAnim(mood: BestieMood, reduce: boolean) {
  if (reduce) return { rotate: 0 };
  if (mood === "offside") return { rotate: 12 };
  if (mood === "idle") return { rotate: [0, -5, 0, 4, 0, -3, 0] };
  return { rotate: 0 };
}

function wingAnim(mood: BestieMood, reduce: boolean) {
  const slowFlap = { duration: 4, repeat: Infinity, ease: "easeInOut", times: [0, 0.6, 0.7, 0.8, 1] };
  if (mood === "red")
    return { left: { rotate: -58, y: -16 }, right: { rotate: 58, y: -16 }, transition: { duration: 0.3 } };
  if (mood === "var")
    return {
      left: reduce ? { rotate: 0 } : { rotate: [0, 0, -22, 0, 0] },
      right: { rotate: [-70, -60, -70], y: -42, x: -52 },
      transition: { duration: 0.5, repeat: Infinity, ease: "easeInOut" },
    };
  if (mood === "corner")
    return {
      left: reduce ? { rotate: 0 } : { rotate: [0, 0, -22, 0, 0] },
      right: { rotate: [60, 72, 60], x: 10, y: -34 },
      transition: { duration: 0.8, repeat: Infinity, ease: "easeInOut" },
    };
  if (mood === "penalty")
    return {
      left: { rotate: [-6, 6, -6] },
      right: { rotate: [6, -6, 6] },
      transition: { duration: 0.3, repeat: Infinity, ease: "easeInOut" },
    };
  return {
    left: reduce ? { rotate: 0 } : { rotate: [0, 0, -22, 0, 0] },
    right: reduce ? { rotate: 0 } : { rotate: [0, 0, 22, 0, 0] },
    transition: slowFlap,
  };
}

/* ------------------------------- Eyes ------------------------------- */

function Eye({
  cx,
  cy,
  face,
  reduce,
  blinkDelay,
}: {
  cx: number;
  cy: number;
  face: Face;
  reduce: boolean;
  blinkDelay: number;
}) {
  const origin = `${cx}px ${cy}px`;
  return (
    <motion.g
      animate={{ scaleY: face.eyeOpen }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      style={{ transformBox: "view-box", transformOrigin: origin }}
    >
      <motion.g
        animate={reduce ? undefined : { scaleY: [1, 1, 0.1, 1] }}
        transition={{ duration: 5, times: [0, 0.93, 0.965, 1], repeat: Infinity, repeatDelay: blinkDelay, ease: "easeInOut" }}
        style={{ transformBox: "view-box", transformOrigin: origin }}
      >
        <ellipse cx={cx} cy={cy} rx={13.5} ry={15} fill={C.white} />
        <motion.g
          animate={
            face.lookAround && !reduce
              ? { x: [-3, 3, -3], y: face.pupilY }
              : { x: face.pupilX, y: face.pupilY }
          }
          transition={
            face.lookAround
              ? { duration: 1.6, repeat: Infinity, ease: "easeInOut" }
              : { type: "spring", stiffness: 300, damping: 20 }
          }
        >
          <circle cx={cx} cy={cy} r={7.6} fill={C.ink} />
          <circle cx={cx - 2.6} cy={cy - 3.2} r={2.8} fill={C.white} />
        </motion.g>
      </motion.g>
    </motion.g>
  );
}

/* ------------------------------- Mouth ------------------------------- */

function Mouth({ type }: { type: string }) {
  const beak = <path d="M101 123 L119 123 L110 137 Z" fill={C.beak} />;
  switch (type) {
    case "softSmile":
      return (
        <>
          {beak}
          <path d="M103 141 Q110 147 117 141" stroke={C.mouth} strokeWidth="3" strokeLinecap="round" fill="none" opacity={0.85} />
        </>
      );
    case "smile":
      return (
        <>
          {beak}
          <path d="M99 140 Q110 152 121 140" stroke={C.mouth} strokeWidth="4" strokeLinecap="round" fill="none" />
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
          <path d="M101 143 q5 -5 9 0 q4 5 9 0" stroke={C.mouth} strokeWidth="3.5" strokeLinecap="round" fill="none" />
        </>
      );
    default:
      return beak;
  }
}

/* ------------------------------ Sparkles ----------------------------- */

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

/* --------------------------- Thinking overlay --------------------------- */

function ThinkingOverlay({ reduce }: { reduce: boolean }) {
  return (
    <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <motion.g
        animate={reduce ? undefined : { rotate: 360 }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        style={{ transformBox: "view-box", transformOrigin: "110px 44px" }}
      >
        <path d="M110 30 l2 5 l5 1 l-4 4 l1 5 l-4 -3 l-4 3 l1 -5 l-4 -4 l5 -1 z" fill="#FFD23F" />
        <path d="M136 42 l1.5 3.5 l3.5 .7 l-2.6 2.6 l.6 3.6 l-3 -1.9 l-3 1.9 l.6 -3.6 l-2.6 -2.6 l3.5 -.7 z" fill="#FFB6D5" />
      </motion.g>
      {[0, 1].map((i) => (
        <motion.text
          key={i}
          x={150 + i * 10}
          y={56}
          fontSize={22}
          fontWeight="800"
          fill="#B57BFF"
          animate={reduce ? { opacity: 0.8 } : { y: [-2, -22], opacity: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: i * 0.9 }}
        >
          ?
        </motion.text>
      ))}
    </motion.g>
  );
}

/* ----------------------------- Offside mark ----------------------------- */

function OffsideMark() {
  return (
    <motion.text
      x={150}
      y={52}
      fontSize={34}
      fontWeight="900"
      fill="#B57BFF"
      initial={{ opacity: 0, scale: 0, rotate: -20 }}
      animate={{ opacity: 1, scale: 1, rotate: [0, -8, 8, 0], y: [52, 46, 52] }}
      exit={{ opacity: 0, scale: 0 }}
      transition={{ scale: { type: "spring", stiffness: 300, damping: 14 }, rotate: { duration: 2, repeat: Infinity }, y: { duration: 2, repeat: Infinity, ease: "easeInOut" } }}
    >
      ?
    </motion.text>
  );
}

/* ------------------------------- VAR dots ------------------------------- */

function VarDots({ reduce }: { reduce: boolean }) {
  return (
    <motion.g initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
      <rect x={146} y={30} width={52} height={26} rx={13} fill={C.white} />
      {[160, 172, 184].map((cx, i) => (
        <motion.circle
          key={cx}
          cx={cx}
          cy={43}
          r={3.4}
          fill={C.ink}
          animate={reduce ? undefined : { y: [0, -5, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 0.7, repeat: Infinity, ease: "easeInOut", delay: i * 0.15 }}
        />
      ))}
    </motion.g>
  );
}

/* ----------------------------- Corner pointer ----------------------------- */

function CornerPointer({ reduce }: { reduce: boolean }) {
  return (
    <motion.g
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 16 }}
    >
      {/* Corner flag, top-right */}
      <line x1={196} y1={26} x2={196} y2={54} stroke={C.ink} strokeWidth="3" strokeLinecap="round" />
      <motion.path
        d="M196 26 q14 4 0 12 z"
        fill="#FF5D73"
        animate={reduce ? undefined : { rotate: [0, 6, 0] }}
        transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformBox: "view-box", transformOrigin: "196px 28px" }}
      />
      <motion.text
        x={158}
        y={40}
        fontSize={20}
        animate={reduce ? undefined : { x: [158, 164, 158] }}
        transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
      >
        👉
      </motion.text>
    </motion.g>
  );
}

/* ------------------------------- Sweat drop ------------------------------- */

function SweatDrop({ small }: { small?: boolean }) {
  const r = small ? 4 : 5.5;
  return (
    <motion.path
      d={`M138 64 c ${r} ${r} ${r} ${r * 1.8} 0 ${r * 2.2} c -${r} -${r * 0.4} -${r} -${r * 1.2} 0 -${r * 2.2} z`}
      fill={C.sweat}
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: [0, 1, 1, 0], y: [-6, 6, 16, 26] }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.4, repeat: Infinity, ease: "easeIn", repeatDelay: 0.3 }}
    />
  );
}

/* ------------------------------ Goal sparkle ------------------------------ */

function GoalSparkle() {
  const stars = [
    { x: 70, y: 50 },
    { x: 150, y: 48 },
    { x: 110, y: 30 },
    { x: 56, y: 86 },
    { x: 166, y: 84 },
  ];
  return (
    <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      {stars.map((s, i) => (
        <motion.path
          key={i}
          d="M0 -7 L2 -2 L7 0 L2 2 L0 7 L-2 2 L-7 0 L-2 -2 Z"
          fill="#FFE08A"
          transform={`translate(${s.x} ${s.y})`}
          animate={{ scale: [0, 1.2, 0.9, 1.2, 0], rotate: [0, 90] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut", delay: i * 0.12 }}
          style={{ transformBox: "view-box", transformOrigin: `${s.x}px ${s.y}px` }}
        />
      ))}
    </motion.g>
  );
}

/* ------------------------------- Confetti ------------------------------- */

function Confetti() {
  const colors = ["#FF9EC4", "#A8D8FF", "#B8F2D8", "#FFE08A", "#D6C7FF"];
  const pieces = Array.from({ length: 16 }, (_, i) => {
    const angle = (i / 16) * Math.PI * 2;
    return {
      dx: Math.cos(angle) * (62 + (i % 3) * 18),
      dy: Math.sin(angle) * (62 + (i % 3) * 18) - 20,
      color: colors[i % colors.length],
      rot: (i % 2 ? 1 : -1) * 240,
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
          animate={{ x: p.dx, y: [0, p.dy, p.dy + 80], opacity: [1, 1, 0], rotate: p.rot }}
          transition={{ duration: 1.4, ease: "easeOut", times: [0, 0.4, 1], repeat: Infinity, repeatDelay: 0.4 }}
        />
      ))}
    </motion.g>
  );
}

/* --------------------------- Personality props --------------------------- */

function Flames({ reduce }: { reduce: boolean }) {
  const flames = [
    { x: 40, y: 150, s: 1 },
    { x: 180, y: 150, s: 0.9 },
    { x: 30, y: 110, s: 0.7 },
    { x: 190, y: 110, s: 0.7 },
  ];
  return (
    <>
      {flames.map((f, i) => (
        <motion.path
          key={i}
          d="M0 0 c -6 -8 -2 -16 0 -22 c 2 6 6 6 4 14 c 4 -2 4 -6 3 -9 c 4 6 4 14 -1 19 c -3 3 -7 3 -9 -2 z"
          fill={i % 2 ? "#FF7A3D" : "#FFB13D"}
          transform={`translate(${f.x} ${f.y}) scale(${f.s})`}
          animate={reduce ? { opacity: 0.8 } : { scaleY: [1, 1.25, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 0.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.12 }}
          style={{ transformBox: "view-box", transformOrigin: `${f.x}px ${f.y}px` }}
        />
      ))}
    </>
  );
}

function CoachGear() {
  return (
    <g>
      {/* Cap brim + dome */}
      <path d="M84 70 q26 -20 52 0 q-26 -9 -52 0 z" fill="#3A7BD5" />
      <path d="M128 70 q14 1 22 6 q-12 1 -22 -2 z" fill="#2B5FA8" />
      {/* Whistle by the cheek */}
      <circle cx={150} cy={132} r={6} fill="#5FC979" />
      <rect x={150} y={129} width={8} height={6} rx={2} fill="#3FAE5A" />
    </g>
  );
}

function BeginnerBook({ reduce }: { reduce: boolean }) {
  return (
    <motion.g
      animate={reduce ? undefined : { y: [0, -4, 0] }}
      transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
    >
      <path d="M168 150 l22 -6 v22 l-22 6 z" fill="#FF9EC4" />
      <path d="M190 144 l16 6 v22 l-16 -6 z" fill="#FFB6D5" />
      <path d="M190 150 v22" stroke="#FFFFFF" strokeWidth="2" />
      <path d="M172 156 l14 -3 M172 162 l14 -3" stroke="#FFFFFF" strokeWidth="1.5" />
    </motion.g>
  );
}
