import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Smile,
  Check,
  Users,
  Building2,
  Globe,
  Sparkles,
  ArrowRight,
  Clock,
  Briefcase,
  Monitor,
} from "lucide-react";
import { ShareButton } from "@/components/ShareButton";
import { LogoMark } from "@/components/LogoMark";
import { SiteFooter } from "@/components/SiteFooter";

const TITLE = "Laughter Yoga at Work: Simple Ways to Bring Laughter Into the Workplace";
const DESCRIPTION =
  "How to bring laughter yoga and guided laughter sessions into the workplace: small breaks, team sessions and workshops — with a professional, a group activity or a guided digital session — for in-person, hybrid and remote teams.";

export const Route = createFileRoute("/laughter-yoga/at-work")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "https://laughtercircle.com/laughter-yoga/at-work" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://laughtercircle.com/laughter-yoga/at-work" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: TITLE,
          description: DESCRIPTION,
          url: "https://laughtercircle.com/laughter-yoga/at-work",
          publisher: { "@type": "Organization", name: "Laughter Circle" },
        }),
      },
    ],
  }),
  component: LaughterYogaAtWorkPage,
});

const WAYS = [
  {
    icon: <Clock className="size-5" />,
    title: "Short laughter breaks",
    body: "A five-minute guided laugh between blocks of work: stand up, laugh together, take a slow breath and return. Because it is short, it fits the workday instead of competing with it — and nobody has to prepare anything.",
    fit: "Good for any team, any week. Some companies anchor it to a fixed slot, others drop it in when energy dips.",
  },
  {
    icon: <Users className="size-5" />,
    title: "Team sessions",
    body: "A longer guided session — ten to thirty minutes — for a whole team or department. The group dynamic does much of the work: laughter is contagious, so even skeptical participants usually join in within a few minutes.",
    fit: "Good for kick-offs, retros, offsites and onboarding weeks, when the team is already gathered and wants something different.",
  },
  {
    icon: <Briefcase className="size-5" />,
    title: "Connection activities and workshops",
    body: "Laughter exercises can sit inside a broader activity: an icebreaker before a workshop, an energizer in a long training day, or part of a team-building agenda. It works as one block, not the whole program.",
    fit: "Good when facilitators and HR teams want a warm, low-stakes opener that anyone can join regardless of role or seniority.",
  },
  {
    icon: <Building2 className="size-5" />,
    title: "In-person, hybrid and remote",
    body: "The format adapts to where the team is: a room together, some people in the room and some on a call, or everyone joining from their own screen. The guided structure travels well across all three setups.",
    fit: "Good for distributed and hybrid teams, where finding a shared moment that feels equal is the hardest part.",
  },
];

const SETUP_OPTIONS = [
  {
    icon: <Users className="size-5" />,
    title: "With a laughter yoga professional",
    body: "A certified laughter yoga facilitator or trainer can lead a session in person or live over video. This is the richest option: a professional reads the room, adapts the exercises and guides the group through the full arc — warm-up, laughter and calm finish. It is also the option that requires booking, budget and scheduling.",
    fit: "Best for offsites, wellbeing days and teams that want a facilitated, one-off experience.",
  },
  {
    icon: <Building2 className="size-5" />,
    title: "An organized group session",
    body: "Anyone in the team can organize a simple group session: a meeting slot, a shared screen, a few guided exercises from the classic laughter yoga repertoire. No certification is needed to laugh together — the format is simple enough that a volunteer can keep it light and short.",
    fit: "Best for teams that want something regular and low-cost, and are happy to keep it informal.",
  },
  {
    icon: <Monitor className="size-5" />,
    title: "Guided digital sessions",
    body: "A guided session in the browser, like the ones Laughter Circle offers: an AI guide explains each exercise, laughs first, and invites everyone to follow along. Everyone joins from their own device, so remote, hybrid and in-office colleagues share exactly the same experience — and it can happen any day, without booking anything.",
    fit: "Best for distributed teams and for trying the format before investing in a live facilitator.",
  },
];

function LaughterYogaAtWorkPage() {
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

        <section>
          <p className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground"><Smile className="size-4" /> A guide from Laughter Circle</p>
          <h1 className="mt-3 font-display text-4xl font-black leading-tight md:text-6xl">
            Laughter yoga at work: bringing laughter <span className="text-primary">into the workplace.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
            Laughter yoga does not need a park or a weekend retreat to be useful. Companies bring laughter sessions into the workday as short breaks, team activities and workshops — light moments that fit between meetings, not instead of them.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href="#ways" className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 font-bold text-primary-foreground shadow-lg transition hover:scale-[1.03]">
              See the ways <ArrowRight className="size-4" />
            </a>
            <Link to="/laughter-yoga" className="inline-flex items-center gap-2 rounded-full border bg-card/70 px-6 py-3.5 font-bold transition hover:bg-muted">
              What is laughter yoga?
            </Link>
          </div>
        </section>

        <section className="mt-24">
          <h2 className="font-display text-3xl font-black md:text-5xl">Why laughter shows up at work</h2>
          <div className="mt-5 max-w-3xl space-y-4 text-lg leading-relaxed text-muted-foreground">
            <p>Workdays are full of structured interaction: meetings, reviews, updates. What they usually lack is unstructured, shared moments — the kind where people are simply people for a few minutes. Guided laughter sessions are one way to create that moment deliberately.</p>
            <p>The format also lowers the usual barriers of workplace activities. There is nothing to learn, nothing to perform and no fitness requirement: the laughter starts as an exercise and often turns real on its own, especially in a group. And because a session can take three minutes, it does not compete with anyone's calendar.</p>
            <p>It is not a perk program or a wellness solution — it is a shared experience. Teams that enjoy it usually keep it as a small ritual rather than a big initiative.</p>
          </div>
        </section>

        <section id="ways" className="mt-24 scroll-mt-8">
          <h2 className="font-display text-3xl font-black md:text-5xl">Ways to bring laughter into the workday</h2>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">Different formats for different teams — from a single short break to a full workshop block.</p>
          <div className="mt-10 space-y-4">
            {WAYS.map((item, index) => (
              <div key={item.title} className="flex gap-4 rounded-3xl border bg-card p-6 sm:gap-6">
                <span className="hidden size-12 shrink-0 items-center justify-center rounded-2xl bg-primary/15 text-primary sm:flex">{item.icon}</span>
                <div>
                  <h3 className="font-display text-xl font-black leading-snug">{index + 1}. {item.title}</h3>
                  <p className="mt-2 leading-relaxed text-muted-foreground">{item.body}</p>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/80"><span className="font-semibold">When it fits:</span> {item.fit}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-24">
          <h2 className="font-display text-3xl font-black md:text-5xl">Three ways to run a session</h2>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">Once a team wants to try it, there are three main setups — each with its own trade-offs.</p>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {SETUP_OPTIONS.map((item) => (
              <div key={item.title} className="flex flex-col rounded-3xl border bg-card p-6">
                <span className="flex size-12 items-center justify-center rounded-2xl bg-primary/15 text-primary">{item.icon}</span>
                <h3 className="mt-4 font-display text-lg font-black leading-snug">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
                <p className="mt-3 text-xs leading-relaxed text-foreground/80"><span className="font-semibold">Fits best:</span> {item.fit}</p>
              </div>
            ))}
          </div>
          <p className="mt-7 max-w-3xl leading-relaxed text-muted-foreground">
            These options are not mutually exclusive. A common path is to start with a guided digital session to see how the team responds, then decide whether to keep it as a lightweight ritual or bring in a professional for a special occasion.
          </p>
        </section>

        <section className="mt-24">
          <h2 className="font-display text-3xl font-black md:text-5xl">A few honest notes</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="rounded-3xl border bg-card p-6">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">What laughter at work can be</p>
              <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-muted-foreground">
                {["A light, shared break inside the workday", "A team activity that anyone can join, regardless of role", "Something genuinely fun, not another box to tick"].map((text) => (
                  <li key={text} className="flex gap-2.5"><Check className="mt-0.5 size-4 shrink-0 text-primary" />{text}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl border bg-card p-6">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">What it is not</p>
              <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-muted-foreground">
                {["Not a medical treatment or a therapy of any kind", "Not a substitute for a trained laughter yoga professional", "Not something anyone should be required to enjoy — keep it optional"].map((text) => (
                  <li key={text} className="flex gap-2.5"><Check className="mt-0.5 size-4 shrink-0 text-primary" />{text}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="mt-24 rounded-3xl border bg-primary/10 p-8 md:p-12">
          <p className="inline-flex items-center gap-2 rounded-full bg-primary/15 px-3 py-1 text-xs font-bold uppercase tracking-wide text-primary"><Sparkles className="size-3.5" /> Laughter Circle</p>
          <h2 className="mt-4 font-display text-3xl font-black md:text-5xl">A guided laugh, <span className="text-primary">without booking anything.</span></h2>
          <div className="mt-5 max-w-3xl space-y-4 text-lg leading-relaxed text-muted-foreground">
            <p>Laughter Circle offers guided digital laughter sessions inspired by laughter yoga: an AI guide explains each exercise, laughs first, and invites the whole team to follow along in their browsers — in the office, at home or from different cities. Each of the ten guides has their own voice and their own unmistakable laugh.</p>
            <p>It is not a replacement for a trained laughter yoga professional, and it makes no medical or therapeutic claims. It is simply a light, accessible way for a team to share a laugh — any day, with nothing to install.</p>
            <p>For teams that work in Slack, we are bringing the same experience <Link to="/slack" className="font-semibold text-primary underline">into the workspace</Link>, where it sits alongside other <Link to="/slack/team-building" className="font-semibold text-primary underline">team-building activities</Link> and <Link to="/slack/wellness" className="font-semibold text-primary underline">workplace wellbeing moments</Link>.</p>
            <p>Looking to give sessions yourself? A page for laughter yoga professionals is coming soon. Meanwhile, <Link to="/" className="font-semibold text-primary underline">you can try the experience yourself</Link> in about three minutes.</p>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              { title: "About 3 minutes", text: "Short enough for a break, not a calendar block." },
              { title: "Ten AI guides", text: "Each with their own voice, aura and laugh." },
              { title: "Nothing to install", text: "Everyone joins from their own browser." },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border bg-background/40 p-5">
                <h3 className="font-display text-lg font-black">{item.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
              </div>
            ))}
          </div>
          <Link to="/" className="mt-8 inline-flex items-center gap-2 font-bold text-primary underline">
            Start a guided session <ArrowRight className="size-4" />
          </Link>
        </section>

        <section className="mt-24">
          <h2 className="font-display text-3xl font-black md:text-5xl">Keep exploring</h2>
          <div className="mt-5 max-w-3xl leading-relaxed text-muted-foreground">
            <p>
              Read <Link to="/laughter-yoga" className="font-semibold text-primary underline">what laughter yoga is and how it works</Link>, see how it fits into <Link to="/slack" className="font-semibold text-primary underline">Slack</Link> as part of <Link to="/slack/team-building" className="font-semibold text-primary underline">team-building activities</Link> and <Link to="/slack/wellness" className="font-semibold text-primary underline">workplace wellbeing</Link> — or go straight to <Link to="/" className="font-semibold text-primary underline">a guided session</Link>.
            </p>
          </div>
        </section>

        <section className="mt-24 rounded-3xl bg-primary p-8 text-center text-primary-foreground md:p-12">
          <h2 className="font-display text-3xl font-black md:text-5xl">Give your team a lighter kind of break.</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg opacity-95">
            Pick one of ten AI guides and take a short guided laughter session together — no signup, nothing to install.
          </p>
          <Link to="/" className="mt-7 inline-flex items-center gap-2 rounded-full bg-background px-6 py-3.5 font-bold text-foreground shadow-lg transition hover:scale-[1.03]">
            Start a session
          </Link>
        </section>

        <SiteFooter />
      </div>
    </main>
  );
}
