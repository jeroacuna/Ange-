import { useState } from 'react'
import type { MouseEvent } from 'react'
import { MagneticButton } from '../components/MagneticButton'
import { NO_TOCAR } from '../data/content'
import { secrets } from '../store/secrets'
import { blip, burst, rain, vibrate } from '../utils/fx'

export function NoTocar() {
  const [n, setN] = useState(0)
  const tap = (e: MouseEvent) => {
    const k = n + 1; setN(k); vibrate(k > 3 ? [30, 30, 30] : 10); blip(150 + k * 40); burst(e.clientX, e.clientY, 3, '💢')
    if (k === NO_TOCAR.length) { secrets.unlock('notocar'); rain() }
  }
  return (
    <section className="min-h-[80svh] flex flex-col items-center justify-center gap-6 px-6 text-center">
      <MagneticButton onClick={tap} className="px-10 py-6 rounded-2xl bg-red-700 text-3xl font-black tracking-tight shadow-[0_0_40px_rgba(185,28,28,.5)]">NO TOCAR</MagneticButton>
      <p className="min-h-16 max-w-xs font-mono text-sm text-zinc-300">{n > 0 && NO_TOCAR[Math.min(n, NO_TOCAR.length) - 1]}</p>
    </section>
  )
}
