const cadasterRanking = require("../models/cadasterRanking");
const getRanking = require("../models/getRanking");

module.exports = app => {
    // req.body tem que conter {'user', 'movesPiece', 'id'}
    app.put('/ranking', (req, res) => {
        console.log(req.body);
        if(!req.body.username || !req.body.id || !req.body.moviesPiece || Object.keys(req.body).length < 3) res.status(422).send('Algo deu errado');
        else res.send(cadasterRanking(req.body));
    });

    app.get('/ranking', (req, res) => {
        res.json(getRanking());
    });
}