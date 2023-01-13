const app = require("./app")
const routeAdmin = require("./routeAdmin")
const routeClient = require("./routeClient")

app.start(4000, routeAdmin, routeClient)