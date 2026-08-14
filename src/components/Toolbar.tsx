"use client";

import { FileText } from "lucide-react";
import { useResumeStore } from "@/store/resumeStore";
import { DownloadButton } from "@/components/DownloadButton";
import { ImportResumeButton } from "@/components/ImportResumeButton";
import { MoreMenu } from "@/components/MoreMenu";

export function Toolbar() {
  const isSamplePreview = useResumeStore((s) => s.isSamplePreview);

  return (
    <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="flex items-center gap-2">
          <FileText className="shrink-0 text-slate-900" size={20} />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-sm font-semibold text-slate-900">
                Free Resume Builder
              </h1>
              {isSamplePreview && (
                <span className="rounded-full bg-amber-100 px-1.5 py-0.5 text-[10px] font-semibold leading-none text-amber-700">
                  Previewing sample data
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500">
              ATS-friendly · No sign-up · Saved automatically in your browser
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <ImportResumeButton />
          <DownloadButton />
          <MoreMenu />
        </div>
      </div>
    </header>
  );
}
