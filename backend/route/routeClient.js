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

const carClient = (req, res) => {
    controllerClient.GetCarClient(dataBase, req, res)
}

const carreparation = (req, res) => {
    controllerClient.AddCarReparation(dataBase, req, res)
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
exports.carClient = carClient
exports.carreparation = carreparation

exports.subscribe = subscribe
exports.login = login
exports.logout = logout
exports.sendDb = sendDb