'use strict';
const db = require("../models/index");
const errors = require("restify-errors");
const messages = require("../common/messages");

module.exports = async function (request, response, next) {

    const token = request.header("auth_token");

    if (token) {
        const authToken = await db.AuthToken.findOne({
            where: { token },
            include: [{
                model: db.User,
                as: "user"
            }]
        });

        if (!authToken || !authToken.user) {
            response.send(401, new errors.UnauthorizedError(messages.unauthorized));
            return;
        }

        request.user = authToken.user;
        next();

    } else {
        const allowAnonymous = request.method === "POST" &&
            (request.url === "/auth/login" || request.url === "/auth/register");

        if (!allowAnonymous) {
            response.send(401, new errors.UnauthorizedError(messages.unauthorized));
            return;
        }

        next();
    }
}