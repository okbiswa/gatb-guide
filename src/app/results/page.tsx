"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { ArrowLeft, Search, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ResultsSection } from "@/components/results-section";
import { LoadingSkeleton } from "@/components/loading-skeleton";
import { LinkedInSection } from "@/components/linkedin-section";
import { Footer } from "@/components/footer";
import { ThemeToggle } from "@/components/theme-toggle";
import { getRecommendations } from "@/actions/get-recommendations";
import { LINKEDIN_URL } from "@/lib/constants";
import type { GroupedResults } from "@/lib/types";

function ResultsContent() {
  const searchParams = useSearchParams();
  const [results, setResults] = useState<GroupedResults | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const score = parseFloat(searchParams.get("score") || "0");
  const category = searchParams.get("category") || "UR";
  const exam = searchParams.get("exam") || "GAT-B";
  const courseType = searchParams.get("courseType") || "All";

  useEffect(() => {
    async function fetchResults() {
      try {
        setLoading(true);
        setError("");
        const data = await getRecommendations({
          exam,
          category,
          score,
          courseType,
        });
        setResults(data);
      } catch {
        setError("Something went wrong while fetching recommendations. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    if (score > 0) {
      fetchResults();
    } else {
      setLoading(false);
      setError("Invalid score. Please go back and enter a valid score.");
    }
  }, [score, category, exam, courseType]);

  return (
    <main className="min-h-screen bg-science-pattern">
      {/* Fixed top bar — stays in place when scrolling */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-slate-950/90 backdrop-blur-lg border-b border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="mx-auto max-w-5xl px-4 py-3 flex items-center justify-between gap-2">
          {/* Left: Search Again */}
          <Link href="/">
            <Button variant="ghost" size="sm" className="gap-2 shrink-0">
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Search Again</span>
            </Button>
          </Link>

          {/* Center: Context info */}
          <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300 min-w-0">
            <Search className="h-4 w-4 shrink-0" />
            <span className="hidden sm:inline truncate">
              GAT-B Guide • {category} • Score: {score}
            </span>
            <span className="sm:hidden truncate">
              Score: {score}
            </span>
          </div>

          {/* Right: Need Help CTA + Theme Toggle */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Need Help CTA */}
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-2 bg-[#0A66C2] hover:bg-[#004182] text-white text-xs font-medium rounded-lg px-3 py-2 shadow-sm transition-all duration-200"
            >
              <Linkedin className="h-3.5 w-3.5" />
              <div className="flex flex-col leading-tight">
                <span className="font-semibold">Need Help?</span>
                <span className="text-[10px] opacity-80">Connect Me</span>
              </div>
            </a>
            {/* Mobile: compact icon-only LinkedIn */}
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="sm:hidden flex items-center justify-center w-9 h-9 rounded-lg bg-[#0A66C2] text-white shadow-sm"
              title="Need Help? Connect Me"
            >
              <Linkedin className="h-4 w-4" />
            </a>
            {/* Theme Toggle */}
            <ThemeToggle />
          </div>
        </div>
      </div>

      {/* Spacer to push content below fixed header */}
      <div className="h-14" />

      {/* Content */}
      <div className="mx-auto max-w-5xl px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-2">
            Your Recommendations
          </h1>
          <p className="text-slate-500 dark:text-slate-400">
            Personalized institute matches for your GAT-B score of{" "}
            <strong className="text-slate-700 dark:text-slate-300">{score}</strong> in the{" "}
            <strong className="text-slate-700 dark:text-slate-300">{category}</strong> category.
          </p>
        </div>

        {/* Loading */}
        {loading && <LoadingSkeleton />}

        {/* Error */}
        {error && (
          <div className="text-center py-16">
            <div className="rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-100 dark:border-red-900 p-8 max-w-md mx-auto">
              <p className="text-red-600 dark:text-red-400 font-medium mb-4">{error}</p>
              <Link href="/">
                <Button variant="outline">Go Back</Button>
              </Link>
            </div>
          </div>
        )}

        {/* Results */}
        {!loading && !error && results && (
          <ResultsSection
            results={results}
            score={score}
            category={category}
          />
        )}
      </div>

      <LinkedInSection />
      <Footer />
    </main>
  );
}

export default function ResultsPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-science-pattern">
        <div className="h-14" />
        <div className="mx-auto max-w-5xl px-4 py-16">
          <LoadingSkeleton />
        </div>
      </main>
    }>
      <ResultsContent />
    </Suspense>
  );
}
