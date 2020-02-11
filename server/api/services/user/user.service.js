'use strict'
const db = require("../../../db/models/index");
const authService = require("../auth/auth.service");
const errors = require("restify-errors");
const bcrypt = require("bcrypt");
const messages = require("../../common/messages");

async function authenticate(loginUser) {
    const user = await db.User.findOne({
        where: { email: loginUser.email }
    });

    if (!user) {
        throw new errors.UnauthorizedError(messages.invalidCredentials);
    }

    const passwordMatch = await bcrypt.compare(
        loginUser.password,
        user.passwordHash);

    if (!passwordMatch) {
        throw new errors.UnauthorizedError(messages.invalidCredentials);
    }

    return await authorize(user);
};

async function authorize(user) {

    let authToken;

    try {
        authToken = await authService.generateToken(user);
        await user.addAuthToken(authToken);
    } catch(error) {
        authToken = await db.AuthToken.findOne({ where: { user_id: user.id }})
    }

    const result = {
        data: {
            uid: user.uid,
            username: user.name,
            email: user.email,
        },
        token: authToken.token
    }

    return result;
};

async function logout(token) {

    await db.AuthToken.destroy({
        where: { token: token }
    });
};

async function create(registerUser) {

    let result;
    const passwordHash = await bcrypt.hash(registerUser.password, 10);

    await db.User.findOrCreate({
        where: { email: registerUser.email },
        defaults: {
            name: registerUser.username,
            passwordHash: passwordHash,
            email: registerUser.email,
            role: registerUser.role
        }
    }).spread(async (user, created) => {

        if (!created) {
            throw new errors.ConflictError(messages.userAlreadyExists);
        }

        const emailValidationUrl =
            `${process.env.HOST}/auth/validate/${user.uid}?validation_uid=${user.emailValidationUid}`;

        result = {
            username: user.name,
            email: user.email,
        }
    });

    return result;
}

async function verify(validateUserData) {
    await db.User.update({
        emailIsValid: true
    },
    {
        where: {
            uid: validateUserData.userUid,
            emailIsValid: false,
            emailValidationUid: validateUserData.emailValidationUid
        }
    });
}

module.exports = {
    create,
    logout,
    authorize,
    authenticate,
    verify
};