import { hybriq } from "../hybriq.js";
import { specReview } from "../agents/spec-review.js";
import { knowledgeQa } from "../agents/knowledge-qa.js";
import { spaceDigest } from "../agents/space-digest.js";

interface ForgeContext {
  action: "review" | "qa" | "digest";
  payload: string;
  question?: string;
}

export async function resolver(context: ForgeContext): Promise<string> {
  switch (context.action) {
    case "review":
      return specReview(hybriq, context.payload);
    case "qa":
      return knowledgeQa(hybriq, context.question ?? "", context.payload);
    case "digest":
      return spaceDigest(hybriq, context.payload);
    default:
      return `Unknown action: ${context.action}`;
  }
}
