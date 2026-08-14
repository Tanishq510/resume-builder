"use client";

import { useResumeStore } from "@/store/resumeStore";
import { SectionCard } from "@/components/ui/SectionCard";
import { Field, TextArea, TextInput } from "@/components/ui/inputs";

export function PersonalInfoForm() {
  const personalInfo = useResumeStore((s) => s.resume.personalInfo);
  const updatePersonalInfo = useResumeStore((s) => s.updatePersonalInfo);

  return (
    <SectionCard
      title="Personal details"
      description="Contact info at the top of an ATS resume should be plain text — no headers, images, or tables."
      tourId="personal-info"
    >
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Field label="Full name">
          <TextInput
            value={personalInfo.fullName}
            onChange={(e) => updatePersonalInfo({ fullName: e.target.value })}
            placeholder="Jordan Lee"
          />
        </Field>
        <Field label="Job title">
          <TextInput
            value={personalInfo.jobTitle}
            onChange={(e) => updatePersonalInfo({ jobTitle: e.target.value })}
            placeholder="Software Engineer"
          />
        </Field>
        <Field label="Email">
          <TextInput
            type="email"
            value={personalInfo.email}
            onChange={(e) => updatePersonalInfo({ email: e.target.value })}
            placeholder="jordan.lee@email.com"
          />
        </Field>
        <Field label="Phone">
          <TextInput
            value={personalInfo.phone}
            onChange={(e) => updatePersonalInfo({ phone: e.target.value })}
            placeholder="(555) 123-4567"
          />
        </Field>
        <Field label="Location">
          <TextInput
            value={personalInfo.location}
            onChange={(e) => updatePersonalInfo({ location: e.target.value })}
            placeholder="Austin, TX"
          />
        </Field>
        <Field label="LinkedIn">
          <TextInput
            value={personalInfo.linkedin}
            onChange={(e) => updatePersonalInfo({ linkedin: e.target.value })}
            placeholder="linkedin.com/in/jordanlee"
          />
        </Field>
        <Field label="Website / Portfolio">
          <TextInput
            value={personalInfo.website}
            onChange={(e) => updatePersonalInfo({ website: e.target.value })}
            placeholder="jordanlee.dev"
          />
        </Field>
      </div>
      <div className="mt-3">
        <Field label="Professional summary">
          <TextArea
            rows={3}
            value={personalInfo.summary}
            onChange={(e) => updatePersonalInfo({ summary: e.target.value })}
            placeholder="2-3 sentences summarizing your experience, key skills, and what you bring to the role."
          />
        </Field>
      </div>
    </SectionCard>
  );
}
