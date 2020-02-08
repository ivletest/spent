'use strict';
require("../validation.service");
const messages = require("../../common/messages");
const bcrypt = require("bcrypt");
const errors = require("restify-errors");

function toRegisterUserModel(request, role) {

    const { username, email, password } = request.body;

    if (!username.isValidUsername() ||
        !email.isValidEmail()       ||
        !password.isValidPassword()) {
        throw new errors.BadRequestError(messages.invalidInputData);
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
        throw new errors.BadRequestError(messages.invalidInputData);
    }

    const loginUserModel = {
        email: email,
        password: password
    }

    return loginUserModel;
}

function toLogoutUserModel(request) {

    const authToken = request.header("auth_token");

    if (!authToken) {
        throw new errors.BadRequestError(messages.invalidInputData);
    }

    return authToken;
}

function toVerifyEmailModel(request) {
    const userUid = request.params.uid;
    const emailValidationUid = request.query.validation_uid;

    if (!userUid.isValidUid() || !emailValidationUid.isValidUid()) {
        throw new errors.BadRequestError(messages.invalidInputData);
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
