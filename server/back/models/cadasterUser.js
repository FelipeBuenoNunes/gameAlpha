const fs = require('fs');
const getUsers = require('./getUsers');

module.exports = newUser => {
    try {
        newUser.level = 1;
        newUser.moviesPiece = 0;

        let newData = [newUser];
        const data = getUsers();

        if (data !== "Error") {
            newData = JSON.parse(data);

            if (!newData.every(elem => elem.username !== newUser.username)) return [403, "O username já está em uso"];
            newData.push(newUser);
        }
        fs.writeFileSync('./infrastructure/dataUsers.json', JSON.stringify(newData));
        
        return [201, { "username": newUser.username, "level": newUser.level, "moviesPiece": newUser.moviesPiece }];
    }
    catch (err) {
        console.log(err);
        return [500, err];
    }
}