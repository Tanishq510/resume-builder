import Link from "next/link";
import { FileText } from "lucide-react";
import { FooterJoke } from "@/components/FooterJoke";

const links = [
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact Us" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms & Conditions" },
];

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-[1400px] px-4 py-8 text-sm sm:px-6">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <div className="flex items-center gap-2 text-slate-500">
            <FileText size={16} />
            <span>
              &copy; {new Date().getFullYear()} Free Resume Builder. All
              rights reserved.
            </span>
          </div>
          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-slate-500 hover:text-slate-900"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <FooterJoke />
      </div>
    </footer>
  );
}
