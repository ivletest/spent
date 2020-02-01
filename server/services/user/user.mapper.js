'use strict';
require("../validation.service");
const bcrypt = require("bcrypt");
const db = require("../../models/index");

function toRegisterUserModel(request, role) {
    const { username, email, password } = request.body;

    if (!username.isValidUsername ||
        !email.isValidEmail ||
        !password.isValidPassword) {
        throw new Error("Invalid input data.");
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

    if (!email.isValidEmail ||
        !password.isValidPassword) {
        throw new Error("Invalid input data.");
    }

    const loginUserModel = {
        email: email,
        password: password
    }

    return loginUserModel;
}



module.exports = {
    toRegisterUserModel,
    toLoginUserModel
}
