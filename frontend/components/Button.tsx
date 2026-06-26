"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type ButtonVariant = "primary" | "secondary";
type ButtonSize = "md" | "lg";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  type?: "button" | "submit";
  "aria-label"?: string;
}

const VARIANTS: Record<ButtonVariant, string> = {
  primary:
    "bg-gradient-to-r from-bubblegum to-peach text-white shadow-soft",
  secondary: "bg-white text-ink shadow-soft",
};

const SIZES: Record<ButtonSize, string> = {
  md: "px-6 py-3 text-base",
  lg: "px-10 py-5 text-xl",
};

/**
 * The one button to rule them all: big, rounded, and bouncy.
 * Press feedback comes from Framer Motion's whileTap.
 */
export default function Button({
  children,
  onClick,
  variant = "primary",
  size = "md",
  className,
  type = "button",
  ...rest
}: ButtonProps) {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      whileHover={{ scale: 1.04, y: -2 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className={cn(
        "relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full font-extrabold",
        "select-none active:outline-none",
        VARIANTS[variant],
        SIZES[size],
        className
      )}
      {...rest}
    >
      {/* Looping sheen sweep — a soft light invites the tap (primary only). */}
      {variant === "primary" && (
        <motion.span
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 bg-white/30 blur-md"
          animate={{ x: ["-60%", "420%"] }}
          transition={{
            duration: 1.1,
            repeat: Infinity,
            repeatDelay: 2.6,
            ease: "easeInOut",
          }}
        />
      )}
      <span className="relative z-10 inline-flex items-center gap-2">
        {children}
      </span>
    </motion.button>
  );
}
