"use client";

import { motion } from "framer-motion";
import { PERSONALITIES } from "@/lib/personalities";
import { cn } from "@/lib/cn";
import type { PersonalityId } from "@/types";

interface PersonalityPickerProps {
  selected: PersonalityId;
  onSelect: (id: PersonalityId) => void;
}

/**
 * Horizontal row of personality chips. The selected chip is highlighted with
 * a shared layout pill that slides between options (Framer Motion `layoutId`).
 * Scrolls horizontally on small screens; wraps comfortably on desktop.
 */
export default function PersonalityPicker({
  selected,
  onSelect,
}: PersonalityPickerProps) {
  return (
    <div className="w-full">
      <p className="mb-2 px-1 text-sm font-extrabold text-ink/50">
        Bestie&apos;s vibe
      </p>
      <div
        role="radiogroup"
        aria-label="Choose Bestie's personality"
        className="flex gap-2 overflow-x-auto pb-1 sm:flex-wrap sm:overflow-visible [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {PERSONALITIES.map((p) => {
          const isActive = p.id === selected;
          return (
            <motion.button
              key={p.id}
              type="button"
              role="radio"
              aria-checked={isActive}
              onClick={() => onSelect(p.id)}
              whileTap={{ scale: 0.94 }}
              className={cn(
                "relative shrink-0 rounded-full px-4 py-2 text-sm font-extrabold transition-colors",
                isActive ? "text-white" : "bg-white text-ink/70 shadow-soft"
              )}
            >
              {isActive && (
                <motion.span
                  layoutId="personality-pill"
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-bubblegum to-peach shadow-soft"
                />
              )}
              <span className="relative z-10 whitespace-nowrap">
                {p.emoji} {p.label}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
