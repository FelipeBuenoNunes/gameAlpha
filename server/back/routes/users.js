const cadasterUser = require("../models/cadasterUser");
const loginUser = require("../models/loginUser");
const resetAccount = require("../models/resetAccount");

module.exports = (app) => {
  // req.body tem que conter {'username', 'password'}
  app.post("/cadaster-user", (req, res) => {
    if (!req.body.username || !req.body.password || Object.keys(req.body).length !== 2) {
      res.status(400);
      res.send("O seu username está vazio ou a senha está vazia, ou algo deu errado");
    } else {
      const response = cadasterUser(req.body);
      if (response[0] === 201) {
        res.status(201);
        res.json(response[1]);
      } else {
        res.status(response[0]);
        res.send(response[1]);
      }
    }
  });

  // req.body tem que conter {'username', password}
  app.post("/login-user", (req, res) => {
    if (
      !req.body.username ||
      !req.body.password ||
      Object.keys(req.body).length !== 2
    )
      res.end(
        "O seu username está vazio ou a senha está vazia, ou algo deu errado"
      );
    else {
      const response = loginUser(req.body);
      if (response[0] === 200) res.json(response[1]);
      else if (response[0] !== 500) {
        res.send(response);
      } else {
        res.status(500);
        res.end("Algo deu errado!");
      }
    }
  });

  app.put("/reset-account", (req, res) => {
    if(!req.body.id || req.body.length > 1) res.send('O ID precisa ser enviado!');
    else res.send(resetAccount(req.body.id));
  });
};
