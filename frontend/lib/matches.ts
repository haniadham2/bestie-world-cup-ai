import type { Match } from "@/types";

/**
 * Sprint 1 uses two hard-coded example matches.
 * Real fixtures arrive via a Sports Data API in a future version.
 */
export const MATCHES: Match[] = [
  {
    id: "bra-eng",
    home: { name: "Brazil", flag: "🇧🇷" },
    away: { name: "England", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
    kickoff: "Today · 8:00 PM",
    gradient: "from-sunny via-mint to-sky",
  },
  {
    id: "usa-mex",
    home: { name: "USA", flag: "🇺🇸" },
    away: { name: "Mexico", flag: "🇲🇽" },
    kickoff: "Today · 5:00 PM",
    gradient: "from-bubblegum via-peach to-lavender",
  },
];

export function getMatchById(id: string): Match | undefined {
  return MATCHES.find((match) => match.id === id);
}
