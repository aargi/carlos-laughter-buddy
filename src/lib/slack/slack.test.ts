import { describe, expect, it } from "vitest";
import { dueSlots, nextSlot, zonedToUtc, isValidTimezone } from "./schedule";
import { classify, MAX_ATTEMPTS } from "./errors";
import { buildLaughMessage } from "./blocks";
import { assertWorkspaceAccess, isLaunchTokenShape, newLaunchToken } from "./access";

const iso = (d: Date) => d.toISOString();

describe("time zones", () => {
  it("Madrid summer (UTC+2) and winter (UTC+1)", () => {
    expect(iso(new Date(zonedToUtc(2026, 7, 7, 10, 0, "Europe/Madrid")))).toBe("2026-07-07T08:00:00.000Z");
    expect(iso(new Date(zonedToUtc(2026, 1, 13, 10, 0, "Europe/Madrid")))).toBe("2026-01-13T09:00:00.000Z");
  });
  it("New York, Tokyo, Kathmandu (+5:45)", () => {
    expect(iso(new Date(zonedToUtc(2026, 7, 7, 10, 0, "America/New_York")))).toBe("2026-07-07T14:00:00.000Z");
    expect(iso(new Date(zonedToUtc(2026, 7, 7, 10, 0, "Asia/Tokyo")))).toBe("2026-07-07T01:00:00.000Z");
    expect(iso(new Date(zonedToUtc(2026, 7, 7, 10, 0, "Asia/Kathmandu")))).toBe("2026-07-07T04:15:00.000Z");
  });
  it("DST switch days in Madrid", () => {
    // 29 Mar 2026: clocks jump 02:00 -> 03:00; 25 Oct 2026: 03:00 -> 02:00
    expect(iso(new Date(zonedToUtc(2026, 3, 29, 10, 0, "Europe/Madrid")))).toBe("2026-03-29T08:00:00.000Z");
    expect(iso(new Date(zonedToUtc(2026, 10, 25, 10, 0, "Europe/Madrid")))).toBe("2026-10-25T09:00:00.000Z");
    // nonexistent 02:30 rolls forward, still a single valid instant
    const gap = zonedToUtc(2026, 3, 29, 2, 30, "Europe/Madrid");
    expect(Number.isFinite(gap)).toBe(true);
  });
  it("rejects bad zones", () => {
    expect(isValidTimezone("Mars/Olympus")).toBe(false);
    expect(dueSlots({ timezone: "Mars/Olympus", days: [2], time: "10:00" }, new Date())).toEqual([]);
  });
});

describe("dueSlots", () => {
  const s = { timezone: "Europe/Madrid", days: [2, 4], time: "10:00" }; // Tue, Thu
  it("fires within the window on a scheduled day", () => {
    const slots = dueSlots(s, new Date("2026-09-29T08:04:00Z")); // Tue 10:04 Madrid
    expect(slots.map(iso)).toEqual(["2026-09-29T08:00:00.000Z"]);
  });
  it("does not fire before the time or on other days", () => {
    expect(dueSlots(s, new Date("2026-09-29T07:59:00Z"))).toEqual([]);
    expect(dueSlots(s, new Date("2026-09-30T08:04:00Z"))).toEqual([]); // Wed
  });
  it("same slot identity across overlapping runs (dedupe key)", () => {
    const a = dueSlots(s, new Date("2026-09-29T08:01:00Z"));
    const b = dueSlots(s, new Date("2026-09-29T08:06:00Z"));
    expect(a.map(iso)).toEqual(b.map(iso));
  });
  it("weekday is evaluated in the workspace zone, not UTC", () => {
    // Tokyo Tue 08:00 = Mon 23:00 UTC
    const t = { timezone: "Asia/Tokyo", days: [2], time: "08:00" };
    expect(dueSlots(t, new Date("2026-09-28T23:02:00Z")).map(iso)).toEqual(["2026-09-28T23:00:00.000Z"]);
  });
  it("nextSlot finds the next Thursday", () => {
    expect(iso(nextSlot(s, new Date("2026-09-29T09:00:00Z"))!)).toBe("2026-10-01T08:00:00.000Z");
  });
});

describe("classify postMessage outcomes", () => {
  it("sent", () => expect(classify({ status: 200, body: { ok: true, ts: "1.2" } }, 1)).toEqual({ kind: "sent", ts: "1.2" }));
  it("ratelimited retries honoring Retry-After", () => {
    expect(classify({ status: 429, retryAfter: "30", body: {} }, 1)).toMatchObject({ kind: "retry", afterSeconds: 30 });
    expect(classify({ status: 200, body: { ok: false, error: "ratelimited" } }, MAX_ATTEMPTS).kind).toBe("failed");
  });
  it("definite Slack errors fail without retry", () => {
    expect(classify({ status: 200, body: { ok: false, error: "not_in_channel" } }, 1)).toMatchObject({ kind: "failed", error: "not_in_channel" });
    expect(classify({ status: 200, body: { ok: false, error: "token_revoked" } }, 1)).toMatchObject({ kind: "failed", reconnect: true });
  });
  it("credential 401 asks to reconnect", () => {
    expect(classify({ status: 401, body: { type: "credential_expired" }, credentialReconnect: true }, 1)).toMatchObject({ kind: "failed", reconnect: true });
  });
  it("ambiguous outcomes become unknown and are never retried", () => {
    expect(classify({ thrown: "timeout" }, 1).kind).toBe("unknown");
    expect(classify({ status: 502, body: null }, 1).kind).toBe("unknown");
    expect(classify({ status: 200, body: { ok: false, error: "internal_error" } }, 1).kind).toBe("unknown");
  });
});

describe("Block Kit", () => {
  it("has full fallback text and a URL button", () => {
    const m = buildLaughMessage({ url: "https://laughtercircle.com/s/abc", guide: "Carlos" });
    expect(m.text).toContain("https://laughtercircle.com/s/abc");
    expect(m.text).toContain("Carlos");
    const btn = (m.blocks.find((b) => b.type === "actions") as any).elements[0];
    expect(btn.url).toBe("https://laughtercircle.com/s/abc");
  });
});

describe("tenant isolation (two workspaces)", () => {
  const members = [
    { workspace_id: "ws-A", user_id: "user-A" },
    { workspace_id: "ws-B", user_id: "user-B" },
  ];
  it("each admin reaches only their own workspace", () => {
    expect(() => assertWorkspaceAccess(members, "user-A", "ws-A")).not.toThrow();
    expect(() => assertWorkspaceAccess(members, "user-B", "ws-B")).not.toThrow();
  });
  it("cross-workspace access is forbidden", () => {
    expect(() => assertWorkspaceAccess(members, "user-A", "ws-B")).toThrow("forbidden");
    expect(() => assertWorkspaceAccess(members, "user-B", "ws-A")).toThrow("forbidden");
    expect(() => assertWorkspaceAccess([], "user-A", "ws-A")).toThrow("forbidden");
  });
});

describe("launch tokens", () => {
  it("are random, url-safe and expose no identifiers", () => {
    const a = newLaunchToken(), b = newLaunchToken();
    expect(a).not.toBe(b);
    expect(isLaunchTokenShape(a)).toBe(true);
    expect(isLaunchTokenShape("ws-A")).toBe(false);
  });
});
