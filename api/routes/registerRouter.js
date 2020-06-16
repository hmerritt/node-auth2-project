const express = require("express");
const bcrypt = require("bcryptjs");
const Users = require("../db/Users");

const router = express.Router();

router.post("/", async (req, res, next) => {
    // Get user info from request body
    const user = req.body;

    // Hashed password
    const hash = bcrypt.hashSync(user.password, 12);

    // Replace plain-text pass with hashed one
    user.password = hash;

    // Add user to db
    Users.add(user)
        .then((dbUser) => {
            res.json({
                id: dbUser,
                username: user.username,
                password: user.password,
                department: user.department,
            });
        })
        .catch((error) => next(error));
});

module.exports = router;
