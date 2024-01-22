const express = require("express")
const app = express()

app.set("view engine", "ejs")

var team1 = {
    name: "팀원",
    success: ["", "", ""]
}
var team2 = {
    name: "팀투",
    success: ["", "", ""]
}
var team3 = {
    name: "팀쓰리",
    success: ["", "", ""]
}

app.get("/", (req, res) => {
    res.render("indexPage", {
        team1: team1,
        team2: team2,
        team3: team3
    })
})

app.get("/mission1", (req, res) => {
    res.render("mission1", {

    })
})

app.post("/mission1", (req, res) => {
    
})

app.get("/mission2", (req, res) => {
    res.render("mission1", {
        
    })
})

app.post("/mission2", (req, res) => {
    
})

app.get("/mission3", (req, res) => {
    res.render("mission1", {
        
    })
})

app.post("/mission3", (req, res) => {
    
})

app.get("/final", (req, res) => {
    res.render("finalPage", {

    })
})

app.get("/final_success", (req, res) => {
    
})

app.get("/currentTemperature", (req, res) => {
    res.render("showCurrentTemp", {
        celsiusValue: 30,
        fahrenheitValue: 86
    })
})

app.listen(3000, () => {
    console.log("server started on port 3000");
})