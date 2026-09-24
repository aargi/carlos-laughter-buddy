// Carlos' voice (browser speech) + synthesized laugh pulses.
let ctx: AudioContext | null = null;
let activeNodes: AudioNode[] = [];
let pulseTimers: ReturnType<typeof setTimeout>[] = [];

function getCtx() {
  if (!ctx) ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}

function pickVoice(): SpeechSynthesisVoice | undefined {
  const voices = window.speechSynthesis?.getVoices() ?? [];
  const es = voices.filter((v) => v.lang.toLowerCase().startsWith("es"));
  return (
    es.find((v) => /jorge|pablo|diego|carlos|male|hombre|alvaro|enrique/i.test(v.name)) ??
    es.find((v) => v.lang === "es-ES") ??
    es[0]
  );
}

export function speak(text: string, opts: { rate?: number; pitch?: number } = {}): Promise<void> {
  return new Promise((resolve) => {
    if (typeof window === "undefined" || !window.speechSynthesis) return resolve();
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "es-ES";
    const v = pickVoice();
    if (v) u.voice = v;
    u.rate = opts.rate ?? 1;
    u.pitch = opts.pitch ?? 0.9;
    u.onend = () => resolve();
    u.onerror = () => resolve();
    window.speechSynthesis.speak(u);
  });
}

/** Plays laugh-like vocal pulses. onPulse fires on each "ha" for reactive animation. */
export function playLaugh(opts: {
  pitch: number;
  rate: number;
  seconds: number;
  crescendo?: boolean;
  onPulse?: (strength: number) => void;
}) {
  const c = getCtx();
  const master = c.createGain();
  master.gain.value = 0.22;
  master.connect(c.destination);
  activeNodes.push(master);

  const start = c.currentTime + 0.05;
  const period = 1 / opts.rate;
  const count = Math.floor(opts.seconds * opts.rate);
  for (let i = 0; i < count; i++) {
    // phrase grouping: small breaths every ~6 pulses
    if (i % 7 === 6) continue;
    const t = start + i * period + (Math.random() - 0.5) * period * 0.15;
    const progress = i / count;
    const strength = opts.crescendo ? 0.4 + progress * 0.6 : 0.7 + Math.random() * 0.3;
    const dur = Math.min(period * 0.7, 0.28);

    const osc = c.createOscillator();
    osc.type = "sawtooth";
    const f = opts.pitch * (1 + (Math.random() - 0.5) * 0.12) * (1 + progress * 0.15);
    osc.frequency.setValueAtTime(f * 1.15, t);
    osc.frequency.exponentialRampToValueAtTime(f * 0.85, t + dur);

    const formant = c.createBiquadFilter();
    formant.type = "bandpass";
    formant.frequency.value = opts.pitch * 4.5;
    formant.Q.value = 1.4;

    // breathy "h" noise
    const noiseBuf = c.createBuffer(1, c.sampleRate * dur, c.sampleRate);
    const d = noiseBuf.getChannelData(0);
    for (let j = 0; j < d.length; j++) d[j] = (Math.random() * 2 - 1) * (1 - j / d.length);
    const noise = c.createBufferSource();
    noise.buffer = noiseBuf;
    const nGain = c.createGain();
    nGain.gain.value = 0.25 * strength;

    const g = c.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(strength, t + 0.03);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);

    osc.connect(formant).connect(g);
    noise.connect(nGain).connect(g);
    g.connect(master);
    osc.start(t);
    osc.stop(t + dur + 0.02);
    noise.start(t);
    activeNodes.push(osc, noise);

    const delayMs = (t - c.currentTime) * 1000;
    pulseTimers.push(setTimeout(() => opts.onPulse?.(strength), delayMs));
  }
}

export function stopAll() {
  if (typeof window !== "undefined") window.speechSynthesis?.cancel();
  pulseTimers.forEach(clearTimeout);
  pulseTimers = [];
  activeNodes.forEach((n) => {
    try {
      if ("stop" in n) (n as AudioScheduledSourceNode).stop();
      n.disconnect();
    } catch {
      /* ignore */
    }
  });
  activeNodes = [];
}
