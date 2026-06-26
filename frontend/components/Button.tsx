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
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full font-extrabold",
        "select-none active:outline-none",
        VARIANTS[variant],
        SIZES[size],
        className
      )}
      {...rest}
    >
      {children}
    </motion.button>
  );
}
