export type TemplateId = "modern" | "classic" | "minimal" | "compact";

export interface TemplateOption {
  id: TemplateId;
  name: string;
  description: string;
}

export const templateOptions: TemplateOption[] = [
  {
    id: "modern",
    name: "Modern",
    description: "Sans-serif, centered header, bold uppercase section headings.",
  },
  {
    id: "classic",
    name: "Classic",
    description: "Serif type, centered header, underlined section headings.",
  },
  {
    id: "minimal",
    name: "Minimal",
    description: "Sans-serif, left-aligned header, no dividers, extra whitespace.",
  },
  {
    id: "compact",
    name: "Compact",
    description: "Sans-serif, tighter spacing to fit more on a single page.",
  },
];

export const defaultTemplateId: TemplateId = "modern";
