const emailValidator = /[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/igm;

const bcrypt = require("bcrypt");

String.prototype.validateAndHashPassword = function () {
    const password = String(this);
    
    if (!password && password.trim().length < 6) {
        throw new Error("Invalid Password");
    }
    
    const hash = bcrypt.hashSync(password, 16);
    return hash;
};

String.prototype.validateUsername = function () {
    const username = String(this);
    
    if (!username && username.length < 3) {
        throw new Error("Invalid username");
    }

    return username;
};

String.prototype.validateEmail = function () {
    const email = String(this);
    
    if (!email && !emailValidator.test(email)) {
        throw new Error("Invalid Email.")
    }

    return email;
};