"use client";

import { useCallback, useRef, useState } from "react";

interface ToastState {
  message: string;
  visible: boolean;
}

/**
 * Minimal toast controller: call `showToast(message)` and it auto-hides.
 * Kept dependency-free so any screen can drop in a quick notice.
 */
export function useToast(durationMs = 2200) {
  const [toast, setToast] = useState<ToastState>({
    message: "",
    visible: false,
  });
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = useCallback(
    (message: string) => {
      if (timer.current) clearTimeout(timer.current);
      setToast({ message, visible: true });
      timer.current = setTimeout(() => {
        setToast((prev) => ({ ...prev, visible: false }));
      }, durationMs);
    },
    [durationMs]
  );

  return { toast, showToast };
}
