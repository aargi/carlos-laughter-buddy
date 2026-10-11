import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Smile,
  Check,
  Users,
  Wind,
  Sparkles,
  Globe,
  ArrowRight,
  Heart,
  Building2,
} from "lucide-react";
import { ShareButton } from "@/components/ShareButton";
import { LogoMark } from "@/components/LogoMark";
import { SiteFooter } from "@/components/SiteFooter";

const TITLE = "What Is Laughter Yoga? How It Works and Why People Practice It";
const DESCRIPTION =
  "A clear guide to laughter yoga: what it is, where it comes from, what happens in a session, the exercises used and where it is practiced — from groups and companies to online sessions and events.";

export const Route = createFileRoute("/laughter-yoga/")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "https://laughtercircle.com/laughter-yoga" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://laughtercircle.com/laughter-yoga" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: TITLE,
          description: DESCRIPTION,
          url: "https://laughtercircle.com/laughter-yoga",
          publisher: { "@type": "Organization", name: "Laughter Circle" },
        }),
      },
    ],
  }),
  component: LaughterYogaPage,
});

const EXERCISES = [
  {
    icon: <Smile className="size-5" />,
    title: "Playful laughter exercises",
    body: "Short, guided prompts that invite you to laugh on purpose: greeting laughter, counting laughter, laughing at imaginary situations. No jokes or comedy are needed — the laughter starts as an exercise and often becomes real on its own.",
  },
  {
    icon: <Wind className="size-5" />,
    title: "Breathing and warm-ups",
    body: "Sessions usually open and close with gentle breathing: deep breaths, stretches and clapping rhythms. These warm the body up, loosen self-consciousness and bring the group back to calm at the end.",
  },
  {
    icon: <Users className="size-5" />,
    title: "Group dynamics",
    body: "Eye contact, mirroring and laughing together are part of the design. Laughing in a group is contagious, so even people who start by pretending usually end up laughing genuinely within a few minutes.",
  },
  {
    icon: <Sparkles className="size-5" />,
    title: "Free laughter",
    body: "Many sessions build towards a moment of unstructured laughter — no script, no pattern, just letting it out. A cool-down with slow breathing follows, so people leave relaxed rather than wired.",
  },
];

const CONTEXTS = [
  {
    icon: <Users className="size-5" />,
    title: "Groups and clubs",
    body: "Laughter yoga is often practiced in laughter clubs: informal groups that meet in parks, community centers or studios to laugh together on a regular basis.",
  },
  {
    icon: <Building2 className="size-5" />,
    title: "Companies and teams",
    body: "Workplaces bring in laughter sessions as a light team activity — a way to break routine, release tension and share something that is not another meeting.",
  },
  {
    icon: <Globe className="size-5" />,
    title: "Online sessions",
    body: "Guided sessions work over video calls and in the browser, which makes them accessible to remote teams, distributed families and anyone who cannot attend in person.",
  },
  {
    icon: <Heart className="size-5" />,
    title: "Events and wellbeing activities",
    body: "Festivals, retreats, senior centers, schools and wellbeing programs use laughter sessions as an energizer or a shared moment inside a larger agenda.",
  },
];

function LaughterYogaPage() {
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
            What is laughter yoga — and why do people <span className="text-primary">practice it?</span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
            Laughter yoga is the practice of laughing on purpose, usually in a group, combining guided laughter exercises with gentle breathing. It does not rely on jokes or a sense of humor — the laughter itself is the exercise.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href="#how-it-works" className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 font-bold text-primary-foreground shadow-lg transition hover:scale-[1.03]">
              How it works <ArrowRight className="size-4" />
            </a>
            <Link to="/" className="inline-flex items-center gap-2 rounded-full border bg-card/70 px-6 py-3.5 font-bold transition hover:bg-muted">
              Try a guided session
            </Link>
          </div>
        </section>

        <section className="mt-24">
          <h2 className="font-display text-3xl font-black md:text-5xl">Where it comes from</h2>
          <div className="mt-5 max-w-3xl space-y-4 text-lg leading-relaxed text-muted-foreground">
            <p>Laughter yoga began in 1995 in Mumbai, when physician Dr. Madan Kataria started a small "laughter club" in a local park. The group began by telling jokes — and when the jokes ran out, they discovered something more durable: laughter could be started deliberately, as an exercise, and the body responded much the same way.</p>
            <p>From that park, the practice spread into a worldwide movement of laughter clubs, facilitators and sessions. The core idea stayed simple: anyone can laugh without a reason, and doing it together is easier — and more fun — than doing it alone.</p>
          </div>
        </section>

        <section id="how-it-works" className="mt-24 scroll-mt-8">
          <h2 className="font-display text-3xl font-black md:text-5xl">What happens in a session</h2>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">Sessions vary by facilitator, but most follow a familiar shape: warm up, laugh through guided exercises, then come back to calm.</p>
          <div className="mt-10 space-y-4">
            {EXERCISES.map((item, index) => (
              <div key={item.title} className="flex gap-4 rounded-3xl border bg-card p-6 sm:gap-6">
                <span className="hidden size-12 shrink-0 items-center justify-center rounded-2xl bg-primary/15 text-primary sm:flex">{item.icon}</span>
                <div>
                  <h3 className="font-display text-xl font-black leading-snug">{index + 1}. {item.title}</h3>
                  <p className="mt-2 leading-relaxed text-muted-foreground">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-7 max-w-3xl leading-relaxed text-muted-foreground">
            A typical session lasts anywhere from a few minutes to half an hour. The pattern matters more than the length: start gently, build the laughter up, and always finish with a moment of calm breathing.
          </p>
        </section>

        <section className="mt-24">
          <h2 className="font-display text-3xl font-black md:text-5xl">Where people practice it</h2>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">Laughter yoga shows up in more places than you might expect.</p>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {CONTEXTS.map((item) => (
              <div key={item.title} className="rounded-3xl border bg-card p-6">
                <span className="flex size-12 items-center justify-center rounded-2xl bg-primary/15 text-primary">{item.icon}</span>
                <h3 className="mt-4 font-display text-xl font-black">{item.title}</h3>
                <p className="mt-2 leading-relaxed text-muted-foreground">{item.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-24 rounded-3xl border bg-primary/10 p-8 md:p-12">
          <p className="inline-flex items-center gap-2 rounded-full bg-primary/15 px-3 py-1 text-xs font-bold uppercase tracking-wide text-primary"><Sparkles className="size-3.5" /> Laughter Circle</p>
          <h2 className="mt-4 font-display text-3xl font-black md:text-5xl">Guided laughter, <span className="text-primary">in your browser.</span></h2>
          <div className="mt-5 max-w-3xl space-y-4 text-lg leading-relaxed text-muted-foreground">
            <p>Laughter Circle is inspired by these practices: a guided laughter session where an AI guide explains each exercise, laughs first, and invites you to follow along for a few minutes — with the same arc of warm-up, rising laughter and a calm finish.</p>
            <p>It is not a replacement for a trained laughter yoga professional, and it makes no medical or therapeutic claims. It is simply a light, accessible way to experience a guided laugh — on your own, or with your team. For teams, we are also bringing it <Link to="/slack" className="font-semibold text-primary underline">into Slack</Link>, where it fits naturally alongside other <Link to="/slack/wellness" className="font-semibold text-primary underline">workplace wellness moments</Link>.</p>
            <p>Curious how this project started? It was built while running — literally. <Link to="/story" className="font-semibold text-primary underline">Read our story</Link>.</p>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              { title: "About 3 minutes", text: "A short guided session that fits into a break, not the calendar." },
              { title: "Ten AI guides", text: "Each with their own voice, aura and unmistakable laugh." },
              { title: "Nothing to install", text: "Open the browser, pick a guide, and laugh along." },
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
          <h2 className="font-display text-3xl font-black md:text-5xl">A few honest notes</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="rounded-3xl border bg-card p-6">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">What laughter yoga is</p>
              <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-muted-foreground">
                {["A playful group practice of laughing on purpose", "A mix of laughter exercises and gentle breathing", "Open to anyone — no jokes, flexibility or experience needed"].map((text) => (
                  <li key={text} className="flex gap-2.5"><Check className="mt-0.5 size-4 shrink-0 text-primary" />{text}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl border bg-card p-6">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">What it is not</p>
              <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-muted-foreground">
                {["Not a medical treatment or a therapy of any kind", "Not a substitute for professional care or advice", "Not about forcing yourself to feel a certain way"].map((text) => (
                  <li key={text} className="flex gap-2.5"><Check className="mt-0.5 size-4 shrink-0 text-primary" />{text}</li>
                ))}
              </ul>
            </div>
          </div>
          <p className="mt-7 max-w-3xl leading-relaxed text-muted-foreground">
            This page is the start of a series. Coming soon: laughter yoga at work, classic laughter yoga exercises, virtual laughter sessions and laughter yoga for teams.
          </p>
        </section>

        <section className="mt-24 rounded-3xl bg-primary p-8 text-center text-primary-foreground md:p-12">
          <h2 className="font-display text-3xl font-black md:text-5xl">Try a guided laugh yourself.</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg opacity-95">
            Pick one of ten AI guides and take a short laughter session in your browser — no signup, nothing to install.
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
