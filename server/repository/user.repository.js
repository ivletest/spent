const db = require("../models/index");

async function create(userData) {

    let result;

    await db.User.findOrCreate({
        where: { email: userData.email },
        defaults: {
            name: userData.username,
            passwordHash: userData.passwordHash,
            passwordSalt: userData.passwordSalt,
            role: "user",
            email: userData.email
        }
    }).spread((user, created) => {
        result = {
            status: created ? 201 : 409,
            data: {
                success: created,
                uid: user.uid,
                username: user.name,
                email: user.email
            }
        }
    });

    return result;
}

module.exports = {
    createUser: create
};
