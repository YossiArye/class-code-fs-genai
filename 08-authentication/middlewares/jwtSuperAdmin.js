import jwt from "jsonwebtoken"
import "dotenv/config"
import fs from "fs/promises"


const usersFilePath = new URL("../db/users.json", import.meta.url)

export default async (req, res, next) => {
  const token = req.headers.authorization

  if (!token) {
    return res.status(401).send('token missing')
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
    if (err) {
      console.log(err.message)
      return res.status(401).send(err.message)
    } else {
      const { email } = decoded
      const users = JSON.parse(await fs.readFile(usersFilePath))
      const user = users.find((user) => user.email === email)
      if(user && user.super_admin){
        next()
      }else{
        return res.status(401).send('User not authorized')
      }
    }
  })
}
