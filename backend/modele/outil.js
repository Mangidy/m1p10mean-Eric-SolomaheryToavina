const TriageDataReceptionne = (data, valeur) => {
    dataFinal = []
    for (let i = 0; i < data.length; i++) {
        if (data[i].receptionne == valeur) {
            dataFinal[i] = data[i]
        }
    }
    return dataFinal
}

const CalculTotal = (jsonData) => {
    try {
        toArr = Object.values(jsonData)
        somme = 0
        for (let i = 0; i < toArr.length; i++) {
            somme += parseInt(toArr[i])
        }
        return somme
    } catch (error) {
        return 0
    }
}

exports.TriageDataReceptionne = TriageDataReceptionne
exports.CalculTotal = CalculTotal