# koreka-demo-agents

Public rehearsal repository for [Koreka](https://purpleailabs.com) demos.

Connect this repo in Koreka, scan once (baseline), push the prepared risky commit, rescan, and review the critical change on the refund agent.

## Agents

| Agent | Path | Framework |
| --- | --- | --- |
| `supportTriage` | `src/agents/support-triage.ts` | Vercel AI SDK |
| `refundAgent` | `src/agents/refund-agent.ts` | Vercel AI SDK |

Sources are for **static analysis only** — do not install dependencies or run the agents.

## Demo loop

From the Koreka monorepo (after this repo is published):

```bash
# restore baseline on the remote (safe to re-run)
pnpm demo:reset

# connect + scan in Koreka UI → both agents appear

# push the prepared risky commit (adds stripe.issue_refund, drops approval note)
pnpm demo:push-risky

# rescan in Koreka → refundAgent change at RISK: CRITICAL
```

## Risky change

Relative to baseline, `src/agents/refund-agent.ts`:

1. Adds tool `stripe.issue_refund` (destructive keyword `refund` → critical)
2. Rewrites the system prompt to remove the human-approval constraint
