import { useState } from 'react'
import { motion } from 'framer-motion'
import { MagneticButton } from '../components/MagneticButton'
import { secrets } from '../store/secrets'
import { glitch, vibrate } from '../utils/fx'
const MSG = ['Sure.', 'Interesting.', 'Evidence contradicts this statement.', 'Tap count is not helping your case.', 'Keep going.', 'Okay Angelena.\nWe have enough evidence.']

export function LloronaButton() {
  const [n, setN] = useState(0)
  const tap = () => { const k = n + 1; setN(k); glitch(); vibrate(k >= MSG.length ? [30, 30, 60] : 12); if (k === MSG.length) secrets.unlock('llorona') }
  const msg = n ? MSG[Math.min(n, MSG.length) - 1] : ''
  return (
    <div className="mt-4 flex flex-col gap-3 items-start">
      <MagneticButton onClick={tap} className="px-5 py-3 border border-red-900 rounded-full font-mono text-xs tracking-widest bg-red-950/30">NO SOY LLORONA</MagneticButton>
      {msg && <motion.p key={n} data-text={msg} initial={{ x: -6, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="glitch font-mono text-sm text-zinc-300 whitespace-pre-line">{msg}</motion.p>}
    </div>
  )
}