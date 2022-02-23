const fs = require('fs');
const crypto = require('crypto-js');
var SHA256 = require("crypto-js/sha256");
const User = require('../class/User');
const getUsers = require('./getUsers');

module.exports = newUser => {
    try {
        newUser.password = SHA256(newUser.password).toString(crypto.enc.Base64);
        newUser = new User(newUser.username, newUser.password);

        let newData = [newUser];
        const data = getUsers();

        if (data !== "Error") {
            newData = JSON.parse(data);

            if (!newData.every(elem => elem.username !== newUser.username)) return [403, "O username já está em uso"];
            newData.push(newUser);
        }
        fs.writeFileSync('./infrastructure/dataUsers.json', JSON.stringify(newData));
        return [201, newUser];
    }
    catch (err) {
        console.log(err);
        return [500, err];
    }
}