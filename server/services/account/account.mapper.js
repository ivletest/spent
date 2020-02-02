'use strict';
require("../validation.service");
const errors = require("restify-errors");

function toCreateAccountModel(request) {
    const userUid = request.params.uid;
    const { isPrivate, balance, currency, parentAccountUid } = request.body;

    if (!userUid.isValidUid() ||
        !isPrivate ||
        !balance ||
        !currency) {
            throw new errors.BadRequestError("Invalid input data");
    }

    const accountData = {
        userUid: userUid,
        isPrivate: isPrivate,
        balance: balance,
        currency: currency,
        parentAccountUid: parentAccountUid
    }

    return accountData;
}

module.exports = {
    toCreateAccountModel
}