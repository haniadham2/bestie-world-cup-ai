"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import StadiumBackdrop from "./StadiumBackdrop";

interface ScreenContainerProps {
  children: ReactNode;
  /** Optional pastel gradient background classes. */
  gradient?: string;
  className?: string;
}

/**
 * Mobile-first page wrapper. Keeps a comfortable phone-width column on small
 * screens and widens gently on desktop, with a little more breathing room.
 * Animates each screen in for smooth page transitions.
 */
export default function ScreenContainer({
  children,
  gradient,
  className,
}: ScreenContainerProps) {
  return (
    <motion.main
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className={cn(
        "relative min-h-[100dvh] w-full overflow-hidden",
        gradient && `bg-gradient-to-b ${gradient}`,
        className
      )}
    >
      <StadiumBackdrop />
      <div className="relative z-10 mx-auto flex min-h-[100dvh] w-full max-w-md flex-col px-5 pb-12 pt-2 sm:px-6 md:max-w-xl">
        {children}
      </div>
    </motion.main>
  );
}
