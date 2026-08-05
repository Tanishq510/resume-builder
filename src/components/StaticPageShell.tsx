import Link from "next/link";
import { FileText } from "lucide-react";

export function StaticPageShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-4 py-3 sm:px-6">
          <Link
            href="/"
            className="flex items-center gap-2 text-slate-900 hover:text-slate-700"
          >
            <FileText size={20} />
            <span className="text-sm font-semibold">Free Resume Builder</span>
          </Link>
          <Link
            href="/"
            className="rounded-md border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Back to builder
          </Link>
        </div>
      </header>

      <main className="flex-1 bg-white">
        <div className="mx-auto max-w-[750px] px-4 py-12 sm:px-6">
          <h1 className="text-3xl font-bold text-slate-900">{title}</h1>
          {subtitle && (
            <p className="mt-2 text-sm text-slate-500">{subtitle}</p>
          )}
          <div className="prose-content mt-8 space-y-6 text-slate-700 leading-relaxed">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
