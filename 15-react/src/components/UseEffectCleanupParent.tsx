import { useState } from 'react'
import UseEffectCleanupChild from './UseEffectCleanupChild'
import UseEffectSetInterval from './UseEffectSetInterval'

export default function UseEffectCleanupParent() {
  const [display, setDisplay] = useState(true)
  const [displayInterval, setDisplayInterval] = useState(true)

  return (
    <div>
      <div>
        <button onClick={() => setDisplay(!display)}>Toggle</button>
      </div>
      <div>
        <button onClick={() => setDisplayInterval(!displayInterval)}>Toggle Interval</button>
      </div>
      <div>
        {/* {display && <UseEffectCleanupChild />} */}
        {displayInterval && <UseEffectSetInterval />}
      </div>
    </div>
  )
}
