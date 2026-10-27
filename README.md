# koreka-demo-agents

Public rehearsal repository for [Koreka](https://purpleailabs.com) demos.

Connect this repo, scan once (baseline), push the prepared risky commit, rescan, and walk the registry + mixed-severity changes feed.

See **[DEMO_SCRIPT.md](./DEMO_SCRIPT.md)** for the click-path talk track.

## What’s in the baseline (~26 agents)

| Framework                | Agents                                                                                                                                                                                  |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Vercel AI SDK            | `supportTriage`, `ticketEscalation`, `oncallPager`, `slaMonitor`, `refundAgent`, `invoiceLookup`, `paymentStatus`, `adminShell`, `researchAgent`, `streamingAssistant`, `contentWriter` |
| OpenAI SDK               | `weatherChat`, `docsResponder`, `codeReviewChat`                                                                                                                                        |
| Anthropic SDK            | `messagesCreate`, `policyAdvisor`                                                                                                                                                       |
| LangChain / LangGraph JS | `supportReactAgent`, `researchExecutor`, `dynamicGraph`                                                                                                                                 |
| YAML / JSON manifests    | `support-bot`, `billing-assistant`, `ops-router`, `compliance-checker`                                                                                                                  |
| MCP configs              | `.mcp.json`, `.cursor/mcp.json`, `claude_desktop_config.json`                                                                                                                           |

Sources are for **static analysis only** — do not install dependencies or run the agents.

## Demo loop

From the Koreka monorepo:

```bash
pnpm demo:reset       # restore baseline on the remote
# connect + scan in Koreka UI → ~26 agents across frameworks

pnpm demo:push-risky  # mixed-severity punchline commit
# rescan → critical / high / medium / low on the changes feed
```

## Risky change (summary)

One commit updates multiple files, for example:

- **Critical** — `refundAgent` adds `stripe.issue_refund`; `adminShell` adds `shell.exec` / `delete_user`
- **High** — model upgrade, benign tool add, prompt rewrite, MCP server add
- **Medium** — params / tool modify / small prompt / new agent
- **Low** — tool removed, MCP server removed
