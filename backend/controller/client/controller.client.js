const { ObjectID } = require("bson");

const HomeClient = (dataBase, req, res) => {
    if (req.session.clientId) {
        const CollectionDb = dataBase.collection('Client')
        CollectionDb.findOne({ "_id": new ObjectID(req.session.clientId) })
            .then(resultat => {
                res.send({ message: "USER CONNECTED", user: resultat })
            })
            .catch(err => {
                res.send({ message: "REQUEST ERROR" })
            })
    } else {
        res.send({ message: "USER NOT CONNECTED" })
    }
}

const AddCarClient = (dataBase, req, res) => {
    if (req.session.clientId) {
        const CollectionDb = dataBase.collection('Client')
        CollectionDb.findOne({ "_id": new ObjectID(req.session.clientId) })
            .then(resultat => {
                const CollectionDbTwo = dataBase.collection('Voiture')
                if (req.body.numero !== undefined && req.body.marque !== undefined && req.body.modele !== undefined && req.body.annee !== undefined) {
                    CollectionDbTwo.findOne({ numero: req.body.numero, receptionne: false })
                        .then(resTwo => {
                            if (resTwo) {
                                res.send({ message: "REQUEST ERROR", detailled: "CAR ALREADY ADDED" })
                            } else {
                                req.body.user = resultat
                                dataCar = {
                                    numero: req.body.numero,
                                    marque: req.body.marque,
                                    modele: req.body.modele,
                                    annee: req.body.annee,
                                    receptionne: false,
                                    admin: {},
                                    user: req.body.user
                                }
                                CollectionDbTwo.insertOne(dataCar)
                                    .then(resFinal => {
                                        res.send({ message: "NEW CAR ADDED", user: req.body.user })
                                    })
                                    .catch(err => res.send({ message: "REQUEST ERROR", detailled: "INVALID INFORMATION" }))
                            }
                        }).catch(err => {
                            res.send({ message: "REQUEST ERROR" })
                        })
                } else {
                    res.send({ message: "REQUEST ERROR", detailled: "INVALID INFORMATION" })
                }
            })
            .catch(err => {
                res.send({ message: "REQUEST ERROR" })
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
                            res.send({ message: "SUBSCRIBE SUCCESSFULLY" })
                        } else {
                            res.send({ message: "LOGIN SUCCESSFULLY" })
                        }
                    } else {
                        res.send({ message: "LOGIN FAILED", detailled: "INVALID INFORMATION" })
                    }
                } else {
                    res.send({ message: "LOGIN FAILED", detailled: "PHONE INVALID" })
                }
            } else {
                res.send({ message: "LOGIN FAILED", detailled: "INVALID INFORMATION" })
            }
        })
        .catch(err => {
            res.send({ message: "REQUEST ERROR" })
        })
}

const SubScribeClient = (dataBase, res, req) => {
    const CollectionDb = dataBase.collection('Client')
    if (req.body.username !== undefined && req.body.password !== undefined && req.body.nom !== undefined && req.body.prenom !== undefined && req.body.adress !== undefined && req.body.phone !== undefined) {
        CollectionDb.insertOne(req.body)
            .then(resultat => {
                LoginClient(dataBase, res, req, true)
            })
            .catch(err => res.send({ message: "SUBSCRIBE FAILED", detailled: "INVALID INFORMATION" }))

    } else {
        res.send({ message: "SUBSCRIBE FAILED", detailled: "INVALID INFORMATION" })
    }
}

const LogoutClient = (res, req) => {
    req.session.destroy()
    res.send({ message: "LOGOUT SUCCESSFULLY" })
}

exports.HomeClient = HomeClient
exports.AddCarClient = AddCarClient

exports.SubScribeClient = SubScribeClient
exports.LoginClient = LoginClient
exports.LogoutClient = LogoutClient