import { TemplateId } from "@/lib/templates";

export interface PreviewVariant {
  fontFamily: string;
  containerClass: string;
  headerWrapClass: string;
  nameClass: string;
  jobTitleClass: string;
  contactClass: string;
  sectionTitleClass: string;
  sectionGapClass: string;
  itemTitleClass: string;
  itemDateClass: string;
  itemSubtitleClass: string;
  bulletClass: string;
  paragraphClass: string;
}

export const previewVariants: Record<TemplateId, PreviewVariant> = {
  modern: {
    fontFamily: "Helvetica, Arial, sans-serif",
    containerClass: "px-10 py-10",
    headerWrapClass: "mb-4 border-b border-slate-300 pb-3 text-center",
    nameClass: "text-2xl font-bold tracking-wide",
    jobTitleClass: "mt-0.5 text-sm text-slate-600",
    contactClass: "mt-1.5 text-xs text-slate-600",
    sectionTitleClass:
      "mb-1.5 text-xs font-bold uppercase tracking-wider text-slate-800",
    sectionGapClass: "mb-4",
    itemTitleClass: "text-[13px] font-semibold text-slate-900",
    itemDateClass: "text-[11px] text-slate-500",
    itemSubtitleClass: "text-[11px] text-slate-500",
    bulletClass: "text-[12.5px] leading-relaxed text-slate-800",
    paragraphClass: "text-[13px] leading-relaxed text-slate-800",
  },
  classic: {
    fontFamily: "'Times New Roman', Times, serif",
    containerClass: "px-10 py-10",
    headerWrapClass: "mb-4 border-b-2 border-slate-800 pb-3 text-center",
    nameClass: "text-[26px] font-bold tracking-wide",
    jobTitleClass: "mt-0.5 text-sm italic text-slate-700",
    contactClass: "mt-1.5 text-xs text-slate-700",
    sectionTitleClass:
      "mb-1.5 border-b border-slate-400 pb-0.5 text-[13px] font-bold uppercase tracking-wide text-slate-900",
    sectionGapClass: "mb-4",
    itemTitleClass: "text-[13.5px] font-bold text-slate-900",
    itemDateClass: "text-[11.5px] italic text-slate-600",
    itemSubtitleClass: "text-[11.5px] italic text-slate-600",
    bulletClass: "text-[12.5px] leading-relaxed text-slate-800",
    paragraphClass: "text-[13px] leading-relaxed text-slate-800",
  },
  minimal: {
    fontFamily: "Helvetica, Arial, sans-serif",
    containerClass: "px-10 py-10",
    headerWrapClass: "mb-5 text-left",
    nameClass: "text-2xl font-light tracking-wide text-slate-900",
    jobTitleClass: "mt-0.5 text-sm text-slate-500",
    contactClass: "mt-1.5 text-xs text-slate-500",
    sectionTitleClass: "mb-2 text-[13px] font-semibold text-slate-900",
    sectionGapClass: "mb-5",
    itemTitleClass: "text-[13px] font-medium text-slate-900",
    itemDateClass: "text-[11px] text-slate-400",
    itemSubtitleClass: "text-[11px] text-slate-400",
    bulletClass: "text-[12.5px] leading-relaxed text-slate-700",
    paragraphClass: "text-[13px] leading-relaxed text-slate-700",
  },
  compact: {
    fontFamily: "Helvetica, Arial, sans-serif",
    containerClass: "px-8 py-6",
    headerWrapClass: "mb-2.5 border-b border-slate-300 pb-2 text-center",
    nameClass: "text-xl font-bold tracking-wide",
    jobTitleClass: "text-[12px] text-slate-600",
    contactClass: "mt-1 text-[10.5px] text-slate-600",
    sectionTitleClass:
      "mb-1 text-[10.5px] font-bold uppercase tracking-wider text-slate-800",
    sectionGapClass: "mb-2.5",
    itemTitleClass: "text-[12px] font-semibold text-slate-900",
    itemDateClass: "text-[10px] text-slate-500",
    itemSubtitleClass: "text-[10px] text-slate-500",
    bulletClass: "text-[11px] leading-snug text-slate-800",
    paragraphClass: "text-[12px] leading-snug text-slate-800",
  },
};
