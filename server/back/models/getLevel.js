const fs = require("fs");
const getUsers = require("./getUsers");

module.exports = (lvl) => {
  const teste = JSON.parse(
    fs.readFileSync("./infrastructure/levels.json", "utf-8")
  )[lvl - 1];
  return teste;
};
