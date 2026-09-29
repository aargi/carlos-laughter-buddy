import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { assertWorkspaceAccess } from "./access";
import { friendlyError } from "./errors";
import { isValidTimezone, nextSlot } from "./schedule";

type Ctx = { supabase: any; userId: string };

async function myWorkspace(ctx: Ctx) {
  const { data: memberships } = await ctx.supabase.from("slack_workspace_members").select("workspace_id, user_id").eq("user_id", ctx.userId);
  const m = (memberships ?? [])[0];
  if (!m) return null;
  assertWorkspaceAccess(memberships, ctx.userId, m.workspace_id);
  const { data } = await ctx.supabase.from("slack_workspaces").select("*").eq("id", m.workspace_id).maybeSingle();
  return data;
}

async function requireWs(ctx: Ctx, workspaceId: string) {
  const { data: memberships } = await ctx.supabase.from("slack_workspace_members").select("workspace_id, user_id").eq("user_id", ctx.userId);
  assertWorkspaceAccess(memberships ?? [], ctx.userId, workspaceId);
}

export const getSlackAdminState = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const ws = await myWorkspace(context as Ctx);
    if (!ws) return { connected: false as const };
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: recent } = await supabaseAdmin.from("slack_deliveries")
      .select("id, slot_at, status, is_test, last_error").eq("workspace_id", ws.id).order("slot_at", { ascending: false }).limit(10);
    const next = ws.active ? nextSlot({ timezone: ws.timezone, days: ws.days, time: ws.post_time }, new Date()) : null;
    return {
      connected: true as const,
      workspace: {
        id: ws.id as string, teamName: ws.team_name as string | null, channelId: ws.channel_id as string | null, channelName: ws.channel_name as string | null,
        timezone: ws.timezone as string, days: ws.days as number[], time: ws.post_time as string, active: ws.active as boolean,
        reconnectRequired: ws.reconnect_required as boolean, nextPost: next?.toISOString() ?? null,
      },
      recent: (recent ?? []).map((d) => ({ id: d.id, slotAt: d.slot_at, status: d.status, isTest: d.is_test, error: friendlyError(d.last_error) })),
    };
  });

export const startSlackConnect = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const clientKey = process.env['SLACK_APP_USER_CONNECTOR_CLIENT_API_KEY'];
    if (!clientKey) throw new Error("Slack is not configured yet.");
    const { authorizeAppUserOAuth } = await import("@/integrations/lovable/appUserConnector");
    const { getConnection } = await import("./connections.server");
    const { GATEWAY_BASE_URL, SLACK_SCOPES } = await import("./slack.server");
    const request = getRequest();
    const url = new URL(request.url);
    const sandboxHost = url.hostname === "localhost" ? request.headers.get("x-forwarded-host") : null;
    const returnUrl = new URL("/oauth/slack/return", sandboxHost ? `https://${sandboxHost}` : url.origin).toString();
    const existing = await getConnection(context.userId);
    const { authorizationUrl } = await authorizeAppUserOAuth({
      gatewayBaseUrl: GATEWAY_BASE_URL, connectorId: "slack", appUserId: context.userId, clientAPIKey: clientKey,
      returnUrl, connectionAPIKey: existing ?? undefined, credentialsConfiguration: { scopes: SLACK_SCOPES },
    });
    return { authorizationUrl };
  });

/** Finalizes the Lovable gateway connection with the connector's one-time code. Never talks OAuth with Slack. */
export const completeConnectorConnection = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((i: { code: string }) => z.object({ code: z.string().min(8).max(512) }).parse(i))
  .handler(async ({ data, context }) => {
    const { exchangeAppUserOAuthCode } = await import("@/integrations/lovable/appUserConnector");
    const { saveConnection } = await import("./connections.server");
    const { GATEWAY_BASE_URL, slackApi } = await import("./slack.server");
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { connectionAPIKey, connectorId } = await exchangeAppUserOAuthCode(GATEWAY_BASE_URL, data.code);
    if (connectorId !== "slack") throw new Error("Unexpected connector");
    const info = await slackApi(connectionAPIKey, "auth.test") as { team_id?: string; team?: string };
    if (!info.team_id) throw new Error("Could not identify the Slack workspace");
    const { data: existing } = await supabaseAdmin.from("slack_workspaces").select("id, owner_user_id").eq("team_id", info.team_id).maybeSingle();
    if (existing && existing.owner_user_id && existing.owner_user_id !== context.userId) {
      throw new Error("This Slack workspace is already managed by another Laughter Circle admin.");
    }
    await saveConnection(context.userId, connectionAPIKey);
    let wsId = existing?.id as string | undefined;
    if (wsId) {
      await supabaseAdmin.from("slack_workspaces").update({ team_name: info.team ?? null, owner_user_id: context.userId, reconnect_required: false, orphaned_at: null }).eq("id", wsId);
    } else {
      const { data: ins, error } = await supabaseAdmin.from("slack_workspaces").insert({ team_id: info.team_id, team_name: info.team ?? null, owner_user_id: context.userId }).select("id").single();
      if (error) throw error;
      wsId = ins.id;
    }
    await supabaseAdmin.from("slack_workspace_members").upsert({ workspace_id: wsId!, user_id: context.userId, role: "owner" }, { onConflict: "workspace_id,user_id" });
    return { ok: true, reconnected: !!existing };
  });

export const listSlackChannels = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const ws = await myWorkspace(context as Ctx);
    if (!ws) throw new Error("Connect Slack first.");
    const { getConnection } = await import("./connections.server");
    const { listMemberChannels, ReconnectRequired } = await import("./slack.server");
    const handle = await getConnection(context.userId);
    if (!handle) return { reconnectRequired: true, channels: [] };
    try { return { reconnectRequired: false, channels: await listMemberChannels(handle) }; }
    catch (e) {
      if (e instanceof ReconnectRequired) {
        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
        await supabaseAdmin.from("slack_workspaces").update({ reconnect_required: true }).eq("id", ws.id);
        return { reconnectRequired: true, channels: [] };
      }
      throw new Error(friendlyError((e as Error).message) || "Could not load channels.");
    }
  });

const settingsSchema = z.object({
  workspaceId: z.string().uuid(),
  channelId: z.string().regex(/^C[A-Z0-9]{6,}$/),
  channelName: z.string().max(80),
  timezone: z.string().refine(isValidTimezone, "Invalid time zone"),
  days: z.array(z.number().int().min(1).max(7)).length(2).refine((d) => d[0] !== d[1], "Pick two different days"),
  time: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/),
});

export const saveSlackSettings = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((i: z.infer<typeof settingsSchema>) => settingsSchema.parse(i))
  .handler(async ({ data, context }) => {
    await requireWs(context as Ctx, data.workspaceId);
    const { getConnection } = await import("./connections.server");
    const { listMemberChannels } = await import("./slack.server");
    const handle = await getConnection(context.userId);
    if (!handle) throw new Error("Slack access expired. Reconnect your workspace.");
    const channels = await listMemberChannels(handle);
    if (!channels.some((c) => c.id === data.channelId)) throw new Error("The bot isn't a member of that channel yet.");
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("slack_workspaces").update({
      channel_id: data.channelId, channel_name: data.channelName, timezone: data.timezone, days: [...data.days].sort(), post_time: data.time,
    }).eq("id", data.workspaceId);
    if (error) throw error;
    return { ok: true };
  });

export const setSlackActive = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((i: { workspaceId: string; active: boolean }) => z.object({ workspaceId: z.string().uuid(), active: z.boolean() }).parse(i))
  .handler(async ({ data, context }) => {
    await requireWs(context as Ctx, data.workspaceId);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: ws } = await supabaseAdmin.from("slack_workspaces").select("channel_id, reconnect_required").eq("id", data.workspaceId).single();
    if (data.active && !ws?.channel_id) throw new Error("Choose a channel and save the schedule first.");
    if (data.active && ws?.reconnect_required) throw new Error("Slack access expired. Reconnect your workspace.");
    await supabaseAdmin.from("slack_workspaces").update({ active: data.active }).eq("id", data.workspaceId);
    return { ok: true };
  });

export const sendSlackTest = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((i: { workspaceId: string }) => z.object({ workspaceId: z.string().uuid() }).parse(i))
  .handler(async ({ data, context }) => {
    await requireWs(context as Ctx, data.workspaceId);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { sendTestNow } = await import("./slack.server");
    const { data: ws } = await supabaseAdmin.from("slack_workspaces").select("id, owner_user_id, channel_id").eq("id", data.workspaceId).single();
    if (!ws?.channel_id) throw new Error("Choose a channel and save first.");
    const o = await sendTestNow(ws);
    if (o.kind === "sent") return { ok: true, message: "Test message sent." };
    if (o.kind === "unknown") return { ok: false, message: "Slack didn't confirm the message. Check the channel before trying again." };
    return { ok: false, message: friendlyError(o.error) || "Could not send the test." };
  });

export const getSlackStats = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((i: { workspaceId: string; days: number }) => z.object({ workspaceId: z.string().uuid(), days: z.union([z.literal(7), z.literal(30)]) }).parse(i))
  .handler(async ({ data, context }) => {
    const { data: rows, error } = await context.supabase.rpc("slack_stats", { _workspace_id: data.workspaceId, _days: data.days });
    if (error) throw new Error("Could not load stats.");
    const r = (rows?.[0] ?? {}) as Record<string, number | undefined>;
    const n = (k: string) => Number(r[k] ?? 0);
    return { opens: n("opens"), starts: n("starts"), finishes: n("finishes"), sent: n("sent"),
      testOpens: n("test_opens"), testStarts: n("test_starts"), testFinishes: n("test_finishes"), testSent: n("test_sent") };
  });

export const resolveDeliveryReview = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((i: { workspaceId: string; deliveryId: string; posted: boolean }) =>
    z.object({ workspaceId: z.string().uuid(), deliveryId: z.string().uuid(), posted: z.boolean() }).parse(i))
  .handler(async ({ data, context }) => {
    await requireWs(context as Ctx, data.workspaceId);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    await supabaseAdmin.from("slack_deliveries").update({ status: data.posted ? "sent" : "failed", last_error: data.posted ? null : "manual_review" })
      .eq("id", data.deliveryId).eq("workspace_id", data.workspaceId).eq("status", "unknown");
    return { ok: true };
  });

export const disconnectSlack = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((i: { workspaceId: string }) => z.object({ workspaceId: z.string().uuid() }).parse(i))
  .handler(async ({ data, context }) => {
    await requireWs(context as Ctx, data.workspaceId);
    const { disconnectAndErase } = await import("./slack.server");
    await disconnectAndErase(context.userId, data.workspaceId);
    return { ok: true };
  });
