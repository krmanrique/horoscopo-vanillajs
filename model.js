// model.js

const HOROSCOPE_DATA = {
  Aries: {
    message: "Hoy es un buen día para tomar la iniciativa. ¡Atrévete!",
    emoji: "🔥",
  },
  Tauro: {
    message: "La paciencia será tu mejor aliada. No te apresures.",
    emoji: "🐂",
  },
  Géminis: {
    message: "Tu curiosidad te llevará lejos. Aprovecha tu energía.",
    emoji: "🌪️",
  },
  Cáncer: {
    message: "Escucha a tu corazón, pero también a tu intuición.",
    emoji: "🦀",
  },
  Leo: {
    message: "Brilla con confianza, hoy todos notarán tu presencia.",
    emoji: "🦁",
  },
  Virgo: {
    message: "Los detalles marcan la diferencia. Sé preciso.",
    emoji: "🌾",
  },
  Libra: {
    message: "Busca el equilibrio, incluso en medio del caos.",
    emoji: "⚖️",
  },
  Escorpio: {
    message: "No temas profundizar, hay verdades esperando salir.",
    emoji: "🦂",
  },
  Sagitario: {
    message: "Es un buen día para aprender algo nuevo o explorar.",
    emoji: "🏹",
  },
  Capricornio: {
    message: "La disciplina te dará grandes resultados hoy.",
    emoji: "🐐",
  },
  Acuario: {
    message: "Sé auténtico. Tu originalidad inspirará a otros.",
    emoji: "💧",
  },
  Piscis: {
    message: "Fluye con tus emociones y conecta con los demás.",
    emoji: "🐟",
  },
};

// 🔁 Función auxiliar para convertir día/mes a día del año (1–365)
function dayOfYear(day, month) {
  const date = new Date(2000, month - 1, day); // Año fijo para coherencia
  const start = new Date(2000, 0, 0);
  const diff = date - start;
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

// 🧠 Determinar signo zodiacal a partir del día y mes
export function getZodiacSign(day, month) {
  const doy = dayOfYear(day, month);

  const ranges = [
    { sign: "Capricornio", from: dayOfYear(22, 12), to: dayOfYear(19, 1) + 365 },
    { sign: "Acuario", from: dayOfYear(20, 1), to: dayOfYear(18, 2) },
    { sign: "Piscis", from: dayOfYear(19, 2), to: dayOfYear(20, 3) },
    { sign: "Aries", from: dayOfYear(21, 3), to: dayOfYear(19, 4) },
    { sign: "Tauro", from: dayOfYear(20, 4), to: dayOfYear(20, 5) },
    { sign: "Géminis", from: dayOfYear(21, 5), to: dayOfYear(20, 6) },
    { sign: "Cáncer", from: dayOfYear(21, 6), to: dayOfYear(22, 7) },
    { sign: "Leo", from: dayOfYear(23, 7), to: dayOfYear(22, 8) },
    { sign: "Virgo", from: dayOfYear(23, 8), to: dayOfYear(22, 9) },
    { sign: "Libra", from: dayOfYear(23, 9), to: dayOfYear(22, 10) },
    { sign: "Escorpio", from: dayOfYear(23, 10), to: dayOfYear(21, 11) },
    { sign: "Sagitario", from: dayOfYear(22, 11), to: dayOfYear(21, 12) },
  ];

  for (const { sign, from, to } of ranges) {
    const adjustedDoy = doy < from ? doy + 365 : doy;
    if (adjustedDoy >= from && adjustedDoy <= to) return sign;
  }

  return "Capricornio"; // Fallback
}

// 🔮 Obtener mensaje y emoji del signo
export function getHoroscope(sign) {
  return HOROSCOPE_DATA[sign] || {
    message: "No se encontró horóscopo para este signo.",
    emoji: "❓",
  };
}
