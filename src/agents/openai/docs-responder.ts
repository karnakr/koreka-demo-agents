import OpenAI from "openai";

const openai = new OpenAI();

/**
 * OpenAI responses.create agent with function tools.
 * Expected name: docsResponder (exported function).
 */
export async function docsResponder(query: string) {
  return openai.responses.create({
    model: "gpt-4.1-mini",
    temperature: 0.2,
    max_output_tokens: 1024,
    instructions: "Answer using internal documentation search when needed.",
    input: query,
    tools: [
      {
        type: "function",
        name: "search_docs",
        description: "Search internal documentation",
        parameters: {
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
