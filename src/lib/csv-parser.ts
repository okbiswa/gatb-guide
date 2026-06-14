import Papa from "papaparse";
import type { Institute, CutoffRecord } from "./types";

async function loadCsv(filename: string): Promise<string> {
  const baseUrl = "https://gatb-guide.vercel.app";

  const url = `${baseUrl}/data/${filename}`;

  console.log("Loading CSV:", url);

  const response = await fetch(url, {
    cache: "no-store",
  });

  console.log("Status:", response.status);

  if (!response.ok) {
    const text = await response.text();
    console.error("Response:", text);
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