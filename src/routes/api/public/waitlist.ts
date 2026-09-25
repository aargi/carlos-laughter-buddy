import { createFileRoute } from "@tanstack/react-router";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";

const bodySchema = z.object({
  interest: z.string().trim().min(1).max(60),
  email: z.string().trim().email().max(255),
  teamSize: z.string().trim().max(20).optional(),
});

export const Route = createFileRoute("/api/public/waitlist")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let body: unknown;
        try {
          body = await request.json();
        } catch {
          return Response.json({ ok: false, error: "Invalid body" }, { status: 400 });
        }
        const parsed = bodySchema.safeParse(body);
        if (!parsed.success) {
          return Response.json({ ok: false, error: "Invalid email" }, { status: 400 });
        }

        const key = process.env["SUPABASE_PUBLISHABLE_KEY"]!;
        const supabase = createClient(process.env["SUPABASE_URL"]!, key, {
          auth: { persistSession: false, autoRefreshToken: false },
          global: {
            fetch: (input, init) => {
              const h = new Headers(init?.headers);
              if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`) h.delete("Authorization");
              h.set("apikey", key);
              return fetch(input, { ...init, headers: h });
            },
          },
        });

        const { error } = await supabase.from("waitlist").insert({
          interest: parsed.data.interest,
          email: parsed.data.email.toLowerCase(),
          team_size: parsed.data.teamSize ?? null,
        });
        if (error) {
          console.error("waitlist insert failed", error.code);
          return Response.json({ ok: false, error: "Could not save" }, { status: 500 });
        }
        return Response.json({ ok: true });
      },
    },
  },
});
