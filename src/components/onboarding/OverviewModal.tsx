"use client";

import { Download, FileText, LayoutGrid, Upload } from "lucide-react";
import { Modal } from "@/components/ui/Modal";

const highlights = [
  {
    icon: LayoutGrid,
    text: "Fill in your details on the left, see a formatted, ATS-safe resume update live on the right.",
  },
  {
    icon: Upload,
    text: "Already have a resume? Upload a PDF, DOCX, or TXT and it'll prefill the form for you.",
  },
  {
    icon: Download,
    text: "Export a polished PDF or a plain Markdown file whenever you're ready — no sign-up required.",
  },
];

export function OverviewModal({
  onClose,
  onStartTour,
}: {
  onClose: () => void;
  onStartTour: () => void;
}) {
  return (
    <Modal onClose={onClose} labelledBy="overview-title">
      <div className="flex items-start gap-3">
        <FileText className="mt-0.5 shrink-0 text-slate-900" size={22} />
        <div>
          <h2
            id="overview-title"
            className="text-lg font-semibold text-slate-900"
          >
            Welcome to the Free Resume Builder
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            A free, ATS-friendly resume builder — no account, no paywall,
            saved automatically in your browser.
          </p>
        </div>
      </div>
      <ul className="mt-5 space-y-3">
        {highlights.map(({ icon: Icon, text }, i) => (
          <li
            key={i}
            className="flex items-start gap-2.5 text-sm text-slate-700"
          >
            <Icon size={16} className="mt-0.5 shrink-0 text-slate-400" />
            {text}
          </li>
        ))}
      </ul>
      <div className="mt-6 flex justify-end gap-2">
        <button
          type="button"
          onClick={onClose}
          className="rounded-md border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          Skip
        </button>
        <button
          type="button"
          onClick={onStartTour}
          className="rounded-md bg-slate-900 px-3 py-2 text-sm font-medium text-white hover:bg-slate-800"
        >
          Take the tour
        </button>
      </div>
    </Modal>
  );
}
