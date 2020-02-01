'use strict';
const bcrypt = require("bcrypt"),
      db = require("../models/index");
const emailValidator = /[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/igm;

async function createUser(request) {
    const { username, email, password } = request.body;
    const errorArr = [];
    let isValid = true;

    if (!username || !email || !password) {
        isValid = false;
        errorArr.push("All fields are required");
    }
    if (username.trim() < 3) {
        isValid = false;
        errorArr.push("Username must be longer than 3 characters.");
    }
    if (!emailValidator.test(email)) {
        isValid = false;
        errorArr.push("Eamil is invalid.");
    }
    if (password.trim().length < 6) {
        isValid = false;
        errorArr.push("Password is invalid");
    }

    if (!isValid) {
        return { success: false, errors: errorArr };
    }

    const user = {
        username: username,
        email: email,
        passwordHash: bcrypt.hashSync(password, 10)
    }

    let result = await db.User.create(user);

    return result;
}

async function loginReqToUser(req, res) {
    const { email, password } = req.body;
}

module.exports = {
    createUser,
    loginReqToUser
}
