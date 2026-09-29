// Public, anonymous tracking. Inputs: launch token + temporary per-session browser id.
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const schema = z.object({
  token: z.string().regex(/^[A-Za-z0-9_-]{43}$/),
  kind: z.enum(["open", "start", "finish"]),
  browserId: z.string().uuid(),
});

export const trackSlackEvent = createServerFn({ method: "POST" })
  .inputValidator((i: z.infer<typeof schema>) => schema.parse(i))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: d } = await supabaseAdmin.from("slack_deliveries")
      .select("id, expires_at").eq("launch_token", data.token).maybeSingle();
    if (!d || new Date(d.expires_at).getTime() < Date.now()) return { valid: false };
    // Test deliveries are tracked too; stats report them separately from team totals.
    const { error } = await supabaseAdmin.from("slack_events").upsert(
      { delivery_id: d.id, kind: data.kind, browser_id: data.browserId },
      { onConflict: "delivery_id,kind,browser_id", ignoreDuplicates: true },
    );
    if (error) console.error("slack track failed", error.message);
    return { valid: true };
  });
