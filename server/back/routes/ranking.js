const cadasterRanking = require("../models/cadasterRanking");
const getRanking = require("../models/getRanking");

module.exports = app => {
    // req.body tem que conter {'user', 'level', 'movesPiece'}
    app.put('/ranking', (req, res) => {
        if(!req.body || !req.body.username || !req.body.level || !req.body.moviesPiece || Object.keys(req.body).length < 3) res.send('Algo deu errado');
        else res.json(cadasterRanking(req.body));
    });

    app.get('/ranking', (req, res) => {
        res.json(getRanking());
    });
}