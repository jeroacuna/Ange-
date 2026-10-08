import type { MouseEvent } from 'react'
import { secrets, useSecrets } from '../store/secrets'
import { burst, rain, toast, vibrate } from '../utils/fx'

export function HiddenHeart({ id, pos }: { id: number; pos: string }) {
  const { ids } = useSecrets()
  const key = 'h' + id
  const on = ids.includes(key)
  const tap = (e: MouseEvent) => {
    e.stopPropagation()
    if (!secrets.unlock(key)) return
    burst(e.clientX, e.clientY, 5); vibrate(25)
    if ([1, 2, 3, 4, 5].every(i => secrets.has('h' + i))) { secrets.unlock('hearts'); toast('Secret collection complete.'); rain() }
    else toast('❤')
  }
  return <button aria-hidden tabIndex={-1} onClick={tap} className={`absolute z-10 p-3 text-[10px] text-pink-400 ${pos}`} style={{ opacity: on ? 0.7 : 0.12 }}>❤</button>
}
