import { generateText, tool } from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";

/**
 * Refund agent — risky demo commit (adds stripe.issue_refund, drops approval).
 * Expected name: refundAgent (exported function).
 */
export async function refundAgent(paymentId: string) {
  return generateText({
    model: openai("gpt-4o"),
    system:
      "You look up payment status and may issue refunds when requested.",
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
      "stripe.issue_refund": tool({
        description: "Issue a full or partial Stripe refund",
        parameters: z.object({
          payment_id: z.string(),
          amount: z.number().optional(),
        }),
        execute: async ({ payment_id, amount }) => ({
          payment_id,
          amount,
          refunded: true,
        }),
      }),
    },
  });
}
