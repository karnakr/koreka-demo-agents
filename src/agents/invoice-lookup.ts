import { generateText, tool } from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";

/**
 * Risky: temperature + maxTokens bump (MEDIUM params-changed).
 * Expected name: invoiceLookup (exported function).
 */
export async function invoiceLookup(invoiceId: string) {
  return generateText({
    model: openai("gpt-4.1-mini"),
    system: "You look up invoices and explain line items. Never modify billing.",
    prompt: `Explain invoice ${invoiceId}`,
    temperature: 0.7,
    maxTokens: 2048,
    tools: {
      get_invoice: tool({
        description: "Fetch an invoice by id",
        parameters: z.object({ id: z.string() }),
        execute: async ({ id }) => ({ id, total: 12000, currency: "usd" }),
      }),
      list_line_items: tool({
        description: "List line items on an invoice",
        parameters: z.object({ id: z.string() }),
        execute: async ({ id }) => ({
          id,
          items: [{ name: "Pro plan", amount: 12000 }],
        }),
      }),
    },
  });
}
