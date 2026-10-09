import { createFileRoute, Link } from "@tanstack/react-router";
import { Slack, Check, Trophy, Users, Gamepad2, Repeat, Coffee, HeartHandshake, Sparkles } from "lucide-react";
import { ShareButton } from "@/components/ShareButton";
import { LogoMark } from "@/components/LogoMark";
import { SiteFooter } from "@/components/SiteFooter";
import { SlackWaitlistForm } from "@/components/SlackWaitlistForm";

export const Route = createFileRoute("/slack/employee-engagement")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: "Employee Engagement in Slack: Simple Ways to Help Teams Connect" },
      { name: "description", content: "Practical ways to build employee engagement in Slack — recognition, social connection, games, rituals, breaks and shared activities — and where guided laughter sessions fit in." },
      { property: "og:title", content: "Employee Engagement in Slack: Simple Ways to Help Teams Connect" },
      { property: "og:description", content: "Practical ways to build employee engagement in Slack — recognition, social connection, games, rituals, breaks and shared activities — and where guided laughter sessions fit in." },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "https://laughtercircle.com/slack/employee-engagement" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://laughtercircle.com/slack/employee-engagement" }],
  }),
  component: EmployeeEngagementPage,
});

const WAYS = [
  {
    icon: <Trophy className="size-5" />,
    title: "Recognition",
    body: "Public, specific appreciation is the cheapest engagement tool that exists. A dedicated channel (#kudos, #props) where people thank each other by name works because the recognition is visible — anyone scrolling by learns what the team values.",
    works: "Best when it's specific (\"thanks for staying late on the demo\") and peer-to-peer, not just manager-to-report.",
  },
  {
    icon: <Users className="size-5" />,
    title: "Social connection",
    body: "Random pairings for virtual coffees, a channel for pets and desk photos, icebreaker questions pinned on Monday. The goal is simple: give colleagues a reason to talk about something that isn't a ticket or a deadline.",
    works: "Best for distributed teams whose only shared space is Slack. Keep it opt-in so it never feels like homework.",
  },
  {
    icon: <Gamepad2 className="size-5" />,
    title: "Games",
    body: "Trivia, polls, emoji reaction contests, guess-the-photo challenges. Games create a low-stakes reason to show up in a channel and a shared moment everyone can reference later.",
    works: "Best on a predictable cadence — a weekly quiz beats a one-off tournament nobody remembers.",
  },
  {
    icon: <Repeat className="size-5" />,
    title: "Rituals",
    body: "Monday intentions, Friday wins, a gif of the week, a rotating playlist. Rituals are small, repeated acts that give the team a rhythm — and a reason to come back to a channel even when nothing is on fire.",
    works: "Best when someone owns them at first. After a few weeks the team carries the ritual itself.",
  },
  {
    icon: <Coffee className="size-5" />,
    title: "Breaks",
    body: "A bot or a channel that invites everyone to step away from the screen together: stretch, walk, breathe, laugh. Breaks signal that the team's energy matters, not just its output.",
    works: "Best when they're short (2–5 minutes) and participation is anonymous — nobody wants break attendance on a report.",
  },
  {
    icon: <HeartHandshake className="size-5" />,
    title: "Shared activities",
    body: "Book clubs, step challenges, drawing contests, watching the same talk and discussing it. A shared activity gives the team a common experience — the raw material of conversation.",
    works: "Best when the barrier to join is tiny. The easier it is to say yes, the more people actually join.",
  },
];

function EmployeeEngagementPage() {
  return (
    <main className="min-h-screen overflow-x-clip">
      <div className="mx-auto max-w-5xl px-5 py-8 md:px-6 md:py-12">
        <nav className="sticky top-0 z-50 -mx-5 mb-10 flex flex-wrap items-center justify-between gap-x-3 gap-y-2 px-5 py-3 sm:mb-12 sm:gap-3 md:-mx-6 md:px-6">
          <Link to="/" className="flex shrink-0 items-center gap-2 font-display text-base font-black tracking-tight md:text-xl">
            <LogoMark size={28} className="hidden sm:block" />
            <span className="whitespace-nowrap">Laughter<span className="text-primary">Circle</span></span>
          </Link>
          <div className="flex min-w-0 items-center gap-1.5 text-xs font-semibold sm:gap-2 sm:text-sm">
            <Link to="/slack" className="shrink-0 rounded-full px-2.5 py-1.5 hover:bg-muted sm:px-3 sm:py-2">For Slack</Link>
            <Link to="/story" className="shrink-0 rounded-full px-2.5 py-1.5 hover:bg-muted sm:px-3 sm:py-2">Our story</Link>
            <ShareButton />
            <Link to="/auth" className="hidden shrink-0 rounded-full border bg-card/70 px-4 py-2 hover:bg-muted sm:inline-block">Sign in</Link>
          </div>
        </nav>

        {/* HERO */}
        <section>
          <p className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground"><Slack className="size-4" /> Laughter Circle for Slack</p>
          <h1 className="mt-3 font-display text-4xl font-black leading-tight md:text-6xl">
            Employee engagement in Slack: simple ways to help teams <span className="text-primary">connect.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
            There's no single switch for engagement. Teams that feel connected in Slack combine several small habits — recognition, connection, play, rituals, breaks. Here's an honest tour of what works, and where a guided laughter session fits in.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href="#waitlist" className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 font-bold text-primary-foreground shadow-lg transition hover:scale-[1.03]">
              <Slack className="size-4" /> Join the waitlist
            </a>
            <Link to="/" className="inline-flex items-center gap-2 rounded-full border bg-card/70 px-6 py-3.5 font-bold transition hover:bg-muted">
              Try a laughter session now
            </Link>
          </div>
        </section>

        {/* WHY SLACK */}
        <section className="mt-24">
          <h2 className="font-display text-3xl font-black md:text-5xl">Slack is where your team already is.</h2>
          <div className="mt-5 max-w-3xl space-y-4 text-lg leading-relaxed text-muted-foreground">
            <p>Whatever your engagement strategy says, its execution happens in Slack. It's the one place every teammate opens every day, without anyone having to be invited, camera-ready, or in a specific time zone.</p>
            <p>That's also why engagement tools live there: they don't have to fight for attention. A recognition channel, a weekly trivia bot, an icebreaker thread — they work because they meet people between the meetings instead of adding another one.</p>
            <p>The mistake most teams make isn't picking the wrong tool. It's expecting one tool to do everything. Engagement is a mix, and each ingredient does a different job.</p>
          </div>
        </section>

        {/* THE WAYS */}
        <section className="mt-24">
          <h2 className="font-display text-3xl font-black md:text-5xl">Six ways to build engagement in Slack</h2>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">None of these require a meeting, a budget, or an engagement strategy document. Most need less than five minutes a week to keep alive.</p>
          <div className="mt-10 space-y-4">
            {WAYS.map((w) => (
              <div key={w.title} className="flex gap-4 rounded-3xl border bg-card p-6 sm:gap-6">
                <span className="hidden size-12 shrink-0 items-center justify-center rounded-2xl bg-primary/15 text-primary sm:flex">{w.icon}</span>
                <div>
                  <h3 className="font-display text-xl font-black leading-snug">{w.title}</h3>
                  <p className="mt-2 leading-relaxed text-muted-foreground">{w.body}</p>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/80"><span className="font-semibold">What makes it work:</span> {w.works}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* LAUGHTER SESSIONS */}
        <section className="mt-24 rounded-3xl border bg-primary/10 p-8 md:p-12">
          <p className="inline-flex items-center gap-2 rounded-full bg-primary/15 px-3 py-1 text-xs font-bold uppercase tracking-wide text-primary"><Sparkles className="size-3.5" /> One more way</p>
          <h2 className="mt-4 font-display text-3xl font-black md:text-5xl">Guided laughter sessions: engagement you don't have to <span className="text-primary">perform.</span></h2>
          <div className="mt-5 max-w-3xl space-y-4 text-lg leading-relaxed text-muted-foreground">
            <p>Most engagement activities ask something of the quieter half of the team: be witty, be visible, be enthusiastic. A guided laughter session asks for exactly one thing — that you laugh. Nobody talks, nobody presents, nobody's on camera.</p>
            <p>Laughter Circle is a 3-minute guided session in the browser. An AI character explains each exercise and laughs first; two buddies laugh along by default. Shared laughter is involuntary and contagious, which is why it works as a connector even between people who never talk in #general.</p>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              { t: "3 minutes", d: "Shorter than a coffee chat. Nobody has to clear their calendar." },
              { t: "No performing", d: "You just follow along. The guides do the work of breaking the ice." },
              { t: "Anonymous by design", d: "Only aggregate participation is measured — never who joined." },
            ].map((c) => (
              <div key={c.t} className="rounded-2xl border bg-background/40 p-5">
                <h3 className="font-display text-lg font-black">{c.t}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{c.d}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 max-w-3xl leading-relaxed text-muted-foreground">
            It isn't a replacement for recognition channels or rituals — it's the breaks ingredient, and it pairs well with everything else on this list. Read more about the experience and the upcoming Slack integration on the <Link to="/slack" className="font-semibold text-primary underline">Laughter Circle for Slack</Link> page.
          </p>
        </section>

        {/* HOW TO START */}
        <section className="mt-24">
          <h2 className="font-display text-3xl font-black md:text-5xl">A simple starting mix</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="rounded-3xl border bg-card p-6">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">This week</p>
              <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-muted-foreground">
                {["Open a #kudos channel and post the first specific thank-you", "Pin one icebreaker question in #general", "Drop a Laughter Circle session link and let people take it when it suits them"].map((t) => (
                  <li key={t} className="flex gap-2.5"><Check className="mt-0.5 size-4 shrink-0 text-primary" />{t}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl border bg-card p-6">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">This month</p>
              <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-muted-foreground">
                {["Pick one ritual (Friday wins works well) and stick to it for four weeks", "Run one shared game on a predictable day", "Repeat the laugh break — the second one is where the habit starts"].map((t) => (
                  <li key={t} className="flex gap-2.5"><Check className="mt-0.5 size-4 shrink-0 text-primary" />{t}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* WAITLIST */}
        <section id="waitlist" className="mt-24 scroll-mt-8 rounded-3xl bg-primary p-8 text-center text-primary-foreground md:p-12">
          <h2 className="font-display text-3xl font-black md:text-5xl">Make the laugh break automatic.</h2>
          <p className="mt-2 font-display text-2xl font-black opacity-95 md:text-3xl">Let the laughter spread.</p>
          <p className="mt-5 font-bold">Laughter Circle for Slack is coming soon.</p>
          <div className="mx-auto mt-7 max-w-md"><SlackWaitlistForm /></div>
          <p className="mt-4 text-sm opacity-90">Be one of the first teams to try it.</p>
          <Link to="/slack" className="mt-3 inline-block text-sm font-bold underline">More about the Slack integration →</Link>
        </section>

        {/* TRY NOW */}
        <section className="mt-24 rounded-3xl border bg-card p-8 text-center md:p-12">
          <h2 className="font-display text-3xl font-black md:text-5xl">Don't wait for the bot. <span className="text-primary">Laugh today.</span></h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            The full experience already works in your browser: pick one of ten AI guides, take a guided laugh break, and see how your team reacts — before you ask them to.
          </p>
          <Link to="/" className="mt-7 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 font-bold text-primary-foreground shadow-lg transition hover:scale-[1.03]">
            Start a session
          </Link>
        </section>

        <SiteFooter />
      </div>
    </main>
  );
}
