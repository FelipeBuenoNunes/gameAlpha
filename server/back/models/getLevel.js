const fs = require("fs");

module.exports = (lvl) => {
  const teste = JSON.parse(
    fs.readFileSync("./infrastructure/levels.json", "utf-8")
  )[lvl - 1];
  return teste;
};
