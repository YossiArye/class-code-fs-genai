import { Router } from 'express'
import fs from "fs/promises"

import { fileURLToPath } from "url"
import path from "path"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const router = Router()

//http://localhost:4000/politicians/
router.get("/", async (req, res) => {
  try {
    const stringifyPoliticians = await fs.readFile(
      `${__dirname}/../db/politicians.json`,
    )
    const politicians = JSON.parse(stringifyPoliticians)
    res.json(politicians)
  } catch (error) {
    console.error(error.message)
    res.status(500).send("Internal server error")
  }
})

//http://localhost:4000/politicians/bulk
router.post("/bulk", async (req, res) => {
  try {
    console.log({
      message: "Trying to fetch politicians from the db",
      endpoint: "/bulk",
    })
    const stringifyPoliticians = await fs.readFile(
      `${__dirname}/../db/politicians.json`,
    )
    const politicians = JSON.parse(stringifyPoliticians)
    console.log({
      message: "Successfully fetched politicians from the db",
      endpoint: "/bulk",
      data: politicians,
    })
    const usersFilter = req.body.map(Number)
    console.log(usersFilter)
    const response = politicians.filter((user) => usersFilter.includes(user.id))
    res.json(response)
  } catch (err) {
    console.error({
      message: "Failed to fetch politicians from the db",
      endpoint: "/bulk",
      errorMsg: err.message,
    })
    res.status(500).send("Internal server error")
  }
})


export default router