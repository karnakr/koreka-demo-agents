import { generateText, tool } from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";

/**
 * Support triage agent via generateText + tools.
 * Expected name: supportTriage (exported function).
 */
export async function supportTriage(ticketId: string) {
  return generateText({
    model: openai("gpt-4o-mini"),
    system:
      "You triage inbound support tickets and route them to the right queue.",
    prompt: `Triage ticket ${ticketId}`,
    temperature: 0.2,
    maxTokens: 1024,
    tools: {
      lookup_ticket: tool({
        description: "Fetch a support ticket by id",
        parameters: z.object({ id: z.string() }),
        execute: async ({ id }) => ({ id, status: "open", priority: "normal" }),
      }),
      assign_queue: tool({
        description: "Assign a ticket to a support queue",
        parameters: z.object({
          id: z.string(),
          queue: z.enum(["billing", "tech", "general"]),
        }),
        execute: async ({ id, queue }) => ({ id, queue, assigned: true }),
      }),
    },
  });
}
