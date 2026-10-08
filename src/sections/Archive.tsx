import { useState } from 'react'
import { motion } from 'framer-motion'
import Gallery from './Gallery'
import { CATEGORIES, MEDIA } from '../data/gallery'
import { useSecrets } from '../store/secrets'

const inCat = (id: string) => MEDIA.filter(m => m.primaryCategory === id || m.tags.includes(id))

export default function Archive({ onClose }: { onClose: () => void }) {
  const { ids } = useSecrets(); const [cat, setCat] = useState<string | null>(null)
  const open = CATEGORIES.filter(c => ids.includes(c.unlock))
  const all = MEDIA.filter(m => open.some(c => m.primaryCategory === c.id || m.tags.includes(c.id)))
  if (cat) return <Gallery key={cat} items={cat === 'all' ? all : inCat(cat)} title={cat === 'all' ? 'US' : CATEGORIES.find(c => c.id === cat)?.label ?? ''} onClose={() => setCat(null)} />
  return (
    <motion.div data-lenis-prevent initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 z-[55] bg-black overflow-y-auto overscroll-contain px-8 pt-24 pb-16">
      <div className="max-w-md mx-auto flex flex-col gap-3 font-mono text-sm">
        <h1 data-text="MEMORY.DAT" className="glitch font-sans text-5xl font-black">MEMORY.DAT</h1>
        <p className="mb-4 text-[11px] tracking-[.3em] text-zinc-500">files recovered successfully.</p>
        <button onClick={() => setCat('all')} className="text-left border border-red-900 px-4 py-3">US <span className="text-zinc-500">({all.length})</span></button>
        {CATEGORIES.map(c => ids.includes(c.unlock)
          ? <button key={c.id} onClick={() => setCat(c.id)} className="text-left border border-zinc-700 px-4 py-3">{c.label} <span className="text-zinc-500">({inCat(c.id).length})</span></button>
          : <div key={c.id} className="border border-zinc-900 px-4 py-3 text-zinc-600">████████ LOCKED</div>)}
        <button onClick={onClose} className="mt-6 self-start px-5 py-3 border border-red-900 rounded-full text-xs tracking-widest">[ BACK TO ANGELENA.EXE ]</button>
      </div>
    </motion.div>
  )
}