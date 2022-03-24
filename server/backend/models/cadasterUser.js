const crypto = require("crypto");
const configDb = require('../config/configDb');

module.exports = async (newUser) => {
  try {
    newUser.password = crypto.createHash('sha256').update(newUser.password).digest('hex');
    //Inserindo na tabela
    await configDb.query(`INSERT INTO users(username, password) VALUES('${newUser.username}', '${newUser.password}')`);
    //Resultado para mandar para o front
    const result = (await configDb.query(`SELECT id, username, level FROM users WHERE username = '${newUser.username}'`)).rows[0];
    result.level += 1;
    return [201, result];
  } catch (e) {
    //Caso o nome de usuário já conste no DB
    if(e.code == "23505") return [200, "Nome de usuário ja existente"];
    console.log(e);
    return [500, "erro"];
  }
}