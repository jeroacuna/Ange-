import { useEffect, useState } from 'react'
import Lenis from 'lenis'
import { Cursor } from './components/Cursor'
import { AnimatePresence, MotionConfig } from 'framer-motion'
import { Intro } from './components/Intro'
import { Hud } from './components/Hud'
import { HeartLayer } from './components/HeartLayer'
import { Case } from './components/Case'
import { Plant } from './sections/Plant'
import { NoTocar } from './sections/NoTocar'
import { BehaviorMama } from './sections/BehaviorMama'
import { VoidZone } from './sections/VoidZone'
import { Final } from './sections/Final'
import * as D from './data/content'

export default function App() {
  const [entered, setEntered] = useState(false)
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const l = new Lenis(); let id = 0
    const raf = (t: number) => { l.raf(t); id = requestAnimationFrame(raf) }
    id = requestAnimationFrame(raf)
    return () => { cancelAnimationFrame(id); l.destroy() }
  }, [])
  return (
    <MotionConfig reducedMotion="user">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(60%_40%_at_50%_0%,rgba(127,0,20,.28),transparent)]" />
      <HeartLayer /><Hud /><Cursor />
      <AnimatePresence>{!entered && <Intro onEnter={() => setEntered(true)} />}</AnimatePresence>
      {entered && (
        <main id="stage" className="relative">
          <Case steps={D.IDENT} heart={[1, 'top-24 right-4']} />
          <Case steps={D.STATS} heart={[2, 'bottom-10 left-6']} />
          <Case tag="INCIDENT REPORT #001" title="LA PLANTA" steps={D.PLANTA} extra={<Plant />} />
          <Case tag="INCIDENT REPORT #002" title="LA JODA" steps={D.JODA} heart={[3, 'top-1/3 right-2']} />
          <Case tag="THREAT DETECTED" title="BAUTISTA" steps={D.BAUTISTA} after={D.BAUTISTA_AFTER} btn={{ label: 'ANALYZE BAUTISTA', busy: 'Analyzing...', wait: 2200, unlock: 'bautista' }} />
          <Case tag="INCIDENT REPORT #003" title="BENICIO" steps={D.BENICIO} after={D.BENICIO_AFTER} btn={{ label: 'VIEW CONSEQUENCES', busy: 'Loading consequences...', wait: 1800, unlock: 'benicio', shake: true }} />
          <Case tag="INCIDENT REPORT #004" title="EL AUTO" steps={D.AUTO} heart={[4, 'bottom-24 right-8']} />
          <VoidZone />
          <BehaviorMama />
          <NoTocar />
        </main>
      )}
      <Final />
    </MotionConfig>
  )
}
