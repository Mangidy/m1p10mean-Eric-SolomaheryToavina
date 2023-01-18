const express = require('express')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const { MongoClient } = require('mongodb');

const app = express()
const uriBd = "mongodb://localhost:27017/"

const start = (port, routeAdmin, routeClient) => {
    MongoClient.connect(uriBd, { useUnifiedTopology: true })
        .then(client => {
            const db = client.db('Garage')
            routeAdmin.sendDb(db)
            routeClient.sendDb(db)

            app.use(express.urlencoded({ extended: true }))
            app.use(express.json())
            app.use(session({
                secret: "garagesecreti",
                saveUninitialized: true,
                cookie: { maxAge: 1000 * 60 * 60 * 24 },
                resave: false
            }))
            app.use(cookieParser())

            app.get("/admin/", routeAdmin.home)
            app.get("/admin/client", routeAdmin.client)
            app.get("/admin/client/:id", routeAdmin.clientOne)
            app.get("/admin/car", routeAdmin.carList)
            app.get("/admin/facture", routeAdmin.facture)
            app.get("/admin/car/:id", routeAdmin.carOne)
            app.post("/admin/car/reparation/:numero", routeAdmin.carreparation)
            app.post("/admin/car/facture/:idVoiture", routeAdmin.carReceptionneFacture)
            app.post("/admin/facture/:id/validate", routeAdmin.factureValidate)
            app.post("/admin/add", routeAdmin.add)
            app.post("/admin/login", routeAdmin.login)
            app.post("/admin/logout", routeAdmin.logout)

            app.get("/client/", routeClient.home)
            app.get("/client/notification", routeClient.notificationClient)
            app.get("/client/car", routeClient.carClient)
            app.get("/client/car/:id", routeClient.carOne)
            app.get("/client/car/reception/:valeur", routeClient.carClientReception) // GET CAR USER RECEPTIONNED TRUE|FALSE
            app.get("/client/facture", routeClient.facture)
            app.get("/client/facture/:id", routeClient.factureId)
            app.post("/client/validate/:idVoiture", routeClient.validateCarFacture)
            app.post("/client/car", routeClient.car)
            app.post("/client/subscribe", routeClient.subscribe)
            app.post("/client/login", routeClient.login)
            app.post("/client/logout", routeClient.logout)

            app.use((req, res) => {
                res.send({ message: "PAGE NOT FOUND" })
            })

            app.listen(port, console.log(`Server running on port ${port}`))
        })
        .catch(error => console.error(error))
}

exports.start = start