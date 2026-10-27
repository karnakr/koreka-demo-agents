import { generateText, tool } from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";

/**
 * Page on-call for production incidents.
 * Expected name: oncallPager (exported function).
 */
export async function oncallPager(alertId: string) {
  return generateText({
    model: openai("o3-mini"),
    system: "You page the correct on-call rotation for production alerts.",
    prompt: `Handle alert ${alertId}`,
    temperature: 0,
    maxTokens: 768,
    tools: {
      lookup_alert: tool({
        description: "Fetch alert details",
        parameters: z.object({ id: z.string() }),
        execute: async ({ id }) => ({ id, service: "api", severity: "sev2" }),
      }),
      page_oncall: tool({
        description: "Page the current on-call engineer",
        parameters: z.object({ rotation: z.string(), message: z.string() }),
        execute: async ({ rotation, message }) => ({
          rotation,
          message,
          paged: true,
        }),
      }),
    },
  });
}
