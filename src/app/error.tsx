"use client";

import { useEffect } from "react";
import Link from "next/link";
import { RefreshCw, TriangleAlert } from "lucide-react";

export default function ErrorPage({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  const handleResetData = () => {
    if (
      window.confirm(
        "This clears the resume data saved in this browser and reloads the page. Use this only if the error keeps happening after clicking \"Try again.\""
      )
    ) {
      window.localStorage.removeItem("ats-resume-builder-data");
      window.location.href = "/";
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-6 py-16">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-50">
        <TriangleAlert className="text-red-500" size={30} />
      </div>

      <h1 className="mt-6 text-2xl font-bold text-slate-900">
        Something went wrong
      </h1>
      <p className="mt-2 max-w-sm text-center text-slate-600">
        An unexpected error occurred while rendering the page. Your resume
        data is still saved in this browser — it isn&apos;t lost.
      </p>
      {error.digest && (
        <p className="mt-1 text-xs text-slate-400">Error ID: {error.digest}</p>
      )}

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => unstable_retry()}
          className="flex items-center gap-1.5 rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
        >
          <RefreshCw size={15} /> Try again
        </button>
        <Link
          href="/"
          className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          Go to homepage
        </Link>
      </div>

      <button
        type="button"
        onClick={handleResetData}
        className="mt-6 text-xs text-slate-400 underline hover:text-slate-600"
      >
        Still broken? Clear saved resume data and start fresh
      </button>
    </div>
  );
}
