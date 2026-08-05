"use client";

import { useEffect, useRef, useState } from "react";

// After the list grows (e.g. an "Add" button appends an entry), scrolls the
// newest item into view and flags it for a brief highlight — on mobile the
// new field lands below the fold, so nothing else signals it was added.
export function useHighlightNewest(ids: string[]) {
  const prevCount = useRef(ids.length);
  const itemRefs = useRef<Record<string, HTMLElement | null>>({});
  const [highlightId, setHighlightId] = useState<string | null>(null);

  const newestId = ids[ids.length - 1];

  useEffect(() => {
    if (ids.length > prevCount.current) {
      itemRefs.current[newestId]?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      setHighlightId(newestId);
      const timer = window.setTimeout(() => setHighlightId(null), 500);
      prevCount.current = ids.length;
      return () => window.clearTimeout(timer);
    }
    prevCount.current = ids.length;
    // Depend on primitives (length + newest id), not the `ids` array itself —
    // that array is a fresh reference every render, and the `ids` dependency
    // used to make the effect re-fire off the setHighlightId call above,
    // clearing the revert timeout before it ever ran and leaving the card
    // stuck highlighted.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ids.length, newestId]);

  const registerRef = (id: string) => (el: HTMLElement | null) => {
    itemRefs.current[id] = el;
  };

  return { highlightId, registerRef };
}
