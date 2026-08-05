import type { Metadata } from "next";
import Link from "next/link";
import { FileQuestion, FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page you're looking for doesn't exist.",
};

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-6 py-16">
      <div className="flex items-center gap-2 text-slate-400">
        <FileText size={18} />
        <span className="text-xs font-semibold uppercase tracking-wide">
          Free Resume Builder
        </span>
      </div>

      <div className="mt-6 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
        <FileQuestion className="text-slate-400" size={30} />
      </div>

      <h1 className="mt-6 text-3xl font-bold text-slate-900">
        404 — Page not found
      </h1>
      <p className="mt-2 max-w-sm text-center text-slate-600">
        The page you&apos;re looking for doesn&apos;t exist or may have
        moved. Your resume data is safe either way — it&apos;s saved in your
        browser, not on this page.
      </p>

      <Link
        href="/"
        className="mt-8 flex items-center gap-1.5 rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
      >
        Back to the resume builder
      </Link>
    </div>
  );
}
