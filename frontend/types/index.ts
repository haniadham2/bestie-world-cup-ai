/**
 * Shared domain types for Bestie.
 * Kept in one place so components and data stay in sync.
 */

export interface Team {
  name: string;
  /** Emoji flag used as a lightweight placeholder crest. */
  flag: string;
}

export interface Match {
  id: string;
  home: Team;
  away: Team;
  /** Friendly kickoff label, e.g. "Today · 8:00 PM". */
  kickoff: string;
  /** Tailwind gradient classes used for the card background. */
  gradient: string;
}

/** A tappable in-match moment on the companion screen. */
export interface Moment {
  id: string;
  label: string;
  emoji: string;
}

/** The five tones Bestie can speak in. */
export type PersonalityId = "cute" | "funny" | "hype" | "coach" | "beginner";

/** A selectable personality mode shown in the picker. */
export interface Personality {
  id: PersonalityId;
  label: string;
  emoji: string;
  /** Short subtitle under the label, e.g. "Big match energy". */
  tagline: string;
  /** Tone instruction injected into the AI prompt. */
  style: string;
}

/**
 * Request body sent to POST /api/bestie.
 * `vibe` carries the selected personality id (API shape unchanged since v2).
 */
export interface BestieRequest {
  match: string;
  moment: string;
  vibe: PersonalityId;
}

/** Successful response from POST /api/bestie. */
export interface BestieResponse {
  reply: string;
}
