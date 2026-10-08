import type { MouseEvent } from 'react'
import { HEARTS_TOTAL } from '../config'
import { secrets, useSecrets } from '../store/secrets'
import { blip, burst, vibrate } from '../utils/fx'

export function HiddenHeart({ id, pos }: { id: number; pos: string }) {
  const { ids } = useSecrets()
  const key = 'h' + id
  const on = ids.includes(key)
  const tap = (e: MouseEvent) => {
    e.stopPropagation()
    if (!secrets.unlock(key)) return
    burst(e.clientX, e.clientY, 4); vibrate(25); blip(900, 0.05)
    if (secrets.heartCount() >= HEARTS_TOTAL) secrets.unlock('hearts')
  }
  return <button aria-hidden tabIndex={-1} onClick={tap} className={`absolute z-10 p-3 text-[10px] text-pink-400 ${pos}`} style={{ opacity: on ? 0.7 : 0.12, textShadow: on ? '0 0 8px #f472b6' : undefined }}>❤</button>
};