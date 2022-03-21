const configDb = require('../config/configDb');

module.exports = async () => {
  try{
    //Retornando o ranking já ordenado e já no limite;
    return (await configDb.query(`SELECT username, level, movies_piece_all FROM users ORDER BY level DESC, movies_piece_all LIMIT 10`)).rows;    
  }catch(e){
    console.log(e);
    return "Error";
  }
};
