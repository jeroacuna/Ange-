import { useRef, useState } from 'react'
import type { RefObject } from 'react'
import { AnimatePresence, motion, useInView, useScroll, useTransform } from 'framer-motion'
import { X } from 'lucide-react'
import { GALLERY_BASE } from '../config'
import { SPECIAL } from '../data/gallery'
import type { MediaItem as Photo } from '../data/gallery'
import type { Step } from '../data/content'
import { Line, useReveal } from '../components/Seq'
import { useLongPress } from '../hooks/useGestures'
import { blip, burst, glitch, rain, vibrate } from '../utils/fx'

const END: Step[] = [{ t: "Okay. That's enough evidence for now." }, { t: 'You can go back to causing problems.', d: 1800 }]
const ROT = [-3, 2, -1.5, 3, -2, 1.5]
const W = { s: 'w-40', m: 'w-56', l: 'w-72' }

function Img({ p, className }: { p: Photo; className?: string }) {
  const [bad, setBad] = useState(false)
  if (p.type === 'video' && p.poster) return <div className="relative"><img src={GALLERY_BASE + p.poster} alt="" loading="lazy" decoding="async" draggable={false} className={className} /><span className="absolute inset-0 grid place-items-center text-3xl text-white/80">▶</span></div>
  if (p.type === 'video') return <div className={`${className} aspect-4/5 bg-zinc-900 grid place-items-center font-mono text-[10px] text-zinc-400`}>▶ {p.title ?? 'VIDEO'}</div>
  if (bad) return <div className={`${className} aspect-4/5 bg-zinc-800 grid place-items-center font-mono text-[10px] text-zinc-500`}>{p.title ?? 'FILE'}</div>
  return <img src={GALLERY_BASE + p.src} alt={p.title ?? ''} loading="lazy" decoding="async" draggable={false} onError={() => setBad(true)} className={className} />
}

function Media({ p }: { p: Photo }) {
  const [bad, setBad] = useState('')
  if (p.type !== 'video') return <Media p={p} />
  return bad ? <a href={GALLERY_BASE + p.src} target="_blank" rel="noreferrer" className="aspect-video bg-zinc-800 grid place-items-center px-3 text-center font-mono text-[10px] text-zinc-400">NO SE PUDO REPRODUCIR (error {bad}). TOCÁ PARA ABRIR EL VIDEO</a>
    : <video src={GALLERY_BASE + p.src} controls playsInline preload="auto" poster={p.poster ? GALLERY_BASE + p.poster : undefined} onError={e => setBad(String(e.currentTarget.error?.code ?? '?'))} className="max-h-[70svh] w-full bg-black" />
}

function Card({ p, i, root, open, ask }: { p: Photo; i: number; root: RefObject<HTMLDivElement>; open: () => void; ask: () => void }) {
  const ref = useRef<HTMLDivElement>(null); const did = useRef(false)
  const { scrollYProgress } = useScroll({ target: ref, container: root, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [40, -40])
  const lp = useLongPress(() => { did.current = true; ask() }, 800)
  return (
    <motion.div ref={ref} style={{ y }} className={i % 2 ? 'self-end' : 'self-start'}>
      <motion.button initial={{ opacity: 0, scale: 0.9, rotate: 0, filter: 'blur(8px)' }} whileInView={{ opacity: 1, scale: 1, rotate: ROT[i % ROT.length], filter: 'blur(0px)' }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.8 }}
        onClick={() => { if (did.current) { did.current = false; return } open() }} {...(p.special ? lp : {})}
        className={`${W[p.size ?? 'm']} bg-zinc-100 p-2 pb-3 shadow-[0_20px_40px_rgba(0,0,0,.7)] text-left`}>
        <Img p={p} className="aspect-4/5 w-full object-cover" />
        {(p.title || p.text) && <div className="pt-2 font-mono text-[9px] leading-tight text-zinc-800">{p.title && <b>{p.title}</b>}{p.text && <p>{p.text}</p>}</div>}
      </motion.button>
    </motion.div>
  )
}

function Lightbox({ items, i, set }: { items: Photo[]; i: number; set: (n: number | null) => void }) {
  const p = items[i]; const [meta, setMeta] = useState(false); const [an, setAn] = useState(false)
  const go = (d: number) => { setMeta(false); set((i + d + items.length) % items.length) }
  const lp = useLongPress(() => { setMeta(m => !m); vibrate(30) }, 600)
  
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-58 bg-black/95 grid place-items-center">
      <button aria-label="cerrar" onClick={() => set(null)} className="absolute top-4 right-4 p-3 z-10"><X size={20} /></button>
      <motion.div key={i} drag={p.type === 'video' ? false : 'x'} dragSnapToOrigin onDragEnd={(_, d) => { if (Math.abs(d.offset.x) > 80) go(d.offset.x < 0 ? 1 : -1) }}
        onDoubleClick={e => { if (p.type !== 'video') { burst(e.clientX, e.clientY, 8); vibrate(20); blip(700, 0.06) } }} {...(p.type === 'video' ? {} : lp)}
        initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} className="w-[88vw] max-w-md bg-zinc-100 p-3 pb-5 shadow-2xl">
        
        {/* ¡Aquí está la magia! Cambiamos <Img> por <Media> */}
        <Media p={p} />
        
        <div className="pt-2 font-mono text-[10px] text-zinc-800">{p.title}{p.text && ` — ${p.text}`}</div>
        {p.analyze && <button onClick={() => setAn(a => !a)} className="mt-2 font-mono text-[10px] text-red-700">[ ANALYZE AUDIO ]</button>}
        {an && <div className="mt-2 font-mono text-[10px] text-zinc-700 whitespace-pre-line">{p.analyze?.join('\n')}</div>}
        {meta && <div className="mt-2 font-mono text-[9px] text-zinc-600">{[...Object.entries(p.metadata ?? {}).map(([k, v]) => `${k}: ${v}`), p.date, p.note, p.src].filter(Boolean).join(' · ')}</div>}
      </motion.div>
      <div className="absolute bottom-6 flex items-center gap-6 font-mono text-[11px] text-zinc-500"><button aria-label="anterior" onClick={() => go(-1)} className="p-3">‹</button>{i + 1} / {items.length}<button aria-label="siguiente" onClick={() => go(1)} className="p-3">›</button></div>
    </motion.div>
  )
}

export default function Gallery({ items, title, onClose }: { items: Photo[]; title: string; onClose: () => void }) {
  const root = useRef<HTMLDivElement>(null); const endRef = useRef<HTMLElement>(null)
  const [sel, setSel] = useState<number | null>(null); const [ask, setAsk] = useState<number | null>(null); const [reveal, setReveal] = useState<Photo | null>(null)
  const seen = useInView(endRef, { once: true, amount: 0.6 }); const n = useReveal(END, seen)
  const holes = { background: 'repeating-linear-gradient(90deg,#27272a 0 8px,transparent 8px 20px)' }
  return (
    <motion.div ref={root} data-lenis-prevent initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 z-55 bg-black overflow-y-auto overscroll-contain">
      <header className="pt-24 px-6 text-center">
        <h1 data-text={title} className="glitch text-5xl font-black">{title}</h1>
        <p className="mt-2 font-mono text-[11px] tracking-[.3em] text-zinc-500">files recovered successfully.</p>
      </header>
      <div className="flex flex-col gap-16 px-8 py-20 max-w-md mx-auto">
        {items.map((p, i) => <Card key={p.src} p={p} i={i} root={root} open={() => setSel(i)} ask={() => { setAsk(i); vibrate(40) }} />)}
      </div>
      <div className="bg-zinc-950 py-2"><div className="h-2" style={holes} />
        <div className="flex gap-3 overflow-x-auto snap-x px-6 py-3">
          {items.map((p, i) => <button key={p.src} onClick={() => setSel(i)} className="snap-center shrink-0 h-28 aspect-3/4 overflow-hidden bg-zinc-900"><Img p={p} className="h-full w-full object-cover opacity-80" /></button>)}
        </div><div className="h-2" style={holes} /></div>
      <section ref={endRef} className="min-h-[70svh] px-8 flex flex-col justify-center gap-4 max-w-md mx-auto">
        {END.slice(0, n).map((s, i) => <Line key={i} s={s} />)}
        {n >= END.length && <button onClick={onClose} className="mt-4 self-start px-5 py-3 border border-red-900 rounded-full font-mono text-xs tracking-widest">[ BACK ]</button>}
      </section>
      <AnimatePresence>{sel !== null && <Lightbox items={items} i={sel} set={setSel} />}</AnimatePresence>
      {ask !== null && (
        <div className="fixed inset-0 z-59 bg-black/80 grid place-items-center px-8">
          <div className="max-w-xs border border-red-900 bg-zinc-950 p-5 font-mono text-sm">
            <p>{SPECIAL.confirm}</p>
            <div className="mt-4 flex gap-3">
              <button onClick={() => { setReveal(items[ask]); setAsk(null); glitch(); vibrate([40, 30, 80]); rain() }} className="px-4 py-2 border border-red-700 text-red-400">OPEN</button>
              <button onClick={() => setAsk(null)} className="px-4 py-2 border border-zinc-700 text-zinc-400">CANCEL</button>
            </div>
          </div>
        </div>
      )}
      {reveal && (
        <motion.div initial={{ opacity: 0, scale: 1.1 }} animate={{ opacity: 1, scale: 1 }} onClick={() => setReveal(null)} className="fixed inset-0 z-59 bg-black grid place-items-center px-8">
          <div className="w-72 bg-zinc-100 p-2"><Img p={reveal} className="aspect-4/5 w-full object-cover" /><p className="p-2 font-mono text-[11px] text-zinc-800">{reveal.special?.message}</p></div>
        </motion.div>
      )}
    </motion.div>
  )
}