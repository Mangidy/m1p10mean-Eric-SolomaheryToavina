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
        return somme = toArr.map(res => {
            return somme += parseInt(res)
        })
    } catch (error) {
        return 0
    }
}

const TriageDataFacture = (data) => {
    Newdata = data.map(resultat => {
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
    })
    return Newdata
}

exports.TriageDataReceptionne = TriageDataReceptionne
exports.CalculTotal = CalculTotal
exports.TriageDataFacture = TriageDataFacture