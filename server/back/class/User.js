module.exports = class User{
    constructor(name, password){
        this.username = name;
        this.password = password;
        this.level = 1;
        this.moviesPiece = 0;
        this.id = Math.floor(Date.now() * Math.random() * 9999).toString(36);
    }
}