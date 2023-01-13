const controllerClient = require('./controller/client/controller.client')
var dataBase

const sendDb = (db) => {
    dataBase = db
}

const home = (req, res) => {
    res.setHeader("Content-Type", "text/plain")
    controllerClient.HomeClient(dataBase, req, res)
}

const car = (req, res) => {
    res.setHeader("Content-Type", "text/plain")
    controllerClient.AddCarClient(dataBase, req, res)
}

const login = (req, res) => {
    res.setHeader("Content-Type", "text/plain")
    controllerClient.LoginClient(dataBase, res, req, false)
}

const subscribe = (req, res) => {
    res.setHeader("Content-Type", "text/plain")
    controllerClient.SubScribeClient(dataBase, res, req)
}

const logout = (req, res) => {
    res.setHeader("Content-Type", "text/plain")
    controllerClient.LogoutClient(res, req)
}

exports.home = home
exports.car = car

exports.subscribe = subscribe
exports.login = login
exports.logout = logout
exports.sendDb = sendDb