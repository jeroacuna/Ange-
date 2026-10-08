export type Step = string | { t?: string; k?: 'big' | 'err' | 'dim' | 'label' | 'emoji' | 'bar' | 'vanish' | 'gap'; v?: number | null; x?: string; d?: number }
const L = (t: string): Step => ({ t, k: 'label' })

export const IDENT: Step[] = [
  { t: 'ANGELENA', k: 'big' }, { t: 'Identity analysis complete.', k: 'dim' },
  'Rubia', 'Ojos celestes', 'Enana', 'Locura: 100%', 'Probabilidad de tomar decisiones cuestionables: 100%', 'Capacidad de hacer reír: peligrosamente alta',
  { ...L('Result:'), d: 1200 }, { t: '100% ANGELENA', k: 'big', d: 900 },
]
export const STATS: Step[] = [
  L('ANGELENA — STATS'),
  { t: 'Altura', k: 'bar', v: 40, x: 'enana' }, { t: 'Rubiedad', k: 'bar' }, { t: 'Ojos celestes', k: 'bar' }, { t: 'Locura', k: 'bar' },
  { t: 'Capacidad de hacer buenas decisiones estando en pedo', k: 'bar', v: null },
  { t: 'Probabilidad de tentarse cuando está con Jerónimo', k: 'bar', v: 99.9, x: '99.9%' },
  { t: 'Probabilidad de que Jerónimo se ría de ella', k: 'bar' },
]
export const PLANTA: Step[] = [
  'Una noche aparentemente normal.', 'Hasta que alguien decidió poner nerviosa a Angelena.',
  L('CAUSA DEL INCIDENTE'), 'Jerónimo le agarró la mano.',
  L('EFECTO DETECTADO'), 'Angelena.exe dejó de funcionar.',
  L('DAÑOS COLATERALES'), 'Una planta.',
  L('RESULTADO DE LA NOCHE'), { t: '❌ RECHAZADO', k: 'err' },
]
export const JODA: Step[] = [
  'Una semana después de conocernos.', 'Angelena sale a una joda de la ciudad.', 'Jerónimo le escribe para reírse de que fue a esa mierda.',
  { ...L('Historical significance:'), d: 1100 }, { t: 'Unexpectedly high.', k: 'big' },
  { ...L('Communication frequency detected:'), d: 1100 }, 'Increasing...', 'Increasing...', 'Increasing...',
  { t: 'ERROR', k: 'err', d: 1000 }, { t: "They still haven't stopped talking.", k: 'dim' },
]
export const BAUTISTA: Step[] = [
  { t: 'HOSTILITY LEVEL', k: 'bar' }, { t: 'Threat Level: EXTREMELY PERSONAL', k: 'err' },
  { t: 'Relationship with Jerónimo:', k: 'dim' }, { t: 'complicated', k: 'big' },
]
export const BAUTISTA_AFTER: Step[] = [L('Conclusion:'), { t: 'nose definitivamente te ama creo?', k: 'big', d: 900 }]
export const BENICIO: Step[] = [
  { t: 'Alcohol level', k: 'bar', v: 97, x: '97%' }, { t: 'Motor skills', k: 'bar', v: 21, x: '21%' },
  { t: 'Decision making', k: 'bar', v: null }, { t: 'Locura', k: 'bar' },
  { t: 'And then...', k: 'dim', d: 1400 }, { t: 'BENICIO', k: 'big', d: 1600 },
  { t: 'Angelena → 🍺 → Benicio → 💋', k: 'emoji', d: 900 },
]
export const BENICIO_AFTER: Step[] = [
  { t: 'Emotional damage detected.', k: 'err' }, { t: '😭', k: 'emoji' }, { t: '😭😭', k: 'emoji' }, { t: '😭😭😭😭', k: 'emoji' },
  { t: 'Angelena.exe has stopped responding.', k: 'err', d: 900 },
]
export const AUTO: Step[] = [
  { t: '23:47', k: 'big' }, { t: 'Location: Vehicle', k: 'dim' }, { t: 'Status: Emotionally unstable', k: 'dim' },
  { t: 'Subject stopped laughing.', d: 1500 }, { t: 'Subject became sad.', d: 1800 }, { t: 'Subject refused to let go.', d: 1800 },
  { ...L('Reason:'), d: 1800 }, { t: 'JERONIMO', k: 'vanish', d: 900 },
  { t: 'System unable to determine appropriate response.', k: 'dim', d: 5200 }, { k: 'gap', d: 3000 },
]
export const BEHAVIOR: Step[] = [
  L('KNOWN BEHAVIOR'), 'They laugh a lot.', 'Jerónimo makes fun of Angelena.', 'Angelena laughs anyway.', 'Repeat process.',
  { t: 'Pattern detected.', k: 'dim', d: 1200 }, { t: 'They are both idiots.', k: 'big', d: 900 },
]
export const MAMA: Step[] = [
  L('NEW NPC UNLOCKED'), { t: 'MAMÁ', k: 'big' }, 'Status: unlocked', 'Interaction level: surprisingly high',
  'Jerónimo successfully interacted with the mother.', 'Both parties participated in the nonsense.',
]
export const VOID: Step[] = [
  { t: "You weren't supposed to find this.", k: 'err' }, { t: 'But okay.', d: 1800 },
  { t: 'Mantener apretada una pantalla vacía. Gente que toca todo lo que no tiene que tocar.', d: 2000 },
  { t: 'Me lo esperaba de vos.', k: 'big', d: 1800 },
]
export const NO_TOCAR = [
  'Te dije que no tocaras.', 'Ah, sos pelotuda.', 'Bueno. Ya está.', '¿QUÉ PARTE DE NO TOCAR NO ENTENDISTE?',
  'En serio. Pará.', '...', 'Ok. Ganaste. Tomá, una lluvia de corazones. De nada.',
]
export const FINAL: Step[] = [
  { t: 'SYSTEM COMPLETE.', k: 'err' }, { t: 'You found everything.', d: 1800 }, { t: 'There was no prize.', d: 1800 },
  { t: 'I just made an unnecessarily complicated website for you.', d: 1800 },
  { t: 'Bueno Angelena, era para vos ❤️', k: 'big', d: 2200 },
  { t: 'Gracias por romper todas las plantas, tomar decisiones cuestionables y hacerme reír tanto.', d: 1800 },
]
