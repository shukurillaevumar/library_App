const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userService = require("../service/users.service");

const generateToken = (user) => {
    return jwt.sign (
        { 
            name: user.name,
            username: user.username,
            role: user.role
        },
        "your-secret-key",
        {
            expiresIn: "1hr"
        }
    );
}

const authenticate = async (req, res, next) => {
    const { username, password } = req.body;
    const user = userService.findByUsername(username);
    if (!user) {
        return res.status(401).json({ error: "Invalid username" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid) {
        return res.status(401).json({ error: "Invalid password"})
    }

    const token = generateToken(user);
    req.user = { name: user.name, role: user.role };
    req.token = token;
    next();
}

const authorize = () => {

}

module.exports = {
    authenticate,
    authorize
}