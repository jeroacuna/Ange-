import { Case } from '../components/Case'
import { BEHAVIOR, MAMA } from '../data/content'
import { secrets, useSecrets } from '../store/secrets'
import { glitch, vibrate } from '../utils/fx'

export function BehaviorMama() {
  const { ids } = useSecrets()
  return (
    <>
      <Case steps={BEHAVIOR} heart={[5, 'top-16 left-3']} onSwipe={d => { if (d === 'r' && secrets.unlock('mama')) { glitch(); vibrate([40, 30, 40]) } }} />
      {ids.includes('mama') && <Case steps={MAMA} />}
    </>
  )
}
