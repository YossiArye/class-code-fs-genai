import { useCallback, useState } from 'react'
import MemoButton from './MemoButton'

// Part 1: a stable function for a memoized child
export default function StableFunctionDemo() {
  const [count, setCount] = useState(0) // only used to force the parent to re-render
  const [clicks, setClicks] = useState(0)

  // Problem: a function is an object. Every render creates a NEW function,
  // so `onClick` is "different" each time, and memo can't skip the child.
  const handleWithoutCallback = () => setClicks((c) => c + 1)

  // Fix: useCallback keeps the SAME function between renders (until the deps change).
  // Deps are [] because the function doesn't use any outside value (the updater form reads the latest).
  const handleWithCallback = useCallback(() => setClicks((c) => c + 1), [])

  return (
    <div>
      <h2>Part 1: stable function for a memoized child</h2>

      <button onClick={() => setCount((c) => c + 1)}>Parent re-render: {count}</button>
      <p>Button clicks: <b>{clicks}</b></p>

      <MemoButton label="Without useCallback" onClick={handleWithoutCallback} />
      <MemoButton label="With useCallback" onClick={handleWithCallback} />

      <p className="hint">
        Click "Parent re-render" a few times. Both children are wrapped in memo, but only the
        second one keeps its time, because its function prop is the same function every render.
        The first one gets a new function each render, so memo is useless there.
      </p>
      <p className="hint">
        Rule: useCallback is worth it only when you pass the function to a memoized child (or use it
        in a dependency array). Otherwise skip it.
      </p>
    </div>
  )
}
