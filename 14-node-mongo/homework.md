# Homework — MVC with Node.js and MongoDB

> Based on: /Users/yossiarye/projects/workspace-class/class-code-fs-genai/14-node-mongo

In class we built `Course` with a schema, a model/repository, a controller and the Express view. In this homework the domain is a **book store** — same ideas, different names.

---

## Exercise 1 — Book schema
**Type:** Fill

Complete the interface and the Mongoose schema for a book. Rules: `title` and `author` are strings, `pages` is a number between 1 and 5000, `genres` is an array of strings, `addedAt` defaults to the current date, and `isAvailable` is a boolean.

```ts
// interfaces/book.ts
export interface IBook {
  title: string
  author: string
  pages: number
  genres: ???          // ???
  addedAt?: Date
  isAvailable: boolean
}

// schemas/book.ts
import { Schema } from 'mongoose'
import ??? { IBook } from '../interfaces/book.ts'   // ???

export const bookSchema = new Schema<IBook>({
  title: String,
  author: String,
  pages: { type: Number, ???: 1, ???: 5000 },        // ???
  genres: ???,                                        // ???
  addedAt: { type: Date, ???: Date.now },             // ???
  isAvailable: Boolean,
})
```

---

## Exercise 2 — Which status code?
**Type:** Predict

Look at the controller and the `handle` wrapper (same shape as in class). The repository is a fake one that always returns `null` for `findById`.

```ts
const fakeRepository = {
  findById: async (id: string) => null,
}

const bookController = {
  async findById(id: string) {
    const book = await fakeRepository.findById(id)
    if (!book) throw new NotFoundError(`Book ${id} not found`)
    return book
  },
}

const handle = (action: (req: Request) => Promise<unknown>, status = 200): RequestHandler =>
  async (req, res) => {
    try {
      res.status(status).json(await action(req))
    } catch (error) {
      if (error instanceof ValidationError) return void res.status(400).send(error.message)
      if (error instanceof NotFoundError) return void res.status(404).send(error.message)
      console.error(error)
      res.status(500).send('Internal server error')
    }
  }

app.get('/books/:id', handle(req => bookController.findById(String(req.params.id))))
```

1. What status code and body does the client get for `GET /books/42`?
2. What would the client get if the controller threw `new Error('boom')` instead? Does anything get printed in the server terminal?
3. What would happen if `ValidationError` and `NotFoundError` were both removed from `handle`?

---

## Exercise 3 — Find the bugs
**Type:** Fix

This repository has **three** bugs (one makes TypeScript fail with `verbatimModuleSyntax` enabled, one makes `findById` return garbage instead of the book, and one lets a malformed id like `abc` crash instead of returning "not found"). Find and fix them.

```ts
import { model, isValidObjectId } from 'mongoose'
import { IBook } from '../interfaces/book.ts'
import { bookSchema } from '../schemas/book.ts'

export const Book = model<IBook>('Book', bookSchema)

export const bookRepository = {
  async findById(id: string) {
    const doc = Book.findById(id)
    return doc && { id: doc.id, title: doc.title }
  },

  async delete(id: string) {
    const doc = await Book.findByIdAndDelete(id)
    return doc && { id: doc.id, title: doc.title }
  },
}
```

---

## Exercise 4 — A repository without a database
**Type:** Write

The controller only knows this interface:

```ts
export type SavedBook = IBook & { id: string }

export interface IBookRepository {
  save(book: IBook): Promise<SavedBook>
  find(): Promise<SavedBook[]>
  findById(id: string): Promise<SavedBook | null>
}
```

Write `inMemoryBookRepository` that implements `IBookRepository` using a plain array (no Mongoose). Generate ids with a counter. Then answer in one sentence: which files would you need to change to use it instead of Mongoose — and which files stay exactly the same?

---

## Exercise 5 — A new endpoint through all layers
**Type:** Write

Add `GET /books?author=Tolkien` that returns only the books of that author. Write the code for each layer:

1. Add `findByAuthor(author: string): Promise<SavedBook[]>` to the repository interface.
2. Implement it in the Mongoose repository (hint: `Book.find({ author })`).
3. Add `findByAuthor` to the controller. It should throw a `ValidationError('author is required')` if `author` is not a non-empty string.
4. Add the route in `app.ts` using `handle(...)`. Read the value from `req.query.author`.

Test it in Postman and write down the status code you get when you send `GET /books?author=` (empty author).
