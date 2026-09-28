# Laughter Circle for Slack — distributable version

## Before building (blocker)
No Slack OAuth client is registered in this workspace yet. A workspace admin must create one in **Workspace settings → App User Connectors → Slack** using our own Slack app (api.slack.com/apps), with redirect URL `https://connector-gateway.lovable.dev/api/v1/app-users/oauth2/callback` and **offline access enabled**. Then it gets linked to this project from a card in chat.

## What the admin will be able to do (new page `/slack/admin`, sign-in required)
1. **Connect Slack workspace** (popup, Slack consent screen).
2. **Pick a public channel** from a list.
3. **Schedule**: time zone, two weekdays, a time (e.g. Tue + Thu, 10:00 Europe/Madrid).
4. **Send test message** to the chosen channel.
5. **Activate / Pause** the two weekly posts.
6. **Stats**: only totals — opens, sessions started, sessions finished (last 7 / 30 days). No names, no per-person data.
7. **Disconnect & delete data**: revokes the Slack connection and erases all settings and stats for that workspace.

Clear error messages for: Slack not connected, access expired (Reconnect button), channel archived/not found, missing permission, Slack rate limit.

## The Slack post
Block Kit message: title, short invitation line with the guide of the day, and a **"Start laughing"** URL button opening `laughtercircle.com/?src=slack&w=<token>` so opens and sessions are counted per workspace without identifying people.

## Privacy
- Slack permissions requested: `channels:read` (list public channels), `chat:write`, `chat:write.public` (post without joining). Nothing that reads messages or history.
- All Slack keys and calls stay on the server; the browser never sees them.

## Technical details
- Connector: App User Connector `slack`, bot scopes above; helpers `src/integrations/lovable/appUserConnector.ts`, encrypted `app_user_connections` storage (AES-GCM, `APP_USER_CONNECTION_KEY_SECRET`).
- Tables (RLS, grants, service-role only for secrets):
  - `slack_workspaces` (id, team_id unique, team_name, owner_user_id, channel_id/name, timezone, days int[2], time, active, last_post_at, public_token, reconnect_required). Owner-only select/update via RLS.
  - `slack_events` (workspace_id, kind: open|start|finish, created_at) — insert via public endpoint validated by token; no select for clients; aggregates via `security definer` function `slack_stats(workspace_id)` that checks ownership.
- Server functions (`src/lib/slack.functions.ts`, `requireSupabaseAuth`): startConnect, completeConnection (exchange code, call `auth.test` to get team_id, upsert workspace), listChannels, saveSchedule, sendTest, setActive, getStats, disconnectAndDelete. Every query scoped by `owner_user_id = userId` AND workspace id → strict tenant isolation.
- Scheduler: pg_cron every 5 min → `POST /api/public/slack/cron` (verified with `LOVABLE_CRON_SECRET`), picks due workspaces with pure function `isDue(schedule, now, lastPostAt)` (Intl time-zone math, DST-safe, one post per slot).
- Tracking endpoint `/api/public/slack/track` (zod, token lookup, kind enum); home page sends open on `?src=slack`, start/finish from the session flow.
- Tests (vitest): `isDue`/next-run across time zones (Madrid, New York, Tokyo, Kathmandu +5:45), DST transitions, weekday boundaries; Block Kit builder; tenant isolation with two mocked workspaces (A cannot read/update/send/delete B); error mapping (`not_in_channel`, `channel_not_found`, `ratelimited`, credential 401 → reconnect).
- This stack uses server functions instead of Edge Functions, so the "Edge Function tests" become tests of the server handlers and cron endpoint.
- Before publishing: run all tests, then the Deep Security Scan, and fix findings.
