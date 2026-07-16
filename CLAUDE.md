# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repository is

Live teaching materials for the Fullstack GenAI course (Part A: Fullstack). Each numbered top-level directory is a course module, taught in order; subdirectories inside are individual lesson examples. Commits are made per lesson (`lesson N`). Code here is written *in front of students* and optimized for teaching, not production.

**Important:** Some code is intentionally imperfect for classroom demonstration — e.g. duplicate route handlers and double `res.send()` calls in `07-routing-and-middlewares/server.js` demonstrate middleware chaining pitfalls, and `06-client-server-e2e/server.js` has `err`/`error` naming bugs in catch blocks. Do not "fix" or refactor lesson code unless explicitly asked; it may break the lesson's point.

## Structure and how to run each module

There is no root `package.json`, no tests, and no linter anywhere. Each Node module (04–08) is fully self-contained: `cd` into it, `npm install`, then run. The `db/` JSON files are copied per module, not shared — modules never import from each other.

| Module | Type | Run |
|---|---|---|
| `01-html-css`, `02-javascript`, `03-vanilla-js` | Static HTML/CSS/JS | Open the lesson's `index.html` in a browser |
| `04-npm-modules-commonjs` | Node ESM basics (despite the dir name, it uses `"type": "module"`) | `npm run dev` (nodemon) or `npm start` |
| `05-server` | Minimal Express intro | `node app.js` — port 3000 |
| `06-client-server-e2e` | Express + CORS server with HTML/JS clients | `npm start` (server.js, port 3000); open `index.html` / `dashboard.html` directly in browser |
| `07-routing-and-middlewares` | Express Routers + middlewares | `npm start` (server.js, **port 4000**) |
| `08-authentication` | JWT + bcrypt auth | `node app.js` — port 3000; requires `.env` with `ACCESS_TOKEN_SECRET` (the demo `.env` is committed) |

## Architecture arc (modules 05 → 08)

The backend modules iterate on the same toy domain — `db/houses.json`, `db/politicians.json`, `db/roles.json` — read and written with `fs/promises` as a fake database:

- **06** is a single monolithic `server.js` with all CRUD routes inline (structured `console.log` objects per request are part of the lesson).
- **07** refactors the same domain into `routing/*.js` files that each default-export an Express `Router`, mounted in `server.js` via `app.use('/houses', housesRouter)` etc. Introduces `middlewares/` (auth, logger).
- **08** keeps the router layout and adds an auth flow: `isEmailExists` → `passwordEncryptor` (bcryptjs) → `/register` signs a JWT (60s expiry) and persists the user to `db/users.json`; `/login` verifies via `passwordDecriptor`.

## Conventions

- All Node code is ESM (`"type": "module"`); `__dirname` is reconstructed with `fileURLToPath(import.meta.url)` when needed, or file paths built with `new URL('./db/x.json', import.meta.url)`.
- Middlewares are default-exported `(req, res, next)` functions that pass data downstream via `res.locals` and wrap their body in `try/catch`.
- Every route handler wraps its body in `try/catch` and responds `res.status(500).send('Internal server error')` on failure.
- `homework.md` files inside lesson directories (see `07-routing-and-middlewares/homework.md`) are student assignments generated with the `/homework` skill, using Write / Predict / Fix / Fill exercise types that reference that lesson's actual code style.
