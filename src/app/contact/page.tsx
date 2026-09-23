import type { Metadata } from "next";
import { Mail } from "lucide-react";
import { StaticPageShell } from "@/components/StaticPageShell";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with questions, feedback, or bug reports.",
  alternates: {
    canonical: "/contact",
  },
};

const CONTACT_EMAIL = "tanishqjoshi93@gmail.com";

export default function ContactPage() {
  return (
    <StaticPageShell title="Contact Us">
      <p>
        Have a question, found a bug, or have feedback on the resume
        builder? Reach out by email and we&apos;ll get back to you.
      </p>

      <a
        href={`mailto:${CONTACT_EMAIL}`}
        className="mt-2 flex w-fit items-center gap-2 rounded-md border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-900 hover:bg-slate-50"
      >
        <Mail size={16} />
        {CONTACT_EMAIL}
      </a>

      <p className="text-sm text-slate-500">
        This tool doesn&apos;t have a backend, so there&apos;s no contact
        form or support ticket system here — email is the most reliable way
        to reach us. If your question is about a specific issue with the
        tool, it helps to mention your browser and what you were doing when
        it happened.
      </p>
    </StaticPageShell>
  );
}
