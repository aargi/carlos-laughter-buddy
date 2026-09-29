import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/oauth/slack/return")({
  head: () => ({ meta: [{ title: "Connecting Slack — Laughter Circle" }, { name: "robots", content: "noindex" }] }),
  component: OAuthReturn,
});

function OAuthReturn() {
  const [message, setMessage] = useState("Finishing connection…");
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const notify = (type: "appUserConnectorOAuthComplete" | "appUserConnectorOAuthFailed", code?: string) => {
      window.opener?.postMessage({ type, connectorId: "slack", code: code ?? null }, window.location.origin);
      window.close();
    };
    if (params.get("success") !== "true") { setMessage(params.get("error") ?? "Slack connection did not complete."); notify("appUserConnectorOAuthFailed"); return; }
    const code = params.get("code");
    if (!code) { setMessage("Slack connection completed without a code."); notify("appUserConnectorOAuthFailed"); return; }
    notify("appUserConnectorOAuthComplete", code);
  }, []);
  return <main className="flex min-h-screen items-center justify-center p-6"><p>{message}</p></main>;
}
