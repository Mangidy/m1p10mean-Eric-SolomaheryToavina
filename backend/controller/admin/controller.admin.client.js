const getAllClient = (dataBase, res) => {
    const CollectionDb = dataBase.collection('Client')
    CollectionDb.find().toArray()
        .then(resultat => {
            res.send(resultat)
        })
        .catch(err => {
            res.send("Erreur")
        })
}

const LoginAdmin = (dataBase, res, req) => {
    const CollectionDb = dataBase.collection('Admin')
    CollectionDb.findOne({ "username": req.body.username })
        .then(resultat => {
            if (resultat) {
                if (req.body.username === resultat.usernameAdmin && req.body.password === resultat.passwordAdmin) {
                    req.session.usernameAdmin = resultat._id
                    res.send({ message: "Loggin successfully" })
                } else {
                    res.send({ message: "Login Failed" })
                }
            } else {
                res.send({ message: "Login Failed" })
            }
        })
        .catch(err => {
            res.send("Erreur")
        })
}

const LogoutAdmin = (res, req) => {
    req.session.destroy()
    res.send({ message: "Loggout successfully" })
}

exports.getAllClient = getAllClient
exports.LoginAdmin = LoginAdmin
exports.LogoutAdmin = LogoutAdmin