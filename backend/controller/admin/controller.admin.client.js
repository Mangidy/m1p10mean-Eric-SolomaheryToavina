const { ObjectID } = require("bson")

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
            res.send(resultat)
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
                                delete resAdmin.passwordAdmin
                                delete resAdmin._id
                                const updateDoc = {
                                    $set: {
                                        receptionne: true,
                                        sortie: false,
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
                                            dataActivite = {
                                                activite: "FACTURATION VOITURE",
                                                admin: resAdmin,
                                                voiture: dataUpdate,
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
                if (resultat.usernameAdmin === req.body.username && resultat.passwordAdmin === req.body.password) {
                    req.session.usernameAdmin = resultat._id
                    res.send({ message: "LOGIN SUCCESSFULLY" })
                } else {
                    res.send({ message: "LOGIN FAILED", detailled: "INVALID INFORMATION" })
                }
            } else {
                res.send({ message: "LOGIN FAILED", detailled: "INVALID INFORMATION" })
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
exports.getOneClient = getOneClient
exports.getAllCar = getAllCar
exports.getOneCar = getOneCar
exports.receptionneCar = receptionneCar
exports.AddAdmin = AddAdmin
exports.LoginAdmin = LoginAdmin
exports.LogoutAdmin = LogoutAdmin