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

const LoginAdmin = (dataBase, res, req) => {
    const CollectionDb = dataBase.collection('Admin')
    CollectionDb.findOne({ "usernameAdmin": req.body.username })
        .then(resultat => {
            if (resultat) {
                if (resultat.usernameAdmin === req.body.username && resultat.passwordAdmin === req.body.password) {
                    req.session.usernameAdmin = resultat._id
                    res.send({ message: "LOGIN SUCCESSFULLY" })
                } else {
                    res.send({ message: "LOGIN FAILED" })
                }
            } else {
                res.send({ message: "LOGIN FAILED" })
            }
        })
        .catch(err => {
            res.send({ message: "REQUEST ERROR" })
        })
}

const LogoutAdmin = (res, req) => {
    req.session.destroy()
    res.send({ message: "LOGOUT SUCCESSFULLY" })
}

exports.getAllClient = getAllClient
exports.getOneClient = getOneClient
exports.getAllCar = getAllCar
exports.getOneCar = getOneCar
exports.LoginAdmin = LoginAdmin
exports.LogoutAdmin = LogoutAdmin