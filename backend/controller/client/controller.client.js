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
        const CollectionClient = dataBase.collection('Client')
        CollectionClient.findOne({ "_id": new ObjectID(req.session.clientId) })
            .then(resultat => {
                const CollectionVoiture = dataBase.collection('Voiture')
                if (req.body.numero !== undefined && req.body.marque !== undefined && req.body.modele !== undefined && req.body.annee !== undefined) {
                    CollectionVoiture.findOne({ numero: req.body.numero, receptionne: false })
                        .then(resTwo => {
                            if (resTwo) {
                                res.send({ message: "REQUEST ERROR", detailled: "CAR ALREADY ADDED" })
                            } else {
                                req.body.user = resultat

                                delete req.body.user.password
                                delete req.body.user.username

                                dataCar = {
                                    numero: req.body.numero,
                                    marque: req.body.marque,
                                    modele: req.body.modele,
                                    annee: req.body.annee,
                                    receptionne: false,
                                    dataDepot: new Date(),
                                    admin: {},
                                    client: req.body.user
                                }

                                CollectionVoiture.insertOne(dataCar)
                                    .then(resFinal => {
                                        dataActivite = {
                                            activite: "DEPOT VOITURE",
                                            client: req.body.user,
                                            voiture: {
                                                numero: req.body.numero,
                                                marque: req.body.marque,
                                                modele: req.body.modele,
                                                annee: req.body.annee,
                                            },
                                            dataDepot: dataCar.dataDepot
                                        }
                                        const CollectionActivite = dataBase.collection('Activite')
                                        CollectionActivite.insertOne(dataActivite)
                                            .then(resActivite => {
                                                res.send({ message: "NEW CAR ADDED", client: req.body.user })
                                            })
                                            .catch(errActivte => res.send({ message: "REQUEST ERROR", detailled: "INVALID INFORMATION" }))
                                    })
                                    .catch(err => res.send({ message: "REQUEST ERROR", detailled: "INVALID INFORMATION" }))
                            }
                        }).catch(err => {
                            res.send({ message: "REQUEST ERROR VOITURE" })
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


const AddCarReparation = (dataBase, req, res) => {
    if (req.session.clientId) {
        const CollectionClient = dataBase.collection('Client')
        const CollectionVoiture = dataBase.collection('Voiture')
        CollectionClient.findOne({ "_id": new ObjectID(req.session.clientId) })
            .then(resUser => {
                if (req.params.numero !== undefined) {
                    delete resUser.password
                    delete resUser.username

                    CollectionVoiture.findOne({ "numero": req.params.numero, client: resUser, reparation: null })
                        .then(resCar => {
                            if (resCar) {
                                resCar.reparation = req.body
                                newValeurReparation = resCar
                                const updateDoc = {
                                    $set: { reparation: req.body }
                                };
                                const options = { upsert: true };
                                try {
                                    CollectionVoiture.updateOne({ _id: newValeurReparation._id }, updateDoc, options)
                                        .then(resF => res.send({ message: "CAR REPARATION ADDED" }))
                                        .catch(errF => res.send({ message: "REQUEST ERROR", detailled: "UPDATE FAILED" }))
                                } catch (error) {
                                    console.log(error);
                                }
                            } else {
                                res.send({ message: "REQUEST ERROR", detailled: "INVALID CAR REPARATION" })
                            }
                        })
                        .catch(err => res.send({ message: "REQUEST ERROR", detailled: "INVALID CAR REPARATION", err: err }))
                } else {
                    res.send({ message: "REQUEST ERROR", detailled: "NUMBER CAR INVALID" })
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
        req.body.dateSubscribe = new Date()
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
exports.AddCarReparation = AddCarReparation

exports.SubScribeClient = SubScribeClient
exports.LoginClient = LoginClient
exports.LogoutClient = LogoutClient