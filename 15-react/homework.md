# Homework — React Basics: Components, useState & Routing

> Based on: /Users/yossiarye/projects/workspace-class/class-code-fs-genai/15-react

---

## Exercise 1 — Like button
**Type:** Write

Create a component `LikeButton` in `src/components/LikeButton.tsx`.

- It shows a button with the text `🤍 Like` at first.
- Every click toggles it: after a click it shows `❤️ Liked`, after another click it goes back to `🤍 Like`.
- Use `useState` with a boolean. Render `LikeButton` inside `Home.tsx`.

---

## Exercise 2 — Predict the number
**Type:** Predict

```tsx
import { useState } from 'react'

export default function Score() {
  const [score, setScore] = useState(10)

  const play = () => {
    setScore(score + 2)
    setScore(score + 2)
    setScore(prev => prev + 3)
  }

  return <button onClick={play}>Score: {score}</button>
}
```

1. What does the button show after the **first** click?
2. What does it show after the **second** click?
3. Explain in one or two sentences why the result is not `16` after the first click.

---

## Exercise 3 — The disappearing field
**Type:** Fix

The student wrote a small form with one state object. Typing in the title works, but as soon as you type a price the title disappears, and the other way around.

```tsx
import { useState } from 'react'

export default function ProductForm() {
  const [product, setProduct] = useState({ title: '', price: '' })

  return (
    <div>
      <input
        placeholder="Title"
        value={product.title}
        onChange={e => setProduct({ title: e.target.value })}
      />
      <input
        placeholder="Price"
        type="number"
        value={product.price}
        onChange={e => setProduct({ price: e.target.value })}
      />
      <p>
        {product.title} {product.price}
      </p>
    </div>
  )
}
```

1. Find the bug and fix it.
2. Explain why React forgets the other field.

---

## Exercise 4 — Add a Contact page
**Type:** Fill

Add a third page, `/contact`, to the app. Fill in every `// ???`.

```tsx
// src/pages/Contact.tsx
export default function Contact() {
  return <h1>// ???</h1>
}
```

```tsx
// src/router.tsx
import { createBrowserRouter } from 'react-router-dom'
import RootLayout from './layouts/RootLayout'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/about', element: <About /> },
      { path: '// ???', element: // ??? },
    ],
  },
])
```

```tsx
// src/components/Navbar.tsx
import { NavLink } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav>
      <NavLink to="/">Home</NavLink> | <NavLink to="/about">About</NavLink> |{' '}
      <NavLink to="// ???">Contact</NavLink>
    </nav>
  )
}
```

Then answer: which component in `RootLayout.tsx` decides **where** the page content is rendered, and what would happen if you removed it?

---

## Exercise 5 — Shopping cart item
**Type:** Write

Create a component `CartItem` in `src/components/CartItem.tsx` with **one** `useState` holding an object:

```tsx
{ name: 'Apple', quantity: 1 }
```

Requirements:

- Show the text `Apple x 1` (the numbers and name come from state).
- A `+` button that increases `quantity` by 1.
- A `-` button that decreases `quantity` by 1, but never below 0.
- An input that lets the user change the `name`.
- A button `+3` that adds 3 to the quantity in a single click, by calling the setter three times. Make sure it really adds 3 (not 1).

Render `CartItem` inside `Home.tsx`.
