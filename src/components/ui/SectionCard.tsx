"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export function SectionCard({
  title,
  titleContent,
  description,
  action,
  dragHandle,
  tourId,
  children,
}: {
  title: string;
  titleContent?: React.ReactNode;
  description?: string;
  action?: React.ReactNode;
  dragHandle?: React.ReactNode;
  tourId?: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(true);

  return (
    <section
      data-tour={tourId}
      className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
    >

      <div className="mb-4 flex items-start justify-between gap-4">
        <div className="flex items-start gap-1.5">
          {dragHandle}
          {titleContent ? (
            <>
              <button
                type="button"
                onClick={() => setOpen((o) => !o)}
                aria-expanded={open}
                aria-label={open ? "Collapse section" : "Expand section"}
                className="mt-0.5 shrink-0 text-slate-400 hover:text-slate-600"
              >
                <ChevronDown
                  size={16}
                  className={`transition-transform ${open ? "" : "-rotate-90"}`}
                />
              </button>
              <div>
                {titleContent}
                {description && open && (
                  <p className="mt-0.5 text-xs text-slate-500">
                    {description}
                  </p>
                )}
              </div>
            </>
          ) : (
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
          )}
        </div>
        {action}
      </div>
      {open && children}
    </section>
  );
}
