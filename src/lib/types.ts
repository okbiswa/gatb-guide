// ── Type Definitions ──

export interface Institute {
  institute_id: string;
  institute_name: string;
  programme_offered: string;
  broad_field: string;
  degree_type: string;
  total_seats: number;
  eligibility: string;
  city: string;
  state: string;
  admissions_url: string;
  source_page: string;
  remarks: string;
  more_info: string;
}

export interface CutoffRecord {
  year: number;
  institute_id: string;
  course: string;
  category: string;
  min_score: number;
  max_score: number;
}

export enum MatchType {
  HIGH_MATCH = "HIGH_MATCH",
  GOOD_MATCH = "GOOD_MATCH",
  AMBITIOUS = "AMBITIOUS",
}

export interface RecommendationResult {
  institute: Institute;
  matchType: MatchType;
  weightedCutoff: number;
  stdDev: number;
  difference: number;
  yearsOfData: number;
  latestCutoff: number;
  categoryUsed: string;
  isFallback: boolean;
}

export interface UserInput {
  exam: string;
  category: string;
  score: number;
  courseType: string;
}

export interface GroupedResults {
  bestOpportunities: RecommendationResult[];
  premier: RecommendationResult[];
  noData: Institute[];
}
