import { useCallback, useState } from 'react'
import MemoButton from './MemoButton'

// Part 2: when the array needs members.
// The handler must read `message` (the CURRENT text), so `message` has to be in the array.
export default function ChatDemo() {
  const [message, setMessage] = useState('')
  const [lastSent, setLastSent] = useState('')

  // Wrong: [] freezes the function from the first render, where message was ''.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const sendWrong = useCallback(() => setLastSent(message), [])

  // Right: a new function is created whenever `message` changes, so it always sees the latest text.
  const sendRight = useCallback(() => setLastSent(message), [message])

  return (
    <div>
      <h2>Part 2: what goes in the array?</h2>
      <input value={message} onChange={(e) => setMessage(e.target.value)} placeholder="type a message..." />
      <p>Last sent: <b>{lastSent || '(nothing yet)'}</b></p>

      <MemoButton label="Send with []  (wrong)" onClick={sendWrong} />
      <MemoButton label="Send with [message]  (right)" onClick={sendRight} />

      <p className="hint">
        Type "hello" and click both buttons. The wrong one always sends an empty text (it remembers
        the first render). The right one sends "hello". Its time changes on each keystroke because
        it really gets a new function, and that is correct.
      </p>
      <p className="hint">
        Rule: every state or prop that the function reads goes in the array. Setters (setX) and
        refs don't.
      </p>
    </div>
  )
}
