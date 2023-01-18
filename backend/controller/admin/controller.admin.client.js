const { ObjectID } = require("bson")
const crypto = require('crypto')
const outil = require('../../modele/outil')

const HomeAdmin = (dataBase, req, res) => {
    const CollectionDb = dataBase.collection('Admin')
    CollectionDb.findOne({ _id: new ObjectID(req.session.usernameAdmin) })
        .then(resultat => {
            res.send({ message: "ADMIN CONNECTED", admin: resultat })
        })
        .catch(err => {
            res.send({ message: "REQUEST ERROR" })
        })
}

const getAllClient = (dataBase, res) => {
    const CollectionDb = dataBase.collection('Client')
    CollectionDb.find().toArray()
        .then(resultat => {
            res.send(resultat)
        })
        .catch(err => {
            res.send({ message: "REQUEST ERROR" })
        })
}

const getOneClient = (dataBase, res, req) => {
    if (req.params.id !== undefined) {
        const CollectionDb = dataBase.collection('Client')
        try {
            CollectionDb.findOne({ _id: new ObjectID(req.params.id) })
                .then(resultat => {
                    res.send(resultat)
                })
                .catch(err => {
                    res.send({ message: "REQUEST ERROR" })
                })
        } catch (error) {
            res.send({ message: "REQUEST ERROR", detailled: "INVALID INFORMATION" })
        }
    } else {
        res.send({ message: "REQUEST ERROR", detailled: "INVALID INFORMATION" })
    }
}

const getAllCar = (dataBase, res) => {
    const CollectionDb = dataBase.collection('Voiture')
    CollectionDb.find().toArray()
        .then(resultat => {
            resAffiche = outil.TriageDataCarAdmin(resultat)
            res.send(resAffiche)
        })
        .catch(err => {
            res.send({ message: "REQUEST ERROR" })
        })
}

const getAllFacture = (dataBase, res) => {
    const CollectionDb = dataBase.collection('Voiture')
    CollectionDb.find({ receptionne: true }).toArray()
        .then(resFacture => {
            resAffiche = outil.TriageDataFactureAdmin(resFacture)
            res.send(resAffiche)
        })
        .catch(err => {
            res.send({ message: "REQUEST ERROR" })
        })
}

const ValidFacture = (dataBase, res, req) => {
    const CollectionDb = dataBase.collection('Admin')
    CollectionDb.findOne({ _id: new ObjectID(req.session.usernameAdmin) })
        .then(resAdmin => {
            if (resAdmin.roleAdmin === "FINANCIER") {
                const CollectionDbVoiture = dataBase.collection('Voiture')
                if (req.params.id !== undefined) {
                    CollectionDbVoiture.findOne({ $and: [{ receptionne: true }, { paiement: false }, { _id: new ObjectID(req.params.id) }] })
                        .then(resFacture => {
                            if (resFacture) {
                                dataUpdate = resFacture
                                delete resAdmin.passwordAdmin
                                delete resAdmin._id
                                const updateDoc = {
                                    $set: {
                                        paiement: true,
                                        adminPaiement: resAdmin,
                                    }
                                };
                                const options = { upsert: true };
                                try {
                                    CollectionDbVoiture.updateOne({ _id: new ObjectID(req.params.id) }, updateDoc, options)
                                        .then(resUpdate => {
                                            const CollectionActivite = dataBase.collection('Activite')
                                            const CollectionNotificationClient = dataBase.collection('NotificationClient')
                                            delete dataUpdate._id
                                            delete dataUpdate.receptionne
                                            delete dataUpdate.admin
                                            voitureCl = dataUpdate.client
                                            delete dataUpdate.client
                                            reparationCl = dataUpdate.reparation
                                            delete dataUpdate.reparation
                                            delete resAdmin.dateSubscribe
                                            dataActivite = {
                                                activite: "VALIDATION PAIEMENT",
                                                admin: resAdmin,
                                                voiture: dataUpdate,
                                                client: voitureCl,
                                                reparation: reparationCl,
                                                facture: dataUpdate.facture,
                                                dateDepot: new Date()
                                            }
                                            CollectionActivite.insertOne(dataActivite)
                                                .then(resActivite => {
                                                    CollectionNotificationClient.insertOne(dataActivite)
                                                        .then(resNotif => {
                                                            res.send({ message: "VALIDATE PAYMENT" })
                                                        })
                                                        .catch(errActivte => res.send({ message: "REQUEST ERROR", detailled: "INVALID INFORMATION" }))
                                                })
                                                .catch(errActivte => res.send({ message: "REQUEST ERROR", detailled: "INVALID INFORMATION" }))
                                        })
                                        .catch(err => {
                                            res.send({ message: "REQUEST ERROR" })
                                        })
                                } catch (error) {
                                    res.send({ message: "REQUEST ERROR" })
                                }
                            } else {
                                res.send({ message: "REQUEST ERROR", detailled: "FACTURE ALREADY DONE" })
                            }
                        })
                        .catch(err => {
                            res.send({ message: "REQUEST ERROR" })
                        })
                } else {
                    res.send({ message: "REQUEST ERROR", detailled: "INVALID INFORMATION" })
                }
            } else {
                res.send({ message: "REQUEST ERROR", detailled: "ADMIN NOT ALLOWED FOR THIS POST" })
            }
        })
        .catch(err => {
            res.send({ message: "REQUEST ERROR" })
        })
}

const getOneCar = (dataBase, res, req) => {
    if (req.params.id !== undefined) {
        const CollectionDb = dataBase.collection('Voiture')
        try {
            CollectionDb.findOne({ _id: new ObjectID(req.params.id) })
                .then(resultat => {
                    resAffiche = outil.TriageDataCarOneAdmin(resultat)
                    res.send(resAffiche)
                })
                .catch(err => {
                    res.send({ message: "REQUEST ERROR" })
                })
        } catch (error) {
            res.send({ message: "REQUEST ERROR", detailled: "INVALID INFORMATION" })
        }
    } else {
        res.send({ message: "REQUEST ERROR", detailled: "INVALID INFORMATION" })
    }
}

const receptionneCar = (dataBase, res, req) => {
    if (req.params.id !== undefined) {
        const CollectionDb = dataBase.collection('Voiture')
        const CollectionDbAdmin = dataBase.collection('Admin')
        try {
            CollectionDb.findOne({ _id: new ObjectID(req.params.id) })
                .then(resultat => {
                    dataUpdate = resultat
                    if (!dataUpdate.receptionne) {
                        CollectionDbAdmin.findOne({ _id: new ObjectID(req.session.usernameAdmin) })
                            .then(resAdmin => {
                                if (resAdmin) {
                                    if (resAdmin.roleAdmin === "ATELIER") {
                                        delete resAdmin.passwordAdmin
                                        delete resAdmin._id
                                        req.body.Total = outil.CalculTotal(req.body)
                                        if (req.body.Total !== 0) {
                                            const updateDoc = {
                                                $set: {
                                                    receptionne: true,
                                                    sortie: false,
                                                    paiement: false,
                                                    admin: resAdmin,
                                                    facture: req.body
                                                }
                                            };
                                            const options = { upsert: true };
                                            try {
                                                CollectionDb.updateOne({ _id: new ObjectID(req.params.id) }, updateDoc, options)
                                                    .then(resF => {
                                                        const CollectionActivite = dataBase.collection('Activite')
                                                        const CollectionNotificationClient = dataBase.collection('NotificationClient')
                                                        delete dataUpdate._id
                                                        delete dataUpdate.receptionne
                                                        delete dataUpdate.admin
                                                        delete dataUpdate.facture
                                                        voitureCl = dataUpdate.client
                                                        delete dataUpdate.client
                                                        reparationCl = dataUpdate.reparation
                                                        delete dataUpdate.reparation
                                                        delete resAdmin.dateSubscribe
                                                        dataActivite = {
                                                            activite: "FACTURATION VOITURE",
                                                            admin: resAdmin,
                                                            voiture: dataUpdate,
                                                            client: voitureCl,
                                                            reparation: reparationCl,
                                                            facture: req.body,
                                                            dateDepot: new Date()
                                                        }
                                                        CollectionActivite.insertOne(dataActivite)
                                                            .then(resActivite => {
                                                                CollectionNotificationClient.insertOne(dataActivite)
                                                                    .then(resNotif => {
                                                                        res.send({ message: "FACTURE FOR CAR ADDED" })
                                                                    })
                                                                    .catch(errActivte => res.send({ message: "REQUEST ERROR", detailled: "INVALID INFORMATION" }))
                                                            })
                                                            .catch(errActivte => res.send({ message: "REQUEST ERROR", detailled: "INVALID INFORMATION" }))
                                                    })
                                                    .catch(errF => res.send({ message: "REQUEST ERROR", detailled: "FACTURE FOR CAR ADDED FAILED" }))
                                            } catch (error) {
                                                res.send({ message: "REQUEST ERROR", detailled: "FACTURE FOR CAR ADDED FAILED" })
                                            }
                                        } else {
                                            res.send({ message: "REQUEST ERROR", detailled: "INVALID INTEGER" })
                                        }
                                    } else {
                                        res.send({ message: "REQUEST ERROR", detailled: "ADMIN NOT ALLOWED FOR THIS POST" })
                                    }
                                } else {
                                    res.send({ message: "REQUEST ERROR", detailled: "ADMIN NOT FOUND" })
                                }
                            })
                            .catch(err => {
                                res.send({ message: "REQUEST ERROR" })
                            })
                    } else {
                        res.send({ message: "REQUEST ERROR", detailled: "CAR ALREADY RECEPTIONNED" })
                    }
                })
                .catch(err => {
                    res.send({ message: "REQUEST ERROR" })
                })
        } catch (error) {
            res.send({ message: "REQUEST ERROR", detailled: "INVALID INFORMATION" })
        }

    } else {
        res.send({ message: "REQUEST ERROR", detailled: "INVALID INFORMATION" })
    }
}

const LoginAdmin = (dataBase, res, req) => {
    const CollectionDb = dataBase.collection('Admin')
    CollectionDb.findOne({ usernameAdmin: req.body.username })
        .then(resultat => {
            if (resultat) {
                let hashPassword = crypto.createHash('md5').update(req.body.password).digest("hex")
                if (resultat.usernameAdmin === req.body.username && resultat.passwordAdmin === hashPassword) {
                    req.session.usernameAdmin = resultat._id
                    res.send({ message: "LOGIN SUCCESSFULLY" })
                } else {
                    res.send({ message: "LOGIN FAILED", detailled: "LOGIN OR PASSWORD INVALID" })
                }
            } else {
                res.send({ message: "LOGIN FAILED", detailled: "LOGIN NOT FOUND" })
            }
        })
        .catch(err => {
            res.send({ message: "REQUEST ERROR" })
        })
}

const AddAdmin = (dataBase, res, req) => {
    const CollectionDbAdmin = dataBase.collection('Admin')
    if (req.body.usernameAdmin !== undefined && req.body.passwordAdmin !== undefined && req.body.roleAdmin !== undefined) {
        CollectionDbAdmin.findOne({ usernameAdmin: req.body.usernameAdmin })
            .then(resAdmin => {
                if (resAdmin) {
                    res.send({ message: "ADMIN ADD FAILED", detailled: "ADMIN ALREADY ADDED" })
                } else {
                    req.body.dateSubscribe = new Date()
                    let hashPassword = crypto.createHash('md5').update(req.body.passwordAdmin).digest("hex")
                    req.body.passwordAdmin = hashPassword
                    CollectionDbAdmin.insertOne(req.body)
                        .then(resultat => {
                            res.send({ message: "ADMIN ADDED SUCCESSFULLY" })
                        })
                        .catch(err => res.send({ message: "ADMIN ADD FAILED", detailled: "INVALID INFORMATION" }))
                }
            })
            .catch(err => res.send({ message: "ADMIN ADD FAILED", detailled: "INVALID INFORMATION" }))

    } else {
        res.send({ message: "ADMIN ADD FAILED", detailled: "INVALID INFORMATION" })
    }
}

const LogoutAdmin = (res, req) => {
    req.session.destroy()
    res.send({ message: "LOGOUT SUCCESSFULLY" })
}

exports.getAllClient = getAllClient
exports.getAllFacture = getAllFacture
exports.ValidFacture = ValidFacture
exports.HomeAdmin = HomeAdmin
exports.getOneClient = getOneClient
exports.getAllCar = getAllCar
exports.getOneCar = getOneCar
exports.receptionneCar = receptionneCar
exports.AddAdmin = AddAdmin
exports.LoginAdmin = LoginAdmin
exports.LogoutAdmin = LogoutAdmin