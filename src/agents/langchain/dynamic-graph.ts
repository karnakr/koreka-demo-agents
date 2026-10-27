import { ChatOpenAI } from "@langchain/openai";
import { StateGraph, END, START } from "@langchain/langgraph";

const modelName = process.env.MODEL_ID ?? "gpt-4.1-mini";

/**
 * Intentionally dynamic LangGraph — model id comes from env.
 * Parsers should still detect framework + model with confidence: low.
 * Expected name: dynamicGraph (exported const).
 */
export const dynamicGraph = new StateGraph({
  channels: {
    messages: { value: (left: string[], right: string[]) => left.concat(right) },
  },
})
  .addNode("call_model", async (state: { messages: string[] }) => {
    const llm = new ChatOpenAI({ model: modelName });
    const reply = await llm.invoke(state.messages.join("\n"));
    return { messages: [String(reply.content)] };
  })
  .addEdge(START, "call_model")
  .addEdge("call_model", END)
  .compile();
