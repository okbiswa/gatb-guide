"use client";

import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ExternalLink,
  AlertCircle,
  Youtube,
  CheckCircle,
  SmilePlus,
} from "lucide-react";
import type { RecommendationResult, Institute } from "@/lib/types";
import { MatchType } from "@/lib/types";
import { RCB_INSTITUTE_IDS } from "@/lib/constants";

function getMatchBadge(matchType: MatchType) {
  switch (matchType) {
    case MatchType.HIGH_MATCH:
      return (
        <Badge variant="high" className="shrink-0 whitespace-nowrap">
          ✅ High Match
        </Badge>
      );
    case MatchType.GOOD_MATCH:
      return (
        <Badge variant="good" className="shrink-0 whitespace-nowrap">
          🎯 Good Match
        </Badge>
      );
    case MatchType.AMBITIOUS:
      return (
        <Badge variant="ambitious" className="shrink-0 whitespace-nowrap">
          🚀 Ambitious
        </Badge>
      );
  }
}

/** Shared institute details grid */
function InstituteDetails({ institute }: { institute: Institute }) {
  return (
    <div className="grid sm:grid-cols-2 gap-x-8 gap-y-3 text-sm">
      <div>
        <p className="text-slate-400 dark:text-slate-500 text-xs font-medium uppercase tracking-wider">Programme Offered</p>
        <p className="text-slate-700 dark:text-slate-300 mt-0.5">{institute.programme_offered}</p>
      </div>
      <div>
        <p className="text-slate-400 dark:text-slate-500 text-xs font-medium uppercase tracking-wider">Broad Field</p>
        <p className="text-slate-700 dark:text-slate-300 mt-0.5">{institute.broad_field}</p>
      </div>
      <div>
        <p className="text-slate-400 dark:text-slate-500 text-xs font-medium uppercase tracking-wider">Degree Type</p>
        <p className="text-slate-700 dark:text-slate-300 mt-0.5">{institute.degree_type}</p>
      </div>
      <div>
        <p className="text-slate-400 dark:text-slate-500 text-xs font-medium uppercase tracking-wider">Total Seats</p>
        <p className="text-slate-700 dark:text-slate-300 mt-0.5">{institute.total_seats}</p>
      </div>
      <div>
        <p className="text-slate-400 dark:text-slate-500 text-xs font-medium uppercase tracking-wider">City</p>
        <p className="text-slate-700 dark:text-slate-300 mt-0.5">{institute.city}</p>
      </div>
      <div>
        <p className="text-slate-400 dark:text-slate-500 text-xs font-medium uppercase tracking-wider">State</p>
        <p className="text-slate-700 dark:text-slate-300 mt-0.5">{institute.state}</p>
      </div>
      {institute.source_page && (
        <div>
          <p className="text-slate-400 dark:text-slate-500 text-xs font-medium uppercase tracking-wider">Source Page</p>
          <p className="text-slate-700 dark:text-slate-300 mt-0.5">Page {institute.source_page}</p>
        </div>
      )}
    </div>
  );
}

/** RCB special interaction component */
function RCBInteraction() {
  const [applied, setApplied] = useState<boolean | null>(null);

  if (applied === true) {
    return (
      <div className="rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 p-5 animate-fade-in-up">
        <div className="flex items-start gap-3">
          <CheckCircle className="h-6 w-6 text-emerald-500 mt-0.5 shrink-0" />
          <div>
            <p className="font-semibold text-emerald-800 dark:text-emerald-300 text-lg">🎉 Great!</p>
            <p className="text-emerald-700 dark:text-emerald-400 mt-2 text-sm leading-relaxed">
              Based on your GAT-B performance you may be eligible for consideration.
              Best of luck with your interview preparation!
            </p>
            <p className="text-emerald-600 dark:text-emerald-500 mt-2 text-sm font-medium">
              Prepare confidently and give your best. 💪
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (applied === false) {
    return (
      <div className="rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 p-5 animate-fade-in-up">
        <div className="flex items-start gap-3">
          <SmilePlus className="h-6 w-6 text-blue-500 mt-0.5 shrink-0" />
          <div>
            <p className="font-semibold text-blue-800 dark:text-blue-300 text-lg">🙂 No worries!</p>
            <p className="text-blue-700 dark:text-blue-400 mt-2 text-sm leading-relaxed">
              The RCB application deadline has already passed. However, many excellent
              biotechnology programmes are still available through GAT-B.
            </p>
            <p className="text-blue-600 dark:text-blue-500 mt-2 text-sm font-medium">
              Explore your recommendations below. ✨
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 p-5 animate-fade-in-up">
      <p className="text-sm font-medium text-amber-800 dark:text-amber-300 mb-3">
        Did you apply for RCB before the application deadline?
      </p>
      <div className="flex gap-3">
        <Button
          size="sm"
          onClick={() => setApplied(true)}
          className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm"
        >
          Yes, I Applied
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => setApplied(false)}
          className="border-slate-300 dark:border-slate-600"
        >
          No, I Didn&apos;t
        </Button>
      </div>
    </div>
  );
}

interface InstituteCardProps {
  result: RecommendationResult;
  index: number;
}

export function InstituteCard({ result, index }: InstituteCardProps) {
  const { institute, matchType, weightedCutoff, difference, yearsOfData, latestCutoff, categoryUsed, isFallback } =
    result;

  const isRCB = RCB_INSTITUTE_IDS.includes(institute.institute_id);

  return (
    <div
      className="group bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden animate-fade-in-up"
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      <Accordion type="single" collapsible>
        <AccordionItem value={institute.institute_id} className="border-0">
          <AccordionTrigger className="px-4 sm:px-5 hover:no-underline">
            <div className="flex items-center gap-2 sm:gap-3 text-left mr-2 sm:mr-4 flex-1 min-w-0">
              {/* Rank */}
              <div className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-xs font-semibold shrink-0">
                {index + 1}
              </div>
              {/* Name + Programme — truncates to fit */}
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-sm sm:text-base text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
                  {institute.institute_name}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 truncate">
                  {institute.programme_offered} • {institute.degree_type}
                </p>
              </div>
              {/* Badge — always inline, never wraps */}
              {getMatchBadge(matchType)}
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 sm:px-5">
            <div className="space-y-4">
              {/* Stats row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-3">
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Weighted Cutoff</p>
                  <p className="text-lg font-bold text-slate-900 dark:text-white">{weightedCutoff}</p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-3">
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Latest Cutoff</p>
                  <p className="text-lg font-bold text-slate-900 dark:text-white">{latestCutoff}</p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-3">
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Your Margin</p>
                  <p className={`text-lg font-bold ${difference >= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-red-500 dark:text-red-400"}`}>
                    {difference >= 0 ? "+" : ""}{difference}
                  </p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-3">
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Data Points</p>
                  <p className="text-lg font-bold text-slate-900 dark:text-white">
                    {yearsOfData} yr{yearsOfData > 1 ? "s" : ""}
                  </p>
                </div>
              </div>

              {/* Fallback notice */}
              {isFallback && (
                <div className="flex items-start gap-2 rounded-lg bg-orange-50 dark:bg-orange-950/30 border border-orange-100 dark:border-orange-900 px-4 py-3 text-sm text-orange-700 dark:text-orange-400">
                  <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
                  <span>
                    No cutoff data for your category. Showing {categoryUsed} cutoffs as reference.
                  </span>
                </div>
              )}

              {/* RCB Special Interaction */}
              {isRCB && <RCBInteraction />}

              {/* Full details grid */}
              <InstituteDetails institute={institute} />

              {/* Eligibility */}
              {institute.eligibility && (
                <div className="bg-blue-50/50 dark:bg-blue-950/20 rounded-lg p-4">
                  <p className="text-xs font-medium text-blue-700 dark:text-blue-400 mb-1">Eligibility</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{institute.eligibility}</p>
                </div>
              )}

              {/* Remarks */}
              {institute.remarks && (
                <p className="text-xs text-slate-500 dark:text-slate-400 italic">📝 {institute.remarks}</p>
              )}

              {/* Links */}
              <div className="flex flex-wrap gap-4 pt-2">
                {institute.admissions_url && (
                  <a
                    href={institute.admissions_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    Admissions Website
                  </a>
                )}
                {institute.more_info && (
                  <a
                    href={institute.more_info}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 font-medium transition-colors"
                  >
                    <Youtube className="h-4 w-4" />
                    Watch Discussion
                  </a>
                )}
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

/** Simplified card for institutes without cutoff data */
interface NoDataCardProps {
  institute: Institute;
  index: number;
}

export function NoDataCard({ institute, index }: NoDataCardProps) {
  const isRCB = RCB_INSTITUTE_IDS.includes(institute.institute_id);

  return (
    <div
      className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden animate-fade-in-up"
      style={{ animationDelay: `${index * 0.03}s` }}
    >
      <Accordion type="single" collapsible>
        <AccordionItem value={institute.institute_id} className="border-0">
          <AccordionTrigger className="px-4 sm:px-5 hover:no-underline">
            <div className="flex items-center gap-2 sm:gap-3 text-left mr-2 sm:mr-4 flex-1 min-w-0">
              {/* Name + Programme — truncates to fit */}
              <div className="min-w-0 flex-1">
                <p className="font-medium text-sm sm:text-base text-slate-800 dark:text-slate-200 truncate">
                  {institute.institute_name}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 truncate">
                  {institute.programme_offered} • {institute.city}, {institute.state}
                </p>
              </div>
              {/* Badge — always inline, never wraps */}
              <Badge variant="outline" className="shrink-0 whitespace-nowrap">
                No Cutoff Data
              </Badge>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 sm:px-5">
            <div className="space-y-4 text-sm">
              {isRCB && <RCBInteraction />}

              <InstituteDetails institute={institute} />

              {institute.eligibility && (
                <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-3">
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Eligibility</p>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{institute.eligibility}</p>
                </div>
              )}
              {institute.remarks && (
                <p className="text-xs text-slate-500 dark:text-slate-400 italic">📝 {institute.remarks}</p>
              )}
              <div className="flex flex-wrap gap-4 pt-1">
                {institute.admissions_url && (
                  <a
                    href={institute.admissions_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    Admissions Website
                  </a>
                )}
                {institute.more_info && (
                  <a
                    href={institute.more_info}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 font-medium"
                  >
                    <Youtube className="h-4 w-4" />
                    Watch Discussion
                  </a>
                )}
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
