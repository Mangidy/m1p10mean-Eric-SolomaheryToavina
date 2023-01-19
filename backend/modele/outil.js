const { ObjectID } = require("bson")

const TriageDataReceptionne = (data, valeur) => {
    dataFinal = data.map(res => {
        if (res.receptionne === valeur) {
            return res
        } else {
            return []
        }
    })
    return dataFinal
}

const CalculTotal = (jsonData) => {
    try {
        toArr = Object.values(jsonData)
        somme = 0
        for (let i = 0; i < toArr.length; i++) {
            somme += parseInt(toArr[i]);
        }
        return somme
    } catch (error) {
        return 0
    }
}

const CalculHalf = (data) => {
    if (data > 0) {
        return data / 2
    } else {
        return 0
    }
}

const TriageDataFactureAdmin = (data) => {
    Newdata = data.map(resultat => {
        if (resultat.receptionne === true) {
            return {
                id: resultat._id,
                validationClient: resultat.validationClient,
                paiement: resultat.paiement,
                sortie: resultat.sortie,
                voiture: {
                    numero: resultat.numero,
                    marque: resultat.marque,
                    modele: resultat.modele,
                    annee: resultat.annee,
                },
                client: resultat.client,
                admin: resultat.admin,
                facture: resultat.facture,
                reparation: resultat.reparation,
                dateDepot: resultat.dateDepot,
            }
        } else {
            return {
                message: "DATA EMPTY"
            }
        }
    })
    return Newdata
}

const TriageDataFacture = (data) => {
    Newdata = data.map(resultat => {
        if (resultat.receptionne === true) {
            return {
                id: resultat._id,
                validationClient: resultat.validationClient,
                paiement: resultat.paiement,
                sortie: resultat.sortie,
                voiture: {
                    numero: resultat.numero,
                    marque: resultat.marque,
                    modele: resultat.modele,
                    annee: resultat.annee,
                },
                admin: resultat.admin,
                facture: resultat.facture,
                reparation: resultat.reparation,
                validation: resultat.validationClient,
                dateDepot: resultat.dateDepot,
            }
        } else {
            return {
                message: "DATA EMPTY"
            }
        }
    })
    return Newdata
}


const TriageDataFactureOne = (resultat) => {
    if (resultat.receptionne === true) {
        return {
            id: resultat._id,
            validationClient: resultat.validationClient,
            paiement: resultat.paiement,
            sortie: resultat.sortie,
            voiture: {
                numero: resultat.numero,
                marque: resultat.marque,
                modele: resultat.modele,
                annee: resultat.annee,
            },
            admin: resultat.admin,
            facture: resultat.facture,
            validation: resultat.validationClient,
            reparation: resultat.reparation,
            dateDepot: resultat.dateDepot,
        }
    } else {
        return {
            message: "DATA EMPTY"
        }
    }
}

const TriageDataCar = (data) => {
    Newdata = data.map(resultat => {
        if (resultat.receptionne === true) {
            return {
                _id: resultat._id,
                numero: resultat.numero,
                marque: resultat.marque,
                modele: resultat.modele,
                annee: resultat.annee,
                receptionne: resultat.receptionne,
                admin: resultat.admin,
                reparation: resultat.reparation,
                facture: resultat.facture,
                validation: resultat.validation,
                sortie: resultat.sortie,
                dateDepot: resultat.dateDepot,
            }
        } else {
            return {
                _id: resultat._id,
                numero: resultat.numero,
                marque: resultat.marque,
                modele: resultat.modele,
                annee: resultat.annee,
                receptionne: resultat.receptionne,
                reparation: resultat.reparation,
                dateDepot: resultat.dateDepot,
            }
        }
    })
    return Newdata
}

const TriageDataCarOne = (resultat) => {
    if (resultat.receptionne === true) {
        return {
            _id: resultat._id,
            numero: resultat.numero,
            marque: resultat.marque,
            modele: resultat.modele,
            annee: resultat.annee,
            receptionne: resultat.receptionne,
            admin: resultat.admin,
            reparation: resultat.reparation,
            facture: resultat.facture,
            validation: resultat.validation,
            sortie: resultat.sortie,
            dateDepot: resultat.dateDepot,
        }
    } else {
        return {
            _id: resultat._id,
            numero: resultat.numero,
            marque: resultat.marque,
            modele: resultat.modele,
            annee: resultat.annee,
            receptionne: resultat.receptionne,
            reparation: resultat.reparation,
            dateDepot: resultat.dateDepot,
        }
    }
}


const TriageDataCarAdmin = (data) => {
    Newdata = data.map(resultat => {
        if (resultat.receptionne === true) {
            return {
                _id: resultat._id,
                numero: resultat.numero,
                marque: resultat.marque,
                modele: resultat.modele,
                annee: resultat.annee,
                receptionne: resultat.receptionne,
                admin: resultat.admin,
                client: resultat.client,
                reparation: resultat.reparation,
                facture: resultat.facture,
                validation: resultat.validation,
                sortie: resultat.sortie,
                dateDepot: resultat.dateDepot,
            }
        } else {
            return {
                _id: resultat._id,
                numero: resultat.numero,
                marque: resultat.marque,
                modele: resultat.modele,
                annee: resultat.annee,
                receptionne: resultat.receptionne,
                reparation: resultat.reparation,
                client: resultat.client,
                dateDepot: resultat.dateDepot,
            }
        }
    })
    return Newdata
}

const TriageDataCarOneAdmin = (resultat) => {
    if (resultat.receptionne === true) {
        return {
            _id: resultat._id,
            numero: resultat.numero,
            marque: resultat.marque,
            modele: resultat.modele,
            annee: resultat.annee,
            receptionne: resultat.receptionne,
            admin: resultat.admin,
            client: resultat.client,
            reparation: resultat.reparation,
            facture: resultat.facture,
            validation: resultat.validation,
            sortie: resultat.sortie,
            dateDepot: resultat.dateDepot,
        }
    } else {
        return {
            _id: resultat._id,
            numero: resultat.numero,
            marque: resultat.marque,
            modele: resultat.modele,
            annee: resultat.annee,
            receptionne: resultat.receptionne,
            reparation: resultat.reparation,
            client: resultat.client,
            dateDepot: resultat.dateDepot,
        }
    }
}

exports.TriageDataReceptionne = TriageDataReceptionne
exports.TriageDataCar = TriageDataCar
exports.TriageDataCarAdmin = TriageDataCarAdmin
exports.TriageDataCarOne = TriageDataCarOne
exports.TriageDataCarOneAdmin = TriageDataCarOneAdmin
exports.CalculTotal = CalculTotal
exports.CalculHalf = CalculHalf
exports.TriageDataFactureAdmin = TriageDataFactureAdmin
exports.TriageDataFacture = TriageDataFacture
exports.TriageDataFactureOne = TriageDataFactureOne