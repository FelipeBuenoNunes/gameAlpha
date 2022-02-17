const fs = require('fs');

module.exports = () => {
    try{
        return fs.readFileSync('./infrastructure/dataUsers.json', "utf-8");
    }
    catch(err){
        return "Error";
    }
}