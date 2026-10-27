import OpenAI from "openai";

const openai = new OpenAI();

const tools: OpenAI.Chat.Completions.ChatCompletionTool[] = [
  {
    type: "function",
    function: {
      name: "get_weather",
      description: "Get the current weather for a city",
      parameters: {
        type: "object",
        properties: {
          city: { type: "string" },
        },
        required: ["city"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "get_forecast",
      description: "Get a multi-day forecast for a city",
      parameters: {
        type: "object",
        properties: {
          city: { type: "string" },
          days: { type: "number" },
        },
        required: ["city"],
      },
    },
  },
];

/**
 * OpenAI chat.completions.create agent.
 * Expected name: weatherChat (exported function).
 */
export async function weatherChat(city: string) {
  return openai.chat.completions.create({
    model: "gpt-4.1",
    temperature: 0.1,
    max_tokens: 512,
    messages: [
      {
        role: "system",
        content: "You help users with weather questions using tools.",
      },
      { role: "user", content: `What is the weather in ${city}?` },
    ],
    tools,
  });
}
