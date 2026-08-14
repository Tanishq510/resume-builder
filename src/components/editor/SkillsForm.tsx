"use client";

import { useState } from "react";
import { Plus, Trash2, X } from "lucide-react";
import { useResumeStore } from "@/store/resumeStore";
import { SectionCard } from "@/components/ui/SectionCard";
import { Field, TextInput } from "@/components/ui/inputs";
import { useHighlightNewest } from "@/hooks/useHighlightNewest";

function SkillChips({
  skills,
  onAdd,
  onRemove,
}: {
  skills: string[];
  onAdd: (skill: string) => void;
  onRemove: (skill: string) => void;
}) {
  const [draft, setDraft] = useState("");

  const commit = () => {
    const value = draft.trim();
    if (value) onAdd(value);
    setDraft("");
  };

  return (
    <div>
      <div className="flex gap-2">
        <TextInput
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === ",") {
              e.preventDefault();
              commit();
            }
          }}
          placeholder="Type a skill and press Enter"
        />
        <button
          type="button"
          onClick={commit}
          className="shrink-0 rounded-md border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          Add
        </button>
      </div>
      {skills.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span
              key={skill}
              className="flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700"
            >
              {skill}
              <button
                type="button"
                onClick={() => onRemove(skill)}
                aria-label={`Remove ${skill}`}
                className="text-slate-400 hover:text-red-600"
              >
                <X size={12} />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export function SkillsForm({
  dragHandle,
}: {
  dragHandle?: React.ReactNode;
}) {
  const skillGroups = useResumeStore((s) => s.resume.skills);
  const addSkillGroup = useResumeStore((s) => s.addSkillGroup);
  const updateSkillGroupName = useResumeStore((s) => s.updateSkillGroupName);
  const removeSkillGroup = useResumeStore((s) => s.removeSkillGroup);
  const addSkillToGroup = useResumeStore((s) => s.addSkillToGroup);
  const removeSkillFromGroup = useResumeStore((s) => s.removeSkillFromGroup);
  const { highlightId, registerRef } = useHighlightNewest(
    skillGroups.map((g) => g.id)
  );

  return (
    <SectionCard
      title="Skills"
      description="List exact keywords from the job description (e.g. 'Project Management' not 'PM') — ATS systems match on exact text. Optionally split them into groups like Frontend, Backend, Cloud."
      dragHandle={dragHandle}
      action={
        <button
          type="button"
          onClick={addSkillGroup}
          className="flex items-center gap-1 rounded-md border border-slate-300 px-2.5 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
        >
          <Plus size={14} /> Add group
        </button>
      }
    >
      {skillGroups.length === 0 && (
        <p className="text-sm text-slate-400">No skills added yet.</p>
      )}
      <div className="space-y-5">
        {skillGroups.map((group, index) => (
          <div
            key={group.id}
            ref={registerRef(group.id)}
            className={`rounded-md border p-4 transition-colors duration-300 ${
              highlightId === group.id
                ? "border-emerald-400 bg-emerald-50"
                : "border-slate-200"
            }`}
          >
            <div className="mb-3 flex items-end justify-between gap-3">
              <Field label="Group name (optional, e.g. Frontend)">
                <TextInput
                  value={group.name}
                  onChange={(e) =>
                    updateSkillGroupName(group.id, e.target.value)
                  }
                  placeholder="Frontend"
                />
              </Field>
              {skillGroups.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeSkillGroup(group.id)}
                  className="flex shrink-0 items-center gap-1 text-xs font-medium text-red-500 hover:text-red-700"
                >
                  <Trash2 size={14} /> Remove
                </button>
              )}
            </div>
            <SkillChips
              skills={group.skills}
              onAdd={(skill) => addSkillToGroup(group.id, skill)}
              onRemove={(skill) => removeSkillFromGroup(group.id, skill)}
            />
            {index === 0 && skillGroups.length === 1 && (
              <p className="mt-3 text-xs text-slate-400">
                Leave the group name blank for a single flat list, or add
                another group to organize skills by category.
              </p>
            )}
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
