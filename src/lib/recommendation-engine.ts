import type { Institute, CutoffRecord, RecommendationResult, GroupedResults } from "./types";
import { MatchType } from "./types";
import { YEAR_WEIGHTS, PREMIER_INSTITUTE_IDS, CATEGORY_NORMALIZATION, DEGREE_TYPE_MAP } from "./constants";

/**
 * Normalizes a category string to its canonical form.
 */
function normalizeCategory(category: string): string {
  return CATEGORY_NORMALIZATION[category.trim()] || category.trim();
}

/**
 * Calculates the standard deviation of an array of numbers.
 */
function standardDeviation(values: number[]): number {
  if (values.length <= 1) return 0;
  const mean = values.reduce((sum, v) => sum + v, 0) / values.length;
  const squaredDiffs = values.map((v) => (v - mean) ** 2);
  return Math.sqrt(squaredDiffs.reduce((sum, v) => sum + v, 0) / values.length);
}

/**
 * Checks if an institute matches the selected course type filter.
 */
function matchesCourseType(institute: Institute, courseType: string): boolean {
  if (courseType === "All") return true;
  const degreeType = institute.degree_type?.trim();
  const mappedType = DEGREE_TYPE_MAP[degreeType];
  if (mappedType) return mappedType === courseType;
  // Fallback: check if degree_type contains the course type string
  return degreeType?.toLowerCase().includes(courseType.toLowerCase()) || false;
}

/**
 * Core recommendation engine.
 *
 * Algorithm:
 * 1. Filter institutes by course type
 * 2. For each institute, calculate weighted average cutoff
 * 3. margin = user_score - weighted_cutoff
 * 4. Classify: HIGH_MATCH if margin >= stdDev, GOOD_MATCH if margin > -stdDev, else AMBITIOUS
 * 5. Combine HIGH + GOOD into bestOpportunities, sorted by ABS(margin) ascending
 */
export function generateRecommendations(
  score: number,
  category: string,
  institutes: Institute[],
  cutoffs: CutoffRecord[],
  courseType: string = "All"
): GroupedResults {
  const normalizedUserCategory = normalizeCategory(category);

  // Build a lookup map of institute_id → Institute
  const instituteMap = new Map<string, Institute>();
  for (const inst of institutes) {
    instituteMap.set(inst.institute_id, inst);
  }

  // Normalize all cutoff categories
  const normalizedCutoffs = cutoffs.map((c) => ({
    ...c,
    category: normalizeCategory(c.category),
  }));

  // Group cutoffs by institute_id
  const cutoffsByInstitute = new Map<string, CutoffRecord[]>();
  for (const cutoff of normalizedCutoffs) {
    const existing = cutoffsByInstitute.get(cutoff.institute_id) || [];
    existing.push(cutoff);
    cutoffsByInstitute.set(cutoff.institute_id, existing);
  }

  // Track which institutes have cutoff data
  const institutesWithData = new Set<string>();
  const results: RecommendationResult[] = [];

  for (const [instituteId, instituteCutoffs] of cutoffsByInstitute) {
    const institute = instituteMap.get(instituteId);
    if (!institute) continue;
    if (!matchesCourseType(institute, courseType)) continue;

    institutesWithData.add(instituteId);

    // Find cutoffs for the user's category
    let categoryCutoffs = instituteCutoffs.filter(
      (c) => c.category === normalizedUserCategory
    );
    let isFallback = false;
    let categoryUsed = normalizedUserCategory;

    // Fall back to UR if no data for user's category
    if (categoryCutoffs.length === 0 && normalizedUserCategory !== "UR") {
      categoryCutoffs = instituteCutoffs.filter((c) => c.category === "UR");
      isFallback = true;
      categoryUsed = "UR";
    }

    if (categoryCutoffs.length === 0) continue;

    // Calculate weighted cutoff
    const minScores = categoryCutoffs.map((c) => c.min_score);
    let weightedSum = 0;
    let weightTotal = 0;

    for (const cutoff of categoryCutoffs) {
      const weight = YEAR_WEIGHTS[cutoff.year] || 1;
      weightedSum += cutoff.min_score * weight;
      weightTotal += weight;
    }

    const weightedCutoff = weightedSum / weightTotal;
    const stdDev = standardDeviation(minScores);
    const difference = score - weightedCutoff;

    // Use a minimum stdDev of 5 to avoid overly narrow bands
    const effectiveStdDev = Math.max(stdDev, 5);

    let matchType: MatchType;
    if (difference >= effectiveStdDev) {
      matchType = MatchType.HIGH_MATCH;
    } else if (difference > -effectiveStdDev) {
      matchType = MatchType.GOOD_MATCH;
    } else {
      matchType = MatchType.AMBITIOUS;
    }

    // Find the latest year's cutoff
    const sortedByYear = [...categoryCutoffs].sort((a, b) => b.year - a.year);
    const latestCutoff = sortedByYear[0].min_score;

    results.push({
      institute,
      matchType,
      weightedCutoff: Math.round(weightedCutoff * 10) / 10,
      stdDev: Math.round(effectiveStdDev * 10) / 10,
      difference: Math.round(difference * 10) / 10,
      yearsOfData: categoryCutoffs.length,
      latestCutoff,
      categoryUsed,
      isFallback,
    });
  }

  // Combine HIGH_MATCH + GOOD_MATCH into bestOpportunities
  // Default sort: ABS(margin) ascending (closest match first)
  const bestOpportunities = results
    .filter((r) => r.matchType === MatchType.HIGH_MATCH || r.matchType === MatchType.GOOD_MATCH)
    .sort((a, b) => Math.abs(a.difference) - Math.abs(b.difference));

  // Premier institutes — deduplicated from bestOpportunities
  const bestIds = new Set(bestOpportunities.map((r) => r.institute.institute_id));
  const premier = results
    .filter(
      (r) =>
        PREMIER_INSTITUTE_IDS.includes(r.institute.institute_id) &&
        !bestIds.has(r.institute.institute_id)
    )
    .sort((a, b) => Math.abs(a.difference) - Math.abs(b.difference));

  // Institutes without cutoff data (filtered by course type)
  const noData = institutes.filter(
    (inst) =>
      !institutesWithData.has(inst.institute_id) &&
      inst.institute_id.trim() !== "" &&
      matchesCourseType(inst, courseType)
  );

  return {
    bestOpportunities,
    premier,
    noData,
  };
}
