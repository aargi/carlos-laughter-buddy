// Carlos' voice (browser speech synthesis in Spanish).
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

export function stopAll() {
  if (typeof window !== "undefined") window.speechSynthesis?.cancel();
}
