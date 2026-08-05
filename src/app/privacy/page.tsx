import type { Metadata } from "next";
import { StaticPageShell } from "@/components/StaticPageShell";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How this free resume builder handles your data — in short: it doesn't collect it. Your resume stays in your browser.",
};

const lastUpdated = "August 5, 2026";

export default function PrivacyPage() {
  return (
    <StaticPageShell
      title="Privacy Policy"
      subtitle={`Last updated: ${lastUpdated}`}
    >
      <p>
        This page explains what happens to the information you enter into
        this resume builder. The short version: there&apos;s no account
        system and no backend server, so there&apos;s nothing for us to
        collect in the first place.
      </p>

      <section>
        <h2 className="text-lg font-semibold text-slate-900">
          Your resume data
        </h2>
        <p className="mt-3">
          Everything you type — your name, work history, education, skills,
          and projects — is saved only in your own browser&apos;s local
          storage, on your own device. It is never transmitted to, or
          stored on, any server operated by this site. Uploading an
          existing resume to prefill the form, editing your details, and
          generating the final PDF all happen entirely client-side, in your
          browser.
        </p>
        <p className="mt-3">
          Because the data lives in your browser, it won&apos;t sync across
          devices or browsers, and clearing your browser&apos;s site data
          (or using a different browser or private/incognito window) will
          remove it. We&apos;d recommend downloading a PDF copy of anything
          you don&apos;t want to lose.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-slate-900">
          Do we sell or share your data?
        </h2>
        <p className="mt-3">
          No. We don&apos;t sell, rent, or share resume data with third
          parties, because we never receive it — it stays on your device.
          We don&apos;t run advertising trackers or third-party analytics
          scripts on this site.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-slate-900">
          Cookies and tracking
        </h2>
        <p className="mt-3">
          This site does not use cookies or tracking scripts to identify or
          follow visitors. Your resume data is stored using your
          browser&apos;s local storage, which is not shared with us or any
          third party.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-slate-900">
          Hosting and server logs
        </h2>
        <p className="mt-3">
          Like any website, the infrastructure that serves these pages
          (standard web hosting) may automatically log basic technical
          information — such as IP address, browser type, and request
          timestamps — for security and operational purposes. This is
          routine hosting-level logging, separate from the application
          itself, and does not include anything you type into the resume
          builder.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-slate-900">
          Fonts and third-party resources
        </h2>
        <p className="mt-3">
          Fonts used on this site are bundled and self-hosted at build
          time, rather than loaded from a third party at runtime, so
          viewing this page doesn&apos;t send a request to an external font
          provider.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-slate-900">
          Children&apos;s privacy
        </h2>
        <p className="mt-3">
          This tool is not directed at children, and since it doesn&apos;t
          collect personal data from anyone, it doesn&apos;t knowingly
          collect data from children either.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-slate-900">
          Changes to this policy
        </h2>
        <p className="mt-3">
          If this policy changes — for example, if a feature is added that
          changes how data is handled — this page will be updated and the
          &ldquo;last updated&rdquo; date above will reflect that.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-slate-900">Questions?</h2>
        <p className="mt-3">
          If you have questions about this policy, visit the Contact Us
          page.
        </p>
      </section>
    </StaticPageShell>
  );
}
