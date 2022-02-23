const crypto = require('crypto-js');
const SHA256 = require('crypto-js/sha256');
const getUsers = require("./getUsers")

module.exports = (user) => {
    try {
        const userCurrent = JSON.parse(getUsers()).filter(element => element.username === user.username)[0];
        user.password = SHA256(user.password).toString(crypto.enc.Base64);
        if (!userCurrent || userCurrent.password !== user.password) return "Usuário ou senha incorreta";
        else return [200, userCurrent];
    }
    catch (e) {
        console.log(e);
        return [500, "error"];
    }
}