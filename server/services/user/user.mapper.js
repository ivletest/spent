'use strict';
require("../validation.service");
const bcrypt = require("bcrypt");
const errors = require("restify-errors");

function toRegisterUserModel(request, role) {

    const { username, email, password } = request.body;

    if (!username.isValidUsername() ||
        !email.isValidEmail()       ||
        !password.isValidPassword()) {
        throw new errors.BadRequestError("Invalid input data.");
    }

    const passwordHash = bcrypt.hashSync(password, 10);
    const registerUserModel = {
        username: username,
        email: email,
        passwordHash: passwordHash,
        role: role
    }

    return registerUserModel;
}

function toLoginUserModel(request) {

    const { email, password } = request.body;

    if (!email.isValidEmail() ||
        !password.isValidPassword()) {
        throw new errors.BadRequestError("Invalid input data.");
    }

    const loginUserModel = {
        email: email,
        password: password
    }

    return loginUserModel;
}

function toLogoutToken(request) {

    const { email, cookies: { auth_token: authToken } } = request;

    if (!email.isValidEmail() || !authToken) {
        throw new errors.BadRequestError("User not authenticated.");
    }

    return authToken;
}


module.exports = {
    toRegisterUserModel,
    toLoginUserModel,
    toLogoutToken
}
