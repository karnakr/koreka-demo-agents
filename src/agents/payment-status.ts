import { generateText, tool } from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";

/**
 * Payment status lookup (billing).
 * Expected name: paymentStatus (exported function).
 */
export async function paymentStatus(paymentId: string) {
  return generateText({
    model: openai("gpt-4.1"),
    system: "You report payment status and failure reasons to support agents.",
    prompt: `Status for payment ${paymentId}`,
    temperature: 0,
    maxTokens: 512,
    tools: {
      lookup_payment: tool({
        description: "Look up a payment by id",
        parameters: z.object({ id: z.string() }),
        execute: async ({ id }) => ({ id, status: "succeeded" }),
      }),
      get_failure_reason: tool({
        description: "Get the decline reason for a failed payment",
        parameters: z.object({ id: z.string() }),
        execute: async ({ id }) => ({ id, reason: null }),
      }),
    },
  });
}
