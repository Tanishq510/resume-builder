"use client";

import { useResumeStore } from "@/store/resumeStore";
import { Toolbar } from "@/components/Toolbar";
import { TemplateSelector } from "@/components/editor/TemplateSelector";
import { PersonalInfoForm } from "@/components/editor/PersonalInfoForm";
import { ExperienceForm } from "@/components/editor/ExperienceForm";
import { EducationForm } from "@/components/editor/EducationForm";
import { SkillsForm } from "@/components/editor/SkillsForm";
import { ProjectsForm } from "@/components/editor/ProjectsForm";
import { ResumePreview } from "@/components/preview/ResumePreview";

export default function Home() {
  const resume = useResumeStore((s) => s.resume);
  const templateId = useResumeStore((s) => s.templateId);

  return (
    <div className="flex min-h-screen flex-col">
      <Toolbar />
      <main className="mx-auto grid w-full max-w-[1400px] flex-1 grid-cols-1 gap-6 px-6 py-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <div className="space-y-5">
          <TemplateSelector />
          <PersonalInfoForm />
          <ExperienceForm />
          <EducationForm />
          <SkillsForm />
          <ProjectsForm />
        </div>
        <div className="lg:sticky lg:top-20 lg:self-start">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Live preview
            </span>
            <span className="text-xs text-slate-400">
              Single column · standard headings · no tables or icons
            </span>
          </div>
          <div className="max-h-[calc(100vh-8.5rem)] overflow-y-auto rounded-lg border border-slate-200 bg-slate-100 p-4 shadow-inner">
            <div className="shadow-md">
              <ResumePreview resume={resume} templateId={templateId} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
