// Pure tenant-isolation guard used by every admin server function.
export type Membership = { workspace_id: string; user_id: string };

export function assertWorkspaceAccess(memberships: Membership[], userId: string, workspaceId: string): void {
  const ok = memberships.some((m) => m.user_id === userId && m.workspace_id === workspaceId);
  if (!ok) throw new Error("forbidden");
}

export function newLaunchToken(): string {
  const b = new Uint8Array(32);
  crypto.getRandomValues(b);
  let s = "";
  for (const x of b) s += String.fromCharCode(x);
  return btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

export const LAUNCH_TOKEN_TTL_MS = 7 * 86400000;
export const isLaunchTokenShape = (t: string) => /^[A-Za-z0-9_-]{43}$/.test(t);
