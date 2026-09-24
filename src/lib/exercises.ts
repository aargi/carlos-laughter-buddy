export type Exercise = {
  id: string;
  block: string;
  name: string;
  syllable: string;
  intensity: number; // 1-5
  intensityLabel: string;
  posture: string;
  focus: string;
  explanation: string;
  userSeconds: number;
};

export const EXERCISES: Exercise[] = [
  {
    id: "ha",
    block: "Level 1 · Gentle",
    name: "The gentle “Ha, ha, ha”",
    syllable: "HA",
    intensity: 1,
    intensityLabel: "Gentle",
    posture: "Standing or sitting, hands on your belly.",
    focus: "Connection with the belly and deep breathing.",
    explanation:
      "We start gently. Put your hands on your belly, take a deep breath, and let out a slow, spaced, effortless ha. Feel your belly move.",
    userSeconds: 30,
  },
  {
    id: "he",
    block: "Level 1 · Gentle",
    name: "The rhythmic “He, he, he”",
    syllable: "HE",
    intensity: 2,
    intensityLabel: "Gentle+",
    posture: "One hand on your chest, shoulders relaxed.",
    focus: "Chest resonance, more cadence and volume.",
    explanation:
      "Now we turn it up a notch. Hand on your chest, and a rhythmic he, like a drum. A little faster and with a little more voice. Notice the vibration.",
    userSeconds: 30,
  },
  {
    id: "hi",
    block: "Level 1 · Gentle",
    name: "The mischievous “Hi, hi, hi”",
    syllable: "HI",
    intensity: 2,
    intensityLabel: "Gentle++",
    posture: "Big smile, eyebrows up, loose face.",
    focus: "Releasing facial tension, nimble vocal play.",
    explanation:
      "Last warm-up. Ear-to-ear smile, mischievous face, and a high, sparkly, quick hi. As if someone just told you a secret.",
    userSeconds: 30,
  },
  {
    id: "phone",
    block: "Level 2 · Dynamic",
    name: "The giggly phone call",
    syllable: "📞",
    intensity: 3,
    intensityLabel: "Medium",
    posture: "Hand to your ear as if holding a phone.",
    focus: "Growing laughter during an imaginary call.",
    explanation:
      "Your phone rings. You pick up, and the caller tells you the funniest thing in the world. You start with giggles and laugh more and more. Walk around if you like.",
    userSeconds: 40,
  },
  {
    id: "lion",
    block: "Level 2 · Dynamic",
    name: "The lion's laugh",
    syllable: "🦁",
    intensity: 4,
    intensityLabel: "Medium-high",
    posture: "Mouth wide open, tongue out, hands like claws.",
    focus: "Full facial opening and deep guttural laughter.",
    explanation:
      "Time to release the lion. Open your mouth wide, stick out your tongue, make your hands into claws, and laugh from the back of your throat. No shame.",
    userSeconds: 40,
  },
  {
    id: "free",
    block: "Grand finale",
    name: "Free, expansive laughter",
    syllable: "✦",
    intensity: 5,
    intensityLabel: "High",
    posture: "Arms open, move however your body asks.",
    focus: "Open laughter at maximum energy, free body.",
    explanation:
      "The grand finale. Open your arms, move, and laugh with everything you've got. No rules: loud, wild, contagious. Let the fake laughter turn real.",
    userSeconds: 45,
  },
];
