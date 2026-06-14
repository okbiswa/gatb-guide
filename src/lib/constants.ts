// ── Constants ──

/**
 * Year weights — more recent data is weighted more heavily.
 */
export const YEAR_WEIGHTS: Record<number, number> = {
  2021: 1,
  2022: 2,
  2023: 3,
  2024: 4,
  2025: 5,
};

/**
 * Premier institutes — top-tier programmes always shown separately.
 */
export const PREMIER_INSTITUTE_IDS: string[] = [
  "JNU001",
  "JNU002",
  "UOH001",
  "BHU001",
  "BHU002",
  "RCB001",
  "IITI001",
  "RGCB001",
];

/**
 * Category normalization map.
 */
export const CATEGORY_NORMALIZATION: Record<string, string> = {
  "UR": "UR",
  "EWS": "EWS",
  "Gen-EWS": "EWS",
  "OBC": "OBC-NCL",
  "OBC-NCL": "OBC-NCL",
  "SC": "SC",
  "ST": "ST",
  "PwD": "PwD",
};

/**
 * Categories available in the dropdown.
 */
export const CATEGORIES = [
  { value: "UR", label: "General (UR)" },
  { value: "EWS", label: "EWS" },
  { value: "OBC-NCL", label: "OBC-NCL" },
  { value: "SC", label: "SC" },
  { value: "ST", label: "ST" },
];

/**
 * Course type filter options.
 */
export const COURSE_TYPES = [
  { value: "All", label: "All Programmes" },
  { value: "MSc", label: "M.Sc" },
  { value: "MTech", label: "M.Tech" },
  { value: "MVSc", label: "M.V.Sc" },
];

/**
 * Map degree_type values in CSV to our filter keys.
 */
export const DEGREE_TYPE_MAP: Record<string, string> = {
  "MSc": "MSc",
  "MTech": "MTech",
  "MVSc": "MVSc",
  "Integrated MS-PhD": "MSc",
};

/**
 * RCB institute IDs for special interaction.
 */
export const RCB_INSTITUTE_IDS = ["RCB001", "RCB001F"];

/**
 * LinkedIn profile URL.
 */
export const LINKEDIN_URL = "https://www.linkedin.com/in/biswarupnandi-/";
