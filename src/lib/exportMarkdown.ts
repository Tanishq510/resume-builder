import { ResumeData } from "@/types/resume";
import { SectionId, defaultSectionOrder } from "@/lib/sections";

function dateRange(start: string, end: string, current: boolean) {
  const endLabel = current ? "Present" : end;
  if (!start && !endLabel) return "";
  return [start, endLabel].filter(Boolean).join(" – ");
}

const SECTION_TITLES: Record<SectionId, string> = {
  experience: "Experience",
  education: "Education",
  skills: "Skills",
  projects: "Projects",
  certificates: "Certificates",
  achievements: "Achievements",
};

export function resumeToMarkdown(
  resume: ResumeData,
  sectionOrder: SectionId[] = defaultSectionOrder
): string {
  const { personalInfo, experience, education, skills, projects, certificates, achievements } =
    resume;
  const lines: string[] = [];

  lines.push(`# ${personalInfo.fullName || "Your Name"}`);
  if (personalInfo.jobTitle) lines.push(`**${personalInfo.jobTitle}**`);

  const contactParts = [
    personalInfo.email,
    personalInfo.phone,
    personalInfo.location,
    personalInfo.linkedin,
    personalInfo.website,
  ].filter(Boolean);
  if (contactParts.length) lines.push(contactParts.join(" | "));

  if (personalInfo.summary) {
    lines.push("", "## Summary", "", personalInfo.summary);
  }

  const sectionBody: Record<SectionId, () => string[]> = {
    experience: () => {
      if (!experience.length) return [];
      const body: string[] = [];
      experience.forEach((exp) => {
        const title = [exp.role || "Job Title", exp.company]
          .filter(Boolean)
          .join(", ");
        const range = dateRange(exp.startDate, exp.endDate, exp.current);
        body.push(`### ${title}${range ? ` (${range})` : ""}`);
        if (exp.location) body.push(exp.location);
        exp.bullets.filter(Boolean).forEach((bullet) => body.push(`- ${bullet}`));
        body.push("");
      });
      return body;
    },
    education: () => {
      if (!education.length) return [];
      const body: string[] = [];
      education.forEach((edu) => {
        const title =
          [edu.degree, edu.field].filter(Boolean).join(", ") || "Degree";
        const range = dateRange(edu.startDate, edu.endDate, false);
        body.push(
          `### ${title}${edu.school ? ` — ${edu.school}` : ""}${
            range ? ` (${range})` : ""
          }`
        );
        if (edu.location || edu.details) {
          body.push([edu.location, edu.details].filter(Boolean).join(" — "));
        }
        body.push("");
      });
      return body;
    },
    skills: () => {
      const groups = skills.filter((g) => g.skills.length > 0);
      if (!groups.length) return [];
      return groups.map((group) =>
        group.name
          ? `- **${group.name}:** ${group.skills.join(", ")}`
          : `- ${group.skills.join(", ")}`
      );
    },
    projects: () => {
      if (!projects.length) return [];
      const body: string[] = [];
      projects.forEach((project) => {
        body.push(
          `### ${project.name || "Project Name"}${
            project.link ? ` (${project.link})` : ""
          }`
        );
        project.bullets
          .filter(Boolean)
          .forEach((bullet) => body.push(`- ${bullet}`));
        body.push("");
      });
      return body;
    },
    certificates: () => {
      if (!certificates.length) return [];
      const body: string[] = [];
      certificates.forEach((cert) => {
        const title = [cert.name || "Certificate Name", cert.issuer]
          .filter(Boolean)
          .join(", ");
        body.push(`### ${title}${cert.date ? ` (${cert.date})` : ""}`);
        if (cert.link) body.push(cert.link);
        body.push("");
      });
      return body;
    },
    achievements: () => {
      const filtered = achievements.filter(Boolean);
      if (!filtered.length) return [];
      return filtered.map((achievement) => `- ${achievement}`);
    },
  };

  sectionOrder.forEach((sectionId) => {
    const body = sectionBody[sectionId]();
    if (body.length) {
      lines.push("", `## ${SECTION_TITLES[sectionId]}`, "", ...body);
    }
  });

  return lines.join("\n").replace(/\n{3,}/g, "\n\n").trim() + "\n";
}
