// Pure classification of a chat.postMessage outcome.
// Only outcomes where Slack definitely did NOT post are retried or failed;
// anything ambiguous becomes "unknown" (manual review) to never double-post.

export type Outcome =
  | { kind: "sent"; ts: string }
  | { kind: "retry"; afterSeconds: number; error: string }
  | { kind: "failed"; error: string; reconnect?: boolean }
  | { kind: "unknown"; error: string };

const DEFINITE_FAILURES = new Set([
  "not_in_channel", "channel_not_found", "is_archived", "invalid_auth", "account_inactive",
  "token_revoked", "token_expired", "missing_scope", "not_authed", "restricted_action",
  "msg_too_long", "no_text", "invalid_blocks", "too_many_attachments", "team_access_not_granted",
]);

export const MAX_ATTEMPTS = 3;

export function classify(input:
  | { thrown: string }
  | { status: number; retryAfter?: string | null; body: unknown; credentialReconnect?: boolean },
  attempts: number,
): Outcome {
  if ("thrown" in input) return { kind: "unknown", error: `network: ${input.thrown}` };
  const { status, body } = input;
  const b = (body ?? {}) as { ok?: boolean; error?: string; ts?: string; type?: string };
  if (input.credentialReconnect) return { kind: "failed", error: "credential_expired", reconnect: true };
  if (status === 429 || b.error === "ratelimited") {
    if (attempts >= MAX_ATTEMPTS) return { kind: "failed", error: "ratelimited" };
    const s = Number(input.retryAfter);
    return { kind: "retry", afterSeconds: Number.isFinite(s) && s > 0 ? s : 60, error: "ratelimited" };
  }
  if (status >= 500) return { kind: "unknown", error: `http_${status}` };
  if (status >= 400) return { kind: "failed", error: `gateway_${status}${b.type ? `:${b.type}` : ""}` };
  if (b.ok === true && typeof b.ts === "string") return { kind: "sent", ts: b.ts };
  if (b.ok === false && b.error && DEFINITE_FAILURES.has(b.error)) {
    return { kind: "failed", error: b.error, reconnect: ["invalid_auth", "token_revoked", "token_expired", "account_inactive"].includes(b.error) };
  }
  return { kind: "unknown", error: b.error ?? "unexpected_response" };
}

export function friendlyError(code: string | null | undefined): string {
  switch (code) {
    case "not_in_channel": return "The bot isn't in that channel. In Slack type /invite @LaughterCircle in the channel.";
    case "channel_not_found": return "The channel no longer exists or is private.";
    case "is_archived": return "The channel is archived. Pick another channel.";
    case "ratelimited": return "Slack is rate limiting us. We'll try again shortly.";
    case "credential_expired": case "invalid_auth": case "token_revoked": case "token_expired":
      return "Slack access expired. Reconnect your workspace.";
    case "missing_scope": return "The Slack app is missing a permission. Reconnect your workspace.";
    default: return code ? `Slack error: ${code}` : "";
  }
}
