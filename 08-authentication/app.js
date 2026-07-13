import 'dotenv/config'
import express from 'express'
import jwt from 'jsonwebtoken'
import fs from "fs/promises"



import passwordEncryptor from './middlewares/passwordEncryptor.js'
import isEmailExists from './middlewares/isEmailExists.js'
import passwordDecriptor from './middlewares/passwordDecriptor.js'
import housesRouter from './routing/houses.js'
import politiciansRouter from './routing/politicians.js'
import rolesRouter from './routing/roles.js'

const usersFilePath = new URL('./db/users.json', import.meta.url)

const app = express()


app.use(express.json())

app.use('/houses', housesRouter)
app.use('/politicians', politiciansRouter)
app.use('/roles', rolesRouter)

app.use(isEmailExists)


app.post('/register', passwordEncryptor, async (req, res) => {
    try {
        const users = res.locals.users
        const user = {
            ...req.body,
            hash: res.locals.hash
        }

        delete user.password

        

        const { first_name : firstName, last_name : lastName, email} = user

        jwt.sign(
            {firstName, lastName, email},
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '60s'},
            async (err, accessToken) => {
                if(err){
                    console.log(err.message)
                    throw new Error('Failed to have token')
                }else{
                    users.push(user)
                    await fs.writeFile(usersFilePath, JSON.stringify(users))
                    res.send({accessToken})
                }
            }
        )
    } catch (error) {
        console.log(error.message)
        res.status(500).send('Internal server error')
    }
})


app.post('/login', passwordDecriptor, (req, res) => {
    res.send("Login Successfully")
})

app.listen(3000, () => {
    console.log('Server is listening on port 3000')
})