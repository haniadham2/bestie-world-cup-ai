import type { Personality, PersonalityId } from "@/types";

/**
 * Bestie's five personality modes. One shared source of truth used by both
 * the client (the picker) and the server (prompt styling), so they can never
 * drift apart.
 *
 * `style` is the tone instruction injected into the AI prompt. Every mode still
 * inherits the core rules (warm, ≤35 words, never teacher-y) from the base
 * system prompt — this only shapes the voice on top.
 */
export const PERSONALITIES: Personality[] = [
  {
    id: "cute",
    label: "Cute",
    emoji: "🐥",
    tagline: "Soft & adorable",
    style:
      "Be extra sweet, cozy, and adorable. Gentle and affectionate, like a soft-spoken best friend giving a little hug with words.",
  },
  {
    id: "funny",
    label: "Funny",
    emoji: "😂",
    tagline: "Jokes & giggles",
    style:
      "Be playful and witty. Land one quick, light joke or a silly comparison. Keep it cheeky and fun, never mean.",
  },
  {
    id: "hype",
    label: "Hype",
    emoji: "🔥",
    tagline: "Big match energy",
    style:
      "Bring huge, excited energy. Be loud and celebratory like a thrilled friend jumping off the couch. Exclamation points welcome!",
  },
  {
    id: "coach",
    label: "Coach",
    emoji: "🧢",
    tagline: "Calm & clear",
    style:
      "Be a calm, encouraging friend who keeps it simple and steady. Reassuring and clear — supportive, never lecturing.",
  },
  {
    id: "beginner",
    label: "Beginner",
    emoji: "🌱",
    tagline: "Explain it simply",
    style:
      "Assume they know nothing about soccer. Use the simplest possible words and a relatable everyday analogy, gently and warmly.",
  },
];

/** Fallback mode used on first visit and when an unknown value appears. */
export const DEFAULT_PERSONALITY_ID: PersonalityId = "cute";

/** localStorage key for the saved personality. */
export const PERSONALITY_STORAGE_KEY = "bestie:personality";

const BY_ID: Record<string, Personality> = Object.fromEntries(
  PERSONALITIES.map((p) => [p.id, p])
);

/** Type guard: is this string one of our known personality IDs? */
export function isPersonalityId(value: unknown): value is PersonalityId {
  return typeof value === "string" && value in BY_ID;
}

/** Look up a personality, falling back to the default for unknown IDs. */
export function getPersonality(id: string): Personality {
  return BY_ID[id] ?? BY_ID[DEFAULT_PERSONALITY_ID];
}
