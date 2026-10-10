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

const TITLE = "Slack Icebreakers: Simple Ideas to Help Teams Connect";
const DESCRIPTION =
  "Practical Slack icebreakers for remote and hybrid teams, including questions, games, quick activities, social challenges and shared experiences that help colleagues connect.";

export const Route = createFileRoute("/slack/icebreakers")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "https://laughtercircle.com/slack/icebreakers" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://laughtercircle.com/slack/icebreakers" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: TITLE,
          description: DESCRIPTION,
          url: "https://laughtercircle.com/slack/icebreakers",
          publisher: { "@type": "Organization", name: "Laughter Circle" },
        }),
      },
    ],
  }),
  component: SlackIcebreakersPage,
});

const ICEBREAKERS = [
  {
    icon: <HelpCircle className="size-5" />,
    title: "Icebreaker questions",
    body: "Ask one question that is easy to answer but leaves room for personality. Try: What small thing improved your week? What is always on your desk? Which skill would you borrow from a teammate?",
    fit: "Good for new teams and quiet channels. Let people answer asynchronously, and avoid questions that ask for sensitive personal details.",
  },
  {
    icon: <Gamepad2 className="size-5" />,
    title: "Lightweight games",
    body: "Run a quick emoji quiz, two truths and a lie, a blurred-photo guess, or a one-question trivia round. A thread keeps the activity contained while still giving everyone a shared result.",
    fit: "Good when your team enjoys friendly competition. Keep the rules obvious and the round short enough to join between tasks.",
  },
  {
    icon: <Timer className="size-5" />,
    title: "Quick team dynamics",
    body: "Invite everyone to describe their current energy with one GIF, build a story one sentence at a time, or choose a reaction that matches the day. These take minutes, not a meeting.",
    fit: "Good for opening a project, workshop or busy week. Use a clear end time so the activity never becomes another obligation.",
  },
  {
    icon: <Users className="size-5" />,
    title: "Social activities",
    body: "Create an optional thread for desk views, pets, playlists, local food or weekend discoveries. The topic gives colleagues an easy route into a conversation that is not about work.",
    fit: "Good for remote and hybrid teams that miss informal office conversation. Rotate the topic so the same people do not always lead.",
  },
  {
    icon: <Trophy className="size-5" />,
    title: "Small challenges",
    body: "Set a tiny shared challenge: take a short walk, draw the company mascot in 30 seconds, photograph something in the team's color, or solve a riddle before Friday.",
    fit: "Good for creating momentum over a day or week. Make participation optional and celebrate the attempt rather than only the winner.",
  },
  {
    icon: <Sparkles className="size-5" />,
    title: "Shared experiences",
    body: "Give the team something to do, hear or feel in common: a short breathing reset, a song, a stretch, or a guided laughter session. The conversation comes more naturally after the experience.",
    fit: "Good when a team needs a change of energy, not another prompt. Choose something brief and accessible to different personalities.",
  },
];

function SlackIcebreakersPage() {
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
            Slack icebreakers: simple ideas to help teams <span className="text-primary">connect.</span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
            Icebreakers do not need a video call or a long introduction. The best ones give remote and hybrid teams a small, low-pressure reason to respond, play or share an experience together.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href="#ideas" className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 font-bold text-primary-foreground shadow-lg transition hover:scale-[1.03]">
              Explore the ideas <ArrowRight className="size-4" />
            </a>
            <Link to="/slack" className="inline-flex items-center gap-2 rounded-full border bg-card/70 px-6 py-3.5 font-bold transition hover:bg-muted">
              Laughter Circle for Slack
            </Link>
          </div>
        </section>

        <section className="mt-24">
          <h2 className="font-display text-3xl font-black md:text-5xl">What makes an icebreaker work in Slack?</h2>
          <div className="mt-5 max-w-3xl space-y-4 text-lg leading-relaxed text-muted-foreground">
            <p>A useful icebreaker makes joining easier than ignoring it. The prompt is clear, the answer can be short, and nobody has to reveal more than they want to.</p>
            <p>Slack adds one important advantage: people can participate asynchronously. A teammate in another time zone can join the same activity hours later without missing the moment entirely.</p>
            <p>Not every format fits every team. Questions help people discover common ground. Games create playful competition. Shared activities change the team's energy. A good mix matters more than finding one perfect icebreaker.</p>
          </div>
        </section>

        <section id="ideas" className="mt-24 scroll-mt-8">
          <h2 className="font-display text-3xl font-black md:text-5xl">Six types of Slack icebreakers</h2>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">Use these as starting points, then adapt the pace and tone to the people already in your team.</p>
          <div className="mt-10 space-y-4">
            {ICEBREAKERS.map((item, index) => (
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
          <h2 className="mt-4 font-display text-3xl font-black md:text-5xl">Guided laughter can break the ice <span className="text-primary">without a clever question.</span></h2>
          <div className="mt-5 max-w-3xl space-y-4 text-lg leading-relaxed text-muted-foreground">
            <p>A guided laughter session gives teammates the same unusual, physical experience for a few minutes. An AI guide explains each exercise, laughs first, and invites everyone to follow along in their browser.</p>
            <p>It can suit a team that wants to reset its energy or try something more active than a prompt. It will not be the right icebreaker for every group — some teams will prefer trivia, conversation or a quiet social thread — but it adds a different option to the mix.</p>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              { title: "About 3 minutes", text: "Short enough to fit between tasks, without putting another meeting on the calendar." },
              { title: "No need to be funny", text: "The guides lead the exercises. Teammates only choose whether they want to join." },
              { title: "A moment in common", text: "The session creates something the team can react to and talk about afterwards." },
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
          <h2 className="font-display text-3xl font-black md:text-5xl">A simple icebreaker rhythm</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="rounded-3xl border bg-card p-6">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">For a new team</p>
              <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-muted-foreground">
                {["Start with one easy question that everyone can answer", "Try a visual or emoji-based game later in the week", "End with a short shared activity and an optional reaction thread"].map((text) => (
                  <li key={text} className="flex gap-2.5"><Check className="mt-0.5 size-4 shrink-0 text-primary" />{text}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl border bg-card p-6">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">For an established team</p>
              <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-muted-foreground">
                {["Rotate formats instead of repeating the same weekly question", "Let different teammates choose or host the activity", "Keep it optional, brief and separate from performance or attendance"].map((text) => (
                  <li key={text} className="flex gap-2.5"><Check className="mt-0.5 size-4 shrink-0 text-primary" />{text}</li>
                ))}
              </ul>
            </div>
          </div>
          <p className="mt-7 max-w-3xl leading-relaxed text-muted-foreground">
            Icebreakers are one part of a broader team rhythm. Explore more <Link to="/slack/team-building" className="font-semibold text-primary underline">Slack team-building activities</Link>, or see how recognition, rituals, games and breaks can support <Link to="/slack/employee-engagement" className="font-semibold text-primary underline">employee engagement in Slack</Link>.
          </p>
        </section>

        <section id="waitlist" className="mt-24 scroll-mt-8 rounded-3xl bg-primary p-8 text-center text-primary-foreground md:p-12">
          <h2 className="font-display text-3xl font-black md:text-5xl">Add a different kind of icebreaker.</h2>
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