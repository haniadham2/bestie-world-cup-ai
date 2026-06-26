"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface CardProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  /** Adds hover/tap motion when the card is interactive. */
  interactive?: boolean;
  "aria-label"?: string;
}

/**
 * A soft, rounded surface. Becomes a tappable button when `onClick`
 * is provided so it stays keyboard-accessible.
 */
export default function Card({
  children,
  onClick,
  className,
  interactive,
  ...rest
}: CardProps) {
  const isInteractive = interactive ?? Boolean(onClick);

  return (
    <motion.div
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
      onKeyDown={(e) => {
        if (onClick && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          onClick();
        }
      }}
      whileHover={isInteractive ? { scale: 1.02, y: -4 } : undefined}
      whileTap={isInteractive ? { scale: 0.98 } : undefined}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={cn(
        "rounded-4xl bg-white p-6 shadow-soft",
        isInteractive && "cursor-pointer",
        className
      )}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
