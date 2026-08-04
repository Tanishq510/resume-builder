import { create } from "zustand";
import { persist } from "zustand/middleware";
import { v4 as uuid } from "uuid";
import {
  EducationEntry,
  ExperienceEntry,
  PersonalInfo,
  ProjectEntry,
  ResumeData,
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

  setSkills: (skills: string[]) => void;

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

      setSkills: (skills) =>
        set((state) => ({
          resume: { ...state.resume, skills },
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
          },
          isSamplePreview: false,
        })),
    }),
    { name: "ats-resume-builder-data" }
  )
);
