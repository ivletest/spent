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

        const isAllowed = request.method === "POST" &&
                          (request.url === "/auth/login" ||
                          request.url === "/auth/register");

        if (authToken) {
            request.user = authToken.User;
        } else if (!isAllowed) {
            response.send(401, errors.UnauthorizedError(messages.unauthorized));
        }
    }

    next();
}