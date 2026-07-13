import jwt from "jsonwebtoken"
import "dotenv/config"
import fs from "fs/promises"


const usersFilePath = new URL("../db/users.json", import.meta.url)

export default async (req, res, next) => {
  const auth = req.headers.authorization

  const token = auth.split(" ")[1]

  if (!token) {
    return res.status(401)
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
    if (err) {
      console.log(err.message)
      return res.send(500)
    } else {
      const { firstName, lastName, email } = decoded
      const users = JSON.parse(await fs.readFile(usersFilePath))
      const user = users.find((user) => user.email === email && user.first_name === firstName && user.last_name === lastName)
      if(user){
        next()
      }else{
        return res.status(401)
      }
    }
  })
}
