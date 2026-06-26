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
