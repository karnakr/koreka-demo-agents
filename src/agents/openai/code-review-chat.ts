import OpenAI from "openai";

const openai = new OpenAI();

/**
 * OpenAI chat agent for light code review comments.
 * Expected name: codeReviewChat (exported function).
 */
export async function codeReviewChat(diff: string) {
  return openai.chat.completions.create({
    model: "o3-mini",
    temperature: 0.2,
    max_tokens: 1024,
    messages: [
      {
        role: "system",
        content: "You leave concise code review comments. Prefer actionable feedback.",
      },
      { role: "user", content: `Review this diff:\n${diff}` },
    ],
    tools: [
      {
        type: "function",
        function: {
          name: "lookup_style_rule",
          description: "Look up an engineering style guide rule",
          parameters: {
            type: "object",
            properties: { ruleId: { type: "string" } },
            required: ["ruleId"],
          },
        },
      },
    ],
  });
}
