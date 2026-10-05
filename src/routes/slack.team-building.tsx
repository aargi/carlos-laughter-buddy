import { createFileRoute, Link } from "@tanstack/react-router";
import { Slack, Check, Coffee, Users, MessageSquare, CalendarX, Volume2, Timer } from "lucide-react";
import { ShareButton } from "@/components/ShareButton";
import { LogoMark } from "@/components/LogoMark";
import { SiteFooter } from "@/components/SiteFooter";
import { SlackWaitlistForm } from "@/components/SlackWaitlistForm";

export const Route = createFileRoute("/slack/team-building")({
  head: () => ({
    meta: [
      { title: "Slack Team Building: Simple Activities Your Team Can Do Without Another Meeting" },
      { name: "description", content: "Simple Slack team building activities that take 2–5 minutes, no meeting required. Get your team laughing out loud together with Laughter Circle — in your browser today, inside Slack soon." },
      { property: "og:title", content: "Slack Team Building: Simple Activities Your Team Can Do Without Another Meeting" },
      { property: "og:description", content: "Simple 2–5 minute Slack team building activities with no meeting required — shared laughter with AI guides, in your browser today and inside Slack soon." },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "https://laughtercircle.com/slack/team-building" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://laughtercircle.com/slack/team-building" }],
  }),
  component: TeamBuildingPage,
});

const ACTIVITIES = [
  {
    icon: <Coffee className="size-5" />,
    title: "The laugh break link",
    live: "You can do this today",
    body: "Drop a link to a guided Laughter Circle session in your team channel. Each person takes 3 minutes whenever it suits them: a guide explains each exercise, then it's their turn to laugh along — no call, no camera, no meeting.",
  },
  {
    icon: <Users className="size-5" />,
    title: "Guide roulette",
    live: "You can do this today",
    body: "Ten AI guides, each with their own voice and unmistakable laugh — from Spain to Texas to Tokyo to Lagos. Everyone picks a different guide, takes their session, then posts in the thread which one cracked them up first.",
  },
  {
    icon: <Volume2 className="size-5" />,
    title: "The voice & laugh thread",
    live: "You can do this today",
    body: "Share the For Slack page and let everyone play the voice demos: Lena the designer, Dev Dan, Grace, Mark, Joy and Sal. Vote for the character whose laugh sounds most like the person who sits next to you.",
  },
  {
    icon: <Timer className="size-5" />,
    title: "The group laugh challenge",
    live: "You can do this today",
    body: "In every session, two buddy guides laugh along with you by default, following the exercise's own pattern. Whoever breaks first has to post exactly what they laughed like. Yes, on the record.",
  },
  {
    icon: <MessageSquare className="size-5" />,
    title: "The scheduled laugh break",
    live: "Coming to Slack",
    body: "Soon, the Laughter Circle bot posts a laugh break into a channel your admin picks — on the days and time your team chooses — with a button that opens a session right in the browser. Nobody schedules anything; the laugh just shows up.",
  },
];

function TeamBuildingPage() {
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
            Slack team building: simple activities your team can do <span className="text-primary">without another meeting.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
            No calendar invite. No camera. No turn to perform. Just 2–5 minutes of laughing out loud together — in your browser today, inside Slack soon.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href="#waitlist" className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 font-bold text-primary-foreground shadow-lg transition hover:scale-[1.03]">
              <Slack className="size-4" /> Join the waitlist
            </a>
            <Link to="/" className="inline-flex items-center gap-2 rounded-full border bg-card/70 px-6 py-3.5 font-bold transition hover:bg-muted">
              Try a session now
            </Link>
          </div>
        </section>

        {/* PROBLEM */}
        <section className="mt-24">
          <h2 className="font-display text-3xl font-black md:text-5xl">Most team building is just… another meeting.</h2>
          <div className="mt-5 max-w-3xl space-y-4 text-lg leading-relaxed text-muted-foreground">
            <p>Every few months a new tool promises to make your team feel closer. A coffee-chat pairing app that matches people randomly. A quiz that turns your #general channel into a trivia night. A bot that asks everyone their favorite pizza topping.</p>
            <p>They're fine. But look at what they cost: <span className="font-semibold text-foreground">everyone's time, at the same time.</span> A calendar slot, a camera, a script — and for the quieter half of the team, a small performance of enthusiasm.</p>
            <p>Team building by meeting has a ceiling. And your calendar is already full of it.</p>
          </div>
        </section>

        {/* INSIGHT */}
        <section className="mt-24 rounded-3xl border bg-card p-8 md:p-12">
          <h2 className="font-display text-3xl font-black md:text-5xl">What actually connects people is <span className="text-primary">laughing together.</span></h2>
          <div className="mt-5 max-w-3xl space-y-4 text-lg leading-relaxed text-muted-foreground">
            <p>Shared laughter is different from every other team activity. It's physical. It's involuntary — you can't do it politely. And it's contagious: one person's real laugh pulls everyone else's out.</p>
            <p>And it's <span className="font-semibold text-foreground">short.</span> A guided laugh break takes 2–5 minutes, not a calendar hour. Nobody has to talk, present, or be clever. The AI guides lead the session; each one laughs in their own unmistakable way; your team just follows along.</p>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              { i: <CalendarX className="size-5" />, t: "No meeting", d: "Join from your browser whenever it suits you. The bot does the inviting." },
              { i: <Timer className="size-5" />, t: "2–5 minutes", d: "A laugh break, not a workshop. Back to work feeling lighter." },
              { i: <Users className="size-5" />, t: "No performing", d: "Nobody has to be funny. You just have to laugh — and the guides make that easy." },
            ].map((c) => (
              <div key={c.t} className="rounded-2xl border bg-background/40 p-5">
                <span className="flex size-10 items-center justify-center rounded-2xl bg-primary/15 text-primary">{c.i}</span>
                <h3 className="mt-3 font-display text-lg font-black">{c.t}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{c.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ACTIVITIES */}
        <section className="mt-24">
          <h2 className="font-display text-3xl font-black md:text-5xl">5 simple Slack team building activities <span className="text-accent">(no meeting required)</span></h2>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">Four of these you can run with your team right now. The fifth arrives when Laughter Circle for Slack does.</p>
          <div className="mt-10 space-y-4">
            {ACTIVITIES.map((a, n) => (
              <div key={a.title} className="flex gap-4 rounded-3xl border bg-card p-6 sm:gap-6">
                <span className="hidden size-12 shrink-0 items-center justify-center rounded-2xl bg-primary/15 text-primary sm:flex">{a.icon}</span>
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="font-display text-xl font-black leading-snug">{n + 1}. {a.title}</h3>
                    <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ${a.live === "Coming to Slack" ? "bg-accent/15 text-accent" : "bg-primary/15 text-primary"}`}>{a.live}</span>
                  </div>
                  <p className="mt-2 leading-relaxed text-muted-foreground">{a.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* VS MEETING */}
        <section className="mt-24">
          <h2 className="font-display text-3xl font-black md:text-5xl">A laugh break vs. another meeting</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="rounded-3xl border bg-card p-6">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">Team building as a meeting</p>
              <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-muted-foreground">
                {["Finds a slot in everyone's calendar", "Camera on, everyone watching", "Someone has to host and be entertaining", "Quieter teammates coast or perform", "Ends when the timer runs out"].map((t) => (
                  <li key={t} className="flex gap-2.5"><span className="mt-0.5 text-muted-foreground/50">✕</span>{t}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl border bg-primary/10 p-6">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Team building as a laugh break</p>
              <ul className="mt-4 space-y-2.5 text-sm leading-relaxed">
                {["Joins from the browser, whenever you like", "Camera off, mic off — laughing is enough", "The AI guides host; nobody performs", "Shared laughter does the connecting", "Ends with a mood check-in, feeling lighter"].map((t) => (
                  <li key={t} className="flex gap-2.5"><Check className="mt-0.5 size-4 shrink-0 text-primary" />{t}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* HOW SLACK */}
        <section className="mt-24">
          <h2 className="font-display text-3xl font-black md:text-5xl">How it will work inside Slack.</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              { n: "1", t: "Connect your workspace", d: "A workspace admin connects Laughter Circle to one public channel — that's the only access it asks for. It never reads messages." },
              { n: "2", t: "Pick your rhythm", d: "Choose your time zone, two days a week and one time. Laughter Circle posts a laugh break with a button that opens the session in the browser." },
              { n: "3", t: "Laugh together", d: "Whoever feels like it clicks and joins their own session — 3 minutes, an AI guide, and buddies laughing along. Anonymous by design: only totals are measured." },
            ].map((s) => (
              <div key={s.n} className="rounded-3xl border bg-card p-6">
                <span className="flex size-10 items-center justify-center rounded-full bg-primary font-display text-lg font-black text-primary-foreground">{s.n}</span>
                <h3 className="mt-4 font-display text-xl font-black leading-snug">{s.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* WAITLIST */}
        <section id="waitlist" className="mt-24 scroll-mt-8 rounded-3xl bg-primary p-8 text-center text-primary-foreground md:p-12">
          <h2 className="font-display text-3xl font-black md:text-5xl">Stop scheduling fun.</h2>
          <p className="mt-2 font-display text-2xl font-black opacity-95 md:text-3xl">Let the laughter spread instead.</p>
          <p className="mt-5 font-bold">Laughter Circle for Slack is coming soon.</p>
          <div className="mx-auto mt-7 max-w-md"><SlackWaitlistForm /></div>
          <p className="mt-4 text-sm opacity-90">Be one of the first teams to try Laughter Circle for Slack.</p>
          <Link to="/slack" className="mt-3 inline-block text-sm font-bold underline">Want more about the Slack integration? →</Link>
        </section>

        {/* TRY NOW */}
        <section className="mt-24 rounded-3xl border bg-card p-8 text-center md:p-12">
          <h2 className="font-display text-3xl font-black md:text-5xl">Don't wait for the bot. <span className="text-primary">Laugh today.</span></h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            The full experience already works in your browser: pick one of ten AI guides, take a guided laugh break, and feel the difference for yourself — before you ask your team to.
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
