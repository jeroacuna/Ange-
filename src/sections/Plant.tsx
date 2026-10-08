import { useState } from 'react'
import type { MouseEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { secrets } from '../store/secrets'
import { burst, vibrate } from '../utils/fx'

export function Plant() {
  const [c, setC] = useState(0); const [msg, setMsg] = useState(false)
  const a = Math.min(2 + c * 2, 14)
  const tap = (e: MouseEvent) => {
    const nc = c + 1; setC(nc)
    burst(e.clientX, e.clientY, nc > 2 ? 5 : 2, '🍃'); vibrate(nc * 5)
    if (nc >= 7 && !msg) { setMsg(true); secrets.unlock('planta'); setTimeout(() => { setMsg(false); setC(0) }, 3200) }
  }
  return (
    <div className="my-6 flex flex-col items-center">
      <motion.svg key={c} viewBox="0 0 120 150" onClick={tap} className="w-40 cursor-pointer" style={{ transformOrigin: '50% 100%' }}
        animate={{ rotate: [0, -a, a, -a / 2, 0], x: c > 3 ? [0, -2, 2, 0] : 0 }} transition={{ duration: 0.4 }}>
        <path d="M60 100 C58 70 62 50 60 30" stroke="#2f6b3a" strokeWidth="4" fill="none" />
        <ellipse cx="42" cy="55" rx="18" ry="8" fill="#2f6b3a" transform="rotate(-30 42 55)" />
        <ellipse cx="78" cy="42" rx="18" ry="8" fill="#3a8247" transform="rotate(30 78 42)" />
        <ellipse cx="44" cy="80" rx="16" ry="7" fill="#27582f" transform="rotate(-20 44 80)" />
        <ellipse cx="76" cy="72" rx="16" ry="7" fill="#2f6b3a" transform="rotate(25 76 72)" />
        <path d="M38 100h44l-6 40H44z" fill="#4a1414" /><rect x="34" y="96" width="52" height="8" rx="3" fill="#6b1c1c" />
      </motion.svg>
      <AnimatePresence>{msg && <motion.p initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="mt-3 text-center text-2xl font-black text-red-500">PARÁ DE ROMPERME LAS PELOTAS</motion.p>}</AnimatePresence>
    </div>
  )
}
