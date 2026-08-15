"use client";

import { useRef, useState } from "react";
import { Upload, Loader2, CircleCheck, CircleAlert } from "lucide-react";
import { useResumeStore } from "@/store/resumeStore";
import { extractTextFromFile } from "@/lib/fileText";
import { parseResumeText } from "@/lib/resumeParser";

type Status =
  | { state: "idle" }
  | { state: "loading" }
  | { state: "success"; message: string }
  | { state: "error"; message: string };

export function ImportResumeButton() {
  const importResume = useResumeStore((s) => s.importResume);
  const inputRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<Status>({ state: "idle" });

  const flashStatus = (next: Status) => {
    setStatus(next);
    if (next.state === "success" || next.state === "error") {
      window.setTimeout(() => setStatus({ state: "idle" }), 5000);
    }
  };

  const handleFile = async (file: File) => {
    setStatus({ state: "loading" });
    try {
      const text = await extractTextFromFile(file);
      const parsed = parseResumeText(text);

      const foundParts = [
        parsed.experience.length && "experience",
        parsed.education.length && "education",
        parsed.skills.length && "skills",
        parsed.projects.length && "projects",
        parsed.certificates.length && "certificates",
        parsed.achievements.length && "achievements",
      ].filter(Boolean) as string[];

      if (!parsed.personalInfo.fullName && foundParts.length === 0) {
        flashStatus({
          state: "error",
          message:
            "Couldn't find recognizable resume sections in that file. Try a different file or fill the form manually.",
        });
        return;
      }

      const proceed = window.confirm(
        `Import data from "${file.name}"? This will replace the section(s) found (${
          foundParts.length ? foundParts.join(", ") : "contact details"
        }) in your current resume.`
      );
      if (!proceed) {
        flashStatus({ state: "idle" });
        return;
      }

      importResume(parsed);
      flashStatus({
        state: "success",
        message:
          "Imported — review the fields below, extraction from PDFs/DOCX isn't always perfect.",
      });
    } catch (err) {
      flashStatus({
        state: "error",
        message:
          err instanceof Error ? err.message : "Couldn't read that file.",
      });
    }
  };

  return (
    <div className="relative" data-tour="import">
      <input
        ref={inputRef}
        type="file"
        accept=".pdf,.docx,.txt,.md,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain,text/markdown"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          e.target.value = "";
          if (file) handleFile(file);
        }}
      />
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={status.state === "loading"}
        title="Upload an existing resume (PDF, DOCX, TXT, or MD) to prefill the form"
        className="flex items-center gap-1.5 rounded-md border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status.state === "loading" ? (
          <Loader2 size={15} className="animate-spin" />
        ) : (
          <Upload size={15} />
        )}
        Upload resume
      </button>
      {(status.state === "success" || status.state === "error") && (
        <div
          className={`absolute right-0 top-full z-20 mt-2 w-72 rounded-md border p-2.5 text-xs shadow-lg ${
            status.state === "success"
              ? "border-emerald-200 bg-emerald-50 text-emerald-800"
              : "border-red-200 bg-red-50 text-red-800"
          }`}
        >
          <div className="flex items-start gap-1.5">
            {status.state === "success" ? (
              <CircleCheck size={14} className="mt-0.5 shrink-0" />
            ) : (
              <CircleAlert size={14} className="mt-0.5 shrink-0" />
            )}
            <span>{status.message}</span>
          </div>
        </div>
      )}
    </div>
  );
}
