let express = require('express')
let app = express()

console.log("Hello World")

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html")
})

// Add middleware to serve static assets
app.use("/public", express.static(__dirname + "/public"))

module.exports = app
