import Link from "next/link";
import { Linkedin } from "lucide-react";
import { LINKEDIN_URL } from "@/lib/constants";
import { VisitorCounter } from "@/components/visitor-counter";

export function Footer() {
  return (
    <footer className="border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 mt-20">
      <div className="mx-auto max-w-5xl px-4 py-10">
        {/* Nav Links */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mb-6">
          <Link href="/disclaimer" className="text-sm text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            Disclaimer
          </Link>
          <Link href="/privacy-policy" className="text-sm text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            Privacy Policy
          </Link>
          <Link href="/terms-and-conditions" className="text-sm text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            Terms & Conditions
          </Link>
          <Link href="/about" className="text-sm text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            About Me
          </Link>
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400 hover:text-[#0A66C2] dark:hover:text-blue-400 transition-colors"
          >
            <Linkedin className="h-3.5 w-3.5" />
            LinkedIn Profile
          </a>
        </div>

        {/* Disclaimer summary */}
        <p className="text-xs text-slate-400 dark:text-slate-500 leading-relaxed max-w-2xl mx-auto text-center">
          This tool provides indicative recommendations based on publicly available historical cutoff
          data. Actual admission cutoffs may vary each year. Always refer to
          official institute notifications and the DBT GAT-B official website for
          the most accurate and up-to-date information.
        </p>

        {/* Visitor Counter */}
        <div className="mt-6 flex justify-center">
          <VisitorCounter />
        </div>

        <div className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-400 dark:text-slate-500">
          <span>© {new Date().getFullYear()} GAT-B Guide</span>
          <span>•</span>
          <span>Data from 2021–2025</span>
        </div>
      </div>
    </footer>
  );
}
