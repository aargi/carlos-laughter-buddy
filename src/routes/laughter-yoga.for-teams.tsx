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
  CalendarDays,
  Compass,
  Presentation,
  Heart,
  Monitor,
  Video,
} from "lucide-react";
import { ShareButton } from "@/components/ShareButton";
import { LogoMark } from "@/components/LogoMark";
import { SiteFooter } from "@/components/SiteFooter";

const TITLE = "Laughter Yoga for Teams: Shared Laughter Activities for Work and Groups";
const DESCRIPTION =
  "How laughter yoga works for teams and groups: the formats it takes, the moments it fits into — meetings, workshops, offsites, breaks and connection activities — and the different ways to run one, from a professional to a guided digital session.";

export const Route = createFileRoute("/laughter-yoga/for-teams")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "https://laughtercircle.com/laughter-yoga/for-teams" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://laughtercircle.com/laughter-yoga/for-teams" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: TITLE,
          description: DESCRIPTION,
          url: "https://laughtercircle.com/laughter-yoga/for-teams",
          publisher: { "@type": "Organization", name: "Laughter Circle" },
        }),
      },
    ],
  }),
  component: LaughterYogaForTeamsPage,
});

const MOMENTS = [
  {
    icon: <Clock className="size-5" />,
    title: "Around a meeting",
    body: "Two or three minutes of guided laughter at the start of a meeting changes how the room behaves afterwards. It is short enough that nobody loses a slot, and it works as an opener better than a round of updates does — people arrive, make a noise together, and settle in.",
    fit: "Good for weekly team calls, stand-ups and any meeting that starts flat.",
  },
  {
    icon: <Presentation className="size-5" />,
    title: "Inside workshops and training days",
    body: "Long agendas need a reset in the middle. A laughter block after lunch or between two heavy modules wakes a room up without a break in the schedule, and needs no rehearsal, materials or briefing from the participants.",
    fit: "Good for facilitators who need something that lifts energy in fifteen minutes or less.",
  },
  {
    icon: <Compass className="size-5" />,
    title: "Offsites and team days",
    body: "On an offsite, laughter usually works best early — before the agenda gets serious. It gives people something shared to talk about that is not a project, and it loosens the group before the harder conversations start.",
    fit: "Good for quarterly offsites, strategy days and team days where people arrive stiff.",
  },
  {
    icon: <CalendarDays className="size-5" />,
    title: "A regular team break",
    body: "Some teams make it a ritual: a short guided laugh at the same time each week or each month. The repetition is the point — it becomes something people recognize rather than an event they have to decide about every time.",
    fit: "Good for teams that want a light recurring moment rather than a one-off initiative.",
  },
  {
    icon: <Heart className="size-5" />,
    title: "Connection activities and onboarding",
    body: "As part of a team-building agenda, a laughter session is the block nobody has to prepare for and nobody can fail at. It sits comfortably beside quizzes, icebreakers and games — often as the thing that loosens people up first. New joiners get to be people rather than a job title.",
    fit: "Good for onboarding weeks, new-team sessions and programs that already include social games.",
  },
  {
    icon: <Globe className="size-5" />,
    title: "Remote and hybrid groups",
    body: "The format travels well: everyone follows the same guided structure from their own screen, so the person at home and the person in the office have the same experience. That equality is usually the hardest thing to get right in a hybrid team.",
    fit: "Good for distributed teams, split offices and groups that meet over video anyway.",
  },
];

const SETTINGS = [
  {
    icon: <Building2 className="size-5" />,
    title: "Everyone in one room",
    body: "A room is the richest setting: eye contact, breath and sound all carry, so the laughter spreads fastest. It needs nothing but space to stand and a few minutes where people are not on their phones.",
    fit: "Best for offices, offsites and any group that already shares a room.",
  },
  {
    icon: <Users className="size-5" />,
    title: "Some in the room, some on screen",
    body: "Hybrid works if the sound is good. The people on the call need to hear the room and be heard by it, otherwise the group splits into two experiences. One person in the room keeps the guided pace, and everyone else follows along.",
    fit: "Best for teams where part of the group is remote and the room is used anyway.",
  },
  {
    icon: <Video className="size-5" />,
    title: "Everyone on their own screen",
    body: "Fully remote sessions run on a call, or on a shared link that everyone opens at the same time. Cameras help but stay optional; what actually matters is that people can hear each other laughing.",
    fit: "Best for distributed teams and groups that never share a physical space.",
  },
];

const WAYS = [
  {
    icon: <Users className="size-5" />,
    title: "With a laughter yoga professional",
    body: "A trained laughter yoga facilitator leads the group in person or live over video, reading the room and adapting the exercises to whoever is there. This is the fullest version of the experience, and the one that needs booking, a time slot and a budget.",
    fit: "Best for offsites, wellbeing days and teams that want a facilitated, one-off session.",
  },
  {
    icon: <Presentation className="size-5" />,
    title: "A group workshop, run by someone in the team",
    body: "Anyone can gather a group and run a short session themselves: a slot, a shared screen and a few classic exercises. No certification is needed to laugh with other people — the structure is simple enough that a volunteer can keep it light, short and fun.",
    fit: "Best for teams that want something regular, informal and low-cost.",
  },
  {
    icon: <Monitor className="size-5" />,
    title: "A guided digital session",
    body: "A session that runs in the browser, like the ones Laughter Circle offers: an AI guide explains each exercise, laughs first, and invites everyone to follow along from their own device. No host, no call to organize, no scheduling — anyone can start one any day, and colleagues in different places can join the same one.",
    fit: "Best for distributed teams and for trying the format before booking a live facilitator.",
  },
];

function LaughterYogaForTeamsPage() {
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
            Laughter yoga for teams: <span className="text-primary">shared laughter</span> for work and groups.
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
            For a team, laughter yoga is a short, shared activity: a group laughs together on purpose for a few minutes, guided through simple exercises. Here is how it works in person, remotely and in hybrid setups — and where in a working week it actually fits.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href="#moments" className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 font-bold text-primary-foreground shadow-lg transition hover:scale-[1.03]">
              Where it fits <ArrowRight className="size-4" />
            </a>
            <Link to="/laughter-yoga" className="inline-flex items-center gap-2 rounded-full border bg-card/70 px-6 py-3.5 font-bold transition hover:bg-muted">
              What is laughter yoga?
            </Link>
          </div>
        </section>

        <section className="mt-24">
          <h2 className="font-display text-3xl font-black md:text-5xl">Why teams laugh on purpose</h2>
          <div className="mt-5 max-w-3xl space-y-4 text-lg leading-relaxed text-muted-foreground">
            <p>Teams spend most of their time on structured interaction: meetings, reviews, updates, decisions. What they rarely get is a shared moment with no agenda — a few minutes where people are simply people. Guided laughter creates that moment deliberately, on a schedule, instead of waiting for it to happen.</p>
            <p>It works because laughter is contagious and because it starts as a sound rather than a joke. Nobody has to be funny, tell a story or perform; the exercises begin as a rhythm and often turn into a real laugh within a minute or two. People who insist they never laugh in public usually end up laughing in a group — quietly at first.</p>
            <p>For a team it is also a very cheap experiment. There is nothing to learn, no fitness requirement, no equipment and no preparation. Three minutes is enough to try it, and the whole group can join regardless of role, age or seniority — which is more than most team activities can claim.</p>
          </div>
        </section>

        <section id="moments" className="mt-24 scroll-mt-8">
          <h2 className="font-display text-3xl font-black md:text-5xl">Where it fits in a working week</h2>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">The same practice takes very different shapes depending on the moment it is dropped into.</p>
          <div className="mt-10 space-y-4">
            {MOMENTS.map((item, index) => (
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
          <h2 className="font-display text-3xl font-black md:text-5xl">In person, hybrid or fully remote</h2>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">The guided structure stays the same; what changes is the room the group is in.</p>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {SETTINGS.map((item) => (
              <div key={item.title} className="flex flex-col rounded-3xl border bg-card p-6">
                <span className="flex size-12 items-center justify-center rounded-2xl bg-primary/15 text-primary">{item.icon}</span>
                <h3 className="mt-4 font-display text-lg font-black leading-snug">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
                <p className="mt-3 text-xs leading-relaxed text-foreground/80"><span className="font-semibold">Best for:</span> {item.fit}</p>
              </div>
            ))}
          </div>
          <p className="mt-7 max-w-3xl leading-relaxed text-muted-foreground">
            One detail decides most sessions in every setting: sound. A group that can hear each other laughing will laugh together; a group that cannot will not, however good the exercises are.
          </p>
        </section>

        <section className="mt-24">
          <h2 className="font-display text-3xl font-black md:text-5xl">Three ways to run one</h2>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">Once a team wants to try it, there are three main setups — each with its own trade-offs.</p>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {WAYS.map((item) => (
              <div key={item.title} className="flex flex-col rounded-3xl border bg-card p-6">
                <span className="flex size-12 items-center justify-center rounded-2xl bg-primary/15 text-primary">{item.icon}</span>
                <h3 className="mt-4 font-display text-lg font-black leading-snug">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
                <p className="mt-3 text-xs leading-relaxed text-foreground/80"><span className="font-semibold">Fits best:</span> {item.fit}</p>
              </div>
            ))}
          </div>
          <p className="mt-7 max-w-3xl leading-relaxed text-muted-foreground">
            These are not mutually exclusive. Many teams start with a short guided digital session to see how people respond, keep it as a lightweight ritual if it lands, and bring a professional in for an offsite or a wellbeing day.
          </p>
        </section>

        <section className="mt-24">
          <h2 className="font-display text-3xl font-black md:text-5xl">A few honest notes</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="rounded-3xl border bg-card p-6">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">What it can be for a team</p>
              <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-muted-foreground">
                {["A light, shared break inside the working day", "A team activity anyone can join, whatever their role", "Something genuinely fun, not another box to tick"].map((text) => (
                  <li key={text} className="flex gap-2.5"><Check className="mt-0.5 size-4 shrink-0 text-primary" />{text}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl border bg-card p-6">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">What it is not</p>
              <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-muted-foreground">
                {["Not a medical treatment or a therapy of any kind", "Not a substitute for a trained laughter yoga professional", "Not something anyone should be required to join — keep it optional"].map((text) => (
                  <li key={text} className="flex gap-2.5"><Check className="mt-0.5 size-4 shrink-0 text-primary" />{text}</li>
                ))}
              </ul>
            </div>
          </div>
          <p className="mt-7 max-w-3xl leading-relaxed text-muted-foreground">
            Nothing here is advice of any kind. If you want someone to lead your group properly, a trained laughter yoga professional will adapt to the people in the room in ways no format can.
          </p>
        </section>

        <section className="mt-24 rounded-3xl border bg-primary/10 p-8 md:p-12">
          <p className="inline-flex items-center gap-2 rounded-full bg-primary/15 px-3 py-1 text-xs font-bold uppercase tracking-wide text-primary"><Sparkles className="size-3.5" /> Laughter Circle</p>
          <h2 className="mt-4 font-display text-3xl font-black md:text-5xl">One option for getting a team <span className="text-primary">laughing together.</span></h2>
          <div className="mt-5 max-w-3xl space-y-4 text-lg leading-relaxed text-muted-foreground">
            <p>Laughter Circle is one way to run a guided laughter session with a team: an AI guide explains each exercise, laughs first, and invites everyone to follow along in the browser — the same arc of warm-up, rising laughter and a calm finish, in about three minutes. Each of the ten guides has their own voice and their own unmistakable laugh.</p>
            <p>It is not a replacement for a trained laughter yoga professional, and it makes no medical or therapeutic claims. It is simply a light, accessible way for a group to share a laugh — any day, with nothing to install and no host to organize it.</p>
            <p>If your team works in Slack, we are bringing the same experience <Link to="/slack" className="font-semibold text-primary underline">into the workspace</Link>, where it sits alongside other <Link to="/slack/team-building" className="font-semibold text-primary underline">team-building activities</Link> and fits the way <Link to="/slack/remote-teams" className="font-semibold text-primary underline">remote teams</Link> already spend their day.</p>
            <p>Want to see what the exercises look like first? <Link to="/laughter-yoga/exercises" className="font-semibold text-primary underline">Here are the classic ones</Link>. And if you are curious how this project started, <Link to="/story" className="font-semibold text-primary underline">read our story</Link>.</p>
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
              Start with <Link to="/laughter-yoga" className="font-semibold text-primary underline">what laughter yoga is and how it works</Link>, see how to bring it <Link to="/laughter-yoga/at-work" className="font-semibold text-primary underline">into the workplace</Link>, try the <Link to="/laughter-yoga/exercises" className="font-semibold text-primary underline">classic exercises</Link> and how they work <Link to="/laughter-yoga/virtual" className="font-semibold text-primary underline">online</Link> — then look at how they fit <Link to="/slack/team-building" className="font-semibold text-primary underline">team building in Slack</Link> and <Link to="/slack/remote-teams" className="font-semibold text-primary underline">remote teams</Link>. Or go straight to <Link to="/" className="font-semibold text-primary underline">a guided session</Link>.
            </p>
          </div>
        </section>

        <section className="mt-24 rounded-3xl bg-primary p-8 text-center text-primary-foreground md:p-12">
          <h2 className="font-display text-3xl font-black md:text-5xl">Give your group a lighter kind of break.</h2>
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
