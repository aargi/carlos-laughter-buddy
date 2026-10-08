import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/oauth/slack/return")({
  // OAuth callback: noindex, not for the sitemap.
  staticData: { sitemap: false },
  head: () => ({
    meta: [
      { title: "Connecting Slack — Laughter Circle" },
      { name: "description", content: "Complete your Slack workspace connection to Laughter Circle." },
      { property: "og:title", content: "Connecting Slack — Laughter Circle" },
      { property: "og:description", content: "Complete your Slack workspace connection to Laughter Circle." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://laughtercircle.com/oauth/slack/return" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
    links: [{ rel: "canonical", href: "https://laughtercircle.com/oauth/slack/return" }],
  }),
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
