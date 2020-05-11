const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Users = require("../db/Users");

module.exports = (req, res, next) => {
    // Get data from request
    const { authorization } = req.headers;
    const secret = process.env.JWT_SECRET || "sUpeR sEcret cOde";

    // Verify user is logged-in
    if (authorization) {
        jwt.verify(authorization, secret, (err, decodedToken) => {
            if (!err) {
                req.decodedToken = decodedToken;
                return next();
            }
        });
    }
    else {
        res.status(401).json({ message: "You shall not pass!" });
    }

};
