import { motion, useMotionValue, useSpring } from 'framer-motion'
import type { MouseEvent, ReactNode } from 'react'
export function MagneticButton({ onClick, className, children }: { onClick: (e: MouseEvent) => void; className?: string; children: ReactNode }) {
  const x = useMotionValue(0), y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 200, damping: 15 }), sy = useSpring(y, { stiffness: 200, damping: 15 })
  const move = (e: MouseEvent<HTMLButtonElement>) => { const r = e.currentTarget.getBoundingClientRect(); x.set((e.clientX - r.left - r.width / 2) * 0.3); y.set((e.clientY - r.top - r.height / 2) * 0.3) }
  const leave = () => { x.set(0); y.set(0) }
  return <motion.button style={{ x: sx, y: sy }} whileTap={{ scale: 0.94 }} onMouseMove={move} onMouseLeave={leave} onClick={onClick} className={className}>{children}</motion.button>
}
