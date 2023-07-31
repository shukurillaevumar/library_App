const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userService = require("../service/users.service");

const generateToken = (user) => {
    return jwt.sign (
        { 
            name: user.name,
            username: user.username,
            role: user.role,
            blocked: user.blocked
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

const authorize = (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) {
        return res.status(401).json({ error: "Authorization token not found" });
    }

    try {
        const decodedUser = jwt.verify(token, "your-secret-key");
        if (decodedUser.blocked === true) {
            return res.status(403).json({ error: "You're blocked" })
        }
        req.user = decodedUser;
        console.log(decodedUser);
        next();
    } catch (error) {
        return res.status(403).json({ error: "Invalid token" })
    }
}

module.exports = {
    authenticate,
    authorize
}