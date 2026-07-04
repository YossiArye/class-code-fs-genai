import express from "express"
import cors from "cors"

import { fileURLToPath } from "url"
import path from "path"


import housesRouter from './routing/houses.js'
import politiciansRouter from './routing/politicians.js'
import rolesRouter from './routing/roles.js'
import auth from './middlewares/auth.js'
import logger from './middlewares/logger.js'



const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
app.use(cors())
app.use(express.json())

//http://localhost:4000/politicians/



app.use('/houses', housesRouter)
app.use('/politicians', politiciansRouter)
app.use('/roles', rolesRouter)





app.get('/', (req, res) => {
    res.status(200).send('All Good!!')
})




app.post('/', [auth, logger], (req, res, next) => {
    try {
        res.send(res.locals)
        res.send(res.locals)
    } catch (error) {
        res.status(500)
    }
})

app.post('/classified', (req, res, next) => {
    try {
        if(['123', '456'].includes(req.body.password)){
            next()
        }else{
            res.send('Hello')
        }
    } catch (error) {
        res.status(500)
    }
})

app.post('/classified', (req, res) => {
    try {
        console.log('This is a very classified data, dont!!!')
        res.json({classified: 'We killed someone'})
    } catch (error) {
        res.status(500)
    }
})



app.listen(4000, () => {
  console.log("Server is listening on port 4000")
})
