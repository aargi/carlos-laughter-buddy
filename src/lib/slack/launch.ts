// Browser-side helpers for Slack launch links. Temporary technical id in sessionStorage only.
const TOKEN_KEY = "lc-slack-launch";
const BID_KEY = "lc-slack-bid";

export function sessionBrowserId(): string {
  let id = sessionStorage.getItem(BID_KEY);
  if (!id) { id = crypto.randomUUID(); sessionStorage.setItem(BID_KEY, id); }
  return id;
}
export const setLaunchToken = (t: string) => sessionStorage.setItem(TOKEN_KEY, t);
export const getLaunchToken = () => (typeof window === "undefined" ? null : sessionStorage.getItem(TOKEN_KEY));

export async function trackLaunch(kind: "open" | "start" | "finish") {
  const token = getLaunchToken();
  if (!token) return;
  try {
    const { trackSlackEvent } = await import("./track.functions");
    await trackSlackEvent({ data: { token, kind, browserId: sessionBrowserId() } });
  } catch { /* tracking must never break the session */ }
}
