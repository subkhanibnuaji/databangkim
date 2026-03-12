"use client";

import { startTransition, useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "databangkim-bookmarks";

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState<string[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as string[];
        startTransition(() => {
          setBookmarks(parsed);
        });
      }
    } catch {
      // localStorage not available
    }
  }, []);

  const toggleBookmark = useCallback((id: string) => {
    setBookmarks((prev) => {
      const next = prev.includes(id) ? prev.filter((b) => b !== id) : [...prev, id];
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // localStorage not available
      }
      return next;
    });
  }, []);

  const isBookmarked = useCallback(
    (id: string) => bookmarks.includes(id),
    [bookmarks]
  );

  return { bookmarks, toggleBookmark, isBookmarked };
}
