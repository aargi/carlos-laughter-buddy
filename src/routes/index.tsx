import { createFileRoute, Link } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { Play, SkipForward, Volume2, VolumeX, X, Headphones, RefreshCw, UserRound, Sparkles, Handshake, Share2, Copy, Check, Facebook, Linkedin, Twitter, MessageCircle, Lock, LogOut, Slack } from "lucide-react";
import { useAuth, signOut } from "@/hooks/use-auth";
import { LogoMark } from "@/components/LogoMark";
import { SiteFooter } from "@/components/SiteFooter";
import { AVATARS } from "@/lib/avatars";
import { EXERCISES } from "@/lib/exercises";
import { exerciseText } from "@/lib/audio-phrases";
import { getAnalyser, getMicAnalyser, laughAlong, preloadLaugh, preloadLaughAlong, preloadSpeak, speak, startMic, stopAll, stopGroup, stopMic } from "@/lib/carlos-audio";
import { WaveRing } from "@/components/WaveRing";
import { CHARACTERS, auraColor, getCharacter, type Character } from "@/lib/characters";

/* Pro guides — rendered exactly like the character cards, but Pro-only. */
const PRO_GUIDES: { c: Character; interest: string }[] = [
  {
    interest: "custom-character",
    c: {
      id: "custom", name: "Create your own", origin: "Not born yet", emoji: "✨",
      archetype: "The Unborn Guide",
      traits: ["Your design", "Any aura", "Any voice"],
      bio: "A guide waiting to be born — you choose everything.",
      auraName: "Idea indigo", aura: "265", voiceId: "PRO-PENDING",
      laughStyle: "Yours to invent",
      laugh: "", greeting: "",
    },
  },
  {
    interest: "clone-yourself",
    c: {
      id: "mirror", name: "Clone yourself", origin: "Inside you", emoji: "🪞",
      archetype: "The Future You",
      traits: ["Your voice", "Your laugh", "100% you"],
      bio: "A few seconds of your voice, and you join the circle.",
      auraName: "Mirror silver", aura: "200", voiceId: "PRO-PENDING",
      laughStyle: "Exactly yours",
      laugh: "", greeting: "",
    },
  },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Laughter Circle — guided laughter therapy with 10 characters" },
      { name: "description", content: "Pick your guide from 10 characters, each with their own voice, aura and laugh, and laugh together through a guided session." },
      { property: "og:title", content: "Laughter Circle — guided laughter therapy" },
      { property: "og:description", content: "Ten characters, ten voices, ten laughs. Choose your guide and laugh with the group." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: App,
});

type Screen = "home" | "session" | "closing";
type Phase = "explaining" | "user_turn";

function App() {
  const [screen, setScreen] = useState<Screen>("home");
  const [muted, setMuted] = useState(false);
  const [guideId, setGuideId] = useState("carlos");
  const guide = getCharacter(guideId);
  useEffect(() => () => { stopAll(); stopGroup(); }, []);

  return (
    <main className="min-h-screen">
      {screen === "home" && <Home guide={guide} setGuideId={setGuideId} onStart={() => setScreen("session")} />}
      {screen === "session" && (
        <Session guide={guide} muted={muted} setMuted={setMuted} onExit={() => { stopAll(); stopGroup(); stopMic(); setScreen("home"); }} onFinish={() => { stopGroup(); stopMic(); setScreen("closing"); }} />
      )}
      {screen === "closing" && <Closing guide={guide} muted={muted} onHome={() => setScreen("home")} />}
    </main>
  );
}

/* ---------------- Avatar with aura + emoji badge ---------------- */
function Avatar({ c, size = 96, active = false, withMic = false, badge = true }: { c: Character; size?: number; active?: boolean; withMic?: boolean; badge?: boolean }) {
  const sources = [{ get: () => getAnalyser(c.id), color: auraColor(c, 0.62, 0.2) }];
  if (withMic) sources.push({ get: getMicAnalyser, color: "--primary" });
  const b = Math.max(20, size * 0.3);
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <div
        className={`absolute -inset-[22%] rounded-full blur-2xl transition-opacity duration-500 ${active ? "animate-pulse opacity-100" : "opacity-50"}`}
        style={{ background: `radial-gradient(circle, ${auraColor(c, 0.8, 0.2)} 0%, transparent 70%)` }}
      />
      <WaveRing sources={sources} size={size} />
      <div
        className="relative size-full overflow-hidden rounded-full shadow-lg ring-4 ring-card"
        style={{ background: `radial-gradient(circle at 50% 35%, ${auraColor(c, 0.42, 0.1)}, ${auraColor(c, 0.3, 0.09)})` }}
      >
        <img src={AVATARS[c.id]} alt={c.name} width={816} height={816} loading="lazy" className="size-full translate-y-[6%] scale-110 object-cover" />
      </div>
      {badge && (
        <span
          aria-hidden
          className="absolute -bottom-[2%] -right-[2%] flex items-center justify-center rounded-full shadow-md ring-2 ring-card"
          style={{ width: b, height: b, fontSize: b * 0.55, background: auraColor(c, 0.34, 0.1) }}
        >
          {c.emoji}
        </span>
      )}
    </div>
  );
}

/* ---------------- Home ---------------- */
function Home({ guide, setGuideId, onStart }: { guide: Character; setGuideId: (id: string) => void; onStart: () => void }) {
  const [playing, setPlaying] = useState<string | null>(null);
  const preview = async (c: Character) => {
    setGuideId(c.id);
    setPlaying(c.id);
    preloadLaugh(c.id);
    await speak(c.greeting, { character: c.id });
    await speak(c.laugh, { character: c.id, expressive: true });
    setPlaying((p) => (p === c.id ? null : p));
  };
  return (
    <div className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 right-[-10%] size-[46rem] rounded-full opacity-40 blur-3xl transition-colors duration-700"
        style={{ background: `radial-gradient(circle, ${auraColor(guide, 0.7, 0.18)}, transparent 65%)` }}
      />
      <div className="relative mx-auto max-w-6xl px-4 py-6 sm:px-6 md:py-14">
        <nav className="mb-8 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 sm:mb-10 sm:flex sm:justify-between">
          <span className="flex min-w-0 items-center gap-2 font-display text-base font-black tracking-tight sm:text-xl"><LogoMark size={32} className="hidden sm:block" />Laughter<span className="text-primary">Circle</span></span>
          <div className="flex items-center justify-end gap-2 sm:gap-3">
            <span className="hidden rounded-full border bg-card/70 px-3 py-1 text-xs font-semibold text-muted-foreground backdrop-blur sm:inline">~8 min · 6 exercises</span>
            <Link to="/slack" className="inline-flex items-center gap-1.5 rounded-full border bg-card/70 px-2.5 py-1.5 text-xs font-semibold backdrop-blur transition hover:bg-muted sm:px-4 sm:py-2 sm:text-sm"><Slack className="size-3.5 sm:size-4" /> For Slack</Link>
            <Link to="/story" className="hidden rounded-full border bg-card/70 px-4 py-2 text-sm font-semibold backdrop-blur transition hover:bg-muted sm:inline-flex">Our story</Link>
            <ShareButton />
            <AccountButton />
          </div>
        </nav>

        <section className="grid items-center gap-10 md:grid-cols-[1.15fr_1fr] md:gap-12">
          <div className="min-w-0">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground sm:mb-5 sm:text-sm">AI laughter therapy</p>
            <h1 className="text-4xl font-black leading-[0.95] sm:text-5xl md:text-7xl">
              Laugh with{" "}
              <span className="transition-colors duration-500" style={{ color: auraColor(guide, 0.78, 0.17) }}>{guide.name}</span>
              <br />and the circle.
            </h1>
            <p className="mt-5 max-w-lg text-base text-muted-foreground sm:mt-6 sm:text-lg">
              Join a guided laughter therapy session. Laugh along with your guide and the circle, each with their own unmistakable laugh.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
              <button
                onClick={() => { stopAll(); onStart(); }}
                className="inline-flex items-center justify-center gap-3 rounded-full bg-primary px-8 py-4 text-lg font-bold text-primary-foreground shadow-xl shadow-primary/30 transition hover:scale-[1.03] hover:bg-primary/90"
              >
                <Play className="size-5 fill-current" /> Start with {guide.name}
              </button>
              <button
                onClick={() => void preview(guide)}
                className="inline-flex items-center justify-center gap-2 rounded-full border bg-card/80 px-5 py-4 font-semibold backdrop-blur hover:bg-muted"
              >
                <Headphones className="size-4" /> {playing === guide.id ? "Playing…" : "Hear me"}
              </button>
            </div>
          </div>

          <div className="flex flex-col items-center text-center">
            <button
              onClick={() => { stopAll(); onStart(); }}
              aria-label={`Start session with ${guide.name}`}
              className="cursor-pointer rounded-full transition duration-300 hover:scale-[1.04] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
            >
              <Avatar key={guide.id} c={guide} size={260} active={playing === guide.id} />
            </button>
            <div className="mt-8 w-full max-w-sm rounded-3xl border bg-card/80 p-5 shadow-sm backdrop-blur">
              <p className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: auraColor(guide, 0.72, 0.14) }}>{guide.archetype}</p>
              <p className="mt-2 text-muted-foreground">{guide.bio}</p>
              <div className="mt-4 grid grid-cols-2 gap-3 text-left text-sm">
                <div className="rounded-2xl bg-muted/60 p-3">
                  <div className="text-xs text-muted-foreground">Aura</div>
                  <div className="mt-0.5 flex items-center gap-2 font-semibold">
                    <span className="size-3 rounded-full" style={{ background: auraColor(guide, 0.78, 0.16) }} />{guide.auraName}
                  </div>
                </div>
                <div className="rounded-2xl bg-muted/60 p-3">
                  <div className="text-xs text-muted-foreground">Laugh</div>
                  <div className="mt-0.5 font-semibold">{guide.laughStyle}</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-20">
          <div className="mb-6 flex items-end justify-between">
            <h2 className="text-3xl font-black">Choose your guide</h2>
            <p className="hidden text-sm text-muted-foreground md:block">Ten personalities from around the world</p>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {CHARACTERS.map((c) => {
              const sel = c.id === guide.id;
              return (
                <div
                  key={c.id}
                  role="button"
                  tabIndex={0}
                  onClick={() => setGuideId(c.id)}
                  onKeyDown={(e) => e.key === "Enter" && setGuideId(c.id)}
                  className={`group relative flex cursor-pointer flex-col items-center overflow-hidden rounded-3xl border-2 bg-card p-5 pt-6 text-center transition duration-300 hover:-translate-y-1 hover:shadow-xl ${sel ? "shadow-xl" : "border-transparent shadow-sm"}`}
                  style={sel ? { borderColor: auraColor(c, 0.75, 0.15) } : undefined}
                >
                  <div
                    aria-hidden
                    className="absolute inset-x-0 top-0 h-24 opacity-70"
                    style={{ background: `linear-gradient(to bottom, ${auraColor(c, 0.34, 0.08)}, transparent)` }}
                  />
                  <div className="relative"><Avatar c={c} size={84} active={playing === c.id} /></div>
                  <div className="relative mt-4 text-lg font-bold leading-tight">{c.name}</div>
                  <div className="relative text-xs text-muted-foreground">{c.origin}</div>
                  <div className="relative mt-2 text-xs font-bold" style={{ color: auraColor(c, 0.72, 0.13) }}>{c.archetype}</div>
                  <div className="relative mt-3 flex flex-wrap justify-center gap-1">
                    {c.traits.map((t) => (
                      <span key={t} className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium">{t}</span>
                    ))}
                  </div>
                  <button
                    onClick={(e) => { e.stopPropagation(); void preview(c); }}
                    className="relative mt-4 inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition hover:bg-muted"
                  >
                    <Headphones className="size-3.5" /> {playing === c.id ? "Playing…" : "Voice & laugh"}
                  </button>
                </div>
              );
            })}
          {PRO_GUIDES.map(({ c, interest }) => (
            <ProGuideCard key={c.id} c={c} interest={interest} />
          ))}
        </div>
        </section>

        <section className="mt-20">
          <h2 className="mb-6 text-3xl font-black">Your journey</h2>
          <ol className="grid gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {EXERCISES.map((e, i) => (
              <li key={e.id} className="rounded-2xl border bg-card/80 p-4 backdrop-blur">
                <div className="flex items-center gap-2">
                  <span className="flex size-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">{i + 1}</span>
                  <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{e.intensityLabel}</span>
                </div>
                <div className="mt-2 font-semibold leading-tight">{e.name}</div>
                <IntensityBar level={e.intensity} />
              </li>
            ))}
          </ol>
        </section>

        <SiteFooter />
      </div>
    </div>
  );
}

function IntensityBar({ level }: { level: number }) {
  return (
    <div className="mt-3 flex gap-1">
      {[1, 2, 3, 4, 5].map((n) => (
        <span key={n} className={`h-1.5 flex-1 rounded-full ${n <= level ? "bg-primary" : "bg-muted"}`} />
      ))}
    </div>
  );
}

/* ---------------- Session ---------------- */
function Session({ guide, muted, setMuted, onExit, onFinish }: { guide: Character; muted: boolean; setMuted: (m: boolean) => void; onExit: () => void; onFinish: () => void }) {
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("explaining");
  const [runId, setRunId] = useState(0);
  const ex = EXERCISES[index]!;
  const mutedRef = useRef(muted);
  mutedRef.current = muted;
  const group = CHARACTERS.filter((c) => c.id !== guide.id);
  const [laughingSet, setLaughingSet] = useState<Set<string>>(new Set());
  const [turnDone, setTurnDone] = useState(false);
  // Group laugh: ON by default — two buddies laugh the exercise pattern with you on your turn.
  const [groupLaugh, setGroupLaugh] = useState(true);
  const groupLaughRef = useRef(groupLaugh);
  groupLaughRef.current = groupLaugh;
  const [buddies] = useState<string[]>(() =>
    [...CHARACTERS].filter((c) => c.id !== guide.id).sort(() => Math.random() - 0.5).slice(0, 2).map((c) => c.id)
  );
  useEffect(() => { setTurnDone(false); }, [index, runId, phase]);

  useEffect(() => {
    buddies.forEach((id) => preloadLaughAlong(id, EXERCISES[0]!.syllable));
  }, [buddies]);
  useEffect(() => { buddies.forEach((id) => preloadLaughAlong(id, ex.syllable)); }, [buddies, ex.syllable]);

  // On your turn, your two buddies laugh along with you, following the exercise's sound and intensity.
  useEffect(() => {
    if (phase !== "user_turn" || turnDone) return;
    let alive = true;
    let t: ReturnType<typeof setTimeout>;
    const gap = Math.max(900, 3000 - ex.intensity * 350);
    const fire = (id: string) => {
      setLaughingSet((s) => new Set(s).add(id));
      void laughAlong(id, ex.syllable, 0.4 + ex.intensity * 0.08).then(() => {
        if (alive) setLaughingSet((s) => { const n = new Set(s); n.delete(id); return n; });
      });
    };
    const loop = () => {
      if (!alive) return;
      if (!mutedRef.current && groupLaughRef.current) {
        buddies.forEach((id, i) => setTimeout(() => alive && fire(id), i * 400));
      }
      t = setTimeout(loop, gap * (0.75 + Math.random() * 0.5));
    };
    t = setTimeout(loop, 900);
    return () => { alive = false; clearTimeout(t); stopGroup(); setLaughingSet(new Set()); };
  }, [phase, index, ex.intensity, ex.syllable, buddies, turnDone]);

  const startUserTurn = useCallback(() => {
    stopAll();
    setPhase("user_turn");
    void startMic();
    if (!mutedRef.current) void speak("Your turn!", { character: guide.id });
  }, [guide.id]);

  // Main state machine per exercise: Carlos explains with words, then it's your turn.
  useEffect(() => {
    const token = { cancelled: false };
    stopAll();
    setPhase("explaining");
    // Warm the cache while the guide explains, so the laugh and "Your turn!" play instantly.
    preloadSpeak("Your turn!", guide.id);
    preloadLaugh(guide.id);
    preloadSpeak(exerciseText(Math.min(index + 1, EXERCISES.length - 1)), guide.id);
    (async () => {
      if (!mutedRef.current) await speak(exerciseText(index), { character: guide.id });
      else await new Promise((r) => setTimeout(r, 6000));
      if (token.cancelled) return;
      startUserTurn();
    })();
    return () => { token.cancelled = true; stopAll(); };
  }, [index, runId, ex, startUserTurn, guide.id]);

  const next = () => {
    stopAll();
    if (index < EXERCISES.length - 1) setIndex(index + 1);
    else onFinish();
  };

  return (
    <div className="mx-auto flex min-h-screen max-w-5xl flex-col px-6 py-6">
      <header className="flex items-center justify-between gap-4">
        <button onClick={onExit} className="rounded-full p-2 text-muted-foreground hover:bg-muted" aria-label="Exit">
          <X className="size-5" />
        </button>
        <div className="flex flex-1 gap-1.5">
          {EXERCISES.map((e, i) => (
            <span key={e.id} className={`h-2 flex-1 rounded-full transition-colors ${i < index ? "bg-primary" : i === index ? "bg-accent" : "bg-muted"}`} />
          ))}
        </div>
        <button onClick={() => { if (!muted) stopAll(); setMuted(!muted); }} className="rounded-full p-2 text-muted-foreground hover:bg-muted" aria-label={muted ? "Unmute" : "Mute"}>
          {muted ? <VolumeX className="size-5" /> : <Volume2 className="size-5" />}
        </button>
      </header>

      <div className="mt-8 grid flex-1 items-center gap-8 md:grid-cols-2">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-accent">{ex.block} · Exercise {index + 1} of {EXERCISES.length}</p>
          <h2 className="mt-2 text-4xl font-black leading-tight md:text-5xl">{ex.name}</h2>
          <div className="mt-6 space-y-3 rounded-2xl border bg-card p-5">
            <Row label="Sound" value={ex.syllable.length <= 2 ? `“${ex.syllable.toLowerCase()}”` : ex.syllable} />
            <Row label="Posture" value={ex.posture} />
            <Row label="Focus" value={ex.focus} />
            <div className="flex items-center justify-between pt-1">
              <span className="text-sm text-muted-foreground">Intensity · {ex.intensityLabel}</span>
              <div className="w-32"><IntensityBar level={ex.intensity} /></div>
            </div>
          </div>
          {phase === "explaining" && <p className="mt-5 text-lg italic text-muted-foreground">“{ex.explanation}”</p>}
        </div>

        <div className="flex flex-col items-center">
          {phase === "user_turn" ? (
            <UserTurn key={`${index}-${runId}`} seconds={ex.userSeconds} syllable={ex.syllable} onDoneChange={setTurnDone} />
          ) : (
            <GuideStage guide={guide} />
          )}

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {phase === "explaining" && (
              <button onClick={startUserTurn} className="inline-flex items-center gap-2 rounded-full border px-5 py-3 font-semibold hover:bg-muted">
                <SkipForward className="size-4" /> Skip to my turn
              </button>
            )}
            {phase === "user_turn" && (
              <button onClick={next} className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-bold text-primary-foreground shadow-lg shadow-primary/30 hover:bg-primary/90">
                {index < EXERCISES.length - 1 ? "Next exercise" : "Go to cool-down"} <SkipForward className="size-4" />
              </button>
            )}
            {phase === "explaining" && index === 0 && runId === 0 && (
              <button onClick={() => setRunId(runId + 1)} className="text-sm text-muted-foreground underline">Can't hear {guide.name}? Try again</button>
            )}
          </div>
        </div>
      </div>

      <div className="mt-8 rounded-3xl border bg-card/70 p-4">
        <div className="mb-3 flex items-center justify-center gap-3">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            The laughter circle {phase === "user_turn" && groupLaugh ? `· ${buddies.map((b) => getCharacter(b).name).join(" & ")} laugh with you` : ""}
          </p>
          <button
            onClick={() => { if (groupLaugh) stopGroup(); setGroupLaugh(!groupLaugh); }}
            className={`rounded-full border px-3 py-1 text-[11px] font-bold transition ${groupLaugh ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"}`}
            aria-pressed={groupLaugh}
          >
            Group laugh {groupLaugh ? "ON" : "OFF"}
          </button>
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          {group.map((c) => {
            const isBuddy = buddies.includes(c.id);
            return (
              <div key={c.id} className={`flex flex-col items-center transition-all ${laughingSet.has(c.id) ? "scale-125" : ""} ${groupLaugh && isBuddy ? "" : "opacity-80"}`}>
                <Avatar c={c} size={60} active={laughingSet.has(c.id)} />
                <span className="mt-1 text-[11px] font-medium">
                  {c.name}{groupLaugh && isBuddy && <span className="ml-1 text-primary">· buddy</span>}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[5rem_1fr] gap-3">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}

function GuideStage({ guide }: { guide: Character }) {
  return (
    <div className="relative flex flex-col items-center">
      <Avatar c={guide} size={260} active withMic />
      <div className="mt-6 rounded-full bg-card px-4 py-1.5 text-sm font-semibold shadow">
        {guide.name} is explaining…
      </div>
    </div>
  );
}

function UserTurn({ seconds, syllable, onDoneChange }: { seconds: number; syllable: string; onDoneChange: (d: boolean) => void }) {
  const [total, setTotal] = useState(seconds);
  const [left, setLeft] = useState(seconds);
  const [endAt, setEndAt] = useState(() => Date.now() + seconds * 1000);
  useEffect(() => {
    onDoneChange(false);
    const iv = setInterval(() => {
      const l = Math.max(0, (endAt - Date.now()) / 1000);
      setLeft(l);
      if (l <= 0) { clearInterval(iv); onDoneChange(true); }
    }, 100);
    return () => clearInterval(iv);
  }, [endAt, onDoneChange]);
  const addTwoMinutes = () => {
    const base = Math.max(Date.now(), endAt);
    setEndAt(base + 120_000);
    setTotal(Math.max(0, (base - Date.now()) / 1000) + 120);
  };
  const seconds_ = total;
  const r = 120;
  const c = 2 * Math.PI * r;
  const frac = seconds_ > 0 ? Math.min(1, left / seconds_) : 0;
  const hue = 45 - (1 - frac) * 35; // orange -> red-pink as time goes
  const done = left <= 0;
  return (
    <div className="flex flex-col items-center">
      <p className="mb-4 font-display text-4xl font-black text-accent">{done ? "Well done!" : "Your turn!"}</p>
      <div className="relative size-64">
        <WaveRing sources={[{ get: getMicAnalyser, color: "--primary" }]} size={256} />
        <svg viewBox="0 0 260 260" className="size-full -rotate-90">
          <circle cx="130" cy="130" r={r} fill="none" stroke="var(--muted)" strokeWidth="14" />
          <circle
            cx="130" cy="130" r={r} fill="none" strokeWidth="14" strokeLinecap="round"
            stroke={`oklch(0.66 0.19 ${hue})`}
            strokeDasharray={c}
            strokeDashoffset={c * (1 - frac)}
            style={{ transition: "stroke-dashoffset 0.1s linear" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-display text-6xl font-black tabular-nums">{left >= 60 ? `${Math.floor(Math.ceil(left) / 60)}:${String(Math.ceil(left) % 60).padStart(2, "0")}` : Math.ceil(left)}</span>
          <span className="text-sm text-muted-foreground">{left >= 60 ? "minutes" : "seconds"}</span>
          <span className="mt-2 font-display text-2xl font-bold text-primary">{syllable.length <= 2 ? `${syllable} ${syllable} ${syllable}` : syllable}</span>
        </div>
      </div>
      <button onClick={addTwoMinutes} className="mt-4 rounded-full border px-4 py-2 text-sm font-semibold hover:bg-muted">
        + 2 minutes
      </button>
    </div>
  );
}

/* ---------------- Closing ---------------- */
const MOODS = [
  { e: "😔", l: "Same" },
  { e: "🙂", l: "A bit better" },
  { e: "😊", l: "Good" },
  { e: "😄", l: "Great" },
  { e: "🤣", l: "Amazing!" },
];

function Closing({ guide, muted, onHome }: { guide: Character; muted: boolean; onHome: () => void }) {
  const [breath, setBreath] = useState<"in" | "out">("in");
  const [cycles, setCycles] = useState(0);
  const [mood, setMood] = useState<number | null>(null);
  const [history, setHistory] = useState<{ mood: number; date: string }[]>([]);

  useEffect(() => {
    try { setHistory(JSON.parse(localStorage.getItem("riso-moods") || "[]")); } catch { /* ignore */ }
    if (!muted) void speak("Well done. Now let's return to calm. Breathe in deeply through your nose… and out softly through your mouth. Follow the circle.", { character: guide.id });
    const iv = setInterval(() => {
      setBreath((b) => {
        if (b === "out") setCycles((c) => c + 1);
        return b === "in" ? "out" : "in";
      });
    }, 5000);
    return () => { clearInterval(iv); stopAll(); };
  }, [muted, guide.id]);

  const save = (m: number) => {
    setMood(m);
    const h = [{ mood: m, date: new Date().toISOString() }, ...history].slice(0, 20);
    setHistory(h);
    localStorage.setItem("riso-moods", JSON.stringify(h));
    if (!muted) void speak("Thanks for laughing with me. See you next time!", { character: guide.id });
  };

  return (
    <div className="mx-auto max-w-3xl px-6 py-12 text-center">
      <p className="text-sm font-semibold uppercase tracking-widest text-calm-foreground">Back to calm</p>
      <h2 className="mt-2 text-4xl font-black md:text-5xl">Breathe with {guide.name}</h2>
      <div className="relative mx-auto mt-10 flex size-64 items-center justify-center">
        <div className="absolute inset-0 animate-breathe rounded-full bg-calm/60" />
        <div className="relative font-display text-3xl font-bold text-calm-foreground">{breath === "in" ? "Breathe in…" : "Breathe out…"}</div>
      </div>
      <p className="mt-4 text-muted-foreground">Breaths completed: {cycles}</p>

      <div className="mt-12 rounded-3xl border bg-card p-8">
        <h3 className="text-2xl font-bold">How do you feel now?</h3>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          {MOODS.map((m, i) => (
            <button
              key={m.l}
              onClick={() => save(i)}
              className={`flex w-20 flex-col items-center rounded-2xl border-2 p-3 transition hover:scale-105 ${mood === i ? "border-primary bg-secondary" : "border-transparent hover:bg-muted"}`}
            >
              <span className="text-4xl">{m.e}</span>
              <span className="mt-1 text-xs font-medium">{m.l}</span>
            </button>
          ))}
        </div>
        {mood !== null && (
          <div className="mt-8 space-y-2">
            <p className="text-lg font-semibold">You completed 6 exercises and {cycles} breaths. Thanks for laughing with me!</p>
            {history.length > 1 && (
              <p className="text-sm text-muted-foreground">
                Your recent sessions: {history.slice(0, 7).map((h) => MOODS[h.mood]?.e).join(" ")}
              </p>
            )}
          </div>
        )}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <button onClick={onHome} className="rounded-full bg-primary px-8 py-3 font-bold text-primary-foreground hover:bg-primary/90">
            Back to start
          </button>
          <ShareButton />
        </div>
      </div>

      {/* ---------- What's next ---------- */}
      <div className="mt-14 text-left">
        <p className="text-center text-sm font-semibold uppercase tracking-widest text-muted-foreground">What's next?</p>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          <button
            onClick={onHome}
            className="group flex flex-col items-start rounded-3xl border bg-card p-6 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <span className="flex size-11 items-center justify-center rounded-2xl bg-primary/10 text-primary"><RefreshCw className="size-5" /></span>
            <span className="mt-4 text-lg font-bold">Keep laughing</span>
            <span className="mt-1 text-sm text-muted-foreground">Start a new session with a different AI guide — 9 more voices and laughs are waiting.</span>
            <span className="mt-4 text-sm font-semibold text-primary group-hover:underline">Choose another guide →</span>
          </button>
          <ProGate>
            <WaitlistCard
              interest="pro-session"
              icon={<UserRound className="size-5" />}
              title="Laugh with a pro"
              text="Complete a one-to-one session with a certified laughter yoga professional."
              cta="Join the waitlist →"
            />
          </ProGate>
          <ProGate>
            <WaitlistCard
              interest="custom-avatar"
              icon={<Sparkles className="size-5" />}
              title="Create your own avatar"
              text="Design a custom guide with its own aura, voice and signature laugh — a Pro feature."
              cta="Get early access →"
            />
          </ProGate>
        </div>
        <div className="mt-6 text-center">
          <WaitlistLink interest="pro-signup" text="Are you a laughter yoga professional? Sign up to offer one-to-one and group sessions." />
        </div>
      </div>

      <SiteFooter />
    </div>
  );
}

/* ---------- Pro / account ---------- */
function ProGate({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  return (
    <div className="relative h-full">
      <span className="absolute -top-2 right-4 z-10 inline-flex items-center gap-1 rounded-full bg-accent px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide text-accent-foreground">
        {!user && <Lock className="size-3" />} Pro
      </span>
      {user || loading ? children : (
        <div className="relative h-full">
          <div className="pointer-events-none h-full opacity-50 blur-[1px]">{children}</div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Link to="/auth" search={{ redirect: "/" }} className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground shadow-lg transition hover:bg-primary/90">
              <Lock className="size-4" /> Sign in to unlock
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

function AccountButton() {
  const { user, profile } = useAuth();
  if (!user) {
    return <Link to="/auth" className="rounded-full bg-primary px-3 py-1.5 text-xs font-bold text-primary-foreground transition hover:bg-primary/90 sm:px-4 sm:py-2 sm:text-sm">Sign in</Link>;
  }
  const name = profile?.display_name || user.email?.split("@")[0] || "You";
  const pic = profile?.avatar_url || (user.user_metadata?.['avatar_url'] as string | undefined);
  return (
    <div className="flex items-center gap-2 rounded-full border bg-card/70 py-1 pl-1 pr-3 backdrop-blur">
      {pic ? <img src={pic} alt="" className="size-7 rounded-full object-cover" referrerPolicy="no-referrer" /> : (
        <span className="flex size-7 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">{name[0]?.toUpperCase()}</span>
      )}
      <span className="hidden text-sm font-semibold sm:inline">{name}</span>
      <button onClick={() => void signOut()} title="Sign out" className="text-muted-foreground hover:text-primary"><LogOut className="size-4" /></button>
    </div>
  );
}

/* ---------- Waitlist helpers (saved to the backend) ---------- */
function saveWaitlist(interest: string, email: string, teamSize?: string) {
  fetch("/api/public/waitlist", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ interest, email, teamSize }),
  }).catch(() => { /* network hiccup — keep the UI flow anyway */ });
}

function WaitlistCard({ interest, icon, title, text, cta }: { interest: string; icon: React.ReactNode; title: string; text: string; cta: string }) {
  const [open, setOpen] = useState(false);
  const [done, setDone] = useState(false);
  return (
    <div className="flex h-full flex-col items-start rounded-3xl border bg-card p-6 shadow-sm">
      <span className="flex size-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">{icon}</span>
      <span className="mt-4 text-lg font-bold">{title}</span>
      <span className="mt-1 text-sm text-muted-foreground">{text}</span>
      {done ? (
        <span className="mt-4 text-sm font-semibold text-primary">You're on the list! 🎉</span>
      ) : open ? (
        <WaitlistForm interest={interest} onDone={() => setDone(true)} />
      ) : (
        <button onClick={() => setOpen(true)} className="mt-4 text-sm font-semibold text-primary hover:underline">{cta}</button>
      )}
    </div>
  );
}

/* Pro guide cards — same structure as the character cards, with a waitlist CTA instead of audio preview. */

/* Pro guide cards — same structure as the character cards. Signed-out users see it blurred with a Sign in CTA in the button slot. */
function ProGuideCard({ c, interest }: { c: Character; interest: string }) {
  const { user, loading } = useAuth();
  const [open, setOpen] = useState(false);
  const [done, setDone] = useState(false);
  const locked = !user && !loading;
  return (
    <div
      onClick={() => { if (!locked && !open && !done) setOpen(true); }}
      className="relative flex h-full cursor-pointer flex-col items-center overflow-hidden rounded-3xl border-2 border-transparent bg-card p-5 pt-6 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-24 opacity-70"
        style={{ background: `linear-gradient(to bottom, ${auraColor(c, 0.34, 0.08)}, transparent)` }}
      />
      <div className={`relative flex w-full flex-col items-center ${locked ? "pointer-events-none opacity-60 blur-[1px]" : ""}`}>
        <Avatar c={c} size={84} />
        <div className="mt-4 text-lg font-bold leading-tight">{c.name}</div>
        <div className="text-xs text-muted-foreground">{c.origin}</div>
        <div className="mt-2 text-xs font-bold" style={{ color: auraColor(c, 0.72, 0.13) }}>{c.archetype}</div>
        <div className="mt-3 flex flex-wrap justify-center gap-1">
          {c.traits.map((t) => (
            <span key={t} className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium">{t}</span>
          ))}
        </div>
      </div>
      <div className="relative mt-auto w-full pt-4">
        {locked ? (
          <Link
            to="/auth"
            search={{ redirect: "/" }}
            className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-xs font-bold text-primary-foreground transition hover:bg-primary/90"
          >
            <Lock className="size-3.5" /> Sign in to unlock
          </Link>
        ) : done ? (
          <span className="text-xs font-semibold text-primary">You're on the list! 🎉</span>
        ) : open ? (
          <WaitlistForm interest={interest} onDone={() => setDone(true)} stacked />
        ) : (
          <button
            onClick={(e) => { e.stopPropagation(); setOpen(true); }}
            className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition hover:bg-muted"
          >
            <Sparkles className="size-3.5" /> Get early access
          </button>
        )}
      </div>
    </div>
  );
}

function WaitlistLink({ interest, text }: { interest: string; text: string }) {
  const [open, setOpen] = useState(false);
  const [done, setDone] = useState(false);
  if (done) return <p className="text-sm font-semibold text-primary">Thanks! We'll be in touch soon. 💛</p>;
  if (open) return <div className="mx-auto max-w-md"><WaitlistForm interest={interest} onDone={() => setDone(true)} /></div>;
  return (
    <button onClick={() => setOpen(true)} className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground underline-offset-4 hover:text-primary hover:underline">
      <Handshake className="size-4" /> {text}
    </button>
  );
}

function WaitlistForm({ interest, onDone, stacked = false }: { interest: string; onDone: () => void; stacked?: boolean }) {
  const [email, setEmail] = useState("");
  const submit = () => {
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return;
    saveWaitlist(interest, email);
    onDone();
  };
  return (
    <form
      className={`mt-4 flex w-full gap-2 ${stacked ? "flex-col" : ""}`}
      onSubmit={(e) => { e.preventDefault(); submit(); }}
    >
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        className="min-w-0 flex-1 rounded-full border bg-background px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/50"
      />
      <button type="submit" className="shrink-0 rounded-full bg-primary px-4 py-2 text-sm font-bold text-primary-foreground hover:bg-primary/90">
        Notify me
      </button>
    </form>
  );
}

/* ---------------- Share ---------------- */
const SHARE_URL = "https://carlos-laughter-buddy.lovable.app";
const SHARE_TEXT = "I just laughed my way through a guided laughter yoga session with 10 hilarious AI guides. Try it — it's contagious! 😂";

function ShareButton({ className = "" }: { className?: string }) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent) => { if (!ref.current?.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [open]);

  const url = (medium: string) => `${SHARE_URL}?utm_source=share&utm_medium=${medium}&utm_campaign=laughter_circle`;

  const copy = async () => {
    try { await navigator.clipboard.writeText(url("copy_link")); } catch { /* ignore */ }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const nativeShare = async () => {
    try {
      await navigator.share({ title: "Laughter Circle", text: SHARE_TEXT, url: url("native") });
      setOpen(false);
    } catch { /* user cancelled */ }
  };

  const socials = [
    { label: "WhatsApp", icon: <MessageCircle className="size-4" />, href: `https://wa.me/?text=${encodeURIComponent(`${SHARE_TEXT} ${url("whatsapp")}`)}` },
    { label: "X", icon: <Twitter className="size-4" />, href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(SHARE_TEXT)}&url=${encodeURIComponent(url("x"))}` },
    { label: "Facebook", icon: <Facebook className="size-4" />, href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url("facebook"))}` },
    { label: "LinkedIn", icon: <Linkedin className="size-4" />, href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url("linkedin"))}` },
  ];

  return (
    <div ref={ref} className={`relative ${className}`}>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Share Laughter Circle"
        className="inline-flex items-center gap-2 rounded-full border bg-card/70 px-2.5 py-1.5 text-sm font-semibold backdrop-blur transition hover:bg-muted sm:px-4 sm:py-2"
      >
        <Share2 className="size-4" /> <span className="hidden sm:inline">Share</span>
      </button>
      {open && (
        <div className="absolute right-0 z-30 mt-2 w-60 rounded-2xl border bg-card p-3 shadow-xl">
          <button onClick={copy} className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium hover:bg-muted">
            {copied ? <Check className="size-4 text-primary" /> : <Copy className="size-4" />}
            {copied ? "Link copied!" : "Copy link"}
          </button>
          {typeof navigator !== "undefined" && "share" in navigator && (
            <button onClick={nativeShare} className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium hover:bg-muted">
              <Share2 className="size-4" /> Share via…
            </button>
          )}
          <div className="my-1.5 border-t" />
          {socials.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium hover:bg-muted">
              {s.icon} {s.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
