import { useState } from 'react'

export default function Counter() {
  const [count, setCount] = useState(4)

  const addFive = () => {
    setCount(prev => prev + 1)
    setCount(prev => prev + 1)
    setCount(prev => prev + 1)
    setCount(prev => prev + 1)
    setCount(prev => prev + 1)

  }

  return <button onClick={addFive}>Clicked {count} times</button>
}
