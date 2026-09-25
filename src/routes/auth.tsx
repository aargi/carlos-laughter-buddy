import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { z } from "zod";
import { LogoMark } from "@/components/LogoMark";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";

const search = z.object({ redirect: z.string().optional() });

export const Route = createFileRoute("/auth")({
  validateSearch: (s) => search.parse(s),
  head: () => ({
    meta: [
      { title: "Sign in — Laughter Circle" },
      { name: "description", content: "Sign in to Laughter Circle to unlock Pro features like your own custom character and voice clone." },
      { property: "og:title", content: "Sign in — Laughter Circle" },
      { property: "og:description", content: "Unlock Pro features in Laughter Circle." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AuthPage,
});

function safePath(p?: string) {
  return p && p.startsWith("/") && !p.startsWith("//") ? p : "/";
}

function AuthPage() {
  const { redirect } = Route.useSearch();
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup" | "forgot">("signin");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const target = safePath(redirect);

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      if (session) navigate({ to: target, replace: true });
    });
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: target, replace: true });
    });
    return () => sub.subscription.unsubscribe();
  }, [navigate, target]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null); setMsg(null); setBusy(true);
    try {
      if (mode === "signin") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      } else if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email, password,
          options: { emailRedirectTo: window.location.origin + target, data: { full_name: name } },
        });
        if (error) throw error;
        setMsg("Check your email to confirm your account.");
      } else {
        const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: `${window.location.origin}/reset-password` });
        if (error) throw error;
        setMsg("We sent you a link to reset your password.");
      }
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Something went wrong");
    } finally { setBusy(false); }
  };

  const google = async () => {
    setErr(null);
    if (target !== "/") sessionStorage.setItem("auth-redirect", target);
    const res = await lovable.auth.signInWithOAuth("google", { redirect_uri: window.location.origin });
    if (res.error) setErr(res.error.message ?? "Google sign-in failed");
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-6 py-12">
      <div className="w-full max-w-md rounded-3xl border bg-card p-8 shadow-xl">
        <Link to="/" className="inline-flex items-center gap-2 font-display text-xl font-black tracking-tight"><LogoMark size={30} /><span className="whitespace-nowrap">Laughter<span className="text-primary">Circle</span></span></Link>
        <h1 className="mt-6 text-3xl font-black">
          {mode === "signin" ? "Welcome back" : mode === "signup" ? "Create your account" : "Reset password"}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">Sign in to unlock Pro features.</p>

        {mode !== "forgot" && (
          <>
            <button onClick={google} className="mt-6 flex w-full items-center justify-center gap-2 rounded-full border bg-background px-4 py-3 text-sm font-semibold transition hover:bg-muted">
              <svg viewBox="0 0 24 24" className="size-4" aria-hidden><path fill="currentColor" d="M21.35 11.1H12v2.9h5.35c-.23 1.5-1.6 4.4-5.35 4.4-3.22 0-5.85-2.67-5.85-5.95S8.78 6.5 12 6.5c1.83 0 3.06.78 3.76 1.45l2.57-2.47C16.68 3.94 14.55 3 12 3 7.03 3 3 7.03 3 12s4.03 9 9 9c5.2 0 8.64-3.65 8.64-8.8 0-.6-.07-1.05-.29-1.1z"/></svg>
              Continue with Google
            </button>
            <div className="my-5 flex items-center gap-3 text-xs text-muted-foreground"><span className="h-px flex-1 bg-border" />or<span className="h-px flex-1 bg-border" /></div>
          </>
        )}

        <form onSubmit={submit} className="space-y-3">
          {mode === "signup" && (
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" className="w-full rounded-full border bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/50" />
          )}
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" className="w-full rounded-full border bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/50" />
          {mode !== "forgot" && (
            <input type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="w-full rounded-full border bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/50" />
          )}
          {err && <p className="text-sm text-destructive">{err}</p>}
          {msg && <p className="text-sm font-semibold text-primary">{msg}</p>}
          <button disabled={busy} className="w-full rounded-full bg-primary px-4 py-3 text-sm font-bold text-primary-foreground transition hover:bg-primary/90 disabled:opacity-60">
            {busy ? "…" : mode === "signin" ? "Sign in" : mode === "signup" ? "Create account" : "Send reset link"}
          </button>
        </form>

        <div className="mt-5 flex flex-col items-center gap-2 text-sm text-muted-foreground">
          {mode === "signin" && (
            <>
              <button onClick={() => setMode("forgot")} className="hover:text-primary">Forgot your password?</button>
              <button onClick={() => setMode("signup")}>No account? <span className="font-semibold text-primary">Sign up</span></button>
            </>
          )}
          {mode !== "signin" && (
            <button onClick={() => setMode("signin")}>Already have an account? <span className="font-semibold text-primary">Sign in</span></button>
          )}
        </div>
      </div>
    </div>
  );
}
