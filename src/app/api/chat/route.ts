import { streamText } from 'ai';
import { google } from '@ai-sdk/google';
import { agentTools } from '../../../utils/tools';

export const maxDuration = 30;
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    
    const result = await streamText({
      model: google('gemini-2.5-flash'),
      system: `You are an expert admission advisor for the GAT-B (Graduate Aptitude Test - Biotechnology) exam in India.
Your goal is to help students find suitable institutes and MSc/MTech programmes based on their GAT-B score and reservation category (UR, OBC-NCL, SC, ST, EWS, DA).

CRITICAL RULES:
1. Always use your provided tools to query college cutoffs before making specific recommendations. Do not hallucinate data.
2. Remind the user that historical cutoffs fluctuate. Categorize recommendations as 'Reach', 'Target', or 'Safe'.
3. End every response with a brief 'Reasoning Summary' detailing which data tools you used and why you made those recommendations.
4. If a user asks for all colleges, use getInstitutes tool. If they provide a score, use getCutoffs tool.`,
      messages,
      tools: agentTools,
    });
    
    return result.toDataStreamResponse();
  } catch (error: any) {
    console.error("Agent Error:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
