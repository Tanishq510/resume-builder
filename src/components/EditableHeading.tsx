"use client";

import { useEffect, useRef, useState } from "react";
import { RotateCcw } from "lucide-react";
import { useResumeStore } from "@/store/resumeStore";
import { HeadingKey, defaultHeadings } from "@/lib/sectionHeadings";

export function EditableHeading({
  section,
  value,
  className,
}: {
  section: HeadingKey;
  value: string;
  className: string;
}) {
  const setHeadingOverride = useResumeStore((s) => s.setHeadingOverride);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);
  const defaultValue = defaultHeadings[section];
  const isCustom = value !== defaultValue;

  useEffect(() => {
    if (!editing) return;
    const input = inputRef.current;
    input?.focus();
    input?.select();
  }, [editing]);

  const startEditing = () => {
    setDraft(value);
    setEditing(true);
  };

  const commit = () => {
    setEditing(false);
    const trimmed = draft.trim();
    setHeadingOverride(
      section,
      trimmed && trimmed !== defaultValue ? trimmed : null
    );
  };

  if (editing) {
    return (
      <h2 className={className}>
        <input
          ref={inputRef}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={commit}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              commit();
            } else if (e.key === "Escape") {
              e.preventDefault();
              setEditing(false);
            }
          }}
          aria-label={`Resume heading for the ${defaultValue} section`}
          className="m-0 block w-full max-w-full border-0 border-b border-dashed border-slate-400 bg-transparent p-0 outline-none"
        />
      </h2>
    );
  }

  return (
    <h2 className={`${className} group/heading`}>
      <span className="inline-flex max-w-full items-baseline gap-1.5">
        <button
          type="button"
          onClick={startEditing}
          title="Click to edit this heading"
          className="-mx-0.5 rounded-sm border-0 bg-transparent px-0.5 py-0 text-left transition-colors hover:bg-slate-100/70 focus:bg-slate-100/70 focus:outline-none"
        >
          {value}
        </button>
        {isCustom && (
          <button
            type="button"
            onClick={() => setHeadingOverride(section, null)}
            aria-label={`Reset heading to "${defaultValue}"`}
            title={`Reset to "${defaultValue}"`}
            className="shrink-0 self-center rounded p-0.5 text-slate-300 opacity-0 transition-opacity duration-150 hover:text-slate-600 focus:opacity-100 focus:outline-none group-hover/heading:opacity-100"
          >
            <RotateCcw size={12} />
          </button>
        )}
      </span>
    </h2>
  );
}
