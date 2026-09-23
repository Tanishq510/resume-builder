"use client";

import { Plus, Trash2 } from "lucide-react";
import { useResumeStore } from "@/store/resumeStore";
import { SectionCard } from "@/components/ui/SectionCard";
import { Field, TextInput } from "@/components/ui/inputs";
import { EditableHeading } from "@/components/EditableHeading";
import { useHighlightNewest } from "@/hooks/useHighlightNewest";
import { useSectionHeading } from "@/hooks/useSectionHeading";

export function CertificatesForm({
  dragHandle,
}: {
  dragHandle?: React.ReactNode;
}) {
  const certificates = useResumeStore((s) => s.resume.certificates);
  const addCertificate = useResumeStore((s) => s.addCertificate);
  const updateCertificate = useResumeStore((s) => s.updateCertificate);
  const removeCertificate = useResumeStore((s) => s.removeCertificate);
  const { highlightId, registerRef } = useHighlightNewest(
    certificates.map((c) => c.id)
  );
  const headingValue = useSectionHeading("certificates");

  return (
    <SectionCard
      title="Certificates"
      titleContent={
        <EditableHeading
          section="certificates"
          value={headingValue}
          className="text-sm font-semibold text-slate-900"
        />
      }
      description="Optional. Professional certifications or licenses relevant to the role."
      dragHandle={dragHandle}
      action={
        <button
          type="button"
          onClick={addCertificate}
          className="flex items-center gap-1 rounded-md border border-slate-300 px-2.5 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
        >
          <Plus size={14} /> Add certificate
        </button>
      }
    >
      {certificates.length === 0 && (
        <p className="text-sm text-slate-400">No certificates added yet.</p>
      )}
      <div className="space-y-5">
        {certificates.map((cert) => (
          <div
            key={cert.id}
            ref={registerRef(cert.id)}
            className={`rounded-md border p-4 transition-colors duration-300 ${
              highlightId === cert.id
                ? "border-emerald-400 bg-emerald-50"
                : "border-slate-200"
            }`}
          >
            <div className="mb-3 flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Certificate
              </span>
              <button
                type="button"
                onClick={() => removeCertificate(cert.id)}
                className="flex items-center gap-1 text-xs font-medium text-red-500 hover:text-red-700"
              >
                <Trash2 size={14} /> Remove
              </button>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <Field label="Certificate name">
                <TextInput
                  value={cert.name}
                  onChange={(e) =>
                    updateCertificate(cert.id, { name: e.target.value })
                  }
                  placeholder="AWS Certified Solutions Architect – Associate"
                />
              </Field>
              <Field label="Issuing organization">
                <TextInput
                  value={cert.issuer}
                  onChange={(e) =>
                    updateCertificate(cert.id, { issuer: e.target.value })
                  }
                  placeholder="Amazon Web Services"
                />
              </Field>
              <Field label="Date">
                <TextInput
                  value={cert.date}
                  onChange={(e) =>
                    updateCertificate(cert.id, { date: e.target.value })
                  }
                  placeholder="2023"
                />
              </Field>
              <Field label="Credential link (optional)">
                <TextInput
                  value={cert.link}
                  onChange={(e) =>
                    updateCertificate(cert.id, { link: e.target.value })
                  }
                  placeholder="credly.com/badges/..."
                />
              </Field>
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
