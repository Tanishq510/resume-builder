import { Fragment } from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { ResumeData } from "@/types/resume";
import { TemplateId, defaultTemplateId } from "@/lib/templates";
import { SectionId, defaultSectionOrder } from "@/lib/sections";
import { PdfVariant, pdfVariants } from "@/components/pdf/pdfVariants";

function createStyles(v: PdfVariant) {
  return StyleSheet.create({
    page: {
      paddingTop: v.page.paddingVertical,
      paddingBottom: v.page.paddingVertical,
      paddingHorizontal: v.page.paddingHorizontal,
      fontFamily: v.page.fontFamily,
      fontSize: v.body.fontSize,
      color: "#1e293b",
    },
    header: {
      marginBottom: v.header.marginBottom,
      paddingBottom: v.header.paddingBottom,
      borderBottomWidth: v.header.borderBottom ? v.header.borderWidth : 0,
      borderBottomColor: "#334155",
      alignItems: v.header.align,
    },
    name: {
      fontSize: v.name.fontSize,
      fontFamily: v.name.fontFamily,
      letterSpacing: v.name.letterSpacing,
      textAlign: v.header.textAlign,
    },
    jobTitle: {
      fontSize: v.jobTitle.fontSize,
      fontFamily: v.jobTitle.fontFamily,
      marginTop: v.jobTitle.marginTop,
      color: "#475569",
      textAlign: v.header.textAlign,
    },
    contact: {
      fontSize: v.contact.fontSize,
      marginTop: v.contact.marginTop,
      color: "#475569",
      textAlign: v.header.textAlign,
    },
    section: {
      marginBottom: v.sectionGap,
    },
    sectionTitle: {
      fontSize: v.sectionTitle.fontSize,
      fontFamily: v.sectionTitle.fontFamily,
      textTransform: v.sectionTitle.uppercase ? "uppercase" : "none",
      letterSpacing: v.sectionTitle.letterSpacing,
      marginBottom: v.sectionTitle.marginBottom,
      paddingBottom: v.sectionTitle.borderBottom ? 2 : 0,
      borderBottomWidth: v.sectionTitle.borderBottom ? 1 : 0,
      borderBottomColor: "#94a3b8",
      color: "#1e293b",
    },
    itemRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-end",
    },
    itemTitle: {
      fontSize: v.itemTitle.fontSize,
      fontFamily: v.itemTitle.fontFamily,
    },
    itemDate: {
      fontSize: v.itemDate.fontSize,
      fontFamily: v.itemDate.fontFamily,
      color: "#64748b",
    },
    itemSubtitle: {
      fontSize: v.itemSubtitle.fontSize,
      fontFamily: v.itemSubtitle.fontFamily,
      color: "#64748b",
      marginTop: 1,
    },
    bulletRow: {
      flexDirection: "row",
      marginTop: 3,
      paddingRight: 4,
    },
    bulletDot: {
      width: 10,
      fontSize: v.body.fontSize,
      fontFamily: v.body.fontFamily,
    },
    bulletText: {
      flex: 1,
      fontSize: v.body.fontSize,
      fontFamily: v.body.fontFamily,
      lineHeight: v.body.lineHeight,
    },
    paragraph: {
      fontSize: v.body.fontSize,
      fontFamily: v.body.fontFamily,
      lineHeight: v.body.lineHeight,
    },
    entry: {
      marginBottom: v.entryGap,
    },
    skillGroupName: {
      fontFamily: v.itemTitle.fontFamily,
    },
  });
}

function dateRange(start: string, end: string, current: boolean) {
  const endLabel = current ? "Present" : end;
  if (!start && !endLabel) return "";
  return [start, endLabel].filter(Boolean).join(" - ");
}

export function ResumeDocument({
  resume,
  templateId = defaultTemplateId,
  sectionOrder = defaultSectionOrder,
}: {
  resume: ResumeData;
  templateId?: TemplateId;
  sectionOrder?: SectionId[];
}) {
  const {
    personalInfo,
    experience,
    education,
    skills,
    projects,
    certificates,
    achievements,
  } = resume;
  const variant = pdfVariants[templateId];
  const styles = createStyles(variant);
  const contactParts = [
    personalInfo.email,
    personalInfo.phone,
    personalInfo.location,
    personalInfo.linkedin,
    personalInfo.website,
  ].filter(Boolean);

  const sectionRenderers: Record<SectionId, () => React.ReactNode> = {
    experience: () =>
      experience.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Experience</Text>
          {experience.map((exp) => (
            <View key={exp.id} style={styles.entry} wrap={false}>
              <View style={styles.itemRow}>
                <Text style={styles.itemTitle}>
                  {exp.role || "Job Title"}
                  {exp.company ? `, ${exp.company}` : ""}
                </Text>
                <Text style={styles.itemDate}>
                  {dateRange(exp.startDate, exp.endDate, exp.current)}
                </Text>
              </View>
              {!!exp.location && (
                <Text style={styles.itemSubtitle}>{exp.location}</Text>
              )}
              {exp.bullets
                .filter(Boolean)
                .map((bullet, i) => (
                  <View key={i} style={styles.bulletRow}>
                    <Text style={styles.bulletDot}>•</Text>
                    <Text style={styles.bulletText}>{bullet}</Text>
                  </View>
                ))}
            </View>
          ))}
        </View>
      ),
    education: () =>
      education.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Education</Text>
          {education.map((edu) => (
            <View key={edu.id} style={styles.entry} wrap={false}>
              <View style={styles.itemRow}>
                <Text style={styles.itemTitle}>
                  {[edu.degree, edu.field].filter(Boolean).join(", ") ||
                    "Degree"}
                  {edu.school ? ` - ${edu.school}` : ""}
                </Text>
                <Text style={styles.itemDate}>
                  {dateRange(edu.startDate, edu.endDate, false)}
                </Text>
              </View>
              {(edu.location || edu.details) && (
                <Text style={styles.itemSubtitle}>
                  {[edu.location, edu.details].filter(Boolean).join(" - ")}
                </Text>
              )}
            </View>
          ))}
        </View>
      ),
    skills: () => {
      const groups = skills.filter((g) => g.skills.length > 0);
      return (
        groups.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Skills</Text>
            {groups.map((group) => (
              <Text key={group.id} style={styles.paragraph}>
                {group.name ? (
                  <Text style={styles.skillGroupName}>{group.name}: </Text>
                ) : null}
                {group.skills.join(", ")}
              </Text>
            ))}
          </View>
        )
      );
    },
    projects: () =>
      projects.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Projects</Text>
          {projects.map((project) => (
            <View key={project.id} style={styles.entry} wrap={false}>
              <Text style={styles.itemTitle}>
                {project.name || "Project Name"}
                {project.link ? `  (${project.link})` : ""}
              </Text>
              {project.bullets
                .filter(Boolean)
                .map((bullet, i) => (
                  <View key={i} style={styles.bulletRow}>
                    <Text style={styles.bulletDot}>•</Text>
                    <Text style={styles.bulletText}>{bullet}</Text>
                  </View>
                ))}
            </View>
          ))}
        </View>
      ),
    certificates: () =>
      certificates.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Certificates</Text>
          {certificates.map((cert) => (
            <View key={cert.id} style={styles.entry} wrap={false}>
              <View style={styles.itemRow}>
                <Text style={styles.itemTitle}>
                  {cert.name || "Certificate Name"}
                  {cert.issuer ? `, ${cert.issuer}` : ""}
                </Text>
                <Text style={styles.itemDate}>{cert.date}</Text>
              </View>
              {!!cert.link && (
                <Text style={styles.itemSubtitle}>{cert.link}</Text>
              )}
            </View>
          ))}
        </View>
      ),
    achievements: () =>
      achievements.filter(Boolean).length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Achievements</Text>
          {achievements
            .filter(Boolean)
            .map((achievement, i) => (
              <View key={i} style={styles.bulletRow}>
                <Text style={styles.bulletDot}>•</Text>
                <Text style={styles.bulletText}>{achievement}</Text>
              </View>
            ))}
        </View>
      ),
  };

  return (
    <Document
      title={`${personalInfo.fullName || "Resume"} - Resume`}
      author={personalInfo.fullName || undefined}
    >
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.name}>{personalInfo.fullName || "Your Name"}</Text>
          {!!personalInfo.jobTitle && (
            <Text style={styles.jobTitle}>{personalInfo.jobTitle}</Text>
          )}
          {contactParts.length > 0 && (
            <Text style={styles.contact}>{contactParts.join("   |   ")}</Text>
          )}
        </View>

        {!!personalInfo.summary && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Summary</Text>
            <Text style={styles.paragraph}>{personalInfo.summary}</Text>
          </View>
        )}

        {sectionOrder.map((sectionId) => (
          <Fragment key={sectionId}>{sectionRenderers[sectionId]()}</Fragment>
        ))}
      </Page>
    </Document>
  );
}
