const { ObjectID } = require("bson");
const crypto = require('crypto')

const HomeClient = (dataBase, req, res) => {
    if (req.session.clientId) {
        const CollectionDb = dataBase.collection('Client')
        CollectionDb.findOne({ _id: new ObjectID(req.session.clientId) })
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

const GetCarClient = (dataBase, req, res) => {
    if (req.session.clientId) {
        const CollectionDbClient = dataBase.collection('Client')
        const CollectionDbVoiture = dataBase.collection('Voiture')

        CollectionDbClient.findOne({ _id: new ObjectID(req.session.clientId) })
            .then(resClient => {
                delete resClient._id
                delete resClient.password
                delete resClient.username
                delete resClient.dateSubscribe
                console.log(resClient);
                CollectionDbVoiture.find({ client: resClient }).toArray()
                    .then(resultatVoiture => {
                        res.send(resultatVoiture)
                    })
                    .catch(err => {
                        res.send({ message: "REQUEST ERROR" })
                    })
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
        CollectionClient.findOne({ _id: new ObjectID(req.session.clientId) })
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
                                delete req.body.user._id
                                delete req.body.user.dateSubscribe

                                dataCar = {
                                    numero: req.body.numero,
                                    marque: req.body.marque,
                                    modele: req.body.modele,
                                    annee: req.body.annee,
                                    receptionne: false,
                                    admin: {},
                                    client: req.body.user,
                                    reparation: {},
                                    dateDepot: new Date()
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
                                            dateDepot: dataCar.dateDepot
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
        CollectionClient.findOne({ _id: new ObjectID(req.session.clientId) })
            .then(resUser => {
                if (req.params.numero !== undefined) {
                    delete resUser.password
                    delete resUser.username

                    CollectionVoiture.findOne({ numero: req.params.numero, reparation: {} })
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
                                    res.send({ message: "REQUEST ERROR", detailled: "UPDATE FAILED" })
                                }
                            } else {
                                res.send({ message: "REQUEST ERROR", detailled: "INVALID CAR REPARATION INFORMATION" })
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

const LoginClient = (dataBase, res, req) => {
    const CollectionDb = dataBase.collection('Client')
    CollectionDb.findOne({ phone: req.body.phone })
        .then(resultat => {
            if (resultat) {
                if (req.body.phone !== undefined) {
                    let hashPassword = crypto.createHash('md5').update(req.body.password).digest("hex")
                    if (resultat.phone === req.body.phone && resultat.password === hashPassword) {
                        req.session.clientId = resultat._id
                        res.send({ message: "LOGIN SUCCESSFULLY" })
                    } else {
                        res.send({ message: "LOGIN FAILED", detailled: "PHONE OR PASSWORD INVALID" })
                    }
                } else {
                    res.send({ message: "LOGIN FAILED", detailled: "PHONE INVALID" })
                }
            } else {
                res.send({ message: "LOGIN FAILED", detailled: "INFORMATION NOT FOUND" })
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
        let hashPassword = crypto.createHash('md5').update(req.body.password).digest("hex")
        req.body.password = hashPassword
        CollectionDb.findOne({ phone: req.body.phone })
            .then(resUser => {
                if (resUser) {
                    res.send({ message: "SUBSCRIBE FAILED", detailled: "PHONE ALREADY USED" })
                } else {
                    CollectionDb.insertOne(req.body)
                        .then(resultat => {
                            res.send({ message: "SUBSCRIBE SUCCESSFULLY" })
                        })
                        .catch(err => res.send({ message: "SUBSCRIBE FAILED", detailled: "INVALID INFORMATION" }))
                }
            })
            .catch(err => res.send({ message: "SUBSCRIBE FAILED", detailled: "TRAITEMENT FAILED" }))

    } else {
        res.send({ message: "SUBSCRIBE FAILED", detailled: "INVALID INFORMATION" })
    }
}

const LogoutClient = (res, req) => {
    req.session.destroy()
    res.send({ message: "LOGOUT SUCCESSFULLY" })
}

exports.HomeClient = HomeClient
exports.GetCarClient = GetCarClient
exports.AddCarClient = AddCarClient
exports.AddCarReparation = AddCarReparation

exports.SubScribeClient = SubScribeClient
exports.LoginClient = LoginClient
exports.LogoutClient = LogoutClient