const HomeClient = (req, res) => {
    if (req.session.clientId) {
        res.send({ message: "USER CONNECTED" })
    } else {
        res.send({ message: "USER NOT CONNECTED" })
    }
}

const LoginClient = (dataBase, res, req) => {
    const CollectionDb = dataBase.collection('Client')
    CollectionDb.findOne({ "username": req.body.username })
        .then(resultat => {
            if (resultat) {
                if (req.body.username === resultat.username && req.body.password === resultat.password) {
                    req.session.clientId = resultat._id
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

const LogoutClient = (res, req) => {
    req.session.destroy()
    res.send({ message: "Loggout successfully" })
}

exports.HomeClient = HomeClient
exports.LoginClient = LoginClient
exports.LogoutClient = LogoutClient