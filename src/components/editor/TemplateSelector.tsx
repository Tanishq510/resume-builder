"use client";

import { Check } from "lucide-react";
import { useResumeStore } from "@/store/resumeStore";
import { templateOptions } from "@/lib/templates";
import { SectionCard } from "@/components/ui/SectionCard";

export function TemplateSelector() {
  const templateId = useResumeStore((s) => s.templateId);
  const setTemplateId = useResumeStore((s) => s.setTemplateId);

  return (
    <SectionCard
      title="Format"
      description="All formats are single-column and use standard fonts and headings, so they stay ATS-parseable."
      tourId="template-selector"
    >
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {templateOptions.map((option) => {
          const isSelected = option.id === templateId;
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => setTemplateId(option.id)}
              aria-pressed={isSelected}
              className={`relative rounded-md border p-3 text-left transition-colors ${
                isSelected
                  ? "border-slate-900 bg-slate-900/5"
                  : "border-slate-200 hover:border-slate-400"
              }`}
            >
              {isSelected && (
                <span className="absolute right-2 top-2 flex h-4 w-4 items-center justify-center rounded-full bg-slate-900 text-white">
                  <Check size={11} />
                </span>
              )}
              <span className="block text-sm font-semibold text-slate-900">
                {option.name}
              </span>
              <span className="mt-1 block text-[11px] leading-snug text-slate-500">
                {option.description}
              </span>
            </button>
          );
        })}
      </div>
    </SectionCard>
  );
}
