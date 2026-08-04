"use client";

import { Plus, Trash2 } from "lucide-react";
import { useResumeStore } from "@/store/resumeStore";
import { SectionCard } from "@/components/ui/SectionCard";
import { Field, TextInput } from "@/components/ui/inputs";
import { BulletListEditor } from "@/components/editor/BulletListEditor";

export function ProjectsForm({
  dragHandle,
}: {
  dragHandle?: React.ReactNode;
}) {
  const projects = useResumeStore((s) => s.resume.projects);
  const addProject = useResumeStore((s) => s.addProject);
  const updateProject = useResumeStore((s) => s.updateProject);
  const removeProject = useResumeStore((s) => s.removeProject);

  return (
    <SectionCard
      title="Projects"
      description="Optional. Useful for showcasing side projects, open source work, or portfolio pieces."
      dragHandle={dragHandle}
      action={
        <button
          type="button"
          onClick={addProject}
          className="flex items-center gap-1 rounded-md border border-slate-300 px-2.5 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
        >
          <Plus size={14} /> Add project
        </button>
      }
    >
      {projects.length === 0 && (
        <p className="text-sm text-slate-400">No projects added yet.</p>
      )}
      <div className="space-y-5">
        {projects.map((project) => (
          <div
            key={project.id}
            className="rounded-md border border-slate-200 p-4"
          >
            <div className="mb-3 flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Project
              </span>
              <button
                type="button"
                onClick={() => removeProject(project.id)}
                className="flex items-center gap-1 text-xs font-medium text-red-500 hover:text-red-700"
              >
                <Trash2 size={14} /> Remove
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Project name">
                <TextInput
                  value={project.name}
                  onChange={(e) =>
                    updateProject(project.id, { name: e.target.value })
                  }
                  placeholder="Task Flow"
                />
              </Field>
              <Field label="Link (optional)">
                <TextInput
                  value={project.link}
                  onChange={(e) =>
                    updateProject(project.id, { link: e.target.value })
                  }
                  placeholder="github.com/you/project"
                />
              </Field>
            </div>
            <div className="mt-3">
              <BulletListEditor
                bullets={project.bullets}
                onChange={(bullets) =>
                  updateProject(project.id, { bullets })
                }
              />
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
