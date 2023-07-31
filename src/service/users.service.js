const bcrypt = require("bcrypt");
const UserDB = require("../db/users.db");

const findByUsername = (username) => {
    return UserDB.find((user) => {
        return user.username === username;
    })
}

const addUser = async(username, password, name) => {
    const hashedPassword = await bcrypt.hash(password, 10)
    console.log(hashedPassword)
    UserDB.push({ username, password: hashedPassword, name, role: "USER", blocked: false });
}

module.exports = {
    findByUsername,
    addUser
}