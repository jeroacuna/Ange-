import { useState } from 'react'
import { motion } from 'framer-motion'
import { VOID } from '../data/content'
import { Seq } from '../components/Seq'
import { useLongPress } from '../hooks/useGestures'
import { secrets } from '../store/secrets'
import { vibrate } from '../utils/fx'
import { HiddenHeart } from '../components/HiddenHeart'

export function VoidZone() {
  const [open, setOpen] = useState(false)
  const lp = useLongPress(() => { setOpen(true); secrets.unlock('void'); vibrate(80) }, 1500)
  return (
    <>
      <div {...lp} aria-hidden className="relative h-56"><HiddenHeart id={10} pos="bottom-6 left-1/3" /></div>
      {open && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={() => setOpen(false)} className="fixed inset-0 z-50 bg-black flex flex-col justify-center gap-4 px-8">
          <div className="max-w-md mx-auto flex flex-col gap-4"><Seq steps={VOID} /></div>
        </motion.div>
      )}
    </>
  )
};