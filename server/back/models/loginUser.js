const getUsers = require("./getUsers")

module.exports = (user) => {
    const userCurrent = JSON.parse(getUsers()).filter(element => element.username === user.username)[0];
    if(!userCurrent) return "Usuário não existente"
    if(userCurrent.password === user.password) return {"username": userCurrent.username, "level": userCurrent.level, "moviesPiece": userCurrent.moviesPiece};
    else return "Senha incorreta";
}