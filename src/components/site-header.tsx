"use client";

import Link from "next/link";
import { GraduationCap, Database, Table, Search } from "lucide-react";
import { usePathname, useSearchParams } from "next/navigation";
import { ThemeToggle } from "./theme-toggle";

export function SiteHeader() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const isResultsPage = pathname === "/results";
  const category = searchParams.get("category");
  const score = searchParams.get("score");

  const themeGradient = "bg-gradient-to-r from-blue-600 via-violet-600 to-blue-600";
  const textGradient = "bg-gradient-to-r from-blue-600 via-violet-600 to-blue-600 dark:from-blue-400 dark:via-violet-400 dark:to-blue-400 bg-clip-text text-transparent";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-950/90 backdrop-blur-lg shadow-sm transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          
          {/* Left: Logo Section */}
          <div className="flex shrink-0 items-center">
            <Link href="/" className="flex items-center gap-3 group">
              <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${themeGradient} shadow-md transition-transform duration-300 group-hover:scale-105`}>
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <span className={`hidden sm:inline text-xl font-bold tracking-tight ${textGradient} transition-colors`}>
                GAT-B Guide
              </span>
            </Link>
          </div>

          {/* Middle: Search Context (Only on Results Page) */}
          {isResultsPage && category && score && (
            <div className="flex-1 flex justify-center min-w-0">
              <div className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800/50 px-4 py-1.5 rounded-full border border-slate-200 dark:border-slate-700 shadow-sm truncate">
                <Search className="h-4 w-4 shrink-0 text-blue-600 dark:text-blue-400" />
                <span className="truncate">
                  <span className="hidden sm:inline">GAT-B Guide • </span>
                  {category} • Score: {score}
                </span>
              </div>
            </div>
          )}

          {/* Right: Navigation & Theme Toggle Section */}
          <div className="flex shrink-0 items-center gap-4 sm:gap-6">
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
