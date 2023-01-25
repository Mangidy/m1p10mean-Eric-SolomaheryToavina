const controllerAdminClient = require('../controller/admin/controller.admin.client')
var clientCo

function sendDb(client) {
    clientCo = client
}

async function home(req, res) {
    if (req.session.usernameAdmin) {
        try {
            await clientCo.connect();
            await controllerAdminClient.HomeAdmin(clientCo, req, res)
        } catch (e) {
            console.log(e);
        } finally {
            await clientCo.close();
        }
    } else {
        res.send({ message: "ADMIN NOT CONNECTED" })
    }
}

async function facture(req, res) {
    if (req.session.usernameAdmin) {
        try {
            await clientCo.connect();
            await controllerAdminClient.getAllFacture(clientCo, res)
        } catch (e) {
            console.log(e);
        } finally {
            await clientCo.close();
        }
    } else {
        res.send({ message: "ADMIN NOT CONNECTED" })
    }
}

async function factureTF(req, res) {
    if (req.session.usernameAdmin) {
        try {
            await clientCo.connect();
            await controllerAdminClient.getAllFactureTr(clientCo, res, req)
        } catch (e) {
            console.log(e);
        } finally {
            await clientCo.close();
        }
    } else {
        res.send({ message: "ADMIN NOT CONNECTED" })
    }
}

async function factureValidate(req, res) {
    if (req.session.usernameAdmin) {
        try {
            await clientCo.connect();
            await controllerAdminClient.ValidFacture(clientCo, res, req)
        } catch (e) {
            console.log(e);
        } finally {
            await clientCo.close();
        }
    } else {
        res.send({ message: "ADMIN NOT CONNECTED" })
    }
}

async function carOut(req, res) {
    if (req.session.usernameAdmin) {
        try {
            await clientCo.connect();
            await controllerAdminClient.CarClientOut(clientCo, res, req)
        } catch (e) {
            console.log(e);
        } finally {
            await clientCo.close();
        }
    } else {
        res.send({ message: "ADMIN NOT CONNECTED" })
    }
}

async function carOutList(req, res) {
    if (req.session.usernameAdmin) {
        try {
            await clientCo.connect();
            await controllerAdminClient.ListCarClientOut(clientCo, res, req)
        } catch (e) {
            console.log(e);
        } finally {
            await clientCo.close();
        }
    } else {
        res.send({ message: "ADMIN NOT CONNECTED" })
    }
}

async function client(req, res) {
    if (req.session.usernameAdmin) {
        try {
            await clientCo.connect();
            await controllerAdminClient.getAllClient(clientCo, res)
        } catch (e) {
            console.log(e);
        } finally {
            await clientCo.close();
        }
    } else {
        res.send({ message: "ADMIN NOT CONNECTED" })
    }
}

async function clientOne(req, res) {
    if (req.session.usernameAdmin) {
        try {
            await clientCo.connect();
            await controllerAdminClient.getOneClient(clientCo, res, req)
        } catch (e) {
            console.log(e);
        } finally {
            await clientCo.close();
        }
    } else {
        res.send({ message: "ADMIN NOT CONNECTED" })
    }
}

async function carSearchAdmin(req, res) {
    if (req.session.usernameAdmin) {
        try {
            await clientCo.connect();
            await controllerAdminClient.carSearchControlleAdmin(clientCo, req, res)
        } catch (e) {
            console.log(e);
        } finally {
            await clientCo.close();
        }
    } else {
        res.send({ message: "ADMIN NOT CONNECTED" })
    }
}
async function clientSearchAdmin(req, res) {
    if (req.session.usernameAdmin) {
        try {
            await clientCo.connect();
            await controllerAdminClient.clientSearchControlleAdmin(clientCo, req, res)
        } catch (e) {
            console.log(e);
        } finally {
            await clientCo.close();
        }
    } else {
        res.send({ message: "ADMIN NOT CONNECTED" })
    }
}

async function carList(req, res) {
    if (req.session.usernameAdmin) {
        try {
            await clientCo.connect();
            await controllerAdminClient.getAllCar(clientCo, res)
        } catch (e) {
            console.log(e);
        } finally {
            await clientCo.close();
        }
    } else {
        res.send({ message: "ADMIN NOT CONNECTED" })
    }
}
async function carReceptionList(req, res) {
    if (req.session.usernameAdmin) {
        try {
            await clientCo.connect();
            await controllerAdminClient.getAllCarReception(clientCo, res)
        } catch (e) {
            console.log(e);
        } finally {
            await clientCo.close();
        }
    } else {
        res.send({ message: "ADMIN NOT CONNECTED" })
    }
}

async function carOne(req, res) {
    if (req.session.usernameAdmin) {
        try {
            await clientCo.connect();
            await controllerAdminClient.getOneCar(clientCo, res, req)
        } catch (e) {
            console.log(e);
        } finally {
            await clientCo.close();
        }
    } else {
        res.send({ message: "ADMIN NOT CONNECTED" })
    }
}

async function carreparation(req, res) {
    if (req.session.usernameAdmin) {
        try {
            await clientCo.connect();
            await controllerAdminClient.AddCarReparation(clientCo, req, res)
        } catch (e) {
            console.log(e);
        } finally {
            await clientCo.close();
        }
    } else {
        res.send({ message: "ADMIN NOT CONNECTED" })
    }
}

async function carReceptionneFacture(req, res) {
    if (req.session.usernameAdmin) {
        try {
            await clientCo.connect();
            await controllerAdminClient.receptionneCarFacture(clientCo, res, req)
        } catch (e) {
            console.log(e);
        } finally {
            await clientCo.close();
        }
    } else {
        res.send({ message: "ADMIN NOT CONNECTED" })
    }
}

async function login(req, res) {
    try {
        await clientCo.connect();
        await controllerAdminClient.LoginAdmin(clientCo, res, req)
    } catch (e) {
        console.log(e);
    } finally {
        await clientCo.close();
    }
}

async function add(req, res) {
    try {
        await clientCo.connect();
        await controllerAdminClient.AddAdmin(clientCo, res, req)
    } catch (e) {
        console.log(e);
    } finally {
        await clientCo.close();
    }
}

function logout(req, res) {
    controllerAdminClient.LogoutAdmin(res, req)
}

exports.home = home
exports.carreparation = carreparation
exports.client = client
exports.facture = facture
exports.factureTF = factureTF
exports.carSearchAdmin = carSearchAdmin
exports.carOut = carOut
exports.carOutList = carOutList
exports.factureValidate = factureValidate
exports.clientOne = clientOne
exports.carList = carList
exports.carReceptionList= carReceptionList
exports.carOne = carOne
exports.carReceptionneFacture = carReceptionneFacture
exports.clientSearchAdmin = clientSearchAdmin
exports.add = add
exports.login = login
exports.logout = logout
exports.sendDb = sendDb