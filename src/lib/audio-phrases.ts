// Fixed phrases pre-generated as static MP3s (public/audio) to save ElevenLabs credits.
import { CHARACTERS } from "./characters";
import { EXERCISES } from "./exercises";

export function laughAlongText(syllable: string): string | null {
  const s = syllable.toLowerCase();
  if (!/^[a-z]{2}$/.test(s)) return null;
  return `[laughing] ${Array(5).fill(s).join(", ")}! [laughing harder] ${Array(6).fill(s).join(", ")}!`;
}

export const exerciseText = (i: number) => {
  const ex = EXERCISES[i]!;
  return `${i === 0 ? "Let's begin. " : ""}${ex.name.replace(/[“”«»]/g, "")}. ${ex.explanation}`;
};

export const FIXED_LINES = [
  "Your turn!",
  "Well done. Now let's return to calm. Breathe in deeply through your nose… and out softly through your mouth. Follow the circle.",
  "Thanks for laughing with me. See you next time!",
];

/** Stable file name for a (character, expressive, text) triple. */
export function phraseFile(character: string, expressive: boolean, text: string): string {
  const k = `${character}|${expressive ? 1 : 0}|${text}`;
  let h = 0x811c9dc5;
  for (let i = 0; i < k.length; i++) {
    h ^= k.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return `${character}-${(h >>> 0).toString(36)}.mp3`;
}

export function allPhrases(): { character: string; expressive: boolean; text: string }[] {
  const out: { character: string; expressive: boolean; text: string }[] = [];
  for (const c of CHARACTERS) {
    out.push({ character: c.id, expressive: false, text: c.greeting });
    out.push({ character: c.id, expressive: true, text: c.laugh });
    for (const ex of EXERCISES) {
      const t = laughAlongText(ex.syllable);
      if (t) out.push({ character: c.id, expressive: true, text: t });
    }
    EXERCISES.forEach((_, i) => out.push({ character: c.id, expressive: false, text: exerciseText(i) }));
    FIXED_LINES.forEach((t) => out.push({ character: c.id, expressive: false, text: t }));
  }
  return out;
}
