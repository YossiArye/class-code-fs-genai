import 'dotenv/config'
import express from 'express'
import customers from './routes/customers.ts'

const port = +(process.env.APP_PORT || 4000)
const localhost = process.env.APP_HOSTNAME || 'localhost'


const app = express()

app.use(express.json())

app.use('/customers', customers)

app.use((req, res) =>
  res.status(404).send('Resource not found!')
)

app.listen(port, localhost, () => {
  console.log(`Server is started on http://${localhost}:${port}`)
})
