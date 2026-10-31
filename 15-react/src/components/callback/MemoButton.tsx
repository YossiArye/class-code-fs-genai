import { memo } from 'react'

const now = () => new Date().toLocaleTimeString([], { hour12: false }) + '.' + String(Date.now() % 1000).padStart(3, '0')

// A memoized button: it skips rendering when its props are the same as last time.
// The time shows when it last rendered: a changing time means it re-rendered.
export default memo(function MemoButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <div className="card">
      <button onClick={onClick}>{label}</button> – rendered at <code>{now()}</code>
    </div>
  )
})
