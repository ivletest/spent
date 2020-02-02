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

    const registerUserModel = {
        username: username,
        email: email,
        password: password,
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

function toLogoutUserModel(request) {

    const email = request.body.email;
    const authToken = request.header("auth_token");

    if (!email.isValidEmail() || !authToken) {
        throw new errors.BadRequestError("User not authenticated.");
    }

    const logoutUserModel = {
        email: email,
        token: authToken
    };

    return logoutUserModel;
}

function toVerifyEmailModel(request) {
    const userUid = request.params.uid;
    const emailValidationUid = request.query.validation_uid;

    if (!userUid || !emailValidationUid) {
        throw new errors.BadRequestError("Invalid input data");
    }

    const validateUserModel = {
        userUid,
        emailValidationUid
    }

    return validateUserModel;
}


module.exports = {
    toRegisterUserModel,
    toLoginUserModel,
    toLogoutUserModel,
     toVerifyEmailModel
}
