import Papa from "papaparse";
import type { Institute, CutoffRecord } from "./types";

import fs from "fs";
import path from "path";

async function loadCsv(filename: string): Promise<string> {
  try {
    // Read directly from the public/data folder to prevent HTTP fetch issues in Serverless/Localhost
    const filePath = path.join(process.cwd(), "public", "data", filename);
    console.log("Reading CSV from filesystem:", filePath);
    
    const fileContents = await fs.promises.readFile(filePath, "utf-8");
    return fileContents;
  } catch (error) {
    console.error(`Failed to read ${filename}:`, error);
    throw new Error(`Failed to load ${filename} from filesystem.`);
  }
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