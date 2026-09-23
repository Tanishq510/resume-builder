import type { Metadata } from "next";
import { StaticPageShell } from "@/components/StaticPageShell";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "The terms that apply to using this free resume builder.",
  alternates: {
    canonical: "/terms",
  },
};

const lastUpdated = "August 5, 2026";

export default function TermsPage() {
  return (
    <StaticPageShell
      title="Terms & Conditions"
      subtitle={`Last updated: ${lastUpdated}`}
    >
      <p>
        These terms apply when you use this resume builder. By using the
        site, you&apos;re agreeing to them. If you don&apos;t agree, please
        don&apos;t use the tool.
      </p>

      <section>
        <h2 className="text-lg font-semibold text-slate-900">
          The service
        </h2>
        <p className="mt-3">
          This site provides a free tool for creating, formatting, and
          downloading a resume as a PDF, including the ability to upload an
          existing resume so its contents can be parsed and prefilled into
          the editor. It&apos;s provided free of charge, without any
          account or payment requirement.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-slate-900">
          Your data and content
        </h2>
        <p className="mt-3">
          Anything you type into the resume builder — or upload for
          parsing — remains yours. As explained in the{" "}
          <span className="whitespace-nowrap">Privacy Policy</span>, it is
          stored only in your own browser and is never uploaded to a
          server we control. Because of that, you&apos;re responsible for
          keeping your own backup (for example, by downloading a PDF) —
          clearing your browser data, switching browsers, or switching
          devices will remove anything saved locally, and we have no copy
          to recover it from.
        </p>
        <p className="mt-3">
          You&apos;re responsible for the accuracy of the information on
          any resume you create with this tool, including anything
          extracted automatically from an uploaded file. Automatic parsing
          of uploaded resumes is best-effort and may not be perfectly
          accurate — always review the results before downloading or
          submitting your resume anywhere.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-slate-900">
          Acceptable use
        </h2>
        <p className="mt-3">
          Please use this tool for its intended purpose — building your own
          resume. Don&apos;t use it to create fraudulent documents, to
          misrepresent someone else&apos;s identity or qualifications, or
          to attempt to disrupt, reverse engineer, or abuse the service.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-slate-900">
          No warranty
        </h2>
        <p className="mt-3">
          This tool is provided &ldquo;as is,&rdquo; without warranties of
          any kind, express or implied. We don&apos;t guarantee that any
          particular resume format or content will pass a specific
          applicant tracking system or result in a job offer — we build
          toward broadly ATS-safe formatting, but ATS software varies
          across employers and vendors, and outcomes depend on many
          factors outside this tool&apos;s control.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-slate-900">
          Limitation of liability
        </h2>
        <p className="mt-3">
          To the fullest extent permitted by law, this site and its
          creator are not liable for any indirect, incidental, or
          consequential damages arising from your use of the tool,
          including loss of data stored in your browser.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-slate-900">
          Changes to these terms
        </h2>
        <p className="mt-3">
          These terms may be updated from time to time. Continued use of
          the tool after a change means you accept the updated terms. The
          &ldquo;last updated&rdquo; date above reflects the most recent
          revision.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-slate-900">Questions?</h2>
        <p className="mt-3">
          If you have questions about these terms, visit the Contact Us
          page.
        </p>
      </section>
    </StaticPageShell>
  );
}
