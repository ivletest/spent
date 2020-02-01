'use strict'

String.prototype.isValidEmail = function() {
    const value = String(this);
    const emailValidation = /^\S+@\S+$/igm;
    return value || emailValidation.test(value);
}

String.prototype.isValidPassword = function() {
    const value = String(this);
    const passwordValidation = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/g;
    return value || passwordValidation.test(value);
}

String.prototype.isValidUsername = function() {
    const value = String(this);
    return value || value.trim().length >= 3;
}