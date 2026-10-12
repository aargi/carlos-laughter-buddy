import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Smile,
  Check,
  Monitor,
  Video,
  Users,
  Globe,
  Camera,
  Headphones,
  Sparkles,
  ArrowRight,
  Clock,
  Heart,
  Building2,
} from "lucide-react";
import { ShareButton } from "@/components/ShareButton";
import { LogoMark } from "@/components/LogoMark";
import { SiteFooter } from "@/components/SiteFooter";

const TITLE = "Virtual Laughter Yoga: How Online Laughter Sessions Work";
const DESCRIPTION =
  "How virtual laughter yoga works: the formats online laughter sessions take, where they are used — individuals, groups, remote teams, workshops and team building — and the different ways to take part, from a live professional to a guided digital session.";

export const Route = createFileRoute("/laughter-yoga/virtual")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "https://laughtercircle.com/laughter-yoga/virtual" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://laughtercircle.com/laughter-yoga/virtual" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: TITLE,
          description: DESCRIPTION,
          url: "https://laughtercircle.com/laughter-yoga/virtual",
          publisher: { "@type": "Organization", name: "Laughter Circle" },
        }),
      },
    ],
  }),
  component: VirtualLaughterYogaPage,
});

const FORMATS = [
  {
    icon: <Clock className="size-5" />,
    title: "Individual sessions",
    body: "One person, one screen, a few minutes. A guided session walks you through the same arc as a group class — warm-up, laughter exercises, a calm finish — and needs nothing but a room where you can make a noise. It is the easiest format to fit into a day.",
    fit: "Good for trying the practice privately, or for people who would rather not laugh in front of strangers yet.",
  },
  {
    icon: <Users className="size-5" />,
    title: "Online groups and clubs",
    body: "Laughter clubs moved online too: a regular group meets over video at a fixed time, with one person leading the exercises. The group is what makes it work — laughing with other people, even through a screen, is very different from laughing alone.",
    fit: "Good for people who want something recurring, and for communities that already meet remotely.",
  },
  {
    icon: <Globe className="size-5" />,
    title: "Remote and hybrid teams",
    body: "Distributed teams use short laughter sessions as a shared moment that does not depend on where anyone is sitting. Everyone joins from their own screen at the same time, so the experience is the same in the office and at home — which is often the hardest thing to get right remotely.",
    fit: "Good for teams spread across cities or time zones that want a ritual rather than another meeting.",
  },
  {
    icon: <Video className="size-5" />,
    title: "Workshops and events",
    body: "A laughter block can sit inside a longer online agenda: an opener for a virtual workshop, an energizer after lunch on a conference day, or one activity inside a remote offsite. It runs in fifteen to thirty minutes and needs no rehearsal from the participants.",
    fit: "Good for facilitators and event organizers who need something that wakes a room up fast.",
  },
  {
    icon: <Heart className="size-5" />,
    title: "Team-building activities",
    body: "As part of a team-building program, a laughter session is the block nobody has to prepare for and nobody can fail at. It sits well next to quizzes, icebreakers and social games — usually as the moment that loosens everyone up before the rest.",
    fit: "Good for teams that have done the quiz before and want something a little different.",
  },
];

const WAYS = [
  {
    icon: <Video className="size-5" />,
    title: "With a professional, live",
    body: "A laughter yoga facilitator runs the session live over video, in real time. This is the closest equivalent to an in-person class: the professional reads the room, adapts the exercises to whoever is on camera and holds the whole arc. It needs booking, a time slot that works for everyone, and a budget.",
    fit: "Best for offsites, wellbeing days and one-off sessions where a facilitated experience is the point.",
  },
  {
    icon: <Users className="size-5" />,
    title: "An organized online group session",
    body: "Anyone can gather a group and run a short session themselves: a video call, a shared screen and a few classic exercises. No certification is needed to laugh with other people — the format is simple enough that a volunteer can keep it light, short and fun.",
    fit: "Best for teams and communities that want something regular, informal and low-cost.",
  },
  {
    icon: <Monitor className="size-5" />,
    title: "Guided digital sessions",
    body: "A session that runs in the browser, like the ones Laughter Circle offers: an AI guide explains each exercise, laughs first, and invites everyone to follow along from their own device. No call to join, no host, no scheduling — anyone can start one any day, and colleagues in different places can join the same one.",
    fit: "Best for distributed teams and for trying the format before booking a live facilitator.",
  },
];

const TIPS = [
  {
    icon: <Camera className="size-5" />,
    title: "Cameras on, if people are willing",
    body: "Eye contact is what turns an exercise into a real laugh, and on a call that means seeing faces. Cameras should stay optional — some people laugh much better without one — but a group with the camera on almost always gets further.",
  },
  {
    icon: <Headphones className="size-5" />,
    title: "Sound matters more than video",
    body: "Laughter is a sound exercise, so a group that cannot hear each other will not laugh together. Headphones or earbuds help a lot, and a short \"can you hear me\" check at the start saves the whole session.",
  },
  {
    icon: <Clock className="size-5" />,
    title: "Keep it short",
    body: "Online attention runs out faster than in a room. Three to ten minutes of genuine laughter beats thirty minutes of people drifting off with their cameras off — and a short session is far easier to repeat.",
  },
  {
    icon: <Users className="size-5" />,
    title: "Never force participation",
    body: "Some people need to watch first. Let anyone stay on mute, keep their camera off or simply listen — most join in on their own once the noise starts, and none of it works if it feels like an obligation.",
  },
  {
    icon: <Globe className="size-5" />,
    title: "Mind time zones",
    body: "For distributed teams, the slot matters as much as the session. Rotating the time, or recording the guided structure so each location can run it at a sensible hour, keeps it from becoming a favor to one region.",
  },
  {
    icon: <Building2 className="size-5" />,
    title: "Don't record it",
    body: "A laughing clip is an uncomfortable thing to have stored without asking. Sessions are better unrecorded, or shared only as the exercise list afterwards — nobody should perform for a recording.",
  },
];

function VirtualLaughterYogaPage() {
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
            Virtual laughter yoga: how online <span className="text-primary">laughter sessions</span> work.
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
            Laughter yoga was built around people in the same room — and it turns out the practice travels well to a screen. Here is how online laughter sessions actually run, what formats exist and the different ways to take part.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href="#formats" className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 font-bold text-primary-foreground shadow-lg transition hover:scale-[1.03]">
              The formats <ArrowRight className="size-4" />
            </a>
            <Link to="/" className="inline-flex items-center gap-2 rounded-full border bg-card/70 px-6 py-3.5 font-bold transition hover:bg-muted">
              Try a guided session
            </Link>
          </div>
        </section>

        <section className="mt-24">
          <h2 className="font-display text-3xl font-black md:text-5xl">How it works at a distance</h2>
          <div className="mt-5 max-w-3xl space-y-4 text-lg leading-relaxed text-muted-foreground">
            <p>The structure does not change online. A session still warms the body up, moves through guided laughter exercises, and finishes with slow breathing. What changes is the container: instead of a park or a studio, it is a video call, a shared link or a page in the browser.</p>
            <p>The part people worry about — whether laughing with strangers on a screen feels awkward — mostly solves itself. Laughter is contagious through audio and video almost as well as in person, and because the exercises start as a sound rather than a joke, the awkwardness usually lasts about a minute. The one thing that genuinely matters is that people can hear each other.</p>
            <p>Distance also brings something the room cannot: a session can happen without anyone commuting, booking a studio or finding a slot that suits one office. That is why the online format is often the one that actually becomes a habit.</p>
          </div>
        </section>

        <section id="formats" className="mt-24 scroll-mt-8">
          <h2 className="font-display text-3xl font-black md:text-5xl">Formats for online laughter sessions</h2>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">Same practice, five different containers — from a private two-minute session to a block inside a conference.</p>
          <div className="mt-10 space-y-4">
            {FORMATS.map((item, index) => (
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
          <h2 className="font-display text-3xl font-black md:text-5xl">Three ways to take part</h2>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">Once you want to run or join a session online, there are three main setups — each with its own trade-offs.</p>
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
          <h2 className="font-display text-3xl font-black md:text-5xl">Making it work on a screen</h2>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">A few things decide whether an online session lands or falls flat.</p>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {TIPS.map((item) => (
              <div key={item.title} className="rounded-3xl border bg-card p-6">
                <span className="flex size-12 items-center justify-center rounded-2xl bg-primary/15 text-primary">{item.icon}</span>
                <h3 className="mt-4 font-display text-xl font-black">{item.title}</h3>
                <p className="mt-2 leading-relaxed text-muted-foreground">{item.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-24">
          <h2 className="font-display text-3xl font-black md:text-5xl">A few honest notes</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="rounded-3xl border bg-card p-6">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">What online sessions can be</p>
              <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-muted-foreground">
                {["A light, shared moment for people who are not in the same room", "A short break that fits into a remote working day", "A way to try the practice before booking anything"].map((text) => (
                  <li key={text} className="flex gap-2.5"><Check className="mt-0.5 size-4 shrink-0 text-primary" />{text}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl border bg-card p-6">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">What they are not</p>
              <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-muted-foreground">
                {["Not a medical treatment or a therapy of any kind", "Not a substitute for a trained laughter yoga professional", "Not a reason to put anyone on camera against their will"].map((text) => (
                  <li key={text} className="flex gap-2.5"><Check className="mt-0.5 size-4 shrink-0 text-primary" />{text}</li>
                ))}
              </ul>
            </div>
          </div>
          <p className="mt-7 max-w-3xl leading-relaxed text-muted-foreground">
            Nothing on this page is advice of any kind. If you want someone to lead your group properly, a trained laughter yoga professional will adapt to the people in the room in ways no format can.
          </p>
        </section>

        <section className="mt-24 rounded-3xl border bg-primary/10 p-8 md:p-12">
          <p className="inline-flex items-center gap-2 rounded-full bg-primary/15 px-3 py-1 text-xs font-bold uppercase tracking-wide text-primary"><Sparkles className="size-3.5" /> Laughter Circle</p>
          <h2 className="mt-4 font-display text-3xl font-black md:text-5xl">An online laugh, <span className="text-primary">without a meeting link.</span></h2>
          <div className="mt-5 max-w-3xl space-y-4 text-lg leading-relaxed text-muted-foreground">
            <p>Laughter Circle is one way to do guided laughter sessions online: an AI guide explains each exercise, laughs first, and invites you to follow along in the browser — the same arc of warm-up, rising laughter and a calm finish, in about three minutes. Each of the ten guides has their own voice and their own unmistakable laugh.</p>
            <p>It is not a replacement for a trained laughter yoga professional, and it makes no medical or therapeutic claims. It is simply a light, accessible way to share a laugh with people who are somewhere else — no host, no call to join, nothing to install.</p>
            <p>For distributed teams, that fits naturally into <Link to="/slack/remote-teams" className="font-semibold text-primary underline">remote team building</Link> — and if your team already works in Slack, we are bringing the same experience <Link to="/slack" className="font-semibold text-primary underline">into the workspace</Link>, alongside other <Link to="/slack/team-building" className="font-semibold text-primary underline">team-building activities</Link>.</p>
            <p>Want to know what the exercises look like first? <Link to="/laughter-yoga/exercises" className="font-semibold text-primary underline">Here are the classic ones</Link>. And if you are curious how this project started, <Link to="/story" className="font-semibold text-primary underline">read our story</Link>.</p>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              { title: "About 3 minutes", text: "Short enough to try once and decide afterwards." },
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
              Start with <Link to="/laughter-yoga" className="font-semibold text-primary underline">what laughter yoga is and how it works</Link>, see how to bring it <Link to="/laughter-yoga/at-work" className="font-semibold text-primary underline">into the workplace</Link>, try the <Link to="/laughter-yoga/exercises" className="font-semibold text-primary underline">classic exercises</Link>, and look at how they fit <Link to="/slack/remote-teams" className="font-semibold text-primary underline">remote teams</Link> and <Link to="/slack/team-building" className="font-semibold text-primary underline">team building in Slack</Link> — or go straight to <Link to="/" className="font-semibold text-primary underline">a guided session</Link>.
            </p>
          </div>
        </section>

        <section className="mt-24 rounded-3xl bg-primary p-8 text-center text-primary-foreground md:p-12">
          <h2 className="font-display text-3xl font-black md:text-5xl">Laugh together from wherever you are.</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg opacity-95">
            Pick one of ten AI guides and take a short guided laughter session — no signup, nothing to install.
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
