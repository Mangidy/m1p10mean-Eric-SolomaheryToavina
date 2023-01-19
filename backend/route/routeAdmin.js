const controllerAdminClient = require('../controller/admin/controller.admin.client')
var clientCo

const sendDb = (client) => {
    clientCo = client
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

const factureTF = (req, res) => {
    if (req.session.usernameAdmin) {
        controllerAdminClient.getAllFactureTr(dataBase, res, req)
    } else {
        res.send({ message: "ADMIN NOT CONNECTED" })
    }
}

const factureValidate = (req, res) => {
    if (req.session.usernameAdmin) {
        controllerAdminClient.ValidFacture(dataBase, res, req)
    } else {
        res.send({ message: "ADMIN NOT CONNECTED" })
    }
}

const carOut = (req, res) => {
    if (req.session.usernameAdmin) {
        controllerAdminClient.CarClientOut(dataBase, res, req)
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

const carreparation = (req, res) => {
    if (req.session.usernameAdmin) {
        controllerAdminClient.AddCarReparation(dataBase, req, res)
    } else {
        res.send({ message: "ADMIN NOT CONNECTED" })
    }
}

const carReceptionneFacture = (req, res) => {
    if (req.session.usernameAdmin) {
        controllerAdminClient.receptionneCarFacture(dataBase, res, req)
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
exports.carreparation = carreparation
exports.client = client
exports.facture = facture
exports.factureTF = factureTF
exports.carOut = carOut
exports.factureValidate = factureValidate
exports.clientOne = clientOne
exports.carList = carList
exports.carOne = carOne
exports.carReceptionneFacture = carReceptionneFacture
exports.add = add
exports.login = login
exports.logout = logout
exports.sendDb = sendDb