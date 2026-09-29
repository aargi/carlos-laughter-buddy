// Server-only Slack logic: gateway calls, delivery posting, scheduler run.
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { appUserReconnectRequired, callAsAppUser, disconnectAppUser } from "@/integrations/lovable/appUserConnector";
import { deleteConnection, getConnection, SLACK } from "./connections.server";
import { buildLaughMessage, guideForSlot } from "./blocks";
import { classify, type Outcome } from "./errors";
import { dueSlots } from "./schedule";
import { LAUNCH_TOKEN_TTL_MS, newLaunchToken } from "./access";

export const GATEWAY_BASE_URL = "https://connector-gateway.lovable.dev";
export const SLACK_SCOPES = ["channels:read", "chat:write"];
export const PUBLIC_ORIGIN = "https://laughtercircle.com";

export class ReconnectRequired extends Error { constructor() { super("reconnect_required"); } }

export async function slackApi(handle: string, method: string, init?: { query?: Record<string, string>; body?: unknown }) {
  const qs = init?.query ? `?${new URLSearchParams(init.query)}` : "";
  const res = await callAsAppUser({
    gatewayBaseUrl: GATEWAY_BASE_URL, connectionAPIKey: handle, connectorId: SLACK,
    path: `/api/${method}${qs}`, requiredScopes: SLACK_SCOPES,
    init: init?.body !== undefined
      ? { method: "POST", body: JSON.stringify(init.body), headers: { "Content-Type": "application/json; charset=utf-8" } }
      : { method: "GET" },
  });
  if (await appUserReconnectRequired(res)) throw new ReconnectRequired();
  if (!res.ok) {
    const t = await res.text();
    console.error(`Slack gateway ${method} failed [${res.status}]: ${t}`);
    throw new Error(`Slack request failed (${res.status})`);
  }
  const body = await res.json() as { ok: boolean; error?: string } & Record<string, unknown>;
  if (!body.ok) throw new Error(body.error ?? "slack_error");
  return body;
}

/** Public channels where the bot is already a member. Never reads messages. */
export async function listMemberChannels(handle: string) {
  const out: { id: string; name: string }[] = [];
  let cursor = "";
  for (let i = 0; i < 10; i++) {
    const r = await slackApi(handle, "conversations.list", {
      query: { types: "public_channel", exclude_archived: "true", limit: "200", ...(cursor ? { cursor } : {}) },
    }) as { channels?: { id: string; name: string; is_member?: boolean }[]; response_metadata?: { next_cursor?: string } };
    for (const c of r.channels ?? []) if (c.is_member) out.push({ id: c.id, name: c.name });
    cursor = r.response_metadata?.next_cursor ?? "";
    if (!cursor) break;
  }
  return out.sort((a, b) => a.name.localeCompare(b.name));
}

type WS = { id: string; owner_user_id: string | null; channel_id: string | null };
type Delivery = { id: string; workspace_id: string; slot_at: string; is_test: boolean; attempts: number; launch_token: string };

async function postDelivery(d: Delivery, ws: WS): Promise<Outcome> {
  if (!ws.owner_user_id || !ws.channel_id) return { kind: "failed", error: "not_configured" };
  const handle = await getConnection(ws.owner_user_id);
  if (!handle) return { kind: "failed", error: "credential_expired", reconnect: true };
  const msg = buildLaughMessage({ url: `${PUBLIC_ORIGIN}/s/${d.launch_token}`, guide: guideForSlot(new Date(d.slot_at)), isTest: d.is_test });
  let res: Response;
  try {
    res = await callAsAppUser({
      gatewayBaseUrl: GATEWAY_BASE_URL, connectionAPIKey: handle, connectorId: SLACK, path: "/api/chat.postMessage",
      requiredScopes: SLACK_SCOPES,
      init: { method: "POST", body: JSON.stringify({ channel: ws.channel_id, ...msg }), headers: { "Content-Type": "application/json; charset=utf-8" }, signal: AbortSignal.timeout(15000) },
    });
  } catch (e) {
    return classify({ thrown: e instanceof Error ? e.message : String(e) }, d.attempts);
  }
  const reconnect = await appUserReconnectRequired(res);
  const body = await res.json().catch(() => null);
  return classify({ status: res.status, retryAfter: res.headers.get("retry-after"), body, credentialReconnect: reconnect }, d.attempts);
}

async function applyOutcome(d: Delivery, o: Outcome) {
  const patch: Record<string, unknown> =
    o.kind === "sent" ? { status: "sent", slack_ts: o.ts, last_error: null }
    : o.kind === "retry" ? { status: "pending", next_attempt_at: new Date(Date.now() + o.afterSeconds * 1000).toISOString(), last_error: o.error }
    : { status: o.kind, last_error: o.error };
  await supabaseAdmin.from("slack_deliveries").update(patch).eq("id", d.id).eq("status", "sending");
  if (o.kind === "failed" && o.reconnect) {
    await supabaseAdmin.from("slack_workspaces").update({ reconnect_required: true }).eq("id", d.workspace_id);
  }
}

export async function createDelivery(workspaceId: string, slotAt: Date, isTest: boolean) {
  const { data, error } = await supabaseAdmin.from("slack_deliveries").insert({
    workspace_id: workspaceId, slot_at: slotAt.toISOString(), is_test: isTest,
    launch_token: newLaunchToken(), expires_at: new Date(Date.now() + LAUNCH_TOKEN_TTL_MS).toISOString(),
  }).select("id").maybeSingle();
  if (error && error.code !== "23505") throw error; // 23505 = slot already exists
  return data?.id ?? null;
}

/** Send a test now: create + claim atomically (pending -> sending) then post. */
export async function sendTestNow(ws: WS): Promise<Outcome> {
  const id = await createDelivery(ws.id, new Date(), true);
  if (!id) return { kind: "failed", error: "duplicate_test" };
  const { data } = await supabaseAdmin.from("slack_deliveries")
    .update({ status: "sending", claimed_at: new Date().toISOString(), attempts: 1 })
    .eq("id", id).eq("status", "pending").select("*").maybeSingle();
  if (!data) return { kind: "failed", error: "claim_failed" };
  const o = await postDelivery(data as Delivery, ws);
  await applyOutcome(data as Delivery, o);
  return o;
}

export async function runScheduler(now = new Date()) {
  const summary = { created: 0, claimed: 0, sent: 0, retry: 0, failed: 0, unknown: 0, stuck: 0, purged: 0 };
  // 1. Materialize due slots (unique per workspace+slot makes this idempotent)
  const { data: wss } = await supabaseAdmin.from("slack_workspaces")
    .select("id, owner_user_id, channel_id, timezone, days, post_time")
    .eq("active", true).eq("reconnect_required", false).not("channel_id", "is", null);
  for (const w of wss ?? []) {
    for (const slot of dueSlots({ timezone: w.timezone, days: w.days, time: w.post_time }, now)) {
      if (await createDelivery(w.id, slot, false)) summary.created++;
    }
  }
  // 2. Stuck "sending" rows: outcome unknown, never re-send automatically
  const { data: stuck } = await supabaseAdmin.from("slack_deliveries")
    .update({ status: "unknown", last_error: "stuck_sending" })
    .eq("status", "sending").lt("claimed_at", new Date(now.getTime() - 10 * 60000).toISOString()).select("id");
  summary.stuck = stuck?.length ?? 0;
  // 3. Claim atomically and post
  const { data: claimed, error } = await supabaseAdmin.rpc("claim_slack_deliveries", { _limit: 25 });
  if (error) throw error;
  for (const d of (claimed ?? []) as Delivery[]) {
    summary.claimed++;
    const { data: ws } = await supabaseAdmin.from("slack_workspaces").select("id, owner_user_id, channel_id, active").eq("id", d.workspace_id).maybeSingle();
    const o: Outcome = !ws || (!ws.active && !d.is_test) ? { kind: "failed", error: "paused" } : await postDelivery(d, ws);
    await applyOutcome(d, o);
    summary[o.kind]++;
  }
  // 4. Purge anonymous events of expired links (totals are kept)
  const { data: purged } = await supabaseAdmin.rpc("purge_expired_slack_events");
  summary.purged = Number(purged ?? 0);
  // 5. Clean up workspaces orphaned by owner account deletion
  await cleanupOrphans();
  return summary;
}

async function cleanupOrphans() {
  const { data } = await supabaseAdmin.from("slack_workspaces").select("id").not("orphaned_at", "is", null);
  for (const w of data ?? []) await supabaseAdmin.from("slack_workspaces").delete().eq("id", w.id);
}

/** Revoke gateway connection and erase every row for this workspace and user handle. */
export async function disconnectAndErase(userId: string, workspaceId: string) {
  const handle = await getConnection(userId);
  if (handle) {
    try { await disconnectAppUser({ gatewayBaseUrl: GATEWAY_BASE_URL, connectionAPIKey: handle, connectorId: SLACK }); }
    catch (e) { console.error("gateway disconnect failed", e); }
  }
  await deleteConnection(userId);
  const { error } = await supabaseAdmin.from("slack_workspaces").delete().eq("id", workspaceId); // cascades members, deliveries, events
  if (error) throw error;
}
