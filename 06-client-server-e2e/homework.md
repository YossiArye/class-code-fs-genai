# Homework — Client-Server E2E

> Based on: `06-client-server-e2e`

---

## Exercise 1 — Predict the Output
**Type:** Predict

What does this code log to the console? Explain why.  
Then write a one-line fix so the result is not empty.

```js
const ids = ["2", "4"]
const users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 4, name: "Carol" }
]
const result = users.filter(u => ids.includes(u.id))
console.log(result)
```

---

## Exercise 2 — Fix the Bug
**Type:** Fix

The server below crashes when a POST request arrives. Find and fix the bug.

```js
import express from 'express'
const app = express()

app.post('/search', (req, res) => {
  const { name } = req.body
  res.json({ found: name })
})

app.listen(3000)
```

---

## Exercise 3 — Fill in the Blanks
**Type:** Fill

Add a new `GET /roles` route to the server. It should read `./db/roles.json` from disk and return it as JSON. Fill in every `// ???`.

```js
app.___('/roles', async (req, res) => {
  try {
    const raw = await fs.readFile(// ???)
    const roles = JSON.___(raw)
    res.___(roles)
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Internal server error')
  }
})
```

---

## Exercise 4 — Write from Scratch
**Type:** Write

Given this HTML:

```html
<input type="text" id="city-input" placeholder="Enter a city" />
<button id="weather-btn">Get Weather</button>
<div id="weather-result"></div>
<script src="client.js"></script>
```

Write the `client.js` that:
1. Listens for a click on `#weather-btn` and prevents page refresh.
2. Reads the value from `#city-input`.
3. POSTs `{ "city": value }` as JSON to `http://localhost:3000/weather`.
4. Awaits the JSON response and displays it (with `JSON.stringify`) inside `#weather-result`.
5. Wraps everything in `try/catch` and logs errors.

---

## Exercise 5 — Fix the Bug
**Type:** Fix

A student wrote this client-side code to send selected product IDs to the server, but `req.body` always arrives as `undefined`. Find **both** bugs and fix them.

```js
document.getElementById('order-btn').addEventListener('click', async (e) => {
  e.preventDefault()
  const selectedIds = [3, 7, 12]

  const res = await fetch('http://localhost:3000/order', {
    method: 'POST',
    body: { ids: selectedIds }
  })

  const data = await res.json()
  document.getElementById('confirmation').textContent = JSON.stringify(data)
})
```
