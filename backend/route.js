const home = (req, res) => {
    console.log(req.session);
    res.setHeader("Content-Type", "text/plain")
    res.send('API FOR GARAGE WEB')
    res.end()
}
exports.home = home