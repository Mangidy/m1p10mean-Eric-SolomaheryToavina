const express = require('express')
const { MongoClient } = require('mongodb');

const app = express()
const uriBd = "mongodb://localhost:27017/"

const start = (port, route) => {
    MongoClient.connect(uriBd, { useUnifiedTopology: true })
        .then(client => {
            console.log("DB Connected");

            app.use(express.urlencoded({ extended: true }))
            app.use(express.json())

            app.get("/", route.home)

            app.listen(port, console.log(`Server running on port ${port}`))
        })
        .catch(error => console.error(error))
}

exports.start = start