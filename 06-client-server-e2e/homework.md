# Homework — Async Patterns: Callbacks, Promises, and allSettled

> Based on: /Users/yossiarye/projects/workspace-class/class-code-fs-genai/06-client-server-e2e/client.js

---

## Exercise 1 — Callback Hell

**Type:** Write from scratch

The `client.js` you saw in class uses `async/await`. Your job is to rewrite the same logic using **nested callbacks** — no `async`, no `await`, no `.then()`.

Use the helper below to convert `fetch` into a callback-style function:

```js
function fetchJSON(url, options, callback) {
  fetch(url, options)
    .then(res => res.json())
    .then(data => callback(null, data))
    .catch(err => callback(err, null))
}
```

Wire up the `#btn` click listener so it:
1. Calls `fetchJSON` to `GET http://localhost:3000/houses`
2. Inside the callback, loops over each house and calls `fetchJSON` to `POST http://localhost:3000/bulk-politicians` with `house.politicians` as the body
3. Inside each of those callbacks, logs the politicians data

You should end up with callbacks nested inside callbacks inside a callback. That nesting is the whole point — this is **callback hell**.

---

## Exercise 2 — Then / Catch

**Type:** Write from scratch

Rewrite the `#btn` click listener using `.then().catch()` promise chaining. Rules:
- No `async` keyword
- No `await` keyword
- Handle errors with `.catch()`

The logic is identical to `client.js`:
1. Fetch all houses
2. Build an array of `POST /bulk-politicians` fetch requests — one per house
3. Resolve them all with `Promise.all()`
4. Resolve all `.json()` calls with a second `Promise.all()`
5. Log the final politicians data

```js
document.getElementById('btn').addEventListener('click', (e) => {
  // ??? your then/catch chain here
})
```

---

## Exercise 3 — Promise.allSettled

**Type:** Write from scratch

In `client.js`, both `Promise.all()` calls will **throw and stop everything** if even one request fails.

Rewrite the async/await version replacing **both** `Promise.all()` calls with `Promise.allSettled()`.

Important: `allSettled` does not give you values directly. It gives you an array of result objects:
```js
[
  { status: 'fulfilled', value: <the response> },
  { status: 'rejected',  reason: <the error>  },
]
```

After each `allSettled`, filter out the rejected ones and continue with only the fulfilled values. Log a warning for each rejected request.

---

## Exercise 4 — Predict the Output

**Type:** Predict the output

What does the following code log to the console? Write your answer before running it.

```js
const p1 = Promise.resolve({ id: 1, name: 'Alice' })
const p2 = Promise.reject(new Error('Network timeout'))
const p3 = Promise.resolve({ id: 3, name: 'Bob' })

Promise.allSettled([p1, p2, p3]).then(results => {
  results.forEach(result => {
    if (result.status === 'fulfilled') {
      console.log('OK:', result.value.name)
    } else {
      console.log('FAILED:', result.reason.message)
    }
  })
})
```

What would happen if you replaced `Promise.allSettled` with `Promise.all`? Explain the difference in one sentence.

---

## Exercise 5 — Fix the Bug

**Type:** Fix the bug

The code below is supposed to fetch a list of products, then for each product fetch its details, and finally log all the details. It has **two bugs**. Find and fix them.

```js
document.getElementById('load-btn').addEventListener('click', (e) => {
  fetch('http://localhost:3000/products', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })
    .then(res => {
      res.json()  // bug 1
    })
    .then(products => {
      const requests = products.map(product =>
        fetch(`http://localhost:3000/products/${product.id}`)
      )
      return Promise.all(requests)
    })
    .then(responses => {
      return Promise.all(responses.map(r => r.json()))
    })
    .then(details => {
      console.log('All product details:', details)
    })
    .catch(err => {
      console.error(err.message)  // bug 2 — what if err has no message?
    })
})
```

Hint for bug 1: `.then()` chains only pass values forward if you **return** them.
Hint for bug 2: Think about what you should log to make sure you always see something useful, even if `err.message` is undefined.
