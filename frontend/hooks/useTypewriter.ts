"use client";

import { useEffect, useState } from "react";

/**
 * Reveals `text` one character at a time so Bestie's reply feels spoken.
 * Purely presentational — the full text is already known; this just paces it.
 * Pass `active` to start; respects an instant mode for reduced motion.
 */
export function useTypewriter(text: string, active: boolean, speed = 22) {
  const [shown, setShown] = useState("");

  useEffect(() => {
    if (!active || !text) {
      setShown("");
      return;
    }

    // Honour reduced-motion: show the whole line at once.
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setShown(text);
      return;
    }

    setShown("");
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setShown(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, speed);

    return () => clearInterval(id);
  }, [text, active, speed]);

  const done = shown.length >= text.length;
  return { shown, done };
}
