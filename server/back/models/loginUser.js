const crypto = require("crypto");
const configDb = require('../config/configDb');

module.exports = async (user) => {

  try{
    user.password = crypto.createHash('sha256').update(user.password).digest('hex');
    //Pegando o user no banco de dados
    
    //ARRUMAR A SENHA
    
    const result = await configDb.query(`SELECT id, username, level, password FROM users WHERE username = '${user.username}'`);
    //Caso a senha esteja incorreta
    if(result.rows.length < 1 || !(result.rows[0].password === user.password)) return "Usuário ou senha incorreta"
    //Deletando password para mandar para o front sem
    delete result.rows[0].password;
    result.rows[0].level += 1;
    return [200, result.rows[0]];
  }catch(e){
    console.log(e);
    return [500, "error"]
  }
};
