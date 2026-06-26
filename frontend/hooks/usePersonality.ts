"use client";

import { useEffect, useState } from "react";
import {
  DEFAULT_PERSONALITY_ID,
  PERSONALITY_STORAGE_KEY,
  isPersonalityId,
} from "@/lib/personalities";
import type { PersonalityId } from "@/types";

/**
 * Reads and persists the viewer's chosen personality in localStorage.
 *
 * SSR-safe: we render the default on the server and the first client paint,
 * then hydrate the saved value in an effect. This avoids React hydration
 * mismatches (server HTML must match the first client render).
 */
export function usePersonality() {
  const [personality, setPersonalityState] = useState<PersonalityId>(
    DEFAULT_PERSONALITY_ID
  );
  const [hydrated, setHydrated] = useState(false);

  // Load the saved choice once, on the client.
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(PERSONALITY_STORAGE_KEY);
      if (isPersonalityId(saved)) {
        setPersonalityState(saved);
      }
    } catch {
      // localStorage can throw in private mode — fall back to the default.
    }
    setHydrated(true);
  }, []);

  const setPersonality = (id: PersonalityId) => {
    setPersonalityState(id);
    try {
      window.localStorage.setItem(PERSONALITY_STORAGE_KEY, id);
    } catch {
      // Persisting is best-effort; the in-memory choice still works.
    }
  };

  return { personality, setPersonality, hydrated };
}
