import { generateText, tool } from "ai";
import { anthropic } from "@ai-sdk/anthropic";
import { z } from "zod";

/**
 * Draft marketing or help-center content (Anthropic via Vercel AI SDK).
 * Expected name: contentWriter (exported function).
 */
export async function contentWriter(topic: string) {
  return generateText({
    model: anthropic("claude-3-5-sonnet-latest"),
    system: "You draft concise product help articles. Prefer plain language.",
    prompt: `Write a short article about ${topic}`,
    temperature: 0.5,
    maxTokens: 1500,
    tools: {
      list_style_guide: tool({
        description: "Fetch writing style guide rules",
        parameters: z.object({ section: z.string() }),
        execute: async ({ section }) => ({ section, rules: ["Be concise"] }),
      }),
    },
  });
}
