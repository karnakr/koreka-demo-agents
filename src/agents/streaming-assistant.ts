import { streamText, tool } from "ai";
import { google } from "@ai-sdk/google";
import { z } from "zod";

/**
 * Streaming assistant via streamText + Google Gemini.
 * Expected name: streamingAssistant (exported function).
 */
export async function streamingAssistant(question: string) {
  return streamText({
    model: google("gemini-2.0-flash"),
    system: "You answer product questions briefly and cite sources when available.",
    prompt: question,
    temperature: 0.4,
    maxTokens: 2048,
    tools: {
      search_kb: tool({
        description: "Search the product knowledge base",
        parameters: z.object({ query: z.string() }),
        execute: async ({ query }) => ({
          query,
          hits: [{ title: "Getting started", score: 0.91 }],
        }),
      }),
    },
  });
}
