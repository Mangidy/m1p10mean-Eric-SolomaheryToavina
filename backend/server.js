const express = require('express')
const app = express()

app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', function (req, res) {
    res.send("Initalized")
})

app.listen(3000, function () {
    console.log("Serveur running !!");
})
