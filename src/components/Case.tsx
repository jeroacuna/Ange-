import { useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { motion, useInView } from 'framer-motion'
import type { Step } from '../data/content'
import { Line, useReveal } from './Seq'
import { HiddenHeart } from './HiddenHeart'
import { secrets } from '../store/secrets'
import { blip, glitch, toast, vibrate } from '../utils/fx'
import { useScramble } from '../hooks/useScramble'
import { MagneticButton } from './MagneticButton'

type Btn = { label: string; busy: string; wait?: number; unlock?: string; shake?: boolean }
type Props = { tag?: string; title?: string; steps: Step[]; btn?: Btn; after?: Step[]; extra?: ReactNode; heart?: [number, string]; endExtra?: ReactNode; onSwipe?: (d: 'l' | 'r') => void }

export function Case({ tag, title, steps, btn, after = [], extra, endExtra, heart, onSwipe }: Props) {
  const ref = useRef<HTMLElement>(null)
  const seen = useInView(ref, { once: true, amount: 0.35 })
  const n = useReveal(steps, seen)
  const [ph, setPh] = useState(0)
  const m = useReveal(after, ph === 2)
  const shown = useScramble(title ?? '', seen)
  const run = () => {
    if (ph || !btn) return
    setPh(1); vibrate(15); blip(300)
    const stage = document.getElementById('stage')
    if (btn.shake) { stage?.classList.add('shake'); glitch() }
    setTimeout(() => { stage?.classList.remove('shake'); setPh(2); if (btn.unlock) secrets.unlock(btn.unlock) }, btn.wait ?? 1800)
  }
  return (
    <motion.section ref={ref} drag={onSwipe ? 'x' : false} dragSnapToOrigin dragElastic={0.2}
      onDragEnd={(_, i) => { if (Math.abs(i.offset.x) > 90) onSwipe?.(i.offset.x > 0 ? 'r' : 'l') }}
      className="relative min-h-[100svh] px-6 py-24 flex flex-col justify-center gap-3 max-w-md mx-auto">
      {heart && <HiddenHeart id={heart[0]} pos={heart[1]} />}
      {tag && <div className="font-mono text-[11px] tracking-[.3em] text-red-500">{tag}</div>}
      {title && <h2 data-text={title} onDoubleClick={() => { if (secrets.unlock('doble')) toast('Dos veces. Qué ansiosa.') }} className="glitch text-5xl font-black tracking-tight">{shown}</h2>}
      {steps.slice(0, n).map((s, i) => <Line key={i} s={s} />)}
      {extra}
      {n >= steps.length && endExtra}
      {btn && n >= steps.length && ph === 0 && (
        <MagneticButton onClick={run} className="mt-4 self-start px-5 py-3 border border-red-900 rounded-full font-mono text-xs tracking-widest bg-red-950/30">[ {btn.label} ]</MagneticButton>
      )}
      {ph === 1 && <p className="font-mono text-sm text-zinc-400 animate-pulse">{btn?.busy}</p>}
      {after.slice(0, m).map((s, i) => <Line key={'a' + i} s={s} />)}
    </motion.section>
  )
};