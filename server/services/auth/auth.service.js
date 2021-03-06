const db = require("../../models/index");
const errors = require("restify-errors");
const bcrypt = require("bcrypt");

async function generateToken(user) {
    if (!user) {
        throw new errors.InternalServerError("Auth token requires user id.");
    }

    const token = await bcrypt.hash(user.email, 2);
    const result = await db.AuthToken.create({ token, userId: user.id });

    return result;
}

module.exports = {
    generateToken
}