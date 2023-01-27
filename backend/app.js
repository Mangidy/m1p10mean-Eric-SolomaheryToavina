const express = require('express')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express()

async function start(port, routeAdmin, routeClient) {
    const uriBd = "mongodb://localhost:27017";
    //  const uriBd = "mongodb+srv://RicMongo:tNhwIIgEIAksjl4H@cluster0.pexx4dr.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(uriBd, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

    routeAdmin.sendDb(client)
    routeClient.sendDb(client)

    app.use(express.urlencoded({ extended: true }))
    app.use(express.json())
    app.use(session({
        secret: "garagesecreti",
        saveUninitialized: true,
        cookie: { maxAge: 1000 * 60 * 60 * 24 },
        resave: false
    }))
    app.use(cookieParser())

    // --------------------------------------------------------------------------------
    // ALL ADMIN MUST LOG IN TO CONTINUE
    // --------------------------------------------------------------------------------

    // GET REQUEST
    // API SHOW ADMIN CONNECTED
    // REQUIRED INFORMATION : NOTHING
    app.get("/admin/", routeAdmin.home)
    // --------------------------------------------------------------------------------

    // GET REQUEST
    // API ADMIN GET ALL CLIENT SUBSCRIBED
    // REQUIRED INFORMATION : NOTHING
    app.get("/admin/client", routeAdmin.client)
    // --------------------------------------------------------------------------------

    // GET REQUEST
    // API ADMIN GET ONE CLIENT SUBSCRIBED -- ID CAR
    // REQUIRED INFORMATION : ID CAR
    app.get("/admin/client/:id", routeAdmin.clientOne)
    // --------------------------------------------------------------------------------

    // GET REQUEST
    // API ADMIN GET ALL CAR ADDED IN THE GARAGE
    // REQUIRED INFORMATION : NOTHING
    app.get("/admin/car", routeAdmin.carList)
    // --------------------------------------------------------------------------------

    // GET REQUEST
    // API ADMIN GET ALL CAR RECEPTIONNED IN THE GARAGE
    // REQUIRED INFORMATION : NOTHING
    app.get("/admin/car/reception", routeAdmin.carReceptionList)
    // --------------------------------------------------------------------------------

    // GET REQUEST
    // API ADMIN GET ALL CAR 
    // REQUIRED INFORMATION : NOTHING
    app.get("/admin/car/reception/all", routeAdmin.carReceptionListAll)
    // --------------------------------------------------------------------------------

    // GET REQUEST
    // API ADMIN GET ALL CAR EXIT VOUCHER
    // REQUIRED INFORMATION : NOTHING
    app.get("/admin/car/sortie", routeAdmin.carOutList)
    // --------------------------------------------------------------------------------

    // GET REQUEST
    // API ADMIN GET ONE CAR ADDED IN THE GARAGE -- ID CAR
    // REQUIRED INFORMATION : ID CAR
    app.get("/admin/car/:id", routeAdmin.carOne)
    // --------------------------------------------------------------------------------

    // GET REQUEST
    // API ADMIN GET ALL INVOICE STATUT CLIENT 
    // SHOW IF CLIENT HAS OR DOES NOT HAVE AN INVOICE
    // REQUIRED INFORMATION : NOTHING
    app.get("/admin/facture", routeAdmin.facture)
    // --------------------------------------------------------------------------------

    // GET REQUEST
    // API ADMIN GET ALL INVOICE CLIENT WITH CONDITION -- TRUE OR FALSE VALUE
    // TRUE: VALIDATE THE INVOICE
    // FALSE : NOT ALREADY VALIDATE THE INVOICE 
    // REQUIRED INFORMATION : CONDITION VALUE
    app.get("/admin/facture/:valeur", routeAdmin.factureTF)
    // --------------------------------------------------------------------------------

    // POST REQUEST
    // API ADMIN ADD REPAIR LIST CAR -- CAR NUMBER
    // FOR ADMIN WHO HAS THE ROLE : 'ATELIER'
    // REQUIRED INFORMATION : ALL REPAIR LIST INFORMATION ON POST REQUEST AND CAR NUMBER
    app.post("/admin/car/reparation/:numero", routeAdmin.carreparation)
    // --------------------------------------------------------------------------------

    // POST REQUEST
    // API ADMIN ADD CAR INVOICE AFTER ADDING REPAIR LIST -- CAR ID
    // FOR ADMIN WHO HAS THE ROLE : 'ATELIER'
    // REQUIRED INFORMATION : ALL INVOICE INFORMATION ON POST REQUEST
    app.post("/admin/car/facture/:idVoiture", routeAdmin.carReceptionneFacture)
    // --------------------------------------------------------------------------------

    // POST REQUEST
    // API ADMIN SEARCH CAR
    // REQUIRED INFORMATION : cleSearch ON POST REQUEST
    app.post("/admin/car/search", routeAdmin.carSearchAdmin)
    // --------------------------------------------------------------------------------

    // POST REQUEST
    // API ADMIN SEARCH CLIENT
    // REQUIRED INFORMATION : cleSearch ON POST REQUEST
    app.post("/admin/client/search", routeAdmin.clientSearchAdmin)
    // --------------------------------------------------------------------------------

    // POST REQUEST
    // API INVOICE PAYMENT VALIDATION --  CAR ID = INVOICE ID
    // FOR ADMIN WHO HAS THE ROLE : 'FINANCIER'
    // REQUIRED INFORMATION : NOTHING ON POST REQUEST
    app.post("/admin/facture/validate/:id", routeAdmin.factureValidate)
    // --------------------------------------------------------------------------------

    // POST REQUEST
    // API ADMIN CAR EXIT VOUCHER -- CAR ID
    // FOR ADMIN WHO HAS THE ROLE : 'ATELIER'
    // REQUIRED INFORMATION : NOTHING ON POST REQUEST
    app.post("/admin/car/sortie/:idVoiture", routeAdmin.carOut)
    // --------------------------------------------------------------------------------

    // POST REQUEST
    // API ADMIN ADD NEW ADMIN
    // REQUIRED INFORMATION : usernameAdmin, passwordAdmin, roleAdmin ON POST REQUEST
    app.post("/admin/add", routeAdmin.add)
    // --------------------------------------------------------------------------------

    // POST REQUEST
    // API ADMIN LOGIN
    // REQUIRED INFORMATION : username, password ON POST REQUEST
    app.post("/admin/login", routeAdmin.login)
    // --------------------------------------------------------------------------------

    // POST REQUEST
    // API ADMIN LOGOUT
    // REQUIRED INFORMATION : NOTHING ON POST REQUEST
    app.post("/admin/logout", routeAdmin.logout)
    // --------------------------------------------------------------------------------

    // *********************************************************************************
    // *********************************************************************************

    // --------------------------------------------------------------------------------
    // ALL CLIENT MUST LOG IN TO CONTINUE
    // --------------------------------------------------------------------------------

    // GET REQUEST
    // API SHOW CLIENT CONNECTED
    // REQUIRED INFORMATION : NOTHING
    app.get("/client/", routeClient.home)
    // --------------------------------------------------------------------------------

    // GET REQUEST
    // API SHOW CLIENT NOTIFICATION & ACTIVITE FROM THE GARAGE
    // REQUIRED INFORMATION : NOTHING
    app.get("/client/notification", routeClient.notificationClient)
    // --------------------------------------------------------------------------------

    // GET REQUEST
    // API SHOW ALL CLIENT CAR DEPOSITED
    // REQUIRED INFORMATION : NOTHING
    app.get("/client/car", routeClient.carClient)
    // --------------------------------------------------------------------------------

    // GET REQUEST
    // API SHOW ONE CLIENT CAR BY HIS ID
    // REQUIRED INFORMATION : CAR ID
    app.get("/client/car/:id", routeClient.carOne)
    // --------------------------------------------------------------------------------

    // GET REQUEST
    // API SHOW ALL INVOICE CLIENT
    // REQUIRED INFORMATION : NOTHING
    app.get("/client/facture", routeClient.facture)
    // --------------------------------------------------------------------------------

    // GET REQUEST
    // API SHOW ONE INVOICE CLIENT BY HIS ID
    // REQUIRED INFORMATION : INVOICE ID = CAR ID
    app.get("/client/facture/:id", routeClient.factureId)
    // --------------------------------------------------------------------------------

    // GET REQUEST
    // API SHOW ALL CAR CLIENT RECEIVED OR NOT IN THE GARAGE
    // TRUE : CAR RECEIVED BY AN ADMIN
    // FALSE : CAR NOT ALREADY RECEIVED BY AN ADMIN
    // REQUIRED INFORMATION : TRUE OR FALSE VALUE
    app.get("/client/car/reception/:valeur", routeClient.carClientReception)
    // --------------------------------------------------------------------------------

    // POST REQUEST
    // API CLIENT SEARCH CAR CLIENT
    // REQUIRED INFORMATION : cleSearch ON POST REQUEST
    app.post("/client/car/search", routeClient.carSearch)
    // --------------------------------------------------------------------------------

    // POST REQUEST
    // API CLIENT ADD NEW CAR IN THE GARAGE
    // REQUIRED INFORMATION : numero, marque, modele, annee ON POST REQUEST
    app.post("/client/car", routeClient.car)
    // --------------------------------------------------------------------------------

    // POST REQUEST
    // API CLIENT VALIDATE THE INVOICE CAR
    // REQUIRED INFORMATION : CAR ID = INVOICE ID 
    app.post("/client/validate/:idVoiture", routeClient.validateCarFacture)
    // --------------------------------------------------------------------------------


    // POST REQUEST
    // API CLIENT FOR SUBSCRIBING
    // REQUIRED INFORMATION : username, password, nom, prenom, adress, phone, email
    app.post("/client/subscribe", routeClient.subscribe)
    // --------------------------------------------------------------------------------

    // POST REQUEST
    // API CLIENT FOR CLIENT LOGIN
    // REQUIRED INFORMATION : email, password
    app.post("/client/login", routeClient.login)
    // --------------------------------------------------------------------------------

    // POST REQUEST
    // API CLIENT LOGOUT
    // REQUIRED INFORMATION : NOTHING ON POST REQUEST
    app.post("/client/logout", routeClient.logout)
    // --------------------------------------------------------------------------------

    // 404 PAGE NOT FOUND
    app.use((req, res) => {
        res.send({ message: "API FOR GARAGE WEB : PAGE NOT FOUND" })
    })
    // --------------------------------------------------------------------------------

    app.listen(port, console.log(`Server running on port ${port}`))
}

exports.start = start