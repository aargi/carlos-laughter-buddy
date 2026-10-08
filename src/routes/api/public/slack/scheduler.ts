import { createFileRoute } from "@tanstack/react-router";
import { authenticateCronRequest } from "@/integrations/supabase/cron-auth";

// Called every 15 minutes by the scheduled job. Deny by default: only POST with the
// platform cron secret; a DB-level throttle rejects runs closer than 60 s.
export const Route = createFileRoute("/api/public/slack/scheduler")({
  // API endpoint, not a page.
  staticData: { sitemap: false },
  server: {
    handlers: {
      POST: async ({ request }) => {
        const denied = await authenticateCronRequest(request);
        if (denied) return denied;
        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
        const { data: ok } = await supabaseAdmin.rpc("slack_scheduler_try_start");
        if (!ok) return Response.json({ skipped: "throttled" }, { status: 429 });
        const { runScheduler } = await import("@/lib/slack/slack.server");
        try {
          return Response.json(await runScheduler());
        } catch (e) {
          console.error("slack scheduler failed", e);
          return Response.json({ error: "scheduler_failed" }, { status: 500 });
        }
      },
    },
  },
});
