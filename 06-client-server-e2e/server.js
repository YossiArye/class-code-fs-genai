import express from "express"
import fs from "fs/promises"
import cors from "cors"

import { fileURLToPath } from "url"
import path from "path"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
app.use(cors())
app.use(express.json())

app.get("/", async (req, res) => {
  try {
    const stringifyPoliticians = await fs.readFile(
      `${__dirname}/db/politicians.json`,
    )
    const politicians = JSON.parse(stringifyPoliticians)
    res.json(politicians)
  } catch (error) {
    console.error(error.message)
    res.status(500).send("Internal server error")
  }
})



app.get("/houses", async (req, res) => {
  try {
    console.log({
      message: "Trying to fetch houses from the db",
      endpoint: "/houses",
    })
    const stringifyHouses = await fs.readFile(`${__dirname}/db/houses.json`)

    const houses = JSON.parse(stringifyHouses)
    console.log({
      message: "Successfully fetched houses from the db",
      endpoint: "/houses",
      data: houses,
    })
    res.json(houses)
  } catch (error) {
    console.error({
      message: "Failed to fetch houses from the db",
      endpoint: "/houses",
      errorMsg: err.message,
    })
    res.status(500).send("Internal server error")
  }
})


app.put("/role/:id", async (req, res) => {
  try {
    const roleId = req.params.id
    console.log({
      message: "Trying to fetch roles from the db",
      endpoint: "/role/:id",
      roleId,
    })
    const stringifyRoles = await fs.readFile(`${__dirname}/db/roles.json`)

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

app.patch("/role/:id", async (req, res) => {
  try {
    const roleId = req.params.id
    console.log({
      message: "Trying to fetch roles from the db",
      endpoint: "/role/:id",
      roleId,
    })
    const stringifyRoles = await fs.readFile(`${__dirname}/db/roles.json`)

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

app.delete("/role/:id", async (req, res) => {
  try {
    const roleId = req.params.id
    console.log({
      message: "Trying to fetch roles from the db",
      endpoint: "/role/:id",
      roleId,
    })
    const stringifyRoles = await fs.readFile(`${__dirname}/db/roles.json`)

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


app.post("/bulk-politicians", async (req, res) => {
  try {
    console.log({
      message: "Trying to fetch politicians from the db",
      endpoint: "/bulk-politicians",
    })
    const stringifyPoliticians = await fs.readFile(
      `${__dirname}/db/politicians.json`,
    )
    const politicians = JSON.parse(stringifyPoliticians)
    console.log({
      message: "Successfully fetched politicians from the db",
      endpoint: "/bulk-politicians",
      data: politicians,
    })
    const usersFilter = req.body.map(Number)
    console.log(usersFilter)
    const response = politicians.filter((user) => usersFilter.includes(user.id))
    res.json(response)
  } catch (err) {
    console.error({
      message: "Failed to fetch politicians from the db",
      endpoint: "/bulk-politicians",
      errorMsg: err.message,
    })
    res.status(500).send("Internal server error")
  }
})

app.post("/bulk-roles", async (req, res) => {
  try {
    console.log({
      message: "Trying to fetch roles from the db",
      endpoint: "/bulk-roles",
    })
    const stringifyRoles = await fs.readFile(`${__dirname}/db/roles.json`)
    const roles = JSON.parse(stringifyRoles)
    console.log({
      message: "Successfully fetched roles from the db",
      endpoint: "/bulk-roles",
      data: roles,
    })
    const rolesFilter = req.body.map(Number)
    console.log(rolesFilter)
    const response = roles.filter((role) => rolesFilter.includes(role.id))
    res.json(response)
  } catch (err) {
    console.error({
      message: "Failed to fetch roles from the db",
      endpoint: "/bulk-roles",
      errorMsg: err.message,
    })
    res.status(500).send("Internal server error")
  }
})

app.listen(3000, () => {
  console.log("Server is listening on port 3000")
})
