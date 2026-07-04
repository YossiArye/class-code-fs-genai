# Homework — Express Routing & Middlewares

> Based on: `07-routing-and-middlewares`

---

## Exercise 1 — Request Counter Middleware
**Type:** Write

Write a new middleware function called `requestId` (default export, same style as `middlewares/logger.js`) that:

1. Generates a random whole number between `1000` and `9999` and stores it in a variable called `id`.
2. Attaches it to `res.locals.requestId`.
3. Logs an object `{ message: 'Incoming request', requestId: id }` to the console.
4. Calls `next()`.
5. Wraps everything in a `try/catch`, logging the error in the `catch` block.

```js
// middlewares/requestId.js
export default (req, res, next) => {
    // your code here
}
```

Then answer, in one line each:
- How would you mount `requestId` so it runs on **every** route in the whole app?
- How would you mount it so it only runs for routes inside a single `Router` (e.g. `housesRouter`), without touching `server.js`?

---

## Exercise 2 — Two Routes, One Path
**Type:** Predict

Here is a small Express app with two handlers registered on the **same** path:

```js
app.post('/vault', (req, res, next) => {
    try {
        if (['111', '222'].includes(req.body.code)) {
            next()
        } else {
            res.send('Access Denied')
        }
    } catch (error) {
        res.status(500)
    }
})

app.post('/vault', (req, res) => {
    try {
        console.log('Opening the vault...')
        res.json({ secret: 'The gold is in the basement' })
    } catch (error) {
        res.status(500)
    }
})
```

For each request below, write down **what gets logged to the console** (if anything) and **what the client receives as the response body**:

1. `POST /vault` with body `{ "code": "111" }`
2. `POST /vault` with body `{ "code": "999" }`

---

## Exercise 3 — The Vault That Never Opens
**Type:** Fix

This route is supposed to let a request through when it carries a valid access code, then respond once. It's broken — find and fix **two separate bugs**.

```js
const requireCode = (req, res, next) => {
    try {
        if (['A1', 'B2'].includes(req.body.code)) {
            res.locals.access = 'granted'
        } else {
            res.locals.access = 'denied'
            res.status(401).send('Access denied')
        }
    } catch (error) {
        res.status(500)
    }
}

app.post('/vault', [requireCode], (req, res) => {
    try {
        res.send(res.locals)
        res.send(res.locals)
    } catch (error) {
        res.status(500)
    }
})
```

Write the corrected version and, in one sentence each, explain what each bug would actually do at runtime (what the client would experience for a request with a valid code).

---

## Exercise 4 — Members-Only Discount
**Type:** Fill

Complete the skeleton below so that `GET /:id` only computes a discount for members. `checkMembership` should read a `x-member` header: if it equals `"true"`, mark the request as a member and let it continue; otherwise, respond with `403` and stop the chain. `attachDiscount` should set a 20% discount for members and 0% for everyone else.

```js
import { Router } from 'express'

const router = Router()

const checkMembership = (req, res, next) => {
    if (req.headers['x-member'] === 'true') {
        res.locals.member = true
        // ??? (let the request continue to the next middleware)
    } else {
        res.locals.member = false
        // ??? (respond with 403 and a short message, and do NOT call next)
    }
}

const attachDiscount = (req, res, next) => {
    res.locals.discount = // ??? (20 if res.locals.member is true, otherwise 0)
    next()
}

router.get('/:id', // ??? (mount checkMembership and attachDiscount, in order, as the middleware for this route)
    (req, res) => {
        res.json({
            productId: // ??? (read the id from the route params)
            discount: res.locals.discount,
        })
    }
)

export default router
```

---

## Exercise 5 — Middleware Order Matters
**Type:** Predict

Given these two middlewares and a route that chains them:

```js
const stepOne = (req, res, next) => {
    res.locals.trail = 'start'
    next()
}

const stepTwo = (req, res, next) => {
    res.locals.trail = res.locals.trail + '-middle'
    res.locals.count = 2
    next()
}

app.get('/journey', [stepOne, stepTwo], (req, res) => {
    res.json(res.locals)
})
```

What JSON body does a client receive when it calls `GET /journey`? Then, answer: if you swapped the order to `[stepTwo, stepOne]`, would the response change — and why?
