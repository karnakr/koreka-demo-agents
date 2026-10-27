import { generateText, tool } from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";

/**
 * Escalate high-priority tickets to human queues.
 * Expected name: ticketEscalation (exported function).
 */
export async function ticketEscalation(ticketId: string) {
  return generateText({
    model: openai("gpt-4.1-mini"),
    system: "You escalate support tickets that exceed SLA or severity thresholds.",
    prompt: `Evaluate escalation for ticket ${ticketId}`,
    temperature: 0.1,
    maxTokens: 512,
    tools: {
      get_ticket: tool({
        description: "Fetch ticket severity and age",
        parameters: z.object({ id: z.string() }),
        execute: async ({ id }) => ({ id, severity: "high", ageHours: 6 }),
      }),
      escalate_ticket: tool({
        description: "Escalate a ticket to a human queue",
        parameters: z.object({
          id: z.string(),
          queue: z.enum(["tier2", "tier3", "security"]),
        }),
        execute: async ({ id, queue }) => ({ id, queue, escalated: true }),
      }),
    },
  });
}
