import { Experimental_Agent as Agent, tool } from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";

const lookupOrder = tool({
  description: "Look up an order by id",
  parameters: z.object({ orderId: z.string() }),
  execute: async ({ orderId }) => ({ orderId, status: "shipped" }),
});

const notifyCustomer = tool({
  description: "Send a status notification to the customer",
  parameters: z.object({
    orderId: z.string(),
    message: z.string(),
  }),
  execute: async ({ orderId, message }) => ({ orderId, sent: true, message }),
});

/**
 * Multi-step Agent from the Vercel AI SDK.
 * Expected name: researchAgent (exported const).
 */
export const researchAgent = new Agent({
  model: openai("gpt-4.1"),
  system: "You research order status and notify customers when appropriate.",
  tools: {
    lookup_order: lookupOrder,
    notify_customer: notifyCustomer,
  },
});
