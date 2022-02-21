const fs = require('fs');
const User = require('../class/User');
const getUsers = require('./getUsers');

module.exports = newUser => {
    try {
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