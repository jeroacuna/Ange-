import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
type P = { id: number; x: number; y: number; dx: number; dy: number; ch: string }
const RM = matchMedia('(prefers-reduced-motion: reduce)').matches

export function HeartLayer() {
  const [ps, setPs] = useState<P[]>([]); const id = useRef(0); const last = useRef(0)
  useEffect(() => {
    const add = (x: number, y: number, n: number, ch: string, dy: number) => {
      const items = Array.from({ length: n }, () => ({ id: id.current++, x, y, dx: (Math.random() - 0.5) * 70, dy, ch }))
      setPs(p => [...p.slice(-90), ...items])
      setTimeout(() => setPs(p => p.filter(q => !items.includes(q))), 3000)
    }
    const onB = (e: Event) => { const d = (e as CustomEvent).detail; add(d.x, d.y, d.n, d.ch, d.dy) }
    const move = (x: number, y: number) => { if (RM) return; const t = performance.now(); if (t - last.current < 90) return; last.current = t; add(x, y, 1, '•', -20) }
    const onT = (e: TouchEvent) => move(e.touches[0].clientX, e.touches[0].clientY)
    const onM = (e: MouseEvent) => move(e.clientX, e.clientY)
    window.addEventListener('fx:burst', onB); window.addEventListener('touchmove', onT, { passive: true }); window.addEventListener('mousemove', onM)
    return () => { window.removeEventListener('fx:burst', onB); window.removeEventListener('touchmove', onT); window.removeEventListener('mousemove', onM) }
  }, [])
  return (
    <div className="fixed inset-0 z-65 pointer-events-none overflow-hidden">
      {ps.map(p => {
        const fall = p.dy > 200; const d = fall ? 2.4 + (p.id % 5) * 0.12 : 0.9
        return (
          <motion.span key={p.id} className={`absolute left-0 top-0 text-pink-400 ${fall ? 'text-2xl' : ''}`}
            initial={{ x: p.x, y: p.y, opacity: 1, scale: 0.7 }}
            animate={{ x: RM ? p.x : p.x + p.dx, y: RM ? p.y : p.y + p.dy, opacity: fall ? [1, 1, 0] : 0, scale: 1.1 }}
            transition={{ duration: d, ease: 'easeOut', opacity: { duration: d, times: fall ? [0, 0.75, 1] : undefined, ease: 'linear' } }}>{p.ch}</motion.span>
        )
      })}
    </div>
  )
}