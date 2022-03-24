const updateRanking = require("../models/updateRanking");
const getRanking = require("../models/getRanking");

module.exports = (app) => {
  // req.body tem que conter {'username', 'movesPiece', 'id', currentLevel}
  app.put("/ranking", async (req, res) => {
    if ( !req.body.username || !req.body.id || !req.body.moviesPiece || !req.body.currentLevel || Object.keys(req.body).length < 4 )
      res.status(422).send("Algo deu errado");
    else res.send(await updateRanking(req.body));
  });

  app.get("/ranking", async (req, res) => {
    res.json(await getRanking());
  });
};
