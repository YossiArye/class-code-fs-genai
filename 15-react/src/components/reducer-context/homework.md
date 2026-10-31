# Homework — useReducer & useContext

> Based on: /Users/yossiarye/projects/workspace-class/class-code-fs-genai/15-react/src/components/useReducer and /Users/yossiarye/projects/workspace-class/class-code-fs-genai/15-react/src/components/reducer-context

---

## Exercise 1 — Thermostat reducer
**Type:** Fill

A thermostat keeps one number in state. Complete the reducer so every action works, then complete the component.

```tsx
import { useReducer } from 'react'

interface State {
  temp: number
}

type Action =
  | { type: 'heat' }               // +1 degree
  | { type: 'cool' }               // -1 degree
  | { type: 'set'; value: number } // jump to a specific temperature
  | { type: 'reset' }              // back to 20

const initialState: State = { temp: 20 }

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'heat':
      return // ???
    case 'cool':
      return // ???
    case 'set':
      return // ???
    case 'reset':
      return // ???
  }
}

export default function Thermostat() {
  const [state, dispatch] = // ???

  return (
    <section>
      <p>Temperature: <b>{state.temp}</b></p>
      <button onClick={() => // ???}>Cooler</button>
      <button onClick={() => // ???}>Warmer</button>
      <button onClick={() => // ???}>Set 25</button>
      <button onClick={() => // ???}>Reset</button>
    </section>
  )
}
```

---

## Exercise 2 — Ticket cart: predict the state
**Type:** Predict

This reducer manages a list of tickets, the same way the cart manages products.

```ts
interface Ticket {
  id: number
  name: string
  quantity: number
}

type TicketAction =
  | { type: 'add'; id: number; name: string }
  | { type: 'increment'; id: number }
  | { type: 'decrement'; id: number }

function ticketReducer(tickets: Ticket[], action: TicketAction): Ticket[] {
  switch (action.type) {
    case 'add': {
      const existing = tickets.find((t) => t.id === action.id)
      if (existing) {
        return tickets.map((t) => (t.id === action.id ? { ...t, quantity: t.quantity + 1 } : t))
      }
      return [...tickets, { id: action.id, name: action.name, quantity: 1 }]
    }
    case 'increment':
      return tickets.map((t) => (t.id === action.id ? { ...t, quantity: t.quantity + 1 } : t))
    case 'decrement':
      return tickets
        .map((t) => (t.id === action.id ? { ...t, quantity: t.quantity - 1 } : t))
        .filter((t) => t.quantity > 0)
  }
}
```

Starting from `[]`, these actions are dispatched one after another:

```ts
dispatch({ type: 'add', id: 1, name: 'Concert' })
dispatch({ type: 'add', id: 2, name: 'Movie' })
dispatch({ type: 'add', id: 1, name: 'Concert' })
dispatch({ type: 'decrement', id: 2 })
dispatch({ type: 'increment', id: 1 })
```

1. What is the final array?
2. Write the array after each of the 5 actions.
3. Which line makes the Movie ticket disappear, and why?

---

## Exercise 3 — The playlist that never updates
**Type:** Fix

The playlist screen does not change when you click "Add" or "Remove". There are 2 bugs in this reducer. Find them and fix them.

```tsx
interface Song {
  id: number
  title: string
}

type PlaylistAction =
  | { type: 'add'; song: Song }
  | { type: 'remove'; id: number }

function playlistReducer(playlist: Song[], action: PlaylistAction): Song[] {
  switch (action.type) {
    case 'add':
      playlist.push(action.song)
      return playlist
    case 'remove':
      return playlist.filter((song) => song.id === action.id)
  }
}
```

1. Which line breaks the rule "a reducer never changes the old state"? Why doesn't React re-render?
2. What does the `remove` case really do right now? Fix it.
3. Write the corrected reducer.

---

## Exercise 4 — Notifications context
**Type:** Fill

Connect a reducer to a context so any component can read the notifications and dispatch actions. Fill in every `// ???`.

```tsx
// notificationReducer.ts
export interface Notification {
  id: number
  text: string
  read: boolean
}

export type NotificationAction =
  | { type: 'receive'; notification: Notification }
  | { type: 'markRead'; id: number }

export const initialNotifications: Notification[] = []

export function notificationReducer(
  list: Notification[],
  action: NotificationAction,
): Notification[] {
  switch (action.type) {
    case 'receive':
      return // ??? add the new notification to the END of the list
    case 'markRead':
      return // ??? set read: true only on the notification with this id
  }
}
```

```tsx
// NotificationContext.ts
import { createContext, useContext, type Dispatch } from 'react'
import type { Notification, NotificationAction } from './notificationReducer'

interface NotificationContextValue {
  list: Notification[]
  dispatch: Dispatch<NotificationAction>
}

export const NotificationContext = createContext<NotificationContextValue | null>(null)

export function useNotifications() {
  const value = useContext(NotificationContext)
  if (!value) throw new Error(// ???)

  const { list, dispatch } = value
  const unreadCount = // ??? how many notifications have read === false

  return { list, dispatch, unreadCount }
}
```

```tsx
// NotificationProvider.tsx
import { useReducer, type ReactNode } from 'react'
import { NotificationContext } from './NotificationContext'
import { notificationReducer, initialNotifications } from './notificationReducer'

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [list, dispatch] = // ???

  return (
    <NotificationContext.Provider value={// ???}>
      {children}
    </NotificationContext.Provider>
  )
}
```

---

## Exercise 5 — Todo list from scratch
**Type:** Write

Build a small todo list that uses the same pattern as the shop: one reducer, one context, components that never receive props from each other.

Start from these types:

```ts
export interface Todo {
  id: number
  text: string
  done: boolean
}

export type TodoAction =
  | { type: 'add'; todo: Todo }
  | { type: 'toggle'; id: number }
  | { type: 'remove'; id: number }
  | { type: 'clearDone' }
```

1. Write `todoReducer(todos, action)` that handles the four actions without changing the old array.
2. Write `TodoProvider` (with `useReducer`) and a `useTodos()` hook that throws an error outside the provider and also returns `remaining` (how many todos have `done === false`).
3. Write a `TodoList` component that shows every todo with a "Toggle" and a "Remove" button, and a "Clear done" button.
4. Write a `TodoCounter` component that shows "N left" using `useTodos()`.
5. Put `TodoCounter` and `TodoList` inside `<TodoProvider>` in a `TodoApp` component. Do they need any props?
