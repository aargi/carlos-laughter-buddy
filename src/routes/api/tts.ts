import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/tts")({
  // API endpoint, not a page.
  staticData: { sitemap: false },
  server: {
    handlers: {
      // Keep the old URL safely retired. Neither anonymous nor signed-in
      // requests can synthesize paid audio; fixed MP3s are generated offline.
      POST: () => Response.json(
        { error: "Live voice generation is disabled. Sessions use pre-generated audio." },
        { status: 410, headers: { "Cache-Control": "no-store" } },
      ),
    },
  },
});
