import { useState, useEffect } from 'react'

export default function UseEffectSetInterval() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    console.log('Mounted component!')
    const interval = setInterval(() => {
      // We will not see the 'count' is updated. The reason is because every time setInterval ticks, it will actually call setTime(count + 1), but 'count' will always hold the value it had initially when the setInterval callback (closure) was defined. You can use the alternative form of useState's setter and provide a callback rather than the actual value you want to set (just like with setState).
      //   setCount(count + 1)
      console.log('keep running') //In case of not clearing on unmount it's ckeep continue printing
      setCount((prevCount) => {
        console.log(prevCount) //In case of not clearing on unmount setCount is called on an unmounted component but React ignores the state update
        return prevCount + 1
      })
    }, 1000)

    return () => {
      console.log('Unmounted component')
      clearInterval(interval)
    }
  }, [])

  return <div>{count}</div>
}
