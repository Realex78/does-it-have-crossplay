const express = require("express")
const app = express()
const port = 3000
const database = require("./docs/database.json")

app.use(express.static("docs"))

app.get("/database", (req, res) => {
    res.json(database)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})