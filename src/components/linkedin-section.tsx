import { Linkedin } from "lucide-react";
import { LINKEDIN_URL } from "@/lib/constants";

export function LinkedInSection() {
  return (
    <section className="py-16 px-4">
      <div className="mx-auto max-w-2xl">
        <div className="relative bg-gradient-to-br from-blue-50 via-white to-violet-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 rounded-2xl border border-blue-100 dark:border-slate-700 p-8 sm:p-10 text-center shadow-sm overflow-hidden">
          {/* Decorative gradient */}
          <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-blue-600 via-violet-500 to-blue-600 rounded-b-2xl" />

          <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-blue-100 dark:bg-blue-950/50 mx-auto mb-5">
            <Linkedin className="h-7 w-7 text-blue-600 dark:text-blue-400" />
          </div>

          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
            Need Mentorship?
          </h2>

          <p className="text-slate-600 dark:text-slate-400 leading-relaxed max-w-lg mx-auto mb-6">
            Need guidance regarding GAT-B, biotechnology admissions, bioinformatics,
            higher studies, internships, research, or career planning? Connect with me on LinkedIn.
          </p>

          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 bg-[#0A66C2] hover:bg-[#004182] text-white font-semibold rounded-xl px-8 py-3.5 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-200 active:scale-[0.98]"
          >
            <Linkedin className="h-5 w-5" />
            Connect on LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
}
