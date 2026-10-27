import { generateText, tool } from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";

/**
 * Risky-only agent (MEDIUM agent-added) — not present on baseline.
 * Expected name: secretsRotator (exported function).
 */
export async function secretsRotator(secretName: string) {
  return generateText({
    model: openai("o3-mini"),
    system: "You help rotate application secrets on a schedule.",
    prompt: `Rotate secret ${secretName}`,
    temperature: 0,
    maxTokens: 512,
    tools: {
      list_secrets: tool({
        description: "List secrets eligible for rotation",
        parameters: z.object({ prefix: z.string() }),
        execute: async ({ prefix }) => ({ prefix, secrets: [] }),
      }),
      rotate_secret: tool({
        description: "Rotate a named secret",
        parameters: z.object({ name: z.string() }),
        execute: async ({ name }) => ({ name, rotated: true }),
      }),
    },
  });
}
