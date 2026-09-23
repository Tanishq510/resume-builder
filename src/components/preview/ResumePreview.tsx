import { Fragment } from "react";
import { ResumeData } from "@/types/resume";
import { TemplateId, defaultTemplateId } from "@/lib/templates";
import { SectionId, defaultSectionOrder } from "@/lib/sections";
import { previewVariants } from "@/components/preview/previewVariants";
import { EditableHeading } from "@/components/EditableHeading";
import { HeadingKey, resolveHeadings } from "@/lib/sectionHeadings";

function dateRange(start: string, end: string, current: boolean) {
  const endLabel = current ? "Present" : end;
  if (!start && !endLabel) return "";
  return [start, endLabel].filter(Boolean).join(" – ");
}

export function ResumePreview({
  resume,
  templateId = defaultTemplateId,
  sectionOrder = defaultSectionOrder,
  headingOverrides = {},
}: {
  resume: ResumeData;
  templateId?: TemplateId;
  sectionOrder?: SectionId[];
  headingOverrides?: Partial<Record<HeadingKey, string>>;
}) {
  const headings = resolveHeadings(headingOverrides);
  const {
    personalInfo,
    experience,
    education,
    skills,
    projects,
    certificates,
    achievements,
  } = resume;
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
          <EditableHeading
            section="experience"
            value={headings.experience}
            className={v.sectionTitleClass}
          />
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
          <EditableHeading
            section="education"
            value={headings.education}
            className={v.sectionTitleClass}
          />
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
    skills: () => {
      const groups = skills.filter((g) => g.skills.length > 0);
      return (
        groups.length > 0 && (
          <section className={v.sectionGapClass}>
            <EditableHeading
              section="skills"
              value={headings.skills}
              className={v.sectionTitleClass}
            />
            <div className="space-y-1">
              {groups.map((group) => (
                <p key={group.id} className={v.paragraphClass}>
                  {group.name && (
                    <span className="font-semibold">{group.name}: </span>
                  )}
                  {group.skills.join(", ")}
                </p>
              ))}
            </div>
          </section>
        )
      );
    },
    projects: () =>
      projects.length > 0 && (
        <section className={v.sectionGapClass}>
          <EditableHeading
            section="projects"
            value={headings.projects}
            className={v.sectionTitleClass}
          />
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
    certificates: () =>
      certificates.length > 0 && (
        <section className={v.sectionGapClass}>
          <EditableHeading
            section="certificates"
            value={headings.certificates}
            className={v.sectionTitleClass}
          />
          <div className="space-y-2">
            {certificates.map((cert) => (
              <div key={cert.id}>
                <div className="flex items-baseline justify-between gap-2">
                  <span className={v.itemTitleClass}>
                    {cert.name || "Certificate Name"}
                    {cert.issuer ? `, ${cert.issuer}` : ""}
                  </span>
                  <span className={`whitespace-nowrap ${v.itemDateClass}`}>
                    {cert.date}
                  </span>
                </div>
                {cert.link && (
                  <div className={v.itemSubtitleClass}>{cert.link}</div>
                )}
              </div>
            ))}
          </div>
        </section>
      ),
    achievements: () =>
      achievements.filter(Boolean).length > 0 && (
        <section>
          <EditableHeading
            section="achievements"
            value={headings.achievements}
            className={v.sectionTitleClass}
          />
          <ul className="list-disc space-y-0.5 pl-4">
            {achievements
              .filter(Boolean)
              .map((achievement, i) => (
                <li key={i} className={v.bulletClass}>
                  {achievement}
                </li>
              ))}
          </ul>
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
        <p className={v.nameClass}>{personalInfo.fullName || "Your Name"}</p>
        {personalInfo.jobTitle && (
          <p className={v.jobTitleClass}>{personalInfo.jobTitle}</p>
        )}
        {contactParts.length > 0 && (
          <p className={v.contactClass}>{contactParts.join("  |  ")}</p>
        )}
      </header>

      {personalInfo.summary && (
        <section className={v.sectionGapClass}>
          <EditableHeading
            section="summary"
            value={headings.summary}
            className={v.sectionTitleClass}
          />
          <p className={v.paragraphClass}>{personalInfo.summary}</p>
        </section>
      )}

      {sectionOrder.map((sectionId) => (
        <Fragment key={sectionId}>{sectionRenderers[sectionId]()}</Fragment>
      ))}
    </div>
  );
}
