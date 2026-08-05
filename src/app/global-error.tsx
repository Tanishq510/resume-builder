"use client";

import { useEffect } from "react";
import Link from "next/link";
import "./globals.css";

export default function GlobalError({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-6 py-16 antialiased">
        <h1 className="text-2xl font-bold text-slate-900">
          Something went wrong
        </h1>
        <p className="mt-2 max-w-sm text-center text-slate-600">
          The app hit an unexpected error and couldn&apos;t load. Your
          resume data is saved in this browser&apos;s storage and hasn&apos;t
          been lost.
        </p>
        {error.digest && (
          <p className="mt-1 text-xs text-slate-400">
            Error ID: {error.digest}
          </p>
        )}

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => unstable_retry()}
            className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
          >
            Try again
          </button>
          <Link
            href="/"
            className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Go to homepage
          </Link>
        </div>
      </body>
    </html>
  );
}
