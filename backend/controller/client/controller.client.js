const { ObjectID } = require("bson");

const HomeClient = (dataBase, req, res) => {
    if (req.session.clientId) {
        console.log(req.session.clientId);
        const CollectionDb = dataBase.collection('Client')
        CollectionDb.findOne({ "_id": new ObjectID(req.session.clientId) })
            .then(resultat => {
                res.send({ message: "USER CONNECTED", user: resultat })
            })
            .catch(err => {
                res.send({ message: "Request Error" })
            })
    } else {
        res.send({ message: "USER NOT CONNECTED" })
    }
}

const LoginClient = (dataBase, res, req, subStatus) => {
    const CollectionDb = dataBase.collection('Client')
    CollectionDb.findOne({ "phone": req.body.phone })
        .then(resultat => {
            if (resultat) {
                if (req.body.phone !== undefined) {
                    if (req.body.phone === resultat.phone && req.body.password === resultat.password) {
                        req.session.clientId = resultat._id
                        if (subStatus) {
                            res.send({ message: "SubScribe successfully" })
                        } else {
                            res.send({ message: "Loggin successfully" })
                        }
                    } else {
                        res.send({ message: "Login Failed", detailled: "invalid information" })
                    }
                } else {
                    res.send({ message: "Login Failed", detailled: "Phone invalid" })
                }
            } else {
                res.send({ message: "Login Failed", detailled: "invalid information" })
            }
        })
        .catch(err => {
            res.send({ message: "Request Error" })
        })
}

const SubScribeClient = (dataBase, res, req) => {
    const CollectionDb = dataBase.collection('Client')
    if (req.body.username !== undefined && req.body.password !== undefined && req.body.nom !== undefined && req.body.prenom !== undefined && req.body.adress !== undefined && req.body.phone !== undefined) {
        CollectionDb.insertOne(req.body)
            .then(resultat => {
                LoginClient(dataBase, res, req, true)
            })
            .catch(err => res.send({ message: "SubScribe Failed", detailled: "Invalid information" }))

    } else {
        res.send({ message: "SubScribe Failed", detailled: "Invalid information" })
    }
}

const LogoutClient = (res, req) => {
    req.session.destroy()
    res.send({ message: "Loggout successfully" })
}

exports.HomeClient = HomeClient
exports.SubScribeClient = SubScribeClient
exports.LoginClient = LoginClient
exports.LogoutClient = LogoutClient