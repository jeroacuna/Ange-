import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import type { Step } from '../data/content'
import { Bar } from './Bar'
import { secrets } from '../store/secrets'

export function useReveal(steps: Step[], go: boolean) {
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!go || n >= steps.length) return
    const s = steps[n]
    const d = typeof s === 'object' && s.d != null ? s.d : 650
    const t = setTimeout(() => setN(n + 1), n === 0 ? 0 : d)
    return () => clearTimeout(t)
  }, [go, n, steps])
  return n
}

const CLS: Record<string, string> = {
  quote: 'font-mono text-sm text-zinc-300', big: 'text-4xl font-black tracking-tight leading-none pt-2',
  err: 'font-mono text-xl text-red-500', dim: 'font-mono text-xs text-zinc-500',
  label: 'font-mono text-[11px] tracking-[.3em] text-red-400 uppercase pt-4', emoji: 'text-3xl',
}

export function Line({ s }: { s: Step }) {
  const o = typeof s === 'string' ? { t: s } : s
  const a = { initial: { opacity: 0, y: 10, filter: 'blur(6px)' }, animate: { opacity: 1, y: 0, filter: 'blur(0px)' }, transition: { duration: 0.5 } }
  if (o.k === 'gap') return <div className="h-40" />
  if (o.k === 'vanish')
    return <motion.div initial={{ opacity: 1, letterSpacing: '0em' }} animate={{ opacity: 0, filter: 'blur(12px)', letterSpacing: '.4em' }} transition={{ duration: 4, delay: 0.8 }} className="text-5xl font-black">{o.t}</motion.div>
  if (o.k === 'bar') return <motion.div {...a}><Bar label={o.t ?? ''} v={o.v === undefined ? 100 : o.v} txt={o.x} /></motion.div>
  return <motion.div {...a} className={CLS[o.k ?? 'quote']}>{o.k === 'emoji' ? Array.from(o.t ?? '').map((ch, i) => /\p{Extended_Pictographic}/u.test(ch) ? <span key={i} onClick={() => secrets.emoji(ch)}>{ch}</span> : ch) : o.t}</motion.div>
}

export function Seq({ steps, go = true }: { steps: Step[]; go?: boolean }) {
  const n = useReveal(steps, go)
  return <>{steps.slice(0, n).map((s, i) => <Line key={i} s={s} />)}</>
};