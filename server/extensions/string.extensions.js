const emailValidator = /[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/igm;

const bcrypt = require("bcrypt");

String.prototype.validateAndHashPassword = function() {
    const password = String(this);
    if (password && password.trim().length >= 6) {
        const salt = bcrypt.genSaltSync(16);
        const hash = bcrypt.hashSync(password, salt);
        return {hash, salt};
    } else {
        throw new Error("Invalid Password");
    }
};

String.prototype.validateUsername = function() {
    const username = String(this);
    if (username && username.length >= 3) {
        return username;
    } else {
        throw new Error("Invalid username");
    }
};

String.prototype.validateEmail = function() {
    const email = String(this);
    if (email && emailValidator.test(email)) {
        return email;
    } else {
        throw new Error("Invalid Email.")
    }
};