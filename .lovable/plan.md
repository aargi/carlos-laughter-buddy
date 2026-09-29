# Laughter Circle for Slack — distributable version (revised)

## Stack check (confirmed)
- The project is **TanStack Start** (not a Vite SPA). Server functions and server routes run in production on the published site. No Edge Functions exist and none will be created.
- Scheduled work: Lovable's native scheduled jobs call an HTTP route on the app, authenticated with the platform-managed `LOVABLE_CRON_SECRET` (bearer header, deny by default). A job cannot call a server function without HTTP, so one protected route is required (see Scheduler).

## Before building (blocker)
No Slack App User Connector client exists in this workspace. A workspace admin creates it in **Workspace settings → App User Connectors → Slack** with our own Slack app, redirect URL `https://connector-gateway.lovable.dev/api/v1/app-users/oauth2/callback`, bot scopes `channels:read` + `chat:write`, and **offline access enabled**. I then link it to the project from a chat card.

## Admin experience (`/slack/admin`, sign-in required)
1. **Connect Slack** (popup; the connector gateway handles OAuth and keeps/refreshes Slack tokens).
2. **Channel**: list of public channels where the bot is already a member. If the wanted channel is missing: "In Slack, open the channel and type `/invite @LaughterCircle`, then press Reload list."
3. **Schedule**: time zone, two weekdays, one time.
4. **Send test message**.
5. **Activate / Pause**.
6. **Stats** (aggregate only): opens, sessions started, sessions finished — last 7 / 30 days.
7. **Disconnect & delete data**: revokes the connection at the gateway and erases settings, deliveries and stats for the workspace.
Clear errors: not connected, access expired (Reconnect), bot not in channel, channel archived, rate limited, Slack down.

## Slack post
Block Kit: title, one-line invite with guide of the day, **Start laughing** URL button to `https://laughtercircle.com/s/<launch_token>`.

## Credentials (no Slack tokens in our database)
- OAuth, token storage and refresh are done only by the Lovable connector gateway. No direct Slack OAuth exchange, no access/refresh tokens stored by us, no custom token encryption.
- The gateway returns an opaque connection handle (`lovack_…`). This is the only thing the app keeps, server-side, per workspace, so the scheduler can post without the admin present. It is stored with the platform-provided at-rest helper required by the connector (key auto-provisioned by Lovable, not ours), unreadable from the browser or by other tenants.
- All Slack calls: server-side through the gateway (`callAsAppUser`, connector `slack`). Nothing reaches the browser.
- No reading of messages or history; `conversations.list` (public channels, `is_member` filter) and `chat.postMessage` only.

## Launch links and tracking
- Each delivery gets a random, single-purpose `launch_token` (32 bytes, url-safe), expiring after 7 days. No workspace/channel IDs in the URL.
- `/s/<launch_token>` resolves server-side to the delivery, records `open`, then opens the session with an internal reference.
- Anonymous browser id (random UUID in localStorage, no names or profiles) dedupes `open`, `start`, `finish` per delivery via a unique constraint.

## Deliveries and scheduler
- `slack_deliveries`: workspace_id, slot_at (UTC instant of the scheduled slot), status `pending | sending | sent | failed`, attempts, next_attempt_at, last_error, slack_ts, launch_token, expires_at. **Unique (workspace_id, slot_at)**.
- Every 15 minutes the job: computes due slots (pure `dueSlots(schedule, now)`, DST-safe), inserts `pending` rows with `ON CONFLICT DO NOTHING`, then **claims** rows atomically (`UPDATE … SET status='sending' … WHERE id IN (SELECT … FOR UPDATE SKIP LOCKED)` in a database function) before posting. Overlapping runs cannot claim the same row.
- Retries: transient errors (rate limit, 5xx) → back to `pending` with backoff (max 3 attempts, honoring Slack's Retry-After); permanent errors (not in channel, archived, credential expired) → `failed`, surfaced to the admin. A `sending` row stuck >10 min is marked failed rather than re-sent, to never duplicate.
- Scheduler route `/api/public/slack/scheduler`: POST only, bearer `LOVABLE_CRON_SECRET` checked first, everything else rejected. Lovable has no built-in request rate limiter; the route is idempotent and a cheap per-minute guard in the database (skip if last run < 60 s ago) protects it.

## Technical details
- Tables (RLS + grants in the same migration): `slack_workspaces` (team_id unique, team_name, owner_user_id, channel, timezone, days, time, active, reconnect_required), `app_user_connections` (service-role only), `slack_deliveries` (service-role only), `slack_events` (delivery_id, kind, browser_id, unique(delivery_id, kind, browser_id); service-role only). Owner reads settings via RLS; stats via security-definer `slack_stats(workspace_id)` that checks ownership and returns counts only.
- Server functions (`src/lib/slack.functions.ts`, `requireSupabaseAuth`): startConnect, completeConnectorConnection (only finalizes the gateway connection with the connector's one-time code; never talks OAuth with Slack, never sees or logs Slack tokens; then `auth.test` via gateway for team id), listChannels, saveSchedule, sendTest, setActive, getStats, disconnectAndDelete. Every query filtered by owner and workspace.
- Public tracking server function for start/finish (zod: launch reference, kind, browser id), inserts only.
- Tests (vitest): time zones (Madrid, New York, Tokyo, Kathmandu), DST switches, weekday edges, no double slot; claim logic under two concurrent runs; retry/failed classification; Block Kit builder; token expiry; tenant isolation with two workspaces (A cannot read, edit, post, see stats or delete B); scheduler route rejects missing/wrong secret.
- Before publishing: frontend tests, server tests (in place of Edge Function tests, since none exist), Deep Security Scan, fix findings.

## Approved changes (v3)
- Browser id: temporary technical id in **sessionStorage**, one per browser session, used only to dedupe a delivery's events. Events are deleted when their launch token expires.
- `open` is recorded from the client after the page loads (not on the link GET) and shown as **estimated opens** (corporate link scanners may visit links).
- Idempotency: Slack `chat.postMessage` has no documented idempotency key (`client_msg_id` is not supported for bots), so ambiguous outcomes (timeouts, disconnects, 5xx after send) are **never auto-retried**: status `unknown`, flagged for manual review in the admin page. Auto-retry only unambiguous safe errors (`ratelimited` honoring Retry-After, gateway rejections before reaching Slack). States: pending, sending, sent, failed, unknown.
- Every Block Kit message includes a full top-level `text` fallback.
- One owner per workspace for the MVP (documented limitation). Table `slack_workspace_members` (workspace_id, user_id, role) created now, owner row inserted on connect, access checks go through it so more admins can be added later.
- If the owner deletes their account: cascade removes their membership; a trigger pauses the workspace and a cleanup revokes the gateway connection and deletes settings, deliveries and events when no admin remains.
