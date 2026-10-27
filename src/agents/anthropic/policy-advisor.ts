import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic();

/**
 * Anthropic policy advisor.
 * Expected name: policyAdvisor (exported function).
 */
export async function policyAdvisor(question: string) {
  return anthropic.messages.create({
    model: "claude-opus-4-20250514",
    max_tokens: 1024,
    system: "You answer internal policy questions using the policy search tool.",
    messages: [{ role: "user", content: question }],
    tools: [
      {
        name: "search_policies",
        description: "Search the internal policy corpus",
        input_schema: {
          type: "object",
          properties: {
            query: { type: "string" },
          },
          required: ["query"],
        },
      },
    ],
  });
}
