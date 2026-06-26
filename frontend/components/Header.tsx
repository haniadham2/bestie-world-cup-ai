"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

interface HeaderProps {
  title?: string;
  /** Shows a circular back button on the left. */
  showBack?: boolean;
  className?: string;
}

/**
 * Slim top bar for inner screens. Keeps the chrome minimal so the
 * mascot and content stay the stars of the show.
 */
export default function Header({ title, showBack, className }: HeaderProps) {
  const router = useRouter();

  return (
    <header
      className={cn(
        "flex items-center gap-3 px-5 pt-6 pb-2",
        className
      )}
    >
      {showBack && (
        <motion.button
          type="button"
          aria-label="Go back"
          onClick={() => router.back()}
          whileHover={{ scale: 1.08, x: -2 }}
          whileTap={{ scale: 0.88, rotate: -8 }}
          transition={{ type: "spring", stiffness: 400, damping: 15 }}
          className="grid h-11 w-11 place-items-center rounded-full bg-white text-xl shadow-soft"
        >
          ←
        </motion.button>
      )}
      {title && (
        <h2 className="text-lg font-extrabold text-ink">{title}</h2>
      )}
    </header>
  );
}
