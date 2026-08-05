"use client";

import { useResumeStore, SectionId } from "@/store/resumeStore";
import { Toolbar } from "@/components/Toolbar";
import { TemplateSelector } from "@/components/editor/TemplateSelector";
import { PersonalInfoForm } from "@/components/editor/PersonalInfoForm";
import { ExperienceForm } from "@/components/editor/ExperienceForm";
import { EducationForm } from "@/components/editor/EducationForm";
import { SkillsForm } from "@/components/editor/SkillsForm";
import { ProjectsForm } from "@/components/editor/ProjectsForm";
import { ReorderableSection } from "@/components/editor/ReorderableSection";
import { ResumePreview } from "@/components/preview/ResumePreview";
import { FaqAccordion } from "@/components/FaqAccordion";
import { faqItems } from "@/lib/faq";

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

const SECTION_COMPONENTS: Record<
  SectionId,
  React.ComponentType<{ dragHandle?: React.ReactNode }>
> = {
  experience: ExperienceForm,
  education: EducationForm,
  skills: SkillsForm,
  projects: ProjectsForm,
};

export default function Home() {
  const resume = useResumeStore((s) => s.resume);
  const templateId = useResumeStore((s) => s.templateId);
  const sectionOrder = useResumeStore((s) => s.sectionOrder);
  const reorderSections = useResumeStore((s) => s.reorderSections);

  return (
    <div className="flex min-h-screen flex-col">
      <Toolbar />
      <main className="mx-auto grid w-full max-w-[1400px] flex-1 grid-cols-1 gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <div className="space-y-5">
          <TemplateSelector />
          <PersonalInfoForm />
          {sectionOrder.map((sectionId, index) => {
            const SectionComponent = SECTION_COMPONENTS[sectionId];
            return (
              <ReorderableSection
                key={sectionId}
                index={index}
                onReorder={reorderSections}
              >
                {(dragHandle) => <SectionComponent dragHandle={dragHandle} />}
              </ReorderableSection>
            );
          })}
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
              <ResumePreview
                resume={resume}
                templateId={templateId}
                sectionOrder={sectionOrder}
              />
            </div>
          </div>
        </div>
      </main>

      <section className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-[900px] px-4 py-16 sm:px-6">
          <h2 className="text-2xl font-bold text-slate-900">
            The Free Resume Builder That Gets Past ATS Software
          </h2>
          <p className="mt-4 text-slate-700 leading-relaxed">
            Most job applications are read by software before they&apos;re
            ever read by a human. That&apos;s the problem this free resume
            builder is built to solve. Instead of chasing colored sidebars,
            icon-heavy layouts, or multi-column graphics that confuse
            applicant tracking systems, this tool focuses on clean,
            single-column formatting, standard section headings, and
            structured data that parses correctly — so your resume actually
            reaches a recruiter&apos;s desk.
          </p>
          <p className="mt-4 text-slate-700 leading-relaxed">
            As a resume builder, it covers the full workflow: fill in your
            personal details, work experience, education, skills, and
            projects; reorder sections with drag and drop to match what each
            job expects; and preview exactly what a hiring manager — and an
            ATS — will see, side by side, as you type. When you&apos;re
            done, download a polished PDF. No account, no email, no
            paywall.
          </p>

          <h3 className="mt-10 text-lg font-semibold text-slate-900">
            Why an ATS-Friendly Resume Builder Matters
          </h3>
          <p className="mt-3 text-slate-700 leading-relaxed">
            Applicant tracking systems scan resumes for keywords, dates, and
            section structure before a recruiter ever opens the file.
            Multi-column layouts, tables, text boxes, and image-based
            headers — common in many &ldquo;pretty&rdquo; resume templates —
            are often mangled or dropped entirely by this software, silently
            costing candidates interviews. That&apos;s why every template in
            this resume builder uses standard fonts, plain headings, and a
            predictable reading order: what you see in the live preview is
            what the parser sees too.
          </p>

          <h3 className="mt-10 text-lg font-semibold text-slate-900">
            Everything You Need in a Free Resume Builder
          </h3>
          <ul className="mt-3 space-y-2 text-slate-700 leading-relaxed list-disc pl-5">
            <li>
              <span className="font-medium text-slate-900">
                Live preview
              </span>{" "}
              — edit on the left, see the formatted resume update instantly
              on the right.
            </li>
            <li>
              <span className="font-medium text-slate-900">
                Drag-and-drop section reordering
              </span>{" "}
              — move Experience, Education, Skills, and Projects into
              whatever order suits the role.
            </li>
            <li>
              <span className="font-medium text-slate-900">
                Multiple ATS-safe templates
              </span>{" "}
              — modern, classic, minimal, and compact layouts, all
              single-column.
            </li>
            <li>
              <span className="font-medium text-slate-900">
                One-click PDF download
              </span>{" "}
              — export a clean, print-ready resume with no watermark and no
              signup wall.
            </li>
            <li>
              <span className="font-medium text-slate-900">
                Upload and import
              </span>{" "}
              — already have an old resume? Upload a PDF, DOCX, or TXT file
              and this free resume builder will parse it and prefill your
              contact details, experience, education, skills, and projects
              automatically, so you&apos;re not starting from a blank page.
            </li>
            <li>
              <span className="font-medium text-slate-900">
                Sample data on load
              </span>{" "}
              — see a fully filled-out example resume the moment you open
              the tool, so you know what &ldquo;done&rdquo; looks like
              before you write a word.
            </li>
            <li>
              <span className="font-medium text-slate-900">
                Autosave in your browser
              </span>{" "}
              — your work is saved locally as you go; nothing is uploaded to
              a server unless you choose to export it.
            </li>
          </ul>

          <h3 className="mt-10 text-lg font-semibold text-slate-900">
            How This Compares to Indeed, LinkedIn, and Zety Resume Builders
          </h3>
          <p className="mt-3 text-slate-700 leading-relaxed">
            If you&apos;ve used the Indeed resume builder, the LinkedIn
            resume builder, or Zety before, you&apos;ll notice the biggest
            difference here right away: there&apos;s no account to create
            and no premium tier blocking your download. You can also bring
            your existing work with you — export your resume from LinkedIn
            as a PDF (or use any resume you already have from Indeed, Zety,
            or elsewhere) and upload it directly into this tool to pick up
            editing where you left off, instead of retyping everything from
            scratch.
          </p>

          <h3 className="mt-10 text-lg font-semibold text-slate-900">
            Frequently Asked Questions
          </h3>
          <FaqAccordion items={faqItems} />
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
    </div>
  );
}
