# Homework — Node + MySQL and the MVC Layers

> Based on: `13-node-mysql`

All exercises use a **new table**, `products` — not `customers`. Add it to your database first:

```sql
CREATE TABLE IF NOT EXISTS products (
  id    INT UNSIGNED NOT NULL AUTO_INCREMENT,
  sku   VARCHAR(30)  NOT NULL,
  name  VARCHAR(100) NOT NULL,
  price INT          NOT NULL,
  stock INT          NOT NULL DEFAULT 0,
  PRIMARY KEY (id),
  UNIQUE KEY uq_products_sku (sku)
);
```

Keep the same structure as the lesson: `src/models/`, `src/controllers/`, `src/routes/`, and the shared pool in `src/db/connection.ts`. Remember that imports in this project end with `.ts`.

---

## Exercise 1 — The Model layer
**Type:** Write

Create `src/models/products.ts`. Write a `Product` class in the same style as `Customer`:

1. Four private fields: `sku`, `name`, `price`, `stock`, assigned in the constructor.
2. An **instance** method `save()` that inserts a row and returns what `db.execute` returns.
3. A **static** method `find(id?: number)` that selects all products, or one product when an `id` is given.
4. Wrap every query in `try/catch`, call `logError('Product.save', error, { ... })` with useful context, and re-throw.

Answer in one sentence: why are `save` and `update` **instance** methods while `find` and `delete` are **static**?

```ts
import db from '../db/connection.ts'
import { logError } from '../utils/logger.ts'

export default class Product {
  // your code
}
```

---

## Exercise 2 — The Controller layer
**Type:** Fill in the blanks

Fill every `// ???` in `src/controllers/products.ts`. The controller talks to the model and returns **plain values** — it never touches `req` or `res`.

```ts
type Product = {
  sku: string
  name: string
  price: number
  stock: number
}

import productsModel from '../models/products.ts'
import { logError } from '../utils/logger.ts'

export const save = async (data: Product): Promise<number | null> => {
  try {
    const { /* ??? */ } = data
    const product = new productsModel(/* ??? */)
    const [res] = await product.save()
    return /* ??? return the new id, or null when nothing was inserted */
  } catch (error) {
    logError('controller.save', error, { data })
    /* ??? what must happen here so the route can answer with a 500? */
  }
}

export const find = async (id?: string): Promise<any> => {
  try {
    return await productsModel.find(/* ??? the id arrives as a string, the model expects a number */)
  } catch (error) {
    logError('controller.find', error, { id })
    throw error
  }
}
```

---

## Exercise 3 — Predict the result
**Type:** Predict the output

The `products` table contains three rows, with ids 1, 2 and 3. Read this code and write down what each `console.log` prints — then run it and compare.

```ts
import db from '../db/connection.ts'

const [rows] = await db.execute('select * from products where id = 99')
console.log(1, rows.length)

const [res] = await db.execute('update products set stock = 7 where id = 99')
console.log(2, res.affectedRows)

const [res2] = await db.execute("insert into products(sku, name, price, stock) values ('X1','Lamp',80,4)")
console.log(3, res2.affectedRows, res2.insertId)

const result = await db.execute('select * from products')
console.log(4, result.length)
```

Answer:

1. What does each of the four lines print?
2. Line 4 does **not** destructure. Why is its number so small, and what are the two items inside that array?
3. A `select` that matches nothing and an `update` that matches nothing — how does your code tell the difference between "found nothing" and "the query failed"?

---

## Exercise 4 — Fix the layering
**Type:** Fix the bug

A student wrote this router. It has **five** problems: some break MVC, and some break the way `mysql2` returns data.

```ts
import { Router } from 'express'
import db from '../db/connection.ts'
import { save } from '../controllers/products.ts'

const router: Router = Router()

router.get('/:id', async (req, res) => {
  const rows = await db.execute(`select * from products where id = ${req.params.id}`)
  res.send(rows)
})

router.post('/', (req, res) => {
  const insertId = save(req.body)
  res.send(`Product ${insertId} inserted!`)
})

export default router
```

1. Find all five problems and rewrite the file correctly.
2. Two of them are **architecture** problems — which layer is doing another layer's job in each case?
3. What exactly does the client receive from the `POST` route as written, and why?
4. The `GET` route never answers 404. Where in the lesson's structure is that decision made — model, controller or route?

---

## Exercise 5 — A new endpoint, through all three layers
**Type:** Write

Add `GET /products/low-stock`, which returns every product whose `stock` is below 10.

1. **Model:** a static method `findLowStock()` holding the SQL.
2. **Controller:** a function that calls the model and returns the rows.
3. **Route:** responds with the rows, or `404` when there are none, and `500` on an error.
4. Register the router in `src/index.ts` under `/products`.

Then answer:

- Your route file now has `/:id` and `/low-stock`. Does the order of the two `router.get` calls matter? What happens to a request for `/products/low-stock` if `/:id` is registered first?
- `sku` is `UNIQUE`. When someone posts a product with an existing sku, MySQL throws an error whose `code` is `ER_DUP_ENTRY`. Which layer should turn that into a **409** response, and why not the model?

---

### Submission

Submit your `models/products.ts`, `controllers/products.ts` and `routes/products.ts` files, plus your written answers for exercises 3, 4 and 5. If something failed, keep it with a comment describing the error you saw — the `logError` output is part of the answer.
