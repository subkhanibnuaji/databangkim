"use client";

import { useEffect, useState, useCallback } from "react";

export function useKeyboardNav(
  onFocusSearch: () => void,
  onToggleTheme: () => void,
  categoryIds: string[]
) {
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [pendingG, setPendingG] = useState(false);

  const closeShortcuts = useCallback(() => setShowShortcuts(false), []);

  useEffect(() => {
    let gTimeout: ReturnType<typeof setTimeout>;

    function handleKeyDown(e: KeyboardEvent) {
      const target = e.target as HTMLElement;
      const isInput = target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable;

      if (e.key === "Escape") {
        setShowShortcuts(false);
        if (isInput) {
          (target as HTMLInputElement).blur();
        }
        return;
      }

      if (isInput) return;

      if (e.key === "/") {
        e.preventDefault();
        onFocusSearch();
        return;
      }

      if (e.key === "?") {
        e.preventDefault();
        setShowShortcuts((prev) => !prev);
        return;
      }

      if (e.key === "t") {
        e.preventDefault();
        onToggleTheme();
        return;
      }

      if (e.key === "g") {
        if (pendingG) {
          return;
        }
        setPendingG(true);
        gTimeout = setTimeout(() => setPendingG(false), 500);
        return;
      }

      if (e.key === "h" && pendingG) {
        e.preventDefault();
        setPendingG(false);
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }

      // Number keys 1-9 jump to categories
      const num = parseInt(e.key);
      if (num >= 1 && num <= 9 && num <= categoryIds.length) {
        e.preventDefault();
        const el = document.getElementById(`category-${categoryIds[num - 1]}`);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
        return;
      }

      setPendingG(false);
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      clearTimeout(gTimeout);
    };
  }, [onFocusSearch, onToggleTheme, categoryIds, pendingG]);

  return { showShortcuts, closeShortcuts };
}
