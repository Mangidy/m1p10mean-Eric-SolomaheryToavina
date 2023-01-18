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

const TriageDataFacture = (data) => {
    Newdata = data.map(resultat => {
        if (resultat.receptionne === true) {
            return {
                voiture: {
                    numero: resultat.numero,
                    marque: resultat.marque,
                    modele: resultat.modele,
                    annee: resultat.annee,
                },
                facture: resultat.facture,
                reparation: resultat.reparation,
                dateDepot: resultat.dateDepot,
            }
        } else {
            return {
                message: "Aucune facture pour le moment"
            }
        }
    })
    return Newdata
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
                sorite: resultat.sorite,
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
exports.TriageDataFacture = TriageDataFacture