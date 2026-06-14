import { GraduationCap, Sparkles, PartyPopper, BadgeCheck } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { VisitorCounter } from "@/components/visitor-counter";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden py-16 sm:py-24">
      {/* Theme toggle — top right */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-10">
        <ThemeToggle />
      </div>

      <div className="mx-auto max-w-4xl text-center px-4">
        {/* Results Released Banner */}
        <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 px-4 py-1.5 text-sm font-medium text-emerald-700 dark:text-emerald-400 mb-4 animate-fade-in">
          <PartyPopper className="h-4 w-4" />
          <span>GAT-B 2026 Results Released!</span>
        </div>

        {/* Top badge */}
        <div className="flex justify-center mb-4 animate-fade-in">
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 dark:bg-blue-950/50 border border-blue-100 dark:border-blue-800 px-4 py-1.5 text-sm font-medium text-blue-700 dark:text-blue-400">
            <Sparkles className="h-4 w-4" />
            <span>GAT-B 2026 Admissions</span>
          </div>
        </div>

        {/* Updated for badge */}
        <div className="flex justify-center mb-8 animate-fade-in">
          <div className="inline-flex items-center gap-2 rounded-full bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 px-4 py-1.5 text-xs font-medium text-amber-700 dark:text-amber-400">
            <BadgeCheck className="h-3.5 w-3.5" />
            <span>Updated for GAT-B 2026 Results</span>
          </div>
        </div>

        {/* Main heading */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 dark:text-white mb-6 animate-fade-in-up">
          <span className="bg-gradient-to-r from-blue-600 via-violet-600 to-blue-600 dark:from-blue-400 dark:via-violet-400 dark:to-blue-400 bg-clip-text text-transparent">
            GAT-B Guide
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-4 leading-relaxed animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          Explore biotechnology opportunities across India based on your GAT-B performance.
        </p>

        {/* Feature pills */}
        <div className="flex flex-wrap items-center justify-center gap-3 mt-8 animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
          <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 bg-white/80 dark:bg-slate-800/80 rounded-full px-4 py-2 shadow-sm border border-slate-100 dark:border-slate-700">
            <GraduationCap className="h-4 w-4 text-blue-500 dark:text-blue-400" />
            <span>83+ Institutes</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 bg-white/80 dark:bg-slate-800/80 rounded-full px-4 py-2 shadow-sm border border-slate-100 dark:border-slate-700">
            <svg className="h-4 w-4 text-emerald-500 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
            </svg>
            <span>5 Years of Data</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 bg-white/80 dark:bg-slate-800/80 rounded-full px-4 py-2 shadow-sm border border-slate-100 dark:border-slate-700">
            <svg className="h-4 w-4 text-violet-500 dark:text-violet-400" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
            </svg>
            <span>Smart Matching</span>
          </div>
        </div>

        {/* Visitor Counter */}
        <div className="flex justify-center mt-8 animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
          <VisitorCounter />
        </div>
      </div>
    </section>
  );
}
