import { useState } from "react";
import { Slack, Check, AlertCircle, RefreshCw } from "lucide-react";
import { submitWaitlist } from "@/lib/waitlist";

const TEAM_SIZES = ["1–10", "11–50", "51–200", "200+"] as const;

export function SlackWaitlistForm() {
  const [email, setEmail] = useState("");
  const [size, setSize] = useState<string>(TEAM_SIZES[0]);
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [error, setError] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setStatus("error");
      setError("Please enter a valid work email.");
      return;
    }
    setStatus("sending");
    setError("");
    const saved = await submitWaitlist("slack-workspace", email, size);
    if (saved) {
      setStatus("done");
    } else {
      setStatus("error");
      setError("We couldn't save your email. Please try again.");
    }
  };

  if (status === "done") {
    return <div className="flex items-center justify-center gap-2 rounded-full bg-background/20 py-4 text-lg font-bold"><Check className="size-5" /> You're on the list! 🎉</div>;
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-4 text-left">
      <label className="text-xs font-semibold uppercase tracking-wide opacity-90">Work email
        <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com"
          className="mt-1.5 w-full rounded-full bg-background px-5 py-3.5 text-sm normal-case tracking-normal text-foreground outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-background/60" />
      </label>
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide opacity-90">Team size</p>
        <div className="mt-1.5 grid grid-cols-4 gap-1.5">
          {TEAM_SIZES.map((s) => (
            <button key={s} type="button" onClick={() => setSize(s)}
              className={`rounded-full py-2 text-xs font-semibold transition ${size === s ? "bg-background text-foreground" : "bg-background/20 hover:bg-background/30"}`}>{s}</button>
          ))}
        </div>
      </div>
      {status === "error" && (
        <p role="alert" className="flex items-center gap-2 rounded-full bg-background/20 px-4 py-2 text-xs font-semibold text-accent">
          <AlertCircle className="size-4 shrink-0" /> {error}
        </p>
      )}
      <button type="submit" disabled={status === "sending"}
        className="inline-flex items-center justify-center gap-2 rounded-full bg-background py-3.5 text-sm font-bold text-foreground shadow-lg transition hover:scale-[1.02] disabled:cursor-wait disabled:opacity-60 disabled:hover:scale-100">
        {status === "sending" ? <><RefreshCw className="size-4 animate-spin" /> Joining…</> : <><Slack className="size-4" /> Join the waitlist</>}
      </button>
    </form>
  );
}
