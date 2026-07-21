import { TemplateId } from "@/lib/templates";

export interface PdfVariant {
  page: { paddingHorizontal: number; paddingVertical: number; fontFamily: string };
  header: {
    align: "center" | "flex-start";
    textAlign: "center" | "left";
    borderBottom: boolean;
    borderWidth: number;
    marginBottom: number;
    paddingBottom: number;
  };
  name: { fontSize: number; fontFamily: string; letterSpacing: number };
  jobTitle: { fontSize: number; fontFamily: string; marginTop: number };
  contact: { fontSize: number; marginTop: number };
  sectionTitle: {
    fontSize: number;
    fontFamily: string;
    uppercase: boolean;
    borderBottom: boolean;
    marginBottom: number;
    letterSpacing: number;
  };
  sectionGap: number;
  itemTitle: { fontSize: number; fontFamily: string };
  itemDate: { fontSize: number; fontFamily: string };
  itemSubtitle: { fontSize: number; fontFamily: string };
  body: { fontSize: number; lineHeight: number; fontFamily: string };
  entryGap: number;
}

export const pdfVariants: Record<TemplateId, PdfVariant> = {
  modern: {
    page: { paddingHorizontal: 48, paddingVertical: 40, fontFamily: "Helvetica" },
    header: {
      align: "center",
      textAlign: "center",
      borderBottom: true,
      borderWidth: 1,
      marginBottom: 12,
      paddingBottom: 10,
    },
    name: { fontSize: 18, fontFamily: "Helvetica-Bold", letterSpacing: 0.5 },
    jobTitle: { fontSize: 10.5, fontFamily: "Helvetica", marginTop: 2 },
    contact: { fontSize: 9, marginTop: 6 },
    sectionTitle: {
      fontSize: 9.5,
      fontFamily: "Helvetica-Bold",
      uppercase: true,
      borderBottom: false,
      marginBottom: 5,
      letterSpacing: 1,
    },
    sectionGap: 12,
    itemTitle: { fontSize: 10.5, fontFamily: "Helvetica-Bold" },
    itemDate: { fontSize: 9, fontFamily: "Helvetica" },
    itemSubtitle: { fontSize: 9, fontFamily: "Helvetica" },
    body: { fontSize: 9.8, lineHeight: 1.4, fontFamily: "Helvetica" },
    entryGap: 8,
  },
  classic: {
    page: { paddingHorizontal: 50, paddingVertical: 42, fontFamily: "Times-Roman" },
    header: {
      align: "center",
      textAlign: "center",
      borderBottom: true,
      borderWidth: 1.5,
      marginBottom: 14,
      paddingBottom: 10,
    },
    name: { fontSize: 20, fontFamily: "Times-Bold", letterSpacing: 0.3 },
    jobTitle: { fontSize: 10.5, fontFamily: "Times-Italic", marginTop: 2 },
    contact: { fontSize: 9, marginTop: 6 },
    sectionTitle: {
      fontSize: 10.5,
      fontFamily: "Times-Bold",
      uppercase: true,
      borderBottom: true,
      marginBottom: 6,
      letterSpacing: 0.5,
    },
    sectionGap: 13,
    itemTitle: { fontSize: 11, fontFamily: "Times-Bold" },
    itemDate: { fontSize: 9.5, fontFamily: "Times-Italic" },
    itemSubtitle: { fontSize: 9.5, fontFamily: "Times-Italic" },
    body: { fontSize: 10, lineHeight: 1.42, fontFamily: "Times-Roman" },
    entryGap: 9,
  },
  minimal: {
    page: { paddingHorizontal: 50, paddingVertical: 44, fontFamily: "Helvetica" },
    header: {
      align: "flex-start",
      textAlign: "left",
      borderBottom: false,
      borderWidth: 0,
      marginBottom: 16,
      paddingBottom: 0,
    },
    name: { fontSize: 19, fontFamily: "Helvetica", letterSpacing: 0.8 },
    jobTitle: { fontSize: 10, fontFamily: "Helvetica", marginTop: 2 },
    contact: { fontSize: 9, marginTop: 6 },
    sectionTitle: {
      fontSize: 10,
      fontFamily: "Helvetica-Bold",
      uppercase: false,
      borderBottom: false,
      marginBottom: 6,
      letterSpacing: 0,
    },
    sectionGap: 14,
    itemTitle: { fontSize: 10.5, fontFamily: "Helvetica-Bold" },
    itemDate: { fontSize: 9, fontFamily: "Helvetica" },
    itemSubtitle: { fontSize: 9, fontFamily: "Helvetica" },
    body: { fontSize: 9.8, lineHeight: 1.45, fontFamily: "Helvetica" },
    entryGap: 9,
  },
  compact: {
    page: { paddingHorizontal: 40, paddingVertical: 28, fontFamily: "Helvetica" },
    header: {
      align: "center",
      textAlign: "center",
      borderBottom: true,
      borderWidth: 1,
      marginBottom: 8,
      paddingBottom: 6,
    },
    name: { fontSize: 15, fontFamily: "Helvetica-Bold", letterSpacing: 0.3 },
    jobTitle: { fontSize: 9, fontFamily: "Helvetica", marginTop: 1 },
    contact: { fontSize: 8, marginTop: 3 },
    sectionTitle: {
      fontSize: 8.5,
      fontFamily: "Helvetica-Bold",
      uppercase: true,
      borderBottom: false,
      marginBottom: 3,
      letterSpacing: 0.8,
    },
    sectionGap: 7,
    itemTitle: { fontSize: 9.5, fontFamily: "Helvetica-Bold" },
    itemDate: { fontSize: 8, fontFamily: "Helvetica" },
    itemSubtitle: { fontSize: 8, fontFamily: "Helvetica" },
    body: { fontSize: 8.7, lineHeight: 1.3, fontFamily: "Helvetica" },
    entryGap: 5,
  },
};
