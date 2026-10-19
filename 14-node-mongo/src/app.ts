import 'dotenv/config'
import express, { type Request, type RequestHandler } from 'express'
import mongoose from 'mongoose'
import { createCourseController } from './controllers/course.ts'
import { NotFoundError, ValidationError } from './errors.ts'
import { courseRepository } from './models/course.ts'

const port = +(process.env.PORT || 3000)
const host = process.env.HOST || '0.0.0.0'
const mongoUri = process.env.MONGO_URI

if (!mongoUri) throw new Error('MONGO_URI is not defined')

// Wiring: the only place that knows which model is plugged into the controller
const courseController = createCourseController(courseRepository)

const app = express()

app.use(express.json())

const idOf = (req: Request) => String(req.params.id)

// Maps controller results/errors to HTTP
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

app.post('/courses', handle(req => courseController.save(req.body), 201))
app.get('/courses', handle(() => courseController.find()))
app.get('/courses/:id', handle(req => courseController.findById(idOf(req))))
app.put('/courses/:id', handle(req => courseController.update(idOf(req), req.body)))
app.delete('/courses/:id', handle(req => courseController.delete(idOf(req))))

app.use((_req, res) =>
  res.status(404).send('Resource not found!')
)

await mongoose.connect(mongoUri)
console.log('Connected to MongoDB')

app.listen(port, host, () => {
  console.log(`Server is started on ${host}:${port}`)
})
