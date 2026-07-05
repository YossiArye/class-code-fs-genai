import { hash, genSalt } from "bcryptjs"



export default async(req, res, next) => {
    try {
        res.locals.salt = await genSalt()
        res.locals.hash = await hash(req.body.password, res.locals.salt)
        next()
    } catch (error) {
        console.log(error)
        res.status(500).send('Internal server error')
    }
}