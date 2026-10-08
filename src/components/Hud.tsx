import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Volume2, VolumeX } from 'lucide-react'
import { useSecrets } from '../store/secrets'
import { setSound } from '../utils/fx'
import { HEARTS_TOTAL } from '../config'

export function Hud({ onMemory }: { onMemory: () => void }) {
  const { found, level, ids } = useSecrets(); const hn = ids.filter(i => /^h\d+$/.test(i)).length; const [t, setT] = useState(''); const [snd, setSnd] = useState(false)
  useEffect(() => {
    const f = (e: Event) => { setT((e as CustomEvent).detail); setTimeout(() => setT(''), 2200) }
    window.addEventListener('fx:toast', f); return () => window.removeEventListener('fx:toast', f)
  }, [])
  useEffect(() => {
    let taps = 0; let idle: number | undefined
    const say = (m: string) => { setT(m); setTimeout(() => setT(''), 2400) }
    const arm = () => { clearTimeout(idle); idle = window.setTimeout(() => say("She's taking too long."), 40000) }
    const down = () => { taps++; if (taps % 60 === 0) say("You really don't give up, huh?"); arm() }
    window.addEventListener('pointerdown', down); arm()
    return () => { window.removeEventListener('pointerdown', down); clearTimeout(idle) }
  }, [])
  return (
    <>
      <div className="fixed top-0 inset-x-0 z-30 flex justify-between px-4 pt-[max(env(safe-area-inset-top),12px)] pb-6 font-mono text-[10px] text-zinc-400 bg-gradient-to-b from-black to-transparent pointer-events-none">
        <span>SECRETS FOUND {found} / ??</span>{hn > 0 && <span className="opacity-40">♥ {hn} / {HEARTS_TOTAL}</span>}<span>LVL {found} · {level}</span>
      </div>
      {ids.includes('memory') && <button onClick={onMemory} className="fixed bottom-4 left-4 z-30 px-3 py-2 rounded-full bg-white/5 border border-white/10 font-mono text-[10px] text-zinc-400">MEMORY.DAT</button>}
      <button aria-label="sonido" onClick={() => { setSnd(!snd); setSound(!snd) }} className="fixed bottom-4 right-4 z-30 p-3 rounded-full bg-white/5 backdrop-blur border border-white/10">
        {snd ? <Volume2 size={16} /> : <VolumeX size={16} />}
      </button>
      <AnimatePresence>
        {t && <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="fixed bottom-20 inset-x-0 mx-auto w-fit z-30 px-4 py-2 rounded-full bg-black/80 border border-red-900 font-mono text-xs">{t}</motion.div>}
      </AnimatePresence>
    </>
  )
}