import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Slack, Play, Sparkles, MessageCircle, PartyPopper, Check } from "lucide-react";

export const Route = createFileRoute("/slack")({
  head: () => ({
    meta: [
      { title: "Laughter Circle for Slack — shared laughter for your team" },
      { name: "description", content: "Laughter Circle inside your workspace: your team creates its own characters — optionally with their own voice — and laughs together, right in Slack. Join the waitlist." },
      { property: "og:title", content: "Laughter Circle for Slack" },
      { property: "og:description", content: "Your team creates its own laughing characters and laughs together, right inside Slack. Join the waitlist." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SlackPage,
});

function SlackPage() {
  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-3xl px-6 py-12 md:py-16">
        <nav className="mb-12 flex items-center justify-between">
          <Link to="/" className="font-display text-xl font-black tracking-tight">
            Laughter<span className="text-primary">Circle</span>
          </Link>
          <Link to="/" className="rounded-full border bg-card/70 px-4 py-2 text-sm font-semibold backdrop-blur hover:bg-muted">
            Try the session
          </Link>
        </nav>

        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">Laughter Circle for Slack</p>
        <h1 className="mt-3 font-display text-4xl font-black leading-tight md:text-6xl">
          The circle that laughs <span className="text-primary">with your whole team.</span>
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
          We're bringing Laughter Circle into Slack — the place where your team already talks every day.
          It's in development, and you can be among the first workspaces to try it.
        </p>

        {/* Three natural blocks */}
        <div className="mt-14 space-y-12">
          <Block
            icon={<PartyPopper className="size-5" />}
            kicker="Laughing together"
            title="Laughter is the fastest way to feel like a team."
          >
            You can schedule a thousand meetings, but shared laughter does in two minutes what hours of
            icebreakers can't: it lowers the guard, melts the awkwardness and makes people feel like
            they're on the same side. Teams that laugh together relax faster, open up more easily and
            take themselves a little less seriously — which is exactly where good collaboration lives.
          </Block>

          <Block
            icon={<Sparkles className="size-5" />}
            kicker="What we're building"
            title="Your team creates its own characters — and becomes the circle."
          >
            Inside Slack, every teammate can create their own character: pick a personality, an aura and a
            signature laugh — and optionally record a few seconds of voice, so the character laughs with
            <em> your</em> voice. Then these characters become part of Laughter Circle: a small cast made
            entirely of your own colleagues, each with their own unmistakable laugh.
          </Block>

          <Block
            icon={<MessageCircle className="size-5" />}
            kicker="How it works"
            title="Five minutes in Slack. No meetings, no cameras."
          >
            It's a playful experience inside the tool you already use: when the moment feels right — after
            standup, on a Friday afternoon, whenever — a character drops into a channel with a gentle
            nudge: <span className="font-semibold text-foreground">"Laugh break?"</span> Whoever taps
            joins, and for a few minutes everyone laughs along together, in channel, with each character
            laughing in its own voice. Then everyone goes back to work, a little lighter.
          </Block>
        </div>

        {/* Waitlist CTA */}
        <div className="mt-16 rounded-3xl bg-primary p-8 text-center text-primary-foreground md:p-10">
          <h2 className="font-display text-3xl font-black">Want your team to laugh together?</h2>
          <p className="mx-auto mt-3 max-w-md opacity-90">
            Join the waitlist and we'll reach out when Laughter Circle for Slack is ready to meet your workspace.
          </p>
          <div className="mx-auto mt-7 max-w-sm">
            <SlackWaitlistForm />
          </div>
        </div>
      </div>
    </main>
  );
}

function Block({ icon, kicker, title, children }: { icon: React.ReactNode; kicker: string; title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-3xl border bg-card p-7 md:p-9">
      <span className="flex size-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">{icon}</span>
      <p className="mt-5 text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">{kicker}</p>
      <h2 className="mt-2 font-display text-2xl font-black leading-snug md:text-3xl">{title}</h2>
      <div className="mt-4 space-y-4 text-base leading-relaxed text-muted-foreground md:text-lg">{children}</div>
    </section>
  );
}

const TEAM_SIZES = ["1–10", "11–50", "51–200", "200+"] as const;

function SlackWaitlistForm() {
  const [email, setEmail] = useState("");
  const [size, setSize] = useState<string>(TEAM_SIZES[0]);
  const [done, setDone] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return;
    try {
      const list = JSON.parse(localStorage.getItem("riso-waitlist") || "[]");
      list.push({ interest: "slack-workspace", email, teamSize: size, date: new Date().toISOString() });
      localStorage.setItem("riso-waitlist", JSON.stringify(list));
    } catch { /* ignore */ }
    setDone(true);
  };

  if (done) {
    return (
      <div className="flex items-center justify-center gap-2 rounded-full bg-background/20 py-4 text-lg font-bold">
        <Check className="size-5" /> You're on the list! 🎉
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-3">
      <div className="flex gap-2">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@work-email.com"
          className="min-w-0 flex-1 rounded-full bg-background px-5 py-3.5 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:ring-2 focus:ring-background/60"
        />
        <button type="submit" className="inline-flex shrink-0 items-center gap-2 rounded-full bg-background px-5 py-3.5 text-sm font-bold text-foreground shadow-lg transition hover:scale-[1.03]">
          <Slack className="size-4" /> Join the waitlist
        </button>
      </div>
      <div className="flex items-center justify-center gap-2">
        <span className="text-xs font-semibold uppercase tracking-wide opacity-90">Team size</span>
        <div className="flex gap-1">
          {TEAM_SIZES.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setSize(s)}
              className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${size === s ? "bg-background text-foreground" : "bg-background/20 hover:bg-background/30"}`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>
    </form>
  );
}
