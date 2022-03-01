const crypto = require("crypto");
const getUsers = require("./getUsers");

module.exports = (user) => {
  try {
    const userCurrent = JSON.parse(getUsers()).filter((element) => element.username === user.username)[0];
    user.password = crypto.createHash('sha256').update(user.password).digest('base64');
    if (!userCurrent || userCurrent.password !== user.password)
      return "Usuário ou senha incorreta";
    else return [200, userCurrent];
  } catch (e) {
    console.log(e);
    return [500, "error"];
  }
};
