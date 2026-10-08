import { useEffect, useRef } from 'react'
export function Cursor() {
  const r = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!matchMedia('(pointer: fine)').matches) return
    let x = 0, y = 0, cx = 0, cy = 0, id = 0
    const m = (e: MouseEvent) => { x = e.clientX; y = e.clientY }
    const loop = () => { cx += (x - cx) * 0.2; cy += (y - cy) * 0.2; if (r.current) r.current.style.transform = `translate(${cx - 12}px,${cy - 12}px)`; id = requestAnimationFrame(loop) }
    window.addEventListener('mousemove', m); id = requestAnimationFrame(loop)
    return () => { window.removeEventListener('mousemove', m); cancelAnimationFrame(id) }
  }, [])
  return <div ref={r} className="hidden [@media(pointer:fine)]:block fixed left-0 top-0 z-50 size-6 rounded-full border border-red-500/70 pointer-events-none shadow-[0_0_20px_rgba(220,38,38,.5)]" />
}
