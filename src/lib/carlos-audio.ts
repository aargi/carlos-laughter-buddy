// Character voices: pre-generated MP3s first, then ElevenLabs (via /api/tts), then browser speech.
import { getCharacter } from "./characters";
import { laughAlongText, phraseFile } from "./audio-phrases";
import manifest from "./audio-manifest.json";

const pregenerated = new Set<string>(manifest as string[]);
let current: HTMLAudioElement | null = null;
let token = 0;
const cache = new Map<string, Promise<string>>();

function fetchAudio(text: string, character: string, expressive: boolean): Promise<string> {
  const file = phraseFile(character, expressive, text);
  if (pregenerated.has(file)) return Promise.resolve(`/audio/${file}`);
  const k = `${character}|${expressive ? 1 : 0}|${text}`;
  let p = cache.get(k);
  if (!p) {
    p = fetch("/api/tts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, character, expressive }),
    }).then(async (res) => {
      if (!res.ok) throw new Error(`TTS ${res.status}`);
      return URL.createObjectURL(await res.blob());
    });
    p.catch(() => cache.delete(k));
    cache.set(k, p);
  }
  return p;
}

/* ---------- Visualisation: analysers per character + microphone ---------- */
let ctx: AudioContext | null = null;
const analysers = new Map<string, AnalyserNode>();
let micAnalyser: AnalyserNode | null = null;
let micStream: MediaStream | null = null;

function audioCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const AC = window.AudioContext ?? (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
  }
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}

function analyserFor(character: string): AnalyserNode | null {
  const c = audioCtx();
  if (!c) return null;
  let a = analysers.get(character);
  if (!a) {
    a = c.createAnalyser();
    a.fftSize = 512;
    a.connect(c.destination);
    analysers.set(character, a);
  }
  return a;
}

export function getAnalyser(character: string): AnalyserNode | null {
  return analysers.get(character) ?? null;
}
export function getMicAnalyser(): AnalyserNode | null {
  return micAnalyser;
}

export async function startMic(): Promise<boolean> {
  if (micAnalyser) return true;
  const c = audioCtx();
  if (!c || !navigator.mediaDevices?.getUserMedia) return false;
  try {
    micStream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true } });
    const src = c.createMediaStreamSource(micStream);
    micAnalyser = c.createAnalyser();
    micAnalyser.fftSize = 512;
    src.connect(micAnalyser); // not connected to speakers
    return true;
  } catch {
    return false;
  }
}

export function stopMic() {
  micStream?.getTracks().forEach((t) => t.stop());
  micStream = null;
  micAnalyser = null;
}

function playUrl(url: string, onStart?: (a: HTMLAudioElement) => void, character?: string): Promise<void> {
  const audio = new Audio(url);
  if (character) {
    const an = analyserFor(character);
    if (an && ctx) {
      try { ctx.createMediaElementSource(audio).connect(an); } catch { /* ignore */ }
    }
  }
  onStart?.(audio);
  return new Promise<void>((resolve) => {
    audio.onended = () => resolve();
    audio.onerror = () => resolve();
    audio.onpause = () => resolve();
    audio.play().catch(() => resolve());
  });
}

function browserSpeak(text: string): Promise<void> {
  return new Promise((resolve) => {
    if (!window.speechSynthesis) return resolve();
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "en-US";
    u.onend = () => resolve();
    u.onerror = () => resolve();
    window.speechSynthesis.speak(u);
  });
}

/** Main narration channel (one at a time). */
export async function speak(text: string, opts: { character?: string; expressive?: boolean } = {}): Promise<void> {
  if (typeof window === "undefined") return;
  stopAll();
  const my = ++token;
  try {
    const url = await fetchAudio(text, opts.character ?? "carlos", !!opts.expressive);
    if (my !== token) return;
    await playUrl(url, (a) => (current = a), opts.character ?? "carlos");
  } catch (e) {
    console.warn("ElevenLabs unavailable, using browser voice", e);
    if (my === token && !opts.expressive) await browserSpeak(text);
  }
}

/** Preload a character's laugh. */
export function preloadLaugh(character: string) {
  if (typeof window === "undefined") return;
  void fetchAudio(getCharacter(character).laugh, character, true).catch(() => {});
}

/** Separate channel for group laughter (can overlap narration). */
const groupAudios = new Set<HTMLAudioElement>();
export async function laugh(character: string, volume = 1): Promise<void> {
  if (typeof window === "undefined") return;
  try {
    const url = await fetchAudio(getCharacter(character).laugh, character, true);
    await playUrl(url, (a) => {
      a.volume = volume;
      groupAudios.add(a);
      a.addEventListener("ended", () => groupAudios.delete(a));
    }, character);
  } catch (e) {
    console.warn("Laugh unavailable", e);
  }
}

/** Group laugh following the exercise pattern (e.g. "ha, ha, ha") on the group channel. */
export async function laughAlong(character: string, syllable: string, volume = 1): Promise<void> {
  if (typeof window === "undefined") return;
  const s = syllable.toLowerCase();
  const text = /^[a-z]{2}$/.test(s)
    ? `[laughing] ${Array(5).fill(s).join(", ")}! [laughing harder] ${Array(6).fill(s).join(", ")}!`
    : getCharacter(character).laugh;
  try {
    const url = await fetchAudio(text, character, true);
    await playUrl(url, (a) => {
      a.volume = volume;
      groupAudios.add(a);
      a.addEventListener("ended", () => groupAudios.delete(a));
    }, character);
  } catch (e) {
    console.warn("Laugh-along unavailable", e);
  }
}

/** Preload the exercise-pattern laugh for a character. */
export function preloadLaughAlong(character: string, syllable: string) {
  if (typeof window === "undefined") return;
  const s = syllable.toLowerCase();
  if (!/^[a-z]{2}$/.test(s)) return;
  void fetchAudio(`[laughing] ${Array(5).fill(s).join(", ")}! [laughing harder] ${Array(6).fill(s).join(", ")}!`, character, true).catch(() => {});
}

export function stopGroup() {
  groupAudios.forEach((a) => a.pause());
  groupAudios.clear();
}

export function stopAll() {
  token++;
  if (typeof window === "undefined") return;
  window.speechSynthesis?.cancel();
  if (current) {
    current.pause();
    current = null;
  }
}
