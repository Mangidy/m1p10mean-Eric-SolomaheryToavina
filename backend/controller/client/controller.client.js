const { ObjectID } = require("bson");
const crypto = require('crypto')
const outil = require('../../modele/outil')

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

const NotificationClient = (dataBase, req, res) => {
    if (req.session.clientId) {
        const CollectionDb = dataBase.collection('Client')
        const CollectionDbNotificationClient = dataBase.collection('NotificationClient')
        CollectionDb.findOne({ _id: new ObjectID(req.session.clientId) })
            .then(resUser => {
                delete resUser._id
                delete resUser.password
                delete resUser.username
                delete resUser.dateSubscribe
                CollectionDbNotificationClient.find({ client: resUser }).toArray()
                    .then(resNotif => {
                        if (resNotif) {
                            res.send(resNotif)
                        } else {
                            res.send({ message: "Aucune notification pour le moment" })
                        }
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
                CollectionDbVoiture.find({ client: resClient }).toArray()
                    .then(resultatVoiture => {
                        valeurAffiche = outil.TriageDataCar(resultatVoiture)
                        res.send(valeurAffiche)
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

const GetCarOne = (dataBase, req, res) => {
    if (req.session.clientId) {
        const CollectionDbClient = dataBase.collection('Client')
        const CollectionDbVoiture = dataBase.collection('Voiture')
        CollectionDbClient.findOne({ _id: new ObjectID(req.session.clientId) })
            .then(resClient => {
                delete resClient._id
                delete resClient.password
                delete resClient.username
                delete resClient.dateSubscribe
                CollectionDbVoiture.findOne({
                    $and: [
                        { _id: new ObjectID(req.params.id) },
                        { client: resClient },
                    ]
                })
                    .then(resultatVoiture => {
                        valeurAffiche = outil.TriageDataCarOne(resultatVoiture)
                        res.send(valeurAffiche)
                    })
                    .catch(err => {
                        res.send({ message: "REQUEST ERROR", detailled: "TRAITEMENT ERROR" })
                    })
            })
            .catch(err => {
                res.send({ message: "REQUEST ERROR", detailled: "INVALID SESSION USER" })
            })
    } else {
        res.send({ message: "USER NOT CONNECTED" })
    }
}


const GetFactureClient = (dataBase, req, res) => {
    if (req.session.clientId) {
        const CollectionDbClient = dataBase.collection('Client')
        const CollectionDbVoiture = dataBase.collection('Voiture')
        CollectionDbClient.findOne({ _id: new ObjectID(req.session.clientId) })
            .then(resClient => {
                delete resClient._id
                delete resClient.password
                delete resClient.username
                delete resClient.dateSubscribe
                CollectionDbVoiture.find({ client: resClient }).toArray()
                    .then(resultatVoiture => {
                        valeurAffiche = outil.TriageDataFacture(resultatVoiture)
                        res.send(valeurAffiche)
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


const GetFactureIdClient = (dataBase, req, res) => {
    if (req.session.clientId) {
        const CollectionDbClient = dataBase.collection('Client')
        const CollectionDbVoiture = dataBase.collection('Voiture')
        CollectionDbClient.findOne({ _id: new ObjectID(req.session.clientId) })
            .then(resClient => {
                delete resClient._id
                delete resClient.password
                delete resClient.username
                delete resClient.dateSubscribe
                if (req.params.id !== undefined) {
                    CollectionDbVoiture.findOne({ $and: [{ _id: new ObjectID(req.params.id) }, { client: resClient }] })
                        .then(resultatVoiture => {
                            valeurAffiche = outil.TriageDataFactureOne(resultatVoiture)
                            res.send(valeurAffiche)
                        })
                        .catch(err => {
                            res.send({ message: "REQUEST ERROR" })
                        })
                } else {
                    res.send({ message: "REQUEST ERROR", detailled: "FACTURE NOT FOUND" })
                }
            })
            .catch(err => {
                res.send({ message: "REQUEST ERROR" })
            })
    } else {
        res.send({ message: "USER NOT CONNECTED" })
    }
}



const GetCarClientReception = (dataBase, req, res) => {
    if (req.session.clientId) {
        const CollectionDbClient = dataBase.collection('Client')
        const CollectionDbVoiture = dataBase.collection('Voiture')
        CollectionDbClient.findOne({ _id: new ObjectID(req.session.clientId) })
            .then(resClient => {
                delete resClient._id
                delete resClient.password
                delete resClient.username
                delete resClient.dateSubscribe
                CollectionDbVoiture.find({ client: resClient }).toArray()
                    .then(resultatVoiture => {
                        if (req.params.valeur === undefined) {
                            res.send({ message: "REQUEST ERROR", detailled: "INVALID INFORMATION" })
                        } else {
                            valeurAffiche = outil.TriageDataReceptionne(resultatVoiture, JSON.parse(req.params.valeur))
                            res.send(valeurAffiche)
                        }
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
exports.NotificationClient = NotificationClient
exports.GetCarClient = GetCarClient
exports.GetCarOne = GetCarOne
exports.GetFactureClient = GetFactureClient
exports.GetFactureIdClient = GetFactureIdClient
exports.GetCarClientReception = GetCarClientReception
exports.AddCarClient = AddCarClient

exports.SubScribeClient = SubScribeClient
exports.LoginClient = LoginClient
exports.LogoutClient = LogoutClient