import { useMemo, useState } from 'react'

const now = () => new Date().toLocaleTimeString([], { hour12: false }) + '.' + String(Date.now() % 1000).padStart(3, '0')

// Pretend this is a heavy calculation: it blocks for ~100ms.
function slowSquare(n: number) {
  const start = Date.now()
  while (Date.now() - start < 100) {
    // busy wait
  }
  return { result: n * n, computedAt: now() }
}

export default function ExpensiveCalcDemo() {
  const [n, setN] = useState(5)
  const [dark, setDark] = useState(false) // unrelated to the calculation

  // Runs on EVERY render, even when only `dark` changed.
  const plain = slowSquare(n)

  // Runs only when `n` changes. Otherwise React returns the saved result.
  const memoized = useMemo(() => slowSquare(n), [n])

  return (
    <div style={{ background: dark ? '#222' : '#fff', color: dark ? '#fff' : '#222', padding: '1rem' }}>
      <h2>Part 1: skip an expensive calculation</h2>

      <input type="number" value={n} onChange={(e) => setN(Number(e.target.value))} />{' '}
      <button onClick={() => setDark((d) => !d)}>Toggle dark (unrelated)</button>

      <div className="card">
        <b>Without useMemo:</b> {n}² = {plain.result} – calculated at <code>{plain.computedAt}</code>
      </div>
      <div className="card">
        <b>With useMemo:</b> {n}² = {memoized.result} – calculated at <code>{memoized.computedAt}</code>
      </div>

      <p className="hint">
        Click "Toggle dark": the first time changes (it recalculated, and the click feels slow), the
        second does not. Change the number: both recalculate, because `n` is in the dependency
        array.
      </p>
    </div>
  )
}
