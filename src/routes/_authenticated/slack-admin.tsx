import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { RefreshCw, Send, Pause, Play, Trash2 } from "lucide-react";
import { SlackLogo } from "@/components/SlackLogo";
import {
  completeConnectorConnection, disconnectSlack, getSlackAdminState, getSlackStats, listSlackChannels,
  resolveDeliveryReview, saveSlackSettings, sendSlackTest, setSlackActive, startSlackConnect,
} from "@/lib/slack/slack.functions";

export const Route = createFileRoute("/_authenticated/slack-admin")({
  head: () => ({
    meta: [
      { title: "Slack admin — Laughter Circle" },
      { name: "description", content: "Connect your Slack workspace and schedule two weekly Laughter Circle breaks." },
      { property: "og:title", content: "Slack admin — Laughter Circle" },
      { property: "og:description", content: "Schedule Laughter Circle breaks in your Slack workspace." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: SlackAdmin,
});

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const ZONES = typeof Intl.supportedValuesOf === "function" ? Intl.supportedValuesOf("timeZone") : ["Europe/Madrid", "UTC"];

function waitForOAuth(popup: Window) {
  return new Promise<string | null>((resolve, reject) => {
    const cleanup = () => { window.removeEventListener("message", onMsg); window.clearInterval(poll); };
    const onMsg = (e: MessageEvent) => {
      const t = e.data?.type;
      if (e.origin !== window.location.origin || e.source !== popup || e.data?.connectorId !== "slack") return;
      if (t !== "appUserConnectorOAuthComplete" && t !== "appUserConnectorOAuthFailed") return;
      cleanup();
      if (t === "appUserConnectorOAuthComplete") resolve(typeof e.data.code === "string" ? e.data.code : null);
      else reject(new Error("Slack connection failed."));
    };
    window.addEventListener("message", onMsg);
    const poll = window.setInterval(() => { if (popup.closed) { cleanup(); reject(new Error("The Slack window was closed before finishing.")); } }, 500);
  });
}

function SlackAdmin() {
  const qc = useQueryClient();
  const getState = useServerFn(getSlackAdminState);
  const state = useQuery({ queryKey: ["slack-admin"], queryFn: () => getState() });
  const [notice, setNotice] = useState<{ ok: boolean; text: string } | null>(null);
  const start = useServerFn(startSlackConnect);
  const complete = useServerFn(completeConnectorConnection);
  const [busy, setBusy] = useState(false);

  const run = async (fn: () => Promise<string | void>) => {
    setBusy(true); setNotice(null);
    try { const msg = await fn(); if (msg) setNotice({ ok: true, text: msg }); }
    catch (e) { setNotice({ ok: false, text: e instanceof Error ? e.message : "Something went wrong." }); }
    finally { setBusy(false); await qc.invalidateQueries({ queryKey: ["slack-admin"] }); }
  };

  const connect = () => run(async () => {
    const popup = window.open("", "lovable-oauth", "width=600,height=720");
    if (!popup) throw new Error("Popup blocked. Allow popups and try again.");
    let code: string | null;
    try { const { authorizationUrl } = await start(); const done = waitForOAuth(popup); popup.location.href = authorizationUrl; code = await done; }
    catch (e) { popup.close(); throw e; }
    if (!code) throw new Error("Slack didn't return a connection code.");
    const r = await complete({ data: { code } });
    return r.reconnected ? "Reconnected to Slack." : "Slack workspace connected.";
  });

  const s = state.data;
  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-3xl px-5 py-8 md:py-12">
        <Link to="/slack" className="text-sm text-muted-foreground hover:underline">← Laughter Circle for Slack</Link>
        <h1 className="mt-3 flex items-center gap-3 font-display text-3xl font-black md:text-4xl"><SlackLogo className="size-8" /> Slack admin</h1>
        <p className="mt-2 text-muted-foreground">Post two laugh breaks a week to one public channel. We never read messages or channel history.</p>

        {notice && <div role="status" className={`mt-6 rounded-2xl border p-4 text-sm ${notice.ok ? "border-calm/50 bg-calm/10" : "border-destructive/50 bg-destructive/10"}`}>{notice.text}</div>}
        {state.isError && <div className="mt-6 rounded-2xl border border-destructive/50 bg-destructive/10 p-4 text-sm">Couldn't load your Slack settings. <button className="underline" onClick={() => state.refetch()}>Try again</button></div>}
        {state.isLoading && <p className="mt-8 text-muted-foreground">Loading…</p>}

        {s && !s.connected && (
          <section className="mt-8 rounded-3xl border bg-card p-6">
            <h2 className="font-display text-xl font-black">Connect your workspace</h2>
            <p className="mt-2 text-sm text-muted-foreground">Laughter Circle asks only to see the list of public channels and to post messages.</p>
            <button disabled={busy} onClick={connect} className="mt-5 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-bold text-primary-foreground disabled:opacity-60">
              <SlackLogo className="size-4" /> Connect Slack
            </button>
          </section>
        )}

        {s && s.connected && (
          <Connected ws={s.workspace} recent={s.recent} busy={busy} run={run} onReconnect={connect} />
        )}
      </div>
    </main>
  );
}

type WS = { id: string; teamName: string | null; channelId: string | null; channelName: string | null; timezone: string; days: number[]; time: string; active: boolean; reconnectRequired: boolean; nextPost: string | null };
type Recent = { id: string; slotAt: string; status: string; isTest: boolean; error: string };

function Connected({ ws, recent, busy, run, onReconnect }: { ws: WS; recent: Recent[]; busy: boolean; run: (fn: () => Promise<string | void>) => void; onReconnect: () => void }) {
  const list = useServerFn(listSlackChannels);
  const save = useServerFn(saveSlackSettings);
  const toggle = useServerFn(setSlackActive);
  const test = useServerFn(sendSlackTest);
  const disconnect = useServerFn(disconnectSlack);
  const review = useServerFn(resolveDeliveryReview);
  const channels = useQuery({ queryKey: ["slack-channels", ws.id], queryFn: () => list(), enabled: !ws.reconnectRequired });
  const [channelId, setChannelId] = useState(ws.channelId ?? "");
  const [tz, setTz] = useState(ws.timezone);
  const [days, setDays] = useState<number[]>(ws.days);
  const [time, setTime] = useState(ws.time);
  const [confirmDelete, setConfirmDelete] = useState(false);
  useEffect(() => { setChannelId(ws.channelId ?? ""); }, [ws.channelId]);

  const toggleDay = (d: number) => setDays((cur) => cur.includes(d) ? cur.filter((x) => x !== d) : cur.length >= 2 ? [cur[1]!, d] : [...cur, d]);
  const reconnect = ws.reconnectRequired || channels.data?.reconnectRequired;

  return (
    <div className="mt-8 space-y-6">
      <section className="rounded-3xl border bg-card p-6">
        <p className="text-sm text-muted-foreground">Connected workspace</p>
        <p className="font-display text-2xl font-black">{ws.teamName ?? "Slack workspace"}</p>
        <p className="mt-1 text-sm">{ws.active ? `Active · next post ${ws.nextPost ? new Date(ws.nextPost).toLocaleString() : "—"}` : "Paused"}</p>
        {reconnect && (
          <div className="mt-4 rounded-2xl border border-destructive/50 bg-destructive/10 p-4 text-sm">
            Your Slack access needs to be renewed.
            <button disabled={busy} onClick={onReconnect} className="ml-3 rounded-full bg-primary px-4 py-1.5 font-bold text-primary-foreground">Reconnect Slack</button>
          </div>
        )}
      </section>

      <section className="rounded-3xl border bg-card p-6">
        <h2 className="font-display text-xl font-black">Channel & schedule</h2>
        <label className="mt-4 block text-sm font-semibold">Public channel
          <div className="mt-1.5 flex gap-2">
            <select value={channelId} onChange={(e) => setChannelId(e.target.value)} className="flex-1 rounded-xl border bg-background px-3 py-2.5">
              <option value="">{channels.isLoading ? "Loading channels…" : "Choose a channel"}</option>
              {channels.data?.channels.map((c) => <option key={c.id} value={c.id}>#{c.name}</option>)}
            </select>
            <button type="button" onClick={() => channels.refetch()} className="inline-flex items-center gap-1 rounded-xl border px-3 text-sm"><RefreshCw className={`size-4 ${channels.isFetching ? "animate-spin" : ""}`} /> Reload list</button>
          </div>
        </label>
        {channels.isError && <p className="mt-2 text-sm text-destructive">{(channels.error as Error).message}</p>}
        <p className="mt-2 text-xs text-muted-foreground">Only channels where the bot is a member appear. Missing yours? Open it in Slack, type <code className="rounded bg-muted px-1">/invite @LaughterCircle</code>, then press Reload list.</p>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <label className="block text-sm font-semibold">Time zone
            <select value={tz} onChange={(e) => setTz(e.target.value)} className="mt-1.5 w-full rounded-xl border bg-background px-3 py-2.5">
              {ZONES.map((z) => <option key={z}>{z}</option>)}
            </select>
          </label>
          <label className="block text-sm font-semibold">Time
            <input type="time" value={time} onChange={(e) => setTime(e.target.value)} className="mt-1.5 w-full rounded-xl border bg-background px-3 py-2" />
          </label>
        </div>
        <p className="mt-4 text-sm font-semibold">Two days a week</p>
        <div className="mt-1.5 flex flex-wrap gap-2">
          {DAYS.map((d, i) => (
            <button key={d} type="button" onClick={() => toggleDay(i + 1)} aria-pressed={days.includes(i + 1)}
              className={`rounded-full px-4 py-1.5 text-sm font-semibold ${days.includes(i + 1) ? "bg-primary text-primary-foreground" : "border"}`}>{d}</button>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap gap-2">
          <button disabled={busy || !channelId || days.length !== 2} onClick={() => run(async () => {
            const name = channels.data?.channels.find((c) => c.id === channelId)?.name ?? "";
            await save({ data: { workspaceId: ws.id, channelId, channelName: name, timezone: tz, days, time } });
            return "Schedule saved.";
          })} className="rounded-full bg-primary px-5 py-2.5 font-bold text-primary-foreground disabled:opacity-50">Save</button>
          <button disabled={busy || !ws.channelId} onClick={() => run(async () => {
            const r = await test({ data: { workspaceId: ws.id } }); if (!r.ok) throw new Error(r.message); return r.message;
          })} className="inline-flex items-center gap-2 rounded-full border px-5 py-2.5 font-semibold disabled:opacity-50"><Send className="size-4" /> Send test message</button>
          <button disabled={busy} onClick={() => run(async () => { await toggle({ data: { workspaceId: ws.id, active: !ws.active } }); return ws.active ? "Weekly posts paused." : "Weekly posts activated."; })}
            className="inline-flex items-center gap-2 rounded-full border px-5 py-2.5 font-semibold">{ws.active ? <><Pause className="size-4" /> Pause</> : <><Play className="size-4" /> Activate</>}</button>
        </div>
      </section>

      <Stats workspaceId={ws.id} />

      {recent.length > 0 && (
        <section className="rounded-3xl border bg-card p-6">
          <h2 className="font-display text-xl font-black">Recent posts</h2>
          <ul className="mt-3 divide-y text-sm">
            {recent.map((d) => (
              <li key={d.id} className="flex flex-wrap items-center justify-between gap-2 py-2">
                <span>{new Date(d.slotAt).toLocaleString()} {d.isTest && <span className="text-muted-foreground">(test)</span>}</span>
                <span className="flex items-center gap-2">
                  <span className="rounded-full bg-muted px-2 py-0.5 text-xs font-semibold uppercase">{d.status}</span>
                  {d.status === "unknown" && <>
                    <span className="text-xs text-muted-foreground">Slack didn't confirm — did it appear?</span>
                    <button className="text-xs underline" onClick={() => run(async () => { await review({ data: { workspaceId: ws.id, deliveryId: d.id, posted: true } }); })}>Yes</button>
                    <button className="text-xs underline" onClick={() => run(async () => { await review({ data: { workspaceId: ws.id, deliveryId: d.id, posted: false } }); })}>No</button>
                  </>}
                </span>
                {d.error && <p className="w-full text-xs text-destructive">{d.error}</p>}
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="rounded-3xl border border-destructive/40 p-6">
        <h2 className="font-display text-xl font-black">Disconnect & delete data</h2>
        <p className="mt-2 text-sm text-muted-foreground">Revokes Laughter Circle's access to your Slack workspace and permanently deletes its settings, posts history and statistics.</p>
        {!confirmDelete ? (
          <button onClick={() => setConfirmDelete(true)} className="mt-4 inline-flex items-center gap-2 rounded-full border border-destructive px-5 py-2.5 font-semibold text-destructive"><Trash2 className="size-4" /> Disconnect</button>
        ) : (
          <div className="mt-4 flex gap-2">
            <button disabled={busy} onClick={() => run(async () => { await disconnect({ data: { workspaceId: ws.id } }); return "Disconnected. All workspace data was deleted."; })}
              className="rounded-full bg-destructive px-5 py-2.5 font-bold text-destructive-foreground">Yes, delete everything</button>
            <button onClick={() => setConfirmDelete(false)} className="rounded-full border px-5 py-2.5">Cancel</button>
          </div>
        )}
      </section>
    </div>
  );
}

function Stats({ workspaceId }: { workspaceId: string }) {
  const [days, setDays] = useState<7 | 30>(7);
  const fn = useServerFn(getSlackStats);
  const q = useQuery({ queryKey: ["slack-stats", workspaceId, days], queryFn: () => fn({ data: { workspaceId, days } }) });
  return (
    <section className="rounded-3xl border bg-card p-6">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-xl font-black">Team totals</h2>
        <div className="flex gap-1 text-sm">{([7, 30] as const).map((d) => <button key={d} onClick={() => setDays(d)} className={`rounded-full px-3 py-1 ${days === d ? "bg-primary text-primary-foreground" : "border"}`}>{d} days</button>)}</div>
      </div>
      {q.isError ? <p className="mt-3 text-sm text-destructive">Couldn't load statistics.</p> : (
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[["Posts sent", q.data?.sent], ["Estimated opens", q.data?.opens], ["Sessions started", q.data?.starts], ["Sessions finished", q.data?.finishes]].map(([l, v]) => (
            <div key={l as string} className="rounded-2xl bg-background/40 p-4"><p className="font-display text-3xl font-black">{v ?? "—"}</p><p className="text-xs text-muted-foreground">{l}</p></div>
          ))}
        </div>
      )}
      {!!q.data?.testSent && (
        <p className="mt-3 text-sm text-muted-foreground">Test messages (not in team totals): {q.data.testSent} sent · {q.data.testOpens} opens · {q.data.testStarts} started · {q.data.testFinishes} finished</p>
      )}
      <p className="mt-3 text-xs text-muted-foreground">Totals only, never who joined. Opens are estimated: some company link scanners open links automatically.</p>
    </section>
  );
}
