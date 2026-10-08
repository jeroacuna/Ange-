import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import type { Step } from '../data/content'
import { Line, useReveal } from '../components/Seq'
import { secrets, useSecrets } from '../store/secrets'
import { glitch, vibrate } from '../utils/fx'

const LINES: Step[] = [{ t: 'ALL HEARTS FOUND.', k: 'err' }, { t: 'You actually found them all.', d: 1800 }, { t: 'Unlocking hidden file...', k: 'dim', d: 1800 }]

export function MemoryUnlock({ onDone }: { onDone: () => void }) {
  const { ids } = useSecrets()
  const active = ids.includes('hearts') && !ids.includes('memory')
  const n = useReveal(LINES, active)
  const [out, setOut] = useState(false)
  useEffect(() => {
    if (!active || n < LINES.length) return
    const a = setTimeout(() => { setOut(true); glitch(); vibrate([30, 20, 30, 20, 80]) }, 1500)
    const b = setTimeout(() => { secrets.unlock('memory'); onDone() }, 2700)
    return () => { clearTimeout(a); clearTimeout(b) }
  }, [active, n, onDone])
  if (!active) return null
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`fixed inset-0 z-50 bg-black flex flex-col justify-center gap-4 px-8 ${out ? 'glout' : ''}`}>
      <div className="max-w-md mx-auto flex flex-col gap-4">{LINES.slice(0, n).map((s, i) => <Line key={i} s={s} />)}</div>
    </motion.div>
  )
}