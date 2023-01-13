const express = require('express')

const app = express()
const uriBd = "mongodb://localhost:27017/"

const start = (port, route) => {
    app.use(express.urlencoded({ extended: true }))
    app.use(express.json())

    app.get("/", route.home)

    app.listen(port, console.log(`Server running on port ${port}`))
}

exports.start = start