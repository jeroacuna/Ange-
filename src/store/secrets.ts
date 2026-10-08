import { useSyncExternalStore } from 'react'
import { KEEP_GALLERY, RESET_ON_ENTER } from '../config'
import { burst, chord, toast, vibrate } from '../utils/fx'

export const ALL = ['planta', 'bautista', 'benicio', 'mama', 'notocar', 'void', 'doble', 'llorona', 'hearts'] as const
const LEVELS = ['NPC', 'Curiosa', 'Rompeplantas', 'Hackeada', 'Peligro público', 'Quilombo nivel dios', 'ANGELENA.EXE']
const KEY = 'angelena.exe.v1'
const isMain = (id: string) => (ALL as readonly string[]).includes(id)
const load = (): string[] => { try { return JSON.parse(localStorage.getItem(KEY) || '[]') } catch { return [] } }

if (new URLSearchParams(location.search).has('reset')) { try { localStorage.removeItem(KEY) } catch { /* noop */ } history.replaceState(null, '', location.pathname) }
let snap = RESET_ON_ENTER ? (KEEP_GALLERY ? load().filter(i => i === 'memory') : []) : load()
if (RESET_ON_ENTER) { try { localStorage.setItem(KEY, JSON.stringify(snap)) } catch { /* noop */ } }
const subs = new Set<() => void>()
const emit = () => { try { localStorage.setItem(KEY, JSON.stringify(snap)) } catch { /* noop */ } subs.forEach(f => f()) }
const count = () => snap.filter(isMain).length

export const secrets = {
  has: (id: string) => snap.includes(id),
  heartCount: () => snap.filter(i => /^h\d+$/.test(i)).length,
  unlock(id: string) {
    if (snap.includes(id)) return false
    snap = [...snap, id]; emit()
    if (isMain(id)) { vibrate([20, 40, 20]); chord(); burst(innerWidth / 2, innerHeight / 2, 14); toast(`Secret unlocked · ${count()}`) }
    return true
  },
  reset() { snap = []; emit() },
}

export function useSecrets() {
  const ids = useSyncExternalStore(f => { subs.add(f); return () => { subs.delete(f) } }, () => snap)
  const found = ids.filter(isMain).length
  return { ids, found, total: ALL.length, level: LEVELS[Math.min(found, LEVELS.length - 1)], complete: found >= ALL.length }
};