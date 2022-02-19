const fs = require('fs');
const getUsers = require('./getUsers');

module.exports = (user) => {
    try {
        const dataUsers = JSON.parse(getUsers());

        dataUsers.some(userCurrent => {
            if (userCurrent.username === user.username) {
                userCurrent.level += 1;
                userCurrent.moviesPiece += Number(user.moviesPiece);
                return true;
            }
            return false;
        });

        dataUsers.sort(
            function(a, b) {          
               if (a.level === b.level) {
                  return a.moviesPiece - borinthg.moviesPiece;
               }
               return b.level - a.level;
            });
         

        fs.writeFileSync('./infrastructure/dataUsers.json', JSON.stringify(dataUsers));

        return "Cadastrado com sucesso";
    }
    catch (e) {
        console.log(e);
        return e;
    }
}