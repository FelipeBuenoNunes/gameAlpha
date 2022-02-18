const fs = require('fs');
const getUsers = require('./getUsers');

module.exports = (user) => {
    try {
        //let newScore = [user];
        const dataUsers = JSON.parse(getUsers());
        // const userCurrent = dataUsers.filter(element => element.username === user.username)[0];
        // userCurrent.level = user.level;
        // userCurrent.moviesPiece = user.moviesPiece;

        dataUsers.some(userCurrent => {
            if (userCurrent.username === user.username) {
                userCurrent.level = user.level;
                userCurrent.moviesPiece = user.moviesPiece;
                return true;
            }
            return false;
        });

        dataUsers.sort(
            function(a, b) {          
               if (a.level === b.level) {
                  return a.moviesPiece - b.moviesPiece;
               }
               return b.level - a.level;
            });
         

        fs.writeFileSync('./infrastructure/dataUsers.json', JSON.stringify(dataUsers));

        return "Cadastrado com sucesso";

        // let newScore = [score];
        // const dataRanking = getRanking();
        // if (dataRanking !== "Error") {
        //     newScore = JSON.parse(dataRanking);
        //     if (newScore.length < 10) newScore.push(score);
        //     else {
        //         let validation = true;
        //         newScore = newScore.reduce((acc, current) => {
        //             if (validation && score.level > current.level) {
        //                 acc.push(score);
        //                 validation = false;
        //             }
        //             else if (validation && score.level === current.level && score.moviesPiece < current.moviesPiece) {
        //                 acc.push(score);
        //                 validation = false;
        //             }

        //             acc.push(current)
        //             return acc;
        //         }, [])
        //         if (newScore.length > 10) {
        //             newScore.pop();
        //         }
        //     }
        //}
        //console.log(newScore);
    }
    catch (e) {
        console.log(e);
        return e;
    }
}