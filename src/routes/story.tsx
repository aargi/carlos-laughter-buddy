import { createFileRoute, Link } from "@tanstack/react-router";
import { Play, Footprints, Mic, Heart, ExternalLink } from "lucide-react";
import { LogoMark } from "@/components/LogoMark";
import { SiteFooter } from "@/components/SiteFooter";
import { CHARACTERS, auraColor } from "@/lib/characters";
import { AVATARS } from "@/lib/avatars";
import storyHero from "@/assets/story-hero.mp4.asset.json";
import storyPoster from "@/assets/story-poster.jpg.asset.json";
import stravaRun from "@/assets/strava-run.jpg.asset.json";

export const Route = createFileRoute("/story")({
  head: () => ({
    meta: [
      { title: "Our Story — Laughter Circle, born at the Running Hackathon Barcelona" },
      { name: "description", content: "Laughter Circle was built during the first Running Hackathon in Barcelona — an app of guided laughter yoga with 10 AI voices, created while running through the city." },
      { property: "og:title", content: "Our Story — Laughter Circle" },
      { property: "og:description", content: "Built while running through Barcelona: the story of a laughter yoga app with 10 AI guides, born at the Running Hackathon." },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Story,
});

function Story() {
  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-3xl px-6 py-12 md:py-16">
        <nav className="mb-12 flex items-center justify-between">
          <Link to="/" className="flex shrink-0 items-center gap-2 font-display text-xl font-black tracking-tight">
            <LogoMark size={30} className="hidden sm:block" />
            <span className="whitespace-nowrap">Laughter<span className="text-primary">Circle</span></span>
          </Link>
          <Link to="/" className="rounded-full border bg-card/70 px-4 py-2 text-sm font-semibold backdrop-blur hover:bg-muted">
            Try the session
          </Link>
        </nav>

        <div className="relative mb-12 flex justify-center">
          <div className="relative overflow-hidden rounded-3xl border shadow-2xl shadow-primary/20">
            <video
              src={storyHero.url}
              poster={storyPoster.url}
              className="max-h-[70vh] w-auto max-w-full"
              autoPlay
              muted
              loop
              playsInline
              controls
            />
            <span className="absolute left-4 top-4 rounded-full bg-background/70 px-3 py-1 text-xs font-bold uppercase tracking-widest backdrop-blur">
              Running Hackathon Barcelona · 24 Sep 2026
            </span>
          </div>
        </div>

        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">Our story</p>
        <h1 className="mt-3 font-display text-4xl font-black leading-tight md:text-6xl">
          Built at a run. <span className="text-primary">Made to make you laugh.</span>
        </h1>

        <div className="mt-10 space-y-6 text-lg leading-relaxed text-muted-foreground">
          <p>
            Laughter Circle was born on <strong className="text-foreground">September 24, 2026</strong>, during{" "}
            <a href="https://www.runninghackathon.com/" target="_blank" rel="noopener noreferrer" className="font-semibold text-primary underline-offset-4 hover:underline">
              Running Hackathon v.02 in Barcelona
            </a>{" "}
            — the second edition of the event, following the{" "}
            <a href="https://www.therunninghackathon.com/" target="_blank" rel="noopener noreferrer" className="font-semibold text-primary underline-offset-4 hover:underline">
              first Running Hackathon in London
            </a>
            . Participants ran through the streets of Barcelona building with voice AI, starting and finishing at the Claude Community House,
            with demos (and a rooftop party) at the finish line.
          </p>
          <p>
            The challenge was radical: <strong className="text-foreground">build an entire product while running, hands-free, using only voice instructions</strong> — that was the rule.
            That's exactly how the first version of Laughter Circle was created: entirely in motion, using voice from start to finish.
          </p>
          <p>
            Somewhere along the route, between strides and voice prompts, an idea took shape:{" "}
            <strong className="text-foreground">laughter is the most contagious sound in the world — so why not build an app that spreads it?</strong>{" "}
            A few hours later, Laughter Circle took <strong className="text-foreground">third prize</strong>.
          </p>
          <p className="font-display text-xl font-black text-foreground">
            Built while running. Built by voice. <span className="text-primary">Third prize a few hours later.</span>
          </p>
        </div>

        {/* The run, on Strava */}
        <div className="mt-12 overflow-hidden rounded-3xl border bg-card">
          <div className="grid md:grid-cols-[300px_1fr]">
            <div className="flex items-center justify-center border-b bg-primary/10 p-6 md:border-b-0 md:border-r">
              <img
                src={stravaRun.url}
                alt="Strava map of the hackathon run: laps along Passeig Marítim de la Barceloneta beach in Barcelona"
                className="max-h-[440px] w-auto rounded-2xl shadow-lg"
              />
            </div>
            <div className="p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">The run, on Strava</p>
              <h2 className="mt-2 font-display text-2xl font-black leading-tight md:text-3xl">
                11.96 km. 1 hour 33 minutes. <span className="text-primary">Zero keyboard.</span>
              </h2>
              <p className="mt-4 text-muted-foreground">
                The Strava trace tells it all: for an hour and a half I ran in circles next to the beach, along{" "}
                <strong className="text-foreground">Passeig Marítim de la Barceloneta</strong> — laps of about{" "}
                <strong className="text-foreground">300 meters</strong>, because looping a small stretch made it easier to keep
                building while moving. With Lovable open on my phone and earbuds in, I dictated every instruction for the next
                iteration out loud, in full stride.
              </p>
              <div className="mt-6 grid grid-cols-3 gap-3">
                <div className="rounded-2xl border bg-background/60 p-4 text-center">
                  <span className="block font-display text-2xl font-black text-primary">11.96</span>
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">km running</span>
                </div>
                <div className="rounded-2xl border bg-background/60 p-4 text-center">
                  <span className="block font-display text-2xl font-black text-primary">1:33</span>
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">hours on the move</span>
                </div>
                <div className="rounded-2xl border bg-background/60 p-4 text-center">
                  <span className="block whitespace-nowrap font-display text-xl font-black text-primary sm:text-2xl">~300 m</span>
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">beachside laps</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          <div className="rounded-3xl border bg-card p-6">
            <Footprints className="size-6 text-primary" />
            <h2 className="mt-3 font-bold">Running while building</h2>
            <p className="mt-1 text-sm text-muted-foreground">The whole first version was created in motion, talking to AI instead of typing — km after km through Barcelona.</p>
          </div>
          <div className="rounded-3xl border bg-card p-6">
            <Mic className="size-6 text-primary" />
            <h2 className="mt-3 font-bold">Ten voices, ten laughs</h2>
            <p className="mt-1 text-sm text-muted-foreground">Each guide has a custom-designed voice, aura and signature laugh — from Carlos's warm chuckle to Big Walt's Texas guffaw.</p>
          </div>
          <div className="rounded-3xl border bg-card p-6">
            <Heart className="size-6 text-primary" />
            <h2 className="mt-3 font-bold">Laughter yoga for everyone</h2>
            <p className="mt-1 text-sm text-muted-foreground">A structured 8-minute session: warm-up laughs, dynamic exercises, a free-laughter finale and a calm breathing cool-down.</p>
          </div>
        </div>

        <div className="mt-12 space-y-6 text-lg leading-relaxed text-muted-foreground">
          <p>
            The project was built with <strong className="text-foreground">Lovable</strong> — one of the hackathon's sponsors — and the guides'
            voices were designed with <strong className="text-foreground">ElevenLabs</strong>, another sponsor of the event. Fittingly,
            an app about voice and joy was created almost entirely by voice, on the move.
          </p>
          <p>
            What started as a hackathon experiment is now a little corner of the internet with one simple mission:{" "}
            <strong className="text-foreground">help you laugh out loud for eight minutes, wherever you are.</strong>
          </p>
        </div>

        {/* The circle */}
        <div className="mt-14 rounded-3xl border bg-card p-8">
          <h2 className="text-center font-display text-2xl font-black">Meet the circle</h2>
          <div className="mt-6 flex flex-wrap justify-center gap-5">
            {CHARACTERS.map((c) => (
              <div key={c.id} className="flex w-16 flex-col items-center gap-1">
                <div
                  className="size-14 overflow-hidden rounded-full shadow ring-2 ring-card"
                  style={{ background: `radial-gradient(circle at 50% 35%, ${auraColor(c, 0.42, 0.1)}, ${auraColor(c, 0.3, 0.09)})` }}
                >
                  {AVATARS[c.id] && <img src={AVATARS[c.id]} alt={c.name} className="size-full object-cover" />}
                </div>
                <span className="text-center text-[11px] font-medium leading-tight">{c.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 rounded-3xl bg-primary p-10 text-center text-primary-foreground">
          <h2 className="font-display text-3xl font-black">Ready to laugh with us?</h2>
          <p className="mx-auto mt-3 max-w-md opacity-90">
            Pick a guide, follow their voice and laugh out loud with the circle. Eight minutes. Zero equipment. Guaranteed smiles.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/"
              className="inline-flex items-center gap-3 rounded-full bg-background px-8 py-4 text-lg font-bold text-foreground shadow-lg transition hover:scale-[1.03]"
            >
              <Play className="size-5 fill-current" /> Start your session
            </Link>
            <a
              href="https://runninghackathon.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/40 px-6 py-4 font-semibold hover:bg-primary-foreground/10"
            >
              Running Hackathon <ExternalLink className="size-4" />
            </a>
          </div>
        </div>

        <SiteFooter />
      </div>
    </main>
  );
}
