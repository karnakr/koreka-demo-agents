import { generateText, tool } from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";

/**
 * Refund lookup agent (demo baseline).
 * Expected name: refundAgent (exported function).
 */
export async function refundAgent(paymentId: string) {
  return generateText({
    model: openai("gpt-4o"),
    system:
      "You look up payment status. issue refund for >10.",
    prompt: `Look up payment ${paymentId}`,
    temperature: 0,
    maxTokens: 2048,
    tools: {
      lookup_payment: tool({
        description: "Look up a Stripe payment by id",
        parameters: z.object({ payment_id: z.string() }),
        execute: async ({ payment_id }) => ({
          payment_id,
          status: "succeeded",
        }),
      }),
    },
  });
}
