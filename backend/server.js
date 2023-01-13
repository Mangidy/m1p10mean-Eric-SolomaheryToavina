const app = require("./app")
const routeAdmin = require("./routeAdmin")

app.start(4000, routeAdmin)