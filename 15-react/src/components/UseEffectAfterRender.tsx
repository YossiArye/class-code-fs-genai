// IMPORTANT to avoid running useEffect twice on render, main.tsx must NOT wrap the app in
// <StrictMode>. In main.tsx we render:
// createRoot(document.getElementById('root')!).render(
//   <RouterProvider router={router} />
// )
// and not:
// createRoot(document.getElementById('root')!).render(
//   <StrictMode>
//     <RouterProvider router={router} />
//   </StrictMode>
// )

import { useState, useEffect } from 'react'

export default function UseEffectAfterRender() {
  const [person, setPerson] = useState({ name: 'Yossi', age: '' })
  const [count, setCount] = useState(0)

  // 1. the callback will run on page rendered
  // 2. the dependencies array contains the only states or props variables that will cause the effect
  useEffect(() => {
    console.log('useEffect of person name on action!')
    document.title = `This is ${person.name}'s page`
  }, [person.name])
  useEffect(() => {
    console.log('useEffect of person age on action!')
  }, [person.age])
  useEffect(() => {
    console.log('useEffect of count on action!')
  }, [count])
  return (
    <div>
      <form>
        <div>
          <label>Name</label>
          <input
            type="text"
            value={person.name}
            onChange={(event) => {
              setPerson({ ...person, name: event.target.value })
            }}
          />
        </div>
        <div>
          <label>Age</label>
          <input
            type="number"
            min={0}
            value={person.age}
            onChange={(event) => {
              setPerson({ ...person, age: event.target.value })
            }}
          />
        </div>
        <div>
          <button
            onClick={(event) => {
              event.preventDefault()
              setCount(count + 1)
            }}
          >
            increment
          </button>
        </div>
      </form>
      <div>{person.name}</div>
      <div>{person.age}</div>
      <div>{count}</div>
    </div>
  )
}
