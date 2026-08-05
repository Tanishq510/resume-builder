"use client";

import { useEffect, useState } from "react";
import { Laptop, X } from "lucide-react";

const STORAGE_KEY = "mobile-notice-dismissed";

export function MobileNotice() {
  const [dismissed, setDismissed] = useState(true);

  useEffect(() => {
    setDismissed(window.localStorage.getItem(STORAGE_KEY) === "1");
  }, []);

  if (dismissed) return null;

  const handleDismiss = () => {
    window.localStorage.setItem(STORAGE_KEY, "1");
    setDismissed(true);
  };

  return (
    <div className="flex items-start gap-2.5 border-b border-amber-200 bg-amber-50 px-4 py-2.5 text-amber-800 lg:hidden sm:px-6">
      <Laptop size={16} className="mt-0.5 shrink-0" />
      <p className="flex-1 text-xs leading-relaxed">
        This resume builder works best on a laptop or desktop — the
        side-by-side editor and live preview are easier to use with more
        screen space.
      </p>
      <button
        type="button"
        onClick={handleDismiss}
        aria-label="Dismiss"
        className="shrink-0 rounded p-0.5 text-amber-600 hover:bg-amber-100 hover:text-amber-800"
      >
        <X size={15} />
      </button>
    </div>
  );
}
