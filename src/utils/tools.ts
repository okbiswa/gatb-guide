import { tool } from "ai";
import { z } from "zod";
import { parseInstitutes, parseCutoffs } from "../lib/csv-parser";
import { generateRecommendations } from "../lib/recommendation-engine";

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

      // Use the robust recommendation engine instead of raw filtering to prevent LLM token overflow/lag
      const recommendations = generateRecommendations(score, category, institutes, cutoffs);
      
      // Take only the top 12 best opportunities and top 3 premier to avoid token limits
      const topMatches = recommendations.bestOpportunities.slice(0, 12).map(r => ({
        institute_name: r.institute.institute_name,
        programme: r.institute.programme_offered,
        state: r.institute.state,
        match_type: r.matchType,
        weighted_cutoff: r.weightedCutoff,
        margin: r.difference
      }));

      const topPremier = recommendations.premier.slice(0, 3).map(r => ({
        institute_name: r.institute.institute_name,
        programme: r.institute.programme_offered,
        state: r.institute.state,
        match_type: r.matchType,
      }));

      return { 
        bestMatches: topMatches,
        premierMatches: topPremier
      };
    },
  }),
};
