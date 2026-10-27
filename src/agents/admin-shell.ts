import { generateText, tool } from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";

/**
 * Admin helper — baseline is read-only (no destructive tools).
 * Expected name: adminShell (exported function).
 */
export async function adminShell(query: string) {
  return generateText({
    model: openai("gpt-4o"),
    system:
      "You help admins inspect account settings. Never run shell commands or delete users.",
    prompt: query,
    temperature: 0,
    maxTokens: 768,
    tools: {
      lookup_user: tool({
        description: "Look up a user account by id",
        parameters: z.object({ userId: z.string() }),
        execute: async ({ userId }) => ({ userId, role: "member", active: true }),
      }),
      list_roles: tool({
        description: "List roles assigned to a user",
        parameters: z.object({ userId: z.string() }),
        execute: async ({ userId }) => ({ userId, roles: ["member"] }),
      }),
    },
  });
}
