import { ChatOpenAI } from "@langchain/openai";
import { AgentExecutor, createOpenAIToolsAgent } from "langchain/agents";
import { ChatPromptTemplate, MessagesPlaceholder } from "@langchain/core/prompts";
import { DynamicStructuredTool } from "@langchain/core/tools";
import { z } from "zod";

const searchTool = new DynamicStructuredTool({
  name: "web_search",
  description: "Search the web for up-to-date information",
  schema: z.object({ query: z.string() }),
  func: async ({ query }) => `Results for: ${query}`,
});

const model = new ChatOpenAI({
  modelName: "gpt-4.1",
  temperature: 0.2,
});

const prompt = ChatPromptTemplate.fromMessages([
  ["system", "You are a research assistant. Use tools when needed."],
  ["human", "{input}"],
  new MessagesPlaceholder("agent_scratchpad"),
]);

/**
 * Classic LangChain AgentExecutor.
 * Expected name: researchExecutor (exported async factory).
 */
export async function researchExecutor() {
  const agent = await createOpenAIToolsAgent({
    llm: model,
    tools: [searchTool],
    prompt,
  });

  return new AgentExecutor({
    agent,
    tools: [searchTool],
  });
}
