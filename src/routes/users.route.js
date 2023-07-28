const express = require("express");
const router = express.Router();
const userService = require("../service/users.service");
const { authenticate } = require("../middleware/auth.middleware");

router.post("/register", (req, res) => {
    const { username, password, name } = req.body;

    if (!username || !password || !name) {
        return res
        .status(400)
        .json({ error: "Username, password and name are required" })
    }
    const existingUser = userService.findByUsername(username);
    if(existingUser) {
        res
        .status(409)
        .json({ error: "Username is already exists" })
    } else {
        userService.addUser( username, password, name );
        res.status(201).json({ message: "User registered successfully" });
    }
});

router.post("/login", authenticate, (req, res) => {
    res.json({ user: req.user, token: req.token })
});


module.exports = router;