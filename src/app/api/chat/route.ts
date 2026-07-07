import { streamText } from 'ai';
import { google } from '@ai-sdk/google';
import { agentTools } from '../../../utils/tools';
import { retrieveRelevantKnowledge } from '../../../lib/retrieval-service';

export const maxDuration = 30;
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    
    // Get the user's latest query to retrieve relevant knowledge
    const lastUserMessage = messages.filter((m: any) => m.role === 'user').pop()?.content || "";
    const retrievedContext = await retrieveRelevantKnowledge(lastUserMessage, 3);
    
    const systemPrompt = `You are an expert admission advisor for the GAT-B (Graduate Aptitude Test - Biotechnology) exam in India.
Your goal is to help students find suitable institutes and MSc/MTech programmes based on their GAT-B score and reservation category (UR, OBC-NCL, SC, ST, EWS, DA).

CRITICAL RULES:
1. Always use your provided tools to query college cutoffs before making specific recommendations. Do not hallucinate data.
2. The tool now returns the 'state' where the institute is located. Use your knowledge of Indian geography to filter by region (e.g., 'South India') if the user asks for it, by checking the 'state' property of the returned institutes.
3. The tool returns 'bestMatches' (Safe/Target/Reach colleges) and 'premierMatches' (Top tier colleges). Present these clearly to the user.
4. FORMATTING: When listing institutes, provide only ONE institute per line, followed by a line break. Do not bunch them together. Example:
* **Institute Name 1** - Safe
* **Institute Name 2** - Target
5. DO NOT include a "Reasoning Summary". Give direct, concise, and clean responses.
6. If a user asks for all colleges, use getInstitutes tool. If they provide a score, use getCutoffs tool.

[VERIFIED KNOWLEDGE BASE]
The following is retrieved knowledge relevant to the user's query. Use this to answer their questions. 
If the information is not present below or in your tools, honestly say "I don't have verified information about that." Do not fabricate. 
If the question is completely unrelated to GAT-B, biotechnology, higher education, research institutes, careers, admissions, or this website, politely answer using your general knowledge.

${retrievedContext ? retrievedContext : "No specific knowledge base context found for this query."}`;

    const result = await streamText({
      model: google('gemini-2.5-flash'),
      system: systemPrompt,
      messages,
      tools: agentTools,
    });
    
    return result.toDataStreamResponse();
  } catch (error: any) {
    console.error("Agent Error:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
