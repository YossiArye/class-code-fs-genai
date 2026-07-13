import { Router } from 'express'
import fs from "fs/promises"



import { fileURLToPath } from "url"
import path from "path"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)


import jwtMW from '../middlewares/jwtMW.js'

const router = Router()

//http://localhost:4000/roles/bulk
router.post("/bulk", async (req, res) => {
  try {
    console.log({
      message: "Trying to fetch roles from the db",
      endpoint: "/bulk",
    })
    const stringifyRoles = await fs.readFile(`${__dirname}/../db/roles.json`)
    const roles = JSON.parse(stringifyRoles)
    console.log({
      message: "Successfully fetched roles from the db",
      endpoint: "/bulk",
      data: roles,
    })
    const rolesFilter = req.body.map(Number)
    console.log(rolesFilter)
    const response = roles.filter((role) => rolesFilter.includes(role.id))
    res.json(response)
  } catch (err) {
    console.error({
      message: "Failed to fetch roles from the db",
      endpoint: "/bulk",
      errorMsg: err.message,
    })
    res.status(500).send("Internal server error")
  }
})

router.put("/:id", async (req, res) => {
  try {
    const roleId = req.params.id
    console.log({
      message: "Trying to fetch roles from the db",
      endpoint: "/role/:id",
      roleId,
    })
    const stringifyRoles = await fs.readFile(`${__dirname}/../db/roles.json`)

    const roles = JSON.parse(stringifyRoles)
    console.log({
      message: "Successfully fetched roles from the db",
      endpoint: "/role/:id",
      data: roles,
    })
    const role = roles.find((role) => role.id == roleId)
    if (!role) {
      return res.status(404).send("Role not found")
    }
    // console.log({
    //   message: "Trying to send a specific role to the client",
    //   endpoint: "/role/:id",
    //   role,
    // })

    const newRoles = roles.map((item) =>
      item.id == role.id
        ? {
            id: role.id,
            ...req.body,
          }
        : item,
    )

    await fs.writeFile(
      `${__dirname}/db/roles.json`,
      JSON.stringify(newRoles, null, 2),
    )
    res.json(newRoles)
  } catch (error) {
    console.error({
      message: "Failed to fetch roles from the db",
      endpoint: "/role/:id",
      errorMsg: err.message,
    })
    res.status(500).send("Internal server error")
  }
})

router.patch("/:id", async (req, res) => {
  try {
    const roleId = req.params.id
    console.log({
      message: "Trying to fetch roles from the db",
      endpoint: "/role/:id",
      roleId,
    })
    const stringifyRoles = await fs.readFile(`${__dirname}/../db/roles.json`)

    const roles = JSON.parse(stringifyRoles)
    console.log({
      message: "Successfully fetched roles from the db",
      endpoint: "/role/:id",
      data: roles,
    })
    const role = roles.find((role) => role.id == roleId)
    if (!role) {
      return res.status(404).send("Role not found")
    }
    // console.log({
    //   message: "Trying to send a specific role to the client",
    //   endpoint: "/role/:id",
    //   role,
    // })

    const newRoles = roles.map((item) =>
      item.id == role.id
        ? {
            ...role,
            ...req.body,
          }
        : item,
    )

    await fs.writeFile(
      `${__dirname}/../db/roles.json`,
      JSON.stringify(newRoles, null, 2),
    )
    res.json(newRoles)
  } catch (error) {
    console.error({
      message: "Failed to fetch roles from the db",
      endpoint: "/role/:id",
      errorMsg: err.message,
    })
    res.status(500).send("Internal server error")
  }
})

//http://localhost:4000/roles/bulk
router.delete("/:id", jwtMW, async (req, res) => {
  try {
    const roleId = req.params.id
    console.log({
      message: "Trying to fetch roles from the db",
      endpoint: "/role/:id",
      roleId,
    })
    const stringifyRoles = await fs.readFile(`${__dirname}/../db/roles.json`)

    const roles = JSON.parse(stringifyRoles)
    console.log({
      message: "Successfully fetched roles from the db",
      endpoint: "/role/:id",
      data: roles,
    })
    const role = roles.find((role) => role.id == roleId)
    if (!role) {
      return res.status(404).send("Role not found")
    }
    // console.log({
    //   message: "Trying to send a specific role to the client",
    //   endpoint: "/role/:id",
    //   role,
    // })

    const newRoles = roles.filter((item) =>
      item.id !== role.id
    )

    await fs.writeFile(
      `${__dirname}/../db/roles.json`,
      JSON.stringify(newRoles, null, 2),
    )
    res.json(newRoles)
  } catch (error) {
    console.error({
      message: "Failed to fetch roles from the db",
      endpoint: "/role/:id",
      errorMsg: err.message,
    })
    res.status(500).send("Internal server error")
  }
})



export default router