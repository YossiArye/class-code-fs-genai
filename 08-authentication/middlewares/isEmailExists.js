import fs from "fs/promises"
const usersFilePath = new URL('../db/users.json', import.meta.url)

export default async (req, res, next) => {
    const users = JSON.parse(await fs.readFile(usersFilePath))

    const user = users.find(user => user.email === req.body.email)
    if(user && req.url === '/register'){
        return res.status(400).send('Email already exists')
    }
    if(!user && req.url === '/login'){
        return res.status(401).send('Email not exists')
    }
    res.locals.users = users
    res.locals.user = user
    next()
}