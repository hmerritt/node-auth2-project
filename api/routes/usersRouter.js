const express = require("express");
const Users = require("../db/Users");

const router = express.Router();

router.get("/", async (req, res, next) => {

    // Fetch all user info
    const [user] = await Users.findBy("username", req.decodedToken.username);

    // Only get users with the same 'department'
    // as current user
    Users.findBy("department", user.department)
        .then((dbUsers) => {
            res.json(dbUsers);
        })
        .catch((error) => {
            next(error);
        });
});

module.exports = router;
