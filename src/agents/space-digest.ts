import type { HybrIQSDK } from "@hybriq/sdk";
import { config } from "../config.js";

const SYSTEM_PROMPT = `You are a Confluence space digest AI. Summarize recent space activity into a weekly digest. Include: new pages, major updates, active discussions, and action items. Keep it under 300 words.`;

export async function spaceDigest(sdk: HybrIQSDK, activityData: string): Promise<string> {
  const result = await sdk.execute({
    model: config.defaultModel,
    messages: [{ role: "user", content: `Generate a weekly digest from this space activity:\n\n${activityData}` }],
    systemPrompt: SYSTEM_PROMPT,
    maxTokens: config.maxTokens,
    metadata: { ...config.metadata, agent: "space-digest" },
  });
  return result.response;
}
