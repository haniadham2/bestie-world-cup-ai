"use client";

import { AnimatePresence, motion } from "framer-motion";

interface ToastProps {
  message: string;
  visible: boolean;
}

/**
 * Floating pill notice anchored near the bottom of the screen.
 * Animates in and out with Framer Motion's AnimatePresence.
 */
export default function Toast({ message, visible }: ToastProps) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="toast"
          initial={{ opacity: 0, y: 24, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400, damping: 24 }}
          role="status"
          aria-live="polite"
          className="pointer-events-none fixed inset-x-0 bottom-8 z-50 mx-auto w-fit max-w-[90%] rounded-full bg-ink px-6 py-3 text-center text-sm font-bold text-white shadow-soft"
        >
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
