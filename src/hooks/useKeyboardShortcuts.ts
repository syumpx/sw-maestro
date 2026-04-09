"use client";

import { useEffect } from "react";

interface Options {
  onA: () => void;
  onB: () => void;
  onBack: () => void;
  enabled: boolean;
}

export function useKeyboardShortcuts({ onA, onB, onBack, enabled }: Options) {
  useEffect(() => {
    if (!enabled) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      switch (e.key.toLowerCase()) {
        case "a":
        case "1":
          e.preventDefault();
          onA();
          break;
        case "b":
        case "2":
          e.preventDefault();
          onB();
          break;
        case "arrowleft":
          e.preventDefault();
          onBack();
          break;
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onA, onB, onBack, enabled]);
}
