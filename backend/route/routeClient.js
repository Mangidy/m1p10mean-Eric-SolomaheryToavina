const controllerClient = require('../controller/client/controller.client')
var dataBase

const sendDb = (db) => {
    dataBase = db
}

const home = (req, res) => {
    controllerClient.HomeClient(dataBase, req, res)
}

const car = (req, res) => {
    controllerClient.AddCarClient(dataBase, req, res)
}

const notificationClient = (req, res) => {
    controllerClient.NotificationClient(dataBase, req, res)
}

const carOne = (req, res) => {
    controllerClient.GetCarOne(dataBase, req, res)
}

const facture = (req, res) => {
    controllerClient.GetFactureClient(dataBase, req, res)
}

const factureId = (req, res) => {
    controllerClient.GetFactureIdClient(dataBase, req, res)
}

const carClient = (req, res) => {
    controllerClient.GetCarClient(dataBase, req, res)
}

const carClientReception = (req, res) => {
    controllerClient.GetCarClientReception(dataBase, req, res)
}


const login = (req, res) => {
    controllerClient.LoginClient(dataBase, res, req, false)
}

const subscribe = (req, res) => {
    controllerClient.SubScribeClient(dataBase, res, req)
}

const logout = (req, res) => {
    controllerClient.LogoutClient(res, req)
}

exports.home = home
exports.car = car
exports.notificationClient = notificationClient
exports.facture = facture
exports.factureId = factureId
exports.carClient = carClient
exports.carOne = carOne
exports.carClientReception = carClientReception

exports.subscribe = subscribe
exports.login = login
exports.logout = logout
exports.sendDb = sendDb