import { motion } from 'framer-motion'
export function Bar({ label, v, txt }: { label: string; v: number | null; txt?: string }) {
  return (
    <div className="w-full">
      <div className="flex justify-between gap-4 font-mono text-[11px] text-zinc-400">
        <span>{label}</span>
        <span className={v === null ? 'text-red-500 animate-pulse shrink-0' : 'text-white shrink-0'}>{v === null ? 'ERROR 404' : txt ?? `${v}%`}</span>
      </div>
      <div className="mt-2 h-1.5 bg-zinc-900 rounded-full overflow-hidden">
        {v !== null && <motion.div className="h-full bg-gradient-to-r from-red-900 to-pink-400" initial={{ width: 0 }} animate={{ width: `${v}%` }} transition={{ duration: 1.2, ease: 'easeOut' }} />}
      </div>
    </div>
  )
}
