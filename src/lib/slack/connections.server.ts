// Stores only the opaque gateway connection handle (lovack_*), never Slack tokens.
// At-rest protection uses the platform-provisioned APP_USER_CONNECTION_KEY_SECRET.
import { createCipheriv, createDecipheriv, randomBytes } from "node:crypto";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

function key(): Buffer {
  const raw = process.env['APP_USER_CONNECTION_KEY_SECRET'];
  if (!raw) throw new Error("APP_USER_CONNECTION_KEY_SECRET is not set");
  return Buffer.from(raw, "base64");
}
function seal(plain: string): string {
  const iv = randomBytes(12);
  const c = createCipheriv("aes-256-gcm", key(), iv);
  const ct = Buffer.concat([c.update(plain, "utf8"), c.final()]);
  return Buffer.concat([iv, c.getAuthTag(), ct]).toString("base64");
}
function open(stored: string): string {
  const buf = Buffer.from(stored, "base64");
  const d = createDecipheriv("aes-256-gcm", key(), buf.subarray(0, 12));
  d.setAuthTag(buf.subarray(12, 28));
  return Buffer.concat([d.update(buf.subarray(28)), d.final()]).toString("utf8");
}

export const SLACK = "slack";

export async function saveConnection(userId: string, handle: string) {
  const { error } = await supabaseAdmin.from("app_user_connections").upsert(
    { user_id: userId, connector_id: SLACK, connection_key_ciphertext: seal(handle) },
    { onConflict: "user_id,connector_id" },
  );
  if (error) throw error;
}

export async function getConnection(userId: string): Promise<string | null> {
  const { data, error } = await supabaseAdmin.from("app_user_connections")
    .select("connection_key_ciphertext").eq("user_id", userId).eq("connector_id", SLACK).maybeSingle();
  if (error) throw error;
  return data ? open(data.connection_key_ciphertext) : null;
}

export async function deleteConnection(userId: string) {
  const { error } = await supabaseAdmin.from("app_user_connections").delete().eq("user_id", userId).eq("connector_id", SLACK);
  if (error) throw error;
}
