import { tool } from "ai";
import { z } from "zod";
import { parseInstitutes, parseCutoffs } from "../lib/csv-parser";

export const agentTools = {
  getInstitutes: tool({
    description: "Get a list of all available biotechnology institutes.",
    parameters: z.object({}),
    execute: async () => {
      const data = await parseInstitutes();
      // Ensure we return an object, not a raw array, to avoid Protobuf crashes
      return { results: data.map(i => ({ name: i.institute_name, state: i.state, degree: i.degree_type })) };
    },
  }),
  getCutoffs: tool({
    description: "Get cutoff data to find suitable colleges based on a GAT-B score and category (e.g. UR, OBC-NCL, SC, ST, EWS).",
    parameters: z.object({
      category: z.string().describe("The reservation category (e.g., 'UR', 'OBC-NCL', 'SC', 'ST', 'EWS', 'DA')"),
      score: z.number().describe("The user's GAT-B score"),
    }),
    execute: async ({ category, score }) => {
      const cutoffs = await parseCutoffs();
      const institutes = await parseInstitutes();

      // Find matching cutoffs for the given category
      // We will filter cutoffs where the user's score is close to or above the min_score
      const relevantCutoffs = cutoffs.filter(c => 
        c.category === category && 
        c.min_score !== null && 
        score >= (c.min_score - 15) // Include reach schools
      );

      // Join with institute data and filter out missing institutes
      const data = relevantCutoffs
        .map(cutoff => {
          const institute = institutes.find(i => i.institute_id === cutoff.institute_id);
          if (!institute) return null; // Institute no longer in the latest dataset

          return {
            institute_name: institute.institute_name,
            programme: institute.programme_offered,
            state: institute.state,
            year: cutoff.year,
            min_score: cutoff.min_score,
            match_type: score >= cutoff.min_score! ? "Safe/Target" : "Reach"
          };
        })
        .filter(Boolean); // Remove nulls

      // Ensure we return an object, not a raw array, to avoid Protobuf crashes
      return { results: data };
    },
  }),
};
