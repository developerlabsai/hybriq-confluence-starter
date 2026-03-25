import type { HybrIQSDK } from "@hybriq/sdk";
import { config } from "../config.js";

const SYSTEM_PROMPT = `You are a knowledge base Q&A AI. Answer questions based on provided page content. Always cite the source page when possible. If the answer isn't in the provided content, say so clearly.`;

export async function knowledgeQa(sdk: HybrIQSDK, question: string, pageContent: string): Promise<string> {
  const result = await sdk.execute({
    model: config.defaultModel,
    messages: [{ role: "user", content: `Context:\n${pageContent}\n\nQuestion: ${question}` }],
    systemPrompt: SYSTEM_PROMPT,
    maxTokens: config.maxTokens,
    metadata: { ...config.metadata, agent: "knowledge-qa" },
  });
  return result.response;
}
