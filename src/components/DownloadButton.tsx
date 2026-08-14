"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, Download, FileDown, Loader2 } from "lucide-react";
import { pdf } from "@react-pdf/renderer";
import { useResumeStore } from "@/store/resumeStore";
import { ResumeDocument } from "@/components/pdf/ResumeDocument";
import { resumeToMarkdown } from "@/lib/exportMarkdown";

function baseFileName(fullName: string) {
  const base = fullName.trim() || "resume";
  return base.replace(/[^a-z0-9]+/gi, "-").toLowerCase();
}

function downloadBlob(blob: Blob, fileName: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

export function DownloadButton() {
  const resume = useResumeStore((s) => s.resume);
  const templateId = useResumeStore((s) => s.templateId);
  const sectionOrder = useResumeStore((s) => s.sectionOrder);
  const [isGenerating, setIsGenerating] = useState(false);
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

  const handleDownloadPdf = async () => {
    setOpen(false);
    setIsGenerating(true);
    try {
      const blob = await pdf(
        <ResumeDocument
          resume={resume}
          templateId={templateId}
          sectionOrder={sectionOrder}
        />
      ).toBlob();
      downloadBlob(blob, `${baseFileName(resume.personalInfo.fullName)}-resume.pdf`);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownloadMarkdown = () => {
    setOpen(false);
    const markdown = resumeToMarkdown(resume, sectionOrder);
    downloadBlob(
      new Blob([markdown], { type: "text/markdown;charset=utf-8" }),
      `${baseFileName(resume.personalInfo.fullName)}-resume.md`
    );
  };

  return (
    <div className="relative" data-tour="download" ref={containerRef}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        disabled={isGenerating}
        aria-haspopup="menu"
        aria-expanded={open}
        className="flex items-center gap-2 rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isGenerating ? (
          <Loader2 size={16} className="animate-spin" />
        ) : (
          <Download size={16} />
        )}
        Download
        <ChevronDown
          size={14}
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div
          role="menu"
          className="absolute right-0 top-full z-20 mt-2 w-48 overflow-hidden rounded-md border border-slate-200 bg-white py-1 shadow-lg"
        >
          <button
            type="button"
            role="menuitem"
            onClick={handleDownloadPdf}
            className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-50"
          >
            <Download size={14} /> Download PDF
          </button>
          <button
            type="button"
            role="menuitem"
            onClick={handleDownloadMarkdown}
            className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-50"
          >
            <FileDown size={14} /> Download Markdown
          </button>
        </div>
      )}
    </div>
  );
}
