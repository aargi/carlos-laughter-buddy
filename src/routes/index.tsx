import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { Play, SkipForward, Volume2, VolumeX, X, Headphones } from "lucide-react";
import carlos from "@/assets/carlos.png";
import { EXERCISES } from "@/lib/exercises";
import { laugh, preloadLaugh, speak, stopAll, stopGroup } from "@/lib/carlos-audio";
import { CHARACTERS, auraColor, getCharacter, type Character } from "@/lib/characters";

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
        <Session guide={guide} muted={muted} setMuted={setMuted} onExit={() => { stopAll(); stopGroup(); setScreen("home"); }} onFinish={() => { stopGroup(); setScreen("closing"); }} />
      )}
      {screen === "closing" && <Closing guide={guide} muted={muted} onHome={() => setScreen("home")} />}
    </main>
  );
}

/* ---------------- Avatar with aura ---------------- */
function Avatar({ c, size = 96, active = false }: { c: Character; size?: number; active?: boolean }) {
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <div
        className={`absolute -inset-[18%] rounded-full blur-xl transition-opacity ${active ? "animate-pulse opacity-100" : "opacity-60"}`}
        style={{ background: `radial-gradient(circle, ${auraColor(c, 0.78, 0.2)} 0%, transparent 70%)` }}
      />
      <div
        className="relative flex size-full items-center justify-center overflow-hidden rounded-full border-2 border-card shadow-md"
        style={{ background: `radial-gradient(circle at 35% 30%, ${auraColor(c, 0.93, 0.07)}, ${auraColor(c, 0.75, 0.15)})` }}
      >
        {c.id === "carlos" ? (
          <img src={carlos} alt={c.name} className="size-full object-cover" />
        ) : (
          <span style={{ fontSize: size * 0.45 }} aria-hidden>{c.emoji}</span>
        )}
      </div>
    </div>
  );
}

/* ---------------- Home ---------------- */
function Home({ guide, setGuideId, onStart }: { guide: Character; setGuideId: (id: string) => void; onStart: () => void }) {
  const [playing, setPlaying] = useState<string | null>(null);
  const preview = async (c: Character) => {
    setGuideId(c.id);
    setPlaying(c.id);
    await speak(c.greeting, { character: c.id });
    await speak(c.laugh, { character: c.id, expressive: true });
    setPlaying((p) => (p === c.id ? null : p));
  };
  return (
    <div className="mx-auto max-w-6xl px-6 py-12 md:py-16">
      <div className="grid items-center gap-10 md:grid-cols-[1.2fr_1fr]">
        <div>
          <p className="mb-4 inline-block rounded-full bg-secondary px-4 py-1 text-sm font-semibold text-secondary-foreground">
            Guided session · ~8 minutes · 10 characters
          </p>
          <h1 className="text-5xl font-black leading-[0.95] md:text-7xl">
            Laugh with <span style={{ color: auraColor(guide, 0.6, 0.18) }}>{guide.name}</span><br />and the circle.
          </h1>
          <p className="mt-6 max-w-lg text-lg text-muted-foreground">
            Pick your guide. They explain each exercise, and when it's your turn, the rest of the circle laughs along with you — each in their own way.
          </p>
          <button
            onClick={() => { stopAll(); onStart(); }}
            className="mt-8 inline-flex items-center gap-3 rounded-full bg-primary px-8 py-4 text-lg font-bold text-primary-foreground shadow-lg shadow-primary/30 transition hover:scale-[1.03] hover:bg-primary/90"
          >
            <Play className="size-5 fill-current" /> Start session with {guide.name}
          </button>
          <p className="mt-3 text-sm text-muted-foreground">Turn up the volume — everyone has their own voice.</p>
        </div>
        <div className="flex flex-col items-center text-center">
          <Avatar c={guide} size={220} active={playing === guide.id} />
          <p className="mt-6 text-sm font-semibold uppercase tracking-widest text-muted-foreground">{guide.archetype}</p>
          <p className="mt-1 max-w-xs text-muted-foreground">{guide.bio}</p>
          <p className="mt-2 text-sm"><strong>Aura:</strong> {guide.auraName} · <strong>Laugh:</strong> {guide.laughStyle}</p>
        </div>
      </div>

      <h2 className="mb-4 mt-14 text-2xl font-bold">Choose your guide</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {CHARACTERS.map((c) => {
          const sel = c.id === guide.id;
          return (
            <div
              key={c.id}
              role="button"
              tabIndex={0}
              onClick={() => setGuideId(c.id)}
              onKeyDown={(e) => e.key === "Enter" && setGuideId(c.id)}
              className={`flex cursor-pointer flex-col items-center rounded-3xl border-2 bg-card p-4 text-center transition hover:-translate-y-0.5 ${sel ? "shadow-lg" : "border-transparent"}`}
              style={sel ? { borderColor: auraColor(c, 0.7, 0.17) } : undefined}
            >
              <Avatar c={c} size={72} active={playing === c.id} />
              <div className="mt-3 font-bold leading-tight">{c.name}</div>
              <div className="text-xs text-muted-foreground">{c.origin}</div>
              <div className="mt-1 text-xs font-semibold" style={{ color: auraColor(c, 0.5, 0.15) }}>{c.archetype}</div>
              <div className="mt-2 flex flex-wrap justify-center gap-1">
                {c.traits.map((t) => (
                  <span key={t} className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium">{t}</span>
                ))}
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); void preview(c); }}
                className="mt-3 inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold hover:bg-muted"
              >
                <Headphones className="size-3.5" /> {playing === c.id ? "Playing…" : "Hear voice & laugh"}
              </button>
            </div>
          );
        })}
      </div>

      <h2 className="mb-4 mt-14 text-2xl font-bold">Your journey</h2>
      <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {EXERCISES.map((e, i) => (
          <div key={e.id} className="rounded-2xl border bg-card p-4">
            <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{i + 1} · {e.intensityLabel}</div>
            <div className="mt-1 font-semibold leading-tight">{e.name}</div>
            <IntensityBar level={e.intensity} />
          </div>
        ))}
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
  useEffect(() => { setTurnDone(false); }, [index, runId, phase]);

  useEffect(() => { CHARACTERS.forEach((c) => preloadLaugh(c.id)); }, []);

  // The circle laughs in parallel with you while your timer runs: overlapping laughs, denser with intensity.
  useEffect(() => {
    if (phase !== "user_turn" || turnDone) return;
    let alive = true;
    let t: ReturnType<typeof setTimeout>;
    const members = CHARACTERS.filter((c) => c.id !== guide.id);
    const gap = 3200 - ex.intensity * 400;
    const fire = (id: string) => {
      setLaughingSet((s) => new Set(s).add(id));
      void laugh(id, 0.45 + ex.intensity * 0.08).then(() => {
        if (alive) setLaughingSet((s) => { const n = new Set(s); n.delete(id); return n; });
      });
    };
    const loop = () => {
      if (!alive) return;
      if (!mutedRef.current) {
        const count = 1 + Math.floor(Math.random() * Math.min(3, 1 + Math.ceil(ex.intensity / 2)));
        [...members].sort(() => Math.random() - 0.5).slice(0, count).forEach((m, i) => {
          setTimeout(() => alive && fire(m.id), i * 350);
        });
      }
      t = setTimeout(loop, gap * (0.6 + Math.random() * 0.8));
    };
    t = setTimeout(loop, 1200);
    return () => { alive = false; clearTimeout(t); stopGroup(); setLaughingSet(new Set()); };
  }, [phase, index, ex.intensity, guide.id, turnDone]);

  const startUserTurn = useCallback(() => {
    stopAll();
    setPhase("user_turn");
    if (!mutedRef.current) void speak("Your turn!", { character: guide.id });
  }, [guide.id]);

  // Main state machine per exercise: Carlos explains with words, then it's your turn.
  useEffect(() => {
    const token = { cancelled: false };
    stopAll();
    setPhase("explaining");
    (async () => {
      const intro = index === 0 ? "Let's begin. " : "";
      if (!mutedRef.current) await speak(`${intro}${ex.name.replace(/[“”«»]/g, "")}. ${ex.explanation}`, { character: guide.id });
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
            <UserTurn key={`${index}-${runId}`} seconds={ex.userSeconds} syllable={ex.syllable} />
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
        <p className="mb-3 text-center text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          The laughter circle {phase === "user_turn" ? "· laughing with you" : ""}
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          {group.map((c) => (
            <div key={c.id} className={`flex flex-col items-center transition-transform ${laughing === c.id ? "scale-125" : ""}`}>
              <Avatar c={c} size={48} active={laughing === c.id} />
              <span className="mt-1 text-[11px] font-medium">{c.name}</span>
            </div>
          ))}
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
      <Avatar c={guide} size={260} active />
      <div className="mt-6 rounded-full bg-card px-4 py-1.5 text-sm font-semibold shadow">
        {guide.name} is explaining…
      </div>
    </div>
  );
}

function UserTurn({ seconds, syllable }: { seconds: number; syllable: string }) {
  const [left, setLeft] = useState(seconds);
  useEffect(() => {
    const start = Date.now();
    const iv = setInterval(() => {
      const l = Math.max(0, seconds - (Date.now() - start) / 1000);
      setLeft(l);
      if (l <= 0) clearInterval(iv);
    }, 100);
    return () => clearInterval(iv);
  }, [seconds]);
  const r = 120;
  const c = 2 * Math.PI * r;
  const frac = left / seconds;
  const hue = 45 - (1 - frac) * 35; // orange -> red-pink as time goes
  const done = left <= 0;
  return (
    <div className="flex flex-col items-center">
      <p className="mb-4 font-display text-4xl font-black text-accent">{done ? "Well done!" : "Your turn!"}</p>
      <div className="relative size-64">
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
          <span className="font-display text-6xl font-black tabular-nums">{Math.ceil(left)}</span>
          <span className="text-sm text-muted-foreground">seconds</span>
          <span className="mt-2 font-display text-2xl font-bold text-primary">{syllable.length <= 2 ? `${syllable} ${syllable} ${syllable}` : syllable}</span>
        </div>
      </div>
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
        <button onClick={onHome} className="mt-8 rounded-full bg-primary px-8 py-3 font-bold text-primary-foreground hover:bg-primary/90">
          Back to start
        </button>
      </div>
    </div>
  );
}
