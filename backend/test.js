// const crypto = require('crypto')

// let hash = crypto.createHash('md5').update('eric').digest("hex")

// console.log(hash);

// ------------------------------------------------------------------

// data = { Moteur: '600000', Carrosserie: '800000' }
// toArr = Object.values(data)
// somme = 0
// for (let i = 0; i < toArr.length; i++) {
//     somme += parseInt(toArr[i])
// }
// console.log(somme);

// ------------------------------------------------------------------

data = [
    {
        "_id": "63c6902ac0c64e833a2f45a5",
        "numero": "6827TAD",
        "marque": "Peugeot",
        "modele": "405",
        "annee": "2004",
        "receptionne": true,
        "admin": {
            "usernameAdmin": "Ratovonirina",
            "roleAdmin": "ATELIER",
            "dateSubscribe": "2023-01-17T11:48:33.500Z"
        },
        "client": {
            "nom": "Rato",
            "prenom": "Eric",
            "adress": "Ambohidratrimo",
            "phone": "0346792559"
        },
        "reparation": {
            "Moteur": "Pompe",
            "Carrosserie": "Capot"
        },
        "dateDepot": "2023-01-17T12:10:18.273Z",
        "facture": {
            "Moteur": "600000",
            "Carrosserie": "800000"
        },
        "sortie": false
    },
    {
        "_id": "63c693d97fea9cab87412053",
        "numero": "6827WWT",
        "marque": "BMW",
        "modele": "E46",
        "annee": "2008",
        "receptionne": true,
        "admin": {
            "usernameAdmin": "Ratovonirina",
            "roleAdmin": "ATELIER",
            "dateSubscribe": "2023-01-17T11:48:33.500Z"
        },
        "client": {
            "nom": "Rato",
            "prenom": "Eric",
            "adress": "Ambohidratrimo",
            "phone": "0346792559"
        },
        "reparation": {
            "Moteur": "Pompe",
            "Carrosserie": "Capot"
        },
        "dateDepot": "2023-01-17T12:26:01.754Z",
        "facture": {
            "Moteur": "600000",
            "Carrosserie": "800000",
            "total": 1400000
        },
        "sortie": false,
        "validation": false
    }
]

dataFinal = []
for (let i = 0; i < data.length; i++) {
    if (data[i].receptionne === true) {
        dataFinal[i] = data[i]
    }
}

console.log(dataFinal);
