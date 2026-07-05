import express from 'express'
import fs from "fs/promises"
import passwordEncryptor from './middlewares/passwordEncryptor.js'


const app = express()

app.use(express.json())


app.post('/register', passwordEncryptor, async (req, res, next) => {
    try {

        const users =  JSON.parse(await fs.readFile(`${process.cwd()}/db/users.json`))

        const isExists = users.find(user => user.email === req.body.email)


        if(isExists){
            return res.status(400).send('Email already exists')
        }

        const user = {
            ...req.body,
            hash: res.locals.hash
        }

        delete user.password

        users.push(user)
        await fs.writeFile(`${process.cwd()}/db/users.json`, JSON.stringify(users))

        res.send(user)
    } catch (error) {
        console.log(error)
        res.status(500).send('Internal server error')
    }
})

app.listen(3000, () => {
    console.log('Server is listening on port 3000')
})