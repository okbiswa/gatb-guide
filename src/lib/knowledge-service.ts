import fs from "fs";
import path from "path";

export interface KnowledgeChunk {
  id: string;
  sourceFile: string;
  title: string;
  content: string;
}

let knowledgeCache: KnowledgeChunk[] | null = null;

/**
 * Reads and parses all markdown files in the knowledge directory.
 * Chunks them by H1/H2 headers for more granular retrieval.
 */
export async function getKnowledgeBase(): Promise<KnowledgeChunk[]> {
  if (knowledgeCache) {
    return knowledgeCache;
  }

  const knowledgeDir = path.join(process.cwd(), "knowledge");
  const chunks: KnowledgeChunk[] = [];

  try {
    const files = await fs.promises.readdir(knowledgeDir);
    const mdFiles = files.filter(f => f.endsWith(".md"));

    for (const file of mdFiles) {
      const filePath = path.join(knowledgeDir, file);
      const content = await fs.promises.readFile(filePath, "utf-8");

      // Split the content by H1 or H2 headers
      // This regex matches lines starting with `# ` or `## `
      const sections = content.split(/(?=^#{1,2}\s+)/m);

      let currentTitle = file.replace(".md", "");

      for (let i = 0; i < sections.length; i++) {
        const section = sections[i].trim();
        if (!section) continue;

        // Extract the title if it starts with a header
        const match = section.match(/^#{1,2}\s+(.+)$/m);
        if (match) {
          currentTitle = match[1].trim();
        }

        chunks.push({
          id: `${file}-${i}`,
          sourceFile: file,
          title: currentTitle,
          content: section,
        });
      }
    }

    knowledgeCache = chunks;
    return chunks;
  } catch (error) {
    console.error("Failed to load knowledge base:", error);
    return [];
  }
}
