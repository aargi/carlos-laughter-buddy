import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Smile,
  Check,
  Wind,
  Hand,
  Eye,
  Footprints,
  Sparkles,
  ArrowRight,
  Clock,
  Users,
  Monitor,
  Heart,
  Building2,
} from "lucide-react";
import { ShareButton } from "@/components/ShareButton";
import { LogoMark } from "@/components/LogoMark";
import { SiteFooter } from "@/components/SiteFooter";

const TITLE = "Laughter Yoga Exercises: Simple Guided Activities to Try";
const DESCRIPTION =
  "A practical look at laughter yoga exercises: breathing and warm-ups, clapping rhythms, playful laughter drills, movement, eye contact and group games — with simple examples to try alone, in pairs, in groups or online.";

export const Route = createFileRoute("/laughter-yoga/exercises")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "https://laughtercircle.com/laughter-yoga/exercises" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://laughtercircle.com/laughter-yoga/exercises" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: TITLE,
          description: DESCRIPTION,
          url: "https://laughtercircle.com/laughter-yoga/exercises",
          publisher: { "@type": "Organization", name: "Laughter Circle" },
        }),
      },
    ],
  }),
  component: LaughterYogaExercisesPage,
});

const TYPES = [
  {
    icon: <Wind className="size-5" />,
    title: "Breathing and warm-ups",
    body: "Sessions usually open with gentle breathing rather than laughter: slow deep breaths, light stretches and easy vocal sounds. The point is not fitness — it is to loosen the jaw, the shoulders and the self-consciousness before anyone has to make a noise in front of other people.",
    fit: "Good as the first minute of any session, alone or in a group. It also works as the closing minute, in reverse.",
  },
  {
    icon: <Hand className="size-5" />,
    title: "Clapping and rhythm drills",
    body: "Clapping in a steady rhythm while saying short syllables — the classic \"ho ho, ha ha ha\" — gives the body something to follow. The rhythm carries the group, so people stay together without having to coordinate anything out loud.",
    fit: "Good for groups of any size, and especially useful when the room is new, cold or full of skeptics.",
  },
  {
    icon: <Smile className="size-5" />,
    title: "Playful laughter drills",
    body: "Short, guided prompts that invite you to laugh on purpose: greeting someone with laughter, laughing your phone number, ordering a coffee with a laugh, answering an imaginary telegram. No jokes and no comedy involved — the sound is the exercise, and it often turns real on its own.",
    fit: "Good anywhere, at any length. Pick one drill for a two-minute break, or run through several in a longer session.",
  },
  {
    icon: <Footprints className="size-5" />,
    title: "Movement and light stretching",
    body: "Some exercises add simple movement: walking around while laughing, shaking out the hands and arms, raising the arms on a big laugh. Nothing needs space or a mat — the movement just keeps the laughter from going flat.",
    fit: "Good for sedentary teams, long training days and any session that starts to feel stuck.",
  },
  {
    icon: <Eye className="size-5" />,
    title: "Eye contact and mirroring",
    body: "In pairs or small circles, people look at each other and let the laughter pass between them. It is the single most reliable way to turn an exercise into a real laugh — and the reason laughter yoga is usually done in a group.",
    fit: "Good for teams that already know each other, and for small groups. Online it works well with the camera on.",
  },
  {
    icon: <Sparkles className="size-5" />,
    title: "Free laughter and a calm finish",
    body: "Many sessions build towards a few seconds of unstructured laughter — no script, no pattern — followed by slow breathing and quiet. That cool-down matters as much as the laughter itself: it is what leaves people settled instead of wired.",
    fit: "Good at the end of any session longer than a few minutes. Skip it and the whole thing feels abrupt.",
  },
];

const EXAMPLES = [
  {
    icon: <Clock className="size-5" />,
    title: "On your own",
    steps: [
      "Stand up, take three slow breaths and roll your shoulders.",
      "Clap a steady rhythm and say \"ho ho, ha ha ha\" along with it for twenty seconds.",
      "Do one playful drill — greet yourself in a mirror with a laugh, or laugh your phone number out loud.",
      "Finish with a slow breath and a moment of stillness.",
    ],
    fit: "Good at a desk, at home or before a call. Two minutes is enough to notice a difference.",
  },
  {
    icon: <Users className="size-5" />,
    title: "With a partner",
    steps: [
      "Face each other and take one shared deep breath.",
      "Start the rhythm together: clap and say \"ho ho, ha ha ha\".",
      "Hold eye contact for ten seconds and let the laughter happen.",
      "Both take a slow breath to close.",
    ],
    fit: "Good for colleagues who work side by side, or two people who want to try the format before doing it in a group.",
  },
  {
    icon: <Heart className="size-5" />,
    title: "In a group",
    steps: [
      "Everyone stands in a circle, or sits facing the center.",
      "The person leading starts the breathing and the clapping rhythm; the rest follow.",
      "Run two or three short drills, moving around the circle as you go.",
      "End with free laughter for a few seconds, then slow breathing together.",
    ],
    fit: "Good for clubs, classes, community groups and any gathering of five or more people.",
  },
  {
    icon: <Building2 className="size-5" />,
    title: "With your team at work",
    steps: [
      "Pick a fixed slot — the start of a Friday meeting works well — and keep it to five minutes.",
      "One person leads the rhythm and one or two drills; nobody is put on the spot.",
      "Keep it optional and genuinely light: no explanation, no team-building framing.",
      "Close with a slow breath before the meeting starts.",
    ],
    fit: "Good for teams that already share a regular meeting and want a lighter way to open it.",
  },
  {
    icon: <Monitor className="size-5" />,
    title: "Online and over video",
    steps: [
      "Everyone turns their camera on and stays visible — eye contact is what makes it work.",
      "The guide runs the warm-up and the rhythm; the group follows from their own screens.",
      "Do the drills facing the camera, as if laughing at each person in turn.",
      "Finish with a shared slow breath before the call ends.",
    ],
    fit: "Good for remote and hybrid teams, and for anyone who cannot get to a room together.",
  },
];

function LaughterYogaExercisesPage() {
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
            Laughter yoga exercises: <span className="text-primary">simple guided activities</span> to try.
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground">
            Laughter yoga exercises are short, playful and deliberately unglamorous: breathing, clapping, silly prompts and eye contact. Here is what the different types are for, and how to run them alone, in pairs, in a group or online.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href="#types" className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 font-bold text-primary-foreground shadow-lg transition hover:scale-[1.03]">
              The exercise types <ArrowRight className="size-4" />
            </a>
            <Link to="/" className="inline-flex items-center gap-2 rounded-full border bg-card/70 px-6 py-3.5 font-bold transition hover:bg-muted">
              Try a guided session
            </Link>
          </div>
        </section>

        <section className="mt-24">
          <h2 className="font-display text-3xl font-black md:text-5xl">The shape of a session</h2>
          <div className="mt-5 max-w-3xl space-y-4 text-lg leading-relaxed text-muted-foreground">
            <p>Individual exercises vary a lot, but the structure almost never does. A session warms the body up, builds the laughter through guided drills, and then comes back down. That arc is the actual method — the specific drills are interchangeable.</p>
            <p>Most exercises share one trick: they ask you to make the sound first. You clap, you say the syllables, you laugh on purpose — and in a group, the real laughter usually arrives within a minute or two without anyone trying harder.</p>
            <p>You do not need to be funny, flexible or in good shape to take part, and nothing here depends on getting a joke. If you can breathe and make a noise, you can do every exercise on this page.</p>
          </div>
        </section>

        <section id="types" className="mt-24 scroll-mt-8">
          <h2 className="font-display text-3xl font-black md:text-5xl">Types of laughter yoga exercises</h2>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">Six families cover most of what you will find in a real session.</p>
          <div className="mt-10 space-y-4">
            {TYPES.map((item, index) => (
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
          <h2 className="font-display text-3xl font-black md:text-5xl">Examples you can try</h2>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">The same ingredients, arranged for five different situations. Each one takes a couple of minutes.</p>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {EXAMPLES.map((item) => (
              <div key={item.title} className="flex flex-col rounded-3xl border bg-card p-6">
                <span className="flex size-12 items-center justify-center rounded-2xl bg-primary/15 text-primary">{item.icon}</span>
                <h3 className="mt-4 font-display text-xl font-black leading-snug">{item.title}</h3>
                <ol className="mt-3 space-y-2.5 text-sm leading-relaxed text-muted-foreground">
                  {item.steps.map((step, i) => (
                    <li key={step} className="flex gap-2.5">
                      <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/15 text-xs font-bold text-primary">{i + 1}</span>
                      {step}
                    </li>
                  ))}
                </ol>
                <p className="mt-4 text-xs leading-relaxed text-foreground/80"><span className="font-semibold">When it fits:</span> {item.fit}</p>
              </div>
            ))}
          </div>
          <p className="mt-7 max-w-3xl leading-relaxed text-muted-foreground">
            A few practical notes: keep sessions short rather than impressive, keep them optional, and always leave room for people to watch instead of join. Nobody has to explain why they are laughing, and nobody should be filmed without asking.
          </p>
        </section>

        <section className="mt-24">
          <h2 className="font-display text-3xl font-black md:text-5xl">A few honest notes</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="rounded-3xl border bg-card p-6">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">What these exercises are</p>
              <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-muted-foreground">
                {["Short, playful activities anyone can follow", "A mix of sound, breathing, rhythm and eye contact", "Something you can run yourself, alone or with others"].map((text) => (
                  <li key={text} className="flex gap-2.5"><Check className="mt-0.5 size-4 shrink-0 text-primary" />{text}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl border bg-card p-6">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">What they are not</p>
              <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-muted-foreground">
                {["Not a medical treatment or a therapy of any kind", "Not a substitute for a trained laughter yoga professional", "Not something anyone should be pushed into"].map((text) => (
                  <li key={text} className="flex gap-2.5"><Check className="mt-0.5 size-4 shrink-0 text-primary" />{text}</li>
                ))}
              </ul>
            </div>
          </div>
          <p className="mt-7 max-w-3xl leading-relaxed text-muted-foreground">
            This page lists exercises as a practice, not as advice. If you want a trained facilitator to lead a group, a laughter yoga professional will read the room and adapt the session in ways a list cannot.
          </p>
        </section>

        <section className="mt-24 rounded-3xl border bg-primary/10 p-8 md:p-12">
          <p className="inline-flex items-center gap-2 rounded-full bg-primary/15 px-3 py-1 text-xs font-bold uppercase tracking-wide text-primary"><Sparkles className="size-3.5" /> Laughter Circle</p>
          <h2 className="mt-4 font-display text-3xl font-black md:text-5xl">These exercises, <span className="text-primary">guided in your browser.</span></h2>
          <div className="mt-5 max-w-3xl space-y-4 text-lg leading-relaxed text-muted-foreground">
            <p>Laughter Circle is one digital way to follow guided laughter sessions: an AI guide explains each exercise, laughs first, and invites you to follow along — the same arc of warm-up, rising laughter and a calm finish, in about three minutes. Each of the ten guides has their own voice and their own unmistakable laugh.</p>
            <p>It is not a replacement for a trained laughter yoga professional, and it makes no medical or therapeutic claims. It is simply a light, accessible way to do the exercises without organizing anything or learning the drills by heart.</p>
            <p>At work, the same sessions fit naturally into a short break — see <Link to="/laughter-yoga/at-work" className="font-semibold text-primary underline">laughter yoga at work</Link> for the different formats, and <Link to="/slack/team-building" className="font-semibold text-primary underline">team building in Slack</Link> if your team already lives in Slack.</p>
            <p>Curious how this project started? It was built while running — literally. <Link to="/story" className="font-semibold text-primary underline">Read our story</Link>.</p>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              { title: "About 3 minutes", text: "Short enough to try once and decide afterwards." },
              { title: "Ten AI guides", text: "Each with their own voice, aura and laugh." },
              { title: "Nothing to install", text: "Open the browser, pick a guide, laugh along." },
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
              Start with <Link to="/laughter-yoga" className="font-semibold text-primary underline">what laughter yoga is and how it works</Link>, see how to bring it <Link to="/laughter-yoga/at-work" className="font-semibold text-primary underline">into the workplace</Link>, do it <Link to="/laughter-yoga/virtual" className="font-semibold text-primary underline">online with a group</Link>, or go straight to <Link to="/" className="font-semibold text-primary underline">a guided session</Link>. And if you want to know where this came from, <Link to="/story" className="font-semibold text-primary underline">here is our story</Link>.
            </p>
          </div>
        </section>

        <section className="mt-24 rounded-3xl bg-primary p-8 text-center text-primary-foreground md:p-12">
          <h2 className="font-display text-3xl font-black md:text-5xl">Try the exercises with a guide.</h2>
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
