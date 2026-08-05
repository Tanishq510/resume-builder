"use client";

import { FileText, Sparkles, Trash2 } from "lucide-react";
import { useResumeStore } from "@/store/resumeStore";
import { DownloadPdfButton } from "@/components/DownloadPdfButton";
import { ImportResumeButton } from "@/components/ImportResumeButton";

export function Toolbar() {
  const loadSample = useResumeStore((s) => s.loadSample);
  const clearAll = useResumeStore((s) => s.clearAll);
  const isSamplePreview = useResumeStore((s) => s.isSamplePreview);

  const handleClear = () => {
    if (window.confirm("Clear all resume data? This can't be undone.")) {
      clearAll();
    }
  };

  return (
    <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="flex items-center gap-2">
          <FileText className="shrink-0 text-slate-900" size={20} />
          <div>
            <h1 className="text-sm font-semibold text-slate-900">
              Free Resume Builder
            </h1>
            <p className="text-xs text-slate-500">
              ATS-friendly · No sign-up · Saved automatically in your browser
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <ImportResumeButton />
          <button
            type="button"
            onClick={loadSample}
            aria-pressed={isSamplePreview}
            title={
              isSamplePreview
                ? "You're previewing sample data — start typing to make it yours"
                : "Load sample"
            }
            className={`flex items-center gap-1.5 rounded-md border px-3 py-2 text-sm font-medium transition-colors ${
              isSamplePreview
                ? "border-amber-300 bg-amber-50 text-amber-700 ring-1 ring-amber-300 hover:bg-amber-100"
                : "border-slate-300 text-slate-700 hover:bg-slate-50"
            }`}
          >
            <Sparkles
              size={15}
              className={isSamplePreview ? "fill-amber-400 text-amber-500" : ""}
            />
            Load sample
            {isSamplePreview && (
              <span className="ml-0.5 rounded-full bg-amber-200 px-1.5 py-0.5 text-[10px] font-semibold leading-none text-amber-800">
                Previewing
              </span>
            )}
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
