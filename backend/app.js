const express = require('express')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const { MongoClient } = require('mongodb');

const app = express()
const uriBd = "mongodb://localhost:27017/"

const start = (port, route) => {
    MongoClient.connect(uriBd, { useUnifiedTopology: true })
        .then(client => {

            app.use(express.urlencoded({ extended: true }))
            app.use(express.json())
            app.use(session({
                secret: "garagesecreti",
                saveUninitialized: true,
                cookie: { maxAge: 1000 * 60 * 60 * 24 },
                resave: false
            }))
            app.use(cookieParser())

            app.get("/", route.home)

            app.listen(port, console.log(`Server running on port ${port}`))
        })
        .catch(error => console.error(error))
}

exports.start = start