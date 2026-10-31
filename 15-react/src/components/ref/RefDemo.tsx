import { useRef, useState } from 'react'

// useRef returns a box: { current: ... }. The SAME box is kept between renders.
// Two differences from useState: changing `ref.current` does NOT re-render, and the change is instant.

// Use 1: get a DOM element
function FocusInput() {
  const inputRef = useRef<HTMLInputElement>(null) // React puts the <input> element into inputRef.current

  return (
    <div className="card">
      <h3>1. Access a DOM element</h3>
      <input ref={inputRef} placeholder="I will be focused" />{' '}
      <button onClick={() => inputRef.current?.focus()}>Focus the input</button>
    </div>
  )
}

// Use 2: a value that survives renders but should NOT cause a render
function RefVsState() {
  const [stateCount, setStateCount] = useState(0)
  const refCount = useRef(0)
  const [, forceRender] = useState(0)

  return (
    <div className="card">
      <h3>2. ref vs state</h3>
      <p>
        {/* Reading ref.current during render is flagged by the linter on purpose: it is the demo's point. */}
        {/* oxlint-disable-next-line react/refs */}
        State: <b>{stateCount}</b> · Ref: <b>{refCount.current}</b>
      </p>
      <button onClick={() => setStateCount((c) => c + 1)}>state +1</button>{' '}
      <button onClick={() => (refCount.current += 1)}>ref +1</button>{' '}
      <button onClick={() => forceRender((n) => n + 1)}>just re-render</button>
      <p className="hint">
        Click "ref +1" a few times: the screen doesn't change, because nothing re-rendered. Then
        click "just re-render" (or "state +1"): the screen now shows the real ref value. The ref
        kept counting the whole time.
      </p>
    </div>
  )
}

// Use 3: the classic real use, keeping a timer id between renders
function Stopwatch() {
  const [seconds, setSeconds] = useState(0)
  const intervalId = useRef<number | null>(null) // we need the id later to stop it, but it's not shown on screen

  const start = () => {
    if (intervalId.current !== null) return // already running
    intervalId.current = window.setInterval(() => setSeconds((s) => s + 1), 1000)
  }

  const stop = () => {
    if (intervalId.current !== null) {
      clearInterval(intervalId.current)
      intervalId.current = null
    }
  }

  return (
    <div className="card">
      <h3>3. Keep a timer id</h3>
      <p>Seconds: <b>{seconds}</b></p>
      <button onClick={start}>Start</button> <button onClick={stop}>Stop</button>{' '}
      <button onClick={() => { stop(); setSeconds(0) }}>Reset</button>
      <p className="hint">
        The id must survive re-renders (each tick re-renders), but changing it shouldn't re-render,
        so it belongs in a ref, not in state. A plain <code>let</code> variable wouldn't work: it is
        reset on every render.
      </p>
    </div>
  )
}

export default function RefDemo() {
  return (
    <section>
      <h1>useRef demo</h1>
      <FocusInput />
      <RefVsState />
      <Stopwatch />
      <p className="hint">
        Rule: if the value is shown on screen, use state. If you only need to remember it (a timer
        id, a previous value, a DOM element), use a ref.
      </p>
    </section>
  )
}
