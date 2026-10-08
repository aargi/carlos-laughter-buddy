import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { LogoMark } from "@/components/LogoMark";
import { setLaunchToken, trackLaunch } from "@/lib/slack/launch";

export const Route = createFileRoute("/s/$token")({
  head: ({ params }) => ({
    meta: [
      { title: "Laugh break — Laughter Circle" },
      { name: "description", content: "Your team's Laughter Circle break is ready. Start a short guided laughter session." },
      { property: "og:title", content: "Laugh break — Laughter Circle" },
      { property: "og:description", content: "Your team's Laughter Circle break is ready." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `https://laughtercircle.com/s/${encodeURIComponent(params.token)}` },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
    links: [{ rel: "canonical", href: `https://laughtercircle.com/s/${encodeURIComponent(params.token)}` }],
  }),
  component: LaunchPage,
});

function LaunchPage() {
  const { token } = Route.useParams();
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);

  // Estimated open: recorded from the browser after load, never on the link GET.
  useEffect(() => {
    if (/^[A-Za-z0-9_-]{43}$/.test(token)) {
      setLaunchToken(token);
      void trackLaunch("open");
    }
    setReady(true);
  }, [token]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <LogoMark size={72} />
      <h1 className="mt-6 font-display text-4xl font-black">Laugh break time 😂</h1>
      <p className="mt-3 max-w-md text-muted-foreground">Your team's Laughter Circle is ready. About three minutes, just you and your guide.</p>
      <button disabled={!ready} onClick={() => navigate({ to: "/" })}
        className="mt-8 rounded-full bg-primary px-8 py-4 font-bold text-primary-foreground shadow-lg transition hover:scale-[1.03]">
        Start laughing
      </button>
    </main>
  );
}
