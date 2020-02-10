'use strict';
const db = require("../models/index");
const errors = require("restify-errors");
const messages = require("../common/messages");

const allowAnonymous = ["/auth/login", "/auth/register"];
const allowUnverified = ["/auth/logout"];

module.exports = async function (request, response, next) {

    const requestToken = request.header("auth_token");

    if (requestToken) {
        const token = await db.AuthToken.findOne({
            where: { token: requestToken },
            include: [{
                model: db.User,
                as: "user"
            }]
        });

        if (!token || !token.user) {
            response.send(401, new errors.UnauthorizedError(messages.unauthorized));
            return;
        }

        if (!token.user.emailIsValid && !allowUnverified.includes(request.url)) {
            response.send(403, new errors.ForbiddenError(messages.emailNotVerified));
            return;
        }

        request.user = token.user;

    } else if (!allowAnonymous.includes(request.url)) {
        response.send(401, new errors.UnauthorizedError(messages.unauthorized));
        return;

    }

    next();
}