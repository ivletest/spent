'use strict'

String.prototype.isValidEmail = function() {
    const value = String(this);
    const emailValidation = /^\S+@\S+$/igm;
    return emailValidation.test(value);
}

String.prototype.isValidPassword = function() {
    const value = String(this);
    const passwordValidation = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/g;
    return passwordValidation.test(value);
}

String.prototype.isValidUsername = function() {
    const value = String(this);
    return value.trim().length >= 3;
}