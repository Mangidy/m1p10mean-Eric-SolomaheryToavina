const { ObjectID } = require("bson")
const crypto = require('crypto')
const outil = require('../../modele/outil')

async function HomeAdmin(clientConnex, req, res) {
    await clientConnex.db("Garage").collection('Admin').findOne({ _id: new ObjectID(req.session.usernameAdmin) })
        .then(resultat => {
            if (resultat) {
                res.send({ message: "ADMIN CONNECTED", admin: resultat })
            } else {
                res.send({ message: "REQUEST ERROR", detailled: "INVALID ADMIN SESSION" })
            }
        })
        .catch(err => {
            res.send({ message: "REQUEST ERROR" })
        })
}

async function getAllClient(clientConnex, res) {
    await clientConnex.db("Garage").collection('Client').find().toArray()
        .then(resultat => {
            if (resultat) {
                res.send(resultat.map(resAff => {
                    return {
                        _id: resAff._id,
                        username: resAff.username,
                        nom: resAff.nom,
                        prenom: resAff.prenom,
                        adress: resAff.adress,
                        phone: resAff.phone,
                        dateSubscribe: resAff.dateSubscribe,
                    }
                }))
            } else {
                res.send({ message: "DATA EMPTY" })
            }
        })
        .catch(err => {
            res.send({ message: "REQUEST ERROR" })
        })
}

async function getOneClient(clientConnex, res, req) {
    if (req.params.id !== undefined) {
        try {
            await clientConnex.db("Garage").collection('Client').findOne({ _id: new ObjectID(req.params.id) })
                .then(resultat => {
                    if (resultat) {
                        res.send({
                            _id: resultat._id,
                            username: resultat.username,
                            nom: resultat.nom,
                            prenom: resultat.prenom,
                            adress: resultat.adress,
                            phone: resultat.phone,
                            dateSubscribe: resultat.dateSubscribe,
                        })
                    } else {
                        res.send({ message: "DATA EMPTY" })
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

async function getAllCar(clientConnex, res) {
    await clientConnex.db("Garage").collection('Voiture').find({ sortie: false }).toArray()
        .then(resultat => {
            if (resultat) {
                resAffiche = outil.TriageDataCarAdmin(resultat)
                res.send(resAffiche)
            } else {
                res.send({ message: "DATA EMPTY" })
            }
        })
        .catch(err => {
            res.send({ message: "REQUEST ERROR" })
        })
}

async function getAllFacture(clientConnex, res) {
    await clientConnex.db("Garage").collection('Voiture').find({ receptionne: true }).toArray()
        .then(resFacture => {
            if (resFacture) {
                resAffiche = outil.TriageDataFactureAdmin(resFacture)
                res.send(resAffiche)
            } else {
                res.send({ message: "DATA EMPTY" })
            }
        })
        .catch(err => {
            res.send({ message: "REQUEST ERROR" })
        })
}

async function getAllFactureTr(clientConnex, res, req) {
    if (req.params.valeur && req.params.valeur == "false" || req.params.valeur == "true") {
        await clientConnex.db("Garage").collection('Voiture').find({ $and: [{ receptionne: true }, { validationClient: JSON.parse(req.params.valeur) }] }).toArray()
            .then(resFacture => {
                if (resFacture) {
                    resAffiche = outil.TriageDataFactureAdmin(resFacture)
                    res.send(resAffiche)
                } else {
                    res.send({ message: "REQUEST DONE", detailled: "NOTHING DATA" })
                }
            })
            .catch(err => {
                res.send({ message: "REQUEST ERROR" })
            })
    } else {
        res.send({ message: "REQUEST ERROR", detailled: "INVALID INFORMATION" })
    }
}

async function ValidFacture(clientConnex, res, req) {
    var continueVar = false
    var continueVar1 = false
    var continueVar2 = false
    var resAdminR = {}
    await clientConnex.db("Garage").collection('Admin').findOne({ _id: new ObjectID(req.session.usernameAdmin) })
        .then(resAdmin => {
            resAdminR = resAdmin
            if (resAdmin.roleAdmin === "FINANCIER") {
                if (req.params.id !== undefined && req.params.id) {
                    continueVar = true
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

    if (continueVar) {
        var updateDoc = {}
        var options = {}
        var dataUpdate = {}
        try {
            await clientConnex.db("Garage").collection('Voiture').findOne({ $and: [{ receptionne: true }, { paiement: false }, { validationClient: true }, { _id: new ObjectID(req.params.id) }] })
                .then(resFacture => {
                    if (resFacture) {
                        dataUpdate = resFacture
                        delete resAdminR.passwordAdmin
                        delete resAdminR._id
                        delete resAdminR.dateSubscribe
                        updateDoc = {
                            $set: {
                                paiement: true,
                                adminPaiement: resAdminR,
                            }
                        };
                        options = { upsert: true };
                        continueVar1 = true
                    } else {
                        res.send({ message: "REQUEST ERROR", detailled: "VERIFICATE THE INFORMATION", option1: "CAR NOT RECEIVED BY AN ADMIN", option2: "CLIENT DOESN'T VALIDATE", option3: "CAR ALREADY VALIDATE", option4: "INVALID INFORMATION" })
                    }
                })
                .catch(err => {
                    res.send({ message: "REQUEST ERROR" })
                })

            if (continueVar1) {
                var dataActivite = {}
                try {
                    await clientConnex.db("Garage").collection('Voiture').updateOne({ _id: new ObjectID(req.params.id) }, updateDoc, options)
                        .then(resUpdate => {
                            delete dataUpdate._id
                            delete dataUpdate.receptionne
                            delete dataUpdate.admin
                            voitureCl = dataUpdate.client
                            delete dataUpdate.client
                            reparationCl = dataUpdate.reparation
                            delete dataUpdate.reparation
                            delete resAdminR.dateSubscribe
                            dataActivite = {
                                activite: "VALIDATION PAIEMENT",
                                admin: resAdminR,
                                voiture: dataUpdate,
                                client: voitureCl,
                                reparation: reparationCl,
                                facture: dataUpdate.facture,
                                dateDepot: new Date()
                            }
                            continueVar2 = true
                        })
                        .catch(err => {
                            res.send({ message: "REQUEST ERROR" })
                        })
                    if (continueVar2) {
                        await clientConnex.db("Garage").collection('Activite').insertOne(dataActivite)
                            .then(resActivite => {
                                console.log("Continue...");
                            })
                            .catch(errActivte => res.send({ message: "REQUEST ERROR", detailled: "INVALID INFORMATION" }))
                        await clientConnex.db("Garage").collection('NotificationClient').insertOne(dataActivite)
                            .then(resNotif => {
                                res.send({ message: "VALIDATE PAYMENT" })
                            })
                            .catch(errActivte => res.send({ message: "REQUEST ERROR", detailled: "INVALID INFORMATION" }))
                    }
                } catch (error) {
                    res.send({ message: "REQUEST ERROR" })
                }
            }
        } catch (error) {
            res.send({ message: "REQUEST ERROR", detailled: "INVALID INFORMATION" })
        }
    }
}

async function CarClientOut(clientConnex, res, req) {
    if (req.params.idVoiture !== undefined) {
        var continueVar = false
        var continueVar1 = false
        var continueVar2 = false
        var resAdminR = {}
        await clientConnex.db("Garage").collection('Admin').findOne({ _id: new ObjectID(req.session.usernameAdmin) })
            .then(resAdmin => {
                resAdminR = resAdmin
                if (resAdmin.roleAdmin === "ATELIER") {
                    continueVar = true
                } else {
                    res.send({ message: "REQUEST ERROR", detailled: "ADMIN NOT ALLOWED FOR THIS POST" })
                }
            })
            .catch(err => {
                res.send({ message: "REQUEST ERROR" })
            })

        if (continueVar) {
            var updateDoc = {}
            var options = {}
            var resVoitureR = {}
            await clientConnex.db("Garage").collection('Voiture').findOne({ $and: [{ receptionne: true }, { paiement: true }, { _id: new ObjectID(req.params.idVoiture) }] })
                .then(resVoiture => {
                    resVoitureR = resVoiture
                    if (resVoiture) {
                        if (!resVoiture.sortie) {
                            dateSortie = new Date()
                            diffDate = outil.dateDiff(new Date(resVoitureR.dateDepot), dateSortie)
                            updateDoc = {
                                $set: {
                                    sortie: true,
                                    Datesortie: dateSortie,
                                    TempsReparation: {
                                        jour: diffDate.day,
                                    },
                                }
                            };
                            options = { upsert: true };
                            continueVar1 = true
                        } else {
                            res.send({ message: "REQUEST ERROR", detailled: "CAR ALREADY OUT" })
                        }
                    } else {
                        res.send({ message: "REQUEST ERROR", detailled: "CAR NOT FOUND" })
                    }
                })
                .catch(err => {
                    res.send({ message: "REQUEST ERROR" })
                })

            if (continueVar1) {
                var dataActivite = {}
                await clientConnex.db("Garage").collection('Voiture').updateOne({ _id: new ObjectID(req.params.idVoiture) }, updateDoc, options)
                    .then(resUpdate => {
                        delete resVoitureR._id
                        delete resVoitureR.receptionne
                        delete resVoitureR.admin
                        factureCl = resVoitureR.facture
                        delete resVoitureR.facture
                        voitureCl = resVoitureR.client
                        delete resVoitureR.client
                        reparationCl = resVoitureR.reparation
                        delete resVoitureR.reparation
                        delete resAdminR.dateSubscribe
                        dataActivite = {
                            activite: "VALIDATION BON DE SORTIE VOITURE",
                            admin: resAdminR,
                            voiture: resVoitureR,
                            client: voitureCl,
                            reparation: reparationCl,
                            facture: factureCl,
                            dateDepot: new Date()
                        }
                        continueVar2 = true
                    }).catch(err => {
                        res.send({ message: "REQUEST ERROR" })
                    })
                if (continueVar2) {
                    await clientConnex.db("Garage").collection('Activite').insertOne(dataActivite)
                        .then(resActivite => {
                            console.log("Continue...");
                        })
                        .catch(errActivte => res.send({ message: "REQUEST ERROR", detailled: "INVALID INFORMATION" }))
                    await clientConnex.db("Garage").collection('NotificationClient').insertOne(dataActivite)
                        .then(resNotif => {
                            res.send({ message: "CAR OUT" })
                        })
                        .catch(errActivte => res.send({ message: "REQUEST ERROR", detailled: "INVALID INFORMATION" }))
                }
            }
        }

    } else {
        res.send({ message: "REQUEST ERROR", detailled: "INVALID INFORMATION" })
    }
}

async function ListCarClientOut(clientConnex, res, req) {
    var continueVar = false
    await clientConnex.db("Garage").collection('Admin').findOne({ _id: new ObjectID(req.session.usernameAdmin) })
        .then(resAdmin => {
            continueVar = true
        })
        .catch(err => {
            res.send({ message: "REQUEST ERROR" })
        })
    if (continueVar) {
        await clientConnex.db("Garage").collection('Voiture').find({ $and: [{ sortie: true }] }).toArray()
            .then(resList => {
                res.send(outil.TriageDataCarOut(resList))
            })
            .catch(err => {
                res.send({ message: "REQUEST ERROR" })
            })
    }
}

async function getOneCar(clientConnex, res, req) {
    if (req.params.id !== undefined) {
        try {
            await clientConnex.db("Garage").collection('Voiture').findOne({ _id: new ObjectID(req.params.id) })
                .then(resultat => {
                    if (resAffiche) {
                        resAffiche = outil.TriageDataCarOneAdmin(resultat)
                        res.send(resAffiche)
                    } else {
                        res.send({ message: "REQUEST ERROR", detailled: "INVALID INFORMATION" })
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

async function receptionneCarFacture(clientConnex, res, req) {
    if (req.params.idVoiture !== undefined) {
        var continueVar = false
        var continueVar1 = false
        var continueVar2 = false
        var dataUpdate = {}
        var resAdminR = {}
        try {
            await clientConnex.db("Garage").collection('Voiture').findOne({ _id: new ObjectID(req.params.idVoiture) })
                .then(resultat => {
                    if (resultat) {
                        dataUpdate = resultat
                        continueVar = true
                    } else {
                        res.send({ message: "REQUEST ERROR", detailled: "CAR NOT FOUND" })
                    }
                })
                .catch(err => {
                    res.send({ message: "REQUEST ERROR" })
                })
            if (continueVar) {
                var updateDoc = {}
                var options = {}
                await clientConnex.db("Garage").collection('Admin').findOne({ _id: new ObjectID(req.session.usernameAdmin) })
                    .then(resAdmin => {
                        resAdminR = resAdmin
                        if (resAdmin) {
                            if (resAdmin.roleAdmin === "ATELIER") {
                                delete resAdmin.passwordAdmin
                                delete resAdmin._id
                                req.body.Total = outil.CalculTotal(req.body)
                                if (req.body.Total !== 0) {
                                    req.body.Avance = outil.CalculHalf(req.body.Total)
                                    req.body.Reste = outil.CalculHalf(req.body.Total)
                                    req.body.Prix = "Ariary"
                                    updateDoc = {
                                        $set: {
                                            sortie: false,
                                            paiement: false,
                                            validationClient: false,
                                            facture: req.body
                                        }
                                    };
                                    options = { upsert: true };
                                    continueVar1 = true
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
                if (continueVar1) {
                    var dataActivite = {}
                    try {
                        await clientConnex.db("Garage").collection('Voiture').updateOne({ _id: new ObjectID(req.params.idVoiture) }, updateDoc, options)
                            .then(resF => {
                                delete dataUpdate._id
                                delete dataUpdate.receptionne
                                delete dataUpdate.admin
                                delete dataUpdate.facture
                                voitureCl = dataUpdate.client
                                delete dataUpdate.client
                                reparationCl = dataUpdate.reparation
                                delete dataUpdate.reparation
                                delete resAdminR.dateSubscribe
                                dataActivite = {
                                    activite: "FACTURATION VOITURE",
                                    admin: resAdminR,
                                    voiture: dataUpdate,
                                    client: voitureCl,
                                    reparation: reparationCl,
                                    facture: req.body,
                                    dateDepot: new Date()
                                }
                                continueVar2 = true
                            })
                            .catch(errF => res.send({ message: "REQUEST ERROR", detailled: "FACTURE FOR CAR ADDED FAILED" }))

                        if (continueVar2) {
                            await clientConnex.db("Garage").collection('Activite').insertOne(dataActivite)
                                .then(resActivite => {
                                    console.log("Contine...");
                                })
                                .catch(errActivte => res.send({ message: "REQUEST ERROR", detailled: "INVALID INFORMATION" }))
                            await clientConnex.db("Garage").collection('NotificationClient').insertOne(dataActivite)
                                .then(resNotif => {
                                    res.send({ message: "FACTURE FOR CAR ADDED" })
                                })
                                .catch(errActivte => res.send({ message: "REQUEST ERROR", detailled: "INVALID INFORMATION" }))
                        }
                    } catch (error) {
                        res.send({ message: "REQUEST ERROR", detailled: "FACTURE FOR CAR ADDED FAILED" })
                    }
                }
            }
        } catch (error) {
            res.send({ message: "REQUEST ERROR", detailled: "INVALID INFORMATION" })
        }

    } else {
        res.send({ message: "REQUEST ERROR", detailled: "INVALID INFORMATION" })
    }
}

async function AddCarReparation(clientConnex, req, res) {
    var continueVar = false
    var continueVar1 = false
    var continueVar2 = false
    var resAdminR = {}
    await clientConnex.db("Garage").collection('Admin').findOne({ _id: new ObjectID(req.session.usernameAdmin) })
        .then(resAdmin => {
            if (req.params.numero !== undefined) {
                if (resAdmin.roleAdmin === "ATELIER") {
                    delete resAdmin._id
                    delete resAdmin.passwordAdmin
                    delete resAdmin.dateSubscribe
                    resAdminR = resAdmin
                    continueVar = true
                } else {
                    res.send({ message: "REQUEST ERROR", detailled: "ADMIN NOT ALLOWED FOR THIS POST" })
                }
            } else {
                res.send({ message: "REQUEST ERROR", detailled: "NUMBER CAR INVALID" })
            }
        })
        .catch(err => {
            res.send({ message: "REQUEST ERROR" })
        })
    if (continueVar) {
        var updateDoc = {}
        var options = {}
        var newValeurReparation = {}
        await clientConnex.db("Garage").collection('Voiture').findOne({ $and: [{ numero: req.params.numero }, { reparation: {} }] })
            .then(resCar => {
                if (resCar) {
                    resCar.reparation = req.body
                    newValeurReparation = resCar
                    updateDoc = {
                        $set: { reparation: req.body, admin: resAdminR, receptionne: true }
                    };
                    options = { upsert: true };
                    continueVar1 = true
                } else {
                    res.send({ message: "REQUEST ERROR", detailled: "CAR ALREADY RECEIVED BY AN ADMIN" })
                }
            })
            .catch(err => res.send({ message: "REQUEST ERROR", detailled: "INVALID CAR REPARATION", err: err }))
        if (continueVar1) {
            var dataActivite = {}
            try {
                await clientConnex.db("Garage").collection('Voiture').updateOne({ _id: newValeurReparation._id }, updateDoc, options)
                    .then(resF => {
                        dataActivite = {
                            activite: "LISTE REPARATION VOITURE",
                            admin: resAdminR,
                            voiture: newValeurReparation,
                            client: newValeurReparation.client,
                            reparation: newValeurReparation.reparation,
                            dateDepot: new Date()
                        }
                        continueVar2 = true
                    })
                    .catch(errF => res.send({ message: "REQUEST ERROR", detailled: "UPDATE FAILED" }))
                if (continueVar2) {
                    await clientConnex.db("Garage").collection('Activite').insertOne(dataActivite)
                        .then(resActivite => {
                            console.log("Continue...");
                        })
                        .catch(errActivte => res.send({ message: "REQUEST ERROR", detailled: "INVALID INFORMATION" }))
                    await clientConnex.db("Garage").collection('NotificationClient').insertOne(dataActivite)
                        .then(resNotif => {
                            res.send({ message: "CAR REPARATION ADDED" })
                        })
                        .catch(errActivte => res.send({ message: "REQUEST ERROR", detailled: "INVALID INFORMATION" }))
                }
            } catch (error) {
                res.send({ message: "REQUEST ERROR", detailled: "UPDATE FAILED" })
            }
        }
    }
}

async function LoginAdmin(clientConnex, res, req) {
    await clientConnex.db("Garage").collection('Admin').findOne({ usernameAdmin: req.body.username })
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

async function AddAdmin(clientConnex, res, req) {
    if (req.body.usernameAdmin !== undefined && req.body.passwordAdmin !== undefined && req.body.roleAdmin !== undefined) {
        var continueVar = false
        var newVal = {}
        await clientConnex.db("Garage").collection('Admin').findOne({ usernameAdmin: req.body.usernameAdmin })
            .then(resAdmin => {
                if (resAdmin) {
                    res.send({ message: "ADMIN ADD FAILED", detailled: "ADMIN ALREADY ADDED" })
                } else {
                    req.body.dateSubscribe = new Date()
                    let hashPassword = crypto.createHash('md5').update(req.body.passwordAdmin).digest("hex")
                    req.body.passwordAdmin = hashPassword
                    continueVar = true
                    newVal = req.body
                }
            })
            .catch(err => res.send({ message: "ADMIN ADD FAILED", detailled: "INVALID INFORMATION" }))

        if (continueVar) {
            await clientConnex.db("Garage").collection('Admin').insertOne(newVal)
                .then(resultat => {
                    res.send({ message: "ADMIN ADDED SUCCESSFULLY" })
                })
                .catch(err => res.send({ message: "ADMIN ADD FAILED", detailled: "INVALID INFORMATION" }))
        }

    } else {
        res.send({ message: "ADMIN ADD FAILED", detailled: "INVALID INFORMATION" })
    }
}

function LogoutAdmin(res, req) {
    req.session.destroy()
    res.send({ message: "LOGOUT SUCCESSFULLY" })
}

exports.getAllClient = getAllClient
exports.getAllFacture = getAllFacture
exports.getAllFactureTr = getAllFactureTr
exports.AddCarReparation = AddCarReparation
exports.ValidFacture = ValidFacture
exports.CarClientOut = CarClientOut
exports.ListCarClientOut = ListCarClientOut
exports.HomeAdmin = HomeAdmin
exports.getOneClient = getOneClient
exports.getAllCar = getAllCar
exports.getOneCar = getOneCar
exports.receptionneCarFacture = receptionneCarFacture
exports.AddAdmin = AddAdmin
exports.LoginAdmin = LoginAdmin
exports.LogoutAdmin = LogoutAdmin