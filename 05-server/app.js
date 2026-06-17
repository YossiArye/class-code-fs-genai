import express from "express"

const app = express()

app.use(express.json())

app.get("/", (req, res) => {
  try {
    res.status(200).send("Hello Express")
  } catch (error) {
    console.log(error.message)
    res.status(500).send('Internal Server Error')
  }
})

app.get("/hdvdvchdvcdvchdgv", (req, res) => {
  try {
    res.status(200).send("Hello David")
  } catch (error) {
    console.log(error.message)
    res.status(500).send('Internal Server Error')
  }
})

app.get("/admin/:id", (req, res) => {
  try {
    const userId = req.params.id
    const response = {
        userId,
        pinni: "Itanu"
    }
    res.status(200).json(response)
  } catch (error) {
    console.log(error.message)
    res.status(500).send('Internal Server Error')
  }
})


app.post("/", (req, res) => {
  try {
    const response = {
        data: req.body,
        message: 'Syccessfully handled request!'
    }
    res.status(200).json(response)
  } catch (error) {
    console.log(error.message)
    res.status(500).send('Internal Server Error')
  }
})

app.listen(3000, () => {
  console.log("Server is listening on port 3000")
})
