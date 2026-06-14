"use client";

import { useState } from "react";
import { InstituteCard, NoDataCard } from "@/components/institute-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Target,
  Rocket,
  ClipboardList,
  TrendingUp,
  AlertTriangle,
  ArrowUpDown,
} from "lucide-react";
import type { GroupedResults, RecommendationResult } from "@/lib/types";

interface ResultsSectionProps {
  results: GroupedResults;
  score: number;
  category: string;
}

type SortMode = "closest" | "highest";

export function ResultsSection({ results, score, category }: ResultsSectionProps) {
  const [sortMode, setSortMode] = useState<SortMode>("closest");

  const toggleSort = () => {
    setSortMode((prev) => (prev === "closest" ? "highest" : "closest"));
  };

  // Sort best opportunities based on mode
  const sortedBest = [...results.bestOpportunities].sort(
    (a: RecommendationResult, b: RecommendationResult) => {
      if (sortMode === "closest") {
        return Math.abs(a.difference) - Math.abs(b.difference);
      }
      return b.difference - a.difference;
    }
  );

  const totalMatched = results.bestOpportunities.length;

  return (
    <div className="space-y-10">
      {/* Summary stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-5 text-center shadow-sm">
          <p className="text-3xl font-bold text-slate-900 dark:text-white">{score}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Your Score</p>
        </div>
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-emerald-200 dark:border-emerald-800 p-5 text-center shadow-sm">
          <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">{totalMatched}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Best Opportunities</p>
        </div>
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-amber-200 dark:border-amber-800 p-5 text-center shadow-sm col-span-2 sm:col-span-1">
          <p className="text-3xl font-bold text-amber-600 dark:text-amber-400">{results.premier.length}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Ambitious Institutes</p>
        </div>
      </div>

      {/* Category notice */}
      <div className="flex items-center gap-2 bg-blue-50 dark:bg-blue-950/30 rounded-lg px-4 py-3 text-sm text-blue-700 dark:text-blue-400 border border-blue-100 dark:border-blue-900">
        <TrendingUp className="h-4 w-4 shrink-0" />
        <span>
          Showing results for <strong>{category}</strong> category with score{" "}
          <strong>{score}</strong>. Matches are based on weighted historical
          cutoffs (2021–2025).
        </span>
      </div>

      {/* Section 1: Best Opportunities */}
      {sortedBest.length > 0 && (
        <section>
          <div className="flex items-center gap-3 mb-5">
            <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-950/50">
              <Target className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                🎯 Best Opportunities
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Institutes where you have a strong chance of admission
              </p>
            </div>
            <Badge variant="high" className="ml-auto hidden sm:flex">
              {sortedBest.length} found
            </Badge>
          </div>

          {/* Sort Toggle */}
          <div className="flex items-center justify-end mb-4">
            <Button
              variant="outline"
              size="sm"
              onClick={toggleSort}
              className="gap-2 text-xs"
            >
              <ArrowUpDown className="h-3.5 w-3.5" />
              {sortMode === "closest" ? "Closest Match First" : "Highest Margin First"}
            </Button>
          </div>

          <div className="space-y-3">
            {sortedBest.map((result, i) => (
              <InstituteCard key={result.institute.institute_id} result={result} index={i} />
            ))}
          </div>
        </section>
      )}

      {/* Section 2: Ambitious Institutes (formerly Premier) */}
      {results.premier.length > 0 && (
        <section>
          <div className="flex items-center gap-3 mb-5">
            <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-amber-100 dark:bg-amber-950/50">
              <Rocket className="h-5 w-5 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                🚀 Ambitious Institutes
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Top-tier programmes — consider applying regardless
              </p>
            </div>
            <Badge variant="ambitious" className="ml-auto hidden sm:flex">
              {results.premier.length} found
            </Badge>
          </div>
          <div className="space-y-3">
            {results.premier.map((result, i) => (
              <InstituteCard key={result.institute.institute_id + "-premier"} result={result} index={i} />
            ))}
          </div>
        </section>
      )}

      {/* Section 3: Other Participating Institutes */}
      {results.noData.length > 0 && (
        <section>
          <div className="flex items-center gap-3 mb-5">
            <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800">
              <ClipboardList className="h-5 w-5 text-slate-500 dark:text-slate-400" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                📚 Other Participating Institutes
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                No historical cutoff data available — explore these options
              </p>
            </div>
            <Badge variant="outline" className="ml-auto hidden sm:flex">
              {results.noData.length} institutes
            </Badge>
          </div>
          <div className="space-y-3">
            {results.noData.map((institute, i) => (
              <NoDataCard key={institute.institute_id} institute={institute} index={i} />
            ))}
          </div>
        </section>
      )}

      {/* Empty state */}
      {totalMatched === 0 && results.premier.length === 0 && results.noData.length === 0 && (
        <div className="text-center py-16">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 mx-auto mb-4">
            <AlertTriangle className="h-8 w-8 text-slate-400" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
            No Results Found
          </h3>
          <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto">
            We couldn&apos;t find any matching institutes for your criteria.
            Try adjusting your score or category.
          </p>
        </div>
      )}
    </div>
  );
}
