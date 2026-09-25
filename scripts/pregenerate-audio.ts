// Run: bun scripts/pregenerate-audio.ts  (needs ELEVENLABS_API_KEY)
import { mkdirSync, existsSync, writeFileSync } from "fs";
import { allPhrases, phraseFile } from "../src/lib/audio-phrases";
import { CHARACTERS } from "../src/lib/characters";

const key = process.env.ELEVENLABS_API_KEY!;
mkdirSync("public/audio", { recursive: true });
const phrases = allPhrases();
const files: string[] = [];
let i = 0;
async function worker() {
  while (i < phrases.length) {
    const p = phrases[i++]!;
    const file = phraseFile(p.character, p.expressive, p.text);
    files.push(file);
    const path = `public/audio/${file}`;
    if (existsSync(path)) continue;
    const voice = CHARACTERS.find((c) => c.id === p.character)!.voiceId;
    const body = p.expressive
      ? { text: p.text, model_id: "eleven_v3", voice_settings: { stability: 0.0 } }
      : { text: p.text, model_id: "eleven_multilingual_v2", voice_settings: { stability: 0.45, similarity_boost: 0.75, style: 0.45, use_speaker_boost: true } };
    const res = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voice}?output_format=mp3_44100_64`, {
      method: "POST", headers: { "xi-api-key": key, "Content-Type": "application/json" }, body: JSON.stringify(body),
    });
    if (!res.ok) { console.error(file, res.status, await res.text()); continue; }
    writeFileSync(path, Buffer.from(await res.arrayBuffer()));
    console.log("ok", file);
  }
}
await Promise.all([worker(), worker(), worker()]);
const ok = files.filter((f) => existsSync(`public/audio/${f}`)).sort();
writeFileSync("src/lib/audio-manifest.json", JSON.stringify(ok));
console.log(`${ok.length}/${phrases.length} ready`);
