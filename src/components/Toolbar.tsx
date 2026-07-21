"use client";

import { FileText, Sparkles, Trash2 } from "lucide-react";
import { useResumeStore } from "@/store/resumeStore";
import { DownloadPdfButton } from "@/components/DownloadPdfButton";

export function Toolbar() {
  const loadSample = useResumeStore((s) => s.loadSample);
  const clearAll = useResumeStore((s) => s.clearAll);

  const handleClear = () => {
    if (window.confirm("Clear all resume data? This can't be undone.")) {
      clearAll();
    }
  };

  return (
    <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-6 py-3">
        <div className="flex items-center gap-2">
          <FileText className="text-slate-900" size={20} />
          <div>
            <h1 className="text-sm font-semibold text-slate-900">
              ATS Resume Builder
            </h1>
            <p className="text-xs text-slate-500">
              Saved automatically in your browser
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={loadSample}
            className="flex items-center gap-1.5 rounded-md border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            <Sparkles size={15} /> Load sample
          </button>
          <button
            type="button"
            onClick={handleClear}
            className="flex items-center gap-1.5 rounded-md border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            <Trash2 size={15} /> Clear
          </button>
          <DownloadPdfButton />
        </div>
      </div>
    </header>
  );
}
