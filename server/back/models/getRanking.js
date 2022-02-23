const getUsers = require("./getUsers");

module.exports = () => {
  const users = JSON.parse(getUsers());

  if (users === "Error") return [];

  const userReturn = users.map((elem) => {
    return {
      username: elem.username,
      level: elem.level,
      moviesPiece: elem.moviesPiece,
    };
  });

  return userReturn;
};
