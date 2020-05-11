const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Users = require("../db/Users");

const router = express.Router();

// JSON web-token
function generateToken(user) {
    const payload = {
        username: user.username,
    };

    const secret = process.env.JWT_SECRET || "sUpeR sEcret cOde";

    const options = {
        expiresIn: "1h",
    };

    return jwt.sign(payload, secret, options);
}

router.post("/", async (req, res, next) => {
    // Get user info from request body
    const user = req.body;

    // Get user from db (by username)
    Users.findBy(user.username, "username")
        .then(([dbUser]) => {
            // Compare password with one stored in db
            if (dbUser && bcrypt.compareSync(user.password, dbUser.password)) {
                // Create new token
                const token = generateToken(user);

                res.send({ message: `Logged in: ${dbUser.username}`, token });
            } else {
                // Passwords did not match :(
                res.status(401).json({ message: "You shall not pass!" });
            }
        })
        .catch((error) => {
            next(error);
        });
});

module.exports = router;
