import { useResumeStore } from "@/store/resumeStore";
import { HeadingKey, defaultHeadings } from "@/lib/sectionHeadings";

export function useSectionHeading(key: HeadingKey): string {
  return useResumeStore((s) => s.headingOverrides[key] ?? defaultHeadings[key]);
}
