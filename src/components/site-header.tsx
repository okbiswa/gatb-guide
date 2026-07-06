import Link from "next/link";
import { GraduationCap, Database, Table } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-950/90 backdrop-blur-lg shadow-sm transition-colors duration-300">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          
          {/* Logo Section */}
          <div className="flex shrink-0 items-center">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 shadow-md transition-transform duration-300 group-hover:scale-105">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white transition-colors">
                GAT-B Guide
              </span>
            </Link>
          </div>

          {/* Navigation & Theme Toggle Section */}
          <div className="flex items-center gap-4 sm:gap-6">
            <nav className="hidden md:flex items-center gap-6">
              <Link
                href="/institutes"
                className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400 transition-colors"
              >
                <Database className="h-4 w-4" />
                Institutes
              </Link>
              <Link
                href="/cutoffs"
                className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-blue-600 dark:text-slate-300 dark:hover:text-blue-400 transition-colors"
              >
                <Table className="h-4 w-4" />
                Cutoffs
              </Link>
            </nav>
            <ThemeToggle />
          </div>
          
        </div>
      </div>
    </header>
  );
}
