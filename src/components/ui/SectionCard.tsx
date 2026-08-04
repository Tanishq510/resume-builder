"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export function SectionCard({
  title,
  description,
  action,
  dragHandle,
  children,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
  dragHandle?: React.ReactNode;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(true);

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div className="flex items-start gap-1.5">
          {dragHandle}
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            className="flex items-start gap-1.5 text-left"
          >
            <ChevronDown
              size={16}
              className={`mt-0.5 shrink-0 text-slate-400 transition-transform ${
                open ? "" : "-rotate-90"
              }`}
            />
            <div>
              <h2 className="text-sm font-semibold text-slate-900">
                {title}
              </h2>
              {description && open && (
                <p className="mt-0.5 text-xs text-slate-500">
                  {description}
                </p>
              )}
            </div>
          </button>
        </div>
        {action}
      </div>
      {open && children}
    </section>
  );
}
