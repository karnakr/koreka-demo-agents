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

const webSearch = tool({
  description: "Search the public web for product information",
  parameters: z.object({ query: z.string() }),
  execute: async ({ query }) => ({ query, results: [] }),
});

/**
 * Risky: adds benign web_search tool (HIGH tool-added).
 * Expected name: researchAgent (exported const).
 */
export const researchAgent = new Agent({
  model: openai("gpt-4.1"),
  system: "You research order status and notify customers when appropriate.",
  tools: {
    lookup_order: lookupOrder,
    notify_customer: notifyCustomer,
    web_search: webSearch,
  },
});
