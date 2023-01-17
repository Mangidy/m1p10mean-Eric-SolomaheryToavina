// const crypto = require('crypto')

// let hash = crypto.createHash('md5').update('eric').digest("hex")

// console.log(hash);

data = { Moteur: '600000', Carrosserie: '800000' }
toArr = Object.values(data)
somme = 0
for (let i = 0; i < toArr.length; i++) {
    somme += parseInt(toArr[i])
}
console.log(somme);