// Carlos' voice: ElevenLabs (via /api/tts), falling back to browser speech.
let current: HTMLAudioElement | null = null;
let currentUrl: string | null = null;
let token = 0;
const cache = new Map<string, string>();

function pickVoice(): SpeechSynthesisVoice | undefined {
  const voices = window.speechSynthesis?.getVoices() ?? [];
  const en = voices.filter((v) => v.lang.toLowerCase().startsWith("en"));
  return en.find((v) => v.lang === "en-US") ?? en[0];
}

function browserSpeak(text: string): Promise<void> {
  return new Promise((resolve) => {
    if (!window.speechSynthesis) return resolve();
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "en-US";
    const v = pickVoice();
    if (v) u.voice = v;
    u.onend = () => resolve();
    u.onerror = () => resolve();
    window.speechSynthesis.speak(u);
  });
}

export async function speak(text: string, _opts: { rate?: number; pitch?: number } = {}): Promise<void> {
  if (typeof window === "undefined") return;
  stopAll();
  const my = ++token;
  try {
    let url = cache.get(text);
    if (!url) {
      const res = await fetch("/api/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      if (!res.ok) throw new Error(`TTS ${res.status}`);
      url = URL.createObjectURL(await res.blob());
      cache.set(text, url);
    }
    if (my !== token) return;
    currentUrl = url;
    const audio = new Audio(url);
    current = audio;
    await new Promise<void>((resolve) => {
      audio.onended = () => resolve();
      audio.onerror = () => resolve();
      audio.onpause = () => resolve();
      audio.play().catch(() => resolve());
    });
  } catch (e) {
    console.warn("ElevenLabs unavailable, using browser voice", e);
    if (my === token) await browserSpeak(text);
  }
}

export function stopAll() {
  token++;
  if (typeof window === "undefined") return;
  window.speechSynthesis?.cancel();
  if (current) {
    current.pause();
    current = null;
  }
  void currentUrl;
}
