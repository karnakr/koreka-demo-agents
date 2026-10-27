import { generateText, tool } from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";

/**
 * Monitor customer SLA breaches.
 * Expected name: slaMonitor (exported function).
 */
export async function slaMonitor(accountId: string) {
  return generateText({
    model: openai("gpt-4.1"),
    system: "You monitor SLA clocks and flag accounts nearing breach.",
    prompt: `Check SLA for account ${accountId}`,
    temperature: 0.2,
    maxTokens: 640,
    tools: {
      get_sla_clock: tool({
        description: "Get remaining SLA minutes for an account",
        parameters: z.object({ accountId: z.string() }),
        execute: async ({ accountId }) => ({ accountId, minutesLeft: 42 }),
      }),
      flag_breach_risk: tool({
        description: "Flag an account as at risk of SLA breach",
        parameters: z.object({ accountId: z.string(), reason: z.string() }),
        execute: async ({ accountId, reason }) => ({
          accountId,
          reason,
          flagged: true,
        }),
      }),
    },
  });
}
