const getLevel = require("../models/getLevel");

module.exports = app => {
    app.get('/getLevel', (req, res) => {
        res.json(getLevel(req.query.lvl));
    })
}