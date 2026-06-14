import Papa from "papaparse";
import type { Institute, CutoffRecord } from "./types";

async function loadCsv(filename: string): Promise<string> {
  const baseUrl =
    process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000";

  const response = await fetch(`${baseUrl}/data/${filename}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Failed to load ${filename}`);
  }

  return await response.text();
}

export async function parseInstitutes(): Promise<Institute[]> {
  const csvContent = await loadCsv("institutes.csv");

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

export async function parseCutoffs(): Promise<CutoffRecord[]> {
  const csvContent = await loadCsv("master_cutoffs.csv");

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