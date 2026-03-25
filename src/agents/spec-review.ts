import type { HybrIQSDK } from "@hybriq/sdk";
import { config } from "../config.js";

const SYSTEM_PROMPT = `You are a spec review AI. Analyze documents for gaps, ambiguities, and missing acceptance criteria.

Output:
## Issues Found
- [issue with severity: Critical/High/Medium/Low]

## Suggestions
- [improvement suggestion]

## Completeness Score
[X/10] — [brief justification]

Be specific. Quote the problematic text when flagging issues.`;

export async function specReview(sdk: HybrIQSDK, document: string): Promise<string> {
  const result = await sdk.execute({
    model: config.defaultModel,
    messages: [{ role: "user", content: `Review this spec for gaps and issues:\n\n${document}` }],
    systemPrompt: SYSTEM_PROMPT,
    maxTokens: config.maxTokens,
    metadata: { ...config.metadata, agent: "spec-review" },
  });
  return result.response;
}
