const getUsers = require("./getUsers")

module.exports = (user) => {
    try{
        const userCurrent = JSON.parse(getUsers()).filter(element => element.username === user.username)[0];
        if(!userCurrent || userCurrent.password !== user.password) return "Usuário ou senha incorreta";
        else return [200, {"username": userCurrent.username, "level": userCurrent.level, "moviesPiece": userCurrent.moviesPiece}];
    }
    catch(e){
        return [500, "error"];
    }
}