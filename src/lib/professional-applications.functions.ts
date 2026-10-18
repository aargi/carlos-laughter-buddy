import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { professionalApplicationSchema } from "./professional-applications";

export const submitProfessionalApplication = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => professionalApplicationSchema.parse(input))
  .handler(async ({ data }) => {
    const key = process.env["SUPABASE_PUBLISHABLE_KEY"];
    const url = process.env["SUPABASE_URL"];
    if (!key || !url) return { ok: false as const };
    const client = createClient(url, key, {
      auth: { persistSession: false, autoRefreshToken: false },
      global: { fetch: (input, init) => {
        const headers = new Headers(init?.headers);
        if (key.startsWith("sb_") && headers.get("Authorization") === `Bearer ${key}`) headers.delete("Authorization");
        headers.set("apikey", key);
        return fetch(input, { ...init, headers });
      } },
    });
    const { error } = await client.from("professional_applications").insert({
      name: data.name, email: data.email, city: data.city, country: data.country,
      languages: data.languages, professional_role: data.professionalRole,
      certification_year: data.certificationYear, session_formats: data.sessionFormats,
      professional_url: data.professionalUrl || null,
    });
    return { ok: !error };
  });