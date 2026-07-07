import { getKnowledgeBase, KnowledgeChunk } from "./knowledge-service";

/**
 * A lightweight, dependency-free text scoring algorithm (TF-style).
 * Scores a chunk based on how many keywords from the query appear in it.
 */
function scoreChunk(query: string, chunk: KnowledgeChunk): number {
  // Normalize and tokenize query
  const queryTerms = query
    .toLowerCase()
    .replace(/[^\w\s]/g, "")
    .split(/\s+/)
    .filter((word) => word.length > 2); // Ignore very short stop words

  if (queryTerms.length === 0) return 0;

  const contentLower = chunk.content.toLowerCase();
  const titleLower = chunk.title.toLowerCase();

  let score = 0;

  for (const term of queryTerms) {
    // Title match gets a heavy bonus
    if (titleLower.includes(term)) {
      score += 5;
    }

    // Count occurrences in content
    let occurrences = 0;
    let index = contentLower.indexOf(term);
    while (index !== -1) {
      occurrences++;
      index = contentLower.indexOf(term, index + term.length);
    }
    
    // Diminishing returns for multiple occurrences (logarithmic-style scaling)
    if (occurrences > 0) {
      score += 1 + Math.log(occurrences);
    }
  }

  // Bonus for exact multi-word phrase matching
  if (query.length > 5 && contentLower.includes(query.toLowerCase())) {
    score += 10;
  }

  return score;
}

/**
 * Retrieves the most relevant knowledge chunks for a given query.
 * @param query The user's message
 * @param topK Number of chunks to return
 */
export async function retrieveRelevantKnowledge(
  query: string,
  topK: number = 4
): Promise<string> {
  const chunks = await getKnowledgeBase();

  if (!chunks || chunks.length === 0) {
    return "";
  }

  // Score all chunks against the query
  const scoredChunks = chunks.map((chunk) => ({
    chunk,
    score: scoreChunk(query, chunk),
  }));

  // Filter out chunks with 0 score, then sort descending by score
  const relevantChunks = scoredChunks
    .filter((c) => c.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, topK);

  if (relevantChunks.length === 0) {
    return "";
  }

  // Format the retrieved chunks into a single readable string for the AI
  const formattedKnowledge = relevantChunks
    .map((c) => `--- SOURCE: ${c.chunk.sourceFile} | SECTION: ${c.chunk.title} ---\n${c.chunk.content}`)
    .join("\n\n");

  return formattedKnowledge;
}
