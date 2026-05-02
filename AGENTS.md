# AGENTS.md — Mission Control Operator Handbook

This handbook lives next to the Mission Control dashboard at
`/root/mission-control/AGENTS.md` for proximity to the system it operates.
It federates the workspace operating protocol from
`/root/.openclaw/workspace/AGENTS.md` and adds three Mission-Control-specific
sections at the bottom:

1. **Current architecture** — cron + MC dashboard, not continuous OpenClaw
2. **Writing to Mission Control** — the integration contract for any agent
   or script that puts data into the dashboard's database
3. **Reconnection roadmap** — which agents get scheduled work back, in
   what order, and why
4. **Observability appendix** — what we measure on this fleet, the
   "would-be-nice" panels, and how we'd build them when the time comes

The federation rule: when the workspace `AGENTS.md` changes, this file's
**Part I** (the federated section) needs to be re-synced. Parts II–V are
local to Mission Control.

---

# Part I — Workspace Operating Protocol

*Federated from `/root/.openclaw/workspace/AGENTS.md` (current short version).
Last sync: 2026-04-25. Source-of-truth lives in the workspace; sync this
file when the workspace version changes.*

## Session Startup

1. Run `/root/scripts/load_protocols.sh`
2. Read `SOUL.md`, `USER.md`, `TOOLS.md` (Capabilities Manifest section)
3. Read `memory/HANDOFF.md` for instant orientation
4. Read `memory/YYYY-MM-DD.md` (today + yesterday)
5. If main session: read `MEMORY.md`

## Check First, Ask Second (NON-NEGOTIABLE)

Before asking "Do we have X?" → CHECK filesystem, credentials, env vars,
memory files, installed tools. Only ask if genuinely missing.

## Memory

### 30-Minute Checkpoints (NON-NEGOTIABLE)

Every ~30 min of active conversation: write summary to
`memory/YYYY-MM-DD.md`. Check token usage. If >100k, note it.

### Outcome Storage (NON-NEGOTIABLE)

After EVERY completed action or pending task, store to 0Latency immediately:

```bash
/root/.openclaw/workspace/skills/0latency-memory/store.sh \
  "question" "COMPLETED/PENDING/CONFIRMED: details (Date)"
```

### Write Protocol

- Memory is limited — WRITE IT TO A FILE, not "mental notes"
- "Remember this" → write BEFORE responding
- Person mentioned with context → write to `KEY_PEOPLE.md`
- Decision → daily notes + decision log
- TODO → task tracker

### MEMORY.md

ONLY load in main session. Not in shared/group contexts.

## Compaction Protocol (NON-NEGOTIABLE)

**Pre-Compaction:** Flush to 0Latency → write handoff to
`/tmp/last_handoff.txt` → compact (auto)

**Post-Compaction:** Recall from 0Latency → read `/tmp/last_handoff.txt` →
respond directly. NO RESET LANGUAGE.

## Delegation (NON-NEGOTIABLE)

Main session = conversation + coordination ONLY.

**Must delegate:** >2 files, web fetches, research, code >50 lines, >30 sec
tasks, multi-step debugging, batch ops.

**Acknowledge-first:** Respond within 1 tool call. NEVER >2 tool calls
before first reply.

**Token awareness:** <80k normal. 80–120k aggressive delegation. 120k+
EMERGENCY — zero inline, checkpoint immediately.

**Inline only:** Read 1–2 small files, quick commands, messages, spawning
agents, checkpoints.

## Planning (NON-NEGOTIABLE)

Never build without a plan for: Opus calls, >3 files, >2 APIs, >100 LOC,
complex integrations, >30 min tasks.

Template: Objective → Requirements → Dependencies → Architecture → Risks →
Steps → Verification → Estimate.

## Red Lines

- **STOP MEANS STOP** — halt immediately, no exceptions.
- No data exfiltration. `trash` > `rm`. When in doubt, ask.
- **Ask first:** emails, tweets, public posts, anything leaving the machine.
- **Safe freely:** read files, explore, organize, search web, work in
  workspace.

## Group Chats

Don't share the human's stuff. Respond when: mentioned, can add value, witty
fit, correcting misinfo. Stay silent when: banter, already answered, nothing
to add.

## Platform Formatting

- Discord/WhatsApp: no markdown tables, use bullet lists
- Discord: wrap links in `<>` to suppress embeds
- WhatsApp: no headers, use **bold** or CAPS

## Heartbeats

Use heartbeats productively. Check `HEARTBEAT.md` and follow it. Track
checks in `memory/heartbeat-state.json`.

**Reach out when:** Important email, calendar <2h, interesting finding, >8h
since contact.
**Stay quiet:** Late night (23:00–08:00) unless urgent, nothing new,
checked <30 min ago.

## 0Latency Memory Integration (NON-NEGOTIABLE)

### Auto-Store After Every Response Containing
Strategic decisions, commitments, plans, people info, config changes. Run
`store.sh` BEFORE moving to the next topic.

### 30-Min Hard Checkpoint
1. Write to `memory/YYYY-MM-DD.md`
2. Store to 0Latency API
3. Update `HANDOFF.md` if strategic
4. Check token usage

### Recall

```bash
/root/.openclaw/workspace/skills/0latency-memory/recall.sh "query"
```

### Error Handling

API fail → continue, log to `/tmp/0latency-logs/`. Rate limit unlikely
(10K/min). Latency <100ms.

## Multi-Agent Memory (NON-NEGOTIABLE)

**Namespaces:** thomas, wall-e, steve, scout, reed, atlas, sheila, lance

**Rules:**
- Each agent writes to own namespace only
- Thomas recalls: own namespace first → if similarity <0.6, cross-agent
  search → cite source
- Each fact lives in ONE namespace. Cross-reference, don't copy.

---

# Part II — Current Architecture

The fleet does not run as one always-on OpenClaw orchestration. The current
shape is **cron + Mission Control dashboard**, with agents spawned as
short-lived processes when their schedule triggers them.

## The two-loop model

**Loop 1: Scheduled work (cron)**
Cron entries spawn agent scripts on a fixed cadence. The agent script
reads its inputs, does its work, writes outputs to its own directory and to
the Mission Control database, exits. No persistent process.

**Loop 2: Operator-driven work (Mission Control dashboard)**
Justin (or Thomas) opens the dashboard at `localhost:3000`, reviews state,
queues a one-shot task, approves a draft, kills a runaway process. The
dashboard reads from the same database the agents write to.

This is deliberately the opposite of "always-on agents." Always-on agents
in OpenClaw burned API budget and produced more noise than signal. The
cron-plus-dashboard model is what survived the March cost-control episode
that put Thomas in manual-only mode.

## What's actually running today

See `/root/README.md` for the full systemd/cron/PM2 inventory. The relevant
subset for this handbook:

- `memory-api.service` — the API the agents and dashboard both talk to
  (port 8420, localhost only)
- `pm2-root` → `mission-control` — the Next.js dashboard (port 3000)
- `cron` — currently runs `canary.sh` every 15 min and the
  `rollup_tenant_usage.py` daily rollup at 1 AM. **Most agent crons are
  not currently active** — see "Reconnection roadmap" below.

## Trust and verification

The first rule of operating this fleet: **agent self-reports cannot be
trusted without independent verification.** When an agent says "task
complete," verify against the database or a direct endpoint check. This
rule was learned the hard way (see
`GAP-ANALYSIS-STRATEGIC-MEMORY-FAILURE.md`).

In practice this means the dashboard should display the database's view
of state, not the agent's narrative. If an agent says it sent an email,
the dashboard should show "1 email sent at 14:22:03 UTC, message-id
`<...>`," not "✅ done."

## Layering relative to 0Latency the product

0Latency the product is the memory layer for the fleet. Agents store
to and recall from 0Latency for shared knowledge. The Mission Control
database holds operational state — task queue, schedules, decisions,
inbox — that doesn't belong in 0Latency. **Don't mix them:** durable
knowledge → 0Latency. Short-lived ops state → Mission Control DB.

---

# Part III — Writing to Mission Control

If you are an agent, a script, or a human writing data into the Mission
Control dashboard, this is the contract. Follow it so the dashboard stays
coherent.

## Database

All state lives in Mission Control's local database (Postgres in the
existing `/root/mission-control/` Next.js app, or SQLite for any new
local-only tooling). Schema names below are the conceptual contract; the
actual table names should match what's in the Next.js app's migrations.
**`[VERIFY]` against `/root/mission-control/src/` before writing your
first migration.**

## Tasks

A task is a discrete unit of work either queued by a human, queued by a
schedule, or surfaced by an agent for human review.

**Required fields when inserting a task:**

- `title` — short imperative, ~60 chars max ("Send Sheila digest to Justin")
- `description` — full context, can be long
- `origin` — see "Origin conventions" below
- `project` — `0latency` | `pfl` | `startup-smartup` | `infra` | `personal`
- `status` — `pending` | `awaiting_approval` | `running` | `done` | `failed` | `cancelled`
- `priority` — `low` | `normal` | `high` | `urgent`
- `created_at` — ISO 8601 UTC

**Optional but recommended:**

- `assigned_skill` — the skill that should execute it
- `model` — model override (`claude-opus-4-7`, `claude-sonnet-4-6`, etc.)
- `requires_approval` — boolean
- `risk_level` — `low` | `medium` | `high`
- `dry_run` — boolean

## Origin conventions

The `origin` field tells the dashboard where a task came from. Use these
exact strings:

- `human:dashboard` — queued via the dashboard UI
- `human:telegram` — queued via Telegram message to Thomas
- `human:cli` — queued from a terminal
- `agent:<name>` — surfaced by an agent for human review (e.g.,
  `agent:loop`, `agent:scout`)
- `schedule:<schedule_id>` — materialized by the scheduler
- `system:<reason>` — created by the system itself (e.g.,
  `system:health-check-failed`, `system:rate-limit-recovery`)

## Activity log

Append-only event stream. Anything noteworthy that happens — agents
writing, schedules firing, humans approving, errors raised — gets a row.

**Required fields:**

- `event_type` — see below for the standard set
- `actor` — same shape as `origin` (`agent:loop`, `human:dashboard`, etc.)
- `detail` — short human-readable summary
- `metadata` — JSON, free-form, for structured detail
- `created_at` — ISO 8601 UTC

**Standard event types:**

- `task_queued`, `task_started`, `task_completed`, `task_failed`,
  `task_cancelled`, `task_approved`
- `schedule_created`, `schedule_fired`, `schedule_disabled`
- `agent_heartbeat` — agent reports it ran (use sparingly; don't spam)
- `agent_alert` — agent surfaced something for review
- `decision_requested`, `decision_answered`
- `inbox_message` — agent-to-human or human-to-agent
- `health_check_pass`, `health_check_fail`

If you need a new event type, add it here first, then write to it. Events
should describe **what happened**, not **what the agent thought about
what happened**.

## Project taxonomy

Use exactly these strings for the `project` field on tasks, alerts, and
metrics:

- `0latency` — the API, MCP server, SDKs, Chrome extension, website,
  contribution reviewer, anything in the product surface
- `pfl` — PFL Academy: state outreach, RFPs, lead pipelines, Scout/Shea
  work
- `startup-smartup` — Startup Smartup: Sheila/Nellie work, Explore,
  Pioneer, Launchpad
- `infra` — server health, agent infrastructure, the dashboard itself,
  cron jobs, anything operational that isn't venture-specific
- `personal` — Justin's personal calendar/email/TODOs that aren't part of
  a venture

Anything that doesn't fit one of these is probably an `infra` task or
needs the taxonomy expanded — discuss before adding new project values.

## Read paths

Agents that *read* from Mission Control (e.g., to check what's pending)
should hit the dashboard's API rather than touching the database
directly. The dashboard owns the schema; agents own their domain. Direct
DB writes are tolerated for now because the schema is small, but bias
toward an HTTP API as the surface area grows.

---

# Part IV — Reconnection Roadmap

Most agents are dormant. Reconnecting them is a deliberate exercise, not a
big-bang. Order matters: the cheap, high-value, lowest-risk agents come
back first; the expensive or noisy ones come last and only after there's
a dashboard view to keep them honest.

## Order of reconnection

**Stage 1 — Wall-E (memory extraction).** No external API spend, runs
locally against the agent directories and the 0Latency API. Reconnect
first because the rest of the fleet's outputs go stale without it. Cron
cadence: every 4 hours during waking hours. Verify it shows up in the
dashboard activity log before moving on.

**Stage 2 — Atlas (metrics).** Sunday-night snapshot, Monday-morning
briefing. Cheap to run. Outputs feed the dashboard's metrics view.
Reconnect once the dashboard has somewhere to display them.

**Stage 3 — Loop (0Latency intelligence).** Two-hour cadence is fine;
once-per-day cadence is the safer reconnection point. Loop's value is
direct (catches launches, threads, competitor moves), but it's also the
agent most prone to noise. Reconnect with a strict alert-format
contract and a `requires_approval` gate on anything outbound.

**Stage 4 — Lance (0Latency execution).** Only after Loop is producing
reviewable alerts. Lance executes; without quality input from Loop, it
executes badly. Keep `requires_approval=true` on every Lance task for
the first two weeks.

**Stage 5 — Scout + Shea (PFL).** Defer until PFL re-prioritizes. The
pipelines are warm — 250 contacts staged, the syntax bug from April 5
is fixed — but firing them up while 0Latency is the priority distracts
without benefit.

**Stage 6 — Sheila + Nellie (Startup Smartup).** Defer indefinitely
unless Startup Smartup re-prioritizes.

**Steve and Reed remain unscheduled.** Their directories are empty;
their roles aren't currently load-bearing. Keep the namespaces reserved
in 0Latency but don't reconnect.

## Reconnection checklist (per agent)

Before flipping the cron job back on:

1. **Read the agent's directory** — confirm scripts haven't bitrotted.
   Re-read `OPERATING-PROTOCOL.md` if present.
2. **Dry-run once** — run the script manually with a `--dry-run` flag
   if it has one, otherwise inspect outputs without writing.
3. **Verify writes against the contract** — does it write to Mission
   Control with the right `origin`, `project`, and event types?
4. **Check the cost envelope** — estimate API calls per scheduled run.
   Anything over $1/run goes through Justin first.
5. **Add the cron entry** — and add a corresponding entry in the
   dashboard's "expected schedule" view so a missed run is visible.
6. **Watch for two cycles** — don't walk away after one successful run.
   Two consecutive clean runs is the bar for "back online."

## When NOT to reconnect

- Any agent whose outputs you cannot personally review at its scheduled
  cadence — if Loop runs every 2 hours but you only check the dashboard
  once a day, slow Loop down to once a day.
- Any agent whose value isn't legible to you. If you can't articulate
  what an agent earned this week, it shouldn't be running.
- Any agent that requires a fresh strategic decision to operate well.
  Decide first, agent second.

---

# Part V — Observability Appendix (scope, not yet built)

This section captures the observability scope inspired by the
"build-your-own-dashboard" video, adapted for our server-side reality.
**This is a roadmap, not a current capability.** Defer the build until
after CP6 and CP8 ship — Mem0 isn't winning on dashboards, they're
winning on synthesis quality.

## What we'd measure

The four metrics that actually matter for our setup:

**1. Per-agent token spend.**
Daily breakdown of token consumption by agent, with cost in USD. The
"Thomas runaway cost" episode would have been visible an hour in instead
of a day in. Source: agent run logs writing to a `usage_events` table
keyed on agent + model + token counts.

**2. MCP tool latency on our own server.**
We ship an MCP server. Customers will measure its p50/p95 per tool and
compare us to Mem0/Zep. We should be measuring our own first, against
our own usage. p50/p95/error-rate per tool, broken down per agent
caller. Dogfood metric: any tool whose p95 climbs past its budget gets
attention before a customer reports it.

**3. Skill cost-per-run.**
For each skill in `/root/.openclaw/workspace/skills/`, track total token
cost across runs and average cost per invocation. A skill that costs
$0.50 every time Wall-E polls is a different problem than a skill that
costs $0.005. Without this metric, optimization is guesswork.

**4. Health checks (deterministic, no LLM).**
A `mc doctor` script that exits non-zero on any of:
- `memory-api.service` not running
- `0latency-mcp.service` not running
- `mission-control` PM2 process not running
- `redis-server` unreachable
- 0Latency API returning non-200 on `/health`
- MCP SSE endpoint not responding to keepalive
- Last cron heartbeat older than its expected cadence
- Disk usage on `/` over 80%
- `pg_dump` of mission-control DB hasn't run in 24h (when backups exist)

This consolidates the existing `canary.sh`, `pipeline_health_check.sh`,
`memory_health_check.sh`, and `0latency-full-health-check.sh` into one
exit code. The existing scripts can keep running; `mc doctor` calls them
and aggregates.

## What we're NOT taking from the video

The video's premise — "ditch named agents, just use skills" — does not
apply. Our agent identities are part of the product (provenance for
synthesis, role-scoped memory, audit). We keep the fleet shape.

The video's local-Mac SQLite + Python/FastAPI stack does not apply. We
are server-side with Postgres already. New observability tables go into
the existing database.

The video's 33-panel dashboard scope does not apply. Most of those
panels are for one developer debugging one IDE's session history. Our
dashboard's job is showing 10 agents' state and the venture pipelines.

## Build trigger

When **two of three** are true, scope a sprint to build the
observability layer:

- 0Latency at $5K MRR (we have customers; latency matters reputationally)
- CP8 (synthesis) shipped
- A second cost-control episode happens (one is anecdote, two is a
  pattern we need data for)

Until then, this section sits here as the placeholder. Don't build it
ahead of demand.

---

# Maintenance

- **Part I sync:** when the workspace `AGENTS.md` changes, update Part I
  here and bump the sync date.
- **Part II–III:** update when architecture or the integration contract
  changes. Always bump version on contract changes; agents may be
  reading against a specific version.
- **Part IV:** update as agents are reconnected. Move them out of the
  "dormant" lists in `/root/README.md` at the same time.
- **Part V:** update when the observability layer actually starts
  getting built. Until then, leave it.

When in doubt: this file is for operating the fleet. The product README
lives in the GitHub repo. Don't conflate the two.
