import { useState } from "react";
import { Slack, Check } from "lucide-react";

const TEAM_SIZES = ["1–10", "11–50", "51–200", "200+"] as const;

export function SlackWaitlistForm() {
  const [email, setEmail] = useState("");
  const [size, setSize] = useState<string>(TEAM_SIZES[0]);
  const [done, setDone] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return;
    fetch("/api/public/waitlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ interest: "slack-workspace", email, teamSize: size }),
    }).catch(() => { /* ignore */ });
    setDone(true);
  };

  if (done) {
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
      <button type="submit" className="inline-flex items-center justify-center gap-2 rounded-full bg-background py-3.5 text-sm font-bold text-foreground shadow-lg transition hover:scale-[1.02]">
        <Slack className="size-4" /> Join the waitlist
      </button>
    </form>
  );
}
