import { useReducer } from 'react'

interface State {
  count: number
}

// Every possible "thing that can happen" is described as an action.
type Action = { type: 'increment' } | { type: 'decrement' } | { type: 'add'; amount: number } | { type: 'reset' }

const initialState: State = { count: 0 }

// The reducer is a pure function: (currentState, action) => newState.
// All the update logic lives here, in one place, outside the component.
function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 }
    case 'decrement':
      return { count: state.count - 1 }
    case 'add':
      return { count: state.count + action.amount }
    case 'reset':
      return initialState
  }
}

export default function ReducerDemo() {
  // dispatch(action) sends an action to the reducer; React re-renders with the returned state.
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <section>
      <h1>useReducer demo</h1>
      <p>Count: <b>{state.count}</b></p>

      <button onClick={() => dispatch({ type: 'decrement' })}>-1</button>{' '}
      <button onClick={() => dispatch({ type: 'increment' })}>+1</button>{' '}
      <button onClick={() => dispatch({ type: 'add', amount: 10 })}>+10</button>{' '}
      <button onClick={() => dispatch({ type: 'reset' })}>Reset</button>

      <p className="hint">
        The component only says WHAT happened (dispatch an action). The reducer decides HOW the
        state changes. Prefer useReducer over useState when several actions update the same state.
      </p>
    </section>
  )
}
