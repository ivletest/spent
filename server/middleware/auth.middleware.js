'use strict';
const db = require("../models/index");

module.exports = async function (req, res, next) {
    const token = req.cookies.auth_token || req.headers.authorization;

    if (token) {
        const authToken = await db.AuthToken.find({
            where: { token },
            include: db.User
        });

        if (authToken) {
            req.user = authToken.User;
        }

        next();
    }
}