import type { Metadata } from "next";
import Link from "next/link";
import { StaticPageShell } from "@/components/StaticPageShell";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Why this free resume builder exists, how it approaches ATS-friendly formatting, and how it handles your data.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return (
    <StaticPageShell title="About Us">
      <p>
        This free resume builder exists to solve one specific problem: most
        job applications are screened by applicant tracking system (ATS)
        software before a human ever reads them, and a lot of good
        candidates get filtered out simply because their resume was
        formatted in a way the software couldn&apos;t parse correctly —
        multi-column layouts, tables, text boxes, and image-based headers
        are common culprits.
      </p>

      <section>
        <h2 className="text-lg font-semibold text-slate-900">
          What we&apos;re built around
        </h2>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>
            <span className="font-medium text-slate-900">
              ATS-safe formatting by default.
            </span>{" "}
            Every template is single-column with standard section headings,
            so what you see in the live preview is what the parsing
            software sees too.
          </li>
          <li>
            <span className="font-medium text-slate-900">
              Genuinely free, no account.
            </span>{" "}
            There&apos;s no signup wall, no paywalled download, and no
            watermark. You shouldn&apos;t have to hand over an email address
            to write a resume.
          </li>
          <li>
            <span className="font-medium text-slate-900">
              Privacy by design.
            </span>{" "}
            There&apos;s no backend server collecting your information. Your
            resume data is stored locally in your browser and generated
            into a PDF entirely on your own device.
          </li>
          <li>
            <span className="font-medium text-slate-900">
              You write the content.
            </span>{" "}
            This tool deliberately doesn&apos;t generate resume text with
            AI. It handles structure and formatting; the words — and the
            judgment about what to highlight — stay yours.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-slate-900">
          What you can do here
        </h2>
        <p className="mt-3">
          Build a resume from scratch, or upload an existing PDF, DOCX, TXT,
          or MD resume and let the tool prefill your contact details,
          experience, education, skills, and projects automatically. Reorder
          sections with drag and drop, switch between a handful of
          ATS-tested templates, and download a polished PDF whenever
          you&apos;re ready — as many times as you like.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-slate-900">Questions?</h2>
        <p className="mt-3">
          If something&apos;s not working the way you&apos;d expect, or you
          have feedback, visit the{" "}
          <Link href="/contact" className="text-slate-900 underline">
            Contact Us
          </Link>{" "}
          page.
        </p>
      </section>
    </StaticPageShell>
  );
}
