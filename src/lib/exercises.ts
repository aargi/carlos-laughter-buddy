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
  demoText: string;
  pitch: number; // Hz base for laugh synth
  rate: number; // pulses per second
  demoSeconds: number;
  userSeconds: number;
};

export const EXERCISES: Exercise[] = [
  {
    id: "ja",
    block: "Nivel 1 · Suave",
    name: "El «Ja, ja, ja» tranquilo",
    syllable: "JA",
    intensity: 1,
    intensityLabel: "Suave",
    posture: "De pie o sentado, manos sobre el abdomen.",
    focus: "Conexión con el abdomen y respiración profunda.",
    explanation:
      "Empezamos suave. Pon las manos sobre la barriga, respira hondo, y suelta un ja lento, espaciado, sin esfuerzo. Siente cómo se mueve el abdomen.",
    demoText: "Ja... ja... ja... ja... ja, ja... ja.",
    pitch: 170,
    rate: 1.6,
    demoSeconds: 11,
    userSeconds: 30,
  },
  {
    id: "je",
    block: "Nivel 1 · Suave",
    name: "El «Je, je, je» rítmico",
    syllable: "JE",
    intensity: 2,
    intensityLabel: "Suave+",
    posture: "Una mano en el pecho, hombros relajados.",
    focus: "Resonancia en el pecho, más cadencia y volumen.",
    explanation:
      "Ahora subimos un poquito. Mano en el pecho, y un je rítmico, como un tambor. Algo más rápido y con algo más de voz. Nota la vibración.",
    demoText: "Je, je, je. Je, je, je. Je je je je, je je je.",
    pitch: 210,
    rate: 2.6,
    demoSeconds: 12,
    userSeconds: 30,
  },
  {
    id: "ji",
    block: "Nivel 1 · Suave",
    name: "El «Ji, ji, ji» pícaro",
    syllable: "JI",
    intensity: 2,
    intensityLabel: "Suave++",
    posture: "Sonrisa amplia, cejas arriba, cara suelta.",
    focus: "Liberar tensión facial, juego vocal ágil.",
    explanation:
      "Último calentamiento. Sonrisa de oreja a oreja, cara de travieso, y un ji agudo, chispeante, rápido. Como si te acabaran de contar un secreto.",
    demoText: "Ji ji ji ji! Ji ji ji! Ji ji ji ji ji ji!",
    pitch: 290,
    rate: 3.6,
    demoSeconds: 12,
    userSeconds: 30,
  },
  {
    id: "telefono",
    block: "Nivel 2 · Dinámico",
    name: "El teléfono risueño",
    syllable: "📞",
    intensity: 3,
    intensityLabel: "Media",
    posture: "Mano en la oreja como si sostuvieras un teléfono.",
    focus: "Carcajadas crecientes en una llamada imaginaria.",
    explanation:
      "Te suena el teléfono. Descuelgas, y quien llama te cuenta lo más gracioso del mundo. Empiezas con risitas y cada vez te ríes más. Camina si quieres.",
    demoText: "¿Sí? ¿Diga? Ja... ¿en serio? Ja ja ja! No, no puede ser, ja ja ja ja ja!",
    pitch: 190,
    rate: 3.2,
    demoSeconds: 14,
    userSeconds: 40,
  },
  {
    id: "leon",
    block: "Nivel 2 · Dinámico",
    name: "La risa del león",
    syllable: "🦁",
    intensity: 4,
    intensityLabel: "Media-alta",
    posture: "Boca muy abierta, lengua fuera, manos como garras.",
    focus: "Apertura facial completa y risa gutural profunda.",
    explanation:
      "Hora de soltar al león. Abre mucho la boca, saca la lengua, pon las manos como garras, y ríete desde el fondo de la garganta. Sin vergüenza.",
    demoText: "Jaaaa ja ja ja ja! Jaaa ja ja ja ja ja ja!",
    pitch: 120,
    rate: 4,
    demoSeconds: 12,
    userSeconds: 40,
  },
  {
    id: "libre",
    block: "Clímax",
    name: "Carcajada libre y expansiva",
    syllable: "✦",
    intensity: 5,
    intensityLabel: "Alta",
    posture: "Brazos abiertos, muévete como te pida el cuerpo.",
    focus: "Risa abierta a máxima energía, cuerpo libre.",
    explanation:
      "El gran final. Abre los brazos, muévete, y ríete con todo. Sin reglas: fuerte, loca, contagiosa. Deja que la risa falsa se vuelva de verdad.",
    demoText: "Ja ja ja ja ja! Jo jo jo! Ji ji ji! Ja ja ja ja ja ja ja ja!",
    pitch: 200,
    rate: 5,
    demoSeconds: 15,
    userSeconds: 45,
  },
];
