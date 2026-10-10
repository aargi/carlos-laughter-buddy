import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Slack,
  Check,
  Coffee,
  Users,
  Wind,
  PersonStanding,
  Trophy,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { ShareButton } from "@/components/ShareButton";
import { LogoMark } from "@/components/LogoMark";
import { SiteFooter } from "@/components/SiteFooter";
import { SlackWaitlistForm } from "@/components/SlackWaitlistForm";

const TITLE = "Slack Wellness: Simple Ways to Support Wellbeing at Work";
const DESCRIPTION =
  "Simple workplace wellness ideas for Slack: micro breaks, social activities, mindfulness, movement breaks, recognition and shared team activities — for remote, hybrid and distributed teams.";

export const Route = createFileRoute("/slack/wellness")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "https://laughtercircle.com/slack/wellness" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://laughtercircle.com/slack/wellness" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: TITLE,
          description: DESCRIPTION,
          url: "https://laughtercircle.com/slack/wellness",
          publisher: { "@type": "Organization", name: "Laughter Circle" },
        }),
      },
    ],
  }),
  component: SlackWellnessPage,
});

const WAYS = [
  {
    icon: <Coffee className="size-5" />,
    title: "Small breaks",
    body: "A short, optional pause posted in a channel gives people permission to step away: a five-minute screen break, a coffee, a moment without a call. When the invitation comes from the team, taking it stops feeling like falling behind.",
    fit: "Good for any team with back-to-back meetings. Keep breaks short and make them genuinely optional.",
  },
  {
    icon: <PersonStanding className="size-5" />,
    title: "Movement breaks",
    body: "Invite the team to stand up, stretch or take a short walk — posted in Slack so it reaches people working from home and the office alike. Nobody has to share a camera or report back.",
    fit: "Good for remote and hybrid teams that spend the day sitting. A fixed time each day is easier to keep than a sporadic reminder.",
  },
  {
    icon: <Wind className="size-5" />,
    title: "Mindfulness moments",
    body: "A one-minute breathing reset, a quiet minute before a busy week, or a link to a short guided exercise. Small resets work because they cost almost nothing to join.",
    fit: "Good at natural transition points — Monday morning, before a launch, at the end of a sprint.",
  },
  {
    icon: <Users className="size-5" />,
    title: "Social connection",
    body: "Optional threads for pets, playlists, desk photos or weekend discoveries recreate the informal conversation a distributed team loses when everyone works from different places.",
    fit: "Good for teams spread across locations and time zones. Rotate topics so quieter people get an easy route in.",
  },
  {
    icon: <Trophy className="size-5" />,
    title: "Recognition",
    body: "A channel or ritual for noticing good work — a thank-you thread, a small win of the week — makes effort visible. Feeling seen is one of the simplest forms of wellbeing at work.",
    fit: "Good for teams of any size. Keep the tone genuine and let anyone contribute, not only managers.",
  },
  {
    icon: <Sparkles className="size-5" />,
    title: "Shared team activities",
    body: "Give everyone something to do, hear or feel in common: a guided laughter session, a game, a challenge. A shared experience creates energy and conversation more naturally than another prompt.",
    fit: "Good when the team needs a change of energy, not another message. Choose something brief and accessible to different personalities.",
  },
];

function SlackWellnessPage() {
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
          <p className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground"><Slack className="size-4" /> Laughter Circle for Slack</p>
          <h1 className="mt-3 font-display text-4xl font-black leading-tight md:text-6xl">
            Slack wellness: simple ways to support wellbeing <span className="text-primary">at work.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
            Wellbeing does not arrive with a portal or a program. For most teams, it is the sum of small moments: a real break, a stretch, a thank-you, a laugh. Slack can carry those moments to everyone — remote, hybrid or in the office.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href="#ways" className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 font-bold text-primary-foreground shadow-lg transition hover:scale-[1.03]">
              See the six ways <ArrowRight className="size-4" />
            </a>
            <Link to="/slack" className="inline-flex items-center gap-2 rounded-full border bg-card/70 px-6 py-3.5 font-bold transition hover:bg-muted">
              Laughter Circle for Slack
            </Link>
          </div>
        </section>

        <section className="mt-24">
          <h2 className="font-display text-3xl font-black md:text-5xl">Why small moments beat big programs</h2>
          <div className="mt-5 max-w-3xl space-y-4 text-lg leading-relaxed text-muted-foreground">
            <p>Workplace wellbeing is often treated as an initiative: a webinar, a platform, a month-long challenge. The teams that feel best usually have something quieter — a rhythm of small, repeatable moments that fit inside the workday.</p>
            <p>Slack is already where the team spends its day, so it is the natural place for those moments. A break posted in a channel reaches people at their desk, not in another inbox. It can be joined in a minute and skipped without guilt.</p>
            <p>No single activity supports everyone. Breaks, movement, mindfulness, recognition and shared experiences each help in a different way. The mix matters more than any one idea — and this article is a starting point, not a prescription.</p>
          </div>
        </section>

        <section id="ways" className="mt-24 scroll-mt-8">
          <h2 className="font-display text-3xl font-black md:text-5xl">Six ways to support wellbeing in Slack</h2>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">Use these as starting points, then adapt the pace and tone to how your team actually works.</p>
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

        <section className="mt-24 rounded-3xl border bg-primary/10 p-8 md:p-12">
          <p className="inline-flex items-center gap-2 rounded-full bg-primary/15 px-3 py-1 text-xs font-bold uppercase tracking-wide text-primary"><Sparkles className="size-3.5" /> A shared experience</p>
          <h2 className="mt-4 font-display text-3xl font-black md:text-5xl">A guided laugh can be part of the team's <span className="text-primary">breaks.</span></h2>
          <div className="mt-5 max-w-3xl space-y-4 text-lg leading-relaxed text-muted-foreground">
            <p>A guided laughter session gives teammates a short, shared break: an AI guide explains each exercise, laughs first, and invites everyone to follow along in their browser for a few minutes. It fits alongside stretch breaks, breathing resets and social threads — one more option in the mix, not a replacement for any of them.</p>
            <p>It is not a wellness program or a treatment of any kind — it is simply a light, shared moment that many teams enjoy. Some groups will prefer a walk or a quiet reset, and that is fine too.</p>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              { title: "About 3 minutes", text: "Short enough to fit between tasks, without adding another meeting to the calendar." },
              { title: "Nothing to install", text: "Everyone joins from their own browser, at the office, at home or from a different city." },
              { title: "A moment in common", text: "The session gives the team something shared to react to and talk about afterwards." },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border bg-background/40 p-5">
                <h3 className="font-display text-lg font-black">{item.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
              </div>
            ))}
          </div>
          <Link to="/slack" className="mt-8 inline-flex items-center gap-2 font-bold text-primary underline">
            See how Laughter Circle for Slack works <ArrowRight className="size-4" />
          </Link>
        </section>

        <section className="mt-24">
          <h2 className="font-display text-3xl font-black md:text-5xl">A simple wellbeing rhythm</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="rounded-3xl border bg-card p-6">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">For a distributed team</p>
              <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-muted-foreground">
                {["Favor breaks and activities anyone can join asynchronously", "Anchor one small ritual to the week, not to a specific hour", "Keep everything optional and free of reporting"].map((text) => (
                  <li key={text} className="flex gap-2.5"><Check className="mt-0.5 size-4 shrink-0 text-primary" />{text}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl border bg-card p-6">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">For a hybrid team</p>
              <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-muted-foreground">
                {["Post breaks in the shared channel so home and office days feel equal", "Alternate between physical, social and recognition moments", "Keep it brief and separate from performance or attendance"].map((text) => (
                  <li key={text} className="flex gap-2.5"><Check className="mt-0.5 size-4 shrink-0 text-primary" />{text}</li>
                ))}
              </ul>
            </div>
          </div>
          <p className="mt-7 max-w-3xl leading-relaxed text-muted-foreground">
            Wellbeing is one part of a broader team rhythm. Explore <Link to="/slack/team-building" className="font-semibold text-primary underline">Slack team-building activities</Link>, how recognition, rituals, games and breaks support <Link to="/slack/employee-engagement" className="font-semibold text-primary underline">employee engagement in Slack</Link>, more <Link to="/slack/icebreakers" className="font-semibold text-primary underline">Slack icebreaker ideas</Link>, and simple ways to help <Link to="/slack/remote-teams" className="font-semibold text-primary underline">remote teams connect</Link>.
          </p>
        </section>

        <section id="waitlist" className="mt-24 scroll-mt-8 rounded-3xl bg-primary p-8 text-center text-primary-foreground md:p-12">
          <h2 className="font-display text-3xl font-black md:text-5xl">Add a lighter kind of break.</h2>
          <p className="mt-2 font-display text-2xl font-black opacity-95 md:text-3xl">Let the laughter spread.</p>
          <p className="mt-5 font-bold">Laughter Circle for Slack is coming soon.</p>
          <div className="mx-auto mt-7 max-w-md"><SlackWaitlistForm /></div>
          <p className="mt-4 text-sm opacity-90">Be one of the first teams to try it.</p>
          <Link to="/slack" className="mt-3 inline-block text-sm font-bold underline">More about Laughter Circle for Slack →</Link>
        </section>

        <section className="mt-24 rounded-3xl border bg-card p-8 text-center md:p-12">
          <h2 className="font-display text-3xl font-black md:text-5xl">Try the shared experience <span className="text-primary">before sharing it.</span></h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Pick one of ten AI guides and take a guided laughter session in your browser. Then decide whether it fits your team.
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
