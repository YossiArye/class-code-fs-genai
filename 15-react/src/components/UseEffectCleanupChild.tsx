import { useState, useEffect } from 'react'

export default function UseEffectCleanupChild() {
  const [x, setX] = useState(0)
  const [y, setY] = useState(0)

  const mousemoveHandler = (event: MouseEvent) => {
    console.log('mousemove handled!')
    setX(event.clientX)
    setY(event.clientY)
  }

  //  in case this component is unmounted, the listener will continue listen for nothing, and can lead to memory leak. for that we have a cleanup, which will remove the listener on component unmounted.
  // Once the component unmounted the useEffect callback, will run the callback that we return
  useEffect(() => {
    console.log('useEffect on action!')
    document.addEventListener('mousemove', mousemoveHandler)

    return () => {
      document.removeEventListener('mousemove', mousemoveHandler)
    }
  }, [])

  return (
    <div>
      x: {x}, y: {y}
    </div>
  )
}
