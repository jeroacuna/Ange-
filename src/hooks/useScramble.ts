import { useEffect, useState } from 'react'
const G = '█▓▒░#@$%&*<>/01'
export function useScramble(text: string, go: boolean) {
  const [s, setS] = useState('\u00A0')
  useEffect(() => {
    if (!go) return
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) { setS(text); return }
    let i = 0
    const t = setInterval(() => {
      i++
      setS(text.split('').map((c, k) => (c === ' ' || k < i / 2 ? c : G[Math.floor(Math.random() * G.length)])).join(''))
      if (i / 2 >= text.length) { clearInterval(t); setS(text) }
    }, 40)
    return () => clearInterval(t)
  }, [go, text])
  return s
}
