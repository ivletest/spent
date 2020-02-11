'use strict';
require("../validation.service");
const errors = require("restify-errors");

function toCreateAccountModel(request) {
    const userUid = request.params.uid;
    const { isPrivate, balance, currency, parentAccountUid } = request.body;

    const userIsValid = userUid.isValidUid();
    const isPrivateIsValid = isPrivate.isValidBoolean();
    const balanceIsValid = !isNaN(balance);
    const currencyIsValid = currency.trim().length === 3;
    const parentAccountIsValid = parentAccountUid ? parentAccountUid.userUid.isValidUid() : true;

    if (!userIsValid ||
        !isPrivateIsValid ||
        !balanceIsValid ||
        !currencyIsValid ||
        !parentAccountIsValid) {
            throw new errors.BadRequestError("Invalid input data");
    }

    const accountData = {
        userUid: userUid,
        isPrivate: Boolean(isPrivate),
        balance: Number(balance),
        currency: currency,
        parentAccountUid: parentAccountUid
    }

    return accountData;
}

module.exports = {
    toCreateAccountModel
}