import { create } from "zustand";
import { persist } from "zustand/middleware";
import { v4 as uuid } from "uuid";
import {
  CertificateEntry,
  EducationEntry,
  ExperienceEntry,
  PersonalInfo,
  ProjectEntry,
  ResumeData,
  SkillGroup,
} from "@/types/resume";
import { emptyResume, sampleResume } from "@/lib/sampleData";
import { TemplateId, defaultTemplateId } from "@/lib/templates";
import { SectionId, defaultSectionOrder } from "@/lib/sections";
import { ParsedResume } from "@/lib/resumeParser";

export type { SectionId } from "@/lib/sections";

interface ResumeStore {
  resume: ResumeData;
  templateId: TemplateId;
  setTemplateId: (templateId: TemplateId) => void;
  updatePersonalInfo: (info: Partial<PersonalInfo>) => void;

  addExperience: () => void;
  updateExperience: (id: string, entry: Partial<ExperienceEntry>) => void;
  removeExperience: (id: string) => void;

  addEducation: () => void;
  updateEducation: (id: string, entry: Partial<EducationEntry>) => void;
  removeEducation: (id: string) => void;

  addProject: () => void;
  updateProject: (id: string, entry: Partial<ProjectEntry>) => void;
  removeProject: (id: string) => void;

  addSkillGroup: () => void;
  updateSkillGroupName: (id: string, name: string) => void;
  removeSkillGroup: (id: string) => void;
  addSkillToGroup: (groupId: string, skill: string) => void;
  removeSkillFromGroup: (groupId: string, skill: string) => void;

  addCertificate: () => void;
  updateCertificate: (id: string, entry: Partial<CertificateEntry>) => void;
  removeCertificate: (id: string) => void;

  setAchievements: (achievements: string[]) => void;

  sectionOrder: SectionId[];
  reorderSections: (from: number, to: number) => void;

  isSamplePreview: boolean;

  loadSample: () => void;
  clearAll: () => void;
  importResume: (parsed: ParsedResume) => void;
}

function mergePersonalInfo(
  base: PersonalInfo,
  incoming: Partial<PersonalInfo>
): PersonalInfo {
  const result = { ...base };
  (Object.keys(incoming) as (keyof PersonalInfo)[]).forEach((key) => {
    const value = incoming[key];
    if (typeof value === "string" && value.trim()) {
      result[key] = value;
    }
  });
  return result;
}

export const useResumeStore = create<ResumeStore>()(
  persist(
    (set) => ({
      resume: sampleResume,
      isSamplePreview: true,
      templateId: defaultTemplateId,
      sectionOrder: defaultSectionOrder,
      setTemplateId: (templateId) => set({ templateId }),

      updatePersonalInfo: (info) =>
        set((state) => ({
          resume: {
            ...state.resume,
            personalInfo: { ...state.resume.personalInfo, ...info },
          },
          isSamplePreview: false,
        })),

      addExperience: () =>
        set((state) => ({
          resume: {
            ...state.resume,
            experience: [
              ...state.resume.experience,
              {
                id: uuid(),
                company: "",
                role: "",
                location: "",
                startDate: "",
                endDate: "",
                current: false,
                bullets: [""],
              },
            ],
          },
          isSamplePreview: false,
        })),

      updateExperience: (id, entry) =>
        set((state) => ({
          resume: {
            ...state.resume,
            experience: state.resume.experience.map((e) =>
              e.id === id ? { ...e, ...entry } : e
            ),
          },
          isSamplePreview: false,
        })),

      removeExperience: (id) =>
        set((state) => ({
          resume: {
            ...state.resume,
            experience: state.resume.experience.filter((e) => e.id !== id),
          },
          isSamplePreview: false,
        })),

      addEducation: () =>
        set((state) => ({
          resume: {
            ...state.resume,
            education: [
              ...state.resume.education,
              {
                id: uuid(),
                school: "",
                degree: "",
                field: "",
                location: "",
                startDate: "",
                endDate: "",
                details: "",
              },
            ],
          },
          isSamplePreview: false,
        })),

      updateEducation: (id, entry) =>
        set((state) => ({
          resume: {
            ...state.resume,
            education: state.resume.education.map((e) =>
              e.id === id ? { ...e, ...entry } : e
            ),
          },
          isSamplePreview: false,
        })),

      removeEducation: (id) =>
        set((state) => ({
          resume: {
            ...state.resume,
            education: state.resume.education.filter((e) => e.id !== id),
          },
          isSamplePreview: false,
        })),

      addProject: () =>
        set((state) => ({
          resume: {
            ...state.resume,
            projects: [
              ...state.resume.projects,
              { id: uuid(), name: "", link: "", bullets: [""] },
            ],
          },
          isSamplePreview: false,
        })),

      updateProject: (id, entry) =>
        set((state) => ({
          resume: {
            ...state.resume,
            projects: state.resume.projects.map((p) =>
              p.id === id ? { ...p, ...entry } : p
            ),
          },
          isSamplePreview: false,
        })),

      removeProject: (id) =>
        set((state) => ({
          resume: {
            ...state.resume,
            projects: state.resume.projects.filter((p) => p.id !== id),
          },
          isSamplePreview: false,
        })),

      addSkillGroup: () =>
        set((state) => ({
          resume: {
            ...state.resume,
            skills: [
              ...state.resume.skills,
              { id: uuid(), name: "", skills: [] },
            ],
          },
          isSamplePreview: false,
        })),

      updateSkillGroupName: (id, name) =>
        set((state) => ({
          resume: {
            ...state.resume,
            skills: state.resume.skills.map((g) =>
              g.id === id ? { ...g, name } : g
            ),
          },
          isSamplePreview: false,
        })),

      removeSkillGroup: (id) =>
        set((state) => ({
          resume: {
            ...state.resume,
            skills: state.resume.skills.filter((g) => g.id !== id),
          },
          isSamplePreview: false,
        })),

      addSkillToGroup: (groupId, skill) =>
        set((state) => ({
          resume: {
            ...state.resume,
            skills: state.resume.skills.map((g) =>
              g.id === groupId && !g.skills.includes(skill)
                ? { ...g, skills: [...g.skills, skill] }
                : g
            ),
          },
          isSamplePreview: false,
        })),

      removeSkillFromGroup: (groupId, skill) =>
        set((state) => ({
          resume: {
            ...state.resume,
            skills: state.resume.skills.map((g) =>
              g.id === groupId
                ? { ...g, skills: g.skills.filter((s) => s !== skill) }
                : g
            ),
          },
          isSamplePreview: false,
        })),

      addCertificate: () =>
        set((state) => ({
          resume: {
            ...state.resume,
            certificates: [
              ...state.resume.certificates,
              { id: uuid(), name: "", issuer: "", date: "", link: "" },
            ],
          },
          isSamplePreview: false,
        })),

      updateCertificate: (id, entry) =>
        set((state) => ({
          resume: {
            ...state.resume,
            certificates: state.resume.certificates.map((c) =>
              c.id === id ? { ...c, ...entry } : c
            ),
          },
          isSamplePreview: false,
        })),

      removeCertificate: (id) =>
        set((state) => ({
          resume: {
            ...state.resume,
            certificates: state.resume.certificates.filter((c) => c.id !== id),
          },
          isSamplePreview: false,
        })),

      setAchievements: (achievements) =>
        set((state) => ({
          resume: { ...state.resume, achievements },
          isSamplePreview: false,
        })),

      reorderSections: (from, to) =>
        set((state) => {
          const next = [...state.sectionOrder];
          const [moved] = next.splice(from, 1);
          next.splice(to, 0, moved);
          return { sectionOrder: next };
        }),

      loadSample: () => set({ resume: sampleResume, isSamplePreview: true }),
      clearAll: () =>
        set({
          resume: emptyResume,
          isSamplePreview: false,
          sectionOrder: defaultSectionOrder,
        }),

      importResume: (parsed) =>
        set((state) => ({
          resume: {
            personalInfo: mergePersonalInfo(
              state.resume.personalInfo,
              parsed.personalInfo
            ),
            experience: parsed.experience.length
              ? parsed.experience
              : state.resume.experience,
            education: parsed.education.length
              ? parsed.education
              : state.resume.education,
            skills: parsed.skills.length ? parsed.skills : state.resume.skills,
            projects: parsed.projects.length
              ? parsed.projects
              : state.resume.projects,
            certificates: parsed.certificates.length
              ? parsed.certificates
              : state.resume.certificates,
            achievements: parsed.achievements.length
              ? parsed.achievements
              : state.resume.achievements,
          },
          isSamplePreview: false,
        })),
    }),
    {
      name: "ats-resume-builder-data",
      version: 2,
      migrate: (persistedState) => {
        const state = persistedState as {
          resume?: {
            skills?: unknown;
            achievements?: unknown;
            certificates?: unknown;
          };
          sectionOrder?: SectionId[];
        };
        const resume = state.resume;
        if (resume) {
          if (
            Array.isArray(resume.skills) &&
            (resume.skills.length === 0 || typeof resume.skills[0] === "string")
          ) {
            const flatSkills = resume.skills as string[];
            resume.skills = flatSkills.length
              ? [{ id: uuid(), name: "", skills: flatSkills } satisfies SkillGroup]
              : [{ id: uuid(), name: "", skills: [] } satisfies SkillGroup];
          }
          if (!Array.isArray(resume.achievements)) {
            resume.achievements = [];
          }
          if (!Array.isArray(resume.certificates)) {
            resume.certificates = [];
          }
        }
        if (
          state.sectionOrder &&
          !state.sectionOrder.includes("achievements")
        ) {
          state.sectionOrder = [...state.sectionOrder, "achievements"];
        }
        if (
          state.sectionOrder &&
          !state.sectionOrder.includes("certificates")
        ) {
          const achievementsIndex = state.sectionOrder.indexOf("achievements");
          const insertAt =
            achievementsIndex === -1
              ? state.sectionOrder.length
              : achievementsIndex;
          state.sectionOrder = [
            ...state.sectionOrder.slice(0, insertAt),
            "certificates",
            ...state.sectionOrder.slice(insertAt),
          ];
        }
        return state as ResumeStore;
      },
    }
  )
);
