let sound = false
export const setSound = (v: boolean) => { sound = v }
export const vibrate = (p: number | number[] = 12) => { try { navigator.vibrate?.(p) } catch { /* noop */ } }
export const burst = (x: number, y: number, n = 7, ch = '❤', dy = -70) =>
  window.dispatchEvent(new CustomEvent('fx:burst', { detail: { x, y, n, ch, dy } }))
export const rain = () => {
  const rm = matchMedia('(prefers-reduced-motion: reduce)').matches
  for (let i = 0; i < 6; i++) setTimeout(() => burst(Math.random() * innerWidth, rm ? Math.random() * innerHeight : -20, 12, '❤', rm ? 0 : innerHeight + 60), i * 180)
}
export const toast = (m: string) => window.dispatchEvent(new CustomEvent('fx:toast', { detail: m }))
let ctx: AudioContext | undefined
export const blip = (f = 440, d = 0.06) => {
  if (!sound) return
  try {
    ctx ??= new AudioContext()
    const o = ctx.createOscillator(), g = ctx.createGain()
    o.type = 'square'; o.frequency.value = f; g.gain.value = 0.03
    o.connect(g).connect(ctx.destination); o.start(); o.stop(ctx.currentTime + d)
  } catch { /* noop */ }
}
export const chord = () => [523, 659, 784].forEach((f, i) => setTimeout(() => blip(f, 0.12), i * 90))
export const glitch = () => { for (let i = 0; i < 6; i++) setTimeout(() => blip(80 + Math.random() * 400, 0.04), i * 45) }