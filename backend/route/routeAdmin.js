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
        res.redirect("/")
    }
}

const login = (req, res) => {
    res.setHeader("Content-Type", "text/plain")
    controllerAdminClient.LoginAdmin(dataBase, res, req)
}

const logout = (req, res) => {
    res.setHeader("Content-Type", "text/plain")
    controllerAdminClient.LogoutAdmin(res, req)
}

exports.home = home
exports.client = client
exports.login = login
exports.logout = logout
exports.sendDb = sendDb