import { useRef } from 'react'
export function useTaps(n: number, cb: () => void, ms = 1200) {
  const c = useRef(0); const t = useRef<number | undefined>(undefined)
  return () => { c.current++; clearTimeout(t.current); t.current = window.setTimeout(() => { c.current = 0 }, ms); if (c.current >= n) { c.current = 0; cb() } }
}
export function useLongPress(cb: () => void, ms = 900) {
  const t = useRef<number | undefined>(undefined)
  const stop = () => clearTimeout(t.current)
  return { onPointerDown: () => { t.current = window.setTimeout(cb, ms) }, onPointerUp: stop, onPointerLeave: stop, onPointerCancel: stop, onContextMenu: (e: { preventDefault(): void }) => e.preventDefault() }
}
