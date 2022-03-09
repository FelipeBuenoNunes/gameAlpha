const fs = require("fs");
const getUsers = require("./getUsers");

module.exports = (user) => {
  try {
    const dataUsers = JSON.parse(getUsers());

    dataUsers.some((userCurrent) => {
      if (userCurrent.id === user.id) {
        console.log("AAAAAAA");
        if (userCurrent.level !== 10 && userCurrent.level === user.currentLevel) userCurrent.level += 1;
        if(user.moviesPiece < userCurrent.moviesPieceAll[user.currentLevel] || !userCurrent.moviesPieceAll[user.currentLevel]){
          userCurrent.moviesPieceAll[user.currentLevel] = Number(user.moviesPiece);
          userCurrent.moviesPiece = 0;
          Object.values(userCurrent.moviesPieceAll).forEach(element => {
            userCurrent.moviesPiece += element;
          });
        }
        return true;
      }
      return false;
    });

    dataUsers.sort(function (a, b) {
      if (a.level === b.level) {
        return a.moviesPiece - b.moviesPiece;
      }
      return b.level - a.level;
    });

    fs.writeFileSync(
      "./infrastructure/dataUsers.json",
      JSON.stringify(dataUsers)
    );

    return "Atualizado com sucesso";
  } catch (e) {
    console.log(e);
    return e;
  }
};
