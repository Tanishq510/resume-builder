"use client";

import { Plus, Trash2 } from "lucide-react";
import { useResumeStore } from "@/store/resumeStore";
import { SectionCard } from "@/components/ui/SectionCard";
import { Field, TextInput } from "@/components/ui/inputs";
import { BulletListEditor } from "@/components/editor/BulletListEditor";
import { useHighlightNewest } from "@/hooks/useHighlightNewest";

export function ExperienceForm({
  dragHandle,
}: {
  dragHandle?: React.ReactNode;
}) {
  const experience = useResumeStore((s) => s.resume.experience);
  const addExperience = useResumeStore((s) => s.addExperience);
  const updateExperience = useResumeStore((s) => s.updateExperience);
  const removeExperience = useResumeStore((s) => s.removeExperience);
  const { highlightId, registerRef } = useHighlightNewest(
    experience.map((e) => e.id)
  );

  return (
    <SectionCard
      title="Work experience"
      description="List roles in reverse-chronological order. Start bullets with strong action verbs and quantify results where possible."
      dragHandle={dragHandle}
      action={
        <button
          type="button"
          onClick={addExperience}
          className="flex items-center gap-1 rounded-md border border-slate-300 px-2.5 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
        >
          <Plus size={14} /> Add role
        </button>
      }
    >
      {experience.length === 0 && (
        <p className="text-sm text-slate-400">No work experience added yet.</p>
      )}
      <div className="space-y-5">
        {experience.map((exp) => (
          <div
            key={exp.id}
            ref={registerRef(exp.id)}
            className={`rounded-md border p-4 transition-colors duration-300 ${
              highlightId === exp.id
                ? "border-emerald-400 bg-emerald-50"
                : "border-slate-200"
            }`}
          >
            <div className="mb-3 flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Role
              </span>
              <button
                type="button"
                onClick={() => removeExperience(exp.id)}
                className="flex items-center gap-1 text-xs font-medium text-red-500 hover:text-red-700"
              >
                <Trash2 size={14} /> Remove
              </button>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <Field label="Company">
                <TextInput
                  value={exp.company}
                  onChange={(e) =>
                    updateExperience(exp.id, { company: e.target.value })
                  }
                  placeholder="Northwind Technologies"
                />
              </Field>
              <Field label="Job title">
                <TextInput
                  value={exp.role}
                  onChange={(e) =>
                    updateExperience(exp.id, { role: e.target.value })
                  }
                  placeholder="Senior Software Engineer"
                />
              </Field>
              <Field label="Location">
                <TextInput
                  value={exp.location}
                  onChange={(e) =>
                    updateExperience(exp.id, { location: e.target.value })
                  }
                  placeholder="Austin, TX"
                />
              </Field>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <Field label="Start date">
                  <TextInput
                    value={exp.startDate}
                    onChange={(e) =>
                      updateExperience(exp.id, { startDate: e.target.value })
                    }
                    placeholder="Jun 2022"
                  />
                </Field>
                <Field label="End date">
                  <TextInput
                    value={exp.endDate}
                    disabled={exp.current}
                    onChange={(e) =>
                      updateExperience(exp.id, { endDate: e.target.value })
                    }
                    placeholder="Present"
                  />
                </Field>
              </div>
            </div>
            <label className="mt-2 flex items-center gap-2 text-xs text-slate-600">
              <input
                type="checkbox"
                checked={exp.current}
                onChange={(e) =>
                  updateExperience(exp.id, {
                    current: e.target.checked,
                    endDate: e.target.checked ? "" : exp.endDate,
                  })
                }
              />
              I currently work here
            </label>
            <div className="mt-3">
              <BulletListEditor
                bullets={exp.bullets}
                onChange={(bullets) => updateExperience(exp.id, { bullets })}
              />
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
