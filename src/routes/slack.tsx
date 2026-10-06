import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Slack, Check, Hash, Sparkles, Users, Coffee, RefreshCw, Headphones } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ShareButton } from "@/components/ShareButton";
import { LogoMark } from "@/components/LogoMark";
import { SiteFooter } from "@/components/SiteFooter";
import { SlackWaitlistForm } from "@/components/SlackWaitlistForm";
import designer from "@/assets/office/designer.png";
import developer from "@/assets/office/developer.png";
import pm from "@/assets/office/pm.png";
import founder from "@/assets/office/founder.png";
import marketer from "@/assets/office/marketer.png";
import sales from "@/assets/office/sales.png";


export const Route = createFileRoute("/slack")({
  head: () => ({
    meta: [
      { title: "Laughter Circle for Slack — turn your team into a Laughter Circle" },
      { name: "description", content: "A playful AI laughter experience where teammates create their own characters, clone their voices and make each other laugh inside Slack. Join the waitlist." },
      { property: "og:title", content: "Turn your Slack team into a Laughter Circle" },
      { property: "og:description", content: "Teammates create their own characters, clone their voices and make each other laugh — right inside Slack. Join the waitlist." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SlackPage,
});

type Mate = { id: string; name: string; role: string; emoji: string; img: string; hue: number };
const TEAM: Mate[] = [
  { id: "lena", name: "Lena", role: "Product Designer", emoji: "🎨", img: designer, hue: 355 },
  { id: "dan", name: "Dev Dan", role: "Developer", emoji: "💻", img: developer, hue: 230 },
  { id: "grace", name: "Grace", role: "Project Manager", emoji: "📋", img: pm, hue: 150 },
  { id: "mark", name: "Mark", role: "Founder", emoji: "🚀", img: founder, hue: 70 },
  { id: "joy", name: "Joy", role: "Marketing", emoji: "📣", img: marketer, hue: 300 },
  { id: "sal", name: "Sal", role: "Sales", emoji: "📞", img: sales, hue: 25 },
];

function Face({ m, size = 96 }: { m: Mate; size?: number }) {
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <div className="absolute inset-0 rounded-full" style={{ background: `radial-gradient(circle, oklch(0.62 0.18 ${m.hue} / 0.55), transparent 70%)`, transform: "scale(1.25)" }} />
      <div className="relative size-full overflow-hidden rounded-full border-2" style={{ borderColor: `oklch(0.72 0.16 ${m.hue})`, background: `oklch(0.32 0.08 ${m.hue})` }}>
        <img src={m.img} alt={`${m.name}, ${m.role}`} className="size-full object-cover" loading="lazy" />
      </div>
      <span className="absolute -bottom-1 -right-1 flex items-center justify-center rounded-full border bg-card" style={{ width: size * 0.34, height: size * 0.34, fontSize: size * 0.18 }}>{m.emoji}</span>
    </div>
  );
}

function SlackPage() {
  const [playing, setPlaying] = useState<string | null>(null);
  const [audioError, setAudioError] = useState<string | null>(null);
  const activeAudio = useRef<HTMLAudioElement | null>(null);
  const playbackId = useRef(0);

  useEffect(() => () => {
    playbackId.current++;
    activeAudio.current?.pause();
    activeAudio.current = null;
  }, []);

  const preview = (mate: Mate) => {
    playbackId.current++;
    activeAudio.current?.pause();
    activeAudio.current = null;
    setAudioError(null);
    if (playing === mate.id) {
      setPlaying(null);
      return;
    }
    const id = playbackId.current;
    setPlaying(mate.id);
    const laugh = new Audio(`/audio/office/${mate.id}-laugh.mp3`);
    laugh.preload = "auto";
    laugh.load();
    const voice = new Audio(`/audio/office/${mate.id}-voice.mp3`);
    activeAudio.current = voice;
    const fail = () => {
      if (playbackId.current !== id) return;
      setAudioError(mate.id);
      setPlaying(null);
      activeAudio.current = null;
    };
    voice.onerror = fail;
    laugh.onerror = fail;
    voice.onended = () => {
      if (playbackId.current !== id) return;
      activeAudio.current = laugh;
      void laugh.play().catch(fail);
    };
    laugh.onended = () => {
      if (playbackId.current !== id) return;
      activeAudio.current = null;
      setPlaying(null);
    };
    void voice.play().catch(fail);
  };

  return (
    <main className="min-h-screen overflow-x-clip">
      <div className="mx-auto max-w-5xl px-5 py-8 md:px-6 md:py-12">
        <nav className="sticky top-0 z-50 -mx-5 mb-10 flex flex-wrap items-center justify-between gap-x-3 gap-y-2 px-5 py-3 sm:mb-12 sm:gap-3 md:-mx-6 md:px-6">
          <Link to="/" className="flex shrink-0 items-center gap-2 font-display text-base font-black tracking-tight md:text-xl">
            <LogoMark size={28} className="hidden sm:block" />
            <span className="whitespace-nowrap">Laughter<span className="text-primary">Circle</span></span>
          </Link>
          <div className="flex min-w-0 items-center gap-1.5 text-xs font-semibold sm:gap-2 sm:text-sm">
            <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-primary/15 px-2.5 py-1.5 text-primary sm:px-3 sm:py-2"><Slack className="size-3.5 sm:size-4" /> For Slack</span>
            <Link to="/story" className="shrink-0 rounded-full px-2.5 py-1.5 hover:bg-muted sm:px-3 sm:py-2">Our story</Link>
            <ShareButton />
            <Link to="/auth" className="hidden shrink-0 rounded-full border bg-card/70 px-4 py-2 hover:bg-muted sm:inline-block">Sign in</Link>
          </div>
        </nav>

        {/* HERO */}
        <section className="grid items-center gap-16 md:grid-cols-2 md:gap-10">
          <div>
            <p className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground"><Slack className="size-4" /> Laughter Circle for Slack</p>
            <h1 className="mt-3 font-display text-4xl font-black leading-tight md:text-6xl">
              Turn your Slack team into a <span className="text-primary">Laughter Circle.</span>
            </h1>
            <p className="mt-5 text-lg text-muted-foreground">
              A playful AI laughter experience where teammates create their own characters, clone their voices and make each other laugh.
            </p>
            <a href="#waitlist" className="mt-7 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 font-bold text-primary-foreground shadow-lg transition hover:scale-[1.03]">
              <Slack className="size-4" /> Join the waitlist
            </a>
          </div>
          <HeroCircle />
        </section>

        {/* TOGETHER */}
        <section className="mt-24">
          <h2 className="font-display text-3xl font-black md:text-5xl">Laughter feels different together.</h2>
          <div className="mt-5 space-y-4 text-lg leading-relaxed text-muted-foreground">
            <p>Laughing can help people loosen up. But shared laughter does something else: <span className="font-semibold text-foreground">it creates connection.</span></p>
            <p>People let their guard down, become more playful and share a moment outside the usual rhythm of meetings, deadlines and work.</p>
          </div>
        </section>

        {/* GAME */}
        <section className="mt-24">
          <h2 className="font-display text-3xl font-black md:text-5xl">Your team becomes <span className="text-accent">the game.</span></h2>
          <div className="mt-5 space-y-4 text-lg leading-relaxed text-muted-foreground">
            <p>Each teammate can create their own Laughter Circle characters — based on themselves, their voice and their look, or something entirely invented.</p>
            <p>Create one or create many. They become part of your team's Laughter Circle inside Slack, joining the group and taking turns guiding the laugh.</p>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {TEAM.map((m) => (
              <div key={m.name} className="flex flex-col items-center rounded-3xl border p-5 text-center" style={{ background: `linear-gradient(180deg, oklch(0.32 0.08 ${m.hue} / 0.5), var(--card))` }}>
                <Face m={m} size={88} />
                <p className="mt-4 font-display text-lg font-black">{m.name}</p>
                <p className="text-xs text-muted-foreground">{m.role}</p>
                <span className="mt-2 rounded-full bg-background/40 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide">created by a teammate</span>
                <Button type="button" variant="outline" size="sm" onClick={() => preview(m)} className="mt-4 h-auto min-h-8 max-w-full rounded-full bg-transparent px-2.5 py-1.5 text-xs hover:bg-muted" aria-label={`${playing === m.id ? "Stop" : "Play"} ${m.name}'s voice and laugh`}>
                  <Headphones className="size-3.5" /> {playing === m.id ? "Playing…" : "Voice & laugh"}
                </Button>
                {audioError === m.id && <p role="alert" className="mt-2 text-xs text-destructive">Audio unavailable. Try again.</p>}
              </div>
            ))}
          </div>
          <div className="mt-12"><SlackMockup /></div>
        </section>

        {/* STEPS */}
        <section className="mt-24">
          <h2 className="font-display text-3xl font-black md:text-5xl">Create. Share. Laugh.</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { i: <Sparkles className="size-5" />, t: "Create your characters", d: "Turn yourself into an avatar, clone your voice, or create a completely new character.", m: TEAM[0]! },
              { i: <Users className="size-5" />, t: "Meet your team's characters", d: "Everyone's creations become part of the Laughter Circle.", m: TEAM[2]! },
              { i: <Coffee className="size-5" />, t: "Take a laughter break", d: "Join a short guided laugh whenever you feel like it — on your own or together with your team.", m: TEAM[3]! },
              { i: <RefreshCw className="size-5" />, t: "Keep the circle going", d: "Different characters can guide different laughs, creating new combinations every time.", m: TEAM[4]! },
            ].map((s, n) => (
              <div key={s.t} className="relative rounded-3xl border bg-card p-6">
                <div className="flex items-center justify-between">
                  <span className="flex size-10 items-center justify-center rounded-2xl bg-primary/15 text-primary">{s.i}</span>
                  <Face m={s.m} size={44} />
                </div>
                <p className="mt-4 text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">Step {n + 1}</p>
                <h3 className="mt-1 font-display text-xl font-black leading-snug">{s.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* BREAK */}
        <section className="mt-24 rounded-3xl border bg-card p-8 text-center md:p-12">
          <div className="flex justify-center -space-x-3">
            {TEAM.slice(0, 5).map((m) => <Face key={m.name} m={m} size={52} />)}
          </div>
          <h2 className="mt-6 font-display text-3xl font-black md:text-5xl">Take a break. Laugh a little.</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            A Laughter Circle can be just a few minutes: scheduled with your team or started whenever you feel like taking a quick break together.
          </p>
        </section>

        {/* WAITLIST */}
        <section id="waitlist" className="mt-24 scroll-mt-8 rounded-3xl bg-primary p-8 text-center text-primary-foreground md:p-12">
          <div className="flex justify-center -space-x-2">
            {TEAM.map((m) => <Face key={m.name} m={m} size={44} />)}
          </div>
          <h2 className="mt-6 font-display text-3xl font-black md:text-5xl">Your team already knows each other.</h2>
          <p className="mt-2 font-display text-2xl font-black opacity-95 md:text-3xl">Now let the laughter spread.</p>
          <p className="mt-5 font-bold">Laughter Circle for Slack is coming soon.</p>
          <div className="mx-auto mt-7 max-w-md"><SlackWaitlistForm /></div>
          <p className="mt-4 text-sm opacity-90">Be one of the first teams to try Laughter Circle for Slack.</p>
          <Link to="/slack-admin" className="mt-3 inline-block text-sm font-bold underline">Workspace admin? Connect Slack →</Link>
        </section>

        <SiteFooter />
      </div>
    </main>
  );
}

function HeroCircle() {
  const R = 42; // percent
  return (
    <div className="relative mx-auto aspect-square w-full max-w-md">
      <div className="absolute inset-[18%] rounded-full border-2 border-dashed border-primary/40" />
      <div className="absolute inset-[30%] flex flex-col items-center justify-center rounded-full bg-card text-center shadow-2xl">
        <Slack className="size-8 text-primary" />
        <p className="mt-1 font-mono text-xs text-muted-foreground">#laugh-break</p>
        <p className="font-display text-lg font-black">HA HA HA!</p>
      </div>
      {TEAM.map((m, i) => {
        const a = (i / TEAM.length) * Math.PI * 2 - Math.PI / 2;
        return (
          <div key={m.name} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${50 + R * Math.cos(a)}%`, top: `${50 + R * Math.sin(a)}%` }}>
            <Face m={m} size={84} />
          </div>
        );
      })}
    </div>
  );
}

function SlackMockup() {
  const [joined, setJoined] = useState(false);
  const guide = TEAM[3]!;
  return (
    <div className="mx-auto max-w-2xl overflow-hidden rounded-2xl border bg-card shadow-2xl">
      <div className="flex items-center gap-2 border-b bg-muted/60 px-4 py-3">
        <span className="size-3 rounded-full bg-destructive/70" /><span className="size-3 rounded-full bg-accent/70" /><span className="size-3 rounded-full bg-calm/70" />
        <span className="ml-3 inline-flex items-center gap-1 text-sm font-bold"><Hash className="size-4" />team-general</span>
      </div>
      <div className="space-y-5 p-5">
        <Msg m={TEAM[2]!} time="3:58 PM">Friday afternoon energy is… low 😅</Msg>
        <div className="flex gap-3">
          <Face m={guide} size={40} />
          <div className="min-w-0 flex-1">
            <p className="text-sm"><span className="font-bold">{guide.name}'s character</span> <span className="rounded bg-muted px-1 text-[10px] font-bold uppercase">App</span> <span className="text-xs text-muted-foreground">4:00 PM</span></p>
            <div className="mt-1 rounded-xl border-l-4 border-primary bg-background/40 p-4">
              <p className="font-semibold">😂 Laugh break? I'm guiding a 3-minute Laughter Circle.</p>
              <p className="mt-1 text-sm text-muted-foreground">Today: the laughing phone call 📞 — with Lena, Dan and Joy's characters.</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <button onClick={() => setJoined(true)} className="rounded-lg bg-primary px-4 py-1.5 text-sm font-bold text-primary-foreground">{joined ? "✓ Joined" : "Join the laugh"}</button>
                <button className="rounded-lg border px-4 py-1.5 text-sm font-semibold">Later</button>
              </div>
              <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                <div className="flex -space-x-2">{TEAM.slice(0, joined ? 5 : 4).map((m) => <Face key={m.name} m={m} size={22} />)}</div>
                {joined ? 5 : 4} teammates joined
              </div>
            </div>
          </div>
        </div>
        <Msg m={TEAM[5]!} time="4:03 PM">I can't breathe 🤣 Dan's character laughs exactly like him</Msg>
      </div>
    </div>
  );
}

function Msg({ m, time, children }: { m: Mate; time: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-3">
      <Face m={m} size={40} />
      <div><p className="text-sm"><span className="font-bold">{m.name}</span> <span className="text-xs text-muted-foreground">{time}</span></p><p className="text-sm">{children}</p></div>
    </div>
  );
}

