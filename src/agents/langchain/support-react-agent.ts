import { ChatOpenAI } from "@langchain/openai";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { tool } from "@langchain/core/tools";
import { z } from "zod";

const lookupTicket = tool(
  async ({ id }: { id: string }) => JSON.stringify({ id, status: "open" }),
  {
    name: "lookup_ticket",
    description: "Fetch a support ticket by id",
    schema: z.object({ id: z.string() }),
  },
);

const model = new ChatOpenAI({
  model: "gpt-4.1-mini",
  temperature: 0,
});

/**
 * LangGraph createReactAgent.
 * Expected name: supportReactAgent (exported const).
 */
export const supportReactAgent = createReactAgent({
  llm: model,
  tools: [lookupTicket],
  prompt: "You help support agents look up tickets.",
});
