const fs = require("fs");
const User = require("../class/User");
const getUsers = require("./getUsers");
const crypto = require("crypto");

module.exports = (newUser) => {
  try {
    newUser.password = crypto.createHash('sha256').update(newUser.password).digest('base64');
    newUser = new User(newUser.username, newUser.password);

    let newData = [newUser];
    const data = getUsers();

    if (data !== "Error") {
      newData = JSON.parse(data);

      if (!newData.every((elem) => elem.username !== newUser.username))
        return [403, "O username já está em uso"];
      newData.push(newUser);
    }
    fs.writeFileSync(
      "./infrastructure/dataUsers.json",
      JSON.stringify(newData)
    );
    return [201, newUser];
  } catch (err) {
    console.log(err);
    return [500, err];
  }
};
