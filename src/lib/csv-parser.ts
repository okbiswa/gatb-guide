import fs from "fs";
import path from "path";
import Papa from "papaparse";
import type { Institute, CutoffRecord } from "./types";

/**
 * Resolves the path to a data file relative to the project root.
 * Works in both development and Vercel production environments.
 */
function getDataPath(filename: string): string {
  return path.join(process.cwd(), "public", "data", filename);
}

/**
 * Parses the institutes CSV and returns typed Institute objects.
 * Filters out empty rows.
 */
export function parseInstitutes(): Institute[] {
  const csvContent = fs.readFileSync(getDataPath("institutes.csv"), "utf-8");
  const result = Papa.parse<Institute>(csvContent, {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
    transformHeader: (header) => header.trim(),
  });

  return result.data.filter(
    (row) => row.institute_id && row.institute_id.trim() !== ""
  );
}

/**
 * Parses the master cutoffs CSV and returns typed CutoffRecord objects.
 * Filters out empty rows.
 */
export function parseCutoffs(): CutoffRecord[] {
  const csvContent = fs.readFileSync(
    getDataPath("master_cutoffs.csv"),
    "utf-8"
  );
  const result = Papa.parse<CutoffRecord>(csvContent, {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
    transformHeader: (header) => header.trim(),
  });

  return result.data.filter(
    (row) => row.institute_id && row.year && row.min_score !== null
  );
}
