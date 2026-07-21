"use client";

import { Plus, Trash2 } from "lucide-react";
import { useResumeStore } from "@/store/resumeStore";
import { SectionCard } from "@/components/ui/SectionCard";
import { Field, TextInput } from "@/components/ui/inputs";

export function EducationForm() {
  const education = useResumeStore((s) => s.resume.education);
  const addEducation = useResumeStore((s) => s.addEducation);
  const updateEducation = useResumeStore((s) => s.updateEducation);
  const removeEducation = useResumeStore((s) => s.removeEducation);

  return (
    <SectionCard
      title="Education"
      action={
        <button
          type="button"
          onClick={addEducation}
          className="flex items-center gap-1 rounded-md border border-slate-300 px-2.5 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
        >
          <Plus size={14} /> Add school
        </button>
      }
    >
      {education.length === 0 && (
        <p className="text-sm text-slate-400">No education added yet.</p>
      )}
      <div className="space-y-5">
        {education.map((edu) => (
          <div
            key={edu.id}
            className="rounded-md border border-slate-200 p-4"
          >
            <div className="mb-3 flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                School
              </span>
              <button
                type="button"
                onClick={() => removeEducation(edu.id)}
                className="flex items-center gap-1 text-xs font-medium text-red-500 hover:text-red-700"
              >
                <Trash2 size={14} /> Remove
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Field label="School">
                <TextInput
                  value={edu.school}
                  onChange={(e) =>
                    updateEducation(edu.id, { school: e.target.value })
                  }
                  placeholder="University of Texas at Austin"
                />
              </Field>
              <Field label="Location">
                <TextInput
                  value={edu.location}
                  onChange={(e) =>
                    updateEducation(edu.id, { location: e.target.value })
                  }
                  placeholder="Austin, TX"
                />
              </Field>
              <Field label="Degree">
                <TextInput
                  value={edu.degree}
                  onChange={(e) =>
                    updateEducation(edu.id, { degree: e.target.value })
                  }
                  placeholder="B.S."
                />
              </Field>
              <Field label="Field of study">
                <TextInput
                  value={edu.field}
                  onChange={(e) =>
                    updateEducation(edu.id, { field: e.target.value })
                  }
                  placeholder="Computer Science"
                />
              </Field>
              <Field label="Start date">
                <TextInput
                  value={edu.startDate}
                  onChange={(e) =>
                    updateEducation(edu.id, { startDate: e.target.value })
                  }
                  placeholder="2015"
                />
              </Field>
              <Field label="End date">
                <TextInput
                  value={edu.endDate}
                  onChange={(e) =>
                    updateEducation(edu.id, { endDate: e.target.value })
                  }
                  placeholder="2019"
                />
              </Field>
            </div>
            <div className="mt-3">
              <Field label="Additional details (optional)">
                <TextInput
                  value={edu.details}
                  onChange={(e) =>
                    updateEducation(edu.id, { details: e.target.value })
                  }
                  placeholder="GPA: 3.8/4.0, Dean's List"
                />
              </Field>
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
