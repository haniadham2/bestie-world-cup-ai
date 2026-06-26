"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

type MascotSize = "md" | "lg" | "xl";

interface MascotPlaceholderProps {
  size?: MascotSize;
  className?: string;
  /** Gentle idle float. On by default. */
  float?: boolean;
}

const SIZES: Record<MascotSize, string> = {
  md: "h-28 w-28 text-5xl",
  lg: "h-40 w-40 text-7xl",
  xl: "h-56 w-56 text-8xl",
};

/**
 * Stand-in for the Bestie mascot until real artwork lands.
 * A friendly gradient blob with a smiley face that gently floats.
 */
export default function MascotPlaceholder({
  size = "lg",
  className,
  float = true,
}: MascotPlaceholderProps) {
  return (
    <motion.div
      initial={{ scale: 0, rotate: -12 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 14 }}
      className={cn("relative grid place-items-center", className)}
      aria-hidden="true"
    >
      <div
        className={cn(
          "grid place-items-center rounded-full",
          "bg-gradient-to-br from-bubblegum via-lavender to-sky",
          "shadow-soft ring-8 ring-white/60",
          float && "animate-float",
          SIZES[size]
        )}
      >
        <span className="drop-shadow-sm">🐥</span>
      </div>
    </motion.div>
  );
}
