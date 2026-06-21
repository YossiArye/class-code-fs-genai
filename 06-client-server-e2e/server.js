import express from "express"
import fs from "fs/promises"
import cors from 'cors'

const app = express()
app.use(cors())
app.use(express.json())


app.get("/", async (req, res) => {
  try {
    const stringifyPoliticians = await fs.readFile("./db/politicians.json")
    const politicians = JSON.parse(stringifyPoliticians)
    res.json(politicians)
  } catch (error) {
    console.error(error.message)
    res.status(500).send("Internal server error")
  }
})

app.post("/bulk-users", async (req, res) => {
  try {
    const stringifyPoliticians = await fs.readFile("./db/politicians.json")
    const politicians = JSON.parse(stringifyPoliticians)
    const usersFilter = req.body.map(Number)
    console.log(usersFilter)
    const response = politicians.filter((user) => usersFilter.includes(user.id))
    res.json(response)
  } catch (error) {
    console.error(error.message)
    res.status(500).send("Internal server error")
  }
})

app.listen(3000, () => {
  console.log("Server is listening on port 3000")
})
