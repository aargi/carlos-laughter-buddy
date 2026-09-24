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
    userSeconds: 45,
  },
];
