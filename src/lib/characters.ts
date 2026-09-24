export type Character = {
  id: string;
  name: string;
  origin: string;
  emoji: string;
  archetype: string;
  traits: string[];
  bio: string;
  auraName: string;
  aura: string; // hue (oklch)
  voiceId: string; // custom ElevenLabs voice (Voice Design)
  laughStyle: string;
  laugh: string; // spoken with eleven_v3 audio tags
  greeting: string;
};

export const CHARACTERS: Character[] = [
  {
    id: "carlos", name: "Carlos", origin: "Spain", emoji: "🧡", archetype: "The Warm Guide",
    traits: ["Kind", "Patient", "Encouraging"],
    bio: "A caring therapist who makes you feel safe from the first breath.",
    auraName: "Tangerine glow", aura: "55", voiceId: "NhUleU7hj2VC52xjuz5Z",
    laughStyle: "Warm, rolling chuckle",
    laugh: "[warmly] [laughs] Ha ha ha... [chuckles] ha ha, that's it!",
    greeting: "Hi, I'm Carlos. Breathe, relax, and let's laugh together.",
  },
  {
    id: "amara", name: "Amara", origin: "Nigeria", emoji: "🌻", archetype: "The Joyful Extrovert",
    traits: ["Bubbly", "Loud", "Generous"],
    bio: "Pure sunshine. Her laughter fills the room before she does.",
    auraName: "Sunburst gold", aura: "85", voiceId: "PP3BzBo0GVMUHHEeK9fv",
    laughStyle: "Big belly laugh",
    laugh: "[bursts out laughing] HA HA HA HA! [laughs loudly] Oh my goodness, HA HA HA!",
    greeting: "Hello my darling! I am Amara. Come, let us laugh until our bellies hurt!",
  },
  {
    id: "kenji", name: "Kenji", origin: "Japan", emoji: "🍃", archetype: "The Serene Introvert",
    traits: ["Calm", "Thoughtful", "Quiet"],
    bio: "A zen gardener who finds the joke in silence.",
    auraName: "Moss jade", aura: "150", voiceId: "QAkXuww8sFZOr71rjK6c",
    laughStyle: "Soft, breathy chuckle",
    laugh: "[softly] [chuckles] Heh heh heh... [quiet laugh] hm hm hm.",
    greeting: "Hello. I am Kenji. Slowly… there is no hurry to laugh.",
  },
  {
    id: "rosa", name: "Nonna Rosa", origin: "Italy", emoji: "🌹", archetype: "The Nurturing Caretaker",
    traits: ["Loving", "Bossy", "Expressive"],
    bio: "Everyone's grandmother. Feeds you, scolds you, and cackles at everything.",
    auraName: "Rose velvet", aura: "10", voiceId: "SoedM5dhqiMHDQ10RN6y",
    laughStyle: "Raspy cackle",
    laugh: "[cackles] Eh eh eh eh! [laughs heartily] Mamma mia, ah ha ha ha!",
    greeting: "Ciao, tesoro! I am Nonna Rosa. Laugh now, eat later!",
  },
  {
    id: "tiago", name: "Tiago", origin: "Brazil", emoji: "⚡", archetype: "The Playful Rebel",
    traits: ["Energetic", "Cheeky", "Spontaneous"],
    bio: "Always moving, always joking. Can't sit still for a second.",
    auraName: "Electric lime", aura: "125", voiceId: "c2lq1R6Gp6ykQSbWj6gO",
    laughStyle: "Rapid-fire giggle",
    laugh: "[giggles rapidly] Hehehehehe! [laughs excitedly] Ha ha ha ha, yes!",
    greeting: "E aí! I'm Tiago. Let's go, let's go, laughing time!",
  },
  {
    id: "ingrid", name: "Ingrid", origin: "Sweden", emoji: "❄️", archetype: "The Dry Skeptic",
    traits: ["Deadpan", "Precise", "Secretly funny"],
    bio: "Claims laughter therapy is silly. Laughs the hardest when nobody's looking.",
    auraName: "Glacier blue", aura: "230", voiceId: "u0Cj9rS82nZIv98ytTwu",
    laughStyle: "Reluctant snort",
    laugh: "[deadpan] Hm. [snorts] Pff. [tries to hold back laughter] Ha... ha ha, okay, fine.",
    greeting: "I'm Ingrid. I don't usually do this. But fine. Let's laugh.",
  },
  {
    id: "priya", name: "Priya", origin: "India", emoji: "🔭", archetype: "The Curious Thinker",
    traits: ["Analytical", "Witty", "Curious"],
    bio: "A scientist who finds the universe hilarious — with data to prove it.",
    auraName: "Nebula violet", aura: "300", voiceId: "f1B9K8naKAiHGgUswwAN",
    laughStyle: "Sparkling giggle",
    laugh: "[giggles] Hee hee hee! [laughs brightly] Ha ha, that's fascinating, hee hee!",
    greeting: "Hi, I'm Priya! Fun fact: laughing is contagious. Let's test it.",
  },
  {
    id: "walt", name: "Big Walt", origin: "Texas, USA", emoji: "🤠", archetype: "The Gentle Giant",
    traits: ["Easygoing", "Jovial", "Steady"],
    bio: "A rancher with a heart as big as his laugh. Nothing rattles him.",
    auraName: "Canyon amber", aura: "70", voiceId: "vH3kViCwNFcZeKxfMfXo",
    laughStyle: "Deep booming guffaw",
    laugh: "[deep booming laugh] HO HO HO HAA! [guffaws] Well, ha ha ha, ain't that somethin'!",
    greeting: "Howdy, partner. Name's Walt. Let's have ourselves a good laugh.",
  },
  {
    id: "zoe", name: "Zoe", origin: "Australia", emoji: "🐚", archetype: "The Shy Sensitive",
    traits: ["Gentle", "Nervous", "Sweet"],
    bio: "Shy at first, but once she starts laughing she can't stop.",
    auraName: "Seashell lilac", aura: "330", voiceId: "NoCdf0VosBhQC2f2DhVG",
    laughStyle: "Nervous titter",
    laugh: "[nervous giggle] Hihi... hi hi hi! [laughs shyly] Oh no, hihihi, sorry!",
    greeting: "Um, hi… I'm Zoe. I'm a bit shy, but… let's try together?",
  },
  {
    id: "malik", name: "Malik", origin: "Egypt", emoji: "🎭", archetype: "The Dramatic Performer",
    traits: ["Theatrical", "Grand", "Charismatic"],
    bio: "Every laugh is a standing ovation. Life is his stage.",
    auraName: "Crimson stage", aura: "25", voiceId: "ySCOMDQSmBBsRObdu7Ig",
    laughStyle: "Operatic villain laugh",
    laugh: "[dramatically] Mwa ha ha ha! [laughs theatrically] AH HA HA HAAA! Magnificent!",
    greeting: "Behold! I am Malik. Tonight, we laugh like legends!",
  },
];

export const getCharacter = (id: string) => CHARACTERS.find((c) => c.id === id) ?? CHARACTERS[0]!;
export const auraColor = (c: Character, l = 0.72, ch = 0.16) => `oklch(${l} ${ch} ${c.aura})`;
