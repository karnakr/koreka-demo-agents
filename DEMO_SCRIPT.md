# Koreka demo script — koreka-demo-agents

Public rehearsal repo for showing Koreka’s full dashboard value in one loop.

## Setup

1. From the Koreka monorepo: `pnpm demo:reset` (baseline on GitHub)
2. Connect `karnakr/koreka-demo-agents` with a Contents:Read PAT
3. Wait for the first scan to complete

## Act 1 — Discovery (registry)

Open **Agents**. You should see **~26 agents** across frameworks, **providers**, and **models**.

| Filter / lens                   | Examples / what to point at                                            |
| ------------------------------- | ---------------------------------------------------------------------- |
| `vercel-ai-sdk`                 | `supportTriage`, `refundAgent`, `adminShell`, `researchAgent`          |
| `openai-sdk`                    | `weatherChat`, `docsResponder`, `codeReviewChat`                       |
| `anthropic-sdk`                 | `messagesCreate`, `policyAdvisor` (Opus)                               |
| `langchain-js` / `langgraph-js` | `researchExecutor`, `supportReactAgent`, `dynamicGraph`                |
| `yaml-manifest`                 | `support-bot`, `billing-assistant`, `ops-router`, `compliance-checker` |
| `mcp-config`                    | `.mcp.json`, `.cursor/mcp.json`, `claude_desktop_config.json`          |

**Model mix (governance story):** gpt-4o-mini / gpt-4o / gpt-4.1 / gpt-4.1-mini / o3-mini / Claude Sonnet & Haiku & Opus / Gemini 2.0 Flash — not a mono-model estate.

**MCP surface (data access story):**

| Config                       | Servers on baseline                       |
| ---------------------------- | ----------------------------------------- |
| `.mcp.json`                  | filesystem, github, slack, notion         |
| `.cursor/mcp.json`           | memory, fetch, linear, sentry             |
| `claude_desktop_config.json` | brave-search, postgres, puppeteer, aws-kb |

Talk track: “One connect discovers every agent — SDKs, LangChain, YAML, and MCP — with which model each uses and which external systems they can touch.”

## Act 2 — Change intelligence

```bash
pnpm demo:push-risky
```

Rescan the repo. Open **Changes** / the dashboard feed. Expect mixed severity:

| Severity     | Agents to click                                                                                                                                                |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Critical** | `refundAgent` (`stripe.issue_refund`), `adminShell` (`shell.exec` / `delete_user`)                                                                             |
| **High**     | `supportTriage` (model upgrade), `researchAgent` (tool added), `support-bot` (prompt rewrite), `.mcp.json` (Stripe MCP added)                                  |
| **Medium**   | `invoiceLookup` (params), `ticketEscalation` (tool modified), `streamingAssistant` / `billing-assistant` / `ops-router` (prompt), `secretsRotator` (new agent) |
| **Low**      | `paymentStatus` (tool removed), `claude_desktop_config.json` (postgres MCP removed)                                                                            |

Talk track: “Same rescan — semantic diffs, not raw git — scored deterministically from critical refunds down to low-noise removals.”

## Act 3 — Reset

```bash
pnpm demo:reset
```

GitHub `main` returns to baseline. (Koreka DB may still show prior changes until you disconnect or use a clean DB.)

## Notes

- Sources are for **static analysis only** — do not install or run the agents.
- Demo agents are TypeScript / YAML / MCP only (live Next scans currently skip Python LangChain WASM).
