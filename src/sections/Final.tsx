import { useEffect, useState } from 'react'
import { FINAL } from '../data/content'
import { Line, useReveal } from '../components/Seq'
import { secrets, useSecrets } from '../store/secrets'

export function Final() {
  const { complete } = useSecrets(); const [show, setShow] = useState(false); const [bye, setBye] = useState(''); const [bro, setBro] = useState(false)
  useEffect(() => { if (!complete) return; const t = setTimeout(() => setShow(true), 5000); return () => clearTimeout(t) }, [complete])
  const n = useReveal(FINAL, show)
  if (!show) return null
  const restart = () => { setBye('No aprendiste nada.'); setTimeout(() => { secrets.reset(); location.reload() }, 1800) }
  return (
    <div data-lenis-prevent className="fixed inset-0 z-50 bg-black overflow-y-auto">
      <div className="min-h-full flex flex-col justify-center gap-4 px-8 py-16 max-w-md mx-auto">
        {bye ? <Line s={{ t: bye, k: 'big' }} /> : FINAL.slice(0, n).map((s, i) => <Line key={i} s={s} />)}
        {!bye && n >= 3 && n < 5 && <button aria-hidden onClick={() => setBro(true)} className="self-start p-4 text-zinc-800">·</button>}
        {bro && !bye && <><Line s="..." /><Line s={{ t: 'bro.', k: 'big' }} /></>}
        {!bye && n >= FINAL.length && <button onClick={restart} className="mt-6 self-start px-5 py-3 border border-red-900 rounded-full font-mono text-xs tracking-widest">[ RESTART ANGELENA.EXE ]</button>}
      </div>
    </div>
  )
};