import { SectionId } from "@/lib/sections";

export type HeadingKey = SectionId | "summary";

export const HEADING_KEYS: HeadingKey[] = [
  "summary",
  "experience",
  "education",
  "skills",
  "projects",
  "certificates",
  "achievements",
];

// Standard, ATS-recognized resume section headings.
export const defaultHeadings: Record<HeadingKey, string> = {
  summary: "Summary",
  experience: "Experience",
  education: "Education",
  skills: "Skills",
  projects: "Projects",
  certificates: "Certificates",
  achievements: "Achievements",
};

export function resolveHeading(
  overrides: Partial<Record<HeadingKey, string>>,
  key: HeadingKey
): string {
  const override = overrides[key];
  return override && override.trim() ? override : defaultHeadings[key];
}

export function resolveHeadings(
  overrides: Partial<Record<HeadingKey, string>> = {}
): Record<HeadingKey, string> {
  const result = {} as Record<HeadingKey, string>;
  HEADING_KEYS.forEach((key) => {
    result[key] = resolveHeading(overrides, key);
  });
  return result;
}

export function hasCustomHeadings(
  overrides: Partial<Record<HeadingKey, string>> = {}
): boolean {
  return HEADING_KEYS.some((key) => {
    const override = overrides[key];
    return !!override && override.trim() && override !== defaultHeadings[key];
  });
}
