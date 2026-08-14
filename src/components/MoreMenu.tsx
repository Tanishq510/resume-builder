"use client";

import { useEffect, useRef, useState } from "react";
import { CircleHelp, MoreVertical, Sparkles, Trash2 } from "lucide-react";
import { useResumeStore } from "@/store/resumeStore";
import { useOnboardingStore } from "@/store/onboardingStore";

export function MoreMenu() {
  const loadSample = useResumeStore((s) => s.loadSample);
  const clearAll = useResumeStore((s) => s.clearAll);
  const isSamplePreview = useResumeStore((s) => s.isSamplePreview);
  const openOverview = useOnboardingStore((s) => s.openOverview);
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("mousedown", onClick);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("mousedown", onClick);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const handleLoadSample = () => {
    setOpen(false);
    if (
      isSamplePreview ||
      window.confirm(
        "Load sample data? This will overwrite your current resume with dummy content."
      )
    ) {
      loadSample();
    }
  };

  const handleClear = () => {
    setOpen(false);
    if (window.confirm("Clear all resume data? This can't be undone.")) {
      clearAll();
    }
  };

  const handleAbout = () => {
    setOpen(false);
    openOverview();
  };

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="menu"
        aria-expanded={open}
        title="More"
        className="flex items-center gap-1 rounded-md border border-slate-300 px-2.5 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
      >
        <MoreVertical size={16} />
      </button>
      {open && (
        <div
          role="menu"
          className="absolute right-0 top-full z-20 mt-2 w-56 overflow-hidden rounded-md border border-slate-200 bg-white py-1 shadow-lg"
        >
          <button
            type="button"
            role="menuitem"
            onClick={handleLoadSample}
            className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-50"
          >
            <Sparkles size={14} />
            Load sample data
            {isSamplePreview && (
              <span className="ml-auto rounded-full bg-amber-100 px-1.5 py-0.5 text-[10px] font-semibold leading-none text-amber-700">
                Previewing
              </span>
            )}
          </button>
          <button
            type="button"
            role="menuitem"
            onClick={handleClear}
            className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-50"
          >
            <Trash2 size={14} /> Clear all
          </button>
          <div className="my-1 border-t border-slate-100" />
          <button
            type="button"
            role="menuitem"
            onClick={handleAbout}
            className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-50"
          >
            <CircleHelp size={14} /> About &amp; tour
          </button>
        </div>
      )}
    </div>
  );
}
