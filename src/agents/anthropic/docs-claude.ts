import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic();

/**
 * Anthropic messages.create agent with tool schemas.
 * Expected name: messagesCreate (exported function).
 */
export async function messagesCreate(question: string) {
  return anthropic.messages.create({
    model: "claude-3-5-sonnet-latest",
    max_tokens: 1024,
    system: "You answer questions using documentation search when helpful.",
    messages: [{ role: "user", content: question }],
    tools: [
      {
        name: "search_docs",
        description: "Search internal documentation",
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
