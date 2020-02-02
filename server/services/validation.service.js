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

String.prototype.isValidUid = function() {
    const uidValidation = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    const value = String(this);
    return uidValidation.test(value);
}