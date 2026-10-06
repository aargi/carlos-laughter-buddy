import { createFileRoute, Link } from "@tanstack/react-router";
import { Slack, Check, Sparkles } from "lucide-react";
import { ShareButton } from "@/components/ShareButton";
import { LogoMark } from "@/components/LogoMark";
import { SiteFooter } from "@/components/SiteFooter";
import { SlackWaitlistForm } from "@/components/SlackWaitlistForm";

export const Route = createFileRoute("/blog/best-slack-apps-team-building")({
  head: () => ({
    meta: [
      { title: "7 Best Slack Apps for Team Building in 2026 — Laughter Circle" },
      { name: "description", content: "An honest comparison of the 7 best Slack apps for team building in 2026: Laughter Circle, Donut, Trivia, CultureBot, HeyTaco, Polly and Ricotta — what each does best and which team it fits." },
      { property: "og:title", content: "7 Best Slack Apps for Team Building in 2026" },
      { property: "og:description", content: "Laughter Circle, Donut, Trivia, CultureBot, HeyTaco, Polly and Ricotta — what each Slack team building app does best, and which team it fits." },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "https://laughtercircle.com/blog/best-slack-apps-team-building" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://laughtercircle.com/blog/best-slack-apps-team-building" }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        headline: "7 Best Slack Apps for Team Building in 2026",
        description: "An honest comparison of the 7 best Slack apps for team building in 2026: Laughter Circle, Donut, Trivia, CultureBot, HeyTaco, Polly and Ricotta.",
        author: { "@type": "Organization", name: "Laughter Circle" },
        publisher: { "@type": "Organization", name: "Laughter Circle" },
        mainEntityOfPage: "https://laughtercircle.com/blog/best-slack-apps-team-building",
      }),
    }],
  }),
  component: BestSlackAppsPage,
});

const APPS = [
  {
    name: "Laughter Circle",
    tagline: "The shared laugh break",
    best: "Teams that want a physical, genuine moment of connection — not another quiz.",
    body: "Laughter Circle does something no other Slack app does: it gets your team laughing out loud together for 2–5 minutes. The bot posts a laugh break into a channel your admin picks, on the days and time your team chooses, with a button that opens a guided session in the browser. Ten AI guides — each with their own voice and unmistakable laugh — lead the exercises, and two buddy guides laugh along with you by default. No meeting, no camera, no performing. Anonymous by design: only aggregate participation is measured, never who joined.",
    fit: "Remote and hybrid teams who are tired of calendar-based team building and want something short, physical and genuinely shared.",
    ours: true,
  },
  {
    name: "Donut",
    tagline: "The coffee-chat pairing app",
    best: "Random 1:1 introductions across a large organization.",
    body: "Donut pairs teammates for virtual coffee chats on a recurring schedule and nudges them to meet. It's the classic answer to 'people in different departments never talk to each other' and works well for onboarding buddies and cross-team intros.",
    fit: "Larger companies where the main problem is that people simply don't know each other yet.",
  },
  {
    name: "Trivia",
    tagline: "Games inside your channels",
    best: "Quick competitive games — trivia, word puzzles, GIF battles — without leaving Slack.",
    body: "Trivia turns any channel into a game show: scheduled quizzes, word games and picture rounds with leaderboards. It's easy to start and gives competitive teams a fun reason to show up in a channel.",
    fit: "Competitive teams who enjoy games and want a low-effort recurring activity in a channel.",
  },
  {
    name: "CultureBot",
    tagline: "The culture automation toolkit",
    best: "Automating the People Ops basics: birthdays, anniversaries, shout-outs, watercooler prompts.",
    body: "CultureBot is a broad toolkit: it celebrates birthdays and work anniversaries, sends watercooler conversation starters, collects peer shout-outs and runs health checks. It keeps the small rituals of office culture alive in a remote setting.",
    fit: "People Ops teams who want to automate culture rituals and recognition across the whole company.",
  },
  {
    name: "HeyTaco",
    tagline: "Peer recognition with tacos",
    best: "Making appreciation a daily habit through playful peer-to-peer recognition.",
    body: "HeyTaco lets teammates give each other virtual tacos to say thanks, with leaderboards and rewards. It's simple, cheerful and surprisingly effective at making gratitude visible in day-to-day work.",
    fit: "Teams who want to strengthen a culture of appreciation rather than run scheduled activities.",
  },
  {
    name: "Polly",
    tagline: "Polls and surveys in Slack",
    best: "Instant polls, pulse surveys and feedback loops without leaving the conversation.",
    body: "Polly is the polling workhorse of Slack: quick votes, standups, pulse surveys and feedback forms, with results right in the channel. It's less about play and more about giving every voice a low-friction way to be heard.",
    fit: "Managers and People teams who need fast, structured input from the team.",
  },
  {
    name: "Ricotta",
    tagline: "Trivia and icebreakers on autopilot",
    best: "Scheduled trivia contests and icebreaker questions that run themselves.",
    body: "Ricotta schedules trivia games, 'this or that' questions, word chains and icebreakers into your channels automatically. Set the cadence once and the channel stays lively without anyone having to host.",
    fit: "Teams who want a set-and-forget stream of light games and prompts in their channels.",
  },
];

function BestSlackAppsPage() {
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
          <p className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground"><Slack className="size-4" /> Laughter Circle blog</p>
          <h1 className="mt-3 font-display text-4xl font-black leading-tight md:text-6xl">
            7 best Slack apps for <span className="text-primary">team building</span> in 2026
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
            Looking for a Slack app for team building, employee engagement, games or icebreakers? Here's an honest look at what each of the seven best options does well — and which kind of team each one fits.
          </p>
          <p className="mt-4 max-w-2xl text-sm text-muted-foreground">
            Full disclosure: we build Laughter Circle, one of the apps on this list. We've tried to be fair to everyone — each app here is genuinely good at something different.
          </p>
        </section>

        {/* QUICK PICKS */}
        <section className="mt-16 rounded-3xl border bg-card p-8 md:p-10">
          <h2 className="font-display text-2xl font-black md:text-3xl">The short version</h2>
          <ul className="mt-5 space-y-2.5 text-sm leading-relaxed text-muted-foreground sm:text-base">
            {APPS.map((a) => (
              <li key={a.name} className="flex gap-2.5">
                <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                <span><span className="font-bold text-foreground">{a.name}</span> — {a.best.charAt(0).toLowerCase() + a.best.slice(1)}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* APP CARDS */}
        <section className="mt-24">
          <h2 className="font-display text-3xl font-black md:text-5xl">The 7 apps, one by one</h2>
          <div className="mt-10 space-y-5">
            {APPS.map((a, n) => (
              <article key={a.name} className={`rounded-3xl border p-6 sm:p-8 ${a.ours ? "bg-primary/10 ring-1 ring-primary/40" : "bg-card"}`}>
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="font-display text-2xl font-black leading-snug">{n + 1}. {a.name}</h3>
                  {a.ours && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-primary px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-primary-foreground">
                      <Sparkles className="size-3" /> That's us
                    </span>
                  )}
                  <span className="rounded-full bg-muted px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-muted-foreground">{a.tagline}</span>
                </div>
                <p className="mt-3 leading-relaxed text-muted-foreground">{a.body}</p>
                <p className="mt-3 text-sm leading-relaxed">
                  <span className="font-bold text-primary">Best for:</span>{" "}
                  <span className="text-muted-foreground">{a.fit}</span>
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* HOW TO CHOOSE */}
        <section className="mt-24">
          <h2 className="font-display text-3xl font-black md:text-5xl">How to choose</h2>
          <div className="mt-5 max-w-3xl space-y-4 text-lg leading-relaxed text-muted-foreground">
            <p>Most of these apps aren't rivals — they solve different problems. Recognition apps like HeyTaco make gratitude visible. Polls like Polly make voices heard. Games like Trivia and Ricotta keep channels lively. Donut introduces people who've never met. CultureBot keeps rituals on rails.</p>
            <p>What none of them do is create a <span className="font-semibold text-foreground">shared physical moment</span>. That's the gap Laughter Circle fills: 2–5 minutes of laughing out loud together, no meeting, no camera, no performing. If your team's problem is distance rather than silence, that's the one to try first.</p>
          </div>
        </section>

        {/* WAITLIST */}
        <section id="waitlist" className="mt-24 scroll-mt-8 rounded-3xl bg-primary p-8 text-center text-primary-foreground md:p-12">
          <h2 className="font-display text-3xl font-black md:text-5xl">The laugh break, inside Slack.</h2>
          <p className="mt-5 font-bold">Laughter Circle for Slack is coming soon.</p>
          <div className="mx-auto mt-7 max-w-md"><SlackWaitlistForm /></div>
          <p className="mt-4 text-sm opacity-90">Be one of the first teams to try Laughter Circle for Slack.</p>
          <Link to="/slack" className="mt-3 inline-block text-sm font-bold underline">More about the Slack integration →</Link>
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
