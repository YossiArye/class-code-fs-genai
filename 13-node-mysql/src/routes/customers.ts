import { Router } from 'express'
import { logError } from '../utils/logger.ts'
import { deleteById, find, save, update } from '../controllers/customers.ts'

const router: Router = Router()

router.post('/', async (req, res) => {
  try {
    const insertId = await save(req.body)
    insertId
      ? res.send(`Customer ${insertId} inserted!`)
      : res.send('Nothing inserted!')
  } catch (error) {
    logError('route POST /customers', error, { body: req.body })
    if ((error as any)?.code === 'ER_DUP_ENTRY') {
      res.status(409).send('A customer with this email already exists')
      return
    }
    res.status(500).send('Internal Server Error')
  }
})

router.get('/:id', async (req, res) => {
  try {
    const [customer] = await find(req.params.id)
    customer.length ? res.send(customer) : res.sendStatus(404)
  } catch (error) {
    logError('route GET /customers/:id', error, { params: req.params })
    res.status(500).send('Internal Server Error')
  }
})

router.get('/', async (req, res) => {
  try {
    const [customer] = await find()
    customer.length ? res.send(customer) : res.sendStatus(404)
  } catch (error) {
    logError('route GET /customers', error, {})
    res.status(500).send('Internal Server Error')
  }
})

router.patch('/:id', async (req, res) => {
  try {
    const isUpdated = await update(req.params.id, req.body)
    isUpdated
      ? res.send(`Customer ${req.params.id} updated!`)
      : res.send('Nothing updated!')
  } catch (error) {
    logError('route PATCH /customers/:id', error, { params: req.params, body: req.body })
    if ((error as any)?.code === 'ER_DUP_ENTRY') {
      res.status(409).send('A customer with this email already exists')
      return
    }
    res.status(500).send('Internal Server Error')
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const isDeleted = await deleteById(req.params.id)
    isDeleted
      ? res.send(`Customer ${req.params.id} deleted!`)
      : res.send('Nothing deleted!')
  } catch (error) {
    logError('route DELETE /customers/:id', error, { params: req.params })
    res.status(500).send('Internal Server Error')
  }
})

export default router
