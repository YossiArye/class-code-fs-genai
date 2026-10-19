import { useState, useEffect } from 'react'

export default function RunEffectOnlyOnce() {
  const [x, setX] = useState(0)
  const [y, setY] = useState(0)

  // We don't want to run useEffect every time that x and y are changed. for that we should add empty array as the second parameter, which it means, don't be triggered by any state or prop, but only by the initial render.
  useEffect(() => {
    console.log('useEffect mouse component on action!')
    document.addEventListener('mousemove', (event) => {
      setX(event.clientX)
      setY(event.clientY)
    })
  }, [])

  return (
    <div>
      x: {x}, y: {y}
    </div>
  )
}
