const express = require("express")
const path = require("path")

app = new express()

app.listen( 3000, () => {
    console.log("NodeJS started listening on port 3000")
    })

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/index.html"))
})