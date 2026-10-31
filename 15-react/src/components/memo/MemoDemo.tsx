import { memo, useState } from 'react'

// Shows the exact time this component function last ran.
// If the time changes -> the component re-rendered. If it stays -> React skipped it.
const now = () => new Date().toLocaleTimeString([], { hour12: false }) + '.' + String(Date.now() % 1000).padStart(3, '0')

// A normal component: re-renders EVERY time its parent re-renders, even if its props are the same.
function PlainChild({ name }: { name: string }) {
  return (
    <div className="card">
      <b>Plain child</b> ({name}) - rendered at <code>{now()}</code>
    </div>
  )
} 

// Same component wrapped in memo: React first compares the new props with the old props.
// Props are the same -> skip the render and reuse the previous result.
const MemoChild = memo(function MemoChild({ name }: { name: string }) {
  return (
    <div className="card">
      <b>Memo child</b> ({name}) – rendered at <code>{now()}</code>
    </div>
  )
})

export default function MemoDemo() {
  const [count, setCount] = useState(0)
  const [name, setName] = useState('Yossi')

  return (
    <section>
      <h1>React.memo demo</h1>

      <button onClick={() => setCount((c) => c + 1)}>Parent count: {count}</button>{' '}
      <button onClick={() => setName((n) => (n === 'Yossi' ? 'Dana' : 'Yossi'))}>Change name prop</button>

      <PlainChild name={name} />
      <MemoChild name={name} />

      <ol className="hint">
        <li>Click "Parent count": the plain child's time changes, the memo child's time does NOT. Its props did not change, so React skipped it.</li>
        <li>Click "Change name prop": both times change, because now the prop is different.</li>
      </ol>

      <p className="hint">
        memo only helps when a component re-renders often with the same props. Don't wrap everything:
        the props comparison also has a cost.
      </p>
    </section>
  )
}
