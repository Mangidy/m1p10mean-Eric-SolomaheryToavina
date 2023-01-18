const controllerAdminClient = require('../controller/admin/controller.admin.client')
var dataBase

const sendDb = (db) => {
    dataBase = db
}

const home = (req, res) => {
    if (req.session.usernameAdmin) {
        controllerAdminClient.HomeAdmin(dataBase, req, res)
    } else {
        res.send({ message: "ADMIN NOT CONNECTED" })
    }
}

const facture = (req, res) => {
    if (req.session.usernameAdmin) {
        controllerAdminClient.getAllFacture(dataBase, res)
    } else {
        res.send({ message: "ADMIN NOT CONNECTED" })
    }
}

const client = (req, res) => {
    if (req.session.usernameAdmin) {
        controllerAdminClient.getAllClient(dataBase, res)
    } else {
        res.send({ message: "ADMIN NOT CONNECTED" })
    }
}

const clientOne = (req, res) => {
    if (req.session.usernameAdmin) {
        controllerAdminClient.getOneClient(dataBase, res, req)
    } else {
        res.send({ message: "ADMIN NOT CONNECTED" })
    }
}

const carList = (req, res) => {
    if (req.session.usernameAdmin) {
        controllerAdminClient.getAllCar(dataBase, res)
    } else {
        res.send({ message: "ADMIN NOT CONNECTED" })
    }
}

const carOne = (req, res) => {
    if (req.session.usernameAdmin) {
        controllerAdminClient.getOneCar(dataBase, res, req)
    } else {
        res.send({ message: "ADMIN NOT CONNECTED" })
    }
}

const carReceptionne = (req, res) => {
    if (req.session.usernameAdmin) {
        controllerAdminClient.receptionneCar(dataBase, res, req)
    } else {
        res.send({ message: "ADMIN NOT CONNECTED" })
    }
}

const login = (req, res) => {
    controllerAdminClient.LoginAdmin(dataBase, res, req)
}

const add = (req, res) => {
    controllerAdminClient.AddAdmin(dataBase, res, req)
}

const logout = (req, res) => {
    controllerAdminClient.LogoutAdmin(res, req)
}

exports.home = home
exports.client = client
exports.facture = facture
exports.clientOne = clientOne
exports.carList = carList
exports.carOne = carOne
exports.carReceptionne = carReceptionne
exports.add = add
exports.login = login
exports.logout = logout
exports.sendDb = sendDb