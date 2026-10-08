import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { blip, burst, vibrate } from '../utils/fx'
const LINES = ['Loading personality...', 'Loading chaos...', 'Loading questionable decisions...', 'Loading memories...', 'Loading emotional damage...', 'Loading Angelena...', 'System ready.']

export function Intro({ onEnter }: { onEnter: () => void }) {
  const [i, setI] = useState(0)
  useEffect(() => { if (i >= LINES.length - 1) return; const t = setTimeout(() => setI(i + 1), 650); return () => clearTimeout(t) }, [i])
  const ready = i >= LINES.length - 1
  return (
    <motion.div exit={{ opacity: 0, scale: 1.5, filter: 'blur(24px)' }} transition={{ duration: 0.9 }} className="fixed inset-0 z-40 bg-black flex flex-col items-center justify-center gap-6 px-8">
      <h1 className="font-mono tracking-[.4em] text-lg">ANGELENA.EXE</h1>
      <p className="text-xs text-zinc-500 font-mono">Initializing...</p>
      <div className="w-56 h-px bg-zinc-800"><motion.div className="h-px bg-red-600 shadow-[0_0_12px_#dc2626]" animate={{ width: `${((i + 1) / LINES.length) * 100}%` }} /></div>
      <p className="h-4 text-xs font-mono text-zinc-400">{LINES[i]}</p>
      {ready && (
        <motion.button initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} whileTap={{ scale: 0.94 }}
          onClick={e => { vibrate([30, 20, 60]); burst(e.clientX, e.clientY, 16); blip(660, 0.15); onEnter() }}
          className="mt-4 px-6 py-3 border border-red-900 rounded-full font-mono text-sm tracking-widest shadow-[0_0_30px_rgba(127,0,20,.5)]">[ TAP TO ENTER ]</motion.button>
      )}
    </motion.div>
  )
};