const express = require("express")
const app = express()
const port = 3000
const database = require("./public/database.json")

app.use(express.static("public"))

app.get("/database", (req, res) => {
    res.json(database)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})