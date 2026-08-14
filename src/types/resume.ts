export interface PersonalInfo {
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  website: string;
  summary: string;
}

export interface ExperienceEntry {
  id: string;
  company: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  bullets: string[];
}

export interface EducationEntry {
  id: string;
  school: string;
  degree: string;
  field: string;
  location: string;
  startDate: string;
  endDate: string;
  details: string;
}

export interface ProjectEntry {
  id: string;
  name: string;
  link: string;
  bullets: string[];
}

export interface SkillGroup {
  id: string;
  name: string;
  skills: string[];
}

export interface CertificateEntry {
  id: string;
  name: string;
  issuer: string;
  date: string;
  link: string;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  experience: ExperienceEntry[];
  education: EducationEntry[];
  skills: SkillGroup[];
  projects: ProjectEntry[];
  certificates: CertificateEntry[];
  achievements: string[];
}
