const cadasterUser = require("../models/cadasterUser");
const loginUser = require("../models/loginUser");

module.exports = app => {   
    // req.body tem que conter {'username', 'password'}
    app.post('/cadaster-user', (req, res) => {
        if(!req.body.username || !req.body.password || Object.keys(req.body).length !== 2) res.end("O seu username está vazio ou a senha está vazia, ou algo deu errado");
        else res.send(cadasterUser(req.body));
    });

    // req.body tem que conter {'username', password}
    app.post('/login-user', (req, res) => {
        if(!req.body.username || !req.body.password || Object.keys(req.body).length !== 2) res.end("O seu username está vazio ou a senha está vazia, ou algo deu errado");
        else res.send(loginUser(req.body));
    })
}