import type { Moment } from "@/types";

/**
 * The in-match moments a viewer can tap on the companion screen.
 * Sprint 1: tapping only shows a "Coming in Sprint 2" toast.
 */
export const MOMENTS: Moment[] = [
  { id: "goal", label: "Goal", emoji: "⚽️" },
  { id: "yellow-card", label: "Yellow Card", emoji: "🟨" },
  { id: "red-card", label: "Red Card", emoji: "🟥" },
  { id: "offside", label: "Offside", emoji: "🚩" },
  { id: "corner-kick", label: "Corner Kick", emoji: "📐" },
  { id: "penalty", label: "Penalty", emoji: "🎯" },
  { id: "var", label: "VAR", emoji: "📺" },
  { id: "what-should-i-say", label: "What Should I Say?", emoji: "💬" },
];
