import { Router } from 'express'
import fs from "fs/promises"

import { fileURLToPath } from "url"
import path from "path"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const router = Router()


//http://localhost:4000/houses/
router.get("/", async (req, res) => {
  try {
    console.log({
      message: "Trying to fetch houses from the db",
      endpoint: "/houses",
    })
    const stringifyHouses = await fs.readFile(`${__dirname}/../db/houses.json`)

    const houses = JSON.parse(stringifyHouses)
    console.log({
      message: "Successfully fetched houses from the db",
      endpoint: "/houses",
      data: houses,
    })
    res.json(houses)
  } catch (err) {
    console.error({
      message: "Failed to fetch houses from the db",
      endpoint: "/houses",
      errorMsg: err.message,
    })
    res.status(500).send("Internal server error")
  }
})


export default router