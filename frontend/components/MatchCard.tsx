"use client";

import type { Match } from "@/types";
import Card from "./Card";

interface MatchCardProps {
  match: Match;
  onSelect: (match: Match) => void;
}

/**
 * A single fixture rendered as a tappable, gradient-topped card.
 * Composes the generic Card so motion + a11y come for free.
 */
export default function MatchCard({ match, onSelect }: MatchCardProps) {
  const { home, away, kickoff, gradient } = match;

  return (
    <Card
      onClick={() => onSelect(match)}
      aria-label={`Watch ${home.name} versus ${away.name}`}
      className="overflow-hidden p-0"
    >
      <div className={`bg-gradient-to-r ${gradient} px-5 py-3`}>
        <span className="text-sm font-bold text-white/90">{kickoff}</span>
      </div>

      <div className="flex items-center justify-between gap-3 px-6 py-6">
        <TeamBadge flag={home.flag} name={home.name} />
        <span className="text-lg font-extrabold text-ink/40">vs</span>
        <TeamBadge flag={away.flag} name={away.name} />
      </div>
    </Card>
  );
}

function TeamBadge({ flag, name }: { flag: string; name: string }) {
  return (
    <div className="flex flex-1 flex-col items-center gap-2">
      <span className="text-5xl" aria-hidden="true">
        {flag}
      </span>
      <span className="text-center text-base font-extrabold text-ink">
        {name}
      </span>
    </div>
  );
}
