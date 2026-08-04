import { Fragment } from "react";
import { ResumeData } from "@/types/resume";
import { TemplateId, defaultTemplateId } from "@/lib/templates";
import { SectionId, defaultSectionOrder } from "@/lib/sections";
import { previewVariants } from "@/components/preview/previewVariants";

function dateRange(start: string, end: string, current: boolean) {
  const endLabel = current ? "Present" : end;
  if (!start && !endLabel) return "";
  return [start, endLabel].filter(Boolean).join(" – ");
}

export function ResumePreview({
  resume,
  templateId = defaultTemplateId,
  sectionOrder = defaultSectionOrder,
}: {
  resume: ResumeData;
  templateId?: TemplateId;
  sectionOrder?: SectionId[];
}) {
  const { personalInfo, experience, education, skills, projects } = resume;
  const v = previewVariants[templateId];
  const contactParts = [
    personalInfo.email,
    personalInfo.phone,
    personalInfo.location,
    personalInfo.linkedin,
    personalInfo.website,
  ].filter(Boolean);

  const sectionRenderers: Record<SectionId, () => React.ReactNode> = {
    experience: () =>
      experience.length > 0 && (
        <section className={v.sectionGapClass}>
          <h2 className={v.sectionTitleClass}>Experience</h2>
          <div className="space-y-3">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex items-baseline justify-between gap-2">
                  <span className={v.itemTitleClass}>
                    {exp.role || "Job Title"}
                    {exp.company ? `, ${exp.company}` : ""}
                  </span>
                  <span className={`whitespace-nowrap ${v.itemDateClass}`}>
                    {dateRange(exp.startDate, exp.endDate, exp.current)}
                  </span>
                </div>
                {exp.location && (
                  <div className={v.itemSubtitleClass}>{exp.location}</div>
                )}
                {exp.bullets.filter(Boolean).length > 0 && (
                  <ul className="mt-1 list-disc space-y-0.5 pl-4">
                    {exp.bullets
                      .filter(Boolean)
                      .map((bullet, i) => (
                        <li key={i} className={v.bulletClass}>
                          {bullet}
                        </li>
                      ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      ),
    education: () =>
      education.length > 0 && (
        <section className={v.sectionGapClass}>
          <h2 className={v.sectionTitleClass}>Education</h2>
          <div className="space-y-2">
            {education.map((edu) => (
              <div key={edu.id}>
                <div className="flex items-baseline justify-between gap-2">
                  <span className={v.itemTitleClass}>
                    {[edu.degree, edu.field].filter(Boolean).join(", ") ||
                      "Degree"}
                    {edu.school ? ` — ${edu.school}` : ""}
                  </span>
                  <span className={`whitespace-nowrap ${v.itemDateClass}`}>
                    {dateRange(edu.startDate, edu.endDate, false)}
                  </span>
                </div>
                {(edu.location || edu.details) && (
                  <div className={v.itemSubtitleClass}>
                    {[edu.location, edu.details].filter(Boolean).join(" — ")}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      ),
    skills: () =>
      skills.length > 0 && (
        <section className={v.sectionGapClass}>
          <h2 className={v.sectionTitleClass}>Skills</h2>
          <p className={v.paragraphClass}>{skills.join(" | ")}</p>
        </section>
      ),
    projects: () =>
      projects.length > 0 && (
        <section>
          <h2 className={v.sectionTitleClass}>Projects</h2>
          <div className="space-y-3">
            {projects.map((project) => (
              <div key={project.id}>
                <div className={v.itemTitleClass}>
                  {project.name || "Project Name"}
                  {project.link && (
                    <span className="ml-1 font-normal text-slate-500">
                      ({project.link})
                    </span>
                  )}
                </div>
                {project.bullets.filter(Boolean).length > 0 && (
                  <ul className="mt-1 list-disc space-y-0.5 pl-4">
                    {project.bullets
                      .filter(Boolean)
                      .map((bullet, i) => (
                        <li key={i} className={v.bulletClass}>
                          {bullet}
                        </li>
                      ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      ),
  };

  return (
    <div
      id="resume-preview"
      className={`mx-auto w-full max-w-[8.5in] bg-white text-slate-900 ${v.containerClass}`}
      style={{ fontFamily: v.fontFamily }}
    >
      <header className={v.headerWrapClass}>
        <h1 className={v.nameClass}>{personalInfo.fullName || "Your Name"}</h1>
        {personalInfo.jobTitle && (
          <p className={v.jobTitleClass}>{personalInfo.jobTitle}</p>
        )}
        {contactParts.length > 0 && (
          <p className={v.contactClass}>{contactParts.join("  |  ")}</p>
        )}
      </header>

      {personalInfo.summary && (
        <section className={v.sectionGapClass}>
          <h2 className={v.sectionTitleClass}>Summary</h2>
          <p className={v.paragraphClass}>{personalInfo.summary}</p>
        </section>
      )}

      {sectionOrder.map((sectionId) => (
        <Fragment key={sectionId}>{sectionRenderers[sectionId]()}</Fragment>
      ))}
    </div>
  );
}
