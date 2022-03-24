const configDb = require('../config/configDb')

module.exports = async (user) => {
  try{
    const result = await configDb.query(`SELECT movies_piece FROM level_movies WHERE id_user = ${user.id} AND level = ${user.currentLevel}`);        
    //Caso não possua um ranking salvo 
    if(result.rows.length < 1){
      if(user.currentLevel <= 10){
        await configDb.query(`UPDATE users SET level = (level+1) WHERE id = ${user.id}`);
      }
      await configDb.query(`INSERT INTO level_movies(id_user, level, movies_piece) VALUES(${user.id}, ${user.currentLevel}, ${user.moviesPiece})`);
    }//Caso a pontuação atual for melhor
    else if(result.rows[0].movies_piece > user.moviesPiece){
      await configDb.query(`UPDATE level_movies SET movies_piece = ${user.moviesPiece} WHERE id_user = ${user.id} AND level = ${user.currentLevel}`);
    }
    //Somar e depois fazer o update na tabela de users    
    const sum = (await configDb.query(`SELECT movies_piece FROM level_movies WHERE id_user = ${user.id}`))
      .rows.reduce((acc, current) => acc += current.movies_piece, 0);
    await configDb.query(`UPDATE users SET movies_piece_all = ${sum} WHERE id = ${user.id}`);
    
    return "Atualizado com sucesso";
  }catch(e){
    console.log(e);
    return "Error";
  }
};
