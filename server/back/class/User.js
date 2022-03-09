const { randomBytes } = require('crypto');

module.exports = class User {
  constructor(name, password) {
    this.username = name;
    this.password = password;
    this.level = 1;
    this.moviesPiece = 0;
    this.moviesPieceAll = {};
    this.id = randomBytes(10).toString('hex');
  }
};
