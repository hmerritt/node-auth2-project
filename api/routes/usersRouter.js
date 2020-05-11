const express = require("express");
const Users = require("../db/Users");

const router = express.Router();

router.get("/", async (req, res, next) => {
    //
    Users.getAll("users")
        .then((dbUsers) => {
            res.json(dbUsers);
        })
        .catch((error) => {
            next(error);
        });
});

module.exports = router;
