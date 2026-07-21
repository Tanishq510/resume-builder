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

  loadSample: () => void;
  clearAll: () => void;
}

export const useResumeStore = create<ResumeStore>()(
  persist(
    (set) => ({
      resume: emptyResume,
      templateId: defaultTemplateId,
      setTemplateId: (templateId) => set({ templateId }),

      updatePersonalInfo: (info) =>
        set((state) => ({
          resume: {
            ...state.resume,
            personalInfo: { ...state.resume.personalInfo, ...info },
          },
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
        })),

      updateExperience: (id, entry) =>
        set((state) => ({
          resume: {
            ...state.resume,
            experience: state.resume.experience.map((e) =>
              e.id === id ? { ...e, ...entry } : e
            ),
          },
        })),

      removeExperience: (id) =>
        set((state) => ({
          resume: {
            ...state.resume,
            experience: state.resume.experience.filter((e) => e.id !== id),
          },
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
        })),

      updateEducation: (id, entry) =>
        set((state) => ({
          resume: {
            ...state.resume,
            education: state.resume.education.map((e) =>
              e.id === id ? { ...e, ...entry } : e
            ),
          },
        })),

      removeEducation: (id) =>
        set((state) => ({
          resume: {
            ...state.resume,
            education: state.resume.education.filter((e) => e.id !== id),
          },
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
        })),

      updateProject: (id, entry) =>
        set((state) => ({
          resume: {
            ...state.resume,
            projects: state.resume.projects.map((p) =>
              p.id === id ? { ...p, ...entry } : p
            ),
          },
        })),

      removeProject: (id) =>
        set((state) => ({
          resume: {
            ...state.resume,
            projects: state.resume.projects.filter((p) => p.id !== id),
          },
        })),

      setSkills: (skills) =>
        set((state) => ({ resume: { ...state.resume, skills } })),

      loadSample: () => set({ resume: sampleResume }),
      clearAll: () => set({ resume: emptyResume }),
    }),
    { name: "ats-resume-builder-data" }
  )
);
