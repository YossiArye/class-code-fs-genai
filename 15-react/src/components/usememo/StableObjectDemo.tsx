import { memo, useMemo, useState } from 'react'

const now = () => new Date().toLocaleTimeString([], { hour12: false }) + '.' + String(Date.now() % 1000).padStart(3, '0')

// A memoized child that receives an object prop.
const Box = memo(function Box({ label, style }: { label: string; style: { color: string } }) {
  return (
    <div className="card">
      <span style={style}>{label}</span> – rendered at <code>{now()}</code>
    </div>
  )
})

export default function StableObjectDemo() {
  const [count, setCount] = useState(0) // only used to force the parent to re-render

  // An object is a new object every render, so `memo` sees a "different" prop.
  const newEveryRender = { color: 'crimson' }

  // useMemo keeps the SAME object between renders.
  const sameObject = useMemo(() => ({ color: 'seagreen' }), [])

  return (
    <div>
      <h2>Part 2: keep the same object for a memoized child</h2>

      <button onClick={() => setCount((c) => c + 1)}>Parent re-render: {count}</button>

      <Box label="Object without useMemo" style={newEveryRender} />
      <Box label="Object with useMemo" style={sameObject} />

      <p className="hint">
        Both boxes are wrapped in memo. Only the second one keeps its time, because its object is
        the same one every render. This is the same trick as useCallback, but for objects and arrays.
      </p>
    </div>
  )
}
