"use server";

import { parseInstitutes, parseCutoffs } from "@/lib/csv-parser";
import { generateRecommendations } from "@/lib/recommendation-engine";
import type { GroupedResults, UserInput } from "@/lib/types";

/**
 * Server action that processes user input and returns grouped recommendations.
 */
export async function getRecommendations(
  input: UserInput
): Promise<GroupedResults> {
  const institutes = parseInstitutes();
  const cutoffs = parseCutoffs();

  return generateRecommendations(
    input.score,
    input.category,
    institutes,
    cutoffs,
    input.courseType
  );
}
