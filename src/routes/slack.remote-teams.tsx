import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Slack,
  Check,
  HelpCircle,
  Gamepad2,
  Timer,
  Users,
  Trophy,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { ShareButton } from "@/components/ShareButton";
import { LogoMark } from "@/components/LogoMark";
import { SiteFooter } from "@/components/SiteFooter";
import { SlackWaitlistForm } from "@/components/SlackWaitlistForm";

const TITLE = "Remote Team Building in Slack: Simple Ways to Help Distributed Teams Connect";
const DESCRIPTION =
  "Practical ways for remote and hybrid teams to connect in Slack: icebreakers, games, rituals, social connection, team breaks and shared activities — including guided laughter sessions.";

export const Route = createFileRoute("/slack/remote-teams")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "https://laughtercircle.com/slack/remote-teams" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://laughtercircle.com/slack/remote-teams" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: TITLE,
          description: DESCRIPTION,
          url: "https://laughtercircle.com/slack/remote-teams",
          publisher: { "@type": "Organization", name: "Laughter Circle" },
        }),
      },
    ],
  }),
  component: SlackRemoteTeamsPage,
});

const WAYS = [
  {
    icon: <HelpCircle className="size-5" />,
    title: "Icebreakers",
    body: "One easy question in a channel or thread gives distributed teammates a low-pressure way to show up as a person, not just a username. Keep it short and answerable from any time zone.",
    fit: "Good for onboarding new teammates and keeping distant colleagues visible. Rotate who answers first so it is never the same faces.",
  },
  {
    icon: <Gamepad2 className="size-5" />,
    title: "Lightweight games",
    body: "Emoji quizzes, two truths and a lie, trivia or photo challenges run entirely in Slack. Asynchronous play means someone in another time zone can still take part hours later.",
    fit: "Good when the team enjoys friendly competition. Keep rounds short so joining never competes with focused work.",
  },
  {
    icon: <Timer className="size-5" />,
    title: "Rituals",
    body: "A small repeating moment — Monday's week-kickoff question, Friday's wins thread, a monthly photo of everyone's desk — gives the week a shared shape without a meeting.",
    fit: "Good for teams spread across offices and home setups. Rituals matter most when people rarely share a room.",
  },
  {
    icon: <Users className="size-5" />,
    title: "Social connection",
    body: "Optional threads for pets, playlists, local food or weekend discoveries recreate the informal conversation a distributed team loses when the office disappears.",
    fit: "Good for hybrid teams split between locations. Rotate topics so quieter people get an easy route in.",
  },
  {
    icon: <Trophy className="size-5" />,
    title: "Team breaks",
    body: "A short, shared pause — a stretch, a breathing reset, a walk — posted at the same time lets teammates step away from the screen together, even from different cities.",
    fit: "Good when energy dips and back-to-back calls stack up. Make it optional and keep it under five minutes.",
  },
  {
    icon: <Sparkles className="size-5" />,
    title: "Shared activities",
    body: "Give everyone something to do, hear or feel in common: a guided laughter session, a song, a challenge. The conversation afterwards comes more naturally than a forced prompt.",
    fit: "Good when the team needs a change of energy rather than another question. Choose something brief and accessible to different personalities.",
  },
];

function SlackRemoteTeamsPage() {
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
            Remote team building in Slack: simple ways to help distributed teams <span className="text-primary">connect.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
            Distributed teams do not lose the work — they lose the small moments. The hallway chat, the coffee before the meeting, the laugh in the next room. Slack can carry some of that back, without another video call.
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
          <h2 className="font-display text-3xl font-black md:text-5xl">What connection looks like when nobody shares an office</h2>
          <div className="mt-5 max-w-3xl space-y-4 text-lg leading-relaxed text-muted-foreground">
            <p>In a co-located team, connection happens by accident. In a distributed team, it has to be planned — but it does not have to be scheduled as a meeting.</p>
            <p>The strongest remote cultures are built from small, repeatable moments that fit inside the tool people already use all day. A question, a game, a ritual, a shared pause: none of them need a calendar invite or a camera.</p>
            <p>No single format works for every team. Icebreakers help new groups learn each other. Rituals give the week a rhythm. Shared activities give everyone the same experience to react to. The mix matters more than any one idea.</p>
          </div>
        </section>

        <section id="ways" className="mt-24 scroll-mt-8">
          <h2 className="font-display text-3xl font-black md:text-5xl">Six ways to build connection across distances</h2>
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
          <h2 className="mt-4 font-display text-3xl font-black md:text-5xl">Guided laughter can bring a distributed team <span className="text-primary">into the same moment.</span></h2>
          <div className="mt-5 max-w-3xl space-y-4 text-lg leading-relaxed text-muted-foreground">
            <p>A guided laughter session gives teammates connected from different places, offices or home setups the same unusual, physical experience for a few minutes. An AI guide explains each exercise, laughs first, and invites everyone to follow along in their browser — at the same time, or whenever their workday allows.</p>
            <p>It can suit a team that wants to reset its energy together even when it cannot be in the same room. It will not be the right fit for every group — some teams will prefer trivia, conversation or a quiet social thread — but it adds a different option to the mix.</p>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              { title: "Works from anywhere", text: "Everyone joins from their own browser — a different city, a different office or the next room." },
              { title: "About 3 minutes", text: "Short enough to fit between tasks, without adding another meeting to the calendar." },
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
          <h2 className="font-display text-3xl font-black md:text-5xl">A simple rhythm for a distributed team</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="rounded-3xl border bg-card p-6">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">For a team across time zones</p>
              <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-muted-foreground">
                {["Favor asynchronous formats nobody has to attend live", "Anchor one small ritual to the week, not to a specific hour", "Let shared experiences happen when each person can join"].map((text) => (
                  <li key={text} className="flex gap-2.5"><Check className="mt-0.5 size-4 shrink-0 text-primary" />{text}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl border bg-card p-6">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">For a hybrid team in one region</p>
              <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-muted-foreground">
                {["Use the shared channel so home and office days feel equal", "Pick breaks and activities anyone can join from their desk", "Keep it optional, brief and separate from performance or attendance"].map((text) => (
                  <li key={text} className="flex gap-2.5"><Check className="mt-0.5 size-4 shrink-0 text-primary" />{text}</li>
                ))}
              </ul>
            </div>
          </div>
          <p className="mt-7 max-w-3xl leading-relaxed text-muted-foreground">
            Remote connection is one part of a broader team rhythm. Explore <Link to="/slack/team-building" className="font-semibold text-primary underline">Slack team-building activities</Link>, how recognition, rituals, games and breaks support <Link to="/slack/employee-engagement" className="font-semibold text-primary underline">employee engagement in Slack</Link>, or more <Link to="/slack/icebreakers" className="font-semibold text-primary underline">Slack icebreaker ideas</Link>.
          </p>
        </section>

        <section id="waitlist" className="mt-24 scroll-mt-8 rounded-3xl bg-primary p-8 text-center text-primary-foreground md:p-12">
          <h2 className="font-display text-3xl font-black md:text-5xl">Give your distributed team a shared laugh.</h2>
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
