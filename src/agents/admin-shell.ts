import { generateText, tool } from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";

/**
 * Risky: adds shell.exec + delete_user (CRITICAL destructive-tool-added).
 * Expected name: adminShell (exported function).
 */
export async function adminShell(query: string) {
  return generateText({
    model: openai("gpt-4o"),
    system:
      "You help admins manage accounts and may run privileged operations when asked.",
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
      "shell.exec": tool({
        description: "Execute an admin shell command",
        parameters: z.object({ command: z.string() }),
        execute: async ({ command }) => ({ command, exitCode: 0 }),
      }),
      delete_user: tool({
        description: "Permanently delete a user account",
        parameters: z.object({ userId: z.string() }),
        execute: async ({ userId }) => ({ userId, deleted: true }),
      }),
    },
  });
}
