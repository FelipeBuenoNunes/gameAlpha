const fs = require('fs');
const getUsers = require('./getUsers');

module.exports = (id) =>{
    const users = JSON.parse(getUsers());

    users.some((elem, index) => {
        if(elem.id === id){
            elem.level = 1;
            elem.moviesPiece = 0;
            users.splice(index, 1);
            users.push(elem);
            return true;
        }
    });

    fs.writeFileSync('./infrastructure/dataUsers.json', JSON.stringify(users));
    return "atualizado com sucesso"
}