'use strict';
const db = require("../models/index");

module.exports = async function (request, response, next) {

    const token = request.header("auth_token");

    if (token) {
        const authToken = await db.AuthToken.findOne({
            where: { token },
            include: db.User
        });

        if (authToken) {
            request.user = authToken.User;
        }
    }

    next();
}