const controllerAdminClient = require('../controller/admin/controller.admin.client')
var dataBase

const sendDb = (db) => {
    dataBase = db
}

const home = (req, res) => {
    console.log(req.session);
    res.setHeader("Content-Type", "text/plain")
    res.send('API FOR GARAGE WEB')
    res.end()
}

const client = (req, res) => {
    res.setHeader("Content-Type", "text/plain")
    if (req.session.usernameAdmin) {
        controllerAdminClient.getAllClient(dataBase, res)
    } else {
        res.send({ message: "ADMIN NOT CONNECTED" })
    }
}

const clientOne = (req, res) => {
    res.setHeader("Content-Type", "text/plain")
    if (req.session.usernameAdmin) {
        controllerAdminClient.getOneClient(dataBase, res, req)
    } else {
        res.send({ message: "ADMIN NOT CONNECTED" })
    }
}

const carList = (req, res) => {
    res.setHeader("Content-Type", "text/plain")
    if (req.session.usernameAdmin) {
        controllerAdminClient.getAllCar(dataBase, res)
    } else {
        res.send({ message: "ADMIN NOT CONNECTED" })
    }
}

const carOne = (req, res) => {
    res.setHeader("Content-Type", "text/plain")
    if (req.session.usernameAdmin) {
        controllerAdminClient.getOneCar(dataBase, res, req)
    } else {
        res.send({ message: "ADMIN NOT CONNECTED" })
    }
}

const carReceptionne = (req, res) => {
    res.setHeader("Content-Type", "text/plain")
    if (req.session.usernameAdmin) {
        controllerAdminClient.receptionneCar(dataBase, res, req)
    } else {
        res.send({ message: "ADMIN NOT CONNECTED" })
    }
}

const login = (req, res) => {
    res.setHeader("Content-Type", "text/plain")
    controllerAdminClient.LoginAdmin(dataBase, res, req)
}

const add = (req, res) => {
    res.setHeader("Content-Type", "text/plain")
    controllerAdminClient.AddAdmin(dataBase, res, req)
}

const logout = (req, res) => {
    res.setHeader("Content-Type", "text/plain")
    controllerAdminClient.LogoutAdmin(res, req)
}

exports.home = home
exports.client = client
exports.clientOne = clientOne
exports.carList = carList
exports.carOne = carOne
exports.carReceptionne = carReceptionne
exports.add = add
exports.login = login
exports.logout = logout
exports.sendDb = sendDb