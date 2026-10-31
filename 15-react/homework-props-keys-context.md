# Homework — React Props, Keys & useContext

> Based on: /Users/yossiarye/projects/workspace-class/class-code-fs-genai/15-react/src/components/PropsDemo.tsx, /Users/yossiarye/projects/workspace-class/class-code-fs-genai/15-react/src/components/keys, /Users/yossiarye/projects/workspace-class/class-code-fs-genai/15-react/src/components/useContext

---

## Exercise 1 — Product card
**Type:** Write

Create a component `ProductCard` in `src/components/ProductCard.tsx` and use it from a parent component `Shop`.

- Define an interface for the props: `title` (string), `price` (number), `discount` (optional number, default `0`), `onAdd` (a function that receives the title) and `children` (optional, anything written between the opening and closing tags).
- Show the title, the final price (`price - discount`), the `children`, and an **Add** button that calls `onAdd(title)`.
- In `Shop`, keep `useState` with the text of the last added product (start with `'nothing'`) and show `Last added: ...`.
- Render two cards: one written with literal props and a `<em>` child, and one rendered from an object using the spread syntax (`{...product}`).

---

## Exercise 2 — Predict the badges
**Type:** Predict

```tsx
import { useState } from 'react'

interface BadgeProps {
  label: string
  level?: number
  onPick: (label: string) => void
}

function Badge({ label, level = 1, onPick }: BadgeProps) {
  return (
    <button onClick={() => onPick(label)}>
      {label} (level {level})
    </button>
  )
}

export default function Badges() {
  const [picked, setPicked] = useState('none')

  const items = [
    { id: 1, label: 'Bronze' },
    { id: 2, label: 'Silver', level: 2 },
  ]

  return (
    <div>
      <p>Picked: {picked}</p>
      {items.map((item) => (
        <Badge key={item.id} {...item} onPick={setPicked} />
      ))}
    </div>
  )
}
```

1. What text is on each of the two buttons when the page first loads?
2. What does the `Picked:` line show after clicking the **Silver** button?
3. In one or two sentences: how does a click inside `Badge` change text that is rendered by `Badges`?

---

## Exercise 3 — The checkbox that stays behind
**Type:** Fix

When you tick the checkbox of **Wash** and then click its **Remove** button, the row disappears but the tick moves to **Cook**.

```tsx
import { useState } from 'react'

interface TaskRowProps {
  id: number
  title: string
  onRemove: (id: number) => void
}

function TaskRow({ id, title, onRemove }: TaskRowProps) {
  return (
    <div>
      <input type="checkbox" />
      <label>{title}</label>
      <button type="button" onClick={() => onRemove(id)}>
        Remove
      </button>
    </div>
  )
}

export default function Tasks() {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Wash' },
    { id: 2, title: 'Cook' },
    { id: 3, title: 'Read' },
  ])

  const remove = (id: number) => {
    setTasks((prev) => prev.filter((task) => task.id !== id))
  }

  return (
    <form>
      {tasks.map((task, index) => (
        <TaskRow key={index} {...task} onRemove={remove} />
      ))}
    </form>
  )
}
```

1. Fix the bug.
2. Explain why React keeps the tick on the first row when the `key` is the index.
3. Name one situation where using the index as a key is still fine.

---

## Exercise 4 — Language context
**Type:** Fill

Fill in every `// ???` so any component can read the current language and switch it, without passing props.

```tsx
import { createContext, useContext, useState, type ReactNode } from 'react'

type Language = 'en' | 'he'

interface LanguageContextType {
  language: Language
  toggleLanguage: () => void
}

const LanguageContext = createContext<// ???>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en')

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'en' ? 'he' : 'en'))
  }

  return (
    <LanguageContext.// ??? value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.// ???>
  )
}

export function useLanguage() {
  const context = // ???(LanguageContext)
  if (!context) {
    throw new Error('// ???')
  }
  return context
}
```

Then answer: what happens if a component calls `useLanguage()` but is **not** rendered inside a `LanguageProvider`, and why does the code check `if (!context)`?

---

## Exercise 5 — Login state without props
**Type:** Write

Build a small login demo in `src/components/auth/` where nothing is passed down as props.

- `AuthContext.tsx`: a context that holds `user` (a string or `null`), `login(name)` and `logout()`. Export an `AuthProvider` (state with `useState`) and a custom hook `useAuth()` that throws an error when used outside the provider.
- `LoginBar.tsx`: when there is no user, show an input and a **Login** button. When there is a user, show `Welcome, <name>` and a **Logout** button.
- `Greeting.tsx`: a separate component that shows `Hello, guest` or `Hello, <name>`, using `useAuth()`.
- `AuthDemo.tsx`: wraps `LoginBar` and `Greeting` in `AuthProvider`. Add `<AuthDemo />` to `Home.tsx`.

Check that logging in through `LoginBar` changes the text in `Greeting` even though they are siblings.
